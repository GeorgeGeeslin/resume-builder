import React from 'react';

const Header = ({name, role, desired_position}) => {


  const header = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#091E42',
    // color: 'white',
    // marginTop: '-0.5in',
    // marginLeft: '-0.5in',
    // marginRight: '-0.5in',
    height: '150px',
    marginBottom: '1rem'
  }

  const nameStyles = {
    fontSize: '48px',
    textAlign: 'center',
    border: '3px solid #DAA520',
    padding: '1rem'
  };

  const lNameStyle = {
    fontWeight: 'bold',
    color: '#DAA520'
  }

  const roleStyles = {
    fontSize: '18px',
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: 'bold'
  }

  let nameParts = name.split(' ');

  const nameLast = nameParts.splice(1, (nameParts.length));
  const nameFirst = nameParts.join(' ')



  return (
    <div style={header}>
      <div style={{minWidth: '70%'}}>
        <div style={nameStyles}>
          <span>{nameFirst} </span><span style={lNameStyle}>{nameLast}</span>
          
        </div>
        { (desired_position && role) &&
        <div style={roleStyles}>
          {role}
        </div>
        }

      </div>
    </div>
  )
};

export default Header;