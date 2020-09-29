import React,  {useState, useEffect} from 'react';
import PageBreak from './PageBreak';
import {ResumePageWrapper} from '../ui/previewElements';

const ResumePage = (props) => {

    const setPageBreakOffsets = (node, pageHeight) => {
        if (node.hasChildNodes && node.nodeType === 1) {
            let children = node.childNodes;

            children.forEach(child => {
                if (child.nodeType === 1) {
                    if (child.offsetTop - 63 < pageHeight - 14) {
                        // Element begins above the pagebreak, but it might not end there. Find child elements below the page break.
                        setPageBreakOffsets(child, pageHeight);
                    } else {
                        // Element is below the pagebreak so it and all it's children should move down. 
                        child.classList.add("pageBreakOffset");
                    }
                }
            });
        }
    };

    const removePageBreak = () => {
        const elems = document.getElementsByClassName("pageBreakOffset");

        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.remove("pageBreakOffset");
        }
    };

    const [resumeHeight, setResumeHeight] = useState();
    const [contentHeight, setContentHeight] = useState();

    const leeway = 16 + 12;    // Resume Content padding + PageBreak height
    const pageHeight = 925;

    useEffect(() => {
        setContentHeight(document.getElementById('ResumeContent').clientHeight);
        
        if (contentHeight > pageHeight) {
        
            removePageBreak();
            setResumeHeight(((893 * 2) + leeway) + "px");

            const node = document.getElementById('ResumeContent');
            setPageBreakOffsets(node, pageHeight);

        } else {
            console.log("hello")
            removePageBreak();
            setResumeHeight('893px');
        }     
    });

    return (
        <ResumePageWrapper theme={{ height: resumeHeight}}>
            {props.children}
            <PageBreak contentHeight={contentHeight} pageHeight={pageHeight} leeway={leeway}/>
        </ResumePageWrapper>
    )
};

export default ResumePage;