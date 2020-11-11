import React from 'react';

export const concatLine = (seperator, ...args) => {
    return args.reduce((accumulator, current) => {
        if (current.trim() == '') { 
            return accumulator;
        } else {
            return accumulator + `${seperator}` + current;
        }
    }); 
};

export const concatDateRage = (dates, current) => {
    const dateDisplay = dates.map((date, index) => { 
        const startDate = date.start ? formatDate(date.start) : "";
        const endDate = index === 0 && current ? "Present" 
            : date.end ? formatDate(date.end) : "";
        
        if (index >= dates.length - 1) {
            return <span key={index}>{concatLine(' - ', startDate, endDate)}</span>
        } else {
            return <span key={index}>{concatLine(' - ', startDate, endDate) + " | "}</span>
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

