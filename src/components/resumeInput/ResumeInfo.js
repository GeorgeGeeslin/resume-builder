import React, { useContext } from 'react';
import Context from '../../context/Context';
import {FlexGroup, Input, Select, Grouper, ItemGrouper, SectionHeader, SubsectionHeader, VisabilityToggle} from '../ui/elements';

const ResumeInfo = () => {

  const context = useContext(Context);
  const {baseInfoChange} = context;
  const {resumeName} = context.resumeContent;

  return (
    <Grouper>
      <SectionHeader>Resume Info</SectionHeader>
      <ItemGrouper>
        <FlexGroup>
          <div style={{width: '100%'}}>
            <label htmlFor="resumeName">Resume Name</label>
            <Input type="text" value={resumeName} id="resumeName" onChange={(e) => baseInfoChange(
              {
                payload: e.target.value,
                name: "resumeName"
              }
            )} />
          </div>
        </FlexGroup>
      </ItemGrouper>
    </Grouper>
  );
};

export default ResumeInfo;