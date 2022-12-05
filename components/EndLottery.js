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

    async function endLottery2() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);
        await contract.endLottery({
        gasLimit: 1000000,
        });
    }

    return (
        <div style={{backgroundColor:"#1a1141"}}>
            {(owner == "0x6D75480Cc475F93c1214Cf93C0A291c01badb2FD") ?
            <div style={{color:"blue",textAlign:"center",paddingTop: "30px", paddingBottom: "30px"}}>
                <button style={{borderRadius: "20px", height: "50px"}} className={styles.testing} onClick={async () => (await endLottery2())}><span style={{fontSize: '20px'}}>End Lottery</span></button>
            </div> : <></>}
        </div>
    )
}