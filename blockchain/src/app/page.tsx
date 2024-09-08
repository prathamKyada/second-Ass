

// "use client";
// import { ContractContext } from "@/context/contextProvider";
// import { useContext } from "react";
// import Link from "next/link";

// export default function Home() {
//   const {
//     registerFunc,
//     getCharityFunc,
//     updateCharityData,
//     donateToCharityFunc,
//     getDonationHistoryFunc,
//   } = useContext(ContractContext);

//   const handleRegisterCharity = async () => {
//     await registerFunc("meet", "Des for char");
//   };
//   const handleGetCharity = async () => {
//     await getCharityFunc();
//   };

//   const handleUpdataCharityData = async () => {
//     await updateCharityData("pratik", "sdfsd sdfs d dsf sdf sd f");
//   };

//   const handleGetDonationHistory = async () => {
//     await getDonationHistoryFunc();
//   };

//   const donateToCharityFunction = async () => {
//     await donateToCharityFunc(1);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center p-8">
//       <nav className="w-full max-w-4xl flex justify-around mb-12">
//         <Link href="/Register" className="text-white font-bold text-xl">
//           Register Charity
//         </Link>
//         <Link href="/charityDetails" className="text-white font-bold text-xl">
//         charity Details 
//         </Link>
//         <Link href="/updatecharity" className="text-white font-bold text-xl">
//           Update Charity
//         </Link>
//         <Link href="/donatecharity" className="text-white font-bold text-xl">
//           Donate to Charity
//         </Link>
//         <Link href="/historydonation" className="text-white font-bold text-xl">
//           Donation History
//         </Link>
//       </nav>

//     </div>
//   );
// }




"use client";
import { ContractContext } from "@/context/contextProvider";
import { useContext } from "react";
import Link from "next/link";
import { FaRegRegistered, FaDonate, FaHistory, FaEdit, FaInfoCircle } from "react-icons/fa";

export default function Home() {
  const {
    registerFunc,
    getCharityFunc,
    updateCharityData,
    donateToCharityFunc,
    getDonationHistoryFunc,
  } = useContext(ContractContext);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <header className="w-full max-w-4xl mb-12">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Charity Management Dashboard</h1>
        <p className="text-lg text-white text-center">Manage and track charity registrations, donations, and histories seamlessly.</p>
      </header>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
        <Link href="/Register">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition duration-300">
            <FaRegRegistered className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Register Charity</h2>
            <p className="text-gray-600 text-center">Register new charities with the platform.</p>
          </div>
        </Link>

        <Link href="/charityDetails">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition duration-300">
            <FaInfoCircle className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Charity Details</h2>
            <p className="text-gray-600 text-center">View detailed information of registered charities.</p>
          </div>
        </Link>

        <Link href="/updatecharity">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition duration-300">
            <FaEdit className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Update Charity</h2>
            <p className="text-gray-600 text-center">Update the information of existing charities.</p>
          </div>
        </Link>

        <Link href="/donatecharity">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition duration-300">
            <FaDonate className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Donate to Charity</h2>
            <p className="text-gray-600 text-center">Make a donation to support a registered charity.</p>
          </div>
        </Link>

        <Link href="/historydonation">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center transform hover:scale-105 transition duration-300">
            <FaHistory className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-700">Donation History</h2>
            <p className="text-gray-600 text-center">View the donation history and track contributions.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
