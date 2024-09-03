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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Register Charity</h1>
        <input
          type="text"
          placeholder="Charity Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        />
        <textarea
          placeholder="Charity Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700
          rows=4"
        />
        <button
          onClick={handleRegisterCharity}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Register
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

export default RegisterCharity;
