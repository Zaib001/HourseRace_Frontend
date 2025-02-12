import { useEffect, useState } from "react";
import { getHorses, approveHorse } from "../utils/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AdminPanel = ({ user }) => {
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvedHorses, setApprovedHorses] = useState({}); // Store approved horses

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
      await approveHorse(horseName, user.token);
      setApprovedHorses((prev) => ({ ...prev, [horseName]: true })); // Mark horse as approved
      setTimeout(() => {
        setHorses((prevHorses) => prevHorses.filter((horse) => horse.name !== horseName)); // Remove after animation
      }, 2000);
      toast.success("Horse approved successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

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

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading pending approvals...</p>
      ) : horses.length === 0 ? (
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
              {horses.map((horse, index) => (
                <motion.tr
                  key={horse.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-b transition text-center ${
                    approvedHorses[horse.name] ? "bg-green-100 transition-colors duration-500" : "hover:bg-gray-100"
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
                        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition"
                      >
                        Approve ✅
                      </button>
                    ) : (
                      <span className="text-green-700 font-bold">Approved ✅</span>
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
