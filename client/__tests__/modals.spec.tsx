import CreateTicketModal from "@/components/modal/CreateTicketModal";
import UpdateTicketModal from "@/components/modal/UpdateTicketModal";
import { Ticket } from "@/models/Ticket";
import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const queryClient = new QueryClient();
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
  it("should contain Cancel Button", () => {
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDefined();
  });
  it("should contain Confirm Button", () => {
    expect(screen.getByRole("button", { name: "Confirm" })).toBeDefined();
  });
});

describe("Update Ticket Modal Test", () => {
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <UpdateTicketModal
          handleSubmit={() => {}}
          handleHideModal={() => {}}
          ticketToEdit={{} as Ticket}
          handleChange={() => {}}
        />
      </QueryClientProvider>
    );
  });
  it("should contain Update Ticket title", () => {
    expect(screen.getByText("Update Ticket")).toBeDefined();
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
  it("should contain Status dropdown", () => {
    expect(screen.getByText("Status")).toBeDefined();
    expect(screen.getByText("Select Status")).toBeDefined();
    expect(screen.getByText("Pending")).toBeDefined();
    expect(screen.getByText("Accepted")).toBeDefined();
    expect(screen.getByText("Rejected")).toBeDefined();
    expect(screen.getByText("Resolved")).toBeDefined();
    expect(screen.getByText("Canceled")).toBeDefined();
  });
  it("should contain Cancel Button", () => {
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDefined();
  });
  it("should contain Confirm Button", () => {
    expect(screen.getByRole("button", { name: "Confirm" })).toBeDefined();
  });
});
