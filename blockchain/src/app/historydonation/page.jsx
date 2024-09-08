"use client";
import { useState, useContext } from "react";
import { ContractContext } from "@/context/contextProvider";
import { ethers } from "ethers";

const weiToMatic = (weiAmount) => {
  const ethAmount = ethers.utils.formatEther(weiAmount);
  return parseFloat(ethAmount); // Convert ETH to MATIC
};

const DonationHistory = () => {
  const [charityAddress, setCharityAddress] = useState("");
  const [donationHistory, setDonationHistory] = useState([]);
  const [amountHis, setAmountHis] = useState([]);
  const [timeHis, setTimeHis] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { getDonationHistoryFunc } = useContext(ContractContext);

  const handleFetchHistory = async () => {
    try {
      const history = await getDonationHistoryFunc(charityAddress);

      if (history && history.length > 0) {
        const [timestamps, amounts] = history;
        setDonationHistory(history);
        setAmountHis(amounts.map(weiToMatic)); // Convert amounts to MATIC
        setTimeHis(timestamps);

        setMessage("");
        setIsError(false);
      } else {
        setMessage("No donation history found for the given address.");
        setIsError(true);
      }
    } catch (error) {
      setMessage("An error occurred while fetching donation history.");
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Donation History
        </h1>
        <div className="space-y-4">
          {/* Input for Charity Address */}
          <input
            type="text"
            placeholder="Enter Charity Address"
            value={charityAddress}
            onChange={(e) => setCharityAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
          />
          {/* Fetch History Button */}
          <button
            onClick={handleFetchHistory}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Fetch History
          </button>
        </div>

        {/* Error/Success Message */}
        {message && (
          <p
            className={`mt-4 text-center ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Donation History Table */}
        {donationHistory.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border border-gray-300 text-gray-800">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left border-b">Charity Name</th>
                  <th className="p-3 text-left border-b">Amount (MATIC)</th>
                  <th className="p-3 text-left border-b">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {amountHis.map((amount, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-3 border-b">Charity {index + 1}</td>
                    <td className="p-3 border-b">{amount.toFixed(2)} MATIC</td>
                    <td className="p-3 border-b">
                      {new Date(timeHis[index] * 1000).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
