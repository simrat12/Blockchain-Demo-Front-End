import { MoralisProvider } from 'react-moralis'
// import '../styles/globals.css'
// import "../styles/globals.css"


function MyApp({ Component, pageProps }) {
  return (
    <div style={{margin: "-20px", backgroundColor:"#1a1141"}}>
      <MoralisProvider initializeOnMount={false}>
      <Component {...pageProps} style={{display: "flex", justifyContent: "center", backgroundColor:"#1a1141"}}/>
      </MoralisProvider>
    </div>
  )
}

export default MyApp
