import abi from "../constants/abi.json"
const ethers = require('ethers')
import { useState, useEffect } from "react"
import styles from "../styles/test.module.css"

export default function ViewWinnings() {
    let test1 = 0;
    console.log(3)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

    const [currentAccount, setCurrentAccount] = useState(""); 
    const [currentState, changeState] = useState(0);  
    const [ticketNumber, setTicketNumber] = useState(0); 
    const [remainingRewards2, setRemainingRewards] = useState(0);

    async function addy() {
        let acc = await provider.listAccounts();
        setCurrentAccount(acc[0]);
    }

    addy();

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


    // async function Winnings() {
    //     const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);
    //     try {
    //         let acc = await provider.listAccounts();
    //         console.log(acc[0]);
    //         var address1 = await provider.resolveName(acc[0]);
    //         let test1 = await contract.viewWinnings(address1);
    //         setTicketNumber(test1.toNumber());
    //         changeState(1);
    //         console.log(test1)
    //     } catch(error) {
    //         console.log(error);
    //         changeState(2);
    //     }
    // }

    async function seeRewards(addy) {
        const contract = new ethers.Contract('0x10418a0D858616B10eD51719298cBA31572413b9', abi, signer);
        let duration = await contract.ChosenTimePeriod();
        let duration2 = duration.toNumber();
        let startTime = await contract.winnerInfo(addy);
        let start2 = startTime[2].toNumber();
        let amount = await contract.winnerInfo(addy);
        let amount2 = amount[1].toNumber();
        let amountWithdrawn = await contract.winnerInfo(addy);
        let amountWithdrawn2 = amountWithdrawn[3].toNumber();
        let winOrNot = await contract.winnerInfo(addy);
        console.log(winOrNot[0]);
        provider.getBlockNumber().then(function(blockNumber) {

            // getBlock returns a block object and it has a timestamp property.
            provider.getBlock(blockNumber).then(function(block) {
                // Assign block.timestamp to timestamp variable
                let timestamp = block.timestamp;
                console.log(amount);
                console.log(duration2);
                console.log(amount2);
                let rewardsPerSecond = amount2/duration2;
                console.log(rewardsPerSecond);
                let vestingTimeElapsed = timestamp - start2;
                console.log(vestingTimeElapsed);
                let allocatedRewards = vestingTimeElapsed * rewardsPerSecond;
                console.log(allocatedRewards);
                let remainingRewards = allocatedRewards - amountWithdrawn2;
                if ((amount2-amountWithdrawn2) <= remainingRewards) {
                    remainingRewards = amount2-amountWithdrawn2;
                }

                setRemainingRewards(remainingRewards);
                changeState(1);
            })
        });
    }


    return (
        <div> {console.log(currentAccount)}
            <div style={{color:"white",textAlign:"center",paddingTop: "30px", paddingBottom: "30px"}}>
                <button className={styles.testing} style={{borderRadius: "20px", height: "50px"}} onClick={async () => await seeRewards(currentAccount)}><span style={{fontSize: '20px'}}>View Your claimable Winnings </span></button>
            </div>
            <div style={{color:"white",textAlign:"center",paddingTop: "30px", paddingBottom: "30px"}}>{(currentState == 2) ? <div style={{fontSize: '20px'}}>No winnings available!</div> : (currentState == 1) ? <>{remainingRewards2} tokens available for withdrawl</> : <></>}</div>
        </div>
    )
}