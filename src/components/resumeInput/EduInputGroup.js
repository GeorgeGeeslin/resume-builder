import React from 'react';
import {Grouper, AddButton, SectionHeader} from '../ui/elements';

const EduInputGroup = ({eduInputArray, addArrayItem}) => {

    return (
        <Grouper>
            <SectionHeader>Education</SectionHeader>
            {eduInputArray}
            < AddButton label="Add Education"
                onClickFunc={() => addArrayItem(
                    {
                        newObj: {
                            school: "",
                            major: "",
                            degree: "",
                            dates: [{start: "", end: ""}],
                            freeform: "",
                            current: false
                        },
                        key: 'education'
                    }
                )}/>  
        </Grouper>
    )
};

export default EduInputGroup;