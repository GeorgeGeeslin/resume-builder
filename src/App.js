import React, { useReducer } from 'react';
import ReactTooltip from "react-tooltip";
import Context from './context/Context';
import * as InputReducer from './store/reducers/inputReducer';
import ResumeEditor from './containers/ResumeEditor';
import Nav from './components/Nav';
import './App.scss';
import {highlighterButtonParent, toggleSectionVisability} from './components/ui/elements';
// import {selectFont} from './components/ui/fonts';

const App = () => {

  const [stateInput, dispatchInput] = useReducer(InputReducer.InputReducer, InputReducer.initialState);

  //TODO: App.js has become the place where all the major functions that need to be made avalible throughout the app via Context live. 
  // Should probably stick these in some files and export them for better organization. 
  const baseInfoChange = (e) => {
    const {name, payload} = e;
    dispatchInput({type: 'baseInfoChange', field: name, payload});
  };

  const baseObjectInfoChange = (e) => {
    const {key, name, payload} = e;
    dispatchInput({type: "baseObjectInfoChange", key, field: name, payload});
  };

  const arrayInfoChange = (e) => {
    const { key, index, name, payload } = e;
    dispatchInput({type: "arrayInfoChange", field: name, key, index, payload});
  };

  const nestedArrayInfoChange = (e) => {
    const parent = e.target.getAttribute('data-parent');
    const parentIndex = e.target.getAttribute('data-parent-index');
    const key = e.target.getAttribute('data-key');
    const index = e.target.getAttribute('data-index');
    dispatchInput(
      { 
        type: "nestedArrayInfoChange",
        field: e.target.name,
        payload: e.target.value,
        parent,
        parentIndex,
        key,
        index
      }
    )
  };

  const deleteNestedArrayItem = (e) => {
    const { parent, parentIndex, key, index } = e;
    dispatchInput({type: "deleteNestedArrayItem", parent, parentIndex, key, index});
  }

  const addArrayItem = (e) => {
    const { newObj, key } = e;
    dispatchInput({type: 'addArrayItem', newObj, key})
  };

  const deleteArrayItem = (e) => {
    const { key, index } = e;
    dispatchInput({type: 'deleteArrayItem', key, index});
  };

  const addNestedArrayItem = (e) => {
    const { parent, parentIndex, key } = e;
    let payload;
    switch(key) {
      case 'dates':
        payload = {start: '', end: ''};
        break;
      default: 
        payload = '';
        break;
    };
    
    let array = [...stateInput[parent]];
    let nestedArray = array[parentIndex][key];
    nestedArray.push(payload);
    array[key] = nestedArray;
    
    dispatchInput({type: 'addNestedArrayItem', array});
  };

  const addToSkillArray = (e) => {
    const {parent, key, inputKey, payload} = e;

    if (payload.trim() !== "") {
      let obj = stateInput[parent];
      let array = obj[key];
      array.push(payload);
      obj[inputKey] = "";
      dispatchInput({type: 'addToSkillArray', obj});
    }
  };

  const toggleBaseSection = (e) => {
    const {target, key} = e;
    let sections = stateInput.sections;
    sections[key] = !sections[key];
    const parent = highlighterButtonParent(target);
    toggleSectionVisability(parent, sections[key]);
    dispatchInput({type: 'toggleBaseSection', sections});
  };

  const inputEnterKey = (e, callback, args) => {
    if (e.keyCode === 13) {
      return callback(args);
    }
  };

  const deleteSkill = (e) => {
    const {parent, key, index} = e;
    dispatchInput({type: 'deleteSkill', parent, key, index});
  };


  //Get font selection for Resume Output... this needs to effect preview and downloads
  //selectFont

  // Download the PDF
  const createPDF = (b64) => {
    // Force a download by creating a downloadlink and then clicking and removing it.
    const link = document.createElement('a');
    link.href = 'data:application/octet-stream;base64,' + b64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
  };

  const requestPDF = () => {
    //TODO: Make font type selectable
    const fontImport = "@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');";
    const fontImportSecondary = "@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;531;600;700;800;900&display=swap');";
    const fontFamily = `"font-family: 'Roboto', sans-serif;`;
    const fontFamilySecondary = `font-family: 'Roboto Slab', serif;`;
    const bodyStyle = fontFamily + `background-color: white; width: 8.5in; height: 11in; max-height: 11in;"`;

    let htmlString = document.getElementById("ResumeContent").outerHTML.toString();
    htmlString = `<html><head><style>${fontImport}</style></head><body style=${bodyStyle}>` + htmlString + "</body></html>";
    const payload = JSON.stringify({data: htmlString});

      fetch('http://localhost:3000/pdf', {
          body: payload,
          method: 'POST'
      })
      .then (response => response.json())
      .then(data => createPDF(data.pdf))
  }

  return (
    <Context.Provider value={{
      resumeContent: stateInput,
      baseInfoChange,
      baseObjectInfoChange,
      arrayInfoChange,
      nestedArrayInfoChange,
      addArrayItem,
      deleteArrayItem,
      deleteNestedArrayItem,
      addNestedArrayItem,
      toggleBaseSection,
      addToSkillArray,
      inputEnterKey,
      deleteSkill,
      requestPDF
    }}>
      <Nav />
      <ResumeEditor />
      <ReactTooltip /> 
    </Context.Provider>
  );
}

export default App;
