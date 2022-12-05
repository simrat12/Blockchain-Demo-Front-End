import { useState, useEffect } from "react"
import abi from "../constants/abi.json"
const ethers = require('ethers')
import styles from "../styles/test.module.css"

export default function RevokeAdmin() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    console.log("test")
 
    const [currentState, setState] = useState(0);
    const [owner, setOwner] = useState(0)

    const addresses = async () => {
        let acc = await provider.listAccounts()
        setOwner(acc[0])
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
        checkIfAccountChanged();
    }, [])


    useEffect(() => {
        currentState
        console.log("resource changed")
    }, [currentState])

    async function removeAdmin() {
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);

        let b = document.getElementById("c2").value;
        console.log(b);
        var address1 = await provider.resolveName(b);
        try {
            await contract.revokeAdmin(address1, {gasLimit: 1000000,});
            setState(2)
        } catch (error) {
            console.log(error)
            setState(1)
        }
    }

    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Nova Flat' rel='stylesheet'/>
            <div style={{textAlign:"center",paddingTop: "20px", paddingBottom: "20px", display: "flex", justifyContent: "center"}}> 
                {(owner == "0x6d75480cc475f93c1214cf93c0a291c01badb2fd" || owner == "0x6D75480Cc475F93c1214Cf93C0A291c01badb2FD") ?
                <div><div style={{display : "inline-flex"}}><span style={{fontSize: '30px', fontFamily: 'Nova Flat', paddingRight: "20px", display: "inline-flex"}}>Enter Address </span><input type="text" name="c2" id="c2"></input></div>
                <div style={{display : "inline-flex", paddingLeft: "20px"}}><button style={{borderRadius: "20px", height: "30px"}} className={styles.testing} onClick={async () => (await removeAdmin())}>Revoke Admin</button></div>
                </div> : <></>}
            </div>
            <div style={{color:"white",textAlign:"center",paddingTop: "20px", paddingBottom: "20px"}}>
                {(currentState == 2) ? <div>{document.getElementById("c2").value} is no longer an Admin!</div> : (currentState == 1) ? <div>Failed</div> : <></>}
            </div>
        </div>
    )
}