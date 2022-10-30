import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../Redux/AppReducer/action";
import {useSearchParams} from "react-router-dom"
import TaskCard from "../components/TaskCard";
const HomePage = () => {
  const tasks = useSelector((state) => state.AppReducer.tasks);
  const dispatch = useDispatch();
  const [searchParams]=useSearchParams()

  // console.log(searchParams)

  //=================this is to get tasks=============//
  const getTasksHandler = () => {
    dispatch(getTasks());
  };

  useEffect(() => {
    if (tasks.length == 0) {
      getTasksHandler();
    }
  }, [getTasksHandler, tasks.length]);

  console.log(tasks);

  //=================================================//


//==============this is for filtering on dom ==========//
  const filterByParamTags=(task)=>{
    // console.log(task)
    const paramsTags=searchParams.getAll("tags")
    // console.log(paramsTags)

    if(paramsTags.includes("All") || paramsTags.length==0){
      return task
    }
    //above is for if all is selected or none is selected then it should 
    //show all tasks
    const data=task.tags.filter((tag)=>{
      if(paramsTags.includes(tag)){
        return true
      }
      else{
        return false
      }

    })

    if(data.length){
      return task
    }
    return false
   
  }

//===========================================//
  return (
    <Box border={"1px solid green"} width="100%">
      <Flex justifyContent="space-around">
        {/* ========Todo============ */}
        <Box border="1px solid black" height="95vh" width="250px">
          <Box>
            <Text textAlign="center">TODO</Text>
          </Box>

          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "todo")
              .filter((task)=>filterByParamTags(task))
              .map((item) => {
                console.log(item);
                return <TaskCard key={item.id} {...item} colorScheme="green" />;
              })}
        </Box>
        {/*============== In-Progress=========== */}
        <Box border="1px solid black" height="95vh" width="250px">
          <Box>
            <Text textAlign="center">IN-PROGRESS</Text>
          </Box>

          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "in-progress")
              .filter((task)=>filterByParamTags(task))
              .map((item) => {
                console.log(item);
                return (
                  <TaskCard key={item.id} {...item} colorScheme="yellow" />
                );
              })}
        </Box>
        {/* =============Done============= */}
        <Box border="1px solid black" height="95vh" width="250px">
          <Box>
            <Text textAlign="center">DONE</Text>
          </Box>

          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "done")
              .filter((task)=>filterByParamTags(task))
              .map((item) => {
                console.log(item);
                return <TaskCard key={item.id} {...item} colorScheme="blue" />;
              })}
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
