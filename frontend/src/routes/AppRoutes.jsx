import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Hospitals from "../pages/Hospitals/Hospitals";
import Departments from "../pages/Departments/Departments";
import Inspections from "../pages/Inspections/Inspections";
import Findings from "../pages/Findings/Findings";
import AIReports from "../pages/AIReports/AIReports";
import Profile from "../pages/Profile/Profile";

import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* ======================================
            PUBLIC ROUTES
        ====================================== */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ======================================
            PROTECTED ROUTES
        ====================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospitals"
          element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          }
        />

        <Route
          path="/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inspections"
          element={
            <ProtectedRoute>
              <Inspections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/findings"
          element={
            <ProtectedRoute>
              <Findings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-reports"
          element={
            <ProtectedRoute>
              <AIReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;