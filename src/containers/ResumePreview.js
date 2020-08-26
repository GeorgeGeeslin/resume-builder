import React, { useContext } from 'react';
import Context from '../context/Context';
import WorkExp from '../components/resumePreview/WorkExp';
import BasicInfo from '../components/resumePreview/BasicInfo';
import Edu from '../components/resumePreview/Edu';
import {PreviewBox, ResumePage} from '../components/ui/previewElements';

const ResumePreview = () => {
    const context = useContext(Context);
    const {name, phone, email} = context.resumeContent;
    const work = context.resumeContent.work;
    const education = context.resumeContent.education;


 

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
                <BasicInfo name={name} phone={phone} email={email} />
                {workComponents}
                {eduComponents}
            </ResumePage>
       </PreviewBox>
    )
};

export default ResumePreview;