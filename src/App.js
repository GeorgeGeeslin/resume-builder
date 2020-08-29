import React, { useReducer } from 'react';
import ReactTooltip from "react-tooltip";
import Context from './context/Context';
import * as InputReducer from './store/reducers/inputReducer';
import ResumeEditor from './containers/ResumeEditor';
import Nav from './components/Nav';
import './App.scss';
import {highlighterButtonParent, toggleSectionVisability} from './components/ui/elements';


const App = () => {

  const [stateInput, dispatchInput] = useReducer(InputReducer.InputReducer, InputReducer.initialState);

  //TODO: App.js has become the place where all the major functions that need to be made avalible throughout the app via context live. 
  // Should probably stick these in some files and export them for better organization. 
  const baseInfoChange = (e) => {
    const {name, payload} = e;
    dispatchInput({type: 'baseInfoChange', field: name, payload});
  };

  const baseObjectInfoChange = (e) => {
    console.log(e);
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
  }

  const addToSkillArray = (e) => {
    const {parent, key, inputKey, payload} = e;

    if (payload.trim() !== "") {
      let obj = stateInput[parent];
      let array = obj[key];
      array.push(payload);
      obj[inputKey] = "";
      dispatchInput({type: 'addToSkillArray', obj});
    }
  }

  const toggleBaseSection = (e) => {
    const {target, key} = e;
    let sections = stateInput.sections;
    sections[key] = !sections[key];
    const parent = highlighterButtonParent(target);
    toggleSectionVisability(parent, sections[key]);
    dispatchInput({type: 'toggleBaseSection', sections});
  }

  const inputEnterKey = (e, callback, args) => {
    if (e.keyCode === 13) {
      return callback(args);
    }
  }

  const deleteSkill = (e) => {
    const {parent, key, index} = e;
    dispatchInput({type: 'deleteSkill', parent, key, index});
  }

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
    const htmlString = document.getElementById("ResumePage").outerHTML;
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
