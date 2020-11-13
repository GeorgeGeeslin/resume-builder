import React, {useContext} from 'react';
import Context from '../context/Context';
import { Navbar, NavButton, Logo, FlexGroup, IconButton, IconBar } from './ui/elements';
import {FaPaintRoller, FaFileDownload, FaCloudUploadAlt, FaSave, FaFilePdf, FaExpandArrowsAlt, FaSignInAlt} from 'react-icons/fa';
import { IconContext } from "react-icons";

const Nav = () => {

    const context = useContext(Context);
    const {requestPDF} = context;

    return (
        <Navbar>
            <Logo>Resume Writer</Logo>
            <FlexGroup style={{alignItems: 'center'}}>
                <IconBar> 
                    <IconContext.Provider value={{color: 'white'}}>
                        <IconButton><FaPaintRoller /></IconButton> {/* themes */}
                        <IconButton><FaCloudUploadAlt /> </IconButton>{/* save/upload */}
                        <IconButton onClick={requestPDF}><FaFileDownload /></IconButton> {/* download resume */}
                        <IconButton><FaExpandArrowsAlt /></IconButton> {/* pdf modal view */}
                    </IconContext.Provider>  
                </IconBar>
                <NavButton>My Resumes</NavButton>
                <NavButton><FaSignInAlt style={{marginRight: '0.5em', position: 'relative', top:'2px'}}/>Login</NavButton>
            </FlexGroup>

        </Navbar>
    )
}

export default Nav;