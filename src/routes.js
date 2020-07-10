/*! waviii.io */
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import EditProfile from "views/EditProfile.js";
import Wallet from "views/wallet";
import Swap from "views/swap";

var routes = [
 // {
 //   path: "/dashboard",
 //   name: "Dashboard",
 //   rtlName: "لوحة القيادة",
 //   icon: "wav-icons icon-chart-pie-36",
 //   component: Dashboard,
 //   layout: "/admin"
 // },
  {
    path: "/Wallet",
    name: "Wallet",
    rtlName: "الرموز",
    icon: "wav-icons icon-wallet-43",
    component: Wallet,
    layout: "/admin"
  },
  {
    path: "/Swap",
    name: "Buy & Sell waviii",
    rtlName: "إخطارات",
    icon: "wav-icons icon-refresh-02",
    component: Swap,
    layout: "/admin"
  },
  {
    path: "/Profile",
    name: "Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "wav-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/EditProfile",
    name: "Edit Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "wav-icons icon-single-02",
    component: EditProfile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Community",
    rtlName: "قائمة الجدول",
    icon: "wav-icons icon-molecule-40",
    component: TableList,
    layout: "/admin"
  },
 //{
 //   path: "/notifications",
 //   name: "Notifications",
 //   rtlName: "إخطارات",
 //   icon: "wav-icons icon-bell-55",
 //   component: Notifications,
 //   layout: "/admin"
 // },
 // {
 //   path: "/typography",
 //   name: "Typography",
 //   rtlName: "طباعة",
 //   icon: "wav-icons icon-align-center",
 //   component: Typography,
 //   layout: "/admin"
 // },
 // {
 //   path: "/rtl-support",
 //   name: "RTLサポート",
 //   rtlName: "RTLサポート",
 //   icon: "wav-icons icon-world",
 //   component: Rtl,
 //   layout: "/rtl"
 // }
];
export default routes;
