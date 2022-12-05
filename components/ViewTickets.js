import abi from "../constants/abi.json"
const ethers = require('ethers')
import { useState, useEffect } from "react"
import styles from "../styles/test.module.css"

export default function ViewTickets() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const [currentAccount, setCurrentAccount] = useState(""); 
    const [currentState, changeState] = useState(0); 
    const [ticketNumber, setTicketNumber] = useState(0);  

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {changeState(0);setCurrentAccount(accounts[0]);});
            } catch (error) {
                console.log(error);
            }
    }

    useEffect(() => {
        currentState
        console.log("resource changed")
    }, [currentState])

    useEffect(() => {
        ticketNumber
        console.log("resource changed")
    }, [ticketNumber])

    useEffect(() => {
        checkIfAccountChanged();
    }, [])


    async function TicketNumber() {
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);
        try {
            let acc = await provider.listAccounts();
            console.log(acc[0]);
            var address1 = await provider.resolveName(acc[0]);
            console.log(address1);
            let test1 = await contract.viewNumberOfTickets(address1);
            changeState(1);
            setTicketNumber(test1.toNumber());
            console.log(test1)
        } catch(error) {
            console.log(error);
            changeState(2);
        }
    }


    return (
        <div> 
            <div style={{color:"white",textAlign:"center",paddingTop: "30px", paddingBottom: "30px"}}>
                <button className={styles.testing} style={{borderRadius: "20px", height: "50px"}} onClick={async () => await TicketNumber()}><span style={{fontSize: '20px'}}>View my number of tickets </span></button>
            </div>
            <div style={{color:"white",textAlign:"center",paddingTop: "30px", paddingBottom: "30px"}}>{(currentState == 2) ? <div style={{fontSize: '20px'}}>No tickets!</div> : (currentState == 1) ? <>{ticketNumber} tickets purchased!</> : <></>}</div>
        </div>
    )
}