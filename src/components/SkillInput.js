import React from 'react';
import {Grouper, SectionHeader, SubsectionHeader, Skill, Input, FlexGroup, ItemGrouper, AddButton} from '../components/ui/elements';

const SkillInput = ({skills}) => {

    const InputGroup = () => {
        return (
            <FlexGroup>
                <div>
                    <label htmlFor="addSkill">Add Skill</label>
                    <Input id="addSkill" /> 
                </div>
                <div style={{marginTop: "auto", marginLeft: "1em"}}>
                    <AddButton label="Add Skill"/>
                </div>
            </FlexGroup>
        )
    }

    let categories = [];
    for (const [key] of Object.entries(skills)) {
        if (key !== "showCategories") {
            categories.push(key)
        }
    };

    let allSkillsArr = [];
    categories.forEach(category => {
        allSkillsArr = allSkillsArr.concat(skills[category]);
    });

    let allSkills = allSkillsArr.map((skill, index) => (
        <Skill key={index} skill={skill} />
    ));

    allSkills.unshift(
        <InputGroup />
    );

    // const allSkillsGroup = () => {
    //     return (
    //         <ItemGrouper category=""
    //     )
    // }

    let skillGroups = categories.map((category, index) => {

        const catSkills = skills[category].map((skill, index) => {
            return (
                <Skill key={index} skill={skill} />
            );
        });

        return (
            <ItemGrouper key={index} category={category}>
                <SubsectionHeader>{category}</SubsectionHeader>
                <InputGroup />
                {catSkills}
            </ItemGrouper>
        );
    });

    skillGroups.push(
        < AddButton label="Add Category"
        />
    );

    const displaySkills = skills.showCategories ? skillGroups : allSkills;

    return (
        <div>
            <Grouper>
                <SectionHeader>Skills</SectionHeader>
                {displaySkills}            
            </Grouper>
        </div>
    )
};

export default SkillInput;