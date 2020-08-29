import React from 'react';
import {TextVeryLarge, TextLarge} from '../ui/previewElements';
 
const BasicInfo = ({name, role}) => {
    return(
        <div>
            <TextVeryLarge style={{width: '100%', marginBottom: '1rem'}}>{name}</TextVeryLarge>
            <TextLarge>{role}</TextLarge>
        </div>
    )
};

export default BasicInfo;