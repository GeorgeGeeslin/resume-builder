import React, { useContext } from 'react';
import Context from '../context/Context';
import WorkExpInput from '../components/WorkExpInput';
import EduInput from '../components/EduInput';
import PersonalInfoInput from '../components/PersonalInfoInput';
import ResumePreview from './ResumePreview';
import {Grouper} from '../components/ui/elements';

const ResumeEditor = () => {

    const context = useContext(Context);
    const work = context.resumeContent.work;
    const education = context.resumeContent.education;
    const addArrayItem = context.addArrayItem;

    const WorkExpInputComponents = work.map((item, index) => {
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

    const EduInputComponents = education.map((item, index) => {
        const { school, major, date, freeform } = context.resumeContent.education[index]
        const { arrayInfoChange, deleteArrayItem } = context;
        return (
            <EduInput school={school}major={major}date={date}freeform={freeform}index={index}
            arrayInfoChange={arrayInfoChange}deleteArrayItem={deleteArrayItem}
            />
        )
    });

    return (
        <div style={{display: 'flex', backgroundColor: '#FAFBFC'}}>
            <div style={{width: '50%', borderTop: '1px solid #444', borderRight: '1px solid #444', padding: '1em'}}>
                <Grouper>
                    <h2>Personal Info</h2>
                    <PersonalInfoInput />
                </Grouper>
                <Grouper>
                    <h2>Work Experience</h2>
                    {WorkExpInputComponents}
                    <button onClick={(e) => addArrayItem(
                        {
                            newObj: {
                                employer: "",
                                title: "",
                                dates: [{start: "", end: ""}],
                                experience: ""
                            },
                            key: 'work'
                        }
                    )}>Add Work Exp</button>
                </Grouper>
                <Grouper>
                    <h2>Education</h2>
                    {EduInputComponents}
                    <button onClick={(e) => addArrayItem(
                        {
                            newObj: {
                                school: "",
                                major: "",
                                date: "",
                                freeform: ""
                            },
                            key: 'education'
                        }
                    )}>Add Education</button>                    
                </Grouper>
            </div>
            <div style={{width: '50%', borderTop: '1px solid #444', padding: '1em'}}>
                <ResumePreview />
            </div>
        </div>
    )
};

export default ResumeEditor;