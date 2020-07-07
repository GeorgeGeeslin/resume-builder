import React, { useReducer } from 'react';
import Context from './context/Context';
import * as InputReducer from './store/reducers/inputReducer';
import ResumeEditor from './containers/ResumeEditor';
import Nav from './components/Nav';
import './App.scss';


const App = () => {

  const [stateInput, dispatchInput] = useReducer(InputReducer.InputReducer, InputReducer.initialState);

  const baseInfoChange = (e) => {
    const {name, payload} = e;
    dispatchInput({type: 'baseInfoChange', field: name, payload});
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
    console.log('deleteNestedArrayItem()')
    const { parent, parentIndex, key, index } = e;
    dispatchInput({type: "deleteNestedArrayItem", parent, parentIndex, key, index});
  }

  const addArrayItem = (e) => {
    console.log('addArrayItem()')
    const { newObj, key } = e;
    dispatchInput({type: 'addArrayItem', newObj, key})
  };

  const deleteArrayItem = (e) => {
    console.log('deleteArrayItem()')
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

  console.log('App render')
  return (
    <Context.Provider value={{
      resumeContent: stateInput,
      baseInfoChange,
      arrayInfoChange,
      nestedArrayInfoChange,
      addArrayItem,
      deleteArrayItem,
      deleteNestedArrayItem,
      addNestedArrayItem
    }}>
      <Nav />
      <ResumeEditor />
    </Context.Provider>
  );
}

export default App;
