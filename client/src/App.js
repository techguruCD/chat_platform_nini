// import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from 'jwt-decode'
import './App.css';
import './styles/general.scss';
import store from './store'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./store/slice/authSlice";
import socket from "./socket";
import { getContacts, setChatTarget } from "./store/action/chatAction";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  socket.connect()
  store.dispatch(setChatTarget())
  store.dispatch(getContacts())
  // // Check for expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   // Logout user
  //   store.dispatch(logoutUser());
  //   // Clear current Profile
  //   store.dispatch(clearCurrentProfile());
  //   // Redirect to login
  //   window.location.href = "/login";
  // }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/chat/home" element={<PrivateRoute component={Home} />} />
          <Route exact path="/chat/login" element={<PublicRoute component={Login} />} />
          <Route exact path="/chat/register" element={<PublicRoute component={Register} />} />
          <Route path="*" element={<Navigate to="/chat/login" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
