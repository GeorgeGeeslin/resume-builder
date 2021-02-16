import React, {useContext} from 'react';
import Context from '../../context/Context';
import {Input} from '../ui/elements';

const ResumeName = () => {

  const context = useContext(Context);
  const {baseInfoChange} = context;
  const {resumeName} = context.resumeContent;

  return (
    <Input type="text" placeholder="Resume Name" value={resumeName} id="resumeName" onChange={(e) => baseInfoChange(
      {
        payload: e.target.value,
        name: "resumeName"
      }
    )} />
  );
};

export default ResumeName;