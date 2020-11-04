import React from 'react';
import {concatLine, concatDateRage} from '../../../ui/helperFunctions';

const Edu = ({index, school, degree, major, dates, coursework, current, gpa}) => {

    const line1 = concatLine(' in ', degree, major,);

    const dateDisplay = concatDateRage(dates, current);
    const gpaDisplay = gpa ? `, GPA: ${gpa}` : '';



    return (
        <div>
            <div style={{marginTop: "1em", marginBottom: "0.2em", fontWeight: "bold", fontSize: "18px"}}>
                {school} <span style={{fontWeight: "normal"}}>{line1 && ` - ${line1}`}</span>
            </div>
            <div style={{marginTop: "0.2rem"}}>
                {dateDisplay}{gpa && gpaDisplay}
            </div>
                { /*coursework && 
                    <div>
                        <span>Relevant courses: </span>
                        <span className="workDesc" dangerouslySetInnerHTML={{__html: coursework}}/>
                    </div>
                */ }
        </div>
    )
};

export default Edu;