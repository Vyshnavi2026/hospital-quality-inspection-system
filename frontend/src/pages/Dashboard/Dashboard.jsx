import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";

import {
  FaHospital,
  FaBuilding,
  FaClipboardCheck,
  FaRobot,
  FaExclamationTriangle,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getHospitals } from "../../services/hospitalService";
import { getDepartments } from "../../services/departmentService";
import { getInspections } from "../../services/inspectionService";
import { getFindings } from "../../services/findingService";
import { getAIReports } from "../../services/aiReportService";

const Dashboard = () => {
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [findings, setFindings] = useState([]);
  const [aiReports, setAIReports] = useState([]);

  const [loading, setLoading] = useState(true);

  // ======================================
  // LOAD DASHBOARD DATA
  // ======================================
  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [
        hospitalResponse,
        departmentResponse,
        inspectionResponse,
        findingResponse,
        aiReportResponse,
      ] = await Promise.all([
        getHospitals(),
        getDepartments(),
        getInspections(),
        getFindings(),
        getAIReports(),
      ]);

      setHospitals(hospitalResponse.hospitals || []);

      setDepartments(departmentResponse.departments || []);

      setInspections(inspectionResponse.inspections || []);

      setFindings(findingResponse.findings || []);

      setAIReports(aiReportResponse.reports || []);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // ======================================
  // FINDINGS BY SEVERITY
  // ======================================
  const severityData = [
    {
      name: "Low",
      value: findings.filter(
        (f) => f.severity === "Low"
      ).length,
    },
    {
      name: "Medium",
      value: findings.filter(
        (f) => f.severity === "Medium"
      ).length,
    },
    {
      name: "High",
      value: findings.filter(
        (f) => f.severity === "High"
      ).length,
    },
    {
      name: "Critical",
      value: findings.filter(
        (f) => f.severity === "Critical"
      ).length,
    },
  ];

  // ======================================
  // INSPECTION SCORE DATA
  // ======================================
  const scoreData = [...inspections]
    .sort(
      (a, b) =>
        new Date(a.inspection_date) -
        new Date(b.inspection_date)
    )
    .slice(-8)
    .map((inspection) => ({
      name:
        inspection.inspector_name ||
        "Inspection",
      score:
        Number(inspection.overall_score) || 0,
    }));

  // ======================================
  // STATISTICS
  // ======================================
  const criticalFindings = findings.filter(
    (finding) =>
      finding.severity === "Critical" ||
      finding.severity === "High"
  ).length;

  const scores = inspections
    .map((inspection) =>
      Number(inspection.overall_score)
    )
    .filter((score) => !isNaN(score));

  const averageScore =
    scores.length > 0
      ? (
          scores.reduce(
            (total, score) =>
              total + score,
            0
          ) / scores.length
        ).toFixed(1)
      : "0";

  // ======================================
  // RECENT INSPECTIONS
  // ======================================
  const recentInspections = [...inspections]
    .sort(
      (a, b) =>
        new Date(
          b.created_at ||
            b.inspection_date
        ) -
        new Date(
          a.created_at ||
            a.inspection_date
        )
    )
    .slice(0, 5);

  // ======================================
  // DASHBOARD CARDS
  // ======================================
  const cards = [
    {
      title: "Hospitals",
      value: loading
        ? "..."
        : hospitals.length,
      icon: <FaHospital />,
      color: "bg-blue-600",
    },
    {
      title: "Departments",
      value: loading
        ? "..."
        : departments.length,
      icon: <FaBuilding />,
      color: "bg-green-600",
    },
    {
      title: "Inspections",
      value: loading
        ? "..."
        : inspections.length,
      icon: <FaClipboardCheck />,
      color: "bg-orange-500",
    },
    {
      title: "AI Reports",
      value: loading
        ? "..."
        : aiReports.length,
      icon: <FaRobot />,
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-hidden">

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <Sidebar />

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="flex-1 min-w-0 flex flex-col">

        <Header />

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-8">

          {/* ======================================
              TITLE
          ====================================== */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Hospital Quality Inspection Overview
            </p>

          </div>

          {/* ======================================
              STAT CARDS
          ====================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => (

              <div
                key={card.title}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-gray-500">
                      {card.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2 text-gray-800">
                      {card.value}
                    </h2>

                  </div>

                  <div
                    className={`${card.color} p-4 rounded-full text-white text-xl`}
                  >
                    {card.icon}
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* ======================================
              SUMMARY CARDS
          ====================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            {/* Average Score */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <div className="flex items-center gap-4">

                <div className="bg-green-100 text-green-700 p-4 rounded-full">
                  ⭐
                </div>

                <div>

                  <p className="text-gray-500">
                    Average Inspection Score
                  </p>

                  <h2 className="text-3xl font-bold text-gray-800">
                    {loading
                      ? "..."
                      : `${averageScore}%`}
                  </h2>

                </div>

              </div>

            </div>

            {/* Critical Findings */}

            <div className="bg-white rounded-xl shadow-lg p-6">

              <div className="flex items-center gap-4">

                <div className="bg-red-100 text-red-700 p-4 rounded-full">
                  <FaExclamationTriangle />
                </div>

                <div>

                  <p className="text-gray-500">
                    High / Critical Findings
                  </p>

                  <h2 className="text-3xl font-bold text-gray-800">
                    {loading
                      ? "..."
                      : criticalFindings}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* ======================================
              CHARTS
          ====================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* Inspection Score Chart */}

            <div className="bg-white rounded-xl shadow-lg p-6 min-w-0">

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Inspection Score Overview
              </h2>

              <p className="text-sm text-gray-500 mb-5">
                Recent inspection performance
              </p>

              <div className="w-full h-[320px]">

                {scoreData.length === 0 ? (

                  <div className="h-full flex items-center justify-center text-gray-500">
                    No inspection score data available
                  </div>

                ) : (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <BarChart
                      data={scoreData}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                      />

                      <YAxis
                        domain={[0, 100]}
                      />

                      <Tooltip />

                      <Legend />

                      <Bar
                        dataKey="score"
                        name="Inspection Score"
                        fill="#2563eb"
                        radius={[
                          6,
                          6,
                          0,
                          0,
                        ]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                )}

              </div>

            </div>

            {/* Findings Severity Chart */}

            <div className="bg-white rounded-xl shadow-lg p-6 min-w-0">

              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Findings by Severity
              </h2>

              <p className="text-sm text-gray-500 mb-5">
                Distribution of inspection findings
              </p>

              <div className="w-full h-[320px]">

                {findings.length === 0 ? (

                  <div className="h-full flex items-center justify-center text-gray-500">
                    No findings available
                  </div>

                ) : (

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <PieChart>

                      <Pie
                        data={severityData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={105}
                        label
                      >

                        {severityData.map(
                          (entry, index) => (

                            <Cell
                              key={`cell-${index}`}
                              fill={
                                [
                                  "#22c55e",
                                  "#eab308",
                                  "#f97316",
                                  "#ef4444",
                                ][index]
                              }
                            />

                          )
                        )}

                      </Pie>

                      <Tooltip />

                      <Legend />

                    </PieChart>

                  </ResponsiveContainer>

                )}

              </div>

            </div>

          </div>

          {/* ======================================
              RECENT INSPECTIONS
          ====================================== */}

          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-gray-800">
              Recent Inspections
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-5">
              Latest hospital quality inspections
            </p>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b">

                    <th className="text-left p-3 text-gray-600">
                      Inspector
                    </th>

                    <th className="text-left p-3 text-gray-600">
                      Date
                    </th>

                    <th className="text-left p-3 text-gray-600">
                      Score
                    </th>

                    <th className="text-left p-3 text-gray-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center p-8 text-gray-500"
                      >
                        Loading inspections...
                      </td>

                    </tr>

                  ) : recentInspections.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center p-8 text-gray-500"
                      >
                        No inspections available
                      </td>

                    </tr>

                  ) : (

                    recentInspections.map(
                      (inspection) => (

                        <tr
                          key={inspection.id}
                          className="border-b hover:bg-gray-50"
                        >

                          <td className="p-3 font-medium">
                            {inspection.inspector_name ||
                              "-"}
                          </td>

                          <td className="p-3">

                            {inspection.inspection_date
                              ? new Date(
                                  inspection.inspection_date
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "-"}

                          </td>

                          <td className="p-3">

                            <span
                              className={`font-semibold ${
                                Number(
                                  inspection.overall_score
                                ) >= 90
                                  ? "text-green-600"
                                  : Number(
                                      inspection.overall_score
                                    ) >= 75
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              {inspection.overall_score ??
                                "-"}
                            </span>

                          </td>

                          <td className="p-3">

                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                inspection.status ===
                                "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : inspection.status ===
                                    "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {inspection.status ||
                                "-"}
                            </span>

                          </td>

                        </tr>

                      )
                    )

                  )}

                </tbody>

              </table>

            </div>

          </div>

          {/* ======================================
              FINDINGS SUMMARY
          ====================================== */}

          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Findings Overview
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {/* Total */}

              <div className="bg-gray-50 rounded-lg p-4">

                <p className="text-gray-500 text-sm">
                  Total Findings
                </p>

                <p className="text-2xl font-bold mt-1">
                  {loading
                    ? "..."
                    : findings.length}
                </p>

              </div>

              {/* Low */}

              <div className="bg-green-50 rounded-lg p-4">

                <p className="text-gray-500 text-sm">
                  Low
                </p>

                <p className="text-2xl font-bold text-green-600 mt-1">
                  {loading
                    ? "..."
                    : severityData[0].value}
                </p>

              </div>

              {/* Medium */}

              <div className="bg-yellow-50 rounded-lg p-4">

                <p className="text-gray-500 text-sm">
                  Medium
                </p>

                <p className="text-2xl font-bold text-yellow-600 mt-1">
                  {loading
                    ? "..."
                    : severityData[1].value}
                </p>

              </div>

              {/* High / Critical */}

              <div className="bg-red-50 rounded-lg p-4">

                <p className="text-gray-500 text-sm">
                  High / Critical
                </p>

                <p className="text-2xl font-bold text-red-600 mt-1">
                  {loading
                    ? "..."
                    : criticalFindings}
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;