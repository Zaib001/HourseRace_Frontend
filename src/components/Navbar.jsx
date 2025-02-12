import { useState, useEffect } from "react";
import { login } from "../utils/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Navbar = ({ setUser, user }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setWallet(savedUser.wallet);
      setUser(savedUser);
    }
  }, [setUser]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error("MetaMask not detected. Please install MetaMask.");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const walletAddress = accounts[0];

      const { token } = await login(walletAddress);

      const userData = { wallet: walletAddress, token };
      setWallet(walletAddress);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error?.message || "Login failed!");
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Disconnected from wallet.");
  };

  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link to="/">Horse Registry</Link>
      </h1>

      <div className="flex items-center space-x-4">
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          Register Horse
        </Link>

        {wallet ? (
          <>
            <span className="bg-gray-800 text-white px-3 py-2 rounded">
              {wallet.slice(0, 6)}...{wallet.slice(-4)}
            </span>
            <button onClick={disconnectWallet} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </>
        ) : (
          <button onClick={connectWallet} className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-gray-200 transition">
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
