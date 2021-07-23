const reducer=(state={
    "_id": "",
    "accountNumber": "",
    "firstName": "",
    "lastName": "",
    "address": "",
    "phoneNumber": "",
    "emailId": "",
    "addedDate": "",
    "__v": 0
},action)=>{
switch(action.type){
    case "insert":
        return action.payload;
     default:
        return state;
}
}

export default reducer;