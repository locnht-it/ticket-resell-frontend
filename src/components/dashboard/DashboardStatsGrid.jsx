import React, { useEffect, useState } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { BsFillFilePostFill } from "react-icons/bs";
import { IoBagHandle } from "react-icons/io5";
import { RiBillFill } from "react-icons/ri";
import { usePostApi } from "../../api/postApi";
import { useOrderApi } from "../../api/orderApi";
import { useTransactionApi } from "../../api/transactionApi";

const DashboardStatsGrid = () => {
  const [totalPosts, setTotalPosts] = useState();
  const [totalOrders, setTotalOrders] = useState();
  const [totalTransaction, setTotalTransaction] = useState();
  const [totalRevenue, setTotalRevenue] = useState();
  const { getAllPosts } = usePostApi();
  const { getAllOrders } = useOrderApi();
  const { getAllTransactions, getTotalRevenue } = useTransactionApi();

  useEffect(() => {
    getAllPosts("", "", 1, 1)
      .then((response) => setTotalPosts(response.data.size))
      .catch((error) => console.error("Failed to fetch total posts:", error));

    getAllOrders("", "", 1, 1)
      .then((response) => setTotalOrders(response.data.size))
      .catch((error) => console.error("Failed to fetch total orders:", error));

    getAllTransactions("", "", 1, 1)
      .then((response) => setTotalTransaction(response.data.size))
      .catch((error) =>
        console.error("Failed to fetch total transactions:", error)
      );

    getTotalRevenue()
      .then((response) => setTotalRevenue(response.data.content))
      .catch((error) => console.error("Failed to fetch total revenue:", error));
  }, []);

  return (
    <div className="flex gap-4 w-full">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">
            Total Revenues
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalRevenue?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-500">
          <AiOutlineTransaction className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">
            Total Transactions
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalTransaction}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <BsFillFilePostFill className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">Total Posts</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalPosts}
            </strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <RiBillFill className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">Total Orders</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalOrders}
            </strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default DashboardStatsGrid;

let BoxWrapper = ({ children }) => {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
};
