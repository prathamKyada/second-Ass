"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  connectingWithContract,
  connectWallet,
  toEth,
  toWei,
} from "../Utilites/apiFeatures";
export const ContractContext = createContext();

function ContextProvider({ children }) {
  const [address, setaddress] = useState();
  const [contract, setContract] = useState();

  const initFunc = async () => {
    const address = await connectWallet();
    setaddress(address);
    const contract = await connectingWithContract();
    setContract(contract);
    console.log("Asddres ==> ", address);
    console.log("Contract => ", contract);
  };

  const registerFunc = async (name1, des) => {
    console.log("Reg ===> ", name1, " :dess => ", des);

    const contract = await connectingWithContract();
    const res = await contract.registerCharity(name1, des);
    // console.log("res => ", res);
    return res;
  };
  // registerFunc()

  //#region get charity link with this address
  const getCharityFunc = async () => {
    console.log("Address ======> ", address);

    const contract = await connectingWithContract();
    const res = await contract.charities(address);
    console.log("res get charity => ", res);
    return res;
  };

  const updateCharityData = async (name, dis) => {
    const contract = await connectingWithContract();
    const res = await contract.updateCharityDetails(name, dis);
    console.log("res => ", res);
  };

  const donateToCharityFunc = async (amount) => {
    const contract = await connectingWithContract();
    const donetAmount = toWei(amount.toString());
    console.log("amount ==> ", amount, " Address => ", donetAmount);
    const res = await contract.donateToCharity(address, { value: donetAmount });
    console.log("res => ", res);
  };

  const donatData = async () => {
    const contract = await connectingWithContract();
    contract.on("DonationMade", (charityAddress, donor, amount, timestamp) => {
      console.log("Called...");
      
      console.log(
        "donate  ====>>> ",
        charityAddress,
        " donor => ",
        donor,
        " amount => ",
        amount,
        " timestamp => ",
        timestamp
      );
      
      

    });
  };

  const getDonationHistoryFunc = async (address) => {
    const contract = await connectingWithContract();
    console.log("user address ===>", address, " Contrxt == ", contract);
    const res = await contract.getDonationHistory(address);
    console.log("address ===>", res);

    return res;
  };

  useEffect(() => {
    initFunc();
  }, []);

  return (
    <ContractContext.Provider
      value={{
        registerFunc,
        getCharityFunc,
        updateCharityData,
        donateToCharityFunc,
        getDonationHistoryFunc,
        donatData,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

export default ContextProvider;
