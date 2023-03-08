import { useEffect, useState } from "react";
import { Observer } from "mobx-react";
import { MdModeEditOutline } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";
import { putData, getData } from "../../utils/query";

import {
  Ticket,
  TicketForSorting,
  TicketStatusForFilter,
  Ticket_Meta_Data,
} from "@/models/Ticket";
import LoadingForTable from "./LoadingForTable";
import { formatDate } from "../../utils/formatDate";
import UpdateTicketModal from "./modal/updateTicketModal";

interface TicketTableProps {
  count_ticket: number;
}
export default function TicketTable({ count_ticket }: TicketTableProps) {
  const ticket_mutation = putData("api/v1/ticket");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [statusFilter, setStatusFilter] = useState("any");
  const [sortByColumn, setSortByColumn] = useState("updated_at");
  const [sortOrder, setSortOrder] = useState("DSC");
  const [ticketToEdit, setTicketToEdit] = useState<Ticket>({} as Ticket);
  const [ticketList, setTicketList] = useState<Ticket[]>([]);
  const [ticketMetaData, setTicketMetaData] = useState<Ticket_Meta_Data>(
    {} as Ticket_Meta_Data
  );

  const {
    data: ticketData,
    status: ticketStatus,
    isSuccess: ticketIsSuccess,
    isLoading: ticketIsLoading,
    refetch: ticketRefetch,
  } = getData(
    `api/v1/ticket?limit=${limit}&offset=${offset}&status=${statusFilter}`
  );
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);

  useEffect(() => {
    if (ticketData && ticketStatus == "success") {
      console.log(ticketData.meta);

      setTicketList([...ticketList, ...ticketData.data]);

      setTicketMetaData(ticketData.meta);
    }
  }, [ticketData, ticketStatus]);

  useEffect(() => {
    if (count_ticket != ticketMetaData.overall_total) {
      console.log(
        "count_ticket: " +
          count_ticket +
          " ticketMetaData.overall_total: " +
          ticketMetaData.overall_total
      );

      setTicketList([]);
      setLimit(offset + limit);
      setOffset(0);
      ticketRefetch();
    }
  }, [count_ticket]);
  const handleChange = (
    value: string,
    attribute: "title" | "description" | "status" | "contact_info"
  ) => {
    var tempTicketToEdit = ticketToEdit;
    if (attribute == "title") {
      tempTicketToEdit.title = value;
    }
    if (attribute == "description") {
      tempTicketToEdit.description = value;
    }
    if (attribute == "contact_info") {
      tempTicketToEdit.contact_info = value;
    }
    if (attribute == "status") {
      tempTicketToEdit.status = parseInt(value);
    }
    setTicketToEdit(tempTicketToEdit);
    console.log(ticketToEdit);
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
      ticket_mutation.mutate({
        title: ticketToEdit.title,
        description: ticketToEdit.description,
        contact_info: ticketToEdit.contact_info,
        ticket_id: ticketToEdit.ticket_id,
        status: ticketToEdit.status,
      });
    }
  };

  useEffect(() => {
    if (ticket_mutation.isSuccess) {
      setTicketList([]);
      setLimit(limit + offset);
      setOffset(0);
      setShowEditTicketModal(false);
      ticketRefetch();
      ticket_mutation.reset();
    }
  }, [ticket_mutation.isSuccess]);

  const handleLoadMore = async () => {
    console.log(ticketMetaData);
    console.log(
      "ticketMetaData.total: " +
        ticketMetaData.total +
        " ticketList.length: " +
        ticketList.length
    );
    if (offset + 10 < ticketMetaData.total) {
      console.log("Loading More");
      setLimit(10);
      setOffset(offset + 10);
      ticketRefetch();
    }
  };

  return (
    <Observer>
      {() => (
        <>
          <div className="px-10 flex flex-col justify-center pb-10">
            <div className="flex gap-4">
              <div className="pb-5 w-1/6">
                <div className="flex flex-cols gap-2">
                  <label className="block text-sm font-regular text-bold text-gray-900 py-2 ">
                    Filter by Status
                  </label>
                </div>
                <div className="self-center relative">
                  <select
                    aria-label="Correct answer"
                    className="block appearance-none w-full bg-white border border-[#081F3E] text-[#081F3E] py-1.5 px-4 pr-8 rounded leading-tight focus:outline-none text-[14px]"
                    id="grid-state"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setSortByColumn("updated_at");
                      setTicketList([]);
                      setStatusFilter(e.target.value);
                      ticketRefetch();
                      setLimit(10);
                      setOffset(0);
                    }}
                    defaultValue={statusFilter}
                  >
                    <option disabled selected className="text-[14px]">
                      Select Status
                    </option>
                    {TicketStatusForFilter.map((ticketstatus) => (
                      <option
                        key={`key_${ticketstatus.id}`}
                        value={ticketstatus.id}
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
            <table className="min-w-full border border-gray-200">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Index
                  </th>
                  <th
                    onClick={() => {
                      sorting("title");
                    }}
                    scope="col"
                    className={
                      sortByColumn == "title"
                        ? "cursor-pointer text-sm font-medium text-[#ff0077] px-6 py-4 text-left"
                        : "cursor-pointer text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    }
                  >
                    Title
                  </th>
                  <th
                    onClick={() => {
                      sorting("description");
                    }}
                    scope="col"
                    className={
                      sortByColumn == "description"
                        ? "cursor-pointer text-sm font-medium text-[#ff0077] px-6 py-4 text-left"
                        : "cursor-pointer text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    }
                  >
                    Description
                  </th>
                  <th
                    onClick={() => {
                      sorting("contact_info");
                    }}
                    scope="col"
                    className={
                      sortByColumn == "contact_info"
                        ? "cursor-pointer text-sm font-medium text-[#ff0077] px-6 py-4 text-left"
                        : "cursor-pointer text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    }
                  >
                    Contact Information
                  </th>
                  <th
                    onClick={() => {
                      sorting("created_at");
                    }}
                    scope="col"
                    className={
                      sortByColumn == "created_at"
                        ? "cursor-pointer text-sm font-medium text-[#ff0077] px-6 py-4 text-left"
                        : "cursor-pointer text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    }
                  >
                    Created At
                  </th>
                  <th
                    onClick={() => {
                      sorting("updated_at");
                    }}
                    scope="col"
                    className={
                      sortByColumn == "updated_at"
                        ? "cursor-pointer text-sm font-medium text-[#ff0077] px-6 py-4 text-left"
                        : "cursor-pointer text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    }
                  >
                    Latest Updated At
                  </th>
                  <th
                    onClick={() => {
                      sorting("status");
                    }}
                    scope="col"
                    className={
                      sortByColumn == "status"
                        ? "cursor-pointer text-sm font-medium text-[#ff0077] px-6 py-4 text-left"
                        : "cursor-pointer text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    }
                  >
                    Status
                  </th>
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
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {ticket.title}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {ticket.description}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {ticket.contact_info}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {formatDate(new Date(ticket.created_at))}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {formatDate(new Date(ticket.updated_at))}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {ticket.status == -1 ? (
                          <div className="flex gap-2 items-center">
                            <div className="text-red-500 ">
                              {" "}
                              <GrStatusGoodSmall />
                            </div>{" "}
                            <a>Reject</a>
                          </div>
                        ) : ticket.status == 0 ? (
                          <div className="flex gap-2 items-center">
                            <div className="text-yellow-500 ">
                              {" "}
                              <GrStatusGoodSmall />
                            </div>{" "}
                            <a>Pending</a>
                          </div>
                        ) : ticket.status == 1 ? (
                          <div className="flex gap-2 items-center">
                            <div className="text-green-500 ">
                              {" "}
                              <GrStatusGoodSmall />
                            </div>{" "}
                            <a>Accept</a>
                          </div>
                        ) : ticket.status == 2 ? (
                          <div className="flex gap-2 items-center">
                            <div className="text-blue-500 ">
                              {" "}
                              <GrStatusGoodSmall />
                            </div>{" "}
                            <a>Resolved</a>
                          </div>
                        ) : (
                          "Unknown"
                        )}
                      </td>
                      <td className="text-xl text-[#C10000] font-light px-6 py-4 whitespace-nowrap cursor-pointer">
                        <MdModeEditOutline
                          onClick={() => {
                            setTicketToEdit({
                              ticket_id: ticket.ticket_id,
                              title: ticket.title,
                              description: ticket.description,
                              contact_info: ticket.contact_info,
                              created_at: ticket.created_at,
                              updated_at: ticket.updated_at,
                              status: ticket.status,
                            });
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
              {ticketMetaData.total == ticketList.length ? (
                <a className="text-gray-400 py-2">
                  {" "}
                  There is no more tickets to show
                </a>
              ) : (
                <button
                  className="cursor-pointer bg-gradient-to-br text-sm border border-inherit  from-[#ff0077] to-[#941061] py-2 px-5 w-fit rounded-full   text-white hover:opacity-80 hover:border-1 transition-all"
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
