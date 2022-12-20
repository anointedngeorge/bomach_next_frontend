import { Layout1 } from 'components/layout/Layout1'
import { AppScript } from 'components/lib/AppScript'
import Head from 'next/head'
import Script from 'next/script'
import 'styles/globals.css'


function MyApp({ Component, pageProps }) {
  return(
    <div>
      <Component {...pageProps} />
      {/* <AppScript path='' /> */}
    </div>
      
  )

}

export default MyApp
