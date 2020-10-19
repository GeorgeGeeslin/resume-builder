import React, { useContext } from 'react';
import Context from '../context/Context';
import WorkExpInput from '../components/resumeInput/WorkExpInput';
import WorkExpInputGroup from '../components/resumeInput/WorkExpInputGroup';
import EduInput from '../components/resumeInput/EduInput';
import EduInputGroup from '../components/resumeInput/EduInputGroup';
import PersonalInfoInput from '../components/resumeInput/PersonalInfoInput';
import SkillInput from '../components/resumeInput/SkillInput';

const ResumeInput = () => {

    const context = useContext(Context);
    const work = context.resumeContent.work;
    const education = context.resumeContent.education;
    const addArrayItem = context.addArrayItem;

    const workExpInputArray = work.map((item, index) => {
        const { employer, title, dates, experience, current } = context.resumeContent.work[index];
        const { arrayInfoChange, deleteArrayItem } = context;
        return (
            <WorkExpInput employer={employer}title={title}dates={dates}
                experience={experience}index={index}key={index}arrayInfoChange={arrayInfoChange}
                deleteArrayItem={deleteArrayItem}current={current}
            />
        ) 
    });

    const eduInputArray = education.map((item, index) => {
        const { school, major, degree, dates, gpa, freeform, current } = context.resumeContent.education[index]
        const { arrayInfoChange, deleteArrayItem } = context;
        return (
            <EduInput key={index} school={school} major={major} degree={degree} dates={dates} freeform={freeform} index={index}
                arrayInfoChange={arrayInfoChange}deleteArrayItem={deleteArrayItem}
                gpa={gpa}current={current}
            />
        )
    });

    return (
        <div style={{width: '40%', borderTop: '1px solid #444', borderRight: '1px solid #444', padding: '1em', overflowY: 'auto', height: '100vh'}}>
            <PersonalInfoInput />
            <WorkExpInputGroup workExpInputArray={workExpInputArray} addArrayItem={addArrayItem}/>
            <EduInputGroup eduInputArray={eduInputArray} addArrayItem={addArrayItem} />
            <SkillInput />
        </div>
    )
};

export default ResumeInput;