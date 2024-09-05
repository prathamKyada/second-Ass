"use client";
import { useState, useContext } from "react";
import { ContractContext } from "@/context/contextProvider";
import { ethers } from "ethers";

const weiToMatic = (weiAmount) => {
  const ethAmount = ethers.utils.formatEther(weiAmount);
  return parseFloat(ethAmount); // Convert ETH to MATIC (adjust conversion rate if needed)
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

      // Process and set the donation history
      setDonationHistory(history);
      setAmountHis(history[1].map(weiToMatic)); // Convert amounts to MATIC
      setTimeHis(history[0]);

      setMessage("");
      setIsError(false);
    } catch (error) {
      setMessage("An error occurred while fetching donation history.");
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Donation History
        </h1>
        <input
          type="text"
          placeholder="Enter Charity Address"
          value={charityAddress}
          onChange={(e) => setCharityAddress(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <button
          onClick={handleFetchHistory}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Fetch History
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

        {donationHistory.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border border-gray-300 text-black">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 text-left border-b">Charity Name</th>{" "}
                  <th className="p-2 text-left border-b">Amount (MATIC)</th>
                  <th className="p-2 text-left border-b">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {amountHis.map((amount, index) => (
                  <tr key={index}>
                    <td className="p-2 border-b"></td>
                    <td className="p-2 border-b">{amount.toFixed(2)} MATIC</td>
                    <td className="p-2 border-b">
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
