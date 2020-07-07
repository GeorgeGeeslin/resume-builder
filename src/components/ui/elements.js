import React from 'react';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import {GrClose, GrAddCircle} from 'react-icons/gr'

//***Colors***/
const primary = '#0052CC';
const white = '#fff'

/*box shadow
https://codepen.io/sdthornton/pen/wBZdXq
.card-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card-1:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
*/

//***Basic Elements***/
export const Grouper = styled.div`
    background-color: ${white};
    border-radius: 4px;
    padding: 1em;
    margin-bottom: 1em;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

export const FlexGroup = styled.div`
    display: flex;
    padding: .5em;
`;

export const ItemGrouper = styled.div`
    padding: .5em;
    border: 1px solid ${primary};
    border-radius: 4px;
    margin-bottom: 1em;
    padding-bottom: 1em;
`;

export const H3Label = styled.h3`
    font-size: .9em;
    font-family: 'Roboto Slab', serif;
    font-weight: bold;
    display: inline-block;
`;

export const Input = styled.input`
    padding: 8px 10px;
    margin: 8px 0px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    color: #444;
    width: 100%;
`;

/*
export const FlexBorder = styled.div`
    display: flex;
    border: 1px solid ${primary};
    border-radius: 4px;
    margin-top .5em;
    margin-bottom: .5em;
    padding: 1em;
`;
*/
/*
export const Flex = styled.div`
    display: flex;
    padding: 1em;
`;
*/

//***Custom Components***/
const parentHighlight = (e, highlightClass) => {
    const parent = e.target.parentElement;
    parent.classList.add(highlightClass);
};

const parentRemoveHighlight = (e, highlightClass) => {
    const parent = e.target.parentElement; 
    parent.classList.remove(highlightClass);
    parent.classList.add('removeHighlight')
}

const parentParentHighlight = (e, highlightClass) => {
    const parent = e.target.parentElement.parentElement; 
    parent.classList.add(highlightClass);
};

const parentParentRemoveHighlight = (e, highlightClass) => {
    const parent = e.target.parentElement.parentElement; 
    parent.classList.remove(highlightClass);
    parent.classList.add('removeHighlight')
}
     
export const Close = ({closeFunction, label, highlightClass}) => {
    return (

        <div style={{float: 'right', padding: '.2em'}}
            data-tip={`Delete this ${label}.`}
            data-background-color='#FF5630'
            onMouseEnter={(e) => parentHighlight(e, highlightClass)}
            onMouseLeave={(e) => {parentRemoveHighlight(e, highlightClass)}}
        >
            <GrClose onClick={closeFunction}/>
        </div>
        
    )
};

export const DateClose = ({closeFunction, label, highlightClass}) => {
    return (
        <div style={{float: 'right', padding: '.2em'}}
            data-tip={'Delete this date range.'}
            data-background-color='#FF5630'
            onMouseEnter={(e) => parentParentHighlight(e, highlightClass)}
            onMouseLeave={(e) => {parentParentRemoveHighlight(e, highlightClass)}}
        >
            <GrClose onClick={closeFunction}/>
        </div>   
    )
};

export const AddDate = ({addFunction}) => {
    return (
        <div onClick={addFunction} data-tip="Add an additional date range."
            data-background-color='#008DA6'
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconContext.Provider value={{size: '1.3em', style: {width: '100%'}}}>
                <GrAddCircle />
            </IconContext.Provider>    
        </div>
    )
};