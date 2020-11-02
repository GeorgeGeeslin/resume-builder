import React from 'react';
import {PageBreakOverlay} from '../ui/previewElements';

const PageBreak = ({contentHeight, pageHeight, leeway}) => {



    const position = (contentHeight - pageHeight - 48 /*page margin*/) * -1;

    return (
        <div>
            { contentHeight - leeway > pageHeight &&
                <PageBreakOverlay className="pageBreakOverlay" style={{top: position}}>
                </PageBreakOverlay>
            }
        </div>
    )
};

export default PageBreak;