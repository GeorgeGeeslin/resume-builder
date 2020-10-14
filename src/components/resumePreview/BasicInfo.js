import React, {useContext} from 'react';
import Context from '../../context/Context';
 
const BasicInfo = ({name, role, profile}) => {

    const context = useContext(Context);
    const {desired_position} = context.resumeContent.sections;

    //in-line styles required for html payload.
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
            { desired_position &&
                <div>
                    { role && <div style={largeText}>{role}</div> }
                    { profile && 
                        <div>
                            <p><span style={{fontSize: '16px', fontWeight: 'bold', display:'block', paddingBottom: '0.5em'}}>Profile:</span>{profile}</p>
                        </div> 
                    }
                </div>
            }
        </div>
    )
};

export default BasicInfo;