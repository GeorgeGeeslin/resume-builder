import React,  {useState, useEffect} from 'react';
import PageBreak from './PageBreak';

const resumePageStyles = {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    width: '8.5in',
    // minHeight: '1016px',
    // maxHeight: '11in',
    // padding: '0.5in',
    overflowY: 'hidden'
 };

const ResumePage = (props) => {
    // Most of the logic in this component is for positioning page breaks for the live preview.. its crap.

    const findLastNode = (node) => {
        let lastNode = node;
        if (lastNode.hasChildNodes()) {
            let newNode = lastNode.lastChild
            return findLastNode(newNode);
        } else {
            let target = lastNode.parentNode;
            return target;
        }
    };

    const searchChildren = (node, breakHeight) => {
        const children = node.children;
        const size = children.length - 1;

        for (let i = size; i >= 0; i--) {
            let last = findLastNode(children[i]);
            let nodeHeight = findHeight(last);
            if (nodeHeight <= breakHeight) {
                return nodeHeight;
            }
        }
    }

    const positionBreakPoint = (node, breakHeight) => {
        const baseNodes = node.children;
        const size = baseNodes.length - 1;

        for (let i = size; i >= 0; i--) {
            let childHeight = searchChildren(baseNodes[i], breakHeight);
            if (childHeight) {
                return childHeight;
            }
        }
    };

    const findHeight = (node) => {
        const resumeOffset = 50 + 16; //Nav height + PreviewBox padding
        return node.offsetTop - resumeOffset;
    };

    const removePageBreak = () => {

        const pageBreak = document.getElementsByClassName("pageBreak")[0];
        if (pageBreak) {
            pageBreak.style.removeProperty("breakBefore");
            pageBreak.classList.remove("pageBreak");
        }
        setBreakPosition(null);
    };

    const compareHeight = (maincontent, sidebar) => {
        const mainLast = findLastNode(maincontent);
        const sideLast = findLastNode(sidebar);
        if (mainLast.offsetTop >= sideLast.offsetTop) {
            return {tallest: maincontent, shortest: sidebar};
        } else {
            return {tallest: sidebar, shortest: maincontent};
        }
    }

    //hardcoded value for max height of page in px. 
    const heightLimit = 1000;
    const [breakPosition, setBreakPosition] = useState();
    const [pageHeight, setPageHeight] = useState(heightLimit);

    useEffect(() => {
        const newHeight = document.getElementById('ResumePage').clientHeight;

        if (newHeight > heightLimit) {
            // console.log('pageBreak')
            // console.log({heightLimit, breakPosition})
            
            removePageBreak();
         
            const maincontent = document.getElementById('maincontent')
            const sidebar = document.getElementById('sidebar');

            // Find if maincontent or sidebar is taller. Use the taller side to position the page break.
            const {tallest, shortest} = compareHeight(maincontent, sidebar);

            const position = positionBreakPoint(tallest, heightLimit);
            
            // protect against buggy very high break point.
            if (position > 900) {
                setBreakPosition(positionBreakPoint(tallest, heightLimit));
            }

            // console.log({tallest})

        } else {
            // console.log('blow break height:', newHeight)
            removePageBreak();
        }     
    });

    return (
        <div id ="ResumePage" style={resumePageStyles} className="resumePage">
            {props.children}
            <PageBreak breakPosition={breakPosition} pageHeight={pageHeight}/>
        </div>
    )
};

export default ResumePage;