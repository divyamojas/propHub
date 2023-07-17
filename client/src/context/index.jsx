import React, { useContext, createContext, useState, useEffect } from "react";
import Web3 from 'web3';
import { ethers } from "ethers";

import { ABI } from '../abi_contract'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const [address, setAddress] = useState(false);
    const [accounts, setAccounts] = useState(false);
    const contractAddress = '0x3e2F8F2AF4f70564AB8B2B00aD3a81a7f53bE9D5';

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(ABI, contractAddress);

    const connect = async () => {
        try {
            window.ethereum.enable().then(async () => {
                await getAccounts().then(acc => {
                    setAccounts(acc);
                    setAddress(acc[0]);

                }).then((res) => {
                    console.log(res)
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

    const getPropertyDetails = async (pId) => {

        await contract.methods
            .getProperty(pId)
            .call()
            .then((result) => {
                // console.log(result);
                return result;
            })
            .catch((error) => {
                console.error(error);
            });

    }
    
    const listProperty = async (title, description, category, area, basePrice, location, endTime, imgUrl) => {
        // const addr = await 
        await contract.methods
            .listProperty(title, description, category, area, basePrice, location, endTime, imgUrl)
            .send({ from: address, gas: 1000000 }) // gas price approx : 290000
            .then((result) => {
                console.log("Property listed at id:", result);
                return result;
            })
            .catch((error) => {
                console.error('Error listing property:', error);
                return null;
            });
    }

    // Check if MetaMask is available
    if (typeof window.ethereum !== 'undefined') {
        // Get the MetaMask provider
        const provider = window.ethereum;

        // Listen for the 'accountsChanged' event
        provider.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                // User has disconnected their MetaMask account
                setAddress(false)
                console.log('User disconnected their MetaMask account');
            } else {
                // User has switched to a different MetaMask account
                setAddress(accounts[0])
                console.log('User switched MetaMask account:', accounts[0]);
            }
        });
    }
    useEffect(() => {
        web3.eth.getAccounts(async (error, accounts) => {
            if (error) {
                console.error('Error retrieving accounts:', error);
            } else if (accounts.length > 0) {
                // User has authorized the site and accounts are available
                await getAccounts().then(acc => {
                    setAccounts(acc);
                    setAddress(acc[0]);

                }).then((res) => {
                    console.log(res)
                });
                const connectedAccount = accounts[0];
                console.log('Connected account:', connectedAccount);
            } else {
                // User has not authorized the site or no accounts are available
                console.log('No connected account');
            }
        });

    }, [address])
    return (
        <StateContext.Provider
            value={{
                address,
                // contract,
                getAccounts,
                connect,
                getPropertyDetails,
                listProperty
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
