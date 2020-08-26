export const concatLine = (seperator, ...args) => {
    return args.reduce((accumulator, current, index) => {
        if (current.trim() === '') { 
            return accumulator;
        } else {
            return accumulator + `${seperator}` + current;
        }
    }); 
};