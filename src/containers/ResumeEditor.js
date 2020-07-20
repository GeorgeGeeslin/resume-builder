import React from 'react';
import ResumeInput from './ResumeInput';
import ResumePreview from './ResumePreview';


const ResumeEditor = () => {

    return (
        <div style={{display: 'flex', backgroundColor: '#FAFBFC'}}>
            <ResumeInput />
            <ResumePreview />
        </div>
    )
};

export default ResumeEditor;