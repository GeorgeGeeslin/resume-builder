import React from 'react';

const PageBreak = ({contentHeight, pageHeight, leeway}) => {

    const position = (contentHeight - pageHeight) * -1;

    return (
        <div>
            { contentHeight - leeway > pageHeight &&
                <div className="pageBreakOverlay" style={{position: 'relative', top: position, breakBefore: "always"}}>
                </div>
            }
        </div>
    )
};

export default PageBreak;