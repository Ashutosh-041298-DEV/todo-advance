import axios from "axios"
import * as types from "./actionTypes"

const getTasks=(payload)=>(dispatch)=>{

    dispatch({type:types.GET_TASKS_REQUEST})

    return axios.get("http://localhost:8080/tasks")
    .then((res)=>dispatch({type:types.GET_TASKS_SUCCESS,payload:res.data}))
    .catch((e)=>dispatch({type:types.GET_TASKS_FAILURE,payload:e}))

}




const updateTasks=(id,payload)=>dispatch=>{

    dispatch({type:types.UPDATE_TASKS_REQUEST})

    return axios.patch(`http://localhost:8080/tasks/${id}`,payload)
    .then((res)=>dispatch({type:types.UPDATE_TASKS_SUCCESS,payload:res.data}))
    .catch((e)=>dispatch({type:types.UPDATE_TASKS_FAILURE,payload:e}))

}


const addSubTasks=(id,payload)=>dispatch=>{

    dispatch({type:types.ADD_SUBTASK_REQUEST})

    return axios.patch(`http://localhost:8080/tasks/${id}`,payload)
    .then((res)=>dispatch({type:types.ADD_SUBTASK_SUCCUSS,payload:res.data}))
    .catch((e)=>dispatch({type:types.ADD_SUBTASK_FAILURE,payload:e}))
}


const deleteSubTask=(id,payload)=>dispatch=>{

    dispatch({type:types.DELETE_SUBTASK_REQUEST})

    return axios.patch(`http://localhost:8080/tasks/${id}`,payload)
    .then((res)=>dispatch({type:types.DELETE_SUBTASK_SUCCUSS,payload:res.data}))
    .catch((e)=>dispatch({type:types.DELETE_SUBTASK_FAILURE,payload:e}))
}
export {getTasks,updateTasks,addSubTasks,deleteSubTask}