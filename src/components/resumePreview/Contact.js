import React from 'react';
import {concatLine} from '../ui/helperFunctions';
 
const Contact = ({street1, street2, city, state, zip, phone, email, linkedin, github, twitter, facebook, protfolio, otherLink}) => {

    const stateZip = concatLine(' ', state, zip);
    const cityStateZip = concatLine(', ', city, stateZip);

    const urls = [linkedin, github, twitter, facebook, protfolio, otherLink];
    const links = urls.map((url, index) => (
        <p key={index}><a href={url}>{url}</a></p>
    ))

    return(
        <div>
            <p style={{fontSize: '1.2em'}}>{cityStateZip}</p>
            <p style={{fontWeight: 'bold'}}>{phone}</p>
            <p><a href={`mailto: ${email}`}>{email}</a></p>
            {links}
        </div>
    )
};

export default Contact;