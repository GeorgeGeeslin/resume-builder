import React from 'react';
import {concatDateRage, concatLine} from '../ui/helperFunctions';
import {WorkDesc} from '../ui/previewElements.js';

const WorkExp = ({index, employer, title, dates, experience, current, city, state}) => {

    const dateDisplay = concatDateRage(dates, current);

    const cityState = concatLine(', ', city, state);

    // cityState = cityState ? "  " + cityState : cityState;

    return (
        <div>
            <div style={{marginTop: "1em", marginBottom: "0.2em", fontWeight: "bold", fontSize: "18px"}}>{employer}</div>
            <p style={{margin: '0px', fontWeight: "bold", fontSize: "15px"}}>
                {title}
                <span style={{fontSize: '12px', fontWeight: "normal"}}>  {cityState}</span>
            </p>
            <div style={{marginTop: '0.2rem'}}>{dateDisplay}</div>
            <WorkDesc className="workDesc" dangerouslySetInnerHTML={{__html: experience}}/>
        </div>

    )
};

export default WorkExp;