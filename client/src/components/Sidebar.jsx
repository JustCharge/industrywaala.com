import clsx from "clsx";
import React from "react";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlinePendingActions,
  MdTaskAlt,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import circleLogo from '../assets/circle.png'; 

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
  {
    label: "Status",
    link: "user-progress",  // Ensure this path is correct
    icon: <MdTaskAlt />
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 7);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        onClick={closeSidebar}
        to={el.link}
        className={clsx(
          "w-fult lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 dark:text-gray-400 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-700 text-white" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-[#2564ed]'>{el.label}</span>
      </Link>
    );
  };

  return (
    <div className='w-full h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
        <p className='p-2 rounded-full'>
        <img src={circleLogo} alt="Circle Logo" className='text-white text-xl sm:text-lg font-black' />
        </p>
        <span className='text-xl font-bold text-black dark:text-white'>
          Industrywaala.com
        </span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className=''>
        {/* <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800 dark:text-white'>
          <MdSettings />
          <span>Settings</span>
        </button> */}
      </div>
    </div>
  );
};

export default Sidebar;
