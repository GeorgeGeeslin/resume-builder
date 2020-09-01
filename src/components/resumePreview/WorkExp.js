import React from 'react';
import {concatDateRage} from '../ui/helperFunctions';

const WorkExp = ({index, employer, title, dates, experience}) => {

    const dateDisplay = concatDateRage(dates);

    return (
        <div>
            <h2 style={{margin: '0.5rem, 0px'}}>{employer}</h2>
            {dateDisplay}
            <p style={{margin: '0px', marginTop: '0.5rem', fontFamily: "'Roboto Slab', serif", fontWeight: "bold", fontSize: '14px'}}>{title}</p>
            <div dangerouslySetInnerHTML={{__html: experience}}/>
        </div>

    )
};

export default WorkExp;