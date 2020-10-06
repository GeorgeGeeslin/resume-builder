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
    background-color: #DFE1E6;
    font-size: 12px;
    width: 8.5in;
`;

export const ResumePageWrapper = styled.div`
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); 
    height: ${props => props.theme.height}
`;

export const ResumeContent = styled.div`
    padding: 16px;
    // min-height: 893px; // 925 (overall height) - top and bottom padding
    min-height: 850px;

`;

export const PageBreakOverlay = styled.div`
    position: relative; 
    height: 10px;
    background-color: #DFE1E6;
    border-top: 1px solid rgba(0,0,0,0.35);
    border-bottom: 1px solid rgba(0,0,0,0.3);
    box-shadow: inset 0px 2px 5px -3px rgba(0,0,0,1),

`;