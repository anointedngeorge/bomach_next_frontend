import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { get_xrh_data } from 'functions';
import { Tabledata } from 'components/lib/Tabledata';
import { Modal } from 'components/lib/Modal';


const View_single = () => {
  const router = useRouter();
  const qy = router.query
  return (
    
    <div>
      {JSON.stringify(qy)}
    </div>
    
  )
}

export default View_single