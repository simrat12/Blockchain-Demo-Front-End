import abi from "../constants/abi.json"
import abi2 from "../constants/abi2.json"
const ethers = require('ethers')
import styles from "../styles/test.module.css"

export default function LotteryEntrance() {
    console.log(4)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();

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
        <div> 
            <link href='https://fonts.googleapis.com/css?family=Nova Flat' rel='stylesheet'/>
            <div style={{textAlign:"center",paddingTop: "30px", paddingBottom: "30px", marginTop: "20px", display: "flex", justifyContent: "center"}}><span style={{fontSize: '30px', color: "white", paddingRight: "20px", fontFamily: 'Nova Flat'}}>Enter Amount </span><input style={{paddingTop: "7px"}}type="number" name="a" id="a"></input>
            <div style={{paddingLeft: "20px"}}><button style={{borderRadius: "20px", height: "30px", paddingTop: "7px"}} className={styles.testing} onClick={async () => await enterRaffle({onSuccess: handleSuccess, onError: (error) => console.log(error),})}>Enter Lottery</button></div></div>
        </div>
    )
}