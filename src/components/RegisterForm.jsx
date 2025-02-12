import { useState } from "react";
import { registerHorse } from "../utils/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const [horse, setHorse] = useState({
    name: "",
    yearOfBirth: "",
    dam: "",
    sire: "",
    sex: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await registerHorse(horse);
      toast.success("Horse registered successfully!");
      setHorse({ name: "", yearOfBirth: "", dam: "", sire: "", sex: "" });
    } catch (error) {
      toast.error(error?.message || "Error registering horse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register a New Horse</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-semibold mb-2">Horse Name</label>
          <input 
            type="text"
            placeholder="Enter horse name"
            value={horse.name}
            onChange={(e) => setHorse({ ...horse, name: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-semibold mb-2">Year of Birth</label>
          <input 
            type="number"
            placeholder="Enter year of birth"
            value={horse.yearOfBirth}
            onChange={(e) => setHorse({ ...horse, yearOfBirth: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-semibold mb-2">Dam (Mother)</label>
          <input 
            type="text"
            placeholder="Enter Dam (Mother)"
            value={horse.dam}
            onChange={(e) => setHorse({ ...horse, dam: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-semibold mb-2">Sire (Father)</label>
          <input 
            type="text"
            placeholder="Enter Sire (Father)"
            value={horse.sire}
            onChange={(e) => setHorse({ ...horse, sire: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-semibold mb-2">Sex</label>
          <select 
            value={horse.sex}
            onChange={(e) => setHorse({ ...horse, sex: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Sex</option>
            <option value="Colt">Colt</option>
            <option value="Filly">Filly</option>
          </select>
        </div>

        <motion.button 
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-700 text-white px-4 py-2 rounded mt-4 hover:bg-blue-800 transition"
        >
          {loading ? "Registering..." : "Register Horse"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default RegisterForm;
