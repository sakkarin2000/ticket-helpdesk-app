import { getData, postData, putData } from "../../utils/query";

export const getTicketData = (
  limit: number,
  offset: number,
  statusFilter?: string
) => {
  const { data, status, refetch } = getData(
    statusFilter != ""
      ? `tickets?limit=${limit}&offset=${offset}&status=${statusFilter}`
      : `tickets?limit=${limit}&offset=${offset}`
  );

  return { data, status, refetch };
};

export const updateTicket = (ticket_id: string) => {
  const mutation = putData(`tickets/${ticket_id}`);

  return mutation;
};

export const createTicket = () => {
  const mutation = postData("tickets");
  return mutation;
};
