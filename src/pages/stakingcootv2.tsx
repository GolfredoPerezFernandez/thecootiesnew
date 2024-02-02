import { Box,  Grid,Stack,TextField,Typography as Tipe,  } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { Button, Hero, Information, Input, PlanCard, Typography } from '@web3uikit/core'
import { useContractWrite, useAccount,usePrepareContractWrite, useContractRead } from 'wagmi';
import { ethers,  } from 'ethers';
import { useNetwork,  } from 'wagmi'
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

  const [values, setValues] = React.useState({
    amountStake:0,
  });



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
    address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
    abi: COOTSTAKING,
    functionName: 'totalStaked',
  })

  

const { data :dataStakingPercentage,  }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'totalRewardPercentage',
})
	
const { data :dataStakingBurnedNFT ,  }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'userBurnedNFT',
})
	
const { data :dataDebug , }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'debugRewards',
})
 
const { data :userTier , }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'userTier',
})

const { data :timeTillNextNFTEarned , }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'timeTillNextNFTEarned',
})

const { data :totalNFTsBurned , }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'totalNFTSBurned',
})





const { data :dataGetUserMintedTokenIds,  }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'getUserMintedTokenIds',
})

const { data :dataStakingEarned,  }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
watch:true,
  functionName: 'earned',
})
	

const { data :dataStaking,  }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
watch:true,
  functionName: 'balanceOf',
})
	
const { data :dataStakingBalance,  }:{data:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
  abi: COOTSTAKING,
  args:[ethAddress],
  functionName: 'balances',
})
	const [nftURI,setNftURI]=useState("")
  const [nfts,setNFTs]=useState<any[]>([])

const { data :dataNFTs, refetch }:{data:any,refetch:any} = useContractRead({
  address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
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
  address: '0xe4671844Fcb3cA9A80A1224B6f9A0A6c2Ba2a7d5',
  abi: DKMTABI,
  args:[ethAddress],

  functionName: 'balanceOf',
})
		

  const [loading,setLoading]= React.useState(false)
   

  
  const isTabletOrMobile2 = useMediaQuery({ query: '(max-width: 550px)' })

  const { write:withdrawStaking } = useContractWrite({
    address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
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
    address: '0xe4671844Fcb3cA9A80A1224B6f9A0A6c2Ba2a7d5',
    abi: DKMTABI,
    onSuccess:()=>{
      setLoading(false)
    },
    onError:()=>{
      setLoading(false)
    },
    functionName: 'approve',
    args:['0xdaB384972B231EBE3105E29e8D6A406b859f05d0',parseFloat(ethers.parseUnits(stakeAmount.toString(),"ether").toString())]
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
    address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
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
    address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
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
    address: '0xdaB384972B231EBE3105E29e8D6A406b859f05d0',
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
    address: '0xe4671844Fcb3cA9A80A1224B6f9A0A6c2Ba2a7d5',
    abi: DKMTABI,
    watch:true,
    args:[ethAddress,"0xdaB384972B231EBE3105E29e8D6A406b859f05d0"],
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
          backgroundImage: `url(${"https://bafybeifpfxdzsfvhoxif4sqnrthwi3r66nmsddemeijxzjtqallf7q6t44.ipfs.nftstorage.link/bg1.png"})`,
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
      The tier system is the bedrock of our staking program. For every 30 days of continuous staking, you advance to a higher tier, which boosts your reward rate by an additional 2%. Your tier level is tracked within the smart contract.
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
      Every 30 days, you'll also receive a special NFT potion called "COOT BREW." These potions are more than just eye-catching digital assets; they serve a dual purpose. You can keep them as unique, tradable assets for secondary markets or burn them to instantly increase your reward rate by 2%. It's magic in a bottle, designed to give your staking rewards a potent boost!
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
      If you decide to unstake, be aware that your tier level and last update time will be reset to zero, giving you a fresh start should you choose to re-engage with the system later. The smart contract ensures that the rewards are for those who stay committed.
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
      🎟️ Minimum Staking Requirement: 100,000 COOT
      To be eligible for the COOT BREW NFT drops and to engage with the tier system, you'll need to stake a minimum of 100,000 COOT or COOTCASH tokens. This ensures that the benefits are reserved for our most dedicated stakers.
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
      🕒 Time-Based Rewards and APY
      The smart contract calculates rewards based on the time elapsed since your last update, giving you a dynamic way to earn. Plus, you can easily calculate your Annual Percentage Yield (APY) directly through the contract, offering full transparency on your investment.
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
      COOT BREW is not just another staking platform; it's a comprehensive ecosystem that brings together the best of DeFi, gamified rewards, and NFT magic. Don't miss out on this revolutionary staking experience. Stake now and let the COOT BREW do its magic!
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

const DKMTABI= [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Snapshot","inputs":[{"type":"uint256","name":"id","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOfAt","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"snapshotId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"burn","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"burnFrom","inputs":[{"type":"address","name":"account","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"mint","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"snapshot","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupplyAt","inputs":[{"type":"uint256","name":"snapshotId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]}]
const COOTSTAKING=[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "addRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "string[]",
				"name": "uris",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_minimumStakeForNFT",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_initialRewardRate",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "bulkBurnNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialRewardPool",
				"type": "uint256"
			}
		],
		"name": "initializeRewardPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newMinStake",
				"type": "uint256"
			}
		],
		"name": "MinStakeForNFTChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "NFTBurned",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "NFTMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "removeRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "RewardPaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newRewardRate",
				"type": "uint256"
			}
		],
		"name": "RewardRateChanged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_maxTier",
				"type": "uint256"
			}
		],
		"name": "setMaxTier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newMinStake",
				"type": "uint256"
			}
		],
		"name": "setMinStakeForNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tierRewardPercentageIncrease",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_nftBurnRewardPercentageIncrease",
				"type": "uint256"
			}
		],
		"name": "setRewardPercentageIncrease",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rewardPerTokenPerWeek",
				"type": "uint256"
			}
		],
		"name": "setrewardPerTokenPerWeek",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tier",
				"type": "uint256"
			}
		],
		"name": "setTier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_timeRequirement",
				"type": "uint256"
			}
		],
		"name": "setTimeRequirement",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "setTokenURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newTier",
				"type": "uint256"
			}
		],
		"name": "TierChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Unstaked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "updateReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawUnclaimedRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "averageStake",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "calculateAPY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "debugRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "timeElapsed",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "baseReward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalPercentage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "finalReward",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "displayStakingAndRewardsInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalStakedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalRewardPoolAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "earned",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfStakers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserMintedTokenIds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "globalTokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasStakedBefore",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isRewardPoolInitialized",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastRewardClaimTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastRewardUpdateTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastUpdateTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxTier",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minStakeForNFT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "nextNFT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "nftBurnRewardPercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nftBurnRewardPercentageIncrease",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "rewardDebt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "rewardPaid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rewardPerTokenPerWeek",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rewardPool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rewardRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "scalingFactor",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "stakers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "tierRewardPercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tierRewardPercentageIncrease",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "timeRequirement",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "timeTillNextNFTEarned",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "daysRemaining",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalNFTsBurned",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalNFTsEarned",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalNFTsMinted",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "totalRewardPercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalStaked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalUniqueStakers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userBurnedNFT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userNFTs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userTier",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]