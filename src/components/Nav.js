import React, {useContext} from 'react';
import Context from '../context/Context';
import { Navbar, NavButton, Logo, FlexGroup, IconButton, IconBar } from './ui/elements';
import {FaPaintRoller, FaFileDownload, FaCloudUploadAlt, FaSave, FaFilePdf, FaExpandArrowsAlt, FaSignInAlt} from 'react-icons/fa';
import { IconContext } from "react-icons";
// import ReactTooltip from "react-tooltip";

const Nav = () => {

    //TODO break Iconbar stuff out into its own component 

    const context = useContext(Context);
    const {themeModal} = context.resumeContent;
    const {baseInfoChange, requestPDF} = context;

    return (
        <Navbar>
            <Logo>Resume Writer</Logo>
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
                            onClick={requestPDF}>
                            <FaFileDownload />
                        </IconButton> {/* download resume */}
                        <IconButton data-tip={`Preview Resume`} data-background-color='#36B37E'>
                            <FaExpandArrowsAlt />
                        </IconButton> {/* pdf modal view */}
                    </IconContext.Provider>  
                </IconBar>
                <NavButton>My Resumes</NavButton>
                <NavButton><FaSignInAlt style={{marginRight: '0.5em', position: 'relative', top:'2px'}}/>Login</NavButton>
            </FlexGroup>

        </Navbar>
    )
}

export default Nav;