import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EduInput = ({ school, major, date, freeform, index, arrayInfoChange, deleteArrayItem}) => {
    const key = 'education';
    return (
        <div>
            <label htmlFor="school">School</label>
            <input type='text' value={school} id="school" onChange={(e) => arrayInfoChange(
                {
                    payload: e.target.value,
                    key,
                    index,
                    name: "school"
                }
            )}/>
            <label htmlFor="major">Major</label>
            <input type='text' value={major} id="major" onChange={(e) => arrayInfoChange(
                {
                    payload: e.target.value,
                    key,
                    index,
                    name: "major"
                }
            )}/>            
            <label htmlFor="date">Date</label>
            <input type='text' value={date} id="date" onChange={(e) => arrayInfoChange(
                {
                    payload: e.target.value,
                    key,
                    index,
                    name: "date"
                }
             )}/>
            <ReactQuill value={freeform} 
                onChange={(html) => arrayInfoChange(
                    {
                        payload: html, 
                        key,
                        index,
                        name: "freeform"
                    }
            )}/>
            <button onClick={() => deleteArrayItem({key, index})}>Delete Edu</button>
        </div>
    )
};

export default EduInput;