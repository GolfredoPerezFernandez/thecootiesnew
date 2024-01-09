/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint-disable complexity */
/* eslint @typescript-eslint/no-explicit-any: "off" */
/* eslint-disable arrow-spacing */
/* eslint-disable no-await-in-loop */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-spacing */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable array-callback-return */

/* eslint @typescript-eslint/no-unused-vars: "off" */

/* eslint-disable etc/no-commented-out-code */
/* eslint-disable no-loop-func */
/* eslint-disable no-inline-comments */
/* eslint-disable no-inline-comments */
/* eslint @typescript-eslint/no-shadow: "off" */
/* eslint @typescript-eslint/no-empty-function: "off" */
import { TextField, Typography } from '@mui/material'
import { ethers } from 'ethers'
import React, { useEffect } from 'react'
import { useAccount, useContractRead, useContractWrite, useNetwork, useWaitForTransaction } from 'wagmi'
export default function TokenSale() {  
    const [amount,setAmount]=React.useState(0)
    const [intercambio,setIntercambio]=React.useState(0)
    const { address:ethAddress} = useAccount()

    const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const numValue = value ? parseFloat(value) : 0;
      setAmount(numValue); // Update the state with the numeric value
    };

    useEffect(()=>{
if(amount>0){
  setIntercambio(amount*25)
}
    },[amount])

    
  const { write:buyCootFlare} = useContractWrite({
    address: '0xC49fBd0F07B3312Ce1B9e613b044185F061dFACd',
    abi: SALEABI,
	
	chainId:14,
  value:ethers.parseUnits(amount.toString()),
	args:[ethAddress],
    functionName: 'buyTokens',
      async onSuccess(data) {	
  
      },
      onError(data){
      
        console.log('error', data)
    }
  
    })

  
  return (<div className="bg-black-50 font-sans">
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="bg-black shadow-lg rounded-lg p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">COOTCASH Swap</h1>
      </div>
      <div className="mb-4">
        <label id="amount" className="block text-sm font-medium text-gray-700">Amount to Buy</label>
        <div className="mt-1 relative rounded-md shadow-sm">
        <TextField
    variant="outlined"
    type="number"
    value={amount}
    onChange={handleTextInputChange}
    InputLabelProps={{
      style: {
        color: '#FFD700', // Label color
        fontWeight: 'bold', // Label font weight
      },
    }}
    InputProps={{
      style: {
        color: 'white', // Text color
        backgroundColor: '#2A1B33', // Background color
        borderColor: '#FF5733', // Border color
        borderWidth: '2px', // Border width
      },
    }}
    style={{
      marginTop: '20px',
      width: '200px',
      borderRadius: '10px', // Border radius for rounded corners
    }}
  />        <div className="absolute inset-y-0 right-0 flex items-center">
              <Typography  className="text-white ml-2 mt-15 mr-5 ">FLR</Typography>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <button onClick={()=>buyCootFlare()} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          BUY
        </button>
      </div>
      <div className="text-center">
        <span className="text-sm text-gray-600">YOU WILL GET</span>
        <span className="text-lg font-medium text-gray-900 ml-2">{intercambio}</span>
      </div>
    </div>
  </div>
  </div>
  )
}

const SALEABI:any=[{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"uint256","name":"pRate","internalType":"uint256"},{"type":"address","name":"pWallet","internalType":"address payable"},{"type":"address","name":"pToken","internalType":"contract IERC20"}]},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"TokensPurchased","inputs":[{"type":"address","name":"purchaser","internalType":"address","indexed":true},{"type":"address","name":"beneficiary","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"payable","outputs":[],"name":"buyTokens","inputs":[{"type":"address","name":"beneficiary","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rate","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRate","inputs":[{"type":"uint256","name":"newRate","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"token","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address payable"}],"name":"wallet","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"weiRaised","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawRewards","inputs":[{"type":"bool","name":"_withdrawAll","internalType":"bool"},{"type":"uint256","name":"weiAmount","internalType":"uint256"}]},{"type":"receive","stateMutability":"payable"}]