import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import WorkExpInput from '../components/resumeInput/WorkExpInput';
import WorkExpInputGroup from '../components/resumeInput/WorkExpInputGroup';
import EduInput from '../components/resumeInput/EduInput';
import EduInputGroup from '../components/resumeInput/EduInputGroup';
import PersonalInfoInput from '../components/resumeInput/PersonalInfoInput';
import Skillwrapper from '../components/resumeInput/Skillwrapper';
import ResumeName from '../components/resumeInput/ResumeName';
import { ResumeNameWrapperBody, CollapseCircle, ResumeInputWrapper } from '../components/ui/elements';
import { FaArrowLeft } from 'react-icons/fa';
import { IconContext } from "react-icons";

const ResumeInput = () => {

    const context = useContext(Context);
    const work = context.resumeContent.work;
    const education = context.resumeContent.education;
    const addArrayItem = context.addArrayItem;

    const [css, setCss] = useState({width: '50%', minWidth: '450px', display: 'block'});

    const workExpInputArray = work.map((item, index) => {
        const { employer, title, dates, experience, current, city, state } = context.resumeContent.work[index];
        const { arrayInfoChange, deleteArrayItem } = context;
        return (
            <WorkExpInput employer={employer}title={title}dates={dates}
                experience={experience}index={index}key={index}arrayInfoChange={arrayInfoChange}
                deleteArrayItem={deleteArrayItem}current={current}city={city}state={state}
            />
        ) 
    });

    const eduInputArray = education.map((item, index) => {
        const { school, major, degree, dates, gpa, coursework, addCoursework, current } = context.resumeContent.education[index]
        const { arrayInfoChange, deleteArrayItem } = context;
        return (
            <EduInput key={index} school={school} major={major} degree={degree} dates={dates} coursework={coursework} index={index}
                addCoursework={addCoursework} arrayInfoChange={arrayInfoChange}deleteArrayItem={deleteArrayItem}
                gpa={gpa}current={current}
            />
        )
    });

    const handleCollapse = () => {
        const circ = document.getElementById('collapse');
        const pannel = document.getElementById('resumeInput');

        if (circ.classList.contains('rotate180')) {
            circ.classList.add('rotate180back');
            circ.classList.remove('rotate180');

            setCss({width: '50%', minWidth: '450px', display: 'block'});

        } else {
            circ.classList.add('rotate180');
            circ.classList.remove('rotate180back');

            setCss({width: '2em', minWidth: '2em', display: 'none', background: '#99a2b0'});
        }
    };

    return (
        <ResumeInputWrapper width={css.width} minWidth={css.minWidth} display={css.display} background={css.background} id='resumeInput'>
            <CollapseCircle onClick={handleCollapse} id='collapse'>
                <IconContext.Provider value={{size: '1.2em', color: 'white'}}>
                    <FaArrowLeft/>
                </IconContext.Provider>
            </CollapseCircle>
            <div className="hideable-inputs">
                <ResumeNameWrapperBody>
                    <ResumeName />
                </ResumeNameWrapperBody>
                <PersonalInfoInput />
                <WorkExpInputGroup workExpInputArray={workExpInputArray} addArrayItem={addArrayItem}/>
                <EduInputGroup eduInputArray={eduInputArray} addArrayItem={addArrayItem} />
                <Skillwrapper />
            </div>
        </ResumeInputWrapper>
    )
};

export default ResumeInput;