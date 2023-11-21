import React from 'react'

function Search({setSearchName}) {

  const handleChange = (e) => {
    e.preventDefault();
    const queryName = e.target.value.toLowerCase();
    if (queryName.length > 2) {
      setSearchName(queryName);
    }
    if (!queryName.length) {
      setSearchName('');
    }
  }

  return (
    <div className='m-0 '>
        <input className='bg-neutral-600 w-64 h-9 rounded border-solid border-2 shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40' placeholder='Search' onChange={handleChange}></input>
    </div>
  )
}

export default Search;