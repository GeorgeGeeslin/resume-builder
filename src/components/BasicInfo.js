import React from 'react';
import {FlexGroup} from './ui/elements';

const BasicInfo = ({name, phone, email}) => {
    return(
        <FlexGroup>
            <div>{name}</div>
            <div>{phone}</div>
            <div>{email}</div>
        </FlexGroup>
    )
};

export default BasicInfo;