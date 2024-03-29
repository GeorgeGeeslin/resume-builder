export const initialState = {
    theme: 'default',
    font: 'Roboto',
    pageCount: 1, //make this do something or remove it. was for disabling 3rd page (page break logic supports only 2 pages)
    resumeHeight: "1px",
    resumeName: "",
    name: "",  
    phone: "", 
    email: "", 
    desired_position: {
        role:"",
        profile:""
    },
    links: {
        facebook:"",
        twitter:"",
        linkedin:"",
        github:"",
        portfolio:"",
        otherLink:""
    },
    address: {
        street1:"",
        street2:"",
        city:"",
        state:"",
        zip:"",
    },
    skills: {
        addSkill:"",
        skills:[]
    },
    work: [],
    education: [],
    sections: {
        desired_position: true,
        address: true,
        work: true,
        education: true,
        skills: true,
        links: true, 
    }
};


export const ResumeReducer = (state = initialState, action) => {
    let key = action.key;
    let index = action.index;
    let array;
    let obj;
    let field;
    let payload;
    let parent;
    let parentIndex;
    let nestedArray;
    switch(action.type) {
        case 'baseInfoChange':  //Target key is at the root of state.

            return {
                ...state,
                [action.field]: action.payload
            }

        case 'baseObjectInfoChange': //Target key is in an object at the root of state.
            key = action.key;
            field = action.field;
            payload = action.payload;
            obj = state[key];
            obj[field] = payload;

            return {
                ...state
            }

        case 'arrayInfoChange': //Target key is in an object inside an array. The array is at the root of state.
            array = [...state[key]];
            obj = array[index];
            field = action.field;
            payload = action.payload;
            obj[field] = payload;
            array[index] = obj;
            
            return {
                ...state,
                [key]: array 
            }

        case 'nestedArrayInfoChange': //Target key is in an object inside an array within another object inside another array. (ie Date Range inside work exp)
            payload = action.payload;
            field = action.field;
            parent = action.parent;
            array = [...state[parent]];
            parentIndex = action.parentIndex;
            const parentObj = array[parentIndex];
            nestedArray = parentObj[key];
            const nestedObj = nestedArray[index]
            nestedObj[field] = payload;
            nestedArray[index] = nestedObj;
            array[parentIndex][key] = nestedArray;
            
            return {
                ...state,
                [parent]: array
            } 

        case 'addArrayItem':  // Add an object to an existing array. (ie adding a work exp or education item.)
                array = [...state[key]];
                array.push(action.newObj);
            
            return {
                ...state,
                [key]: array
            }

        case 'deleteArrayItem': // delete an object from an array. (See addArrayItem)
            array = [...state[key]];
            array.splice(index,1);
            return {
                ...state,
                [key]: array
            }

        case 'deleteNestedArrayItem': // delete object from a nested array (ie Date Range in work exp)
            parent = action.parent;
            array = [...state[parent]];
            parentIndex = action.parentIndex;
            nestedArray = array[parentIndex][key];
            nestedArray.splice(index,1);

            return {
                ...state
            }

        case 'addNestedArrayItem': // Add array to nest within existing array (ie Date Range in work exp)
             array = action.array;

            return {
                ...state
            } 

        case 'toggleBaseSection': // Used for hiding / disabling objects at the root of state.  
            const sections = action.sections;

            return {
                ...state,
                sections
            } 

        case 'addToSkillArray': // Add to an array nested in an object (ie skills).
           obj = action.obj;
           obj.addSkill = "";
          
            return {
                ...state
            }

        case 'deleteSkill': // Delete an array element from an array that is nested in a base level object.
            obj = state[action.parent];
            array = obj[action.key];
            array.splice(action.index,1);
            
            return {
                ...state
            }

        case 'addToCoursework': // Add to an array that is within an object nested within an array. (ie coursework)
            obj = action.obj;
            obj.addCoursework = "";

            return {
                ...state
            }

        case 'deleteCoursework': // Delete an array element from an array that is within an object nested within an array (ie coursework)
            array = state[action.parent];
            obj = array[action.parentIndex];
            nestedArray = obj[action.targetKey];
            nestedArray.splice(action.index,1);
            
            return {
                ...state
            }

        case 'loadAppState':
            state = action.resumeContent
            return {
                ...state
            }

        default:
            return state    
    }
};