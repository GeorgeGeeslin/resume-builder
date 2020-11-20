import styled from 'styled-components';

// Layout Elements (position the Resume Preview on screen)
export const PreviewNav = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 8px;
    margin-bottom: 8px;
`;

export const PreviewBox = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    // width: 65%;
    // border-top: 1px solid #444;
    padding: 16px;
    overflow: scroll;
    height: 100vh;
`;

//TODO: May have to extract this to stylesheet for media queries
export const PreviewWrapper = styled.div`
    // box-sizing: border-box;
    background-color: #DFE1E6;
    font-size: 11px;
    min-width: 8.5in;
`;

export const ResumeContent = styled.div`
    height: ${props => props.theme.height};
    box-sizing: border-box;
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
        padding-top: 0.5in;
        opacity: 0;
    }
`;

// Resume elements (appear on Resume Preview itself)

// 1rem here, but needs to be 1.5rem in the html payload. Not sure whats up with that. <const workDescLineHeight>
export const WorkDesc = styled.div`
    li {
        line-height: 1rem !important;
    }
`;

// These are objects to be used as in-line styles so that they will be included in the html payload.
// Styled components will not be included in the payload.
export const sectionHeadLine = {
    color: "#0052CC",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "18px"
};

export const sectionSeparatorSmall = {
    paddingBottom: '1.5em'
};

export const sectionSeparator = {
    paddingTop: '1.5em',
    paddingBottom: '1.5em'
}