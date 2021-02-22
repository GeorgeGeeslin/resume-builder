import React, {useContext} from 'react';
import Context from '../context/Context';
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavButton, Logo, FlexGroup, IconButton, IconBar, ResumeNameWrapper } from './ui/elements';
import {FaPaintRoller, FaFileDownload, FaSave, FaPlus, FaSignInAlt} from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Auth } from 'aws-amplify';
// import ReactTooltip from "react-tooltip";
import ResumeName from './resumeInput/ResumeName';

//TODO break Iconbar stuff out into its own component 
const Nav = () => {

  const context = useContext(Context);
  // const {resumeName} = context.resumeContent;
  const {resumeId, themeModal, userHasAuthenticated} = context.configState;
  const {configInfoChange, downloadResume, saveOrUpdate, newResume, loadAppState} = context;
  const resumeContent = context.resumeContent;
  const {resumeName} = context.resumeContent;

  const history = useHistory();

  async function handleLogout() {
    await Auth.signOut();
    configInfoChange({payload: false, name: 'userHasAuthenticated'});
    loadAppState(null);
    history.push("/login");
  };

  return (
    <Navbar>
      <div style={{display: 'flex'}}>
        <div style={{width: '300px', paddingRight: '1em'}}>
          <Link to="/">
            <Logo>Lonestar Resumes</Logo>
          </Link>
        </div>
        <ResumeNameWrapper>
          <ResumeName/>
        </ResumeNameWrapper>
      </div>
      <FlexGroup style={{alignItems: 'center'}}>
        <IconBar> 
          <IconContext.Provider value={{color: 'white'}}>
            <IconButton data-tip={`Save Resume`} data-background-color='#36B37E' 
              onClick={() => saveOrUpdate(resumeId, {resumeContent})}
            >
              <FaSave /> 
            </IconButton>
            <IconButton data-tip={`Select Theme`} data-background-color='#36B37E'
              onClick={(e) => configInfoChange(
                {
                  payload: !themeModal,
                  name: 'themeModal'
                }
            )}>
              <FaPaintRoller />
            </IconButton>              
            <IconButton data-tip={`Download Resume`} data-background-color='#36B37E' onClick={() => downloadResume(resumeName)}>
              <FaFileDownload />
            </IconButton>          
          </IconContext.Provider>  
        </IconBar>
        <NavButton onClick={() => saveOrUpdate('new', {resumeContent})}>
          Save as new        
        </NavButton>
        <NavButton onClick={newResume}>
          <FaPlus style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
          New
        </NavButton>
        <Link to="/resumes">
          <NavButton>My Resumes</NavButton>
        </Link>
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