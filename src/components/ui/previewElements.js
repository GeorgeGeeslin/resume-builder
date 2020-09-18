import styled from 'styled-components';

// Layout Elements
export const PreviewBox = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 60%;
    border-top: 1px solid #444;
    padding: 16px;
    overflow-y: auto;
    height: 100vh;
`;

//TODO: May have to extract this to stylesheet for media queries
export const PreviewWrapper = styled.div`
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); 
    background-color: #ccc;
    font-size: 12px;
    width: 8.5in;
    min-height: 11in;
`;



