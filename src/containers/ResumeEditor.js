import React from 'react';
import ResumeInput from './ResumeInput';
import ResumePreview from './ResumePreview';


const ResumeEditor = () => {

    return (
        <div style={{display: 'flex', backgroundColor: '#DFE1E6'}}>
            <ResumeInput />
            <ResumePreview />
        </div>
    )
};

export default ResumeEditor;