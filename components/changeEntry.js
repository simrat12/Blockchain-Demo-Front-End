import abi from "../constants/abi.json"
import { useState, useEffect } from "react"
const ethers = require('ethers')
import styles from "../styles/styles2.module.css"

export default function ChangeEntry() {
    console.log(2)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const[isAdmin, SetIfAdmin] = useState(false);


    async function checkIfAdmin(addy) {
        const contract = new ethers.Contract('0xB55Ae10ed3a1A588D7b58B14d560cAc2A072AC24', abi, signer);
        let Admin = await contract.roles("0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42", addy);
        SetIfAdmin(Admin);
    }


    const addresses = async () => {
        acc = await provider.listAccounts()
        return acc
    };

    const [owner, setOwner] = useState(addresses[0])

    useEffect(() => {
        const addresses1 = async () => {
            let acc = await provider.listAccounts();
            await checkIfAdmin(acc[0]);
            setOwner(acc[0]);
            console.log(acc[0]);
            return acc[0]
        };
        addresses1();
        console.log("resource changed")
    }, [addresses])

    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)

        } catch (error) {
            console.log(error)
            setOwner("You are not the owner!")
        }
    }


    async function changeEntry2() {
        const contract = new ethers.Contract('0xB55Ae10ed3a1A588D7b58B14d560cAc2A072AC24', abi, signer);

        let b = document.getElementById("a1").value;
        await contract.changeMaxEntry(b, {gasLimit: 1000000,});
    }

    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Baloo' rel='stylesheet'></link>
            {(owner == "0x6D75480Cc475F93c1214Cf93C0A291c01badb2FD" || isAdmin) ?
            <div>
            <div className={styles.rectangle}><span className={styles.enterAmount2}>New Max Entry Fee   </span><input className={styles.inputAmount3} type="number" name="a1" id="a1"></input>
            <div style={{paddingLeft: "20px", paddingTop: "5px"}}><button className={styles.testing5} onClick={async () => (await changeEntry2({onSuccess: handleSuccess, onError: (error) => console.log(error),}))}>Submit new Fee</button></div>
            </div></div> : <></>}
        </div>
    )
}