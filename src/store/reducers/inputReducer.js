
// export const initialState = {
//     username: 'george.geeslin@gmail.com',
//     themeModal: false,
//     // TODO: below are resume only items. May need to extract other items into another reducer. 
//     theme: 'default',
//     font: 'Roboto',
//     pageCount: 1, //make this do something or remove it. was for disabling 3rd page (page break logic supports only 2 pages)
//     resumeHeight: 890,
//     name: 'George Geeslin',  
//     phone: '325-518-9738', 
//     email: 'george.geeslin@gmail.com', 
//     desired_position: {
//         role: 'Full Stack Developer',
//         profile: 'Senior report developer interested in transitioning to Full-Stack development. Well versed in the React ecosystem, and quick to adopt and master new technologies.',
//     },
//     links: {
//         facebook: '',
//         twitter: '',
//         linkedin: '',
//         github: 'www.github.com/georgegeeslin.com',
//         portfolio:'www.georgegeeslin.com',
//         otherLink: ''
//     },
//     address: {
//         street1: '11711 Tanglebrair Trl',
//         street2: '1407',
//         city: 'Austin',
//         state: 'TX',
//         zip: '79750',
//     },
//     skills: {
//         addSkill: '',
//         skills: ["HTML5", "React", "CSS", "SCSS", "Bootstrap", "Responsive Design", "SQL", "JavaScript", "Node"],
//     },
//     work: [
//         {
//             employer: "Frontline",
//             title: "Senior Report Developer",
//             dates: [{start: "2014-12-01", end: "2018-12-04"}],
//             experience: "<ul><li>Sole developer for full-stack project using React, Redux, DreamFactory and PostgreSQL to create a searchable and filterable catalog to provide users with detailed information about the over 600 reports available within our product.</li><li>Developed features for an SPA built in AngularJS with a Spring Boot back end.</li><li>Created data integration tools written in Java and Groovy to automate the flow of data between our production databases and databases used by our clients 3rd party appplications.</li><li>Developed stored procedures, views, functions and queries for several flavors of SQL including DB2, SQL Server, PostgreSQL and Oracle</li><li>Created reports and dashboards</li><li>Reduced client downtime by troubeshooting reports and optimizing SQL</li></ul>",
//             current: false,
//             city: "Austin",
//             state: "TX"
//         }, 

//         {
//             employer: "Abilene Tech",
//             title: "Network Administrator",
//             dates: [{start: "2011-11-01", end: "2013-08-01"}],
//             experience: "<ol><li>Managed IT systems of multiple small and midsize business clients.</li><li>Administered Active Directory, Group Policy and MMS Exchange</li><li>Used virtulization technologies including VMWare Hyper-V, ESX, and Veeam to provide robust and flexible server infrastructure.</li><li>Configured and maintained networking infrastructure including firewalls, routers, and switches</li><li>Manged IT assests such as domains, SSL certs, leased hardware and software licenses.</li></ol>",
//             current: false,
//             city: "Abilene",
//             state: "TX"
//         },

//         {
//             employer: "Wavecreste",
//             title: "IT Analyst",
//             dates: [{start: "2010-01-01", end: "2011-01-11"}],
//             experience: "<ul><li>Led effort to identify and resolve bugs which were severly impacting an internal enterprise system for AT&T which was currently in beta</li><li>Reduced failure rate from 70% during the testing phase to less than half a precent before general release.</li><li>Identified bugs and their interactions across multiple connected APIs</li><li>Developed a deep seated hate for self strangling bureaucracy and the middling managers that sustain it.</li><li>Learned that large organizations are not for me</li></ul>",
//             current: false,
//             city: "Abilene",
//             state: "TX"
//         }
//     ],
//     education: [{
//         school: "Texas Tech",
//         degree: "BA",
//         major: "Advertising",
//         dates: [{start: '2006-01-01', end: '2010-05-01'}],
//         gpa: "3.2",
//         coursework: ["Data Structures", "Applied Computering", "Code Class"],
//         addCoursework: "",
//         current: false
//     }],
//     sections: {
//         desired_position: true,
//         address: true,
//         work: true,
//         education: true,
//         skills: true,
//         links: true,
//     },
// };



export const initialState = {
    username: '',
    themeModal: false,
    theme: 'default', 
    font: 'Roboto',
    pageCount: 1,
    resumeHeight: 890,
    //content
    name: "",
    phone:"",
    email:"",
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
        // street1:"",
        // street2:"",
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

        default:
            return state    
    }
};