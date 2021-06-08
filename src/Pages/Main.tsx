import React from "react";
import { getCategories, getToDos } from "../API/MockFetch";
import { SearchBar } from "../Components/SearchBar";
import { TabBar } from "../Components/TabBar/TabBar";
import { ToDoItem } from "../Interface/ToDoItem";
import { ToDoItemList } from "../Components/ToDoItemList";
import { RouterProps } from "react-router-dom";
import { Category } from "../Interface/Category";
import { features } from "../features";
import { AddNewToDoItemButton } from "../Components/AddNewToDoItemButton/AddNewToDoItemButton";
import { Container } from "@material-ui/core";
import { useMainStyles } from "./Main.styles";

interface IMainProps extends Partial<RouterProps> {
  categoryKey: string;
  categoryDisplayName: string;
}

export const Main: React.FC<IMainProps> = (props) => {
  const [items, setItems] = React.useState<ToDoItem[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const classes = useMainStyles();

  React.useEffect(() => {
    setIsLoading(true);
    // getToDos(props.categoryKey).then((data) => {
    //   setIsLoading(false);
    // });
  }, [props.categoryKey]);

  return (
    <>
      {!isLoading && items && (
        <Container className={classes.contentContainer}>
          {/* <TabBar categories={props.categories} /> */}
          {features.useSearchBar && <SearchBar />}
          {/* <ToDoItemList items={items} categoryName={props.currentCategory.displayName} /> */}
          {/* <AddNewToDoItemButton /> */}
        </Container>
      )}
      {isLoading && <div>Loading...</div>}
    </>
  );
};
