import React from 'react'
import { useRouter } from 'next/router';


export default function sell_plot() {

    const router = useRouter();
    const qy = router.query
    

  return (
    <div>
        {JSON.stringify(qy)}
    </div>
  )
}
