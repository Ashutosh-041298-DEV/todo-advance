import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addSubTasks,
  deleteSubTask,
  getTasks,
  updateTasks,
} from "../Redux/AppReducer/action";

const EditPage = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, setTaskTags] = useState([]);
  const [currentSubTask, setCurrentSubTask] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [checkBox, setCheckBox] = useState([]);

  const tasks = useSelector((state) => state.AppReducer.tasks);
  let { id } = useParams();
  const dispatch = useDispatch();

  const addSubTask = (e) => {
    e.preventDefault();
    if (currentSubTask) {
      const newSubTasks = [
        ...subTasks,
        {
          subTaskTitle: currentSubTask,
          status: false,
        },
      ];
      dispatch(addSubTasks(id, { subTasks: newSubTasks }))
        .then(() => dispatch(getTasks()))
        .then(() => {
          setCurrentSubTask("");
        });
    }
  };
  useEffect(() => {
    if (tasks) {
      let currentTask = tasks.find((item) => item.id === Number(id));

      if (currentTask) {
        setTaskTitle(currentTask.title);
        setTaskDescription(currentTask.description);
        setTaskStatus(currentTask.task_status);
        setTaskTags(currentTask.tags);
        setSubTasks(currentTask.subTasks);
        let data = currentTask.subTasks
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);
        setCheckBox(data);
      }
    }
  }, [id, tasks]);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, [dispatch, tasks.length]);
  const updateHandler = (type, value) => {
    console.log("type");
    if (type == "textAndDescription") {
      dispatch(
        updateTasks(id, {
          title: taskTitle,
          description: taskDescription,
        })
      ).then(() => dispatch(getTasks()));
    } else if (type == "taskStatus") {
      dispatch(
        updateTasks(id, {
          task_status: value,
        })
      ).then(() => dispatch(getTasks()));
    } else if (type === "taskTag") {
      dispatch(
        updateTasks(id, {
          tags: value,
        })
      ).then(() => dispatch(getTasks()));
    }
  };
  const updateSubTaskStatus = (checkBoxValue) => {
    let newData = subTasks.map((item) => {
      if (checkBoxValue.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }
      return {
        ...item,
        status: false,
      };
    });
    dispatch(addSubTasks(id, { subTasks: newData })).then(() =>
      dispatch(getTasks())
    );
  };


  const handleDelete = (title) => {
    let newData = subTasks.filter((item) => item.subTaskTitle != title);
    dispatch(deleteSubTask(id, { subTasks: newData })).then(() => dispatch(getTasks()));
  };

  return (
    <Box border={"1px solid green"} width="100%">
      <Flex justifyContent={"space-around"} mt="3vh">
        <Box border={"1px solid red"} width="200px" height={"90vh"}>
          <Box>
            <Stack direction={"column"}>
              <Input
                type="text"
                placeholder="title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Editable value={taskDescription}>
                <EditablePreview />
                <EditableTextarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
              </Editable>
              <Button
                onClick={() => {
                  updateHandler("textAndDescription");
                }}
              >
                Update
              </Button>
            </Stack>
          </Box>

          <Box>
            <RadioGroup
            value={taskStatus}
              onChange={(value) => {
                setTaskStatus(value);
                updateHandler("taskStatus", value);
              }}
              
            >
              <Stack direction="column">
                <Radio value="todo">Todo</Radio>
                <Radio value="in-progress">In-Progress</Radio>
                <Radio value="done">Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Text fontWeight={"bold"}>Tags</Text>

            <CheckboxGroup
              colorScheme="green"
              value={taskTags}
              onChange={(value) => {
                setTaskTags(value);
                updateHandler("taskTag", value);
              }}
            >
              <Stack spacing={[1, 5]} direction={"column"}>
                <Checkbox value="Official">Official</Checkbox>
                <Checkbox value="Personal">Personal</Checkbox>
                <Checkbox value="Others">Others</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Box>

        <Box
          border={"1px solid black"}
          width="350px"
          height={"90vh"}
          padding="5px"
        >
          <form onSubmit={addSubTask}>
            <Flex>
              <Input
                id="first-name"
                placeholder="Add new subtasks"
                value={currentSubTask}
                onChange={(e) => setCurrentSubTask(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </Flex>
          </form>
          <Box>
            <CheckboxGroup
              value={checkBox}
              onChange={(value) => {
                setCheckBox(value);
                updateSubTaskStatus(value);
              }}
            >
              {subTasks.length &&
                subTasks.map((item, index) => (
                  <Flex padding="1rem" justifyContent="space-between">
                    <Checkbox key={index} size="md" value={item.subTaskTitle}>
                      {item.subTaskTitle}
                    </Checkbox>
                    <DeleteIcon
                      cursor={"pointer"}
                      onClick={() => handleDelete(item.subTaskTitle)}
                    />
                  </Flex>
                ))}
            </CheckboxGroup>
          </Box>
        </Box>

        <Box border={"1px solid blue"} width="200px" height={"90vh"}>
        </Box>
      </Flex>
    </Box>
  );
};

export default EditPage;
