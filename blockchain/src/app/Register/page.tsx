"use client";
import { useContext, useState } from "react";
import { ContractContext } from "@/context/contextProvider";

const RegisterCharity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { registerFunc } = useContext(ContractContext);

  const handleRegisterCharity = async () => {
    try {
      await registerFunc(name, description);
      setMessage("Charity registered successfully!");
      setIsError(false);
      setName("");
      setDescription("");
    } catch (error) {
      setMessage("An error occurred during registration.");
      setIsError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Register Charity</h1>

        <div className="space-y-4">
          {/* Input for charity name */}
          <input
            type="text"
            placeholder="Charity Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
          />

          {/* Input for charity description */}
          <textarea
            placeholder="Charity Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700
            rows=4"
          ></textarea>

          {/* Register Button */}
          <button
            onClick={handleRegisterCharity}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Register
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <p className={`mt-4 text-center ${isError ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterCharity;
