import React from 'react';
import {concatLine, concatDateRage} from '../ui/helperFunctions';

const Edu = ({index, school, degree, major, dates, freeform, current, gpa}) => {

    const line1 = concatLine(' in ', degree, major,);

    const dateDisplay = concatDateRage(dates, current);
    const gpaDisplay = gpa ? `GPA: ${gpa}` : '';



    return (
        <div>
            <div style={{marginTop: "1em", marginBottom: "0.2em", fontWeight: "bold", fontSize: "18px"}}>{school}</div>
             <p style={{margin: '0px', fontWeight: "bold", fontSize: '15px'}}>{line1}</p>
            <div style={{marginTop: "0.2rem"}}>{dateDisplay}</div>
            {gpa && <p>GPA: {gpa}</p>}
        </div>
    )
};

export default Edu;