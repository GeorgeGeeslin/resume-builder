import React from 'react';

export const concatLine = (seperator, ...args) => {
    return args.reduce((accumulator, current) => {
        if (current.trim() === '') { 
            return accumulator;
        } else {
            return accumulator + `${seperator}` + current;
        }
    }); 
};

export const concatDateRage = (dates) => {
    const dateDisplay = dates.map((date, index) => {    
        if (index >= dates.length - 1) {
            return <span key={index}>{concatLine(' - ', formatDate(date.start), formatDate(date.end))}</span>
        } else {
            return <span key={index}>{concatLine(' - ', formatDate(date.start), formatDate(date.end)) + " | "}</span>
        }        
    })
    return dateDisplay;
};

const formatDate = (date) => {
    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const month = months[parseInt(date.slice(5,7) - 1)];
    const year = date.slice(0,4);

    return `${month} ${year}`;
};

