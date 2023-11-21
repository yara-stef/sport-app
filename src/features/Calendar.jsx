import React, { useState, Component } from 'react';
import Calendar from 'react-calendar';
import Time from '../components/Time';



function CalendarComponent () {
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false); 

  return (
    <div className='min-w-fit h-screen shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'>
      <h1 className="text-center text-3xl py-10">Calendar</h1>
      <div>
    <Calendar onChange={setDate} value={date} onClickDay={() => setShowTime(true)}/>
   </div>

   {date.length > 0 ? (
   <p>
     <span>Start:</span>
     {date[0].toDateString()}
     &nbsp;
     &nbsp;
     <span>End:</span>{date[1].toDateString()}
   </p>
          ) : (
   <p>
      <span>Default selected date:</span>{date.toDateString()}
   </p> 
          )
   }
   <Time showTime={showTime} date={date}/>
    </div>
  )
}





export default CalendarComponent;