import React, {useContext} from 'react';
import Context from '../../../../context/Context';

const Skills = () => {

    const context = useContext(Context);
    const {skills} = context.resumeContent.skills;

    const skillList = skills.map((skill, index) => {
        return (
            <p key={index}>{skill}</p>
        )
    });

    return (
        <div>
            {skillList}
        </div>
    )
};

export default Skills;