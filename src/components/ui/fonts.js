//TODO: This file not yet incorporated. Need a way to change font so that it is reflected in the preview and in the download.
// Changes will need to be injected into the html string for the download request and in the ResumePage component for onscreen preview.
// Need to add additional fonts. Also need to trim the import statment to only include required font weights. 

const robotoImport = "@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');";
const robotoSlabImport = "@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;531;600;700;800;900&display=swap');";
const robotoFamily = `"font-family: 'Roboto', sans-serif;`;
const robotoSlabFamily = `font-family: 'Roboto Slab', serif;`;


export const selectFont = (font) => {
    switch (font) {
        case "Roboto":
            return {
                primaryImport: robotoImport,
                secondaryImport: robotoSlabImport,
                primaryFont: robotoFamily,
                secondaryFont: robotoSlabFamily
            }
        
        default: 
        return {
            primaryImport: robotoImport,
            secondaryImport: robotoSlabImport,
            primaryFont: robotoFamily,
            secondaryFont: robotoSlabFamily
        }
    }
};