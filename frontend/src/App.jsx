import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "../src/pages/SignUp/SignUp";
import SignIn from "../src/pages/SignIn/SignIn";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import Feed from "./pages/Feed/Feed";
import Users from "./pages/Users/Users";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index path="/" element={<Feed />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
