import React, { useContext, createContext, useState, useEffect } from "react";
import Web3 from 'web3';

import { ABI } from '../abi_contract'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

    const [address, setAddress] = useState(false);
    const [accounts, setAccounts] = useState(false);
    const contractAddress = '0x11E8C3aBC66F11DD9581E6BCDA29a83119940F84';


    const web3 = new Web3(window.ethereum); // create web3 object
    const contract = new web3.eth.Contract(ABI, contractAddress); // get the contract from ABI and address

    // Connect metaMask
    const connect = async () => {
        try {
            window.ethereum.enable() // connect metaMask
                .then(async () => {
                    await getAccounts().then(acc => {
                        setAccounts(acc);
                        setAddress(acc[0]); // set user account

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
    async function getProperties() {
        const count = await contract.methods.propertyIdCounter().call();
        const properties = [];
        const userBought = [];
        const userListed = [];
        if (count == 1) {
            console.log("No Properties Listed yet.");
            return [];
        }
        for (let i = 1; i < count; i++) {
            const property = await contract.methods.properties(i).call();
            properties.push(property);
            if (property.owner === address && property.sold) {
                userBought.push(property);
            }
            if (property.owner === address && !(property.sold)) {
                userListed.push(property);
            }

        }
        return { properties, userBought, userListed }
    }



    const listProperty = async (title, description, category, area, basePrice, location, endTime, imgUrl) => {
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


    useEffect(() => {
        web3.eth.getAccounts(async (error, accounts) => {
            if (error) {
                console.error('Error retrieving accounts:', error);
            } else if (accounts.length > 0) {
                // User has authorized the site and accounts are available
                await getAccounts().then(acc => {
                    setAccounts(acc);
                    setAddress(acc[0]);

                })
                const connectedAccount = accounts[0];
                console.log('Connected account:', connectedAccount);
                getProperties()
            } else {
                // User has not authorized the site or no accounts are available
                console.log('No connected account');
            }
        });

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

    }, [address])
    return (
        <StateContext.Provider
            value={{
                address,
                // contract,
                getAccounts,
                connect,
                listProperty,
                getProperties
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);


/* @METHODS 
bidIdCounter : ƒ ()
bidIdCounter() : ƒ ()
bidProperty : ƒ ()
bidProperty(uint256) : ƒ ()
bids : ƒ ()
bids(uint256) : ƒ ()
closeBidding : ƒ ()
closeBidding(uint256) : ƒ ()
listProperty : ƒ ()
listProperty(string,string,uint8,uint256,uint256,string,uint256,string) : ƒ ()
properties : ƒ ()
properties(uint256) : ƒ ()
propertyIdCounter : ƒ ()
propertyIdCounter() : ƒ ()
 */