import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "totalusers",
    label: "Total Users",
    path: "/admin/totalusers",
    icon: <HiOutlineCube />,
  },
  {
    key: "totalemployee",
    label: "Total Employee",
    path: "/admin/totalemployee",
    icon: <HiOutlineCube />,
  },
  {
    key: "totalproduct",
    label: "Total Spare Parts",
    path: "/admin/totalproducts",
    icon: <HiOutlineCube />,
  },
  {
    key: "createbranch",
    label: "Create Branch",
    path: "/admin/branch",
    icon: <HiOutlineCube />,
  },
  {
    key: "createcategory",
    label: "Create Category",
    path: "/admin/category",
    icon: <HiOutlineCube />,
  },
];
