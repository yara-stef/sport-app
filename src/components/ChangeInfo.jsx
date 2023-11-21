import React, { useState } from 'react';
import TextInsert from '../components/TextInsert';
import { useSelector } from 'react-redux';
import editIcon from '../img/edit-icon.png';

function ChangeInfo({placeholder}) {
  const [showInput, setShowInput] = useState(false);
  const athlete = useSelector(state => state.athletes.chosenAthlete);

  return (
    <span>
        <img src={editIcon}></img>
    </span>
  )
}

export default ChangeInfo