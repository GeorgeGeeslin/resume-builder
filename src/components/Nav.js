import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavButton, Logo, FlexGroup, ResumeNameWrapper } from './ui/elements';
import { FaPaintRoller, FaFileDownload, FaSave, FaPlus, FaSignInAlt, FaSpinner, FaClone } from 'react-icons/fa';
// import { IconContext } from "react-icons";
import { Auth } from 'aws-amplify';
import ResumeName from './resumeInput/ResumeName';

//TODO break Iconbar stuff out into its own component 
const Nav = ({saveBool, themeBool, downloadBool, newResumeBool, myResumesBool}) => {

  const [saving, setSaving] = useState(false);
  const [savingAsNew, setSavingAsNew] = useState(false);
  const [downloading, setDownloading] = useState(false);

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

  async function handleSave(resumeId, resumeContent) {
    resumeId === "new" ? setSavingAsNew(true) : setSaving(true);
    await saveOrUpdate(resumeId, resumeContent);
    resumeId === "new" ? setSavingAsNew(false) : setSaving(false);
  };

  async function handleDownload(resumeName) {
    setDownloading(true);
    await downloadResume(resumeName);
    setDownloading(false);
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
        <FlexGroup style={{alignItems: 'center'}}>
          { saveBool &&
          <>
            <NavButton style={{marginLeft: '0.5em'}} onClick={() => handleSave(resumeId, {resumeContent})}>
            {  saving ? 
              <FaSpinner className="rotate" style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
              :
              <FaSave style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/> 
            }
              Save
            </NavButton>
            <NavButton onClick={() => handleSave("new", {resumeContent})}>
            { savingAsNew ? 
              <FaSpinner className="rotate" style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
              :
              <FaClone style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
            }  
              Save as new
            </NavButton>
          </>
          }
          { newResumeBool &&
            <Link to="/">
              <NavButton onClick={newResume}>
                <FaPlus style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
                New Resume
              </NavButton>
            </Link>
        }
        { themeBool &&
          <NavButton onClick={(e) => configInfoChange({payload: !themeModal, name: 'themeModal'})}>
            <FaPaintRoller style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
            Themes
          </NavButton>
        }
        { downloadBool &&
          <NavButton onClick={() => handleDownload(resumeName)}>
            { downloading ?
              <FaSpinner className="rotate" style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
              :
              <FaFileDownload style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
            }
            Download
          </NavButton>
        }
        </FlexGroup>
      </div>
      <FlexGroup style={{alignItems: 'center'}}>
        { myResumesBool &&
        <Link to="/resumes">
          <NavButton>My Resumes</NavButton>
        </Link>
        }
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