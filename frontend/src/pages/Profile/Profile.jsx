import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

import {
  FaUser,
  FaEnvelope,
  FaHospital,
  FaShieldAlt,
} from "react-icons/fa";

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-8">

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              My Profile
            </h1>

            <p className="text-gray-500 mt-1">
              Manage your Hospital Quality Inspection System profile
            </p>
          </div>

          {/* Profile Card */}
          <div className="max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">

            {/* Profile Header */}
            <div className="bg-blue-700 p-8 text-white">

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 bg-white text-blue-700 rounded-full flex items-center justify-center text-3xl">
                  <FaUser />
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    Hospital Quality Inspector
                  </h2>

                  <p className="text-blue-100 mt-1">
                    HQIS Administrator
                  </p>
                </div>

              </div>

            </div>

            {/* Profile Information */}
            <div className="p-8">

              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div className="border rounded-lg p-5">

                  <div className="flex items-center gap-3 mb-2">

                    <FaUser className="text-blue-600" />

                    <span className="text-sm text-gray-500">
                      Name
                    </span>

                  </div>

                  <p className="font-semibold text-gray-800">
                    Hospital Quality Inspector
                  </p>

                </div>

                {/* Email */}
                <div className="border rounded-lg p-5">

                  <div className="flex items-center gap-3 mb-2">

                    <FaEnvelope className="text-blue-600" />

                    <span className="text-sm text-gray-500">
                      Email
                    </span>

                  </div>

                  <p className="font-semibold text-gray-800">
                    Inspector Account
                  </p>

                </div>

                {/* Organization */}
                <div className="border rounded-lg p-5">

                  <div className="flex items-center gap-3 mb-2">

                    <FaHospital className="text-blue-600" />

                    <span className="text-sm text-gray-500">
                      Organization
                    </span>

                  </div>

                  <p className="font-semibold text-gray-800">
                    Hospital Quality Inspection System
                  </p>

                </div>

                {/* Role */}
                <div className="border rounded-lg p-5">

                  <div className="flex items-center gap-3 mb-2">

                    <FaShieldAlt className="text-blue-600" />

                    <span className="text-sm text-gray-500">
                      Role
                    </span>

                  </div>

                  <p className="font-semibold text-gray-800">
                    Administrator
                  </p>

                </div>

              </div>

              {/* Account Status */}
              <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <h4 className="font-semibold text-green-800">
                      Account Status
                    </h4>

                    <p className="text-sm text-green-700 mt-1">
                      Your account is active and verified.
                    </p>

                  </div>

                  <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
                    Active
                  </span>

                </div>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Profile;