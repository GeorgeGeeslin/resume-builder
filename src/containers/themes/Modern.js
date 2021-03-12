import React, { useContext } from 'react';
import Context from '../../context/Context';
import {sectionHeadLine, sectionSeparatorSmall} from '../../components/ui/previewElements';
//Components
import WorkExp from '../../components/resumePreview/WorkExp';
import BasicInfo from '../../components/resumePreview/BasicInfo';
import Edu from '../../components/resumePreview/themes/default/Edu';
import Contact from '../../components/resumePreview/Contact';
import Skills from '../../components/resumePreview/themes/default/Skills';

import Header from '../../components/resumePreview/themes/modern/Header';

const Modern = () => {

  const context = useContext(Context);
  const {name, phone, email, resumeHeight} = context.resumeContent;
  const {role, profile} = context.resumeContent.desired_position;
  const work = context.resumeContent.work;
  const education = context.resumeContent.education;
  const {street1, street2, city, state, zip} = context.resumeContent.address;
  const {facebook, twitter, linkedin, github, portfolio, otherLink} = context.resumeContent.links;
  const {skills} = context.resumeContent.skills; 
  const {desired_position} = context.resumeContent.sections;

  const workComponents = work.map((item, index) => {
    const {employer, title, dates, experience, current, city, state} = work[index];
    return <WorkExp key={index} index={index} employer={employer} title={title} dates={dates} experience={experience} current={current} city={city} state={state}/>
  });

  const eduComponents = education.map((item, index) => {
    const {school, degree, major, dates, coursework, gpa, current} = education[index]; 
    return <Edu key={index} index={index} school={school} degree={degree} major={major} dates={dates} coursework={coursework} gpa={gpa} current={current}/>
  });  
  
  return (
    <div id="contentHolder">
      {/*header*/}
      <Header name={name} role={role} desired_position={desired_position}/>
      <div style={{display: 'flex'}}>
        {/*sidebar*/}
        <div id="sidebar" style={{width: '30%'}}>
          <div style={sectionSeparatorSmall}>
            <div style={{borderRight: '3px solid #DAA520',  width: '80%'}}>
              <Contact street1={street1}street2={street2}city={city}state={state}zip={zip}phone={phone}email={email}
                  facebook={facebook}twitter={twitter}linkedin={linkedin}github={github}portfolio={portfolio}otherLink={otherLink}
              />
            </div>
          </div>

          { skills.length > 0 &&
          <div style={sectionSeparatorSmall}>
            <div style={{borderRight: '3px solid #DAA520',  width: '80%'}}>
                <div style={sectionHeadLine("#DAA520")}>Skills</div>
                <Skills />
            </div>
          </div>
          }
          { eduComponents.length > 0 && 
          <div style={{borderRight: '3px solid #DAA520',  width: '80%'}}>
          <div style={sectionHeadLine('#DAA520')}>Education</div>
            { eduComponents }      
          </div>
          }
        </div>
        {/*maincontent*/}
        <div id="maincontent" style={{width: '70%'}}>
          <div style={sectionSeparatorSmall}>
            { (profile && desired_position) &&
            <>
              <div style={sectionHeadLine("#DAA520")}>Profile</div>
              <div style={{fontSize: '16px', paddingTop: '0.5em'}}>{profile}</div>
            </>
            }
          </div>
          { workComponents.length > 0 && <div style={sectionHeadLine("#DAA520")}>Experience</div> } 
          {workComponents}
        </div>
      </div>
    </div>
  );
};

export default Modern;