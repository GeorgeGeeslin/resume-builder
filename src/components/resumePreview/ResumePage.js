import React,  {useEffect, useContext} from 'react';
import Context from '../../context/Context';

const resumePageStyles = {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    width: '8.5in',
    // minHeight: '11in',
    // maxHeight: '11in',
    padding: '0.5in',
    overflowY: 'hidden'
 };

const ResumePage = (props) => {
    // Most of the logic in this component is for positioning page breaks.

    const context = useContext(Context);
    const {baseInfoChange} = context;
    const {pageCount, height, font, name, phone, email, website, desired_position, 
        links, address, skills, work, education, sections} = context.resumeContent;

    // Find last node that has children. (Will return a <p> or <div> tag instead of the text within the tag.)
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

    // Starting from the bottom node, find the prev sibling recusivly. If no sibling find the parent and start again
    // repeat untill finding a node at the desired height. Then call setBreakPoint().
    const positionBreakPoint = (node, breakHeight) => {
        const nodeHeight = findHeight(node);

        if (nodeHeight <= breakHeight) {
            setBreakPoint(node);
            return nodeHeight;
        }
        else if (node.previousSibling !== null) {
            positionBreakPoint(node.previousSibling, breakHeight);
        } else if (node.parentNode !== null) {
            positionBreakPoint(node.parentNode, breakHeight);
        }
        return null;
    };

    const setBreakPoint = (element) => {
        element.classList.add("pageBreak");
        element.style.breakBefore = "always";
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

    useEffect(() => {
        const newHeight = document.getElementById('ResumePage').clientHeight;

        if (newHeight > 300) {
            const heightLimit = 850;

            removePageBreak();
         
            const maincontent = document.getElementById('maincontent')
            const sidebar = document.getElementById('sidebar');

            // Find if maincontent or sidebar is taller. Use the taller side to position the page break.
            const {tallest, shortest} = compareHeight(maincontent, sidebar);
            const last = findLastNode(tallest)
            const position = positionBreakPoint(last, heightLimit);

            //TODO: what if I make a pageBreakComponent that is hidden and sits below the page and is the same width as the page
            // Then when the pageBreak is set the css to the as above for the pdf, but this new element creates the visual effect in the preview.
            console.log(position)
  
        } 
        
    }, [font, name, phone, email, website, desired_position, links, address, skills, work, education, sections]);

    return (
        <div id ="ResumePage" style={resumePageStyles} className="resumePage">
            {props.children}
        </div>
    )
};

export default ResumePage;