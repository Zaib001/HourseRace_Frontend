import { useEffect, useState } from "react";
import { getHorses } from "../utils/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const HorsesList = () => {
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHorses() {
      try {
        const data = await getHorses();
        setHorses(data);
      } catch (error) {
        toast.error(error?.message || "Error fetching horses");
      } finally {
        setLoading(false);
      }
    }
    fetchHorses();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Registered Horses
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : horses.length === 0 ? (
        <p className="text-center text-gray-500">No horses registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 text-center">Name</th>
                <th className="p-4 text-center">Year of Birth</th>
                <th className="p-4 text-center">Owner</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {horses.map((horse, index) => (
                <motion.tr
                  key={horse.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-4 text-center font-medium">{horse.name}</td>
                  <td className="p-4 text-center">{horse.yearOfBirth}</td>
                  <td className="p-4 text-center">
                    {horse.owner.slice(0, 6)}...{horse.owner.slice(-4)}
                  </td>
                  <td
                    className={`p-4 text-center font-bold ${
                      horse.status === "approved" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {horse.status.charAt(0).toUpperCase() + horse.status.slice(1)}
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

export default HorsesList;
