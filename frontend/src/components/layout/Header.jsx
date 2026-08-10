import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white shadow-md p-5">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome to Hospital Quality Inspection System
        </p>
      </div>

      <div className="flex items-center gap-6">

        <button className="text-2xl text-gray-600 hover:text-blue-700">
          <FaBell />
        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle
            size={40}
            className="text-blue-700"
          />

          <div>
            <h2 className="font-semibold">
              Admin
            </h2>

            <p className="text-sm text-gray-500">
              Quality Manager
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Header;