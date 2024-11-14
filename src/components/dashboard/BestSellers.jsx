import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserApi } from "../../api/userApi";

const BestSellers = () => {
  const [users, setUsers] = useState([]);
  const { getAllUsers } = useUserApi();

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await getAllUsers(1, 100);
        const userList = response.data.content || [];

        const topUsers = userList.sort((a, b) => b.point - a.point).slice(0, 5);

        setUsers(topUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-[20rem]">
      <strong className="text-gray-700 font-medium">Top Reputation</strong>
      <div className="mt-4 flex flex-col gap-3">
        {users.map((user) => (
          <Link
            to={`/user/${user.id}`}
            key={user.id}
            className="flex hover:no-underline"
          >
            <div className="w-10 h-10 min-w-10 rounded-sm overflow-hidden">
              <img
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                src={user.image}
                alt={user.fullname}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800 font-semibold">
                {user.fullname}
              </p>
              <span className="text-green-500">{user.point || 0} points</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
