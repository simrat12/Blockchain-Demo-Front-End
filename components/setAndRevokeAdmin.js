import abi from "../constants/abi.json"
import abi2 from "../constants/abi2.json"
const ethers = require('ethers')
import styles from "../styles/styles2.module.css"
import { useState, useEffect } from "react"

export default function ChangeAdmin() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    console.log("test3")
 
    const [currentState, setState] = useState(0);

    const [owner, setOwner] = useState(0);

    const[isAdmin, SetIfAdmin] = useState(false);

    async function checkIfAdmin(addy) {
        const contract = new ethers.Contract('0xB55Ae10ed3a1A588D7b58B14d560cAc2A072AC24', abi, signer);
        let Admin = await contract.roles("0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42", addy);
        SetIfAdmin(Admin);
    }

    async function addy() {
        let acc = await provider.listAccounts();
        setOwner(acc[0]);
        await checkIfAdmin(acc[0]);
    }

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)

        } catch (error) {
            console.log(error)
        }
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
        addy();
    }, [])


    useEffect(() => {
        currentState
        console.log("resource changed")
    }, [currentState])

    async function setNewAdmin() {
        const contract = new ethers.Contract('0xB55Ae10ed3a1A588D7b58B14d560cAc2A072AC24', abi, signer);

        let b = document.getElementById("new_admin").value;
        console.log(b);
        var address1 = await provider.resolveName(b);
        console.log(address1);
        try {
            let tx = await contract.setAdmin(address1, {gasLimit: 1000000,});
            let receipt = await tx.wait();
            setState(2)
        } catch (error) {
            console.log(error)
            setState(1)
        }
    }

    async function removeAdmin() {
        const contract = new ethers.Contract('0xB55Ae10ed3a1A588D7b58B14d560cAc2A072AC24', abi, signer);

        let b = document.getElementById("old_admin").value;
        console.log(b);
        var address1 = await provider.resolveName(b);
        console.log(address1);
        try {
            await contract.revokeAdmin(address1, {gasLimit: 1000000,});
            setState(3)
        } catch (error) {
            console.log(error)
            setState(4)
        }
    }



    return (
        <div style={{backgroundColor:"#1a1141"}}>
            <div style={{backgroundColor:"#1a1141"}}>
                {(owner == "0x6d75480cc475f93c1214cf93c0a291c01badb2fd" || owner == "0x6D75480Cc475F93c1214Cf93C0A291c01badb2FD" || isAdmin) ?
                <div className={styles.rectangle}> 
                    <link href='https://fonts.googleapis.com/css?family=Baloo' rel='stylesheet'></link>
                    <div className={styles.yoyo}>
                        <div className={styles.depositText2}>Set Admin</div>
                        <div className={styles.enterAmount2}>Revoke Admin</div>
                    </div>
                    <div>
                        <input className={styles.inputAmount2} type="text" name="new_admin" id="new_admin"></input>
                        <br></br>
                        <input className={styles.inputAmount2} type="text" name="old_admin" id="old_admin"></input>
                    </div>
                    <div>
                        <button className={styles.testing2} onClick={async () => await setNewAdmin({onSuccess: handleSuccess, onError: (error) => console.log(error),})}>Enter</button>
                        <br></br>
                        <button className={styles.testing2} onClick={async () => await removeAdmin({onSuccess: handleSuccess, onError: (error) => console.log(error),})}>Enter</button>
                    </div>
                </div> : <div style={{backgroundColor:"#1a1141"}}></div>}
            </div>
            <br></br>
            <div style={{color: "red", textAlign: "center"}}>
                {(currentState == 2) ? <div>{document.getElementById("new_admin").value} is now an Admin!</div> : (currentState == 1) ? <div>Failed</div> : <></>}
                {(currentState == 3) ? <div>{document.getElementById("old_admin").value} is no longer an Admin!</div> : (currentState == 4) ? <div>Failed</div> : <></>}
            </div>
        </div>
    )
}