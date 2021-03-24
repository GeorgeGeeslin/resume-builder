import React, {useState, useEffect, useContext} from 'react';
import PageBreak from './PageBreak';
import Context from '../../context/Context';

const ResumePage = (props) => {

    const context = useContext(Context);
    const {baseInfoChange} = context;
    const {resumeHeight} = context.resumeContent;
    const work = context.resumeContent.work;
    const education = context.resumeContent.education;
    const skills = context.resumeContent.skills;

    const [contentHeight, setContentHeight] = useState();
    const [contentOffset, setContentOffset] = useState();

    const setPageBreakOffsets = (node, pageHeight) => {
        if (node.hasChildNodes && node.nodeType === 1) {
            let children = node.childNodes;

            children.forEach(child => {
                if (child.nodeType === 1) {
                    if (child.offsetTop - contentOffset < pageHeight - 58) {
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

    const setResumeOverFlow = (node, overflowHeight) => {
        if (node.hasChildNodes && node.nodeType === 1) {
            let children = node.childNodes;

            children.forEach(child => {
                if (child.nodeType === 1) {
                    if (child.offsetTop - contentOffset < overflowHeight) {
                        // Element begins above the pagebreak, but it might not end there. Find child elements below the page break.
                        setResumeOverFlow(child, overflowHeight);
                    } else {
                        // Element is below the pagebreak so it and all it's children should move down. 
                        child.classList.add("resumeOverflow");
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

    const removeResumeOverflow = () => {
        const elems = document.getElementsByClassName("resumeOverflow");

        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.remove("resumeOverflow");
        }
    }

    const removePageBreakOffsets = () => {
        const elems = document.getElementsByClassName("pageBreakOffset");

        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.remove("pageBreakOffset")
        }
    }

    const leeway = 45;    // PageBreak :before margin.
    const pageHeight = 1000;
    const innerPageHeight = pageHeight - 48 - 48; // Height - padding of ResumeContent.

    // eslint-disable-next-line
    useEffect(() => {
        setContentHeight(document.getElementById('contentHolder').clientHeight);
        setContentOffset(document.getElementById('ResumeContent').offsetTop);
    })

    useEffect(() => {

        const pageCountLocal = Math.ceil((contentHeight - contentOffset + (leeway + 12)) / innerPageHeight);

        //Activate warning when resume enters 3 page territory.
        baseInfoChange({
            payload: pageCountLocal,
            name: "pageCount"
        });
        
        if (contentHeight > innerPageHeight) {
            removePageBreak();
            removeResumeOverflow();
            baseInfoChange({
                payload: ((pageHeight * 2) + 10) + "px",
                name: "resumeHeight"
            });

            const node = document.getElementById('ResumeContent');
            setPageBreakOffsets(node, pageHeight);
            setResumeOverFlow(node, 2000 /* 2 pages plus pagebreak pluss extra leeway*/); // hide all text past two pages.

        } else {
            removePageBreak();
            removeResumeOverflow();
            removePageBreakOffsets();
            baseInfoChange({
                payload: pageHeight + "px",
                name: "resumeHeight"
            })
        }   
    // eslint-disable-next-line      
    }, [contentHeight, work, education, skills]);

    return (
        <div>
            {props.children}
            <PageBreak resumeHeight={resumeHeight} contentHeight={contentHeight} pageHeight={innerPageHeight}/>
        </div>
    )
};

export default ResumePage;