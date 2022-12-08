import abi from "../constants/abi.json"
const ethers = require('ethers')
import { useState, useEffect } from "react"
import styles from "../styles/test.module.css"

export default function EndLottery() {
    console.log(1)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const addresses = async () => {
        acc = await provider.listAccounts()
        return acc
    };

    const [owner, setOwner] = useState(addresses[0])
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

    addy();

    useEffect(() => {
        const addresses1 = async () => {
            let acc = await provider.listAccounts();
            setOwner(acc[0]);
            console.log(acc[0]);
            return acc[0]
        };
        addresses1();
        addy();
        console.log("resource changed")
    }, [addresses])

    async function endLottery2() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract('0xB55Ae10ed3a1A588D7b58B14d560cAc2A072AC24', abi, signer);
        await contract.endLottery({
        gasLimit: 1000000,
        });
    }

    return (
        <div style={{backgroundColor:"#1a1141"}}>
            {(owner == "0x6D75480Cc475F93c1214Cf93C0A291c01badb2FD" || isAdmin) ?
            <div style={{color:"blue",textAlign:"center",paddingTop: "30px", paddingBottom: "30px"}}>
                <button style={{borderRadius: "20px", height: "50px"}} className={styles.testing} onClick={async () => (await endLottery2())}><span style={{fontSize: '20px'}}>End Lottery</span></button>
            </div> : <></>}
        </div>
    )
}