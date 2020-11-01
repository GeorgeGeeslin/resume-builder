import React, {useContext} from 'react';
import Context from '../context/Context';
import styled from 'styled-components';

const Navbar = styled.nav`
    background-color: #0052CC;
    width: 100%;
    height: 50px;
`;

const Nav = () => {

    const context = useContext(Context);
    const {requestPDF} = context;

    return (
        <Navbar>
            <span id="logo">Resume Writer</span>
           <button onClick={requestPDF}>puppet test</button> 
        </Navbar>
    )
}

export default Nav;