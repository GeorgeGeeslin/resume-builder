import React, { useContext } from 'react';
import Context from '../context/Context';
import {PreviewBox, PreviewWrapper} from '../components/ui/previewElements';
//Components
import WorkExp from '../components/resumePreview/WorkExp';
import BasicInfo from '../components/resumePreview/BasicInfo';
import Edu from '../components/resumePreview/Edu';
import Contact from '../components/resumePreview/Contact';
import Skills from '../components/resumePreview/Skills';
import ResumePage from '../components/resumePreview/ResumePage';

const ResumePreview = () => {
    const context = useContext(Context);
    const {name, phone, email} = context.resumeContent;
    const {role, profile} = context.resumeContent.desired_position;
    const work = context.resumeContent.work;
    const education = context.resumeContent.education;
    const {street1, street2, city, state, zip} = context.resumeContent.address;
    const {facebook, twitter, linkedin, github, portfolio, otherLink} = context.resumeContent.links;


    const workComponents = work.map((item, index) => {
        const {employer, title, dates, experience} = work[index];
        return <WorkExp key={index} index={index} employer={employer} title={title} dates={dates} experience={experience}/>
    });

    const eduComponents = education.map((item, index) => {
        const {school, degree, major, dates, freeform} = education[index]; 
        return <Edu key={index} index={index} school={school} degree={degree} major={major} dates={dates} freeform={freeform}/>
    });

    const sectionHeadLine = 
    {
        color: "#0052CC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: "16px"
    }

    const sectionSeparatorLarge = {
        paddingBottom: '4em'
    };

    const sectionSeparatorMedium = {
        paddingBottom: '3em'
    }

    const sectionSeparatorSmall = {
        paddingBottom: '1.5em'
    }

    return (
       <PreviewBox>
           <PreviewWrapper>
                <ResumePage>
                        <div style={{display: 'flex'}}>
                            {/*maincontent*/}
                            <div style={{display: 'block', width: '66%'}}>
                                <div style={sectionSeparatorLarge}>
                                <BasicInfo name={name} phone={phone} email={email} role={role} profile={profile}/>                      
                                </div>
                                <h1 style={sectionHeadLine}>Experience</h1>
                                {workComponents}

                            </div>
                            {/*sidebar*/}
                            <div style={{width: '33%'}}>
                                <div style={sectionSeparatorMedium}>
                                    <Contact street1={street1}street2={street2}city={city}state={state}zip={zip}phone={phone}email={email}
                                    facebook={facebook}twitter={twitter}linkedin={linkedin}github={github}portfolio={portfolio}otherLink={otherLink}
                                    />
                                </div>
                                <div style={sectionSeparatorSmall}>
                                    <div style={sectionHeadLine}>Skills</div>
                                    <Skills />
                                </div>
                                <div style={sectionHeadLine}>Education</div>
                                {eduComponents}
                            </div>                  
                        </div>
                    </ResumePage>
           </PreviewWrapper>

       </PreviewBox>
    )
};

export default ResumePreview;