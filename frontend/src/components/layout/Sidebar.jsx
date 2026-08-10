import { NavLink } from "react-router-dom";

import {
  FaHospital,
  FaBuilding,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaRobot,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";

import supabase from "../../services/supabase";

const Sidebar = () => {
  const menus = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
    },

    {
      name: "Hospitals",
      icon: <FaHospital />,
      path: "/hospitals",
    },

    {
      name: "Departments",
      icon: <FaBuilding />,
      path: "/departments",
    },

    {
      name: "Inspections",
      icon: <FaClipboardCheck />,
      path: "/inspections",
    },

    {
      name: "Findings",
      icon: <FaExclamationTriangle />,
      path: "/findings",
    },

    {
      name: "AI Reports",
      icon: <FaRobot />,
      path: "/ai-reports",
    },

    {
      name: "Profile",
      icon: <FaUser />,
      path: "/profile",
    },
  ];

  // ======================================
  // LOGOUT
  // ======================================
  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) {
      return;
    }

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/";
  };

  return (
    <div className="w-64 min-h-screen bg-blue-800 text-white relative flex flex-col">

      {/* ======================================
          LOGO
      ====================================== */}

      <div className="px-6 py-6 border-b border-blue-700">

        <div className="flex items-center gap-3">

          <div className="bg-white text-blue-800 rounded-lg p-2">
            <FaHospital className="text-xl" />
          </div>

          <div>

            <h1 className="text-xl font-bold">
              HQIS
            </h1>

            <p className="text-xs text-blue-200">
              Hospital Inspection
            </p>

          </div>

        </div>

      </div>

      {/* ======================================
          NAVIGATION
      ====================================== */}

      <div className="mt-5 px-3">

        {menus.map((menu) => (

          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white text-blue-800 shadow-md"
                  : "text-blue-100 hover:bg-blue-700 hover:text-white"
              }`
            }
          >

            <span className="text-lg">
              {menu.icon}
            </span>

            <span className="font-medium">
              {menu.name}
            </span>

          </NavLink>

        ))}

      </div>

      {/* ======================================
          LOGOUT
      ====================================== */}

      <div className="mt-auto p-5">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg transition"
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </button>

      </div>

    </div>
  );
};

export default Sidebar;