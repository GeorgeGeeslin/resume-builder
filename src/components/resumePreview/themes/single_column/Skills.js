import React, {useContext} from 'react';
import Context from '../../../../context/Context';
import {concatLine} from '../../../ui/helperFunctions';

const Skills = () => {

    const context = useContext(Context);
    const {skills} = context.resumeContent.skills;

    const line1 = concatLine(', ', ...skills)

    return (
        <div>
            {line1}
        </div>
    )
};

export default Skills;