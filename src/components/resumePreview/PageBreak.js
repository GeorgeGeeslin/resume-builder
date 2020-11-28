import React from 'react';
import {PageBreakOverlay} from '../ui/previewElements';

const PageBreak = ({resumeHeight, contentHeight, pageHeight}) => {


    // const position = (contentHeight - pageHeight - 48 /*page margin*/) * -1;

    // const position = -1 * (pageHeight + 108)
    const resumeHeightInt = parseInt(resumeHeight.slice(0,-2));

    const position = - 1 * ((resumeHeightInt / 2) +5) + "px"

    return (
        <div>
            { contentHeight  > pageHeight  &&
                <PageBreakOverlay className="pageBreakOverlay" style={{top: position}}>
                </PageBreakOverlay>
            }
        </div>
    )
};

export default PageBreak;