// "use client";
// import { ContractContext } from "@/context/contextProvider";
// import Image from "next/image";
// import Link from "next/link";
// import { useContext } from "react";

// export default function Home() {
//   const {
//     registerFunc,
//     getCharityFunc,
//     updateCharityData,
//     donateToCharityFunc,
//     getDonationHistoryFunc,
//   } = useContext(ContractContext);

//   const handleRegisterCharity = async () => {
//     await registerFunc();
//   };
//   const handleGetCharity = async () => {
//     await getCharityFunc();
//   };

//   const handleUpdataCharityData = async () => {
//     await updateCharityData();
//   };

//   const handleGetDonationHistory = async () => {
//     await getDonationHistoryFunc();
//   };

//   const donateToCharityFunction = async () => {
//     await donateToCharityFunc(1);
//   };

//   return (
//     <>
//       <button onClick={handleRegisterCharity}>register</button>

//       <br />
//       <br />
//       <br />
//       <br />
//       <button onClick={handleGetCharity}>get</button>

//       <br />
//       <br />
//       <br />
//       <br />
//       <button onClick={handleUpdataCharityData}>update</button>

//       <br />
//       <br />
//       <br />
//       <br />
//       <button onClick={donateToCharityFunction}>donet 1 matic</button>

//       <br />
//       <br />
//       <br />
//       <br />
//       <button onClick={handleGetDonationHistory}>History</button>
//     </>
//   );
// }




"use client";
import { ContractContext } from "@/context/contextProvider";
import { useContext } from "react";
import Link from "next/link";

export default function Home() {
  const {
    registerFunc,
    getCharityFunc,
    updateCharityData,
    donateToCharityFunc,
    getDonationHistoryFunc,
  } = useContext(ContractContext);

  const handleRegisterCharity = async () => {
    await registerFunc("meet", "Des for char");
  };
  const handleGetCharity = async () => {
    await getCharityFunc();
  };

  const handleUpdataCharityData = async () => {
    await updateCharityData("pratik", "sdfsd sdfs d dsf sdf sd f");
  };

  const handleGetDonationHistory = async () => {
    await getDonationHistoryFunc();
  };

  const donateToCharityFunction = async () => {
    await donateToCharityFunc(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 flex flex-col items-center justify-center p-8">
      <nav className="w-full max-w-4xl flex justify-around mb-12">
        <Link href="/Register" className="text-white font-bold text-xl">
          Register Charity
        </Link>
        <Link href="/charityDetails" className="text-white font-bold text-xl">
        charity Details 
        </Link>
        <Link href="/updatecharity" className="text-white font-bold text-xl">
          Update Charity
        </Link>
        <Link href="/donatecharity" className="text-white font-bold text-xl">
          Donate to Charity
        </Link>
        <Link href="/historydonation" className="text-white font-bold text-xl">
          Donation History
        </Link>
      </nav>

    </div>
  );
}