import React, { useContext } from 'react';
import Context from '../context/Context';
import WorkExpInput from '../components/WorkExpInput';
import WorkExpInputGroup from '../components/WorkExpInputGroup';
import EduInput from '../components/EduInput';
import EduInputGroup from '../components/EduInputGroup';
import PersonalInfoInput from '../components/PersonalInfoInput';
import SkillInput from '../components/SkillInput';

const ResumeInput = () => {

    const context = useContext(Context);
    const work = context.resumeContent.work;
    const education = context.resumeContent.education;
    const addArrayItem = context.addArrayItem;
    const skills = context.resumeContent.skills

    const workExpInputArray = work.map((item, index) => {
        const { arrayInfoChange, nestedArrayInfoChange, deleteArrayItem, deleteNestedArrayItem, addNestedArrayItem } = context;
        const {employer, title, dates, experience} = context.resumeContent.work[index];
        return (
            <WorkExpInput employer={employer}title={title}dates={dates}
            experience={experience}index={index}key={index}arrayInfoChange={arrayInfoChange}
            nestedArrayInfoChange={nestedArrayInfoChange} 
            deleteArrayItem={deleteArrayItem}
            deleteNestedArrayItem={deleteNestedArrayItem}
            addNestedArrayItem={addNestedArrayItem}
            />
        ) 
    });

    const eduInputArray = education.map((item, index) => {
        const { school, major, degree, date, freeform } = context.resumeContent.education[index]
        const { arrayInfoChange, deleteArrayItem } = context;
        return (
            <EduInput school={school} major={major} degree={degree} date={date} freeform={freeform} index={index}
            arrayInfoChange={arrayInfoChange}deleteArrayItem={deleteArrayItem}
            />
        )
    });

    return (
        <div style={{width: '50%', borderTop: '1px solid #444', borderRight: '1px solid #444', padding: '1em', overflowY: 'auto', height: '100vh'}}>
            <PersonalInfoInput />
            <WorkExpInputGroup workExpInputArray={workExpInputArray} addArrayItem={addArrayItem}/>
            <EduInputGroup eduInputArray={eduInputArray} addArrayItem={addArrayItem} />
            <SkillInput skills={skills}/>
        </div>
    )
};

export default ResumeInput;