import React from 'react';
import { useEffect, useState } from 'react';
import logo from './logo.png';
import banner from './banner.png';
import './App.css';
import abi from './contracts';
import { ethers } from 'ethers';
import { Button, Divider, Avatar, Container, Card, CardHeader, CardMedia, CardContent, CardActions, Typography, CssBaseline,  } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GetAppIcon from '@mui/icons-material/GetApp';


// You token contract address
const contractAddress = "0x6bE82591C08493D1068ebF376A6dDC42337ef2f5";

// the fee in wei, fee = 1000000000000000 means 0.001 BNB
const fee = 2200000000000000;


function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = () => {
    const { ethereum } = window;
    if(!ethereum){
      console.log("Metamask NOT Installed");
      return;
    }else{
      console.log("Metamask Installed");
    }
   }

  const connectWalletHandler = async() => { 
    const { ethereum } = window;
    if(!ethereum){
      alert("Please Install Metamask!");
    }

    try{
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      console.log("Found an account :", accounts[0]);
      setCurrentAccount(accounts[0]);
    }catch (err){
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <Button onClick={connectWalletHandler} variant="contained" startIcon={<AccountBalanceWalletIcon />}>
        Wallet Connect
      </Button>
    )
  }

  const airdropButton = () => {
    return (
      <Button onClick={airdropHandler} variant="contained" startIcon={<GetAppIcon />}>
        Claim Airdrop
      </Button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  
  const airdropHandler = async() => {
    try{
      const { ethereum } = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Intialize payment");
        let getadrp = await contract.dropTokens({value: fee});
        console.log(contract);
		if(getadrp){
			alert("Congratulations, you got our airdrop, you will receive your tokens very soon");
		}else{
			alert("Something wrong, Maybe you don't have enough BNB balance for transaction fee or your wallet already have this token");
		}
      }
    }catch(err){
		alert("Something wrong, Maybe you don't have enough BNB balance for transaction fee or your wallet already have this token");
    	console.log(err);
    }

  }

  return (
    <React.Fragment>
      <CssBaseline />
      	<CardActions style={{ justifyContent: 'center', marginTop: '16px' }}>
            <Button variant="contained" color="primary" href="#">Home</Button>
            <Button variant="contained" color="primary" href="#">Pools</Button>
            <Button variant="contained" color="primary" href="#">Buy</Button>
	</CardActions>  	  
      <Container maxWidth="sm">

    <Card sx={{ maxWidth: 750, bgcolor: 'darkgreen' }}>
      <CardHeader
      avatar={
        <Avatar src={logo} sx={{ width: 90, height: 90 }}/>
      }
        titleTypographyProps={{variant:'h5' }}
        title="NACA Coin"
        style={{
          backgroundColor: 'maroon',
          color: 'gold' // กำหนดสีทองให้ตัวหนังสือ
        }}
      />
      <CardMedia
        component="img"
        height="200"
        image={banner}
        alt=""
      />
      <CardContent>
      <Typography 
        variant="body2" 
        color="white" 
        p={2} 
        style={{ textAlign: 'center' }} // จัดข้อความให้อยู่กึ่งกลาง
      >
        มาร่วมกันสร้างระบบนิเวศ ของ NACA Coin บน <br /> NacaGlobalNetwork.com ไปด้วยกัน
      </Typography>
        <Typography 
          variant="h7" 
          color="white" 
          p={2} 
          style={{ fontSize: '14px' }} // ปรับขนาดฟอนต์ให้เล็กลง
        >
          NACA Coin Address : 0x8dFA805C508c16FE7cC73e36c5d9bee48e77924F
        </Typography>
        <Typography variant="h6" color="gold" p={2}>
          Claim : 500 NACA COIN
        </Typography>
      </CardContent>
      <Divider />
      <CardActions style={{justifyContent: 'center'}}>
          {currentAccount ? airdropButton() : connectWalletButton()}
      </CardActions>

    </Card>

    </Container>
    </React.Fragment>
  );
}

export default App;
