class ApiError extends Error{
    constructor(
        statuscode,
        stack = "",
        errors = "",
        message = "Something went wrong"
    ){
            super(message)
            this.statuscode = statuscode,
            this.errors = errors,
            this.data = null,
            this.success = false
        
    
    if(stack){
        this.stack = stack
    }else{
        Error.captureStackTrace(this, this.constructor)
    }
}
}

export { ApiError }