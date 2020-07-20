import React from 'react';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import {GrClose, GrAddCircle} from 'react-icons/gr'
import {FaEye, FaEyeSlash, FaPlus} from 'react-icons/fa';


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
    padding: 0.25em;
`;

export const ItemGrouper = styled.div`
   padding: .5em;
    border: 1px solid ${primary};
    border-radius: 4px;
    margin-bottom: 0.5em;
   padding-bottom: 0.25em; 
`;

export const SectionHeader = styled.h2`
    margin-top: 0px;
    margin-bottom: 0.5em;
`;

export const SubsectionHeader = styled.h3`
    font-size: .9em;
    font-family: 'Roboto Slab', serif;
    font-weight: bold;
    display: inline-block;
    margin-top: 0px;
    margin-bottom: 0.5em;
`;

export const Input = styled.input`
    padding: 8px 10px;
    margin: 2px 0px 8px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    color: #444;
    width: 100%;
`;

const Button = styled.div`
    display: inline-block;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    padding: 0 16px;
    width: 220px;
    min-width: 64px;
    height: 36px;
    text-overflow: ellipsis;
    background-color: #0065FF;
    color: #FFF;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 1em;
    line-height: 36px;
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow: 0.2s; 
    transition: background-color: 0.2s;  
    }
    &:hover {
        background-color: #2684FF;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    }
    &:focus{
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
    }
    &:active {
        background-color: #2684FF;
        box-shadow: 0 3px 3px -3px rgba(0, 0, 0, 0.2), 0 4px 5px 1px rgba(0, 0, 0, 0.14), 0 3px 8px 2px rgba(0, 0, 0, 0.12);
    }
`;

// Hover functions 
// Using closest in this function because if the mouse is moving 
// quickly then the nested element may become the target.
export const highlighterButtonParent = (target) => {
    if (target.className === 'highlighterButton') {
        return target.parentElement;
    } else {
        return target.closest('.highlighterButton').parentElement;
    }
};

const parentHighlight = (e, highlightClass) => {
    const parent = highlighterButtonParent(e.target);
    parent.classList.remove('removeHighlight');
    parent.classList.add(highlightClass);
};

const parentRemoveHighlight = (e, highlightClass) => {
    const parent = highlighterButtonParent(e.target);
    parent.classList.remove(highlightClass);
    parent.classList.add('removeHighlight')
}

const parentParentHighlight = (e, highlightClass) => {
    const parent = highlighterButtonParent(e.target).parentElement;
    parent.classList.remove('removeHighlight'); 
    parent.classList.add(highlightClass);
};

const parentParentRemoveHighlight = (e, highlightClass) => {
    const parent = highlighterButtonParent(e.target).parentElement;
    parent.classList.remove(highlightClass);
    parent.classList.add('removeHighlight')
}

export const toggleSectionVisability = (section, visability) => {
    if (visability) {
        section.classList.remove('hidenSection');
        section.classList.add('removeHighlight');
    } else {
        section.classList.remove('removeHighlight');
        section.classList.add('hidenSection')
    }
}

// Simple React components wrapping Icons 
export const Close = ({onClickFunc, label, highlightClass}) => {
    return (

        <div className='highlighterButton' style={{float: 'right', padding: '.2em'}}
            data-tip={`Delete this ${label}.`}
            data-background-color='#FF5630'
            onMouseEnter={(e) => parentHighlight(e, highlightClass)}
            onMouseLeave={(e) => {parentRemoveHighlight(e, highlightClass)}}
        >
            <GrClose onClick={onClickFunc}/>
        </div>
        
    )
};

export const DateClose = ({onClickFunc, label, highlightClass}) => {
    return (
        <div className='highlighterButton' style={{float: 'right'}}
            data-tip={'Delete this date range.'}
            data-background-color='#FF5630'
            onMouseEnter={(e) => parentParentHighlight(e, highlightClass)}
            onMouseLeave={(e) => {parentParentRemoveHighlight(e, highlightClass)}}
        >
            <GrClose onClick={onClickFunc}/>
        </div>   
    )
};

export const AddDate = ({onClickFunc}) => {
    return (
        <div onClick={onClickFunc} data-tip="Add an additional date range."
            data-background-color='#008DA6'
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconContext.Provider value={{size: '1.3em', style: {width: '100%'}}}>
                <GrAddCircle />
            </IconContext.Provider>    
        </div>
    )
};

export const VisabilityToggle = ({onClickFunc, label, highlightClass, visability, section}) => {
        const labelMessage = visability ? `Hide ${label}.` : `Show ${label}.`;
    return (
        <div className='highlighterButton' style={{float: 'right', padding: '.2em'}}
            data-tip={labelMessage}
            data-background-color='#FFAB00'
            onMouseEnter={(e) => parentHighlight(e, highlightClass)}
            onMouseLeave={(e) => parentRemoveHighlight(e, highlightClass)}
        >
            {visability ? 
                <FaEyeSlash onClick={(e) => onClickFunc({target: e.target, key: section})}/>
                : <FaEye onClick={(e) => onClickFunc({target: e.target, key: section})}/>
            }
        </div>       
    )
};


export const AddButton = ({onClickFunc, label}) => {
    return (
        <Button onClick={onClickFunc}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                <IconContext.Provider value={{color: 'white'}}>
                    <FaPlus/>
                </IconContext.Provider>
                <div style={{paddingLeft: '0.5em'}}>{label}</div>
            </div>

        </Button>
    )
}



