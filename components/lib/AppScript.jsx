import Script from 'next/script'
import React from 'react'

export const AppScript = ({path = './'}) => {
  return (
    <div>
        <Script  src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" 
        crossOrigin="anonymous"></Script>
        <Script  src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
        crossOrigin="anonymous"></Script>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" 
        crossOrigin="anonymous"></Script>
        {/* <Script strategy="afterInteractive" type="text/javascript" src={path+"bomach/js/scripts.js"} /> */}
        {/* <Script  strategy="afterInteractive" type="text/javascript" src={path+"bomach/assets/demo/chart-area-demo.js"} /> */}
        {/* <Script strategy="afterInteractive" type="text/javascript"  src={path+"bomach/assets/demo/chart-bar-demo.js"} /> */}
        <Script type="text/javascript" src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" 
        crossOrigin="anonymous" />
        {/* <Script strategy="afterInteractive" type="text/javascript" src={path+"bomach/js/datatables-simple-demo.js"} /> */}
        <Script strategy="afterInteractive" src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></Script>
        <Script strategy="afterInteractive" src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></Script>
        <Script strategy="afterInteractive" src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></Script>
    </div>
  )
}
