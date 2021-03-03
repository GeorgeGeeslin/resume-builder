import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { Link, useHistory } from "react-router-dom";
import { Navbar, NavButton, Logo, FlexGroup, ResumeNameWrapperNav, MenuIcon, ResponsiveDesktop, DropdownMenu, DropdownButton } from './ui/elements';
import { FaPaintRoller, FaFileDownload, FaSave, FaPlus, FaSignInAlt, FaSpinner, FaClone, FaBars } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { Auth } from 'aws-amplify';
import ResumeName from './resumeInput/ResumeName';

//TODO break Iconbar stuff out into its own component 
const Nav = ({saveBool, themeBool, downloadBool, newResumeBool, myResumesBool, resumeNameBool}) => {

  const [saving, setSaving] = useState(false);
  const [savingAsNew, setSavingAsNew] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownMenu(!dropdownMenu);
  }

  return (
    <Navbar>
      <div style={{display: 'flex'}}>
        <div style={{width: '300px', minWidth: '282px', paddingRight: '1em'}}>
          <Link to="/">
            <Logo>Lonestar Resumes</Logo>
          </Link>
        </div>
        { resumeNameBool && 
        <ResumeNameWrapperNav>
          <ResumeName/>
        </ResumeNameWrapperNav>        
        }
        <FlexGroup style={{alignItems: 'center'}}>
          <ResponsiveDesktop>
            <div style={{display: 'flex'}}>
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
              { myResumesBool &&
              <Link to="/resumes">
                <NavButton>My Resumes</NavButton>
              </Link>
              }
            </div>
          </ResponsiveDesktop>
        </FlexGroup>
      </div>
      <FlexGroup style={{alignItems: 'center'}}>
        <ResponsiveDesktop>
          { userHasAuthenticated ? (
            <NavButton onClick={handleLogout}>Logout</NavButton>
          ) : (
            <Link to="/login">
              <NavButton><FaSignInAlt style={{marginRight: '0.5em', position: 'relative', top:'2px'}}/>Login</NavButton>
            </Link>
          )}
        </ResponsiveDesktop>
        <div>
          <MenuIcon style={{cursor: "pointer", float: 'right'}} onClick={() => toggleDropdown()}>
            <IconContext.Provider value={{size: '2em', color: '#172B4D'}}>
              <FaBars />
            </IconContext.Provider>
          </MenuIcon> 
          { dropdownMenu &&
          <DropdownMenu>
            { saveBool &&
              <DropdownButton onClick={() => handleSave(resumeId, {resumeContent})}>
              {  saving ? 
              <FaSpinner className="rotate" style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
              :
              <FaSave style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/> 
              }
              Save
              </DropdownButton>  
            }
            { newResumeBool &&
              <DropdownButton onClick={() => handleSave("new", {resumeContent})}> 
              { savingAsNew ? 
              <FaSpinner className="rotate" style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
              :
              <FaClone style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
              }  
              Save as new    
              </DropdownButton>
            }
            { newResumeBool &&
              <Link to="/">
                <DropdownButton onClick={newResume}>
                  <FaPlus style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
                  New Resume
                </DropdownButton>
              </Link>
            }
            { themeBool &&
              <DropdownButton onClick={(e) => configInfoChange({payload: !themeModal, name: 'themeModal'})}>
                <FaPaintRoller style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
                Themes
              </DropdownButton>
            }
            { downloadBool &&
              <DropdownButton onClick={() => handleDownload(resumeName)}>
              { downloading ?
              <FaSpinner className="rotate" style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
              :
              <FaFileDownload style={{marginRight: '0.5em', position: 'relative', top: '2px'}}/>
              }
              Download              
              </DropdownButton>
            }
            { myResumesBool &&
              <Link to="/resumes">
                <DropdownButton>
                  My Resumes
                </DropdownButton>
              </Link>
            }
            { userHasAuthenticated ? (
              <DropdownButton onClick={handleLogout}>
                Logout
              </DropdownButton>
            ) : (
              <Link to="/login">
                <DropdownButton>
                  Login
                </DropdownButton>
              </Link>
            )}
          </DropdownMenu>
          }
        </div>
     
      </FlexGroup>

    </Navbar>
  )
};

export default Nav;