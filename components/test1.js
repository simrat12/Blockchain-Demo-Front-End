import abi from "../constants/abi.json"
import abi2 from "../constants/abi2.json"
const ethers = require('ethers')
import styles from "../styles/styles2.module.css"
import { useState, useEffect } from "react"

export default function Test1() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const [ticketNumber, setTicketNumber] = useState(0);
    const [currentAccount, setCurrentAccount] = useState("");

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {setCurrentAccount(accounts[0]);set_ticket_number(accounts[0])});
            } catch (error) {
                console.log(error);
            }
    }


    async function set_ticket_number(acc) {
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);
        console.log(acc);
        var address1 = await provider.resolveName(acc);
        console.log(address1);
        let test1 = await contract.viewNumberOfTickets(address1);
        console.log("ticket number is", test1.toNumber());
        setTicketNumber(test1.toNumber());
    }


    useEffect(() => {
        checkIfAccountChanged();
    }, [])


    const handleSuccess = async (tx) => {
        try {
            await tx.wait(1)

        } catch (error) {
            console.log(error)
        }
    }

    async function enterRaffle() {
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);
        const contract2 = new ethers.Contract('0x198244C498340dD151B5A0bB7f0d40893270a085', abi2, signer);
        let b = document.getElementById("a").value;
        let tx = await contract2.approve('0x10418a0D858616B10eD51719298cBA31572413b9', b);
        let receipt = await tx.wait();
        await contract.enterRaffleInToken(b, {gasLimit: 10000000});
    }



    return (
        <div className={styles.rectangle}> 
            <link href='https://fonts.googleapis.com/css?family=Baloo' rel='stylesheet'></link>
            <div className={styles.yoyo}>
                <div className={styles.depositText}>Deposit</div>
                <div className={styles.enterAmount}>Enter Amount </div>
            </div>
            <div>
                <div className={styles.viewTickets}>Your Tickets</div>
                <input className={styles.inputAmount} type="number" name="a" id="a"></input>
            </div>
            <div>
                <div className={styles.viewTicketInput}>{ticketNumber}</div>
                <button className={styles.testing} onClick={async () => await enterRaffle({onSuccess: handleSuccess, onError: (error) => console.log(error),})}>Enter Lottery</button>
            </div>
        </div>
    )
}