import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {FlexGroup, Input, Close, SubsectionHeader, ItemGrouper} from '../ui/elements';
import {modules} from '../ui/quill-config';
import ReactTooltip from "react-tooltip";

const EduInput = ({ school, major, degree, date, freeform, index, arrayInfoChange, deleteArrayItem}) => {
    const key = 'education';
    return (
        <ItemGrouper>
            <SubsectionHeader>Education {index + 1}:</SubsectionHeader>
            <Close 
                onClickFunc={() => deleteArrayItem({key, index})} 
                label="education item"
                highlightClass="deleteHighlight"
            />
            <FlexGroup>
                <div style={{width: '50%', marginRight: '1em'}}>
                    <label htmlFor="school">School</label>
                    <Input type='text' value={school} id="school" onChange={(e) => arrayInfoChange(
                        {
                            payload: e.target.value,
                            key,
                            index,
                            name: "school"
                        }
                    )}/>
                </div>
                <div style={{width: '50%'}}>
                    <label htmlFor="degree">Degree</label>
                    <Input type='text' value={degree} id="degree" onChange={(e) => arrayInfoChange(
                        {
                            payload: e.target.value,
                            key,
                            index,
                            name: "degree"
                        }
                    )}/> 
                </div>
            </FlexGroup>
            <FlexGroup>
                <div style={{width: '50%', marginRight: '1em'}}>
                    <label htmlFor="major">Major</label>
                    <Input type='text' value={major} id="major" onChange={(e) => arrayInfoChange(
                        {
                            payload: e.target.value,
                            key,
                            index,
                            name: "major"
                        }
                    )}/>  
                </div>
                <div style={{width: '50%'}}>
                    <label htmlFor="date">Graduation Date</label>
                    <Input type='text' value={date} id="date" onChange={(e) => arrayInfoChange(
                        {
                            payload: e.target.value,
                            key,
                            index,
                            name: "date"
                        }
                    )}/>
                </div>
            </FlexGroup>
            <div style={{padding: '0.25em'}}>
                <label htmlFor="customEdu">Custom Text</label>
                <ReactQuill value={freeform} 
                    theme="snow"
                    modules={modules}
                    id="customEdu"
                    onChange={(html) => arrayInfoChange(
                        {
                            payload: html, 
                            key,
                            index,
                            name: "freeform"
                        }
                )}/>
            </div>
            <ReactTooltip /> 
        </ItemGrouper>
    )
};

export default EduInput;