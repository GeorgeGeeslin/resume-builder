import React from 'react';
 
const BasicInfo = ({name, role}) => {

    const veryLargeText = {
        width: '100%',
        marginBottom: '1rem',
        fontSize: '48px',
        fontWeight: 'bold'
    }

    const largeText = {
        fontSize: '24px',
        fontWeight: 'bold'
    }

    return(
        <div>
            <div style={veryLargeText}>{name}</div>
            <div style={largeText}>{role}</div>
        </div>
    )
};

export default BasicInfo;