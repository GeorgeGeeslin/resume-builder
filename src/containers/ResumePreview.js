import React, { useContext } from 'react';
import Context from '../context/Context';
import {PreviewBox, ResumePage} from '../components/ui/previewElements';
//Components
import WorkExp from '../components/resumePreview/WorkExp';
import BasicInfo from '../components/resumePreview/BasicInfo';
import Edu from '../components/resumePreview/Edu';
import Contact from '../components/resumePreview/Contact';

const ResumePreview = () => {
    const context = useContext(Context);
    const {name, phone, email} = context.resumeContent;
    const {role, profile} = context.resumeContent.desired_position;
    const work = context.resumeContent.work;
    const education = context.resumeContent.education;
    const {street1, street2, city, state, zip} = context.resumeContent.address;


 

    const workComponents = work.map((item, index) => {
        const {employer, title, dates, experience} = work[index];
        return <WorkExp key={index} index={index} employer={employer} title={title} dates={dates} experience={experience}/>
    });

    const eduComponents = education.map((item, index) => {
        const {school, degree, major, date, freeform} = education[index]; 
        return <Edu key={index} index={index} school={school} degree={degree} major={major} date={date} freeform={freeform}/>
    });

    return (
       <PreviewBox>
            <ResumePage>
                <div style={{display: 'flex'}}>
                    {/*maincontent*/}
                    <div style={{display: 'block', width: '66%'}}>
                        <BasicInfo name={name} phone={phone} email={email} role={role} profile={profile}/>
                        {workComponents}
                        {eduComponents}
                    </div>
                    {/*sidebar*/}
                    <div style={{width: '33%'}}>
                        <Contact street1={street1}street2={street2}city={city}state={state}zip={zip}phone={phone}email={email}/>
                    </div>                  
                </div>
            </ResumePage>
       </PreviewBox>
    )
};

export default ResumePreview;