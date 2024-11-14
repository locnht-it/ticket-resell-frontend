import { Transition, Menu } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const userDetails = await auth.user;
      setUser(userDetails);
      console.log(`>>> Check user from Header: `, userDetails);
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-300">
      {/* Nút toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 hover:text-gray-900"
      >
        <HiOutlineMenuAlt1 size={24} />
      </button>
      <div className="flex justify-end items-center gap-2 mr-2">
        <Menu as="div">
          <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
            <span className="sr-only">Open user menu</span>
            {user && user.image ? (
              <div
                className="h-10 w-10 rounded-full bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${user.image})` }}
              >
                <span className="sr-only">{user.fullname}</span>
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
            )}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && `bg-gray-200`,
                      "text-gray-700 focus:bg-gray-200 block cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={() => navigate(`/profile/${user?.id}`)}
                  >
                    My Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && `bg-gray-200`,
                      "text-gray-700 focus:bg-gray-200 block cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
