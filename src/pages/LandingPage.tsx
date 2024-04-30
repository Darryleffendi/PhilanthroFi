import { useAuth } from '@lib/hooks/useAuth';
import { useService } from '@lib/hooks/useService';
import { UserBase } from '@lib/types/user-types';
import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/context/auth-context';
import Layout from './layout/Layout';


export default function LandingPage() {

  const {user,login, authState, register, logout} = useAuth();
  const { getBackendService } = useService();

  const test = async () =>{
      const backend = await getBackendService();
      console.log(await backend.test())
  }

  console.log(user)
  console.log(authState)
  const testUser:UserBase = {
    first_name:"Christopher",
    last_name:"Halim",
    birth_date:"23-09-2009",
    email:"christopherhalim@gmail.com"
  }

  return (
      <div className=' w-[100vw] h-[100vh] bg-red-700'>
          Landing Page
          <button className='text-5xl' onClick={()=>{login()}}>Login pantek</button>
          <button className='text-3xl' onClick={()=>{logout()}}>logout pantek</button>
          <button onClick={()=>{register(testUser)}}>Register</button>
          <button onClick={()=>{test()}}>test</button>
        </div>
  );
}
