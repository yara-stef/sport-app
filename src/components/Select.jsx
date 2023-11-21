import React, { useState, useEffect, useRef } from 'react'

function Select({ placeHolder, options, isSearchable, onChange }) {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const searchRef = useRef();

    useEffect(() => {
        setSearchValue('');
        if(showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    useEffect(() => {
        const handler = () => setShowMenu(false);
        window.addEventListener('click', handler);
        return () => {
            window.removeEventListener('click', handler);
        };
    });

    const handleInputClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if(selectedValue) {
            return selectedValue.name;
        }
        return placeHolder;
    };

    const onItemClick = (option) => {
        setSelectedValue(option);
        onChange(option)
    };

    const isSelected = (option) => {
        if(!selectedValue) {
            return false;
        }

        return selectedValue.value === option.id;
    };

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const getOptions = () => {
        if(!searchValue) {
            return options;
        }
        return options.filter((option) => option.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
    };

    const onTagRemove = (option) => {
        const newValue = removeOption(option);
        setSelectedValue(newValue);
        onChange(newValue);
    }

  return (
    <>
        <div onClick={handleInputClick}>
            <div>{getDisplay()}</div>
            {showMenu && (
                <div>
                    {isSearchable && (
                        <div>
                            <input className='text-black' onChange={onSearch} value={searchValue} ref={searchRef}/>
                        </div>
                    )}
                {getOptions().map((option) => (
                    <div onClick={() => onItemClick(option)} key={option.id}>{option.name}</div>
                ))}
            </div> 
            )}
                      
        </div>
    </>
  );
};

export default Select