export const initialState = {
    username: 'george.geeslin@gmail.com',
    sections: {
        title: true,
        profile: true,
        personalInfo: true,
        skills: true,
        workExperience: true,
        education: true,
        links: true,
        awards: true
    },
    theme: 'default',
    name: 'George Geeslin',
    email: 'george.geeslin@gmail.com',
    phone: '325-518-9738',
    website: 'georgegeeslin.com',
    socials: [],
    profile: 'Hi you should hire me',
    role: 'Full Stack Developer',
    skills: [
        "HTML5","React", "ES6", "Node", "CSS", "SCSS", "Bootstrap", "Responsive Design"
    ],
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
        school: "",
        major: "",
        date: "",
        freeform: ""
    }]
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
        case 'baseInfoChange':
            return {
                ...state,
                [action.field]: action.payload
            }
        case 'arrayInfoChange':
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
        case 'nestedArrayInfoChange':
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
        case 'addArrayItem':
                array = [...state[key]];
                array.push(action.newObj);
            
            return {
                ...state,
                [key]: array
            }
        case 'deleteArrayItem':
            array = [...state[key]];
            array.splice(index,1);
            return {
                ...state,
                [key]: array
            }
        case 'deleteNestedArrayItem':
            parent = action.parent;
            array = [...state[parent]];
            parentIndex = action.parentIndex;
            nestedArray = array[parentIndex][key];
            nestedArray.splice(index,1);

            return {
                ...state
            }
        case 'addNestedArrayItem':
             array = action.array;

            return {
                ...state,
                array
            }           
        default:
            return state    
    }
};