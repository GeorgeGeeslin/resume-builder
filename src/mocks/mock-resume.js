export const initialState = {
    userHasAuthenticated: false,
    themeModal: false,
    resumeId: "RESUME#542168c0-5add-11eb-80de-ddf9377b68d3",
    theme: 'default',
    font: 'Roboto',
    pageCount: 1, //make this do something or remove it. was for disabling 3rd page (page break logic supports only 2 pages)
    resumeHeight: "1px",
    resumeName: "Full Stack",
    name: 'George Geeslin',  
    phone: '325-518-9738', 
    email: 'george.geeslin@gmail.com', 
    desired_position: {
        role: 'Full Stack Developer',
        profile: 'Senior report developer interested in transitioning to Full-Stack development. Well versed in the React ecosystem, and quick to adopt and master new technologies.',
    },
    links: {
        facebook: '',
        twitter: '',
        linkedin: '',
        github: 'https://github.com/GeorgeGeeslin',
        portfolio:'www.georgegeeslin.com',
        otherLink: ''
    },
    address: {
        street1: '11711 Tanglebrair Trl',
        street2: '1407',
        city: 'Austin',
        state: 'TX',
        zip: '79750',
    },
    skills: {
        addSkill: '',
        skills: ["HTML5", "React", "CSS", "SCSS", "Bootstrap", "Responsive Design", "SQL", "JavaScript", "Node"],
    },
    work: [
        {
            employer: "Frontline",
            title: "Senior Report Developer",
            dates: [{start: "2014-12-01", end: "2018-12-04"}],
            experience: "<ul><li>Sole developer for full-stack project using React, Redux, DreamFactory and PostgreSQL to create a searchable and filterable catalog to provide users with detailed information about the over 600 reports available within our product.</li><li>Developed features for an SPA built in AngularJS with a Spring Boot back end.</li><li>Created data integration tools written in Java and Groovy to automate the flow of data between our production databases and databases used by our clients 3rd party appplications.</li><li>Developed stored procedures, views, functions and queries for several flavors of SQL including DB2, SQL Server, PostgreSQL and Oracle</li><li>Created reports and dashboards</li><li>Reduced client downtime by troubeshooting reports and optimizing SQL</li></ul>",
            current: false,
            city: "Austin",
            state: "TX"
        }, 

        {
            employer: "Abilene Tech",
            title: "Network Administrator",
            dates: [{start: "2011-11-01", end: "2013-08-01"}],
            experience: "<ol><li>Managed IT systems of multiple small and midsize business clients.</li><li>Administered Active Directory, Group Policy and MMS Exchange</li><li>Used virtulization technologies including VMWare Hyper-V, ESX, and Veeam to provide robust and flexible server infrastructure.</li><li>Configured and maintained networking infrastructure including firewalls, routers, and switches</li><li>Manged IT assests such as domains, SSL certs, leased hardware and software licenses.</li></ol>",
            current: false,
            city: "Abilene",
            state: "TX"
        },

        {
            employer: "Wavecreste",
            title: "IT Analyst",
            dates: [{start: "2010-01-01", end: "2011-01-11"}],
            experience: "<ul><li>Led effort to identify and resolve bugs which were severly impacting an internal enterprise system for AT&T which was currently in beta</li><li>Reduced failure rate from 70% during the testing phase to less than half a precent before general release.</li><li>Identified bugs and their interactions across multiple connected APIs</li><li>Developed a deep seated hate for self strangling bureaucracy and the middling managers that sustain it.</li><li>Learned that large organizations are not for me</li></ul>",
            current: false,
            city: "Abilene",
            state: "TX"
        }
    ],
    education: [{
        school: "Texas Tech",
        degree: "BA",
        major: "Advertising",
        dates: [{start: '2006-01-01', end: '2010-05-01'}],
        gpa: "3.2",
        coursework: ["Data Structures", "Applied Computering", "Code Class"],
        addCoursework: "",
        current: false
    }],
    sections: {
        desired_position: true,
        address: true,
        work: true,
        education: true,
        skills: true,
        links: true,
    },
};