import { getData, postData, putData } from "../../utils/query";

export const getTicketData = (
  limit: number,
  offset: number,
  statusFilter?: string
) => {
  const { data, status, refetch, isSuccess } = getData(
    statusFilter != ""
      ? `tickets?limit=${limit}&offset=${offset}&status=${statusFilter}`
      : `tickets?limit=${limit}&offset=${offset}`
  );

  return { data, status, refetch, isSuccess };
};

export const getTotalTicket = () => {
  const { data, isSuccess, refetch } = getData(`total-ticket`);
  return { data, isSuccess, refetch };
};

export const updateTicket = (ticket_id: string) => {
  const mutation = putData(`tickets/${ticket_id}`);

  return mutation;
};

export const createTicket = () => {
  const mutation = postData("tickets");
  return mutation;
};
