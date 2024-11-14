import React from "react";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/consts/navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../../AuthContext";

const linkClasses = `flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const role = auth.user.role;

  const filteredLinks = DASHBOARD_SIDEBAR_LINKS.filter((item) => {
    if (role === 1 || role === "ADMIN") {
      // Admin: dashboard, user, transaction
      return (
        item.key === "dashboard" ||
        item.key === "user" ||
        item.key === "transaction"
      );
    } else if (role === 2 || role === "STAFF") {
      // Staff: trừ user
      return item.key !== "user";
    }
    return false; // Nếu role không xác định, ẩn tất cả
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/ticket-resell-app-33551.appspot.com/o/images%2Favatar.jpg678f7ea3-4635-4275-8b2d-d86e37922e86?alt=media&token=c10e040a-6b2d-41b3-86bd-9dffd84eb77c"
          alt="Trip Wonder Avatar"
          className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
        />
        <span className="text-neutral-100 text-lg">Ticket Resell</span>
      </div>
      <div className="flex-1 py-4 flex flex-col gap-0.5 border-t-4 border-neutral-700">
        {filteredLinks.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t-4 border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <div
          className={classNames("text-red-500 cursor-pointer", linkClasses)}
          onClick={handleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

let SidebarLink = ({ item }) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path
          ? `bg-neutral-700 text-white`
          : `text-neutral-400`,
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
};
