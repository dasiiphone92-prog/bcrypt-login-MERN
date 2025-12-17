// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import TeamLogin from "./pages/TeamLogin.jsx";
import AdminHome from "./pages/AdminHome";

import ShowShop from "./pages/ShowShop.jsx";
import CreateShop from "./pages/CreateShop.jsx";
import EditShop from "./pages/EditShop.jsx";
import DeleteShop from "./pages/DeleteShop.jsx";


import ShowDonor from "./pages/ShowDonor.jsx";
import CreateDonor from "./pages/CreateDonor.jsx";
import EditDonor from "./pages/EditDonor.jsx";
import DeleteDonor from "./pages/DeleteDonor.jsx";

import ShowFamily from "./pages/ShowFamily.jsx";
import CreateFamily from "./pages/CreateFamily.jsx";
import EditFamily from "./pages/EditFamily.jsx";
import DeleteFamily from "./pages/DeleteFamily.jsx";

import ShowTeam from "./pages/ShowTeam.jsx";
import CreateTeam from "./pages/CreateTeam.jsx";
import EditTeam from "./pages/EditTeam.jsx";
import DeleteTeam from "./pages/DeleteTeam.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      {/* דף הבית - פתוח לכולם */}
      <Route path="/" element={<Home />} />

      {/* לוגין מנהל */}
      <Route path="/login" element={<Login />} />

      {/* לוגין חבר צוות */}
      <Route path="/team-login" element={<TeamLogin />} />

      {/* תורמים */}
      <Route
        path="/donors"
        element={
          <ProtectedRoute>
            <ShowDonor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donors/create"
        element={
          <ProtectedRoute>
            <CreateDonor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donors/edit/:id"
        element={
          <ProtectedRoute>
            <EditDonor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donors/delete/:id"
        element={
          <ProtectedRoute>
            <DeleteDonor />
          </ProtectedRoute>
        }
      />

      {/* משפחות */}
      <Route
        path="/families"
        element={
          <ProtectedRoute>
            <ShowFamily />
          </ProtectedRoute>
        }
      />
      <Route
        path="/families/create"
        element={
          <ProtectedRoute>
            <CreateFamily />
          </ProtectedRoute>
        }
      />
      <Route
        path="/families/edit/:id"
        element={
          <ProtectedRoute>
            <EditFamily />
          </ProtectedRoute>
        }
      />
      <Route
        path="/families/delete/:id"
        element={
          <ProtectedRoute>
            <DeleteFamily />
          </ProtectedRoute>
        }
      />

      {/* קבוצות חלוקה */}
      <Route
        path="/teams"
        element={
          <ProtectedRoute>
            <ShowTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teams/create"
        element={
          <ProtectedRoute>
            <CreateTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teams/edit/:id"
        element={
          <ProtectedRoute>
            <EditTeam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teams/delete/:id"
        element={
          <ProtectedRoute>
            <DeleteTeam />
          </ProtectedRoute>
        }
      />

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminHome />
    </ProtectedRoute>
  }
/>
<Route path="/shop" element={<ShowShop />} />
<Route path="/shop/create" element={<CreateShop />} />
<Route path="/shop/edit/:id" element={<EditShop />} />
<Route path="/shop/delete/:id" element={<DeleteShop />} />


  </Routes>
  );
}


export default App;
