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
            return <span key={index}>{concatLine(' - ', date.start, date.end)}</span>
        } else {
            return <span key={index}>{concatLine(' - ', date.start, date.end) + " | "}</span>
        }        
    })
    return dateDisplay;
};

