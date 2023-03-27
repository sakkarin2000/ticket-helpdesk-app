import { AiOutlineClose } from "react-icons/ai";

interface CreateTicketModalProps {
  handleSubmit: Function;
  handleChangeTitle: Function;
  handleChangeDescription: Function;
  handleChangeContactInfo: Function;
  handleHideModal: Function;
}
export default function CreateTicketModal({
  handleSubmit,
  handleChangeTitle,
  handleChangeDescription,
  handleChangeContactInfo,
  handleHideModal,
}: CreateTicketModalProps) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black bg-opacity-75 z-40">
      <div
        role="dialog"
        aria-labelledby="createTicketModal"
        className="modal space-y-2 w-[350px] p-4 rounded-sm  shadow-2xl font-light  bg-white"
      >
        <div>
          <div className="flex justify-between">
            <h3 id="createTicketModal" className="text-[1.5rem] font-semibold">
              Create Ticket
            </h3>
            <div
              role="button"
              aria-labelledby="closeCreateTicketModal"
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
                <label
                  htmlFor="title"
                  className="block text-sm text-gray-900 dark:text-white"
                >
                  Title
                </label>
              </div>
              <input
                role="textbox"
                type="text"
                id="title"
                onChange={(e) => {
                  handleChangeTitle(e.target.value);
                }}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2"
                placeholder="Ticket Title"
                required
              />
            </div>

            <div className="pl-5 pr-5">
              <div className="flex gap-2">
                <label
                  htmlFor="description"
                  className="block text-sm text-gray-900 dark:text-white"
                >
                  Description
                </label>
              </div>
              <textarea
                role="textbox"
                id="description"
                onBlur={(e) => {
                  handleChangeDescription(e.target.value);
                }}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="Ticket Description"
                required
              />
            </div>
            <div className="pl-5 pr-5 pb-5">
              <div className="flex gap-2">
                <label
                  htmlFor="contactInfo"
                  className="block text-sm text-gray-900 dark:text-white"
                >
                  Contact Information
                </label>
              </div>
              <textarea
                role="textbox"
                id="contactInfo"
                onBlur={(e) => {
                  handleChangeContactInfo(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2"
                placeholder="Contact Information"
                required
              />
            </div>

            <div className="space-y-4">
              <hr />
              <div className="flex justify-between">
                <button
                  role="button"
                  id="cancelCreateTicketModal"
                  className="cursor-pointer bg-gradient-to-br border border-inherit  from-gray-700 to-gray-900 py-3 px-10 w-fit rounded-full   text-white hover:bg-gradient-to-br  hover:from-white hover:to-white hover:border-1 hover:border-gray-900 hover:text-gray-900 transition-all"
                  onClick={() => handleHideModal()}
                >
                  Cancel
                </button>
                <button
                  role="button"
                  id="confirmCreateTicketModal"
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
