import React from 'react';
import {concatLine, concatDateRage} from '../ui/helperFunctions';

const Edu = ({index, school, degree, major, dates, custom}) => {

    const line1 = concatLine(' in ', degree, major,);

    const dateDisplay = concatDateRage(dates);

    return (
        <div>
            <h2>{school}</h2>
             <p style={{margin: '0px', marginTop: '0.5rem', fontFamily: "'Roboto Slab', serif", fontWeight: "bold", fontSize: '14px'}}>{line1}</p>
            <p>{dateDisplay}</p>
        </div>
    )
};

export default Edu;