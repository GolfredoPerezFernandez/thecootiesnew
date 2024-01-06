import { Box,  Grid,Stack,TextField,Typography as Tipe,  } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { Button, Hero, Information, Input, PlanCard, Typography } from '@web3uikit/core'
import { useContractWrite, useAccount,usePrepareContractWrite, useContractRead } from 'wagmi';
import { ethers,  } from 'ethers';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import React from "react";
import { useMediaQuery } from 'react-responsive'
import { TypeAnimation } from "react-type-animation";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
import CircularProgress from '@mui/material/CircularProgress';
import Carousel  from 'react-multi-carousel';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';





import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

interface ConfirmationDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}
function ConfirmationDialog({ open, message, onClose }: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: '#2251ad', // Your preferred background color
          color: '#FFFFFF', // Text color
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Shadow for the dialog box
        },
      }}
    >
      <DialogTitle style={{ fontWeight: 'bold' }}>
        {"Transaction Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button 
  onClick={onClose} 
  color="blue"
  text="Close"
  style={{
    color: '#FFD700', // Button text color
    fontWeight: 'bold',
  }}
/>
      </DialogActions>
    </Dialog>
  );
}



function StakingCootV2() {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    console.log(checked)
  };
  const [stakeAmount,setAmount]=React.useState(0)

  const { address:ethAddress} = useAccount()

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const [values, setValues] = React.useState({
    amountStake:0,
  });

  useEffect(() => {
	if (chain?.id !== 14 && switchNetwork) {
	  switchNetwork(14);
	  // Since we can't catch errors here, consider other ways to handle errors
	  // and provide feedback to the user.
	}
  }, [chain, switchNetwork]);
  
  
  
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto', // Adjust width as needed
    maxWidth: '600px', // Adjust max width as needed
    height: 'auto', // Adjust height as needed
    maxHeight: '90vh', // Adjust max height as needed
    overflowY: 'auto', // Allow scroll if content is too long
    bgcolor: 'info.main', // Fallback color
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
   // backgroundImage: 'url("https://bafybeifzqrnkwdiw243mvel2ipuhwq5b3bgdg2xti36ym364aipbicv2ee.ipfs.nftstorage.link/UI7.png")', // Add your background image URL
    backgroundSize: 'cover', // Cover, contain, or specific dimensions
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  
   // Function to handle changes in the text input
   const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = value ? parseFloat(value) : 0;
    setAmount(numValue); // Update the state with the numeric value
  };

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');


  const { data :dataAverageStake  }:{data:any} = useContractRead({
    address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
    abi: COOTSTAKING,
    functionName: 'totalStaked',
  })

  

const { data :dataStakingPercentage,  }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'totalRewardPercentage',
})
	
const { data :dataStakingBurnedNFT ,  }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'userBurnedNFT',
})
	
const { data :dataDebug , }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'debugRewards',
})
 
const { data :userTier , }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'userTier',
})

const { data :timeTillNextNFTEarned , }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'timeTillNextNFTEarned',
})

const { data :totalNFTsBurned , }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'totalNFTSBurned',
})





const { data :dataGetUserMintedTokenIds,  }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'getUserMintedTokenIds',
})

const { data :dataStakingEarned,  }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
watch:true,
  functionName: 'earned',
})
	

const { data :dataStaking,  }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
watch:true,
  functionName: 'balanceOf',
})
	
const { data :dataStakingBalance,  }:{data:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'balances',
})
	const [nftURI,setNftURI]=useState("")
  const [nfts,setNFTs]=useState<any[]>([])

const { data :dataNFTs, refetch }:{data:any,refetch:any} = useContractRead({
  address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
  abi: COOTSTAKING,
  args:[nftURI],
  onSuccess:async (data:any)=>{
    console.log("data "+data)
    console.log("data "+nftURI)
    let name=""
    let description=""
    let image=""

    await fetch(data)
    .then(function (response) {
  
      return response.json();
    }).then(function (data) {
      name =  "nft"
      description = "nft"
      image = data.image
    })

    setNFTs([...nfts,{title:nftURI.toString(),img:image}])
    console.log("nfts "+(nfts.length))
  },
  functionName: 'tokenURI',
})
	
		
const { data :dataBalance,  }:{data:any} = useContractRead({
  address: '0xe990eAA4D078f3F3018F692A5880423cF9536f92',
  abi: DKMTABI,
  args:[ethAddress],

  functionName: 'balanceOf',
})
		

  const [loading,setLoading]= React.useState(false)
   

  
  const isTabletOrMobile2 = useMediaQuery({ query: '(max-width: 550px)' })

  const { write:withdrawStaking } = useContractWrite({
    address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
    abi: COOTSTAKING,
    onSuccess:()=>{
      setLoading(false)
      setConfirmationMessage('You Unstaked Now your Tier is 0');
      setConfirmationOpen(true);
    },
    onError:()=>{
      setLoading(false)
    },
    functionName: 'unstake',
    args:[parseFloat(ethers.parseUnits(stakeAmount.toString(),"ether").toString())]
  })
 
  const { write:approveStaking,data:dataApproveDKMT,isSuccess:isSuccessApproveStake } = useContractWrite({
    address: '0xe990eAA4D078f3F3018F692A5880423cF9536f92',
    abi: DKMTABI,
    onSuccess:()=>{
      setLoading(false)
    },
    onError:()=>{
      setLoading(false)
    },
    functionName: 'approve',
    args:['0xEb50e732750C9654ccb615A3B0c23bdf0264585f',parseFloat(ethers.parseUnits(stakeAmount.toString(),"ether").toString())]
  })

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }; 


  const { write:depositStaking } = useContractWrite({
    address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
    abi: COOTSTAKING,
    onSuccess:()=>{
      setLoading(false)
      setConfirmationMessage('Successfully Staked!');
      setConfirmationOpen(true);
    },
    onError:()=>{
      setLoading(false)
    },
    functionName: 'stake',
    args:[parseFloat(ethers.parseUnits(stakeAmount.toString(),"ether").toString())]
  })

  const { write:burnStaking } = useContractWrite({
    address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
    abi: COOTSTAKING,
    args:[[values.amountStake]],
    onSuccess:()=>{
      setLoading(false)
      setConfirmationMessage('Enjoy the 2% Bonus!');
      setConfirmationOpen(true);
    },
    onError:()=>{
      setLoading(false)
    },
    functionName: 'bulkBurnNFT',
  })
useEffect(()=>{
  const main=async()=>{

    if(dataGetUserMintedTokenIds){
      for(let i=0;i<=dataGetUserMintedTokenIds.length;i++){
        await setNftURI(dataGetUserMintedTokenIds)
        await refetch()
      }
      await console.log("todos "+nfts)
    }
  }
  main()
},[dataGetUserMintedTokenIds])
  const { write:claimStaking } = useContractWrite({
    address: '0xEb50e732750C9654ccb615A3B0c23bdf0264585f',
    abi: COOTSTAKING,
    onSuccess:()=>{
      setLoading(false)
      setConfirmationMessage('Successfully Claimed Rewards!');
      setConfirmationOpen(true);
    },
    onError:()=>{
      setLoading(false)
    },
    functionName: 'claimRewards',
  })

  const { data :dataAllowance,  }:{data:any} = useContractRead({
    address: '0xe990eAA4D078f3F3018F692A5880423cF9536f92',
    abi: DKMTABI,
    watch:true,
    args:[ethAddress,"0xEb50e732750C9654ccb615A3B0c23bdf0264585f"],
    functionName: 'allowance',
  })

  const cootiesNft:any=[{
    title:"Cootie #1",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/1.jpg'    
  },{
    title:"Cootie #2",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/2.jpg'    
  },{
    title:"Cootie #3",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/3.jpg'    
  },{
    title:"Cootie #4",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/4.jpg'    
  },{
    title:"Cootie #5",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/5.jpg'    
  },{
    title:"Cootie #6",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/6.jpg'    
  },{
    title:"Cootie #7",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/7.jpg'    
  },{
    title:"Cootie #8",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/8.jpg'    
  },{
    title:"Cootie #9",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/9.jpg'    
  },{
    title:"Cootie #10",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/10.jpg'    
  },{
    title:"Cootie #11",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/11.jpg'    
  },{
    title:"Cootie #12",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/12.jpg'    
  },{
    title:"Cootie #13",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/13.jpg'    
  },{
    title:"Cootie #14",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/14.jpg'    
  },{
    title:"Cootie #15",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/15.jpg'    
  },{
    title:"Cootie #16",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/16.jpg'    
  },{
    title:"Cootie #17",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/17.jpg'    
  },{
    title:"Cootie #18",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/18.jpg'    
  },{
    title:"Cootie #19",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/19.jpg'    
  },{
    title:"Cootie #20",
    img:'https://cootiesv2.mypinata.cloud/ipfs/Qmbdys5q3a2GcUQ5cKkgpgfvD9ZQrx1TkHGKoFuUTYcyWE/20.jpg'    
  }]

  const handleBurnNFT= async ()=>{
   
   
    try{
      setLoading(true)
      console.log(values.amountStake)
      burnStaking()
    } catch{
      setLoading(false)
    
    }
    }
  const handleClaim= async ()=>{
   
   
    try{
      setLoading(true)
          await claimStaking()
       
    } catch{
      setLoading(false)
    
    }
    }

  const handleWithdraw= async ()=>{
   
   
try{
  setLoading(true)
      await withdrawStaking()
   
} catch{
  setLoading(false)

}
}
  const handleStake= async ()=>{
     
try{
  setLoading(true)


      if(parseFloat(ethers.formatEther(dataAllowance).toString())>=parseFloat(stakeAmount.toString())){
      await depositStaking()
      }else{
        await approveStaking()
      }
    } catch{
        setLoading(false)

      }
}
 function log(value:any) {
  console.log(value)
   setAmount(value)

}


const handleChanges = (prop: keyof any) => (event: React.ChangeEvent<any>) => {

setValues({ ...values, [prop]:event.target.value });

}




  return ( <div
    key={'112'}
        style={{
          backgroundImage: `url(${"https://bafybeig3mmihtdib3m5afudkekczf7qdepvl7hdja3pexparbg6qwuzrdi.ipfs.nftstorage.link/cootbreflareBG.png"})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor:"#0E0C1D",
          flexDirection:"column",
          backgroundPosition: 'center',
          width: isTabletOrMobile2?'100vw':'100vw',
          overflowY:"hidden",
          overflowX:"hidden",
          overflow:"hidden",
          height:isTabletOrMobile2?"190vh":"190vh",
          textAlign:"center",
          fontFamily:"obitron",
          color:"#2A1B33",
          justifyContent:'center',
          alignItems:"center"
        }}
      > 
      

    <TypeAnimation
							 sequence={[ 'Magical COOT BREW ', 
							 ]}
							 wrapper="div"
							 cursor={false}
							 style={{ marginTop:"10vh",textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?18:46 ,width:"100%",color:"#FFD700",fontFamily:"orbitron",marginBottom:1,textAlign:'center'}}
						   />
                
<TypeAnimation
          sequence={[
          `Where Alchemy Meets APY`,
        ]}
          wrapper="div"
          cursor={false}
          style={{ justifyContent:'center',textAlign:"center",textShadow: "0px  0px  7px  #FFD700",alignSelf:"center",fontSize:isTabletOrMobile2?18:18 ,padding:0,width:"100%",color:"white",fontFamily:"orbitron",marginBottom:0,}}
        />
    <div
    key={"929"}
  
      style={{
        flexDirection:"row",
        display: 'flex',
        justifyContent:"center",
        alignItems:"center",
      }}
    >
      
    
      <Grid container
        key={"12"}
        justifyContent="center"
        width={"100%"}
        alignItems="center" 
        spacing={3}>
        
      <Grid 
       key={"5003"}
       justifyContent="center"
       alignItems="center" item xs>
        <div
        key={"95"}
        style={{
        alignSelf:"center",
        display: 'flex',
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
      }}
      >
        
 <div
            key={"5001"}
            className="button-8569"
            role="div"
            style={{
             backgroundImage:isTabletOrMobile2? `url("https://bafybeihvcsvylwdtxp2ihh5w6ogoqftakmewtzin2oql4dq5eokz6bvrxy.ipfs.nftstorage.link/")`: `url("https://bafybeigadxc2ed3qgpadlehr4vuztsay6bgxros7vxafy2wv676oatb6xy.ipfs.nftstorage.link/new.png")`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: isTabletOrMobile2?"70%":"80%",
              flexDirection:"row",
              height: isTabletOrMobile2?"110vh":"110vh",
              paddingTop:isTabletOrMobile2?"10%":"5%",           
                 marginTop:"0%",

              opacity:1,
              border: "0px solid #FF5733", // Color del borde
            }}
          >
            
             <Stack style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
              {/* Modal Button */}
             
             <button  onClick={handleOpenModal} style={{marginBottom:"20px",marginTop:"50px",textShadow: "0px  0px  7px  #FFD700",marginRight:15,width:200,marginLeft:isTabletOrMobile2?0:0,alignSelf:"center"}}  className="button-855" role="button">
        How It Works
        </button>

             <Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box sx={modalStyle}>
    {/* Title */}
    <Typography
      id="modal-modal-title"
      variant="h6"
      component="h2"
      color="gold"
      fontFamily="orbitron"
      fontSize="1.5rem"
      style={{ fontWeight: 'bold', marginBottom: '2rem' }}
      paragraph
    >
      🚀 COOT BREW: Where DeFi Staking Gets a Magical Boost! 🚀
    </Typography>

    {/* Paragraph 1 */}
    <Typography
    id="modal-modal-description"
    sx={{ mt: 2 }}
    color="white"
    fontFamily="orbitron"
    fontSize="1rem"
    style={{
      whiteSpace: 'pre-line',
      marginBottom: '1rem', // Adjust the value as needed to create more space
      textAlign: 'justify',
      lineHeight: '2.6', // Adjust line height for better readability
      overflow: 'auto', // Add scrollbar if content is too long
      maxHeight: 'calc(100vh - 200px)', // Adjust the max height as needed
    }}
  >
      Welcome to COOT BREW, a one-of-a-kind platform that combines traditional DeFi staking with an innovative tier-based reward system and exclusive NFT drops known as "COOT BREW." With smart contract features that are engineered to optimize both engagement and profitability, we're setting a new standard in the staking arena.
    </Typography>

    {/* Paragraph 2 */}
    <Typography
    id="modal-modal-description"
    sx={{ mt: 2 }}
    color="gold"
    fontFamily="orbitron"
    fontSize="1rem"
    style={{
      whiteSpace: 'pre-line',
      marginBottom: '1rem', // Adjust the value as needed to create more space
      textAlign: 'justify',
      lineHeight: '2.6', // Adjust line height for better readability
      overflow: 'auto', // Add scrollbar if content is too long
      maxHeight: 'calc(100vh - 200px)', // Adjust the max height as needed
    }}
  >
      🎯 Profitable Staking with COOT & COOTCASH Tokens
      Staking is more than just a financial move—it's an engaging experience. Stake your COOT tokens and begin your journey through our meticulously designed reward landscape. The smart contract utilizes an underlying ERC20 token for staking, ensuring a secure and standardized process.
    </Typography>

    {/* Paragraph 3 */}
    <Typography
    id="modal-modal-description"
    sx={{ mt: 2 }}
    color="white"
    fontFamily="orbitron"
    fontSize="1rem"
    style={{
      whiteSpace: 'pre-line',
      marginBottom: '1rem', // Adjust the value as needed to create more space
      textAlign: 'justify',
      lineHeight: '2.6', // Adjust line height for better readability
      overflow: 'auto', // Add scrollbar if content is too long
      maxHeight: 'calc(100vh - 200px)', // Adjust the max height as needed
    }}
  >
      ⏫ Tier System: The Reward Escalator
      Every 14 days of continuous staking rockets you to a higher tier, increasing your rewards by 1%, up to a dazzling Tier 24.
    </Typography>

    {/* Paragraph 4 */}
    <Typography
    id="modal-modal-description"
    sx={{ mt: 2 }}
    color="gold"
    fontFamily="orbitron"
    fontSize="1rem"
    style={{
      whiteSpace: 'pre-line',
      marginBottom: '1rem', // Adjust the value as needed to create more space
      textAlign: 'justify',
      lineHeight: '2.6', // Adjust line height for better readability
      overflow: 'auto', // Add scrollbar if content is too long
      maxHeight: 'calc(100vh - 200px)', // Adjust the max height as needed
    }}
  >
      🎨 COOT BREW NFTs: Potions for Higher Rewards
      Every 14 days, grab a COOT BREW NFT. Keep these stunning potions for trading or burn them for an instant 1% reward boost. It's digital alchemy at its finest!
    </Typography>

    {/* Paragraph 5 */}
    <Typography
    id="modal-modal-description"
    sx={{ mt: 2 }}
    color="white"
    fontFamily="orbitron"
    fontSize="1rem"
    style={{
      whiteSpace: 'pre-line',
      marginBottom: '5rem', // Adjust the value as needed to create more space
      textAlign: 'justify',
      lineHeight: '2.6', // Adjust line height for better readability
      overflow: 'auto', // Add scrollbar if content is too long
      maxHeight: 'calc(100vh - 200px)', // Adjust the max height as needed
    }}
  >
      🚨 Unstaking Resets Tier and Last Update Time
      Unstaking takes you back to Tier 1, but it's a chance to rejoin the magic later with renewed vigor. you will always keep your NFT Burn bonus.
    </Typography>

    {/* Paragraph 6 */}
    <Typography
    id="modal-modal-description"
    sx={{ mt: 2 }}
    color="gold"
    fontFamily="orbitron"
    fontSize="1rem"
    style={{
      whiteSpace: 'pre-line',
      marginBottom: '5rem', // Adjust the value as needed to create more space
      textAlign: 'justify',
      lineHeight: '2.6', // Adjust line height for better readability
      overflow: 'auto', // Add scrollbar if content is too long
      maxHeight: 'calc(100vh - 200px)', // Adjust the max height as needed
    }}
  >
      🎟️ Minimum Staking Requirement: 100,000 COOTCASH
      Get into the game with a minimum of COOTCASH tokens.
    </Typography>

    {/* Paragraph 7 */}
    <Typography
    id="modal-modal-description"
    sx={{ mt: 2 }}
    color="white"
    fontFamily="orbitron"
    fontSize="1rem"
    style={{
      whiteSpace: 'pre-line',
      marginBottom: '5rem', // Adjust the value as needed to create more space
      textAlign: 'justify',
      lineHeight: '2.6', // Adjust line height for better readability
      overflow: 'auto', // Add scrollbar if content is too long
      maxHeight: 'calc(100vh - 200px)', // Adjust the max height as needed
    }}
  >
      Earnings and Clarity: Watch Your Rewards Grow! 🕒
      Our smart contract calculates your rewards dynamically, making it easy to see your potential APY.
    </Typography>

    {/* Footer */}
    <Typography
    id="modal-modal-description"
    sx={{ mt: 2 }}
    color="gold"
    fontFamily="orbitron"
    fontSize="1rem"
    style={{
      whiteSpace: 'pre-line',
      marginBottom: '5rem', // Adjust the value as needed to create more space
      textAlign: 'justify',
      lineHeight: '2.6', // Adjust line height for better readability
      overflow: 'auto', // Add scrollbar if content is too long
      maxHeight: 'calc(100vh - 200px)', // Adjust the max height as needed
    }}
  >
      COOT BREW isn't just a platform; it's an ecosystem where DeFi, gamified rewards, and NFT enchantment converge. Ready to stake? Join COOT BREW and let the magic unfold! 🌌
    </Typography>
  </Box>
</Modal>

           {checked?<TypeAnimation
      sequence={[`STAKE`
   ]}
      wrapper="div"
      cursor={false}

      style={{textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?18:16 ,width:120,color:"white",fontFamily:"orbitron",textAlign:'center'}}
    />:
<TypeAnimation
      sequence={[`UNSTAKE`]}
      wrapper="div"
      cursor={false}
      style={{textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?18:16 ,width:120,color:"white",fontFamily:"orbitron",textAlign:'center'}}
    />
           }
            
            <Switch color="warning"  checked={checked}
      onChange={handleChange}  {...label}  />
            </Stack>
            {checked?
            <Box style={{justifyContent:"center",alignItems:"center"}}>
       
           
<Stack style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          
       
    </Stack>
    
    {dataStakingBalance?<TypeAnimation
      sequence={["Deposited "+Math.round(parseFloat(ethers.formatEther(dataStakingBalance.toString()))).toString()+` $COOT`,]}
      wrapper="div"
      cursor={false}
      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    />:<TypeAnimation
    sequence={["Deposited "+Math.round(parseFloat(ethers.formatEther("0"))).toString()+` $COOT`,]}
    wrapper="div"
    cursor={false}
    style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
  />}
    {dataStakingEarned?<TypeAnimation
      sequence={["Earned "+parseFloat(ethers.formatEther(dataStakingEarned).substring(0,6).toString())+` $COOT`,
   ]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    />:
<TypeAnimation
      sequence={["Earned "+Math.round(parseFloat(ethers.formatEther("0").substring(0,6).toString()))+` $COOT`,
   ]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    />
    }
  
 {dataDebug?<TypeAnimation
      sequence={["Total Bonus "+dataDebug[2].toString()+"%",
   ]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    /> :
  <TypeAnimation
  sequence={["Total Percentage "+0+"%",
]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    /> 
 }
 
{userTier ? 
  <TypeAnimation
    sequence={["Tier Level " + userTier.toString()]}
    wrapper="div"
    cursor={false}
    style={{marginTop:10, textShadow: "0px  0px  7px  #FFFFFF", fontSize: isTabletOrMobile2 ? 18 : 20, width: "100%", color: "yellow", fontFamily: "orbitron", textAlign: 'center'}}
  /> : null
}


{timeTillNextNFTEarned ? 
  <TypeAnimation
    sequence={["Days until next NFT: " + timeTillNextNFTEarned.toString()]}
    wrapper="div"
    cursor={false}
    style={{marginTop:10, textShadow: "0px  0px  7px  #FFFFFF", fontSize: isTabletOrMobile2 ? 18 : 20, width: "100%", color: "yellow", fontFamily: "orbitron", textAlign: 'center'}}
  /> : null
}

 




 <Typography style={{ marginTop:20,textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?24:20 ,width:"100%",color:"white",fontFamily:"orbitron",textAlign:'center'}} key={"33321"} color="#041836" variant="h1" weight="700">STAKE</Typography>


        <Box style={{ marginTop:10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
  <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" style={{ margin: '0 auto',width:"100%"}}>
    
       {/* Text Field for input */}
       <TextField
  label="Stake Amount"
  variant="outlined"
  type="number"
  value={stakeAmount}
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
/>
      
      </Stack>

      
    
 <Typography style={{ marginTop:20,textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"white",fontFamily:"orbitron",textAlign:'center'}} key={"33321"} color="#041836" variant="h1" weight="700">{Math.round(stakeAmount)+` $COOT`}</Typography>
 
        {loading?<CircularProgress color="secondary" />
:<Box style={{width:"100%",marginTop:30,flexDirection:"row"}}> 
{parseFloat(ethers.formatEther(dataAllowance??"0".toString()))>=parseFloat(stakeAmount.toString())? <button  onClick={handleStake} style={{marginBottom:"5px",marginTop:"5px",textShadow: "0px  0px  7px  #FFFFFF",marginRight:15, width:200,marginLeft:15}}  className="button-855" role="button">
        STAKE COOT
        </button>: <button  onClick={handleStake} style={{marginBottom:"5px",marginTop:"5px",textShadow: "0px  0px  7px  #FFD700",marginRight:15,width:200,marginLeft:15}}  className="button-855" role="button">
        APPROVE COOT
        </button>}
    {     
 <button  onClick={handleClaim} style={{marginBottom:"0px",marginTop:"20px",textShadow: "0px  0px  7px  #FFD700",marginRight:15,width:200,marginLeft:15}}  className="button-855" role="button">
        Claim Rewards
        </button> }
              
</Box>}
<Stack style={{justifyContent:"center",marginTop:50,alignItems:"center"}}>
<Input
				key={"3391"}
                  onChange={handleChanges('amountStake')}
                  label="TOKEN ID"
                  placeholder="100"
                  style={{alignSelf:"center",width:100}}
                  />
<button  onClick={handleBurnNFT} style={{marginBottom:"20px",marginTop:"20px",textShadow: "0px  0px  7px  #FFD700",marginRight:15,width:200,marginLeft:15}}  className="button-855" role="button">
        Burn NFT
        </button>
        </Stack>
     </Box>
     
            </Box>:<Box style={{justifyContent:"center",alignItems:"center"}}>
       
           
       <Stack style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                 
              
           </Stack>
           
           {dataStakingBalance?<TypeAnimation
      sequence={["Deposited "+Math.round(parseFloat(ethers.formatEther(dataStakingBalance.toString()))).toString()+` $COOT`,]}
      wrapper="div"
      cursor={false}
      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?14:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    />:<TypeAnimation
    sequence={["Deposited "+Math.round(parseFloat(ethers.formatEther("0"))).toString()+` $COOT`,]}
    wrapper="div"
    cursor={false}
    style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
  />}
    {dataStakingEarned?<TypeAnimation
      sequence={["Earned "+Math.round(parseFloat(ethers.formatEther(dataStakingEarned.toString()).substring(0,6).toString()))+` $COOT`,
   ]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    />:
<TypeAnimation
      sequence={["Earned "+Math.round(parseFloat(ethers.formatEther("0").substring(0,6).toString()))+` $COOT`,
   ]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    />
    }
  
    {dataStakingPercentage? <TypeAnimation
      sequence={["Total Reward Percentage "+Math.round(dataStakingPercentage.toString()).toString(),
   ]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    />:
 <TypeAnimation
 sequence={["Total Reward Percentage "+Math.round(0).toString(),
]}
 wrapper="div"
 cursor={false}

 style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
/>
    }
 
    {dataStakingBurnedNFT? <TypeAnimation
      sequence={["Burned NFT "+Math.round(dataStakingBurnedNFT.toString()).toString(),
   ]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    />
    :
    <TypeAnimation
    sequence={["Burned NFT "+Math.round(0).toString(),
 ]}
    wrapper="div"
    cursor={false}

    style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
  />
  
    }
 {dataDebug[2]?<TypeAnimation
      sequence={["Total Percentage "+dataDebug[2].toString()+"%",
   ]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    /> :
  <TypeAnimation
      sequence={["Percentage "+"0"+"%",
   ]}
      wrapper="div"
      cursor={false}

      style={{marginTop:10,textShadow: "0px  0px  7px  #FFFFFF",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"yellow",fontFamily:"orbitron",textAlign:'center'}}
    /> 
 }
        <Typography style={{ marginTop:20,textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?18:20 ,width:"100%",color:"white",fontFamily:"orbitron",textAlign:'center'}} key={"33321"} color="#041836" variant="h1" weight="700">UNSTAKE</Typography>
       
       
               <Box style={{marginTop:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
               <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" style={{ margin: '0 auto',width:"60%"}}><TypeAnimation
                 sequence={[`0 COOT`,
              ]}
                 wrapper="div"
                 cursor={false}
                 style={{ textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?18:13 ,width:200,color:"white",fontFamily:"orbitron",textAlign:'center'}}
               />
               <Slider
               trackStyle={{ backgroundColor: 'red', height: 10 }}
               min={0}
               max={parseFloat(ethers.formatEther(dataStakingBalance??0))}
               onChange={log}
               defaultValue={[0, parseFloat(ethers.formatEther(dataStakingBalance??0))]} 
               allowCross={false}
               handleStyle={{
                 borderColor: 'purple',
                 height: 28,
                 width: 28,
                 marginLeft: -14,
                 marginTop: -9,
                 backgroundColor: 'black',
               }}
               railStyle={{ backgroundColor: 'skyblue', height: 10 }}
             />
             {/* Text Field for input */}
       <TextField
  label="UnStake "
  variant="outlined"
  type="number"
  value={stakeAmount}
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
/>


               <Typography style={{ textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?14:20 ,width:200,color:"white",fontFamily:"orbitron",textAlign:'center'}} key={"33321"} color="#041836" variant="h1" weight="700">{Math.round(parseFloat(ethers.formatEther(dataStakingBalance)))+` COOT`}</Typography>

             </Stack>
           
        <Typography style={{ marginTop:20,textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?14:20 ,width:"100%",color:"white",fontFamily:"orbitron",textAlign:'center'}} key={"33321"} color="#041836" variant="h1" weight="700">{Math.round(stakeAmount)+` $COOT`}</Typography>
             
       <Box style={{width:"100%",marginTop:30,flexDirection:"row"}}> 
       {loading?       <CircularProgress color="secondary" />
:

<button  onClick={handleWithdraw} style={{marginBottom:"10px",marginTop:"20px",textShadow: "0px  0px  7px  #FFD700",marginRight:15,width:200,marginLeft:15}}  className="button-855" role="button">
        WITHDRAW COOT
        </button>}

                  
       </Box>
       <Typography style={{ marginTop:20, fontSize:isTabletOrMobile2?14:20 ,width:"100%",color:"red",fontFamily:"orbitron",textAlign:'center'}} key={"33321"} color="#041836" variant="h1" weight="700">{`WARNING! Unstaking will result in a total Tier Reset`}</Typography>
            </Box>
            
                   </Box>}
            
        </div> 
          
          
        </div> 
    
    </Grid>
  </Grid>
    
  </div> 
 
   {/* Render the ConfirmationDialog here */}
   <ConfirmationDialog
    open={confirmationOpen}
    message={confirmationMessage}
    onClose={() => setConfirmationOpen(false)}
  />
  <div style={{height:600,marginTop:30,marginBottom:50,width:"100%",alignSelf:"center", justifyContent:"center",alignItems:"center"}}>
  <TypeAnimation
      sequence={[`COOT BREWS`
   ]}
      wrapper="div"
      cursor={false}

      style={{alignSelf:"center",marginBottom:20,textShadow: "0px  0px  7px  #FFD700",fontSize:isTabletOrMobile2?18:18 ,width:"100%",color:"white",fontFamily:"orbitron",textAlign:'center'}}
    />
  <Carousel
    
    itemClass="carousel-item-padding-10-px"
    additionalTransfrom={0}
    arrows
    autoPlaySpeed={2000}
    centerMode={false}
    className=""
    containerClass="container-with-dots"
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite
    autoPlay
    keyBoardControl
    minimumTouchDrag={80}
    pauseOnHover
    renderArrowsWhenDisabled={false}
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={responsive}
    rewind={false}
    rewindWithAnimation={false}
    rtl={false}
    shouldResetAutoplay
    showDots={true}
    sliderClass=""
    slidesToSlide={1}
    swipeable
  >
{ nfts.map((e: any, i: any) => {
  return (
    <Card key={i} sx={{ width: 300, height: 300, position: 'relative', overflow: 'hidden' }}> {/* Ensure the card has a relative position */}
      
      {/* CardMedia for the NFT */}
      <CardMedia
        component="img"
        height="350"
        image={e.img}
        alt={e.title}
        style={{ position: 'relative', zIndex: 2 }} // Image on top
      />

      {/* This Box acts as a frame behind the NFT */}
      <Box style={{
        position: 'absolute', // Absolute position to place it behind the CardMedia
        top: 9,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'url("https://bafybeigadxc2ed3qgpadlehr4vuztsay6bgxros7vxafy2wv676oatb6xy.ipfs.nftstorage.link/new.png")',
        backgroundSize: 'auto', // Cover the area
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 1, // Lower z-index than the image
      }} />

      {/* Content of the Card */}
      <CardContent style={{ position: 'absolute', top: 0, zIndex: 3, width: '100%', backgroundColor: 'transparent' }}> {/* Set a higher z-index to be on top */}
      <Typography style={{ marginTop:20, textShadow: "0px  0px  7px  #63ffff", fontSize:isTabletOrMobile2?14:20 ,width:"100%",color:"black",fontFamily:"orbitron",textAlign:'center'}}>
          {e.title}
        </Typography>
      </CardContent>
      
    </Card>
  );
  })}
</Carousel>
  </div>
    
     </div>
  );
}

export default StakingCootV2;

const DKMTABI= [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"string","name":"name_","internalType":"string"},{"type":"string","name":"symbol_","internalType":"string"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addController","inputs":[{"type":"address","name":"controller","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"burnFrom","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"burnPercentage","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"maxSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"mint","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"mintAirdrop","inputs":[{"type":"address[]","name":"holder","internalType":"address[]"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeController","inputs":[{"type":"address","name":"controller","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setBurnPercentage","inputs":[{"type":"uint256","name":"percentage","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]}]
const COOTSTAKING=[{"type":"constructor","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"string[]","name":"uris","internalType":"string[]"},{"type":"uint256","name":"_minimumStakeForNFT","internalType":"uint256"},{"type":"uint256","name":"_initialRewardRate","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addRewards","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approve","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"averageStake","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balances","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"bulkBurnNFT","inputs":[{"type":"uint256[]","name":"tokenIds","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"calculateAPY","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimRewards","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"timeElapsed","internalType":"uint256"},{"type":"uint256","name":"baseReward","internalType":"uint256"},{"type":"uint256","name":"totalPercentage","internalType":"uint256"},{"type":"uint256","name":"finalReward","internalType":"uint256"}],"name":"debugRewards","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"totalStakedAmount","internalType":"uint256"},{"type":"uint256","name":"totalRewardPoolAmount","internalType":"uint256"}],"name":"displayStakingAndRewardsInfo","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"earned","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getApproved","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getNumberOfStakers","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"getUserMintedTokenIds","inputs":[{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"globalTokenId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"hasStakedBefore","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initializeRewardPool","inputs":[{"type":"uint256","name":"_initialRewardPool","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isApprovedForAll","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"operator","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isRewardPoolInitialized","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastRewardClaimTime","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastRewardUpdateTime","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastUpdateTime","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"maxTier","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"minStakeForNFT","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nextNFT","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nftBurnRewardPercentage","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nftBurnRewardPercentageIncrease","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ownerOf","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"pause","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"paused","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeRewards","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardDebt","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPaid","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPerTokenPerWeek","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardPool","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"rewardRate","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"safeTransferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"bytes","name":"data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"scalingFactor","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setApprovalForAll","inputs":[{"type":"address","name":"operator","internalType":"address"},{"type":"bool","name":"approved","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMaxTier","inputs":[{"type":"uint256","name":"_maxTier","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMinStakeForNFT","inputs":[{"type":"uint256","name":"_newMinStake","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setRewardPercentageIncrease","inputs":[{"type":"uint256","name":"_tierRewardPercentageIncrease","internalType":"uint256"},{"type":"uint256","name":"_nftBurnRewardPercentageIncrease","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTier","inputs":[{"type":"address","name":"user","internalType":"address"},{"type":"uint256","name":"tier","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTimeRequirement","inputs":[{"type":"uint256","name":"_timeRequirement","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTokenURI","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"},{"type":"string","name":"uri","internalType":"string"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setrewardPerTokenPerWeek","inputs":[{"type":"uint256","name":"_rewardPerTokenPerWeek","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"stake","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"stakers","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsInterface","inputs":[{"type":"bytes4","name":"interfaceId","internalType":"bytes4"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tierRewardPercentage","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tierRewardPercentageIncrease","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"timeRequirement","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"daysRemaining","internalType":"uint256"}],"name":"timeTillNextNFTEarned","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"token","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"tokenURI","inputs":[{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalNFTsBurned","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalNFTsEarned","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalNFTsMinted","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalRewardPercentage","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalStaked","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalUniqueStakers","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"tokenId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unpause","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"unstake","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateReward","inputs":[{"type":"address","name":"user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userBurnedNFT","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userNFTs","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"userTier","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawUnclaimedRewards","inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"approved","indexed":true},{"type":"uint256","name":"tokenId","indexed":true}],"anonymous":false},{"type":"event","name":"ApprovalForAll","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"operator","indexed":true},{"type":"bool","name":"approved","indexed":false}],"anonymous":false},{"type":"event","name":"MinStakeForNFTChanged","inputs":[{"type":"uint256","name":"newMinStake","indexed":false}],"anonymous":false},{"type":"event","name":"NFTBurned","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"tokenId","indexed":false}],"anonymous":false},{"type":"event","name":"NFTMinted","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"tokenId","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","indexed":true},{"type":"address","name":"newOwner","indexed":true}],"anonymous":false},{"type":"event","name":"Paused","inputs":[{"type":"address","name":"account","indexed":false}],"anonymous":false},{"type":"event","name":"RewardPaid","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"reward","indexed":false}],"anonymous":false},{"type":"event","name":"RewardRateChanged","inputs":[{"type":"uint256","name":"newRewardRate","indexed":false}],"anonymous":false},{"type":"event","name":"Staked","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"amount","indexed":false}],"anonymous":false},{"type":"event","name":"TierChanged","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"newTier","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","indexed":true},{"type":"address","name":"to","indexed":true},{"type":"uint256","name":"tokenId","indexed":true}],"anonymous":false},{"type":"event","name":"Unpaused","inputs":[{"type":"address","name":"account","indexed":false}],"anonymous":false},{"type":"event","name":"Unstaked","inputs":[{"type":"address","name":"user","indexed":true},{"type":"uint256","name":"amount","indexed":false}],"anonymous":false}]