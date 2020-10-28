import React from 'react';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import {GrAddCircle} from 'react-icons/gr'
import {FaEye, FaEyeSlash, FaPlus, FaTimes} from 'react-icons/fa';
import ReactTooltip from "react-tooltip";


//***Colors***/
const primary = '#0052CC';
const white = '#fff'
const warningBG = '#FF5630';



//TODO: This should be broken out into multiple files. 
//Especailly the components that use the highlight parent functions.

//***Basic Elements***/
export const Grouper = styled.div`
    background-color: ${white};
    border-radius: 4px;
    padding: 1em;
    margin-bottom: 1em;
    box-shadow: 0 1px 3px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.55);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

export const FlexGroup = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.25em;
    clear: both;
`;

export const ItemGrouper = styled.div`
   padding: .5em;
    border: 1px solid ${primary};
    border-radius: 4px;
    margin-bottom: 0.5em;
`;

export const SectionHeader = styled.h2`
    margin-top: 0px;
    margin-bottom: 0.25em;
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
    margin: 0px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    color: #444;
    width: 100%;
`;

export const Select = styled.select`
    padding: 8px 10px;
    margin: 0px;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    color: #444;
    width: 100%;
`;

export const DatePicker = styled.input`
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    color: #444;
    margin: 0px;
    padding: 8px 4px;
    width: 100%;

`;

export const WarningMessage = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    background-color: ${warningBG};
    color: #fff;
    font-weight: bold;
    text-align: center;
`;

const Button = styled.div`
    display: inline-block;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    padding: 0 16px;
    /* width: 220px; */
    min-width: 64px;
    height: 34px;
    /* text-overflow: ellipsis; */
    background-color: #0065FF;
    color: #FFF;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    font-size: 1em;
    line-height: 36px;
    /* overflow: hidden; */
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

const SkillChip = styled.div`
    display: inline-block;
    border-radius: 8px;
    background-color: #36B37E;
    border: 1px solid transparent;
    color: white; /*get a better color*/
    padding: 0.25em;
    margin: 0.25em;
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
};

// Simple React components wrapping Icons 
export const Close = ({onClickFunc, label, highlightClass}) => {
    return (

        <div className='highlighterButton' style={{float: 'right', padding: '.2em'}}
            data-tip={`Delete this ${label}.`}
            data-background-color='#FF5630'
            onMouseEnter={(e) => parentHighlight(e, highlightClass)}
            onMouseLeave={(e) => parentRemoveHighlight(e, highlightClass)}
        >
            <FaTimes onClick={onClickFunc}/>
        </div>
        
    )
};

export const DateClose = ({onClickFunc, label, highlightClass}) => {
    return (
        <div className='highlighterButton' style={{float: 'right'}}
            data-tip={'Delete this date range.'}
            data-background-color='#FF5630'
            onMouseEnter={(e) => parentParentHighlight(e, highlightClass)}
            onMouseLeave={(e) => parentParentRemoveHighlight(e, highlightClass)}
        >
            <IconContext.Provider value={{size: '14px'}}>
                <FaTimes onClick={onClickFunc}/>
            </IconContext.Provider>
        </div>   
    )
};

export const AddDate = ({onClickFunc}) => {
    return (
        <div onClick={onClickFunc} data-tip="Add an additional date range."
            data-background-color='#008DA6'
            style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '10px 4px', marginLeft: '14px'}}>
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

const SkillDelete = ({onClickFunc, label, highlightClass}) => {
    return (
        <FaTimes
            data-tip={`Delete this ${label}.`}
            data-background-color='#FF5630'
            onMouseEnter={(e) => parentHighlight(e, highlightClass)}
            onMouseLeave={(e) => parentRemoveHighlight(e, highlightClass)}
            onClick={onClickFunc}
        />
    )
};

export const Skill = ({onClickFunc, skill, label, highlightClass}) => {
    return (
        <SkillChip>
            <div className='highlighterButton' style={{display: 'flex', alignItems: 'center'}}>
                <div style={{margin: '0px 6px'}}>
                    {skill}
                </div>
                <SkillDelete onClickFunc={onClickFunc} label={label} highlightClass={highlightClass} />
            </div>
            <ReactTooltip/>
        </SkillChip>
    )
}

export const CurrentCheckbox = ({label, value, onClickFunc}) => {
    return (
        <div style={{marginTop: '1em', marginBottom: '0.5em'}}>
            <label htmlFor="current" style={{marginRight: '1em'}}>{label}</label>
            <input type="checkbox" name="current" checked={value} onClick={onClickFunc} />
        </div>
    )
}




