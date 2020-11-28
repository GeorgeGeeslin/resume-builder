import React, { useContext } from 'react';
import Context from '../../context/Context';
import { concatLine } from '../ui/helperFunctions';
 
const Contact = ({street1, street2, city, state, zip, phone, email, linkedin, github, twitter, facebook, portfolio, otherLink}) => {

    const context = useContext(Context);
    const {address, links} = context.resumeContent.sections;

    const stateZip = concatLine(' ', state, zip);
    const cityStateZip = city ? concatLine(', ', city, stateZip) : stateZip;

    const urls = [linkedin, github, twitter, facebook, portfolio, otherLink];
    const urlLinks = urls.map((url, index) => {

    // include http protocol so that link is NOT a relative link, browser should redirect to https if needed.
    let absoluteUrl = "";
    if (url.slice(0,4) === "http") {
        absoluteUrl = url;
    } else {
        absoluteUrl = "http://" + url;
    }

       return  <p key={index}><a href={absoluteUrl} target="_blank">{url}</a></p>
    })

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