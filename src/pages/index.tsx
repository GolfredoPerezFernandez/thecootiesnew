import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useNetwork } from 'wagmi'
import * as React from 'react'
import FaceIcon from '@mui/icons-material/Face';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ExtensionIcon from '@mui/icons-material/Extension';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StoreIcon from '@mui/icons-material/Store';
import Button from '@mui/material/Button';
import Carousel  from 'react-multi-carousel';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { IconButtonProps } from '@mui/material/IconButton';

import 'react-multi-carousel/lib/styles.css';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import {  Grid, Link, TextField} from "@mui/material";
import { TypeAnimation } from 'react-type-animation';
import TokenSale from './tokenSale';

const useStyles = makeStyles(theme => ({
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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export default function Page() { 
   const classes = useStyles();
   const [amount,setAmount]=React.useState(0)
   const { chain,chains } = useNetwork()

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

  return (
    <div
      style={{
        backgroundImage: `url(${"https://bafybeian7nhvokbl2ffn5d63bxscx7eiwihcog2hpui5ipmaehj6l7mbv4.ipfs.nftstorage.link/BG.png"})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        minHeight: '100vh',
        margin:-8
      }}
    >
  
    
    <section    className={classes.root}>
      
      <ReactPlayer
        url={"https://bafybeigbwesuvzhw4zlnw4vui67vu4w65vtq44dicfisgaryjweqabymky.ipfs.nftstorage.link/"}
        playing
        loop
        muted
        
        width="100%"
      />
      <div className={classes.overlay}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Typography fontFamily={"Orbitron"}   variant="h5" width={"80%"} component="h2" textAlign={"center"} justifyContent={"center"} className={classes.title}>
          COMMUNITY-DRIVEN FLARE & SONGBIRD ECOSYSTEM ACCELERATOR.
          </Typography>
          <TypeAnimation
							 sequence={[
							   'MORE THAN JUST ART', 
							   4000,
							   'SUSTAINABLE, DEFLATIONARY AND DECENTRALIZED',
							   4000,
							   'YIELD OPTIMIZER ON SONGBIRD & FLARE NETWORKS',
							   4000
							 ]}
							 wrapper="div"
							 cursor={true}
							 repeat={Infinity}
							 style={{ fontFamily:"Orbitron",fontSize: '0.8em' ,textAlign:'center'}}
						   />
          
        </Box>
      </div>
    </section>
   

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
{cootiesNft.map((e:any,i:any)=>{
       return (
        <Card key={i} sx={{ width: 345,height:370,marginTop:0,marginBottom:2}}>
     
        <CardMedia
        key={i}
          component="img"
          height="350px"
          image={e.img}
          alt="Paella dish"
        />
        <CardContent style={{backgroundColor:'#161A42'}}>
          <Typography variant="body1" color="white">
          {e.title}
          </Typography>
        </CardContent>
      
      </Card>
     );})}
    
</Carousel>

{chain?.id.toString()==="14"?<TokenSale/>:null}
<Typography color="white" fontFamily={"Orbitron"}   variant="h2" component="h2" textAlign={"center"} justifyContent={"center"} className={classes.title}>
          Roadmap
          </Typography>
<VerticalTimeline >
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#161A42', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  #161A42' }}
    date="2021"
    iconStyle={{ background: '#161A42', color: '#fff' }}
    icon={<AutoAwesomeIcon />}
  >
    <h3 className="vertical-timeline-element-title">Laying the ground work, concept and NFT Design.</h3>
   
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2021"
    contentStyle={{ background: '#161A42', color: '#fff' }}

    iconStyle={{ background: '#161A42', color: '#fff' }}
    icon={<PeopleAltIcon />}
  >
    <h3 className="vertical-timeline-element-title">Building of the Community</h3>
    <h4 className="vertical-timeline-element-subtitle">Social Media creation and Marketing strategies.</h4>
    
  </VerticalTimelineElement>
  
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2022"
    contentStyle={{ background: '#161A42', color: '#fff' }}

    iconStyle={{ background: '#161A42', color: '#fff' }}
    icon={<FaceIcon />}
  >
    <h3 className="vertical-timeline-element-title">Begin Mint of 4444 Genesis Cooties</h3>

  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    date="2022"
    contentStyle={{ background: '#161A42', color: '#fff' }}

    iconStyle={{ background: '#161A42', color: '#fff' }}
    icon={<ExtensionIcon />}
  >
    <h3 className="vertical-timeline-element-title">Marketing and Game Development Start</h3>
   
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="2022"
    contentStyle={{ background: '#161A42', color: '#fff' }}

    iconStyle={{ background: '#161A42', color: '#fff' }}
    icon={<RocketLaunchIcon />}
  >
    <h3 className="vertical-timeline-element-title">CootieCoin Airdrop Dex, Listing for $COOT</h3>
   
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="2022"
    contentStyle={{ background: '#161A42', color: '#fff' }}

    iconStyle={{ background: '#161A42', color: '#fff' }}
    icon={<FaceIcon />}
  >
    <h3 className="vertical-timeline-element-title">Second NFT Collection Cooties V2</h3>
   
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    date="2022"
    contentStyle={{ background: '#161A42', color: '#fff' }}

    iconStyle={{ background: '#161A42', color: '#fff' }}
   
    icon={<StoreIcon />}
  >
    <h3 className="vertical-timeline-element-title">Launch Marketplace</h3>
    
  </VerticalTimelineElement>

</VerticalTimeline>

<Box height={140} />
</div>

  )
}
