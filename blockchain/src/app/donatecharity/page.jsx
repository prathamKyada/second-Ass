"use client";
import { useState, useContext } from "react";
import { ContractContext } from "@/context/contextProvider";
// import { ethers } from "ethers"; // Import ethers to handle conversion

const DonateToCharity = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { donateToCharityFunc, donatData } = useContext(ContractContext);

  const handleDonate = async () => {
    try {
      // Convert amount to wei using ethers
      //   const amountInWei = ethers.utils.parseEther(amount);

      // Call the donate function from the contract
      await donateToCharityFunc(amount);
      await  donatData();
      setMessage("Donation successful!");
      setIsError(false);
      setAmount("");
    } catch (error) {
      setMessage("An error occurred while making the donation.");
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Donate to Charity
        </h1>
        <input
          type="number"
          placeholder="Donation Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          step="0.01"
        />
        <button
          onClick={handleDonate}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Donate
        </button>

        {message && (
          <p
            className={`mt-4 text-center ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default DonateToCharity;
