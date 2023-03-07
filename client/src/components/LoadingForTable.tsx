import React from "react";

interface TableProps {
  numRows: number;
  numCols: number;
  isError: boolean;
  errorResponse: string;
}
export default function LoadingForTable({
  numRows,
  numCols,
  isError,
  errorResponse,
}: TableProps) {
  return (
    <>
      {isError
        ? Array.from(Array(numRows)).map((x: any, index: number) => (
            <tr
              key={index}
              className="bg-gray-50 w-full  transition duration-300 ease-in-out hover:bg-white h-[40px]"
            >
              {Array.from(Array(numCols)).map((x: any, index: number) => (
                <td key={index}>
                  {numCols / 2 == index ? (
                    <p className="text-gray-500">{errorResponse}</p>
                  ) : null}
                </td>
              ))}
            </tr>
          ))
        : Array.from(Array(numRows)).map((x: any, index: number) => (
            <tr
              key={index}
              className={
                index % 2 !== 0
                  ? "animate-pulse bg-white w-full  transition duration-300 ease-in-out hover:bg-gray-100 h-[40px]"
                  : "animate-pulse bg-gray-50 w-full  transition duration-300 ease-in-out hover:bg-white h-[40px]"
              }
            >
              <td colSpan={numCols}></td>
            </tr>
          ))}
    </>
  );
}
