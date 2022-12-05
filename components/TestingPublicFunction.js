import { useWeb3Contract } from "react-moralis";
import abi from "../constants/abi.json"

export default function ViewState() {


    const {runContractFunction: s_raffleState} = useWeb3Contract({
        abi: abi,
        contractAddress: "0x10418a0D858616B10eD51719298cBA31572413b9",
        functionName: "s_raffleState",
        params: {},
    })

    async function RetrieveValue() {
        const value = await s_raffleState();
        console.log(value)
    }

    return (
        <div>
            <button className="rounded ml-autom font-bold bg-blue-200" onClick={async () => (await RetrieveValue())}>View Raffle State</button>
        </div>
    )
}