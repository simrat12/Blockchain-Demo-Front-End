import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Header from '../components/header'
import LotteryEntrance from '../components/LotteryEntrance'
import EndLottery from '../components/EndLottery'
import ChangeEntry from '../components/changeEntry'
import {useMoralis} from "react-moralis"
import ViewState from '../components/TestingPublicFunction'
import ViewWinnings from '../components/ViewWinnings'
import SetAdmin from '../components/SetAdmin'
import Initialise from '../components/Initialise'
import Withdraw from '../components/Withdraw'
import ViewTickets from '../components/ViewTickets'
import RevokeAdmin from '../components/RevokeAdmin'
import Test1 from '../components/test1'
import Test2 from '../components/test2'
import ChangeAdmin from '../components/setAndRevokeAdmin'
import ChangeEntry3 from '../components/changeEntry2'


export default function Home() {
  const { isWeb3Enabled } = useMoralis()

  return (
    <div style={{backgroundColor:"#1a1141", height: "100%"}}>
      <div style={{backgroundColor:"#1a1141"}}>
        <Header/>
        {isWeb3Enabled ?
        (<div style={{backgroundColor:"#1a1141"}}>
        
        <Test1 />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Test2 />
        <br></br>
        <br></br>
        <br></br>
        {/* <LotteryEntrance />
        <ViewTickets />
        <ViewWinnings />
        <Withdraw /> */}
        <ChangeAdmin />
        <br></br>
        <br></br>
        <br></br>
        <ChangeEntry />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Initialise />
        <br></br>
        <EndLottery />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {/* <EndLottery />
        <ChangeEntry />
        <SetAdmin />
        <RevokeAdmin />
        <Initialise /> */}
        </div>)
        :
        (<div>No Metamask Detected</div>)}
      </div>
    </div>
  )
}
