

export const BadRequest=()=>{
    return(
        <div className="w-screen h-screen bg-white flex ">
            400 Bad Request user already exist please login 
        </div>
    )
}



export const Unautherised=()=>{
    return(
        <div className="w-screen h-screen bg-white flex ">
            401 Unautherized access user does not exist please sign up
        </div>
    )
}
export const NotFound=()=>{
    return(
        <div className="w-screen h-screen bg-white flex ">
            404 NotFound
        </div>
    )
}
export const InternalserverError=()=>{
    return(
        <div className="w-screen h-screen bg-white flex ">
            500 Internal Server Error 
        </div>
    )
}
