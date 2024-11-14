import React from "react";
import { Link } from "react-router-dom";

const bestSellersData = [
  {
    id: 4,
    customerName: `NamLee`,
    avatar: `https://lh3.googleusercontent.com/a/ACg8ocI6cVpQdHFNblzJUq_5RBKcYxIbXDeGwP4ETCbiJLDslfMDek8J=s576-c-no`,
    point: 56,
  },
  {
    id: 2,
    customerName: `Hieu Chu Nhat`,
    avatar: `https://firebasestorage.googleapis.com/v0/b/ticket-resell-app-33551.appspot.com/o/images%2Fcat6.png956c1958-6f7d-4f8e-be7e-4834fb067ef9?alt=media&token=32683b29-266b-41be-9cd1-081521467d9a`,
    point: 50,
  },
  {
    id: 3,
    customerName: `Nhat Minh`,
    avatar: `https://lh3.googleusercontent.com/a/ACg8ocI6cVpQdHFNblzJUq_5RBKcYxIbXDeGwP4ETCbiJLDslfMDek8J=s576-c-no`,
    point: 47,
  },
  {
    id: 5,
    customerName: `Van Tinh`,
    avatar: `https://lh3.googleusercontent.com/a/ACg8ocI6cVpQdHFNblzJUq_5RBKcYxIbXDeGwP4ETCbiJLDslfMDek8J=s576-c-no`,
    point: 46,
  },
];

const BestSellers = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-[20rem]">
      <strong className="text-gray-700 font-medium">Top Reputation</strong>
      <div className="mt-4 flex flex-col gap-3">
        {bestSellersData.map((seller) => (
          <Link to={`/user/${seller.id}`} className="flex hover:no-underline">
            <div className="w-10 h-10 min-w-10 rounded-sm overflow-hidden">
              <img
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                src={seller.avatar}
                alt={seller.customerName}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800 font-semibold">
                {seller.customerName}
              </p>
              <span className="text-green-500">{seller.point} points</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
