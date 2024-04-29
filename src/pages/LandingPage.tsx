import { useAuth } from '@ic-reactor/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {

  const auth = useAuth();

  return (
    <div className=' w-[100vw] h-[100vh]'>
      Landing Page
      <button className='text-3xl' onClick={()=>{auth.login()}}>Login pantek</button>
    </div>
  );
}
