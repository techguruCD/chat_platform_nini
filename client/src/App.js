// import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import './App.css';
import './styles/general.scss';
import store from './store'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import routes from './routes'
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/home" element={<PrivateRoute component={Home} />} />
          <Route exact path="/login" element={<PublicRoute component={Login} />} />
          <Route exact path="/register" element={<PublicRoute component={Register} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
