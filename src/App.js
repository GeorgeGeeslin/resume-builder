import React, { useReducer, useState, useEffect } from 'react';
// import ReactTooltip from "react-tooltip";
import { Auth } from "aws-amplify";
import Context from './context/Context';
import * as InputReducer from './store/reducers/inputReducer';
// import ResumeEditor from './containers/ResumeEditor';
// import Nav from './components/Nav';
import Routes from './Routes';
import './App.scss';
import {highlighterButtonParent, toggleSectionVisability} from './components/ui/elements';
import { onError } from "./libs/errorLib";
import { API } from "aws-amplify";

const App = () => {

  const [stateInput, dispatchInput] = useReducer(InputReducer.InputReducer, InputReducer.initialState);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      baseInfoChange({payload: true, name: 'userHasAuthenticated'});
    } catch(err) {
      if (err !== 'No current user') {
        onError(err);
      }
    }
    setIsAuthenticating(false);
  };

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

  // const plainNestedArrayInfoChange = (e) => {
  //   const {key, name, payload, parent, parentIndex, index} =e;
  //   dispatchInput({
  //     type: "plainNestedArrayInfoChange", key, field:name, payload, 
  //     parent, parentIndex, index
  //   });
  // }

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
    const {parent, key, /*inputKey,*/ payload} = e;

    if (payload.trim() !== "") {
      let obj = stateInput[parent];
      let array = obj[key];
      array.push(payload);

      //This might be needed to clear string when there are double renders. 
      // I unwired it from the component though so add it back there too if needed.
      // obj[inputKey] = ""; 

      dispatchInput({type: 'addToSkillArray', obj});
    }
  };

  const addToCoursework = (e) => {
    const {parent, index, targetKey, payload} = e;

    if (payload.trim() !== "") {
      let array = stateInput[parent];
      let obj = array[index];
      let nestedArray = obj[targetKey];
      nestedArray.push(payload);

      dispatchInput({type: 'addToCoursework', obj});
    }
  };

  const deleteCoursework = (e) => {
    const {parent, parentIndex, index, targetKey} = e;
    dispatchInput({type: 'deleteCoursework', parent, parentIndex, index, targetKey});
  }

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

  // Create PDF from base64 string and open download link.
  const createPDF = (b64) => {
    // Force a download by creating a downloadlink and then clicking and removing it.
    const link = document.createElement('a');
    link.href = 'data:application/octet-stream;base64,' + b64;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
  };

  // Post HTML string to Lambda and return base64 encoded PDF.
  async function downloadResume() {
    //TODO: Make font type selectable
    //TODO: deploy endpoint and update url.
    const fontImport = "@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');";
    // const fontImportSecondary = "@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;531;600;700;800;900&display=swap');";
    const fontFamily = `"font-family: 'Roboto', sans-serif;`;
    // const fontFamilySecondary = `font-family: 'Roboto Slab', serif;`;
    const bodyStyle = fontFamily + `font-size: 12px; background-color: white; width: 8.5in; height: 11in; max-height: 11in;"`;
    const workDescLineHeight = '<style> .workDesc ul li {line-height: 1.5rem;} .workDesc ol li {line-height: 1.5rem;} .workDesc p {line-height: 1.5rem;}</style>'

    let htmlString = document.getElementById("ResumeContent").outerHTML.toString();
    htmlString = `<html><head><style>${fontImport}</style>${workDescLineHeight}</head><body style=${bodyStyle}>` + htmlString + "</body></html>";

    const pdfString = await API.post("resume", "/resume/download", {
      body: {data: htmlString}
    });

    createPDF(pdfString);
  };

  async function saveResume(resume) {

    const result = await API.post("resume", "/resume", {
      body: resume
    });

    console.log("save")
    console.log(result)
    baseInfoChange({payload: result.resumeId, name: "resumeId"});
  };

  async function updateResume(resumeId, resume) {

    const result = await API.put("resume", `/resume/${resumeId}`, {
      body: resume
    });

    console.log("update")
    console.log(result);
  };

  const saveOrUpdate = (resumeId, resume) => {
    if (!resumeId) {
      saveResume(resume);
    } else {
      updateResume(resumeId, resume);
    }
  };

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
      addToCoursework,
      deleteCoursework,
      downloadResume,
      saveOrUpdate
    }}>
      <Routes /> 
    </Context.Provider>
  );
}

export default App;
