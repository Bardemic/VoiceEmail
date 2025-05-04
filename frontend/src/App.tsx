import './App.css';
import {useEffect, useState} from "react";
import {supabase} from "./supabase.ts";

interface User {
    email: string,
    displayName: string,
    id: string,
    profilePhotoUrl: string
}


function App() {
    const [user, setUser] = useState<User | null>(null);



    useEffect(() => {
        async function checkAuth() {
            const {data: {user}} = await supabase.auth.getUser();
            if (!user) return;
            console.log(user)
            const parsedUser: User = {
                email: user.user_metadata.email,
                displayName: user.user_metadata.name,
                id: user.id,
                profilePhotoUrl: user.user_metadata.picture
            }
            setUser(parsedUser);
        }
        checkAuth();
    }, []);

    async function signUp (){
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
        console.log(data, error);
    }



  return (
      <div className='flex justify-center items-center gap-2 flex-col'>
        <div onClick={signUp} className='text-white bg-black px-4 py-2 rounded-lg hover:bg-gray-950/80 cursor-pointer'>
            Sign in with google
        </div>
          {user &&
            <div className='bg-black text-white p-4 rounded-lg flex gap-4'>
                <div className='h-16 w-16'>
                    <img className='h-full w-full' src={user.profilePhotoUrl} alt=""/>
                </div>
                <div className='flex flex-col items-start justify-center'>
                    <div>Name: {user.displayName}</div>
                    <div>Email: {user.email}</div>
                </div>
            </div>
          }
      </div>
  )
}

export default App
