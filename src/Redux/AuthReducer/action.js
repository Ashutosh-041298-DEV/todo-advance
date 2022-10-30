import * as types from "./actionTypes"
import axios from "axios"



const login =(params)=>(dispatch)=>{

    dispatch({type:types.LOGIN_REQUEST})

    return axios.post("https://reqres.in/api/login",params)
    .then((res)=>{console.log(res)
        dispatch({type:types.LOGIN_SUCCESS,payload:res.data.token})
        return types.LOGIN_SUCCESS
    })
    .catch((e)=>{console.log(e)
        dispatch({type:types.LOGIN_FAILURE,payload:e})
        return types.LOGIN_FAILURE
    })
}


export {login}