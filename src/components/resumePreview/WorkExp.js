import React from 'react';
import {concatLine} from '../ui/helperFunctions';

const WorkExp = ({index, employer, title, dates, experience}) => {

    const dateDisplay = dates.map((date, index) => {
        if (index >= dates.length - 1) {
            return <span key={index}>{concatLine(' - ', date.start, date.end)}</span>
        } else {
            return <span key={index}>{concatLine(' - ', date.start, date.end) + " | "}</span>
        }
    })

    return (
        <div>
            <h3>{employer}</h3>
            <h4>{title}</h4>
            {dateDisplay}
            <div dangerouslySetInnerHTML={{__html: experience}}/>
        </div>

    )
};

export default WorkExp;