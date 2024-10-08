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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="/transaction" element={<Transaction />} />

          <Route path="/platform-fee" element={<PlatformFee />} />

          <Route path="/user" element={<User />} />

          <Route path="/post" element={<Post />} />

          <Route path="/ticket" element={<Ticket />} />

          <Route path="/order" element={<Order />} />

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
