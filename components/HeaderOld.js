import { ConnectButton } from "web3uikit";
// import styles from "../styles/test.module.css";

export default function Header() {

    return (
        <nav style={{color:"white", paddingTop:"30px"}}>
            <link rel="stylesheet" href="../styles/styles2.css"></link>
            <div style={{display: "flex"}}>
                <h1 style={{paddingleft: "100px"}}>RAFFLE</h1>
                <img style={{paddingLeft: "10px", position: "absolute"}} src="Picture3.jpg" alt="Logo"></img>
                <link href='https://fonts.googleapis.com/css?family=Alegreya Sans SC' rel='stylesheet'/>
                <h1 style={{paddingLeft: "700px", paddingRight: "300", textAlign: "center", fontSize: '40px', textShadow: "0px 4px 10px rgba(179, 147, 211, 0.8)", fontFamily: 'Alegreya Sans SC'}}>Xcite Blockchain Lottery Demo</h1>
                <ConnectButton moralisAuth={false} style={{paddingLeft: "300px", paddingTop: "10px"}}/>
            </div>
        </nav>
    )
}