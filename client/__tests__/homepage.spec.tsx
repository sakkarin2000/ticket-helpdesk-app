import LandingPage from "@/components/LandingPage";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
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
