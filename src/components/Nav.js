import React, {useContext} from 'react';
import Context from '../context/Context';
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavButton, Logo, FlexGroup, IconButton, IconBar } from './ui/elements';
import {FaPaintRoller, FaFileDownload, FaSave, FaExpandArrowsAlt, FaSignInAlt} from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Auth } from 'aws-amplify';
// import ReactTooltip from "react-tooltip";

//TODO break Iconbar stuff out into its own component 
const Nav = () => {

  //TODO break Iconbar stuff out into its own component 

  const context = useContext(Context);
  const {themeModal, userHasAuthenticated, resumeName, resumeId} = context.resumeContent;
  const {baseInfoChange, downloadResume, saveOrUpdate} = context;
  const appState = context.resumeContent;

  const history = useHistory();

  async function handleLogout() {
    await Auth.signOut();
    baseInfoChange({payload: false, name: 'userHasAuthenticated'});
    history.push("/login");
  };

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
            </IconButton>
            <IconButton data-tip={`Save Resume`} data-background-color='#36B37E' 
              onClick={(e) => saveOrUpdate(resumeId, {appState,resumeName})}
            >
              <FaSave /> 
            </IconButton>
            <IconButton data-tip={`Download Resume`} data-background-color='#36B37E' onClick={downloadResume}>
              <FaFileDownload />
            </IconButton>
            <IconButton data-tip={`Preview Resume`} data-background-color='#36B37E'>
              <FaExpandArrowsAlt />
            </IconButton> {/* pdf modal view */}
          </IconContext.Provider>  
        </IconBar>
        <NavButton>My Resumes</NavButton>
        { userHasAuthenticated ? (
          <NavButton onClick={handleLogout}>Logout</NavButton>
        ) : (
          <Link to="/login">
            <NavButton><FaSignInAlt style={{marginRight: '0.5em', position: 'relative', top:'2px'}}/>Login</NavButton>
          </Link>
        )}        
      </FlexGroup>

    </Navbar>
  )
};

export default Nav;