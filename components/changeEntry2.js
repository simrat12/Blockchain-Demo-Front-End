import abi from "../constants/abi.json"
import { useState, useEffect } from "react"
const ethers = require('ethers')
import styles from "../styles/styles2.module.css"

export default function ChangeEntry3() {
    console.log(2)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const addresses = async () => {
        acc = await provider.listAccounts()
        return acc
    };

    const [owner, setOwner] = useState(addresses[0])

    useEffect(() => {
        const addresses1 = async () => {
            let acc = await provider.listAccounts();
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
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);

        let b = document.getElementById("a1").value;
        await contract.changeMaxEntry(b, {gasLimit: 1000000,});
    }

    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Baloo' rel='stylesheet'></link>
            {(owner == "0x6D75480Cc475F93c1214Cf93C0A291c01badb2FD") ?
            <div>
            <div className={styles.rectangle}>New Entry Fee<input type="number" name="a1" id="a1"></input>
            <div><button className={styles.testing2} onClick={async () => (await changeEntry2({onSuccess: handleSuccess, onError: (error) => console.log(error),}))}>Submit new Fee</button></div>
            </div></div> : <></>}
        </div>
    )
}