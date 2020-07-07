import React, { useContext } from 'react';
import Context from '../context/Context';
import WorkExp from '../components/WorkExp';

const ResumePreview = () => {
    const context = useContext(Context);
    const work = context.resumeContent.work;
    const {name, phone, email} = context.resumeContent;

    const workComponents = work.map((item, index) => {
        const {employer, title, dates, experience} = context.resumeContent.work[index]
        return <WorkExp key={index} index={index} employer={employer} title={title} dates={dates} experience={experience}/>
    });

    return (
        <div>
            {name}
            {workComponents}
        </div>
    )
};

export default ResumePreview;