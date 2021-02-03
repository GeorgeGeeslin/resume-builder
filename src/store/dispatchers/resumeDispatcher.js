export const baseInfoChange = (e, dispatch) => {
  const {name, payload} = e;
  dispatch({type: 'baseInfoChange', field: name, payload})
};