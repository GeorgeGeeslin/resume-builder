import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {FlexGroup, Input, Close, DateClose, SubsectionHeader, AddDate, ItemGrouper} from '../ui/elements';
import {modules} from '../ui/quill-config';
import ReactTooltip from "react-tooltip";

const WorkExpInput = ({employer, title, dates, experience, index, arrayInfoChange, nestedArrayInfoChange, deleteArrayItem, deleteNestedArrayItem, addNestedArrayItem}) => {
    const key = 'work'
    const parentIndex = index;

    const dateInput = dates.map((date, index) => {
        return (
            <FlexGroup key={index} style={{width: '44%'}}>
                <div style={{width: '50%', marginRight: '1em'}}>
                    <label htmlFor={"dateStart"+index}>Start Date</label>
                    <Input type="text" name="start" value={date.start} 
                        id={"dateStart"+index} data-parent="work" data-parent-index={parentIndex}data-key="dates" 
                        data-index={index} onChange={nestedArrayInfoChange}
                    />
                </div>
                <div style={{width: '50%'}}>
                    <label htmlFor={"dateEnd"+index}>End Date</label>
                    { index > 0 &&
                        <DateClose onClickFunc={(e) => deleteNestedArrayItem(
                                {
                                    parent: 'work',
                                    key: 'dates',
                                    parentIndex,
                                    index 
                                }
                            )} 
                            highlightClass="deleteHighlightNoBorder" 
                        />
                    }
                    <ReactTooltip /> 
                    <Input type="text" name="end" value={date.end} 
                        id={"dateEnd"+index} data-parent="work" data-parent-index={parentIndex}data-key="dates" 
                        data-index={index} onChange={nestedArrayInfoChange}
                    />
                </div>
            </FlexGroup>
        )
    });

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
                    <label htmlFor="employer">Employer</label>
                    <Input type='text' value={employer} id="employer" onChange={(e) => arrayInfoChange(
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
                    <label htmlFor="title">Title</label>
                    <Input type='text' value={title} id="title" onChange={(e) => arrayInfoChange(
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
            <div style={{width: '100%', display: 'flex', flexFlow: 'row wrap'}}>
                {dateInput} 
                <AddDate onClickFunc={() => addNestedArrayItem(
                    {
                        parent: 'work',
                        key: 'dates',
                        parentIndex
                    }
                )} />
            </div> 
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