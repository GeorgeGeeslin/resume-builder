import React from 'react';
import {concatDateRage, concatLine} from '../ui/helperFunctions';

const WorkExp = ({index, employer, title, dates, experience, current, city, state}) => {

    const dateDisplay = concatDateRage(dates, current);

    const cityState = concatLine(', ', city, state);

    // cityState = cityState ? "  " + cityState : cityState;

    return (
        <div>
            <h2 style={{margin: '0.5rem, 0px'}}>{employer}</h2>
            {dateDisplay}
            <p style={{margin: '0px', marginTop: '0.5rem', fontFamily: "'Roboto Slab', serif", fontWeight: "bold", fontSize: '14px'}}>
                {title}
                <span style={{fontSize: '12px', fontFamily:"'Roboto', Sans-Serif", fontWeight: "normal"}}>  {cityState}</span>
            </p>
            <div dangerouslySetInnerHTML={{__html: experience}}/>
        </div>

    )
};

export default WorkExp;