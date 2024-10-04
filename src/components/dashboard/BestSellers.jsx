import React from "react";
import { Link } from "react-router-dom";

const bestSellersData = [
  {
    id: `1000`,
    customerName: `NamLee`,
    avatar: `https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/347790165_658762499448949_8179470853245353677_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=jHexEKR0RF0Q7kNvgFWzCts&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AWrlO-nhYcZG_uWAc_VA632&oh=00_AYB5hlgHz11VtdVQwVTy_agiMHKlPHB91foePXg2xazm_Q&oe=67059213`,
    point: 56,
  },
  {
    id: `1001`,
    customerName: `Hieu Chu Nhat`,
    avatar: `https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-1/311595421_1118818752081180_5878838071460445631_n.jpg?stp=dst-jpg_s200x200&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=AWNXFmpas3EQ7kNvgHnaIZQ&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=AJq2KK-sT2rlgLet5-qdQhh&oh=00_AYCUvtAXGxWdOrH_Hp30VmxHIzbS_B36lEk4523LvG6hXQ&oe=67057D5F`,
    point: 50,
  },
  {
    id: `1002`,
    customerName: `Nhat Minh`,
    avatar: `https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-1/449700051_991425422531023_3013200495920188444_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=qxpjC2GtgdIQ7kNvgEqoqHi&_nc_ht=scontent.fsgn2-3.fna&_nc_gid=AkvdkDk_ZyGR9B94cNtczrF&oh=00_AYDYxgGJBxVU8SNemHTGy-VlfVA7iKSfC-wvhV3_8j_UOQ&oe=670579A2`,
    point: 47,
  },
  {
    id: `1003`,
    customerName: `Van Tinh`,
    avatar: `https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/408389407_2111803242496878_8318023176708816931_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=6MAu-VItyqcQ7kNvgFvQfwI&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AI3aMAeCK093ICWGeVtrkqB&oh=00_AYBpwqz9AsO9uOrB9toTI1Fj9uVPdP-Y8D3Z_AThh6VZ0w&oe=6705862E`,
    point: 46,
  },
];

const BestSellers = () => {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-[20rem]">
      <strong className="text-gray-700 font-medium">Best Sellers</strong>
      <div className="mt-4 flex flex-col gap-3">
        {bestSellersData.map((seller) => (
          <Link to={`/users/${seller.id}`} className="flex hover:no-underline">
            <div className="w-10 h-10 min-w-10 bg-gray-200 rounded-sm overflow-hidden">
              <img
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                src={seller.avatar}
                alt={seller.customerName}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800 font-bold font-semibold">
                {seller.customerName}
              </p>
              <span
                className={`text-sm font-medium ${
                  seller.point === 0 ? "text-orange-500" : "text-green-500"
                }`}
              >
                {seller.point} points
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
