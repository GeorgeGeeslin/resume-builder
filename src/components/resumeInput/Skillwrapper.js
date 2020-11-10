import React,  { useContext } from 'react';
import Context from '../../context/Context';
import { Grouper, SectionHeader } from '../ui/elements';
import SkillInput from './SkillInput';

const Skillwrapper = () => {

    const context = useContext(Context);
    const {baseObjectInfoChange, addToSkillArray, deleteSkill} = context;
    const {skills, addSkill} = context.resumeContent.skills;


    return (
        <Grouper>
            <SectionHeader>Skills</SectionHeader>
            <SkillInput label="Skill" array={skills} inputStr={addSkill} parent={'skills'} 
                storeKey={'skills'} onAddFunc={addToSkillArray} onChangeFunc={baseObjectInfoChange}
                onDelete={deleteSkill} fieldName="addSkill"
            />
        </Grouper>
    );

};

export default Skillwrapper;
