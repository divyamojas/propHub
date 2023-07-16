import React, { useContext, createContext, useState } from "react";
import Web3 from 'web3';
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const [address, setAddress] = useState(false);
    const [accounts, setAccounts] = useState(false);
    const contractAddress = '0xFEF398245571252E70c1dfb98b8CE85A6965dA04';


    const web3 = new Web3(window.ethereum);
    // console.log(web3)
    const connect = async () => {
        try {
            window.ethereum.enable().then(async () => {
                await getAccounts().then(acc => {
                    setAccounts(acc);
                    setAddress(acc[0]);
                });

            });

        } catch (error) {
            console.log(error)
        }

    }
    const getAccounts = async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            console.log('Retrieved accounts:', accounts);
            return accounts;
        } catch (error) {
            console.error('Error retrieving accounts:', error);
            return null;
        }
    };

    return (
        <StateContext.Provider
            value={{
                address,
                // contract,
                getAccounts,
                connect,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
