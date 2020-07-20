import React from 'react';
import {Grouper, SectionHeader, AddButton} from './ui/elements';

const WorkExpInputGroup = ({workExpInputArray, addArrayItem}) => {

    return (
        <Grouper>
            <SectionHeader>Work Experience</SectionHeader>
            {workExpInputArray}
            < AddButton label="Add Work Experience"
                onClickFunc={() => addArrayItem(
                    {
                        newObj: {
                            employer: "",
                            title: "",
                            dates: [{start: "", end: ""}],
                            experience: ""
                        },
                        key: 'work'
                    }
            )}/>
        </Grouper>
    )
};

export default WorkExpInputGroup;