import "./App.css";
import Homepage from "./pages/user/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/user/login";
import SignupPage from "./pages/user/signup";
import ProfilePage from "./pages/user/userprofile";
import AdminLogin from "./pages/admin/adminlogin";
import Adminpanel from "./pages/admin/adminpanel";
import Adminsignup from "./pages/admin/adminsignup";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { store } from "./redux/redux";
import {Adminloged, Checklogin,Checkloginadmin,IsLogged} from "./loginauth/loginauth";
import EdituserPage from "./pages/admin/edituser";

const persistor =persistStore(store)

function App() {
  return (
    <BrowserRouter>
      <Provider store = {store}>
        <PersistGate persistor={persistor}>
        <Routes>
          <Route element={<Checklogin/>}>
          <Route path = "/" element={<Homepage />} />
          <Route path = "/user" element={<ProfilePage />} />
          </Route>
          <Route element={<IsLogged/>}>
          <Route path = "/login" element={<Loginpage />} />
          <Route path = "/signup" element={<SignupPage />} />
          </Route>
          <Route element={<Checkloginadmin/>}>
          <Route path = "/admin" element={<AdminLogin />} />
          </Route>
          <Route element={<Adminloged/>}>
          <Route path = "/adminpanel" element={<Adminpanel />} />
          <Route path = "/adminsignup" element={<Adminsignup />} />
          <Route path = "/adminedituser" element={<EdituserPage/>}/>
          </Route>
        </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
