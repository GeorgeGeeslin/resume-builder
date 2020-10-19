import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {FlexGroup, Input, Close, SubsectionHeader, ItemGrouper, CurrentCheckbox} from '../ui/elements';
import DateRangeInput from './DateRangeInput';
import {modules} from '../ui/quill-config';

const WorkExpInput = ({employer, title, dates, experience, index, arrayInfoChange, deleteArrayItem, current}) => {
    const key = 'work'
    const parentIndex = index;

    return (
        <ItemGrouper>
            <SubsectionHeader>Work Experience {index + 1}:</SubsectionHeader>
            <Close 
                onClickFunc={() => deleteArrayItem({key, index})} 
                label="work experience"
                highlightClass="deleteHighlight"
            />
            <FlexGroup>
                <div style={{width: '50%', marginRight: '1em'}}>
                    <label htmlFor={"employer"+index}>Employer</label>
                    <Input type='text' value={employer} id={"employer"+index} onChange={(e) => arrayInfoChange(
                        {
                            payload: e.target.value,
                            key,
                            index,
                            name: "employer"
                        }
                        )}
                    />
                </div>
                <div style={{width: '50%'}}>
                    <label htmlFor={"title"+index}>Title</label>
                    <Input type='text' value={title} id={"title"+index} onChange={(e) => arrayInfoChange(
                        {
                            payload: e.target.value,
                            key,
                            index,
                            name: "title"
                        }
                        )}
                    />  
                </div>  
            </FlexGroup>
            <FlexGroup>
                <CurrentCheckbox label="Currently Employed Here?" value={current} onClickFunc={(e) => arrayInfoChange(
                    {
                        payload: !current,
                        key: "work",
                        index,
                        name: "current"
                    }
                )}/>
            </FlexGroup>
            <DateRangeInput dates={dates} parentIndex={parentIndex} parent='work' current={current}/>
            <div style={{padding: '0.25em'}}>
                <label htmlFor="workDesc">Details</label>        
                <ReactQuill value={experience} 
                    theme="snow"
                    modules={modules}
                    id="workDesc"
                    onChange={(html) => arrayInfoChange(
                        {
                            payload: html, 
                            key,
                            index,
                            name: "experience"
                        }
                    )}
                />  
            </div>            
        </ItemGrouper>
    )
};

export default WorkExpInput;