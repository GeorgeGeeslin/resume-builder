import React from 'react';
import { concatLine } from '../../../ui/helperFunctions';

const Skills = ({ array, label }) => {

    let line1 = "";

    if (array.length > 0) { 
        line1 = concatLine(', ', ...array);        
    }

    return (
        <div style={{marginTop: '0.5em'}}>
            {label && array.length > 0 && 
                <span style={{fontWeight: "bold"}}>{label}</span>
            }  
            {line1}
        </div>
    )
};

export default Skills;