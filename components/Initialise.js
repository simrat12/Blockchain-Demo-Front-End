import abi from "../constants/abi.json"
import { useState, useEffect } from "react"
const ethers = require('ethers')
import styles from "../styles/styles2.module.css"

export default function Initialise() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    console.log("here")
 
    const [currentState, setState] = useState(0);
    const [owner, setOwner] = useState(0)
    const[isAdmin, SetIfAdmin] = useState(false);

    async function checkIfAdmin(addy) {
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);
        let Admin = await contract.roles("0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42", addy);
        SetIfAdmin(Admin);
    }

    const addresses = async () => {
        let acc = await provider.listAccounts()
        setOwner(acc[0])
        await checkIfAdmin(acc[0]);
    };

    addresses();

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {setState(0);setOwner(accounts[0]);});
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        currentState
        console.log("resource changed, init")
        console.log(currentState)
    }, [currentState])

    useEffect(() => {
        checkIfAccountChanged();
    }, [])

    async function initialiseVestingPeriod() {
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);

        let b = document.getElementById("a13").value;
        console.log(b);
        try {
            let tx = await contract.initialiseWinnersVesting(b, {gasLimit: 1000000,});
            let receipt = await tx.wait();
            setState(2)
        } catch (error) {
            console.log(error)
            setState(1)
        }
    }

    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Baloo' rel='stylesheet'></link>
            <div> 
                {(owner == "0x6d75480cc475f93c1214cf93c0a291c01badb2fd" || owner == "0x6D75480Cc475F93c1214Cf93C0A291c01badb2FD" || isAdmin) ?
                <div className={styles.rectangle}><span className={styles.enterAmount2}>Enter Vesting Period </span> <input className={styles.inputAmount3} type="text" name="a13" id="a13"></input>
                <div style={{paddingLeft: "20px", display : "inline-flex"}}><button className={styles.testing5} onClick={async () => (await initialiseVestingPeriod())}>Set New Vesting Period</button></div>
                </div> : <></>}
            </div>
            <div style={{color:"red",textAlign:"center",paddingTop: "20px", paddingBottom: "20px"}}>
                {(currentState == 2) ? <div>Vesting period initialised to {document.getElementById("a13").value}</div> : (currentState == 1) ? <div>Failed</div> : <></>}
            </div>
        </div>
    )
}