import React, {useEffect} from 'react';

const resumePageStyles = {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    width: '8.5in',
    minHeight: '11in',
    // maxHeight: '11in',
    padding: '0.5in'
 };

const ResumePage = (props) => {

    // 11in = 1056px

    // useEffect(() => {
    //     console.log("USEEEFECT!!")
    //     const height = document.getElementById('ResumePage').clientHeight;
    //     console.log(height)
    //     if (height > 1056) {
    //         const node = document.getElementById('ResumePage')
    //         let pageBreak = document.createElement('div');
    //         pageBreak.setAttribute("style", "page-break-before:always;background-color:blue;height:5px;")
    //         node.appendChild(pageBreak);
    //     }

    // })

    return (
        <div id ="ResumePage" style={resumePageStyles} className="resumePage">
            {props.children}
        </div>
    )
};

export default ResumePage;