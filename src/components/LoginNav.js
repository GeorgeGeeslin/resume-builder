import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, NavButton, Logo, FlexGroup } from './ui/elements';
import { FaSignInAlt } from 'react-icons/fa';

const LoginNav = () => {
  
  return (
    <Navbar>
      <Logo>Lonestar Resumes</Logo>
      <FlexGroup style={{alignItems: 'center'}}>
        <Link to="/signup">
          <NavButton>Signup</NavButton>
        </Link>
        <Link to="/login">
          <NavButton><FaSignInAlt style={{marginRight: '0.5em', position: 'relative', top:'2px'}}/>Login</NavButton>
        </Link>
      </FlexGroup>
    </Navbar>
  )
};

export default LoginNav;