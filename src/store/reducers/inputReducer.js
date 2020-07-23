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
    address: {
        street1: '11711 Tanglebrair Trl',
        street2: '1407',
        city: 'Austin',
        state: 'TX',
        zip: '79605',
    },
    socials: [],
    skills: {
        showCategories: true,
        uncategorized: ["ES6", "Node", "CSS", "Jasper"],
        "Front-end": ["HTML5", "React", "CSS", "SCSS", "Bootstrap", "Responsive Design"],
        "Back-end": ["SQL", "Java", "React"]
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
        school: "",
        degree: "",
        major: "",
        date: "",
        freeform: ""
    }],
    sections: {
        desired_position: true,
        address: true,
        work: true,
        education: true,
        skills: true,
        links: true,
        certifications: true,
        awards: true
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
        case 'baseInfoChange':

            return {
                ...state,
                [action.field]: action.payload
            }

        case 'baseObjectInfoChange':
            key = action.key;
            field = action.field;
            payload = action.payload;
            obj = state[key];
            obj[field] = payload;

            return {
                ...state,
                obj
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

        case 'toggleBaseSection':
            const sections = action.sections;

            return {
                ...state,
                sections
            } 

        default:
            return state    
    }
};