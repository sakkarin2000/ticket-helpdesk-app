import { CreateTicketRequest } from "@/models/CreateTicketRequest";
import { createTicket, getTotalTicket } from "@/services/ticketService";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import CreateTicketModal from "./modal/CreateTicketModal";
import TicketTable from "./ticketTable";

export default function LandingPage() {
  const sectionRef = useRef<null | HTMLElement>(null);
  const createTicketMutation = createTicket();
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [totalTicket, setTotalTicket] = useState(0);
  const {
    data: totalTicketData,
    isSuccess: totalTicketIsSuccess,
    refetch,
  } = getTotalTicket();

  const handleScrollToTicketList = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (title && description && contactInfo) {
      const ticketToCreate = new CreateTicketRequest(
        title,
        description,
        contactInfo
      );
      createTicketMutation.mutate(ticketToCreate);
    }
  };

  useEffect(() => {
    if (totalTicketData && totalTicketIsSuccess) {
      setTotalTicket(totalTicketData.total_ticket);
    }
  }, [totalTicketData, totalTicketIsSuccess]);

  useEffect(() => {
    if (createTicketMutation.isSuccess) {
      refetch();
      setShowCreateTicketModal(false);
      handleScrollToTicketList();
      createTicketMutation.reset();
    }
  }, [createTicketMutation.isSuccess]);

  return (
    <>
      <section className="h-screen ">
        <div className="bg-gradient-to-br from-[#ff0077] to-[#941061] h-[370px] ">
          <div className="absolute z-20 top-[120px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="text-5xl font-bold">Ticket Management Helpdesk</h1>
            <p className="text-lg">Create Tickets and Manage Efficiently</p>
          </div>
          <div className="absolute z-0">
            <div className={styles.landing}>
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M1200 0L0 0 598.97 114.72 1200 0z"
                  className={styles.shapeFill}
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <button
            role="button"
            onClick={() => {
              setShowCreateTicketModal(true);
            }}
            className="cursor-pointer bg-gradient-to-br border border-inherit  from-[#ff0077] to-[#941061] py-3 px-10 w-fit rounded-full   text-white hover:opacity-80 hover:border-1 transition-all"
          >
            <p className="text-xl font-regular font-prompt">Create Ticket</p>
          </button>
          <button
            role="button"
            aria-label="View Tickets"
            onClick={handleScrollToTicketList}
            className="cursor-pointer  border border-[#db256f]  py-3 px-10 w-fit rounded-full   text-[#db256f] hover:text-white hover:bg-[#db256f]  hover:border-[#db256f] hover:border-1 transition-all"
          >
            <p className="text-xl font-regular font-prompt">View Tickets</p>
          </button>
        </div>
        <div className="m-20 flex justify-center">
          {" "}
          <h1 className="text-4xl font-bold">
            {totalTicket + " tickets created"}
          </h1>
        </div>
      </section>
      <section ref={sectionRef} className="h-fit ">
        <div className="overflow-x-auto mr-10">
          <TicketTable count_ticket={totalTicket} />
        </div>
      </section>
      {showCreateTicketModal ? (
        <CreateTicketModal
          handleSubmit={(e: any) => {
            handleSubmit(e);
          }}
          handleChangeTitle={(title: string) => {
            setTitle(title);
          }}
          handleChangeDescription={(description: string) => {
            setDescription(description);
          }}
          handleChangeContactInfo={(contactInfo: string) => {
            setContactInfo(contactInfo);
          }}
          handleHideModal={() => {
            setShowCreateTicketModal(false);
          }}
        />
      ) : null}
    </>
  );
}
