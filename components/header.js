import { ConnectButton } from "web3uikit";
// import styles from "../styles/test.module.css";
import styles from "../styles/styles2.module.css"

export default function Header() {

    return (
        <nav className={styles.nav1}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>x<span className={styles.singleLetter}>C</span>ite.</li>
                <link href='https://fonts.googleapis.com/css?family=Baloo' rel='stylesheet'></link>
                <li className={styles.navItem}><div>RAFFLE</div><div style={{fontSize: "15px", marginTop: "-30px", fontFamily: "asap"}}>Coming soon!</div></li>
                <li className={styles.navItem}><div>PRIZES</div><div style={{fontSize: "15px", marginTop: "-30px", fontFamily: "asap"}}>Coming soon!</div></li>
                <li className={styles.navItem}><ConnectButton moralisAuth={false}/></li>
            </ul>
        </nav>
    )
}