import { ConnectButton } from "web3uikit";
// import styles from "../styles/test.module.css";
import styles from "../styles/styles2.module.css"
import Image from 'next/image'

export default function Header() {

    return (
        <nav className={styles.nav1}>
            <ul className={styles.navList}>
                <li className={styles.navItem}><Image src="/../public/betopia_logo.png" width={100} height={100} /></li>
                <link href='https://fonts.googleapis.com/css?family=Baloo' rel='stylesheet'></link>
                <li className={styles.navItem}><div>RAFFLE</div><div style={{fontSize: "15px", marginTop: "-30px", fontFamily: "asap"}}>Coming soon!</div></li>
                <li className={styles.navItem}><div>PRIZES</div><div style={{fontSize: "15px", marginTop: "-30px", fontFamily: "asap"}}>Coming soon!</div></li>
                <li className={styles.navItem}><ConnectButton moralisAuth={false}/></li>
            </ul>
        </nav>
    )
}