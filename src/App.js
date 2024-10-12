import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Transaction from "./components/transaction/Transaction";
import PlatformFee from "./components/platformfee/PlatformFee";
import User from "./components/user/User";
import Post from "./components/post/Post";
import Ticket from "./components/ticket/Ticket";
import Order from "./components/order/Order";
import Support from "./components/support/Support";
import Login from "./components/login/Login";
import ChangePassword from "./components/changepassword/ChangePassword";
import ProfilePage from "./components/profile/Profile";
import ProfileUpdate from "./components/profile/ProfileUpdate";
import TransactionDetails from "./components/transaction/TransactionDetails";
import PlatformFeeAddNew from "./components/platformfee/PlatformFeeAddNew";
import PlatformFeeUpdate from "./components/platformfee/PlatformFeeUpdate";
import UserAddNew from "./components/user/UserAddNew";
import UserDetails from "./components/user/UserDetails";
import TicketDetails from "./components/ticket/TicketDetails";
import PostDetails from "./components/post/PostDetails";
import OrderDetails from "./components/order/OrderDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />

          <Route path="/platform-fee" element={<PlatformFee />} />
          <Route path="/platform-fee/save" element={<PlatformFeeAddNew />} />
          <Route
            path="/platform-fee/update/:id"
            element={<PlatformFeeUpdate />}
          />

          <Route path="/user" element={<User />} />
          <Route path="/user/save" element={<UserAddNew />} />
          <Route path="/user/:id" element={<UserDetails />} />

          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<PostDetails />} />

          <Route path="/ticket" element={<Ticket />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />

          <Route path="/order" element={<Order />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/support" element={<Support />} />

          <Route path="profiles/:id" element={<ProfilePage />} />
          <Route path="profiles/edit/:id" element={<ProfileUpdate />} />
        </Route>

        <Route path="change-password" element={<ChangePassword />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
