import styles from "@/styles/Home.module.css";
import { coreContext } from "../stores/context";
import { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react";
import { MdModeEditOutline } from "react-icons/md";
import { GrStatusGoodSmall } from "react-icons/gr";
import { putData, getData } from "../../utils/query";
import { useInfiniteQuery } from "react-query";

import { Ticket, Ticket_Meta_Data } from "@/models/Ticket";
import LoadingForTable from "./LoadingForTable";
import { formatDate } from "../../utils/formatDate";
import UpdateTicketModal from "./modal/updateTicketModal";

interface TicketTableProps {
  count_ticket: number;
}
export default function TicketTable({ count_ticket }: TicketTableProps) {
  const ticket_mutation = putData("api/v1/ticket");
  const [limit, setLimit] = useState(10);
  const [ticketToEdit, setTicketToEdit] = useState<Ticket>({} as Ticket);
  const [offset, setOffset] = useState(0);
  const [statusFilter, setStatusFilter] = useState("any");
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
      setTicketList(ticketData.data);
      setTicketMetaData(ticketData.meta);
    }
  }, [ticketData, ticketStatus]);

  useEffect(() => {
    if (count_ticket != ticketList.length) {
      ticketRefetch();
    }
  }, [count_ticket, ticketIsSuccess]);
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
      ticketRefetch();
      setShowEditTicketModal(false);
      ticket_mutation.reset();
    }
  }, [ticket_mutation.isSuccess]);
  return (
    <Observer>
      {() => (
        <>
          <div className="px-10 flex justify-center">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Contact Information
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Updated At
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
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
                    numCols={6}
                    numRows={1}
                    isError={true}
                    errorResponse={
                      "Error Retreiving Data. Try refreshing Page."
                    }
                  />
                ) : null}
                {ticketStatus == "loading" ? (
                  <LoadingForTable
                    numCols={6}
                    numRows={6}
                    isError={false}
                    errorResponse={""}
                  />
                ) : null}

                {ticketStatus == "success"
                  ? ticketList.map((ticket, index) => (
                      <tr
                        key={ticket.ticket_id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
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
                  : null}
              </tbody>
            </table>
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
