import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextInsert from '../components/TextInsert';
import ChangeInfo from '../components/ChangeInfo';
import { useMealPlans } from '../hooks/useMealPlans';
import { useAthletes } from '../hooks/useAthletes';
import SelectChange from '../components/SelectChange';

function AthleteInfo({ athlete, athleteDetails }) {
  const { id } = useParams();
  const [isShown, setIsShown] = useState(true);
  const { mealPlans } = useMealPlans(); 
  const [showInput, setShowInput] = useState(false);
  const { addAthlete, updateAthlete } = useAthletes();
  const [text, setText] = useState('');
  // console.log( athlete.goals);
  // console.log(mealPlans);
  
 if(!athlete) {
  return null;
 }


 const handleChange = (e) => {
    setText(e.target.value);
    console.log(text);
  };

  
  const handleClick = () => {
    setShowInput(true);
    setIsShown(false);
  }


  return (
    <>    
        <div className='bg-zinc-800 col-span-2 pb-5 mb-8 shadow-2xl shadow-cyan-500/50 rounded hover:shadow-indigo-500/40'>
            <h2 className='text-center pt-5 pb-5 text-xl'>Athlete information:</h2>
            <table className='border-collapse border border-slate-400 ml-5 mr-5 w-11/12'>
              <tbody>
                <tr>
                  <td className='border border-slate-300 pl-5'>Fullname:</td>
                  <td className='border border-slate-300 pl-5 flex justify-between' >
                    {isShown && (
                      <span>{athlete.name} </span>
                    )}
                    
                    <div className='pr-2 cursor-pointer' onClick={() => {handleClick()}}>
                      <ChangeInfo />
                      <TextInsert isVisible={showInput} placeholder={athlete.name} 
                      type='text'                  
                      handleSubmit={(values) => {
                        console.log(values.name);
                        athleteDetails.name = values.name;
                        updateAthlete(athlete.id, athleteDetails);
                        setShowInput(false);
                        setIsShown(true);
                      }}
                      />
                    </div>                        
                  </td>                    
                </tr>
                <tr>
                  <td className='border border-slate-300 pl-5'>Age:</td>
                  <td className='border border-slate-300 pl-5 flex justify-between' >
                    {isShown && (
                      <span>{athlete.age} </span> 
                    )}
                      <div className='pr-2 cursor-pointer' onClick={() => {handleClick()}}>
                      <ChangeInfo />
                      <TextInsert isVisible={showInput} placeholder={athlete.age}  
                      type='text'                  
                      handleSubmit={(values) => {
                        console.log(values);
                        athleteDetails.age = values.name;
                        updateAthlete(athlete.id, athleteDetails);
                        setShowInput(false);
                        setIsShown(true);
                      }}
                      />
                    </div>                                   
                  </td>
                </tr>
                <tr>
                  <td className='border border-slate-300 pl-5'>Gender:</td>
                  <td className='border border-slate-300 pl-5 flex justify-between' >
                    {isShown && (
                       <span>{athlete.gender}</span>    
                    )}
                    <div className='pr-2 cursor-pointer' onClick={() => {handleClick()}}>
                      <ChangeInfo />
                      <SelectChange isVisible={showInput} 
                      handleSubmit={(values) => {
                        console.log(values);
                        athleteDetails.gender = values.gender;
                        updateAthlete(athlete.id, athleteDetails);
                        setShowInput(false);
                        setIsShown(true);
                      }} />
                    </div>                                    
                  </td>
                </tr>
                <tr>
                  <td className='border border-slate-300 pl-5'>Training experience:</td>
                  <td className='border border-slate-300 pl-5 flex justify-between'  >
                  {isShown && (
                      <span>{athlete.experience} </span>
                    )}                    
                    <div className='pr-2 cursor-pointer' onClick={() => {handleClick()}}>
                      <ChangeInfo />
                      <TextInsert isVisible={showInput} placeholder={athlete.experience} 
                      type='text'                  
                      handleSubmit={(values) => {
                        console.log(values.name);
                        athleteDetails.experience = values.name;
                        updateAthlete(athlete.id, athleteDetails);
                        setShowInput(false);
                        setIsShown(true);
                      }}
                      />
                    </div>  
                  </td>
                </tr>
                <tr>
                  <td className='border border-slate-300 pl-5'>Birthdate:</td>
                  <td className='border border-slate-300 pl-5 flex justify-between' >
                     <span>{athlete.birthdate}</span>                    
                      <button className='pr-2' onClick={() => console.log('clicked')}><ChangeInfo /></button>
                  </td>
                </tr>
                <tr>
                  <td className='border border-slate-300 pl-5'>Health condition:</td>
                  <td className='border border-slate-300 pl-5 flex justify-between' >
                  {isShown && (
                      <span>{athlete.healthCondition} </span>
                    )}
                    <div className='pr-2 cursor-pointer' onClick={() => {handleClick()}}>
                      <ChangeInfo />
                      <TextInsert isVisible={showInput} placeholder={athlete.healthCondition} 
                      type='text'                  
                      handleSubmit={(values) => {
                        console.log(values.name);
                        athleteDetails.healthCondition = values.name;
                        updateAthlete(athlete.id, athleteDetails);
                        setShowInput(false);
                        setIsShown(true);
                      }}
                      />
                    </div> 
                   </td>
                </tr>
                <tr>
                  <td className='border border-slate-300 pl-5'>Goals:</td>
                  <td className='border border-slate-300 pl-5 flex justify-between' >
                  {isShown && (
                      <div>{athlete.goals?.map((goal, i) => {
                        return <p key={i}> - {goal}</p>
                      })} </div>
                    )}
                    
                    <div className='pr-2 cursor-pointer' onClick={() => {handleClick()}}>
                      <ChangeInfo />
                      <TextInsert isVisible={showInput} placeholder={athlete.goals} 
                      type='text'                  
                      handleSubmit={(values) => {
                        console.log(values.name);
                        athleteDetails.goals = [...athlete.goals];
                        athleteDetails.goals.push(values.name);
                        updateAthlete(athlete.id, athleteDetails);
                        setShowInput(false);
                        setIsShown(true);
                      }}
                      />
                    </div>  
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 className='text-center pt-5 pb-5 text-xl'>Progress: </h2>  
            <div className='ml-5'><TextInsert isVisible={!showInput}
              type='text'
              handleSubmit={(values) => {
                athleteDetails.progress = [...athlete.progress];
                athleteDetails.progress.push(values.name);
                // console.log(athleteDetails);
                updateAthlete(athlete.id, athleteDetails);
              }}
            /></div>
            
            <ul className='ml-5'>
              {athlete.progress?.map((item, i) => {
                return <li key={i}> - {item}</li>
              })}
            </ul>            
        </div>        
    </>
  )
}

export default AthleteInfo