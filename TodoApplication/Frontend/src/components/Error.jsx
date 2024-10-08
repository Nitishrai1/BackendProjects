

export const BadRequest=()=>{
    return(
        <div>
            400 Bad Request user already exist please login 
        </div>
    )
}



export const Unautherised=()=>{
    return(
        <div>
            401 Unautherized access user does not exist please sign up
        </div>
    )
}
export const NotFound=()=>{
    return(
        <div>
            404 NotFound
        </div>
    )
}
export const InternalserverError=()=>{
    return(
        <div>
            500 Internal Server Error 
        </div>
    )
}
