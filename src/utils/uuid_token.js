import {v4 as uuidv4} from 'uuid'

export default ()=>{
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // let uuid_token
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}