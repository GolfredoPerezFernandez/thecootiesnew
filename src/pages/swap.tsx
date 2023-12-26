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

import type {
  SwapWidget as SwapWidgetType,
  PangolinProvider as PangolinProviderType,
} from '@pangolindex/components';

import dynamic from 'next/dynamic';
import { makeStyles } from '@material-ui/core/styles';

  import { useAccount } from 'wagmi'
import {  Typography } from '@web3uikit/core';
import { useEffect } from 'react';
import React from 'react';

const PangolinProvider = dynamic(
  () => import('@pangolindex/components').then((module) => module.PangolinProvider) as any,
  { ssr: false },
) as typeof PangolinProviderType;

const SwapWidget = dynamic(() => import('@pangolindex/components').then((module) => module.SwapWidget) as any, {
  ssr: false,
}) as typeof SwapWidgetType;

export default function Swap() { 
  const [ethAddress,setEthAddress]= React.useState<any>("0")

  const [web3jsProvider, setWeb3jsProvider] = React.useState<any>();
  const useStyles = makeStyles((theme :any)=> ({
    root: {
      width: '100%',
      height: '100%',
      position: 'relative',
      '& video': {
        objectFit: 'cover',
      },
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
      paddingBottom: theme.spacing(4),
    },
  }));
  
  useEffect(()=>{
if(address){
  setEthAddress(address)
}
  },[])
  

  const { address } = useAccount()

  const classes = useStyles();
  return (
    <div
      style={{
        backgroundImage: `url(${"https://bafybeian7nhvokbl2ffn5d63bxscx7eiwihcog2hpui5ipmaehj6l7mbv4.ipfs.nftstorage.link/BG.png"})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        minHeight: '100vh',
        margin:-8,
        alignItems:"center"

      }}
    > <div
    style={{
      paddingTop:100,
      display: 'flex',
      flexDirection: 'column',
      alignItems:"center",
      width:"100%",
    }}
  >

<Typography fontFamily={"poppins"} color="white"   variant="h1"  component="h1"  className={classes.title}>
            Token Swap
            </Typography>
      <div
    style={{
      paddingTop:20,
      paddingBottom:100,
      display: 'flex',
      width:"40%",
      alignSelf:"center",
      flexDirection: 'row',
      justifyContent:"center",
      alignItems:"center",
    }}
  >
    <PangolinProvider account={ethAddress} chainId={19} library={web3jsProvider}>
	  <SwapWidget isLimitOrderVisible={false} />
    </PangolinProvider> 

  </div>
</div>
 
   </div>

  )
}
