import React from "react";
import { getToDos } from "../API/MockFetch";
import { SearchBar } from "../Components/SearchBar";
import { TabBar } from "../Components/TabBar/TabBar";
import { ToDoItem } from "../Interface/ToDoItem";
import { ToDoItemList } from "../Components/ToDoItemList";
import { RouterProps } from "react-router-dom";
import { Category } from "../Interface/Category";
import { features } from "../features";

interface IMainProps extends Partial<RouterProps> {
  currentCategory: Category;
  categories: Category[];
}

export const Main: React.FC<IMainProps> = (props) => {
  const [items, setItems] = React.useState<ToDoItem[]>();

  React.useEffect(() => {
    getToDos(props.currentCategory.key).then((data) => setItems(data));
  }, [props.currentCategory, props.categories]);

  return (
    <>
      {items && (
        <>
          <TabBar currentCategory={props.currentCategory} categories={props.categories} />
          {features.useSearchBar && <SearchBar />}
          <ToDoItemList items={items} categoryName={props.currentCategory.displayName} />
        </>
      )}
      {!items && <div>Loading...</div>}
    </>
  );
};
