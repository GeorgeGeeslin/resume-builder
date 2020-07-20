import React, { useContext } from 'react';
import Context from '../context/Context';
import {FlexGroup, Input, Grouper, ItemGrouper, SectionHeader, SubsectionHeader, VisabilityToggle, Show} from './ui/elements';
// import ReactTooltip from "react-tooltip";

const PersonalInfoInput = () => {

    const context = useContext(Context);
    const {baseInfoChange, baseObjectInfoChange, toggleBaseSection} = context;
    const {name, phone, email} = context.resumeContent;
    const {street1, street2, city, state, zip} = context.resumeContent.address;
    const {role, profile} = context.resumeContent.desired_position;
    const {address, desired_position} = context.resumeContent.sections;

    
    return (
        <Grouper>
            <SectionHeader>Personal Info</SectionHeader>
            <ItemGrouper>
                <SubsectionHeader>Basic Info</SubsectionHeader>
                <FlexGroup>
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
                </FlexGroup>    
            </ItemGrouper>
            <ItemGrouper>
                <SubsectionHeader>Desired Position</SubsectionHeader>
                    <VisabilityToggle label="desired position" highlightClass="deleteHighlight" section="desired_position" 
                        visability={desired_position}
                        onClickFunc={toggleBaseSection}
                    /> 
                <FlexGroup>
                    <div style={{marginRight: '1em'}}>
                        <label htmlFor="role">Role</label>
                        <Input disabled={!desired_position} type='text' value={role} id="role" onChange={(e) => baseObjectInfoChange(
                            {
                                payload: e.target.value,
                                name: "role",
                                key: "desired_position"
                            }
                        )}/>
                    </div>
                    <div style={{width: '80%', minWidth: '150px'}}>
                        <label htmlFor="profile">Profile</label>
                        <Input disabled={!desired_position} type='text' value={profile} id="profile" onChange={(e) => baseObjectInfoChange(
                            {
                                payload: e.target.value,
                                name: "profile",
                                key: "desired_position"
                            }
                        )}/>
                    </div>
                </FlexGroup>            
            </ItemGrouper>            
            <ItemGrouper>
                <SubsectionHeader>Address</SubsectionHeader>
                <VisabilityToggle label="address" highlightClass="deleteHighlight" section="address"
                    visability={address}
                    onClickFunc={toggleBaseSection}
                />
                <FlexGroup>
                    <div style={{marginRight: '1em', width: '50%'}}>
                        <label htmlFor='street1'>Street 1</label>
                        <Input disabled={!address} type='text' value={street1} id='street1' onChange={e => baseObjectInfoChange(
                            {
                                payload: e.target.value,
                                name: 'street1',
                                key: 'address'
                            }
                        )} />
                    </div>
                    <div style={{width: '50%'}}>
                        <label htmlFor='street2'>Street 2</label>
                        <Input disabled={!address} type='text' value={street2} id='street1' onChange={e => baseObjectInfoChange(
                            {
                                payload: e.target.value,
                                name: 'street2',
                                key : 'address'
                            }
                        )} />
                    </div>
                </FlexGroup>
                <FlexGroup>
                     <div style={{marginRight: '1em'}}>
                        <label htmlFor='city'>City</label>
                        <Input disabled={!address} type='text' value={city} id='city' onChange={e => baseObjectInfoChange(
                            {
                                payload: e.target.value,
                                name: 'city',
                                key: 'address'
                            }
                        )} />
                    </div>   
                    <div style={{marginRight: '1em'}}>
                        <label htmlFor='state'>State</label>
                        <Input disabled={!address} type='text' value={state} id='state' onChange={e => baseObjectInfoChange(
                            {
                                payload: e.target.value,
                                name: 'state',
                                key: 'address'
                            }
                        )} />
                    </div>  
                    <div style={{marginRight: '1em'}}>
                        <label htmlFor='zip'>Zipcode</label>
                        <Input disabled={!address} type='text' value={zip} id='zip' onChange={e => baseObjectInfoChange(
                            {
                                payload: e.target.value,
                                name: 'zip',
                                key: 'address'
                            }
                        )} />
                    </div>                                        
                </FlexGroup>
            </ItemGrouper>
        </Grouper>
    )
};

export default PersonalInfoInput;