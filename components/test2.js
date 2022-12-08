import abi from "../constants/abi.json"
const ethers = require('ethers')
import { useState, useEffect } from "react"
import styles from "../styles/styles2.module.css"

export default function Test2() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    

    const [currentAccount, setCurrentAccount] = useState(""); 
    const [currentState, changeState] = useState(0);   
    const [domValue, setDomValue] = useState(0);
    const [remainingRewards2, setRemainingRewards] = useState(0);

    const checkIfAccountChanged = async () => {
        try {
            const {ethereum} = window;
            ethereum.on('accountsChanged', (accounts) => {changeState(0);setDomValue(0);setCurrentAccount(accounts[0]);seeRewards(accounts[0])});
            console.log("currentState value is", currentState);
            } catch (error) {
                console.log(error);
            }
    }

    const initialClaimState = async () => {
        let acc = await provider.listAccounts();
        await seeRewards(acc[0]);
    }

    initialClaimState();

    useEffect(() => {
        domValue
        console.log("resource changed")
    }, [domValue])

    // useEffect(() => {
    //     currentState
    //     console.log("resource changed")
    // }, [currentState])

    useEffect(() => {
        checkIfAccountChanged();
        initialClaimState();
    }, [])

    async function seeRewards(addy) {
        const contract = new ethers.Contract('0xB55Ae10ed3a1A588D7b58B14d560cAc2A072AC24', abi, signer);
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
                console.log(remainingRewards);

                setRemainingRewards(Math.floor(remainingRewards));

            })
        });
    }


    async function Winnings() {
        const contract = new ethers.Contract('0xB55Ae10ed3a1A588D7b58B14d560cAc2A072AC24', abi, signer);
        try {
            let b = document.getElementById("claim").value;
            let tx = await contract.withdraw2(b, {gasLimit: 10000000});
            let receipt = await tx.wait();
            setDomValue(b);
            changeState(1);
        } catch(error) {
            console.log(error);
            changeState(2);
        }
    }


    return (
        <div>
            <div className={styles.rectangle}> 
                <link href='https://fonts.googleapis.com/css?family=Baloo' rel='stylesheet'></link>
                <div className={styles.yoyo}>
                    <div className={styles.depositText}>Withdraw</div>
                    <div className={styles.enterAmount}>Enter Amount </div>
                </div>
                <div>
                    <div className={styles.viewTickets}>Claimable</div>
                    <input className={styles.inputAmount} type="number" name="claim" id="claim"></input>
                </div>
                <div>
                    <div className={styles.viewTicketInput}>{remainingRewards2}</div>
                    <button className={styles.testing} onClick={async () => await Winnings()}>Withdraw</button>
                </div>
            </div>
            <br></br>
            <div style={{color: "red", textAlign: "center"}}> {(currentState == 2) ? <div>Insufficient funds!</div> : (currentState == 1) ? <div>{domValue} Tokens have been withdrawn!</div> : <></>}</div>
        </div>
    )
}