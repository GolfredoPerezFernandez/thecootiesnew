import '@rainbow-me/rainbowkit/styles.css'
import { ConnectButton, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { WagmiConfig, useNetwork } from 'wagmi'
import { AppBar, Box, Container, Grid, IconButton,  Menu, MenuItem, ThemeProvider,  Toolbar,  Typography,  createTheme, responsiveFontSizes } from '@mui/material'
import './App.css';
import './global.css';

import {  client } from '../wagmi'

import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import Navbar from './navbar'

const theme = createTheme({ 
  typography: {
    fontFamily: ['"zcool-kuaile"', 'poppins'].join(','),
    h1: {
     fontFamily: '"zcool-kuaile", sans-serif',
    },
    h2: {
      fontFamily: '"poppins", sans-serif',
     }
  }
  
})


function App({ Component, pageProps }: AppProps) {
  
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  
  return (
    <WagmiConfig config={client}>
          <ThemeProvider theme={responsiveFontSizes(theme)}>

        <NextHead>
          <title>TheCooties</title>
          <link href="https://fonts.cdnfonts.com/css/zcool-kuaile" rel="stylesheet"/>
    <link href="https://fonts.cdnfonts.com/css/poppins" rel="stylesheet"/>
     
        </NextHead>
         <div
      style={{
        backgroundImage: `url(${"https://bafybeib2wy4qyk6fwyv6ztr5t54vlseoir2b5jr7o3fiypds55fuuihqzu.ipfs.nftstorage.link/ddd%20(1).png"})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        minHeight: '100vh',
        margin:-8
      }}
    >   
      <Navbar {...pageProps} />
        {mounted && <Component {...pageProps} />}
        <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "rgba(79, 194, 244, 0.9)",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" justifyContent={"center"}textAlign={"center"} alignItems={"center"} >
            Cootie Finance cannot and does not contain financial advice. The information is provided for general informational and educational purposes only and is not a substitute for professional financial advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of financial advice.
            </Typography>
          </Grid>
          <Grid marginTop={5} item xs={12}>
            <Typography color="white" variant="subtitle1">
              {`${new Date().getFullYear()} | Cootie Finance.`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
   </div>
   
  </ThemeProvider> 
    </WagmiConfig>
    
  )
}

export default App
