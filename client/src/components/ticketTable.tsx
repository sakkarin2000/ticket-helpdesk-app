import styles from "@/styles/Home.module.css";
import CreateTicketModal from "@/components/modal/createTicketModal";
import { coreContext } from "../stores/context";
import { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react";
import { MdModeEditOutline } from "react-icons/md";
import { putData, getData } from "../../utils/query";
import { Ticket, Ticket_Meta_Data } from "@/models/Ticket";
import LoadingForTable from "./LoadingForTable";
import { formatDate } from "../../utils/formatDate";

export default function TicketTable() {
  const ticket_info_mutation = putData("api/v1/update-ticket-info");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [statusFilter, setStatusFilter] = useState("any");
  const [ticketData, setTicketData] = useState<Ticket[]>([]);
  const [ticketMetaData, setTicketMetaData] = useState<Ticket_Meta_Data[]>([]);
  const { data, status, isSuccess, isLoading, refetch } = getData(
    `api/v1/ticket?limit=${limit}&offset=${offset}&status=${statusFilter}`
  );
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);
  const [ticketIDToEdit, setTicketIDToEdit] = useState("");
  const [titleToEdit, setTitleToEdit] = useState("");
  const [descriptionToEdit, setDescriptionToEdit] = useState("");
  const [contactInfoToEdit, setContactInfoToEdit] = useState("");
  const [statusToEdit, setStatusToEdit] = useState("");

  useEffect(() => {
    if (data && isSuccess) {
      setTicketData(data.data);
      setTicketMetaData(data.meta);
    }
  }, [data, isSuccess]);

  const handleSubmitUpdateInfo = (e: any) => {
    e.preventDefault();
    if (
      titleToEdit &&
      descriptionToEdit &&
      contactInfoToEdit &&
      ticketIDToEdit
    ) {
      ticket_info_mutation.mutate({
        title: titleToEdit,
        description: descriptionToEdit,
        contact_info: contactInfoToEdit,
        ticket_id: ticketIDToEdit,
      });
    }
  };

  useEffect(() => {
    if (ticket_info_mutation.isSuccess) {
      refetch();
      setShowEditTicketModal(false);
      ticket_info_mutation.reset();
    }
  }, [ticket_info_mutation.isSuccess]);
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
                    Created at
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Updated at
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
                {status == "error" ? (
                  <LoadingForTable
                    numCols={6}
                    numRows={1}
                    isError={true}
                    errorResponse={
                      "Error Retreiving Data. Try refreshing Page."
                    }
                  />
                ) : null}
                {status == "loading" ? (
                  <LoadingForTable
                    numCols={6}
                    numRows={6}
                    isError={false}
                    errorResponse={""}
                  />
                ) : null}

                {status == "success"
                  ? ticketData.map((ticket, index) => (
                      <tr
                        key={ticket._id}
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
                          {ticket.status == -1
                            ? "Reject"
                            : ticket.status == 0
                            ? "Pending"
                            : ticket.status == 1
                            ? "Accept"
                            : ticket.status == 2
                            ? "Resolved"
                            : "Unknown"}
                        </td>
                        <td className="text-xl text-[#C10000] font-light px-6 py-4 whitespace-nowrap cursor-pointer">
                          <MdModeEditOutline />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Observer>
  );
}
