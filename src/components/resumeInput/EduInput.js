import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DateRangeInput from './DateRangeInput';
import {FlexGroup, Input, Close, SubsectionHeader, ItemGrouper, CurrentCheckbox} from '../ui/elements';
import {modules} from '../ui/quill-config';
import ReactTooltip from "react-tooltip";

const EduInput = ({ school, major, degree, dates, gpa, freeform, index, arrayInfoChange, deleteArrayItem, current}) => {
    const key = 'education';
    const parentIndex = index;

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
                    <label htmlFor="date">GPA</label>
                    <Input type='text' value={gpa} id="gpa" onChange={(e) => arrayInfoChange(
                        {
                            payload: e.target.value,
                            key,
                            index,
                            name: "gpa"
                        }
                    )}/>
                </div> 
            </FlexGroup>
            <FlexGroup>
                <CurrentCheckbox label="Currently Enrolled Here?" value={current} onClickFunc={(e) => arrayInfoChange(
                    {
                        payload: !current,
                        key,
                        index,
                        name: "current"
                    }
                )}/>
            </FlexGroup>
            <DateRangeInput dates={dates} parentIndex={parentIndex} parent='education' current={current}/>   
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