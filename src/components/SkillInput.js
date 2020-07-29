import React,  { useContext } from 'react';
import Context from '../context/Context';
import {Grouper, SectionHeader, Skill, Input, FlexGroup, /*ItemGrouper,*/ AddButton} from '../components/ui/elements';
import ReactTooltip from "react-tooltip";

const SkillInput = () => {
    
    const context = useContext(Context);
    const {baseObjectInfoChange, addToSkillArray, inputEnterKey, deleteSkill} = context;
    const {skills, addSkill} = context.resumeContent.skills;

    const skillList = skills.map((skill, index) => (
        <Skill key={index} skill={skill} label="skill" 
            highlightClass="deleteHighlight" 
            onClickFunc={(e) => deleteSkill(
                {
                    parent: "skills",
                    key: "skills",
                    index: index
                }
            )}
        />
    ));

    const skillArgs = {
        parent: "skills",
        key: "skills",
        payload: addSkill,
        inputKey: addSkill
    }
    return (
        <Grouper>
            <SectionHeader>Skills</SectionHeader>
            <FlexGroup>
                <div>
                    <label htmlFor="addSkill">Add Skill</label>
                    <Input id="addSkill" type="text" value={addSkill} 
                        onKeyDown={(e) => inputEnterKey(e, addToSkillArray, skillArgs)}
                        onChange={(e) => baseObjectInfoChange(
                            {
                                payload: e.target.value,
                                name: "addSkill",
                                key: "skills"
                            }
                    )}/> 
                </div>
                <div style={{marginTop: "auto", marginLeft: "1em"}}>
                    <AddButton label="Add Skill"
                        onClickFunc={() => addToSkillArray(skillArgs)}
                    />
                </div>
            </FlexGroup> 
            {skillList}         
        </Grouper>
    )
};

export default SkillInput;