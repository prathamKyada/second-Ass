// "use client";
// import { useState, useContext } from "react";
// import { ContractContext } from "@/context/contextProvider";
// import { ethers } from "ethers"; // Import ethers to handle conversion

// const DonateToCharity = () => {
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const { donateToCharityFunc, donatData } = useContext(ContractContext);

//   const handleDonate = async () => {
//     try {
//       // Convert amount to wei using ethers
//       const amountInWei = ethers.utils.parseEther(amount);

//       // Call the donate function from the contract
//       await donateToCharityFunc(amountInWei);
//       await donatData();
//       setMessage("Donation successful!");
//       setIsError(false);
//       setAmount("");
//     } catch (error) {
//       setMessage("An error occurred while making the donation.");
//       setIsError(true);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
//       <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
//           Donate to Charity
//         </h1>
//         <input
//           type="number"
//           placeholder="Donation Amount (ETH)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
//           step="0.01"
//         />
//         <button
//           onClick={handleDonate}
//           className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white py-2 rounded-lg shadow-md hover:from-teal-500 hover:to-teal-700 transition-colors duration-300"
//         >
//           Donate
//         </button>

//         {message && (
//           <p
//             className={`mt-4 text-center ${
//               isError ? "text-red-500" : "text-green-500"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DonateToCharity;




"use client";
import { useState, useContext } from "react";
import { ContractContext } from "@/context/contextProvider";
import { ethers } from "ethers";

const generateConfetti = () => {
  const numberOfConfetti = 100;
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti';

  for (let i = 0; i < numberOfConfetti; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.className = 'confetti-piece';
    confettiPiece.style.left = `${Math.random() * 100}vw`;
    confettiPiece.style.top = `${Math.random() * 100}vh`;
    confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
    confettiContainer.appendChild(confettiPiece);
  }

  document.body.appendChild(confettiContainer);

  setTimeout(() => {
    document.body.removeChild(confettiContainer);
  }, 2000); // Remove after 2 seconds
};

const DonateToCharity = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { donateToCharityFunc, donatData } = useContext(ContractContext);

  const handleDonate = async () => {
    try {
      const amountInWei = ethers.utils.parseEther(amount);

      await donateToCharityFunc(amountInWei);
      await donatData();
      setMessage("Donation successful!");
      setIsError(false);
      setAmount("");

      // Trigger confetti effect
      generateConfetti();
    } catch (error) {
      setMessage("An error occurred while making the donation.");
      setIsError(true);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Donate to Charity
        </h1>
        <input
          type="number"
          placeholder="Donation Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          step="0.01"
        />
        <button
          onClick={handleDonate}
          className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white py-2 rounded-lg shadow-md hover:from-teal-500 hover:to-teal-700 transition-colors duration-300"
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
