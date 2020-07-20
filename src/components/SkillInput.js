import React from 'react';
import {Grouper, SectionHeader, Skill, Input, FlexGroup, ItemGrouper} from '../components/ui/elements';

const SkillInput = ({skills}) => {

    const uncategorized = skills.uncategorized.map((skill, index) => {
        return (
            <Skill skill={skill} />
        )
    })

 /* eventually would like to have skill grouping by category
    let skillGroups = [];
    for (const [key] of Object.entries(skills)) {
        skillGroups.push(
            {key}   
        )
    };

    const skillies = skillGroups.map((skill, index) => {
        return (
            <div>
                {skill.toString()}
            </div>
        )
    })
*/


    return (
        <div>
            <Grouper>
                <SectionHeader>Skills</SectionHeader>
                <FlexGroup>
                    <div>
                        <label htmlFor="addSkill">Skill</label>
                        <Input id="addSkill" /> 
                    </div>
                </FlexGroup>
                {uncategorized}
            </Grouper>
        </div>
    )
}

export default SkillInput;