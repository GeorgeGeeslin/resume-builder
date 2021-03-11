import React, { useContext } from 'react';
import Context from '../../context/Context';
import {sectionHeadLine, sectionSeparatorSmall} from '../../components/ui/previewElements';
//Components
import WorkExp from '../../components/resumePreview/WorkExp';
import BasicInfo from '../../components/resumePreview/BasicInfo';
import Edu from '../../components/resumePreview/themes/default/Edu';
import Contact from '../../components/resumePreview/Contact';
import Skills from '../../components/resumePreview/themes/default/Skills';

const Default = () => {

    const context = useContext(Context);
    const {name, phone, email} = context.resumeContent;
    const {role, profile} = context.resumeContent.desired_position;
    const work = context.resumeContent.work;
    const education = context.resumeContent.education;
    const {street1, street2, city, state, zip} = context.resumeContent.address;
    const {facebook, twitter, linkedin, github, portfolio, otherLink} = context.resumeContent.links;
    const {skills} = context.resumeContent.skills;
    
    const workComponents = work.map((item, index) => {
        const {employer, title, dates, experience, current, city, state} = work[index];
        return <WorkExp key={index} index={index} employer={employer} title={title} dates={dates} experience={experience} current={current} city={city} state={state}/>
    });
    
    const eduComponents = education.map((item, index) => {
        const {school, degree, major, dates, coursework, gpa, current} = education[index]; 
        return <Edu key={index} index={index} school={school} degree={degree} major={major} dates={dates} coursework={coursework} gpa={gpa} current={current}/>
    });

    return (
        <div id="contentHolder" style={{display: "flex"}}>
            {/*maincontent*/}
            <div id="maincontent" style={{display: 'block', width: '75%', marginRight: "2rem"}}>
                <div style={sectionSeparatorSmall}>
                    <BasicInfo name={name} phone={phone} email={email} role={role} profile={profile}/>                      
                </div>
                { workComponents.length > 0 && <div style={sectionHeadLine()}>Experience</div> } 
                {workComponents}
            </div>
            {/*sidebar*/}
            <div id="sidebar" style={{width: '25%'}}>
                <div style={sectionSeparatorSmall}>
                    <Contact street1={street1}street2={street2}city={city}state={state}zip={zip}phone={phone}email={email}
                        facebook={facebook}twitter={twitter}linkedin={linkedin}github={github}portfolio={portfolio}otherLink={otherLink}
                    />
                </div>
                { skills.length > 0 &&
                    <div style={sectionSeparatorSmall}>
                        <div style={sectionHeadLine()}>Skills</div>
                        <Skills />
                    </div>
                }
                { eduComponents.length > 0 && <div style={sectionHeadLine()}>Education</div> }
                { eduComponents }
            </div> 
        </div>   
    );
};

export default Default;