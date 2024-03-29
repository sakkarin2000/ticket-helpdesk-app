import { Observer } from "mobx-react";
import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";

import {
  Ticket,
  TicketForSorting,
  TicketMetaData,
  TicketStatusForFilter,
} from "@/models/Ticket";
import TicketStatusWithColor from "@/models/TicketStatus";
import { UpdateTicketRequest } from "@/models/UpdateTicketRequest";
import { getTicketData, updateTicket } from "@/services/ticketService";
import { formatDate } from "../../utils/formatDate";
import LoadingForTable from "./LoadingForTable";
import UpdateTicketModal from "./modal/UpdateTicketModal";
interface TicketTableProps {
  count_ticket: number;
}
export default function TicketTable({ count_ticket }: TicketTableProps) {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortByColumn, setSortByColumn] = useState("updated_at");
  const [sortOrder, setSortOrder] = useState("DSC");
  const [ticketToEdit, setTicketToEdit] = useState<Ticket>({} as Ticket);
  const [ticketList, setTicketList] = useState<Ticket[]>([]);
  const [ticketMetaData, setTicketMetaData] = useState<TicketMetaData>(
    {} as TicketMetaData
  );
  const [filterColumnChanged, setFilterColumnChanged] = useState(false);
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);

  const {
    data: ticketData,
    status: ticketStatus,
    refetch: RefetchTicket,
  } = getTicketData(limit, offset, statusFilter);

  const ticket_mutation = updateTicket(ticketToEdit.ticket_id);

  useEffect(() => {
    if (ticketData && ticketStatus == "success") {
      if (filterColumnChanged == false && ticketData.data) {
        const uniqueTickets = ticketData.data.filter((ticket: Ticket) => {
          // Only include tickets whose ticket_id is not already in the ticketList
          return !ticketList.some(
            (existingTicket) => existingTicket.ticket_id === ticket.ticket_id
          );
        });
        setTicketList([...ticketList, ...uniqueTickets]);
      } else {
        setTicketList(ticketData.data);
        setFilterColumnChanged(false);
      }

      setTicketMetaData(ticketData.meta);
    }
  }, [ticketData, ticketStatus]);

  useEffect(() => {
    if (count_ticket != ticketMetaData?.overall_total) {
      setTicketList([]);
      setLimit(offset + limit);
      setOffset(0);
      RefetchTicket();
    }
  }, [count_ticket]);

  const handleChange = (
    value: string,
    attribute: "title" | "description" | "status" | "contact_info"
  ) => {
    var tempTicketToEdit = ticketToEdit;
    tempTicketToEdit[attribute] = value;
    setTicketToEdit(tempTicketToEdit);
  };

  const sorting = (col: string) => {
    setSortByColumn(col);
    if (sortOrder === "ASC") {
      const sorted = [...ticketList].sort(
        (a: TicketForSorting, b: TicketForSorting) =>
          String(a[col]).toLowerCase() > String(b[col]).toLowerCase() ? 1 : -1
      );
      setTicketList(sorted);
      setSortOrder("DSC");
    } else if (sortOrder === "DSC") {
      const sorted = [...ticketList].sort(
        (a: TicketForSorting, b: TicketForSorting) =>
          String(a[col]).toLowerCase() < String(b[col]).toLowerCase() ? 1 : -1
      );
      setTicketList(sorted);
      setSortOrder("ASC");
    }
  };

  const handleSubmitUpdateInfo = (e: any) => {
    e.preventDefault();
    if (
      ticketToEdit.title &&
      ticketToEdit.description &&
      ticketToEdit.contact_info &&
      ticketToEdit.ticket_id &&
      ticketToEdit.status
    ) {
      const ticketToUpdateRequest = new UpdateTicketRequest(
        ticketToEdit.title,
        ticketToEdit.description,
        ticketToEdit.contact_info,
        ticketToEdit.status
      );
      ticket_mutation.mutate(ticketToUpdateRequest);
    }
  };

  useEffect(() => {
    if (ticket_mutation.status == "success") {
      setTicketList([]);
      setLimit(limit + offset);
      setOffset(0);
      setShowEditTicketModal(false);
      RefetchTicket();
      ticket_mutation.reset();
    }
  }, [ticket_mutation.status]);

  const handleLoadMore = async () => {
    if (offset + 10 < ticketMetaData?.total) {
      setLimit(10);
      setOffset(offset + 10);
      RefetchTicket();
    }
  };
  const sortableColumns = [
    { attribute: "title", label: "Title" },
    { attribute: "description", label: "Description" },
    { attribute: "contact_info", label: "Contact Information" },
    { attribute: "created_at", label: "Created At" },
    { attribute: "updated_at", label: "Latest Updated At" },
    { attribute: "status", label: "Status" },
  ];
  const SortableColumns = (columns: { attribute: string; label: string }[]) => {
    let columnsForSortingList: any[] = [];
    columns.forEach((column) => {
      columnsForSortingList.push(
        <th
          onClick={() => {
            sorting(column.attribute);
          }}
          scope="col"
          className={
            sortByColumn == column.attribute
              ? "cursor-pointer text-sm font-medium text-[#ff0077] px-6 py-4 text-left"
              : "cursor-pointer text-sm font-medium text-gray-900 px-6 py-4 text-left"
          }
        >
          {column.label}
        </th>
      );
    });
    return columnsForSortingList;
  };
  return (
    <Observer>
      {() => (
        <>
          <div className="px-10 flex flex-col justify-center pb-10">
            <div className="flex gap-4">
              <div className="pb-5 w-fit">
                <div className="flex flex-cols gap-2">
                  <label className="block text-sm font-regular text-bold text-gray-900 py-2 ">
                    Filter by Status
                  </label>
                </div>
                <div className="self-center relative">
                  <select
                    aria-label="Choose filter"
                    className="block appearance-none w-full bg-white border border-[#081F3E] text-[#081F3E] py-1.5 px-4 pr-8 rounded leading-tight focus:outline-none text-[14px]"
                    id="grid-state"
                    onChange={(e) => {
                      setFilterColumnChanged(true);
                      setSortByColumn("updated_at");
                      setTicketList([]);
                      setLimit(10);
                      setOffset(0);
                      setStatusFilter(e.target.value);
                      RefetchTicket();
                    }}
                    defaultValue={statusFilter}
                  >
                    <option disabled selected className="text-[14px]">
                      Select Status
                    </option>
                    {TicketStatusForFilter.map((ticketstatus) => (
                      <option
                        key={`key_${ticketstatus.id}`}
                        value={ticketstatus.status_name_en}
                        className="text-[16px]"
                      >
                        {ticketstatus.status_name_en}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#081F3E]">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <table className=" table-fixed min-w-full border border-gray-200">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Index
                  </th>
                  {SortableColumns(sortableColumns)}
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {ticketStatus == "error" ? (
                  <LoadingForTable
                    numCols={7}
                    numRows={1}
                    isError={true}
                    errorResponse={
                      "Error Retreiving Data. Try refreshing Page."
                    }
                  />
                ) : null}
                {ticketStatus == "loading" ? (
                  <LoadingForTable
                    numCols={7}
                    numRows={6}
                    isError={false}
                    errorResponse={""}
                  />
                ) : null}

                {ticketStatus == "success" && ticketList.length > 0 ? (
                  ticketList.map((ticket, index) => (
                    <tr
                      key={ticket.ticket_id}
                      className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-normal break-words">
                        {ticket.title}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-normal break-words">
                        {ticket.description}
                      </td>
                      <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-normal break-words">
                        {ticket.contact_info}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {formatDate(new Date(ticket.created_at))}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {formatDate(new Date(ticket.updated_at))}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <TicketStatusWithColor status={ticket.status} />
                      </td>
                      <td className="text-xl text-[#C10000] font-light px-6 py-4 whitespace-nowrap cursor-pointer">
                        <MdModeEditOutline
                          onClick={() => {
                            const tempTicketToEdit: Ticket = {
                              ticket_id: ticket.ticket_id,
                              title: ticket.title,
                              description: ticket.description,
                              contact_info: ticket.contact_info,
                              created_at: ticket.created_at,
                              updated_at: ticket.updated_at,
                              status: ticket.status,
                            };
                            setTicketToEdit(tempTicketToEdit);
                            setShowEditTicketModal(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : ticketStatus == "success" && ticketList.length == 0 ? (
                  <tr>
                    <td colSpan={7} className="text-sm p-4 text-gray-500 ">
                      <div className="flex justify-center">
                        There is no ticket. Try adding one.
                      </div>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            <div
              className={
                ticketList.length > 0 ? "flex justify-center mt-2 " : "hidden"
              }
            >
              {ticketMetaData?.total == ticketList.length ? (
                <a className="text-gray-400 py-2">
                  {" "}
                  There is no more tickets to show
                </a>
              ) : (
                <button
                  className="absolute z-20 cursor-pointer bg-gradient-to-br text-sm border border-inherit  from-[#ff0077] to-[#941061] py-2 px-5 w-fit rounded-full   text-white hover:opacity-80 hover:border-1 transition-all"
                  onClick={() => {
                    handleLoadMore();
                  }}
                >
                  Loadmore
                </button>
              )}
            </div>
          </div>

          {showEditTicketModal ? (
            <UpdateTicketModal
              handleSubmit={handleSubmitUpdateInfo}
              handleChange={handleChange}
              ticketToEdit={ticketToEdit}
              handleHideModal={() => {
                setShowEditTicketModal(false);
              }}
            />
          ) : null}
        </>
      )}
    </Observer>
  );
}
