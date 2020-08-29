import React, { useContext } from 'react';
import Context from '../../context/Context';
import {FlexGroup, Input, DateClose, AddDate} from '../ui/elements';
import ReactTooltip from "react-tooltip";


const DateRangeInput = ({dates, parentIndex, parent}) => {

    const context = useContext(Context);
    const { nestedArrayInfoChange, deleteNestedArrayItem, addNestedArrayItem } = context;

    const dateInput = dates.map((date, index) => {
        return (
            <FlexGroup key={index} style={{width: '44%'}}>
                <div style={{width: '50%', marginRight: '1em'}}>
                    <label htmlFor={"dateStart"+parent+parentIndex+'-'+index}>Start Date</label>
                    <Input type="text" name="start" value={date.start} 
                        id={"dateStart"+parent+parentIndex+'-'+index} data-parent="work" data-parent-index={parentIndex}data-key="dates" 
                        data-index={index} onChange={nestedArrayInfoChange}
                    />
                </div>
                <div style={{width: '50%'}}>
                    <label htmlFor={"dateEnd"+parent+parentIndex+'-'+index}>End Date</label>
                    { index > 0 &&
                        <DateClose onClickFunc={(e) => deleteNestedArrayItem(
                                {
                                    parent,
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
                        id={"dateEnd"+parent+parentIndex+'-'+index} data-parent="work" data-parent-index={parentIndex}data-key="dates" 
                        data-index={index} onChange={nestedArrayInfoChange}
                    />
                </div>
            </FlexGroup>
        )
    });
    
    return (
        <div style={{width: '100%', display: 'flex', flexFlow: 'row wrap'}}>
            {dateInput}
            <AddDate onClickFunc={() => addNestedArrayItem(
                {
                    parent,
                    key: 'dates',
                    parentIndex
                }
            )} />
        </div>
    )
};

export default DateRangeInput

