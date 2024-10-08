import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineQuestionMarkCircle,
  HiOutlineAnnotation,
  HiOutlineTicket,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: `dashboard`,
    label: `Dashboard`,
    path: `/`,
    icon: <HiOutlineViewGrid />,
  },
  {
    key: `transaction`,
    label: `Transaction`,
    path: `/transaction`,
    icon: <HiOutlineCurrencyDollar />,
  },
  {
    key: `platformFee`,
    label: `Platform Fee`,
    path: `/platform-fee`,
    icon: <HiOutlineCube />,
  },
  {
    key: `user`,
    label: `User`,
    path: `/user`,
    icon: <HiOutlineUsers />,
  },
  {
    key: `post`,
    label: `Post`,
    path: `/post`,
    icon: <HiOutlineAnnotation />,
  },
  {
    key: `ticket`,
    label: `Ticket`,
    path: `/ticket`,
    icon: <HiOutlineTicket />,
  },
  {
    key: `order`,
    label: `Order`,
    path: `/order`,
    icon: <HiOutlineShoppingCart />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: `support`,
    label: `Help & Support`,
    path: `/support`,
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
