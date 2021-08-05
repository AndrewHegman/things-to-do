import React from "react";
import { TabBar } from "../../Components/TabBar/Mobile/TabBar";
import { ToDoItemList } from "../../Components/ToDoItemList";

export interface ToDoItemListPageProps {}

export const ToDoItemListPage: React.FC<ToDoItemListPageProps> = (props) => {
  return (
    <>
      <TabBar />
      <ToDoItemList />
    </>
  );
};
