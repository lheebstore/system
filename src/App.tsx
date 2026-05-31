import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct.tsx";

import Orders from "./pages/Orders";
import AddOrder from "./pages/AddOrder";

import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

function App() {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />
      </Routes>
    );
  }

  return (
    <div className="flex bg-black min-h-screen">

      <Sidebar />

      <main className="flex-1">

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/add"
            element={<AddProduct />}
          />

          <Route
            path="/products/edit/:id"
            element={<EditProduct />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/add"
            element={<AddOrder />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/login"
            element={<Navigate to="/" />}
          />

        </Routes>

      </main>

    </div>
  );
}

export default App;