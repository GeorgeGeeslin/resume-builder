import React, { useContext } from 'react';
import Context from '../../context/Context';
import { concatLine } from '../ui/helperFunctions';
 
const Contact = ({street1, street2, city, state, zip, phone, email, linkedin, github, twitter, facebook, portfolio, otherLink}) => {

    const context = useContext(Context);
    const {address, links} = context.resumeContent.sections;

    const stateZip = concatLine(' ', state, zip);
    const cityStateZip = concatLine(', ', city, stateZip);

    const urls = [linkedin, github, twitter, facebook, portfolio, otherLink];
    const urlLinks = urls.map((url, index) => (
        <p key={index}><a href={url}>{url}</a></p>
    ))

    return(
        <div>
            { address &&  <p style={{fontSize: '1.2em'}}>{cityStateZip}</p> }
            <p style={{fontWeight: 'bold'}}>{phone}</p>
            <p><a style={{color: 'black', textDecoration: 'none'}} href={`mailto: ${email}`}>{email}</a></p>
            { links && urlLinks}
        </div>
    )
};

export default Contact;