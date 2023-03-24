import { GrStatusGoodSmall } from "react-icons/gr";

interface TicketStatusWithColorProps {
  status: string;
}
interface StatusWithColor {
  [key: string]: string;
  Rejected: string;
  Pending: string;
  Accepted: string;
  Resolved: string;
  Canceled: string;
}
const statusWithColor: StatusWithColor = {
  Rejected: "text-red-500",
  Pending: "text-yellow-500",
  Accepted: "text-green-500",
  Resolved: "text-blue-500",
  Canceled: "text-gray-300",
};

function TicketStatusWithColor({ status }: TicketStatusWithColorProps) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <div className={statusWithColor[status]}>
          {" "}
          <GrStatusGoodSmall />
        </div>{" "}
        <a>{status}</a>
      </div>
    </>
  );
}

export default TicketStatusWithColor;
