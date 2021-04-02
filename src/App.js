import React, { useReducer, /*useState,*/ useEffect } from 'react';
import { Auth } from "aws-amplify";
import Context from './context/Context';
import * as ResumeReducer from './store/reducers/resumeReducer';
import * as ConfigReducer from './store/reducers/configReducer';
// import * as ResumeDispatcher from './store/dispatchers/resumeDispatcher';
import { highlighterButtonParent, toggleSectionVisability } from './components/ui/elements';
import Routes from './Routes';
import './App.scss';
import { onError } from "./libs/errorLib";
import { API } from "aws-amplify";


const App = () => {

  const [resumeContent, dispatchResumeContent] = useReducer(ResumeReducer.ResumeReducer, ResumeReducer.initialState);
  const [configState, dispatchConfigState] = useReducer(ConfigReducer.ConfigReducer, ConfigReducer.initialState);

  async function getLastState() {
    // gets the last saved state from dynamodb (resumeId: META#)
    // if no META# record exists then create one with a default state. 
    try {
      const meta = await API.get("resume", `/meta`);

      if (meta.length === 0) {
        createUserMeta();
      } else {
        const last = meta.length - 1;
        const resumeContent = meta[last].resumeContent ? meta[last].resumeContent : ResumeReducer.initialState
        const resumeId = meta[last].lastResume ? meta[last].lastResume : ConfigReducer.initialState.resumeId

        loadAppState(resumeId, resumeContent);
      }

    } catch(err) {
      onError(err);
    }
  };

  // TODO: Ready to move
  async function createUserMeta() {
    let payload = {lastResume: null, resumeContent}
    try {
      await API.post("resume", "/meta", {
        body: payload
      });
    } catch(err) {
      onError(err);
    }
  };

  // TODO: Ready to move
  async function updateUserMeta(resumeId, resumeContent) {
    let payload = {lastResume: resumeId, resumeContent}
    try {
      await API.put("resume", "/meta", {
        body: payload  
      });
    } catch (err) {
      onError(err)
    }
  };

  const inputEnterKey = (e, callback, args) => {
    if (e.keyCode === 13) {
      return callback(args);
    }
  };

  const createPDF = (b64, name) => {
    const blob = base64toBlob(b64);

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, `${name}.pdf`);
    } else {
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl);
    }
  };

  const base64toBlob = (b64) => {
    const sliceSize = 1024;
    const byteCharacters = atob(b64);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
    
    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
  
      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: "application/pdf" }); 
  };

  const resumeHTML = () => {
    //TODO: Make font type selectable
    //TODO: deploy endpoint and update url.
    const fontImport = "@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');";
    // const fontImportSecondary = "@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;531;600;700;800;900&display=swap');";
    const fontFamily = `"font-family: 'Roboto', sans-serif;`;
    // const fontFamilySecondary = `font-family: 'Roboto Slab', serif;`;
    const bodyStyle = fontFamily + `-webkit-print-color-adjust: exact; font-size: 12px; background-color: white; width: 8.5in; height: 11in; max-height: 11in;"`;
    const workDescLineHeight = '<style> .workDesc ul li {line-height: 1.5rem;} .workDesc ol li {line-height: 1.5rem;} .workDesc p {line-height: 1.5rem;}</style>'

    let htmlString = document.getElementById("ResumeContent").outerHTML.toString();
    htmlString = `<html><head><style>${fontImport}</style>${workDescLineHeight}</head><body style=${bodyStyle}>` + htmlString + "</body></html>";

    return htmlString;
  };

  // Post HTML string to Lambda and return base64 encoded PDF.
  async function downloadResume(name) {
    const htmlString = resumeHTML();

    const pdfString = await API.post("resume", "/resume/download", {
      body: {html: htmlString }
    });

    createPDF(pdfString, name);
  };

  //TODO: Can move?
  async function resumeScreenshot() {

    const htmlString = resumeHTML();

    const pngString = await API.post("resume", "/resume/screenshot", {
      body: {data: htmlString}
    });

    return pngString;
  };

  //TODO: Ready to move.
  async function saveResume(resume) {
    try {
      const result = await API.post("resume", "/resume", {
        body: resume
      });
  
      configInfoChange({payload: result.resumeId, name: "resumeId"});
    } catch (err) {
      onError(err);
    }
  };

  //TODO: Ready to move.
  async function updateResume(resumeId, resume) {
    try {
      await API.put("resume", `/resume/${resumeId}`, {
        body: resume
      });
    } catch (err) {
      onError(err);
    }
  };

  //TODO: Ready to move.
  async function saveOrUpdate(resumeId, resume) {
    const thumbnail = await resumeScreenshot();
    resume.thumbnail = thumbnail;

    if (!resumeId || resumeId === "new") {
      saveResume(resume);
    } else {
      updateResume(resumeId, resume);
      updateUserMeta(resumeId, resumeContent);
    }
  };

  //TODO: Can move?
  const newResume = () => {
    if (configState.userHasAuthenticated) {
      const confirm = window.confirm("Create a new resume? All unsaved changes will be lost.")

      if (confirm) {
  
        // Looks hacky. Just an easy and fast way to deep clone an object.
        // Otherwise data in nested objects will not be set back to their initial state. 
        const  newResumeStr = JSON.stringify(ResumeReducer.initialState);
  
        loadAppState("new", JSON.parse(newResumeStr));
      }
    }
  };

  const loadAppState = (resumeId, resumeContent) => {
    // load state (resumeId and resumeContent) into the reducer stores.
        
    if (resumeId) {

      dispatchResumeContent({type: 'loadAppState', resumeContent});
      configInfoChange({payload: resumeId, name: "resumeId"});      

    } else {

      const  newResumeStr = JSON.stringify(ResumeReducer.initialState);
      const newResume = JSON.parse(newResumeStr);

      dispatchResumeContent({type: 'loadAppState', resumeContent: newResume});
      configInfoChange({payload: null, name: "resumeId"}); 


    }
  };

  const configInfoChange = (e) => {
    const {name, payload} = e;
    dispatchConfigState({type: 'configInfoChange', field: name, payload});
  };
  
  const baseInfoChange = (e) => {
    const {name, payload} = e;
    dispatchResumeContent({type: 'baseInfoChange', field: name, payload});
  };
  
  const baseObjectInfoChange = (e) => {
    const {key, name, payload} = e;
    dispatchResumeContent({type: "baseObjectInfoChange", key, field: name, payload});
  };
  
  const arrayInfoChange = (e) => {
    const { key, index, name, payload } = e;
    dispatchResumeContent({type: "arrayInfoChange", field: name, key, index, payload});
  };
  
  const deleteNestedArrayItem = (e) => {
    const { parent, parentIndex, key, index } = e;
    dispatchResumeContent({type: "deleteNestedArrayItem", parent, parentIndex, key, index});
  };
  
  const addArrayItem = (e) => {
    const { newObj, key } = e;
    dispatchResumeContent({type: 'addArrayItem', newObj, key})
  };
  
  const deleteArrayItem = (e) => {
    const { key, index } = e;
    dispatchResumeContent({type: 'deleteArrayItem', key, index});
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
    
    let array = [...resumeContent[parent]];
    let nestedArray = array[parentIndex][key];
    nestedArray.push(payload);
    array[key] = nestedArray;
    
    dispatchResumeContent({type: 'addNestedArrayItem', array});
  };
  
  const addToSkillArray = (e) => {
    const {parent, key, /*inputKey,*/ payload} = e;
  
    if (payload.trim() !== "") {
      let obj = resumeContent[parent];
      let array = obj[key];
      array.push(payload);
  
      //This might be needed to clear string when there are double renders. 
      // I unwired it from the component though so add it back there too if needed.
      // obj[inputKey] = ""; 
  
      dispatchResumeContent({type: 'addToSkillArray', obj});
    }
  };
  
  const addToCoursework = (e) => {
    const {parent, index, targetKey, payload} = e;
  
    if (payload.trim() !== "") {
      let array = resumeContent[parent];
      let obj = array[index];
      let nestedArray = obj[targetKey];
      nestedArray.push(payload);
  
      dispatchResumeContent({type: 'addToCoursework', obj});
    }
  };
  
  const deleteCoursework = (e) => {
    const {parent, parentIndex, index, targetKey} = e;
    dispatchResumeContent({type: 'deleteCoursework', parent, parentIndex, index, targetKey});
  };
  
  const toggleBaseSection = (e) => {
    const {target, key} = e;
    let sections = resumeContent.sections;
    sections[key] = !sections[key];
    const parent = highlighterButtonParent(target);
    toggleSectionVisability(parent, sections[key]);
    dispatchResumeContent({type: 'toggleBaseSection', sections});
  };
  
  const deleteSkill = (e) => {
    const {parent, key, index} = e;
    dispatchResumeContent({type: 'deleteSkill', parent, key, index});
  };
  
  const nestedArrayInfoChange = (e) => {
    const parent = e.target.getAttribute('data-parent');
    const parentIndex = e.target.getAttribute('data-parent-index');
    const key = e.target.getAttribute('data-key');
    const index = e.target.getAttribute('data-index');
    dispatchResumeContent(
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
  
  return (
    <Context.Provider value={{
      resumeContent,
      configState,
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
      deleteSkill,
      addToCoursework,
      deleteCoursework,
      configInfoChange,
      inputEnterKey,
      downloadResume,
      saveOrUpdate,
      getLastState,
      updateUserMeta,
      newResume,
      loadAppState
    }}>
      <Routes /> 
    </Context.Provider>
  );
};

export default App;
