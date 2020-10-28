import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {FlexGroup, Input, Close, SubsectionHeader, ItemGrouper, CurrentCheckbox, Select} from '../ui/elements';
import DateRangeInput from './DateRangeInput';
import {modules} from '../ui/quill-config';
import statesAndTerritories from '../../utils/statesAndTerritories';

const WorkExpInput = ({employer, title, dates, experience, index, arrayInfoChange, deleteArrayItem, current, city, state}) => {
    const key = 'work'
    const parentIndex = index;

    let stateOptions = statesAndTerritories.map(state => {
        const hyphen = state.indexOf("-");
        const abbr = state.slice(hyphen + 2);
        return (<option value={abbr}>{state}</option>);
    });

    stateOptions.unshift(<option value=""></option>);

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
                <div style={{width: '50%', marginRight: '1em'}}>
                    <label htmlFor={"city"+index}>City</label>
                    <Input type='text' value={city} id={"city"+index} onChange={(e) => arrayInfoChange(
                        {
                            payload: e.target.value,
                            key,
                            index,
                            name: "city"
                        }
                    )}/>
                </div>
                <div style={{width: '50%'}}>
                    <label htmlFor={"state"+index}>State</label>
                    <Select id={"state"+index} onChange={(e) => arrayInfoChange(
                        {
                            payload: e.target.value,
                            key,
                            index,
                            name: "state"
                        }
                    )}>
                        {stateOptions}
                    </Select>
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