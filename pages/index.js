import { Login } from 'components/auth/Login'
import { AppHead } from 'components/lib/AppHead'
import { authentication, authentication_token } from 'functions'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



export default function Home() { 
  
  return (
    
    <div>
    <AppHead title='Login Page'  />
      <form onSubmit={authentication} className='form' method='POST' action={`${process.env.auth}/login/token`} >
        <Login />
      </form>
    </div>
    
  )
}


// export async function getServerSideProps({ req, res }) {
//   const user_token = req.cookies.user_token;
//   const user_status = req.cookies.user_status;
//   const url = `${process.env.auth}/login/get_user`
//   await authentication_token(url, user_token ).then(data => {
//       console.log(data);
//   })
//   // console.log(user_token);
  
//   return {
//     props: {
//       user_status: user_status,
//       user_token:user_token,
//     },
//   };
// }