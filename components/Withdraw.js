import abi from "../constants/abi.json"
const ethers = require('ethers')
import { useState, useEffect } from "react"
import styles from "../styles/test.module.css"

export default function Withdraw() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const [currentAccount, setCurrentAccount] = useState(""); 
    const [currentState, changeState] = useState(0);   
    const [domValue, setDomValue] = useState(0);

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {changeState(0);setCurrentAccount(accounts[0]);});
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        domValue
        console.log("resource changed")
    }, [domValue])

    useEffect(() => {
        currentState
        console.log("resource changed")
    }, [currentState])

    useEffect(() => {
        checkIfAccountChanged();
    }, [])


    async function Winnings() {
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);
        try {
            let b = document.getElementById("a12").value;
            let tx = await contract.withdraw2(b);
            let receipt = await tx.wait();
            setDomValue(b);
            changeState(1);
        } catch(error) {
            console.log(error);
            changeState(2);
        }
    }


    return (
        <div> 
            <link href='https://fonts.googleapis.com/css?family=Nova Flat' rel='stylesheet'/>
            <div style={{color:"white",textAlign:"center",paddingTop: "20px", paddingBottom: "20px", display: "flex", justifyContent: "center"}}><span style={{color: "white", fontSize: '30px', fontFamily: 'Nova Flat', paddingRight: "20px"}}>Enter Amount </span><input type="text" name="a12" id="a12"></input>
                <div style={{paddingLeft: "20px"}}><button className={styles.testing} style={{borderRadius: "20px", height: "30px"}} onClick={async () => await Winnings()}>Withdraw</button></div>
            </div>
            <div style={{color:"white",textAlign:"center",paddingTop: "20px", paddingBottom: "20px"}}>{(currentState == 2) ? <div>Insufficient funds!</div> : (currentState == 1) ? <>{domValue} Tokens have been withdrawn!</> : <></>}</div>
        </div>
    )
}