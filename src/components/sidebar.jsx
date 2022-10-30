import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Sidebar = () => {
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);
  const tasks = useSelector((state) => state.AppReducer.tasks);
  const personalTasks = tasks.filter((item) => item.tags.includes("Personal"));
  const officialTasks = tasks.filter((item) => item.tags.includes("Official"));
  const otherTasks = tasks.filter((item) => item.tags.includes("Others"));
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState(searchParams.getAll("tags") || []);
  const handleTagChange = (tag) => {
    let newSelectedTags = [...selectedTags];
    console.log(newSelectedTags);
    if (selectedTags.includes(tag)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tag), 1);
    } else {
      newSelectedTags.push(tag);
    }

    setSelectedTags(newSelectedTags);
  };

  useEffect(() => {
    if (selectedTags) {
      setSearchParams({ tags: selectedTags });
    }
  }, [selectedTags, setSearchParams]);
  return (
    <Box border="1px solid red" width="250px" height="100vh">
      <Stack direction="column">
        <Box border="1px solid red" height="15vh">
        </Box>

        <Box border="1px solid red" height="70vh">
          <Flex direction={"column"} gap="5px" margin={"5px"}>
            <Box
              border={"1px solid blue"}
              padding="5px 0"
              backgroundColor={selectedTags.includes("All") ? "blue.400" : "blue.100"}
              cursor="pointer"
              onClick={() => handleTagChange("All")}
            >
              <Flex padding={"0 10px"}>
                <Text>All</Text>
                <Text marginLeft={"auto"}>{tasks.length}</Text>
              </Flex>
            </Box>

            <Box
              border={"1px solid blue"}
              padding="5px 0"
              backgroundColor={selectedTags.includes("Personal") ? "green.400" : "green.100"}
              cursor="pointer"
              onClick={() => handleTagChange("Personal")}
            >
              <Flex padding={"0 10px"}>
                <Text>Personal</Text>
                <Text marginLeft={"auto"}>{personalTasks.length}</Text>
              </Flex>
            </Box>

            <Box
              border={"1px solid blue"}
              padding="5px 0"
              backgroundColor={selectedTags.includes("Official") ? "purple.400" : "purple.100"}
              cursor="pointer"
              onClick={() => handleTagChange("Official")}
            >
              <Flex padding={"0 10px"}>
                <Text>Official</Text>
                <Text marginLeft={"auto"}>{officialTasks.length}</Text>
              </Flex>
            </Box>

            <Box
              border={"1px solid blue"}
              padding="5px 0"
              cursor="pointer"
              onClick={() => handleTagChange("Others")}
            >
              <Flex padding={"0 10px"}>
                <Text>Others</Text>
                <Text marginLeft={"auto"}>{otherTasks.length}</Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box border="1px solid red" height="10vh">
          <Button width="100%">{isAuth && "LOGOUT"}</Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Sidebar;
