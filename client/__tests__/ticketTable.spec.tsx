import TicketTable from "@/components/ticketTable";
import { getTicketData } from "@/services/ticketService";
import {
  cleanup,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import nock, { restore } from "nock";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const mockData = {
  data: [
    {
      ticket_id: "f1f51b38-accf-4f86-b58c-05941a071180",
      title: "test1",
      description: "test1",
      contact_info: "test1",
      created_at: "2023-03-27T03:47:50.678Z",
      updated_at: "2023-03-27T03:47:54.395Z",
      status: "Accepted",
    },
    {
      ticket_id: "2c30e584-058c-4354-ad39-a5355a584e12",
      title: "test2",
      description: "test2",
      contact_info: "test2",
      created_at: "2023-03-27T03:03:28.055Z",
      updated_at: "2023-03-27T03:03:28.055Z",
      status: "Pending",
    },
    {
      ticket_id: "5e28a4cb-5827-4888-bc16-e2ee7e621870",
      title: "test3",
      description: "test3",
      contact_info: "test3",
      created_at: "2023-03-27T03:03:15.443Z",
      updated_at: "2023-03-27T03:03:15.443Z",
      status: "Pending",
    },
    {
      ticket_id: "523a3f3c-5eb3-40b8-9a09-a38a9375d7b3",
      title: "test4",
      description: "test4",
      contact_info: "test4",
      created_at: "2023-03-27T02:49:02.371Z",
      updated_at: "2023-03-27T02:49:07.099Z",
      status: "Accepted",
    },
    {
      ticket_id: "7d7cfb1b-e55b-415a-97d4-dc5ad58168c4",
      title: "test5",
      description: "test5",
      contact_info: "test5",
      created_at: "2023-03-27T02:38:41.611Z",
      updated_at: "2023-03-27T02:38:53.430Z",
      status: "Accepted",
    },
    {
      ticket_id: "e891c0dd-6ff2-45f1-ac0b-df861549660b",
      title: "test6",
      description: "test6",
      contact_info: "test6",
      created_at: "2023-03-27T02:38:15.640Z",
      updated_at: "2023-03-27T02:38:15.640Z",
      status: "Pending",
    },
    {
      ticket_id: "f641d0c4-fc37-4bca-99a9-f327c99b49ed",
      title: "test7",
      description: "test7",
      contact_info: "test7",
      created_at: "2023-03-27T02:33:28.150Z",
      updated_at: "2023-03-27T02:33:28.150Z",
      status: "Pending",
    },
    {
      ticket_id: "5bf00321-9305-4625-b5ae-bce01e05515d",
      title: "test8",
      description: "test8",
      contact_info: "test8",
      created_at: "2023-03-27T02:29:33.887Z",
      updated_at: "2023-03-27T02:29:33.887Z",
      status: "Pending",
    },
    {
      ticket_id: "6ffa5895-98a2-4847-b1a7-2db701fba2b2",
      title: "test9",
      description: "test9",
      contact_info: "test9",
      created_at: "2023-03-27T00:46:56.335Z",
      updated_at: "2023-03-27T02:26:46.796Z",
      status: "Rejected",
    },
    {
      ticket_id: "662491b8-a586-4b8c-8e5b-cc2e7ffd1383",
      title: "test10",
      description: "test10",
      contact_info: "test10",
      created_at: "2023-03-27T00:46:38.063Z",
      updated_at: "2023-03-27T02:05:43.416Z",
      status: "Accepted",
    },
  ],
  meta: {
    limit: 10,
    offset: 0,
    count: 10,
    total: 21,
    overall_total: 21,
  },
  message: "Get all tickets Success",
};
const expectation = nock("http://localhost:5001")
  .get("/tickets?limit=10&offset=0")
  .reply(200, mockData);

vi.mock("@/services/ticketService", () => ({
  getTicketData: vi.fn(() => {
    return {
      data: expectation,
      status: "success",
      refetch: async () => {},
      isSuccess: true,
    };
  }),
  updateTicket: () => {
    return {
      status: "success",
      reset: () => {},
      isSuccess: true,
    };
  },
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default wrapper;

// Dynamic Ticket Table Test
describe("Get Ticket Table Test with MockData", async () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  it("should render table", async () => {
    const { result } = renderHook(() => getTicketData(10, 0), { wrapper });
    await waitFor(() => result.current.isSuccess);
    render(<TicketTable count_ticket={mockData.meta.count} />, { wrapper });

    // screen.debug(undefined, 300000);
    expect(screen.findAllByText("test")).toBeDefined();
  });
});

// Statuc Ticket Table Test
describe("Ticket Table Test", (context) => {
  beforeEach(() => {});
  afterEach(() => {
    restore();
    cleanup();
  });

  it("should show all dropdown options", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TicketTable count_ticket={0} />
      </QueryClientProvider>
    );
    expect(screen.getByText("Filter by Status")).toBeDefined();
    expect(screen.getByText("Select Status")).toBeDefined();
    expect(screen.getByText("Pending")).toBeDefined();
    expect(screen.getByText("Accepted")).toBeDefined();
    expect(screen.getByText("Rejected")).toBeDefined();
    expect(screen.getByText("Resolved")).toBeDefined();
    expect(screen.getByText("Canceled")).toBeDefined();
  });

  it("TicketTable Component Columns to be rendered", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TicketTable count_ticket={0} />
      </QueryClientProvider>
    );
    expect(screen.getByText("Index")).toBeDefined();
    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Description")).toBeDefined();
    expect(screen.getByText("Contact Information")).toBeDefined();
    expect(screen.getByText("Created At")).toBeDefined();
    expect(screen.getByText("Latest Updated At")).toBeDefined();
    expect(screen.getByText("Status")).toBeDefined();
  });
});
