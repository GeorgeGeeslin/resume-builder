import React, {useState, useEffect, useContext} from 'react';
import PageBreak from './PageBreak';
import Context from '../../context/Context';
import {ResumePageWrapper} from '../ui/previewElements';

const ResumePage = (props) => {

    const context = useContext(Context);
    const {baseInfoChange} = context;

    const [resumeHeight, setResumeHeight] = useState();
    const [contentHeight, setContentHeight] = useState();
    const [contentOffset, setContentOffset] = useState();

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

    const leeway = 16 + 12;    // Resume Content padding + PageBreak height
    const pageHeight = 860;

    useEffect(() => {
        setContentHeight(document.getElementById('ResumeContent').clientHeight);
        setContentOffset(document.getElementById('ResumeContent').offsetTop);
    })

    useEffect(() => {

        const pageCountLocal = Math.ceil((contentHeight - contentOffset + (leeway + 10)) / pageHeight);

        baseInfoChange({
            payload: pageCountLocal,
            name: "pageCount"
        });
        
        if (contentHeight > pageHeight) {
        
            removePageBreak();
            setResumeHeight(((pageHeight * (pageCountLocal > 2 ? 2 : pageCountLocal)) + leeway) + "px");

            const node = document.getElementById('ResumeContent');
            setPageBreakOffsets(node, pageHeight);

        } else {
            removePageBreak();
            setResumeHeight(pageHeight + "px");
        }     
    }, [contentHeight]);

      // const setPageCount = (clientHeight, pageHeight, leeway) => {
  //   const pageCount = Math.ceil((clientHeight + leeway) / pageHeight);
  //   dispatchInput({type: 'setPageCount', pageCount});
  // }

    return (
        <ResumePageWrapper theme={{ height: resumeHeight}}>
            {props.children}
            <PageBreak contentHeight={contentHeight} pageHeight={pageHeight} leeway={leeway}/>
        </ResumePageWrapper>
    )
};

export default ResumePage;