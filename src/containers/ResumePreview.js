import React, { useContext } from 'react';
import Context from '../context/Context';
import {PreviewBox, PreviewWrapper, ResumeContent, Preview} from '../components/ui/previewElements';
import ResumePage from '../components/resumePreview/ResumePage';

//Themes 
import Default from './themes/Default';
import SingleColumn from './themes/SingleColumn';
import Modern from './themes/Modern';

const ResumePreview = () => {

    const context = useContext(Context);
    const {theme, resumeHeight} = context.resumeContent;

    return (
        <Preview>
            <PreviewBox>
                <PreviewWrapper>
                    <ResumePage>
                        <ResumeContent id="ResumeContent" style={{minWidth: '8.5in', maxWidth: '8.5in'}} theme={{height: resumeHeight}}>
                            {theme === 'default' && <Default />}
                            {theme === 'singleColumn' && <SingleColumn /> }
                            {theme === 'modern' && <Modern />}
                        </ResumeContent>
                    </ResumePage>
                </PreviewWrapper>
            </PreviewBox>
        </Preview>

      

    )
};

export default ResumePreview;