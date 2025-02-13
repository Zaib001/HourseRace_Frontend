import { useEffect, useState } from "react";
import { getHorses, approveHorse } from "../utils/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AdminPanel = ({ user }) => {
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedHorses, setApprovedHorses] = useState({}); // Store approved horses
  const [search, setSearch] = useState(""); // Search box state
  console.log(horses[0].owner)
  useEffect(() => {
    async function fetchHorses() {
      try {
        const data = await getHorses();
        setHorses(data.filter((horse) => horse.status === "pending"));
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchHorses();
  }, []);

  const handleApprove = async (horseName) => {
    if (!window.confirm(`Are you sure you want to approve "${horseName}"?`)) return;

    try {
      await approveHorse(horseName, horses[0].owner);
      setApprovedHorses((prev) => ({ ...prev, [horseName]: true })); // Mark horse as approved
      setTimeout(() => {
        setHorses((prevHorses) => prevHorses.filter((horse) => horse.name !== horseName)); // Remove after animation
      }, 2000);
      toast.success("Horse approved successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  // Filter horses based on search input
  const filteredHorses = horses.filter((horse) =>
    horse.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Panel - Approve Horses
      </h2>

      {/* Search Box */}
      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search Horse by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
        >
          🔍 Search
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading pending approvals...</p>
      ) : filteredHorses.length === 0 ? (
        <p className="text-center text-gray-500">No horses pending approval.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white text-center">
                <th className="p-4">Name</th>
                <th className="p-4">Year of Birth</th>
                <th className="p-4">Dam (Mother)</th>
                <th className="p-4">Sire (Father)</th>
                <th className="p-4">Sex</th>
                <th className="p-4">Owner Wallet</th>
                <th className="p-4">Horse Wallet</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHorses.map((horse, index) => (
                <motion.tr
                  key={horse.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-b transition text-center ${approvedHorses[horse.name] ? "bg-green-100 transition-colors duration-500" : "hover:bg-gray-100"
                    }`}
                >
                  <td className="p-4 font-medium">{horse.name}</td>
                  <td className="p-4">{horse.yearOfBirth}</td>
                  <td className="p-4">{horse.dam}</td>
                  <td className="p-4">{horse.sire}</td>
                  <td className="p-4">{horse.sex}</td>
                  <td className="p-4">
                    {horse.owner.slice(0, 6)}...{horse.owner.slice(-4)}
                  </td>
                  <td className="p-4">
                    {horse.walletAddress.slice(0, 6)}...{horse.walletAddress.slice(-4)}
                  </td>
                  <td className="p-4">
                    {!approvedHorses[horse.name] ? (
                      <button
                        onClick={() => handleApprove(horse.name)}
                        className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition"
                      >
                        Approve ⚡
                      </button>
                    ) : (
                      <span className="bg-green-600 text-white px-3 py-2 rounded">Approved ✅</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default AdminPanel;
