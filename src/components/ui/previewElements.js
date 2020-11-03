import styled from 'styled-components';

// Layout Elements
export const PreviewBox = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    //TODO: media query this and ResumeInput width for various screen sizes
    width: 65%;
    border-top: 1px solid #444;
    padding: 16px;
    overflow: scroll;
    height: 100vh;
`;

//TODO: May have to extract this to stylesheet for media queries
export const PreviewWrapper = styled.div`
    box-sizing: border-box;
    background-color: #DFE1E6;
    font-size: 12px;
    min-width: 9in;
`;


export const ResumePageWrapper = styled.div`
    // height: ${props => props.theme.height},
    // min-width: '9in';
`;

export const ResumeContent = styled.div`
    height: ${props => props.theme.height};
    padding: 0.5in;
    min-height: 850px;
    min-width: 8.5in;
    max-width: 8.5in;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

export const PageBreakOverlay = styled.div`
    position: relative; 
    height: 10px;
    background-color: #DFE1E6;
    border-top: 1px solid rgba(0,0,0,0.35);
    border-bottom: 1px solid rgba(0,0,0,0.3);
    box-shadow: inset 0px 2px 5px -3px rgba(0,0,0,1);
    &:before {
        display:block;
        position: relative;
        top: -0.5in;
        content: "";
        background-color: white;
        padding-top: 0.5in;
    //    z-index: -1;
    }
`;

export const WorkDesc = styled.div`
    li {
        // 1rem here, but needs to be 1.5rem in the html payload. Not sure whats up with that. <const workDescLineHeight>
        line-height: 1rem !important;
    }
`;