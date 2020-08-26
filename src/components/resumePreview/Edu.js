import React from 'react';
import {concatLine} from '../ui/helperFunctions';

const Edu = ({index, school, degree, major, date, custom}) => {

    const line1 = concatLine(', ', school, degree, major,);

    return (
        <div>
            <h3>{line1}</h3>
             <h4>{date}</h4>
        </div>
    )
};

export default Edu;