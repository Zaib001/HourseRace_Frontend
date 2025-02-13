import { useEffect, useState } from "react";
import { getHorses, searchHorse } from "../utils/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const HorsesList = () => {
  const [horses, setHorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredHorse, setFilteredHorse] = useState(null);

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

  const handleSearch = async () => {
    if (!search) return toast.error("Please enter a horse name to search");

    try {
      const data = await searchHorse(search);
      setFilteredHorse(data);
      toast.success("Horse found!");
    } catch (error) {
      setFilteredHorse(null);
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
        Registered Horses
      </h2>

      {/* Search Field */}
      <div className="flex items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search Horse by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
        >
          Search 🔍
        </button>
      </div>

      {/* Search Result */}
      {filteredHorse && (
        <div className="p-4 bg-green-100 border border-green-400 rounded-md mb-6">
          <h3 className="text-lg font-semibold text-green-700">Horse Found:</h3>
          <p><strong>Name:</strong> {filteredHorse.name}</p>
          <p><strong>Year of Birth:</strong> {filteredHorse.yearOfBirth}</p>
          <p><strong>Dam:</strong> {filteredHorse.dam}</p>
          <p><strong>Sire:</strong> {filteredHorse.sire}</p>
          <p><strong>Sex:</strong> {filteredHorse.sex}</p>
          <p><strong>Owner:</strong> {filteredHorse.owner}</p>
          <p><strong>Wallet Address:</strong> {filteredHorse.walletAddress}</p>
          <p><strong>Status:</strong> {filteredHorse.status}</p>
        </div>
      )}

      {/* Horses List */}
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : horses.length === 0 ? (
        <p className="text-center text-gray-500">No horses registered yet.</p>
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
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {horses.map((horse, index) => (
                <motion.tr
                  key={horse.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b hover:bg-gray-100 transition text-center"
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
                  <td
                    className={`p-4 font-bold ${
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
