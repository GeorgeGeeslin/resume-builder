import React, {useContext, useEffect} from 'react';
import Context from '../context/Context';
import ResumeInput from './ResumeInput';
import ResumePreview from './ResumePreview';
import PageCountWarning from '../components/PageCountWarning';
import ThemeMenu from "../components/ThemeMenu";

const ResumeEditor = () => {

    // const context = useContext(Context);
    // const {resumeId} = context.configState;
    // const resumeContent = context.resumeContent;
    // const {updateUserMeta} = context;

    // useEffect(() => {
    //     updateUserMeta(resumeId, resumeContent);
    // }, [resumeId]);

    return (
        <div style={{display: 'flex', backgroundColor: '#DFE1E6'}}>
            <PageCountWarning /> 
            <ResumeInput />
            <ResumePreview />
            <ThemeMenu />
        </div>
    )
};

export default ResumeEditor;