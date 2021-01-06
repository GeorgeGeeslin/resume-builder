import React, {useContext} from 'react';
import Context from '../context/Context';
import { Link } from "react-router-dom";
import { Navbar, NavButton, Logo, FlexGroup, IconButton, IconBar } from './ui/elements';
import {FaPaintRoller, FaFileDownload, FaSave, FaExpandArrowsAlt, FaSignInAlt} from 'react-icons/fa';
import { IconContext } from "react-icons";
// import ReactTooltip from "react-tooltip";

const Nav = () => {

  //TODO break Iconbar stuff out into its own component 

  const context = useContext(Context);
  const {themeModal} = context.resumeContent;
  const {baseInfoChange, requestPDF, lambdatest} = context;

  return (
    <Navbar>
      <Logo>Lonestar Resumes</Logo>
      <FlexGroup style={{alignItems: 'center'}}>
        <IconBar> 
          <IconContext.Provider value={{color: 'white'}}>
            <IconButton data-tip={`Select Theme`} data-background-color='#36B37E'
              onClick={(e) => baseInfoChange(
                {
                  payload: !themeModal,
                  name: 'themeModal'
                }
            )}>
              <FaPaintRoller />
            </IconButton> {/* themes */}
            <IconButton data-tip={`Save Resume`} data-background-color='#36B37E'>
              <FaSave /> 
            </IconButton>{/* save/upload */}
            <IconButton data-tip={`Download Resume`} data-background-color='#36B37E'
              onClick={lambdatest}>
              <FaFileDownload />
            </IconButton> {/* download resume */}
            <IconButton data-tip={`Preview Resume`} data-background-color='#36B37E'>
              <FaExpandArrowsAlt />
            </IconButton> {/* pdf modal view */}
          </IconContext.Provider>  
        </IconBar>
        <NavButton>My Resumes</NavButton>
        <Link to="/login">
          <NavButton><FaSignInAlt style={{marginRight: '0.5em', position: 'relative', top:'2px'}}/>Login</NavButton>
        </Link>
      </FlexGroup>

    </Navbar>
  )
};

export default Nav;