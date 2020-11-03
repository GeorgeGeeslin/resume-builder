import React, {useState, useEffect, useContext} from 'react';
import PageBreak from './PageBreak';
import Context from '../../context/Context';
import {ResumePageWrapper} from '../ui/previewElements';

const ResumePage = (props) => {

    const context = useContext(Context);
    const {baseInfoChange} = context;
    const {work} = context.resumeContent

    const [contentHeight, setContentHeight] = useState();
    const [contentOffset, setContentOffset] = useState();

    const setPageBreakOffsets = (node, pageHeight) => {
        if (node.hasChildNodes && node.nodeType === 1) {
            let children = node.childNodes;

            children.forEach(child => {
                if (child.nodeType === 1) {
                    let offsetTop = child.offsetTop;
                    if (child.offsetTop - contentOffset < pageHeight - 18) {
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
                    if (child.offsetTop - contentOffset < overflowHeight - 14) {
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

    const leeway = 45 + 12;    // Resume Content padding + PageBreak height
    const pageHeight = 890;

    useEffect(() => {
        setContentHeight(document.getElementById('contentHolder').clientHeight);
        setContentOffset(document.getElementById('ResumeContent').offsetTop);
    })

    useEffect(() => {
        console.log("set offsets!")
        // const pageCountLocal = Math.ceil((contentHeight - contentOffset + (leeway + 10)) / pageHeight);

        //TODO: Activate warning when resume enters 3 page territory.
        // baseInfoChange({
        //     payload: pageCountLocal,
        //     name: "pageCount"
        // });
        
        if (contentHeight > pageHeight) {
            removePageBreak();
            removeResumeOverflow();
        baseInfoChange({
            payload: ((pageHeight * 2) + leeway) + "px",
            name: "resumeHeight"
        });

            const node = document.getElementById('ResumeContent');
            setPageBreakOffsets(node, pageHeight);
            setResumeOverFlow(node, 1895 /* 2 pages plus pagebreak pluss extra leeway*/); // hide all text past two pages.

        } else {
            console.log("remove offsets")
            removePageBreak();
            removeResumeOverflow();
            removePageBreakOffsets();
            baseInfoChange({
                payload: pageHeight + "px",
                name: "resumeHeight"
            })
        }     
    }, [contentHeight]);

    return (
        <div>
            {props.children}
            <PageBreak contentHeight={contentHeight} pageHeight={pageHeight} leeway={leeway}/>
        </div>
    )
};

export default ResumePage;