import React, { useContext } from 'react';
import Context from '../context/Context';
import {Input} from './ui/elements';

const PersonalInfoInput = () => {

    const context = useContext(Context);
    const {name, phone, email} = context.resumeContent;
    const baseInfoChange = context.baseInfoChange;
    
    return (
        <div style={{display: 'flex'}}>
            <div style={{marginRight: '1em'}}>
                    <label htmlFor="name">Name</label>
                    <Input type='text' value={name} id="name" onChange={(e) => baseInfoChange(
                        {
                            payload: e.target.value,
                            name: "name"
                        }
                    )}/>
                </div>
            <div style={{marginRight: '1em'}}>
                <label htmlFor="phone">Phone</label>
                <Input type='text' value={phone} id="phone" onChange={(e) => baseInfoChange(
                    {
                        payload: e.target.value,
                        name: "phone"
                    }
                )}/>
            </div>
            <div style={{width: '50%'}}>
                <label htmlFor="email">Email</label>
                <Input type='text' value={email} id="email" onChange={(e) => baseInfoChange(
                    {
                        payload: e.target.value,
                        name: "email"
                    }
                )}/>
            </div>
        </div>
    )
};

export default PersonalInfoInput;