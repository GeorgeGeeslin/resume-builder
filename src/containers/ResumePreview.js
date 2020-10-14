import React, { useContext } from 'react';
import Context from '../context/Context';
import {PreviewBox, PreviewWrapper, ResumeContent} from '../components/ui/previewElements';
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

    // TODO: refactor styles to their own file.
    // Note: Styles that must be sent to the backend pdf generator must be in-line. External CSS and Styled-Components will be lost.
    const sectionHeadLine = {
        color: "#0052CC",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: "16px"
    };

/*
    const sectionSeparatorLarge = {
        paddingBottom: '4em'
    };

    const sectionSeparatorMedium = {
        paddingBottom: '3em'
    };
*/    

    const sectionSeparatorSmall = {
        paddingBottom: '1.5em'
    };

    return (
        <PreviewBox>
            <PreviewWrapper>
                <ResumePage>
                    <ResumeContent id="ResumeContent" style={{display: 'flex'}}>
                        {/*maincontent*/}
                        <div id="maincontent" style={{display: 'block', width: '66%', marginRight: "2rem"}}>
                            <div style={sectionSeparatorSmall}>
                                <BasicInfo name={name} phone={phone} email={email} role={role} profile={profile}/>                      
                            </div>
                            <h1 style={sectionHeadLine}>Experience</h1>
                            {workComponents}
                        </div>
                        {/*sidebar*/}
                        <div id="sidebar" style={{width: '33%'}}>
                            <div style={sectionSeparatorSmall}>
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
                    </ResumeContent>
                </ResumePage>
            </PreviewWrapper>
        </PreviewBox>
    )
};

export default ResumePreview;