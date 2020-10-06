import React from 'react';
import ResumeInput from './ResumeInput';
import ResumePreview from './ResumePreview';
import PageCountWarning from '../components/PageCountWarning';


const ResumeEditor = () => {

    return (
        <div style={{display: 'flex', backgroundColor: '#DFE1E6'}}>
            <PageCountWarning /> 
            <ResumeInput />
            <ResumePreview />
        </div>
    )
};

export default ResumeEditor;