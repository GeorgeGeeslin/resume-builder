import React, { useState, useEffect } from 'react';

const Header = ({name, role, desired_position}) => {

  const [nameFirst, setNameFirst] = useState();
  const [nameLast, setNameLast] = useState();

  useEffect(() => {
    buildNames();
  }, [name])

  const buildNames = () => {
    let nameParts = name.split(' ');

    let nameLast;
    let nameFirst;

    if (nameParts.length < 2) {
      nameFirst = name;
    } else {
      nameLast = nameParts.splice(nameParts.length - 1, nameParts.length);
      nameFirst = nameParts.join(' ');
    }

    setNameFirst(nameFirst);
    setNameLast(nameLast);
  };

  const header = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '150px',
    marginBottom: '1rem'
  };

  const nameStyles = {
    fontSize: '48px',
    textAlign: 'center',
    border: '3px solid #DAA520',
    padding: '1rem'
  };

  const lNameStyle = {
    fontWeight: 'bold',
    color: '#DAA520',
  };

  const roleStyles = {
    fontSize: '18px',
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: 'bold'
  };

  return (
    <div style={header}>
      <div style={{minWidth: '70%'}}>
        { name && 
        <div style={nameStyles}>
          <span>{nameFirst} </span><span style={lNameStyle}>{nameLast}</span>  
        </div>        
        }
        { (desired_position && role) &&
        <div style={roleStyles}>
          {role}
        </div>
        }
      </div>
    </div>
  );
};

export default Header;