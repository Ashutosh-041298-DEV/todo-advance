import { Stack } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Sidebar from "../components/sidebar";
import EditPage from "./EditPage";
import HomePage from "./HomePage";
import Login from "./Login";

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Stack direction={"row"} width="90%" margin={"auto"}>
              <Sidebar />
              <HomePage />
            </Stack>
          </RequireAuth>
        }
      />
      <Route
        path="/task/:id"
        element={
          <RequireAuth>
            <Stack direction={"row"}  width="90%" margin={"auto"}>
              <Sidebar />
              <EditPage />
            </Stack>
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default MainRoutes;
