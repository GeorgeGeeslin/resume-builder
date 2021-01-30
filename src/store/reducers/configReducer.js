export const initialState = {
  userHasAuthenticated: false,
  // unsavedChange: false,    // TODO: implement unsaved changes warnings
  themeModal: false,  
};

export const ConfigReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'configInfoChange':  //Target key is at the root of state.

    return {
        ...state,
        [action.field]: action.payload
    }
    
    default:
      return state
  }  
};