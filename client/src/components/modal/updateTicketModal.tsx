import { Ticket, TicketStatus } from "@/models/Ticket";
import { AiOutlineClose } from "react-icons/ai";

interface UpdateTicketModalProps {
  ticketToEdit: Ticket;
  handleSubmit: Function;
  handleChange: Function;
  handleHideModal: Function;
}
export default function UpdateTicketModal({
  ticketToEdit,
  handleSubmit,
  handleChange,
  handleHideModal,
}: UpdateTicketModalProps) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black bg-opacity-75 z-40">
      <div className="modal space-y-2 w-[350px] p-4 rounded-sm  shadow-2xl font-light  bg-white">
        <div>
          <div className="flex justify-between">
            <h3 className="text-[1.5rem] font-semibold">Update Ticket</h3>
            <div
              className="icon grid place-items-center cursor-pointer hover:text-[#ff0077] transition-color"
              onClick={() => {
                handleHideModal();
              }}
            >
              <AiOutlineClose />
            </div>
          </div>
          <hr />
        </div>
        <form
          className="mt-1 mb-6"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="">
            <div className="pl-5 pr-5">
              <div className="flex gap-2">
                <label className="block text-sm font-regular text-bold text-gray-900 py-2 ">
                  Title
                </label>
              </div>
              <input
                type="text"
                id="title"
                defaultValue={ticketToEdit.title}
                onChange={(e) => {
                  handleChange(e.target.value, "title");
                }}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2"
                placeholder="Ticket Title"
                required
              />
            </div>

            <div className="pl-5 pr-5">
              <div className="flex gap-2">
                <label className="block text-sm font-regular text-bold text-gray-900 py-2 ">
                  Description
                </label>
              </div>
              <textarea
                id="description"
                defaultValue={ticketToEdit.description}
                onChange={(e) => {
                  handleChange(e.target.value, "description");
                }}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="Ticket Description"
                required
              />
            </div>

            <div className="pl-5 pr-5 pb-5">
              <div className="flex flex-cols gap-2">
                <label className="block text-sm font-regular text-bold text-gray-900 py-2 ">
                  Contact Information
                </label>
              </div>
              <textarea
                id="contactInfo"
                defaultValue={ticketToEdit.contact_info}
                onChange={(e) => {
                  handleChange(e.target.value, "contact_info");
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="Contact Information"
                required
              />
            </div>

            <div className="pl-5 pr-5 pb-5">
              <div className="flex flex-cols gap-2">
                <label className="block text-sm font-regular text-bold text-gray-900 py-2 ">
                  Status
                </label>
              </div>
              <div className="self-center relative">
                <select
                  aria-label="Correct answer"
                  className="block appearance-none w-full bg-white border border-[#081F3E] text-[#081F3E] py-1.5 px-4 pr-8 rounded leading-tight focus:outline-none text-[14px]"
                  id="grid-state"
                  onChange={(e) => {
                    console.log(e.target.value);
                    handleChange(e.target.value, "status");
                  }}
                  defaultValue={ticketToEdit.status}
                >
                  <option disabled selected className="text-[14px]">
                    Select Status
                  </option>
                  {TicketStatus.map((ticketstatus) => (
                    <option
                      key={`key_${ticketstatus.id}`}
                      value={ticketstatus.status_name_en}
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

            <div className="space-y-4">
              <hr />
              <div className="flex justify-between">
                <button
                  className="cursor-pointer bg-gradient-to-br border border-inherit  from-gray-700 to-gray-900 py-3 px-10 w-fit rounded-full   text-white hover:bg-gradient-to-br  hover:from-white hover:to-white hover:border-1 hover:border-gray-900 hover:text-gray-900 transition-all"
                  onClick={() => handleHideModal()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer bg-gradient-to-br border border-inherit  from-[#ff0077] to-[#941061] py-3 px-10 w-fit rounded-full   text-white hover:bg-gradient-to-br  hover:from-white hover:to-white hover:border-1 hover:border-[#ff0077] hover:text-[#ff0077] transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
