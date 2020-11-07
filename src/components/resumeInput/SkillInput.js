import React, { useContext } from 'react';
import Context from '../../context/Context';
import { Skill, Input, FlexGroup, AddButton } from '../ui/elements';

const SkillInput = ({label, array, inputStr, parent, index, storeKey, onAddFunc, onChangeFunc, onDelete, fieldName, targetKey, parentIndex}) => {

    const context = useContext(Context);
    const {inputEnterKey} = context;

    const skillList = array.map((skill, index) => (
        <Skill key={index} skill={skill} label={label.toLowerCase()} 
            highlightClass="deleteHighlight" 
            onClickFunc={(e) => onDelete(
                {
                    parent: parent,
                    key: storeKey,
                    index: index,
                    parentIndex,
                    targetKey
                }
            )}
        />
    ));

    const skillArgs = {
        //Screwed up some naming and parent and key mean different things in different places.
        //This component now supports two parent components with different naming conventions in their functions. 
        //Added target key for coursework to compensate for the mismatch. 
        //This is a nasty code smell and indicates that I should rework the inputReducer functions for consistency.  
        parent: parent,
        key: storeKey,
        targetKey,

        payload: inputStr,
        // inputKey: inputStr,
        index,

    }

    return (
        <div>
            <FlexGroup>
                <div>
                    <label htmlFor={`add${label}`}>Add {label}</label>
                    <Input id={`add${label}`} type="text" value={inputStr} 
                        onKeyDown={(e) => inputEnterKey(e, onAddFunc, skillArgs)}
                        onChange={(e) => onChangeFunc(
                            {
                                payload: e.target.value,
                                name: fieldName,
                                key: storeKey,
                                index
                            }
                    )}/> 
                </div>
                <div style={{marginTop: "auto", marginLeft: "1em"}}>
                    <AddButton label={`Add ${label}`}
                        onClickFunc={() => onAddFunc(skillArgs)}
                    />
                </div>
            </FlexGroup> 
            {skillList}
        </div>         
    )
};

export default SkillInput;