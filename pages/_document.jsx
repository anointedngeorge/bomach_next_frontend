import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'



export default function Document() {

  return (
    <Html>
      <Head />
      <body >
        <div id='loader1'></div>
        <Main />
        <NextScript />
        <Script strategy="beforeInteractive" type="text/javascript" src={"./bomach/js/scripts.js"} />
      </body>
    </Html>
  )
}