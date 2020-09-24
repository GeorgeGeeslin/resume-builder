import React from 'react';

const PageBreak = ({breakPosition, pageHeight}) => {

    const position = (pageHeight - (breakPosition - 15)) * -1;
    // const position = -100




    return (
        <div>
            { breakPosition &&
                <div className="pageBreakOverlay" style={{position: 'relative', top: position, breakBefore: "always"}}>
                </div>
            }
        </div>
    )
};

export default PageBreak;