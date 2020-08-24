import React from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

const Navbar = styled.nav`
    background-color: #0052CC;
    width: 100%;
    height: 50px;
`;

const Nav = () => {

    // const getHTML = () => {

    // }

    // const PDFDownloadRequest = () => {
    //     const payload = getHTML();
    //     console.log(html)
    // }

    const payload = JSON.stringify({data: "<body><div style='background-color:green;'>sent from mr. green</div></body>"});

    const postTest = () => {
        fetch('http://localhost:3000/pdf', {
            body: payload,
            method: 'POST'
        })
        .then (response => response.json())
        // .then(data => console.log(data));
        .then(data => downloadPDF(data.pdf))
    }

    const downloadPDF = (b64) => {
        // Force a download by creating a downloadlink and then clicking and removing it.
        const link = document.createElement('a');
        link.href = 'data:application/octet-stream;base64,' + b64;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)

    };

    return (
        <Navbar>
            <button onClick={postTest}>puppet test</button>
        </Navbar>
    )
}

export default Nav;