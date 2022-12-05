import abi from "../constants/abi.json"
import { useState, useEffect } from "react"
const ethers = require('ethers')
import styles from "../styles/test.module.css"

export default function SetAdmin() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    console.log("test")
 
    const [currentState, setState] = useState(0);

    const [owner, setOwner] = useState(0);

    async function addy() {
        let acc = await provider.listAccounts();
        setOwner(acc[0]);
    }

    addy();

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {setState(0);setOwner(accounts[0]);});
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        checkIfAccountChanged();
    }, [])


    useEffect(() => {
        currentState
        console.log("resource changed")
    }, [currentState])

    async function setNewAdmin() {
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);

        let b = document.getElementById("a2").value;
        console.log(b);
        var address1 = await provider.resolveName(b);
        try {
            let tx = await contract.setAdmin(address1, {gasLimit: 1000000,});
            let receipt = await tx.wait();
            setState(2)
        } catch (error) {
            console.log(error)
            setState(1)
        }
    }


    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Nova Flat' rel='stylesheet'/>
            <div style={{textAlign:"center", paddingTop: "20px", paddingBottom: "20px", display: "flex", justifyContent: "center"}}> {console.log(owner)} 
                {(owner == "0x6d75480cc475f93c1214cf93c0a291c01badb2fd" || owner == "0x6D75480Cc475F93c1214Cf93C0A291c01badb2FD") ?
                <div><span style={{fontSize: '30px', fontFamily: 'Nova Flat'}}>Enter Address </span><input type="text" name="a2" id="a2"></input>
                <div style={{paddingLeft: "20px", display : "inline-flex"}}><button style={{borderRadius: "20px", height: "30px"}} className={styles.testing} onClick={async () => (await setNewAdmin())}>Set New Admin</button></div>
                </div> : <></>}
            </div>
            <div style={{color:"white",textAlign:"center",paddingTop: "20px", paddingBottom: "20px"}}>
                {(currentState == 2) ? <div>{document.getElementById("a2").value} is now an Admin!</div> : (currentState == 1) ? <div>Failed</div> : <></>}
            </div>
        </div>
    )
}