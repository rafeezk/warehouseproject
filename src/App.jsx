import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListData from "./admin/ListData";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AuthRoute from "./auth/AuthRoute";
import ProfilePage from "./pages/ProfilePage";
import AuthAdmin from "./auth/AuthAdmin";
import DetailPage from "./pages/DetailPage";

// library
import { library } from "@fortawesome/fontawesome-svg-core";

// icons
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import CartPage from "./pages/CartPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<DetailPage />} />

        <Route element={<AuthRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/history" element={<HistoryPage/>} />
        </Route>

        <Route element={<AuthAdmin />}>
          <Route path="/admin" element={<ListData />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
library.add(fab, fas, far);
