import React from 'react';
import styled, { keyframes } from 'styled-components';
import { IconContext } from "react-icons";
import {GrAddCircle} from 'react-icons/gr'
import {FaEye, FaEyeSlash, FaPlus, FaTimes} from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import ReactTooltip from "react-tooltip";


//***Colors***/
const primary = '#0052CC';
const white = '#fff'
const warningBG = '#FF5630';



//TODO: This should be broken out into multiple files. 
//Especailly the components that use the highlight parent functions.
//And the Skill components and functions.

/***Basic Elements***/
export const Logo = styled.span`
  font-family: 'Abril Fatface', cursive;
  font-size: 30px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  padding-left: 1em;
`;

/***Navigation***/
export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0052CC;
  width: 100%;
  height: 60px;
  a {
    text-decoration: none;
  }
`;

export const ResumeNameWrapperNav = styled.div`
  position: relative;
  top: 10px;
  width: 200px;
  input {
    background-color: #B3D4FF;
    border: none;
  }

  @media screen and (max-width: 1275px) and (min-width: 1075px) {
    display: none;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`

export const ResumeNameWrapperBody = styled.div`
  display: none;
  width: 100%; 
  margin-bottom: 0.5em;
  input {
    background-color: #B3D4FF;
    width: 250px;
  }

  @media screen and (max-width: 1275px) and (min-width: 1075px) {
    display: block;
  }
  @media screen and (max-width: 600px) {
    display: block;
  }
`;

export const NavButton = styled.button`
  display: block;
  border: none;
  margin: 0;
  text-decoration: none;
  background-color: #172B4D;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  transition: all 250ms ease-in-out, 
  transform 150ms ease;
  font-size: 14px;
  padding: 0.5em;
  margin-right: 1em;
  height: 35px;
  border-radius: 5px;
  &:hover {
    background-color: #42526E;
  }
  &:focus{
    outline: none;
  }
  &:active {
    position: relative;
    top: 2px;
    transform: scale(0.99);   
  }
  &:disabled {
    background-color: #7A869A;
    cursor: default;
  }
`;

export const MenuIcon = styled.div`
  display: none;

  @media screen and (max-width: 1075px) {
    display: block;
  }
`;

export const ResponsiveDesktop = styled.div`

  @media screen and (max-width: 1075px) {
    display: none;
  }
`;

export const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 50px;
  left: calc(100vw - (34px + 180px));
  box-shadow: 0 1px 3px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.55);
  z-index: 2;

  @media screen and (max-width: 1075px) {
    display: block;
  }
`;

export const DropdownButton = styled.div`
  background-color: ${props => props.auth ? '#172B4D' : '#7A869A'};
  color: white; 
  width: 180px;
  padding: 1em;
  border: 1px solid #091E42;
  cursor: ${props => props.auth ? 'pointer' : 'default'};
  a {
    color: white;
  }
  &:hover {
    background-color: ${props => props.auth ? '#42526E' : '#7A869A'};
  }
  &:active {
    background-color: ${props => props.auth ? '#42526E' : '#7A869A'};  
  }
`;

export const CollapseCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #091E42;
  border-radius: 50%;
  width: 1.8em;
  height: 1.8em;
  margin-bottom: 0.5em;
  transition: all 250ms ease-in-out, 
  transform 150ms ease;
  &:hover {
    background-color: #42526E;
  }

  @media screen and (min-width: 1275px) {
    display: none;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

/***Grouping Elements***/
export const Grouper = styled.div`
  background-color: ${white};
  // border-radius: 4px;
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

/***Headers***/
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

/***Inputs & Buttons***/
export const Input = styled.input`
  padding: 8px 10px;
  margin: 0px;
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: #444;
  width: 100%;
  ${({error}) => error && `
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  `}
`;

export const Select = styled.select`
  padding: 7px 10px;
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

//TODO change to button and adjust styles
export const Button = styled.button`
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

export const ErrorSpan = styled.span`
  color: red;
  font-size: 0.8em;
`;

/***Modals***/
// modal background
export const ThemeModal = styled.div` 
  display: ${props => props.active}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  // padding-top: 100px; /* Location of the box */
  padding-top: 50px;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const animatetop = keyframes`
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
`;

//modal content
export const ThemeModalContent = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  max-width: 1000px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: ${animatetop};
  animation-duration: 0.4s
  background-color: #ccc; /* Fallback color */
  background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
`;

export const ThemeWindow = styled.div`
  cursor: pointer;
  color: #fff;
  margin-top: 1em;
  margin-bottom: 1em;
  transition all 150ms ease-in-out;
  img {
    width: 3in;
  }
  &:hover {
    transform: scale(1.05);
    img {
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    }
  }
`;

/***Login & Signup***/
export const LoginForm = styled.form`
  width: 320px;
  margin-top: 2em;

  label {
    display: block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
`;

/***Misc***/
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

export const SavedResumeCard = styled.div`
  box-shadow: 0 1px 3px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.55);
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 2em;
  transition all 150ms ease-in-out;
  .nameplate {
    align-items: center;
    background-color: #B3BAC5;
    height: 40px;
  }
  .nameplate-name {
    text-align: center;
    line-height: 40px;
  }
  .nameplate-options {
    display: none;
    opacity: 0;
    font-size: 0.8em;
  }
  .nameplate-button {
    background-color: #97A0AF;
    border-radius: 10px;
    padding: 0.5em;
    transition all 150ms ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: #7A869A;
    }
  }  
  &:hover {
    transform: scale(1.05);
    .nameplate-name {
      display: none;
      opacity: 0;
    }
    .nameplate-options {
      display: flex;
      justify-content: space-around;
      align-items: center;
      opacity: 1;
      height: 40px;
    }
  }
`;

export const SavedResumesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
`;

export const ResumeInputWrapper = styled.div`
  background-color: ${props => props.background};
  border-right: 1px solid #444;
  padding: 1em;
  overflow-y: auto;
  height: 100vh;
  min-width: ${props => props.minWidth};
  width: ${props => props.width};
  max-width: 700px;
  transition: all 250ms ease-in-out, 
  transform 150ms ease;

  .hideable-inputs {
    display: ${props => props.display};
  }

  @media screen and (min-width: 1275px) {
    width: 50%;
    min-width: 450px;
    background-color: transparent;
    
    .hideable-inputs {
      display: block;
    }
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    border: none;
    background-color: transparent;
  }
`;

// Not exported directly, dependent on Skill functions in this file.
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
};

export const LoadingButton = ({label, isLoading, width}) => {

  const visibility = isLoading ? 'visible' : 'hidden';
  const rotate = isLoading ? 'rotate' : '';

  return (
    <Button type="submit" style={{marginTop: '1em', width: width || '90px'}}>
      {label}
      <span style={{display: 'inline-block', position: 'relative', top: '2px', left: '0.5em', height: '36px'}}>
        <AiOutlineLoading3Quarters className={rotate} style={{visibility: visibility}}/>
      </span>
    </Button> 
  )
};

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
};

export const CurrentCheckbox = ({label, value, onClickFunc}) => {
  return (
    <div style={{marginTop: '1em', marginBottom: '0.5em'}}>
      <label htmlFor="current" style={{marginRight: '1em'}}>{label}</label>
      <input type="checkbox" name="current" checked={value} onChange={onClickFunc}/>
    </div>
  )
};

export const Spinner = () => {
  return (
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
};