import React, {useContext} from 'react'
import Context from '../context/Context';
import {WarningMessage} from './ui/elements';

const PageCountWarning = () => {

    const context = useContext(Context);
    const {pageCount} = context.resumeContent;

    return (
        <div>
            { pageCount > 2 && 
                <WarningMessage>
                    <p>WARNGING: Resumes over two pages in length are not supported at this time.</p>
                </WarningMessage>
            }
        </div>
    )
};

export default PageCountWarning;