import React from 'react';
import styled from 'styled-components';

// Layout Elements
export const PreviewBox = styled.div`
    display: flex;
    justify-content: center;
    width: 60%;
    border-top: 1px solid #444;
    padding: 1em;
    overflow-y: auto;
    height: 100vh;
`;

export const ResumePage = (props) => {
    return (
        <div id ="ResumePage" style={{fontSize: '12px'}} className="resumePage">
            {props.children}
        </div>
    )
};