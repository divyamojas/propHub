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


    // Get accounts connected to the app at the moment.
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

    // get an array of all properties, properties listed by the user and the properties bought by the user.
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


    // List the property for sale.
    const listProperty = async (title, description, category, area, basePrice, location, endTime, imgUrl) => {
        await contract.methods
            .listProperty(title, description, category, area, basePrice, location, endTime, imgUrl)
            .send({ from: address, gas: 1000000 }) // gas price approx : 290000-500000
            .then((result) => {
                console.log("Property listed at id:", result);
                return result;
            })
            .catch((error) => {
                console.error('Error listing property:', error);
                return null;
            });
    }

    // get all the bids on a given property
    async function getBids(pId) {
        const bidIdCounter = await contract.methods.bidIdCounter().call();
        const bids = [];
        for (let i = 1; i < bidIdCounter; i++) {
            const bid = await contract.methods.bids(i).call();
            if (bid.propertyId == pId) {
                bids.push(bid);
            }
        }
        return bids;
    }

    // Raise a bid for the property.
    async function bidProperty(pId, bidValue) {
        const bidValueEth = web3.utils.toWei(bidValue, 'ether'); // turn number into eth

        // Call the contract function
        await contract.methods
            .bidProperty(pId)
            .send({
                from: address,
                to: contractAddress,
                gas: 1000000,
                value: bidValueEth,
            })
            .then((receipt) => {
                console.log('Transaction receipt:', receipt);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



    useEffect(() => {
        // to check for changes in accounts connected to the app using metaMask wallet.
        web3.eth.getAccounts(async (error, accounts) => {
            if (error) {
                console.error('Error retrieving accounts:', error);
            } else if (accounts.length > 0) {
                // when user has authorized the site and accounts are available
                await getAccounts().then(acc => {
                    setAccounts(acc);
                    setAddress(acc[0]);

                })
                const connectedAccount = accounts[0];
                console.log('Connected account:', connectedAccount);
                getProperties()
            } else {
                // when user has not authorized the site or no accounts are available
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
                contract,
                getAccounts,
                connect,
                listProperty,
                getProperties,
                bidProperty,
                getBids
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