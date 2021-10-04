exports.apiResponse = (success, comment, result) => {
    if(success === 1){
        return {
            ResponseCode: 1,
            ResponseMessage: "Success",
            Comments: comment,
            Result: result
        }
    }else{
        return {
            ResponseCode: 0,
            ResponseMessage: "Failure",
            Comments: comment,
            Result: result
        }
    }
}