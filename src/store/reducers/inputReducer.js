export const initialState = {
    theme: 'default',
    username: 'george.geeslin@gmail.com',
    name: 'George Geeslin',  
    phone: '325-518-9738', 
    email: 'george.geeslin@gmail.com', 
    website: 'georgegeeslin.com',
    desired_position: {
        role: 'Full Stack Developer',
        profile: 'Hi you should hire me',
    },
    links: {
        facebook: '',
        twitter: '',
        linkedin: '',
        github: '',
        portfolio:'',
        otherLink: ''
    },
    address: {
        street1: '11711 Tanglebrair Trl',
        street2: '1407',
        city: 'Austin',
        state: 'TX',
        zip: '79750',
    },
    socials: [],
    // skills: ["HTML5", "React", "CSS", "SCSS", "Bootstrap", "Responsive Design", "SQL", "JavaScript", "Node"],
    skills: {
        addSkill: '',
        skills: ["HTML5", "React", "CSS", "SCSS", "Bootstrap", "Responsive Design", "SQL", "JavaScript", "Node"],
    },
    work: [
        {
            employer: "Frontline",
            title: "Senior Report Developer",
            dates: [{start: "Dec 2014", end: "Dec 2018"},{start: "Dec 2019", end: "Dec 2020"}],
            experience: "<p>test</p>"
        }, 
        {
            employer: "Abilene Tech",
            title: "SysAdmin",
            dates: [{start: "Nov 2011", end: "Aug 2013"}],
            experience: "<p>hello</p>"
        }
    ],
    education: [{
        school: "Texas Tech",
        degree: "BA",
        major: "Advertising",
        // date: "May 2010",
        dates: [{start: '2006', end: '2010'}],
        gpa: "3.2",
        freeform: ""
    }],
    sections: {
        desired_position: true,
        address: true,
        work: true,
        education: true,
        skills: true,
        links: true,
//        certifications: true,
 //       awards: true
    },
};

export const InputReducer = (state = initialState, action) => {
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

        default:
            return state    
    }
};