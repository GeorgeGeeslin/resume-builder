import React from 'react';
import {concatLine} from '../ui/helperFunctions';
 
const Contact = ({street1, street2, city, state, zip, phone, email}) => {

    const stateZip = concatLine(' ', state, zip);
    const cityStateZip = concatLine(', ', city, stateZip);

    return(
        <div>
            <p style={{fontSize: '1.2em'}}>{cityStateZip}</p>
            <p style={{fontWeight: 'bold'}}>{phone}</p>
            <p>{email}</p>
        </div>
    )
};

export default Contact;