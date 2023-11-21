import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import Search from "../features/Search";
import AthletesList from "../features/AthletesList";
import CalendarComponent from "../features/Calendar";
import { useCookies } from 'react-cookie';
import { useAthletes } from "../hooks/useAthletes";

export const Athletes = function () {
    const navigate = useNavigate();
    const { user, signout } = useAuth();
    const [cookies, setCookie] = useCookies(['user']);
    
    const { athletes } = useAthletes();
   console.log(athletes);
    const [searchName, setSearchName] = useState('');
    const keys = ["name"];
    const search = ( data) => {
        // console.log(data);
        return data.filter((contact) => 
        keys.some((key) => contact[key].toLowerCase().includes(searchName)))
    }

   
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                const uid = user.uid;
               
            } else {
                console.log('user is logged out');
            }
        });
    }, [])

    const logout = () => {
        signout(auth).then(() => {
            navigate('/authentication');
            console.log('Signed out succesfully')
        }).catch((error) => {
            console.log('An error occured');
        })
    }

   

    return (
        <>
            <div className="h-30 grid md:grid-cols-4 gap-4">
                <div></div>
                <h1 className='col-span-2 text-3xl font-bold  h-30 text-center p-8 font-sans bg-zinc-800 shadow-2xl shadow-cyan-500/50 rounded hover:shadow-indigo-500/40'>
                Gym Training App   <span></span>
                <span className="material-symbols-outlined">
                fitness_center
                </span>
                </h1>
                <div className="justify-self-start md:justify-self-end md:mr-2 mt-3">
                    <div className="pl-2 md:mr-3">Logged in as {cookies.Email}</div> 
                   
                <div className="flex md:grid md:grid-cols-3  my-5 p-2 md:mr-2">
                    <div></div>
                    <div></div>
                     <button className="order-first md:order-last bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" onClick={logout}>Logout</button>
                </div>
                </div>
                
            </div>
            
            <div className="grid md:grid-cols-2 gap-2 m-3 pr-4">
                <div className="bg-cover bg-scroll  bg-[url('./img/background.jpg')] shadow-2xl shadow-cyan-500/50 rounded hover:shadow-indigo-500/40 h-full"> 
                <div className="pl-8 m-6">
                <Search setSearchName={setSearchName} />  
                </div>                              
                <AthletesList athletes={search(athletes)} />
                </div>            
                <CalendarComponent />
            </div>
            
        </>
    )
}