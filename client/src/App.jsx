import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Home, ListProperty, PropertyDetails, MyActivities } from "./pages";
import { Sidebar, Navbar } from "./components";

const App = () => {
  console.clear();

  useEffect(() => {
    // Function to check if MetaMask is connected to the required network
    const checkMetaMaskConnection = async () => {
      // Check if MetaMask is installed and connected
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        // const requiredNetworkId = '1337'; // Network ID of the required network
        const requiredChainId = '0x539'; // Chain ID of the required network
        const requiredRpcUrl = 'HTTP://127.0.0.1:7545'; // RPC URL of the required network
        const requiredCurrency = 'ETH'; // Required currency symbol

        try {
          // Get the network ID from MetaMask

          // Get the chain ID from MetaMask
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });

          // Check if MetaMask is connected to the required network
          if (/*parseInt(networkId) === requiredNetworkId && */chainId === requiredChainId) {
            console.log('MetaMask is connected to the required network');
          } else {
            // Prompt user to connect to the required network
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: requiredChainId,
                  chainName: 'Loc_GUI',
                  rpcUrls: [requiredRpcUrl],
                  nativeCurrency: {
                    name: 'Ether',
                    symbol: requiredCurrency,
                    decimals: 18,
                  },
                },
              ],
            }).then((el) => console.log(el));
            console.log('Connected to the required network');
          }
        } catch (error) {
          console.error('Error checking MetaMask connection:', error);
        }
      } else {
        console.error('MetaMask is not installed or not connected');
      }
    };

    // Check MetaMask connection on app load
    checkMetaMaskConnection();

    // Rest of your existing code for handling accounts and address

    // Cleanup function to remove the 'accountsChanged' event listener
    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []); // Add 'address' as a dependency if it's used in the existing code

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list-property" element={<ListProperty />} />
          <Route path="/my-activities" element={<MyActivities />} />
          <Route path="/property-details/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
    </div>
  );
};
export default App;
