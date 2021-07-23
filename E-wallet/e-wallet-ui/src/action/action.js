export const action = (values)=>{
    return (dispatch)=>{
        dispatch({
            type:"insert",
            payload:values
        })
    }
}
