import React, { useContext } from 'react';
import Context from '../context/Context';
import {PreviewBox, PreviewWrapper, ResumeContent, PreviewNav, IconBar, PreviewNavButton} from '../components/ui/previewElements';
import ResumePage from '../components/resumePreview/ResumePage';

//Themes 
import Default from './themes/Default';
import SingleColumn from './themes/SingleColumn';

const ResumePreview = () => {

    const context = useContext(Context);
    const {theme, resumeHeight} = context.resumeContent;

    return (
        <div id="resumePreview">
            <PreviewBox>
                <PreviewWrapper>
                    <ResumePage>
                        <ResumeContent id="ResumeContent" style={{minWidth: '8.5in', maxWidth: '8.5in'}} theme={{height: resumeHeight}}>
                            {theme === 'default' && <Default />}
                            {theme === 'singleColumn' && <SingleColumn /> }
                        </ResumeContent>
                    </ResumePage>
                </PreviewWrapper>
            </PreviewBox>
        </div>

      

    )
};

export default ResumePreview;