import LandingPage from "@/components/LandingPage";
import CreateTicketModal from "@/components/modal/CreateTicketModal";
import TicketTable from "@/components/ticketTable";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { restore } from "sinon";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const queryClient = new QueryClient();

describe("Landing Page Test", () => {
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <LandingPage />
      </QueryClientProvider>
    );
  });
  it("should render component page", () => {
    // screen.debug();
    expect(screen.getByText("Ticket Management Helpdesk")).toBeDefined();
    expect(
      screen.getByText("Create Tickets and Manage Efficiently")
    ).toBeDefined();
  });
  it("should show Create Ticket button", async () => {
    expect(screen.getByRole("button", { name: "Create Ticket" })).toBeDefined();
  });
  it("should show View Tickets button", async () => {
    expect(screen.getByRole("button", { name: "View Tickets" })).toBeDefined();
  });
  it("should show create ticket modal on click button[Create Ticket] ", async () => {
    await userEvent.click(
      screen.getByRole("button", { name: "Create Ticket" })
    );
    // screen.debug(undefined, 300000);
    expect(screen.getByRole("dialog", { name: "Create Ticket" })).toBeDefined();
  });
  it("should show 0 ticket on page load", async () => {
    expect(screen.getByText("0 tickets created")).toBeDefined();
  });
});

describe("Ticket Table Test", (context) => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });
  afterEach(() => {
    cleanup();
    restore();
  });
  beforeEach(() => {});

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

describe("Create Ticket Modal Test", () => {
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateTicketModal
          handleSubmit={() => {}}
          handleHideModal={() => {}}
          handleChangeContactInfo={() => {}}
          handleChangeDescription={() => {}}
          handleChangeTitle={() => {}}
        />
      </QueryClientProvider>
    );
  });
  it("should contain Create Ticket title", () => {
    expect(screen.getByText("Create Ticket")).toBeDefined();
  });
  it("should contain ticket title textbox", () => {
    expect(screen.getByRole("textbox", { name: "Title" })).toBeDefined();
  });
  it("should contain ticket description textbox", () => {
    expect(screen.getByRole("textbox", { name: "Description" })).toBeDefined();
  });
  it("should contain contact information textarea", () => {
    expect(
      screen.getByRole("textbox", { name: "Contact Information" })
    ).toBeDefined();
  });

  // it("should contain Close Button", () => {
  //   expect(
  //     screen.getByRole("button", { name: "closeCreateTicketModal" })
  //   ).toBeDefined();
  // });

  it("should contain Cancel Button", () => {
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDefined();
  });
  it("should contain Confirm Button", () => {
    expect(screen.getByRole("button", { name: "Confirm" })).toBeDefined();
  });
});
