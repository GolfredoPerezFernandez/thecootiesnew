import { AppBar, Box, Container, IconButton,  Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { ConnectButton, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { useNetwork } from 'wagmi'
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import { useMoralis } from 'react-moralis'

function Navbar({ Component, pageProps }: AppProps) {
    const { chain,chains } = useNetwork()
    
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const pages = chain?.id.toString()==="14"?[{text:'HOME',href:"/"},{text:'DOCS',href:"https://docs.cootiedocs.xyz/"}, {text:'$CASH',href:"/stakingcootcash"}, {text:'$CASHBREW',href:"/stakingcootv2Flare"}]:[{text:'HOME',href:"/"},{text:'DOCS',href:"https://docs.cootiedocs.xyz/"},{text:'Cooties',href:"/stakingv1"},{text:'Cooties V2',href:"/stakingv2"}, {text:'$COOT',href:"/stakingcoot"},{text:'$COOTBREW',href:"/stakingcootv2"}];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  console.log(chains)
  return (<RainbowKitProvider chains={chains}>

    <AppBar style={{ backgroundColor: 'rgba(79, 194, 244, 0.9)', height: 75, boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)' }} position="static">
    <Container style={{marginTop:5}} maxWidth="xl">
      <Toolbar disableGutters>
       
        <div
    style={{
      backgroundImage: `url(${"https://bafkreiad3ksqpxasuooqbtq4f6mbzotub6ybxpm25y6nl2t5uf44btvx4y.ipfs.nftstorage.link/"})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '60px',
      minHeight: '60px',
      margin:-8,
      marginLeft:5,
      marginRight:20,
    }}
  />
       

        <Box sx={{ flexGrow: 1,  display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
           {pages.map((page,i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                {page.text==="DOCS"? 
                    <Link key={page.text} href={page.href}>
                        <Typography key={page.text} color="black" textAlign="center" style={{ fontFamily: '"Orbitron' }}>                
                    {page.text}
                  </Typography>
                </Link> 
                : page.text==="SWAP"?
                 <Link key={page.text} href={page.href}> 
                 <Typography key={page.text} color="black" textAlign="center" style={{ fontFamily: '"Orbitron' }}>
                 {page.text}
                   </Typography>
                  </Link>  :
                 <Link key={page.text} href={page.href}> 
                  <Typography key={page.text} color="black" textAlign="center" style={{ fontFamily: '"Orbitron' }}>
                  {page.text}
                    </Typography>
                   </Link> 
                }
                          

                </MenuItem>
              ))}
          </Menu>
        </Box>
  
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page,i) => (
                <MenuItem key={i} onClick={handleCloseNavMenu}>
                {page.text==="DOCS"? 
                    <Link key={page.text} href={page.href}>
                        <Typography key={page.text} color="white" textAlign="center" style={{ fontFamily: '"Orbitron' }}>             
                    {page.text}
                  </Typography>
                </Link> 
                : page.text==="SWAP"?
                 <Link key={page.text} href={page.href}> 
 <Typography key={page.text} color="white" textAlign="center" style={{ fontFamily: '"Orbitron' }}>
                 {page.text}
                   </Typography>
                  </Link>  :
                 <Link key={page.text} href={page.href}> 
                  <Typography key={page.text} color="white" textAlign="center" style={{ fontFamily: '"Orbitron' }}>
                  {page.text}
                    </Typography>
                   </Link> 
                }
                          

                </MenuItem>
              ))}
        </Box>

        <ConnectButton />
       
      </Toolbar>
    </Container>
  </AppBar>
      </RainbowKitProvider>
  )
}

export default Navbar
