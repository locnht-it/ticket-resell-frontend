import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import Category from "./components/category/Category";
import CategoryAddNew from "./components/category/CategoryAddNew";
import { AuthProvider } from "./AuthContext";
import RequireAuth from "./RequireAuth";
import NoAccess from "./NoAccess";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Protected routes */}
          <Route
            element={<RequireAuth allowedRoles={[1, 2, "ADMIN", "STAFF"]} />}
          >
            <Route path="/" element={<Layout />}>
              {/* Shared routes for both admin and staff */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile/:id" element={<ProfilePage />} />
              <Route path="profile/edit/:id" element={<ProfileUpdate />} />
              <Route path="support" element={<Support />} />
              <Route path="change-password" element={<ChangePassword />} />

              <Route path="no-access" element={<NoAccess />} />
              <Route path="user/:id" element={<UserDetails />} />
              <Route path="transaction" element={<Transaction />} />
              <Route path="transaction/:id" element={<TransactionDetails />} />

              {/* Admin */}
              <Route element={<RequireAuth allowedRoles={[1, "ADMIN"]} />}>
                <Route path="user" element={<User />} />
                <Route path="user/save" element={<UserAddNew />} />
              </Route>

              {/* Staff */}
              <Route element={<RequireAuth allowedRoles={[2, "STAFF"]} />}>
                <Route path="platform-fee" element={<PlatformFee />} />
                <Route
                  path="platform-fee/save"
                  element={<PlatformFeeAddNew />}
                />
                <Route
                  path="platform-fee/update/:id"
                  element={<PlatformFeeUpdate />}
                />
                <Route path="post" element={<Post />} />
                <Route path="post/:id" element={<PostDetails />} />
                <Route path="ticket" element={<Ticket />} />
                <Route path="ticket/:id" element={<TicketDetails />} />
                <Route path="order" element={<Order />} />
                <Route path="order/:id" element={<OrderDetails />} />
                <Route path="category" element={<Category />} />
                <Route path="category/save" element={<CategoryAddNew />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
