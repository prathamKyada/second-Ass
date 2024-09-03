"use client";
import { useContext, useState } from "react";
import { ContractContext } from "@/context/contextProvider";
import { ethers } from "ethers"; // Import ethers to handle BigNumber conversion

const CharityDetails = () => {
  const [charityAddress, setCharityAddress] = useState("");
  const [charityDetails, setCharityDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { getCharityFunc } = useContext(ContractContext);

  const handleGetCharityFunc = async () => {
    try {
      const charityData = await getCharityFunc(charityAddress);

      // Convert balance from BigNumber to a string using ethers
      const formattedBalance = ethers.utils.formatEther(charityData.balance);

      setCharityDetails({
        name: charityData.name,
        description: charityData.description,
        balance: formattedBalance,
        isRegistered: charityData.isRegistered,
      });

      setMessage("");
      setIsError(false);
    } catch (error) {
      setMessage("An error occurred while fetching charity details.");
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Charity Details
        </h1>
        <input
          type="text"
          placeholder="Enter Charity Address"
          value={charityAddress}
          onChange={(e) => setCharityAddress(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <button
          onClick={handleGetCharityFunc}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Get Details
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

        {charityDetails && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Name: {charityDetails.name}
            </h2>
            <p className="mb-2 text-gray-700">
              Description: {charityDetails.description}
            </p>
            <p className="mb-2 text-gray-700">
              Balance: {charityDetails.balance} ETH
            </p>
            <p className="mb-2 text-gray-700">
              Status:{" "}
              {charityDetails.isRegistered ? "Registered" : "Not Registered"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharityDetails;
