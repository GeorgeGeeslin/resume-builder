import React, {useEffect, useContext} from 'react';
import Context from '../../context/Context';

const resumePageStyles = {
    boxSizing: 'border-box',
    backgroundColor: 'white',
    width: '8.5in',
    minHeight: '11in',
    // maxHeight: '11in',
    padding: '0.5in'
 };

const ResumePage = (props) => {

    // Intentionally definging in this shared scope. 
    let rect1; 
    let rect2;

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

    const setPageBreak = (node) => {
        let elem = findLastNode(node);
        elem.style.pageBreakBefore = 'always';
        elem.classList.add('pageBreak');
        rect1 = elem.getBoundingClientRect();
    };      

    const checkOverlap = (node) => {
        // https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
        rect2 = node.getBoundingClientRect();

        var overlap = !(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom)

        console.log(overlap)
        
        //TODO: If overlap exists on outter divs need to drill down to the most inner level where an overlap exists.
    };

    const context = useContext(Context);
    const {baseInfoChange} = context;
    const {pageCount, height, font, name, phone, email, website, desired_position, 
        links, address, skills, work, education, sections} = context.resumeContent;
    
        // 11in = 1056px
    useEffect(() => {
        const newHeight = document.getElementById('ResumePage').clientHeight;

        // need to determin when to page, and update the data accordingly 
        // if (newHeight > height) {
 

            // const node = document.getElementById('ResumePage')
            const maincontent = document.getElementById('maincontent')
            const sidebar = document.getElementById('sidebar');
            // const lastChild = maincontent.lastChild
            setPageBreak(maincontent);
            checkOverlap(sidebar);
  

        // }

    //Everything except for pageCount and height must go in this depndency array.
    },[font, name, phone, email, website, desired_position, links, address, skills, work, education, sections])

    return (
        <div id ="ResumePage" style={resumePageStyles} className="resumePage">
            {props.children}
        </div>
    )
};

export default ResumePage;