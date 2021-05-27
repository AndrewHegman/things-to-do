import "./App.css";
import React from "react";
import { createCategory, createItem, getCategories, getToDos, deleteItem } from "./API/MockFetch";
import { Category } from "./Interface/Category";
import { SearchBar } from "./Components/SearchBar";
import { TabBar } from "./Components/TabBar/TabBar";
import { ToDoItem } from "./Interface/ToDoItem";
import { ToDoItemList } from "./Components/ToDoItemList";
import { features } from "./features";
import { AddNewToDoItemButton } from "./Components/AddNewToDoItemButton/AddNewToDoItemButton";
import { Container } from "@material-ui/core";
import { useAppStyles } from "./App.styles";

const App: React.FC<{}> = () => {
  const [categories, setCategories] = React.useState<Category[]>();
  const [currentCategory, setCurrentCategory] = React.useState<Category>();
  const [currentToDos, setCurrentToDos] = React.useState<ToDoItem[]>();
  const [isCreatingNewItem, setIsCreatingNewItem] = React.useState<boolean>(false);
  const [cacheStale, setCacheStale] = React.useState<boolean>(true);

  React.useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
      if (!currentCategory) {
        setCurrentCategory(categories[0]);
      }
    });
  }, []);

  React.useEffect(() => {
    if (currentCategory && cacheStale) {
      updateCurrentToDos(currentCategory);
    }
  }, [currentCategory, cacheStale]);

  const updateCurrentToDos = (newCurrentCategory: Category) => {
    setCurrentCategory(newCurrentCategory);
    getToDos(newCurrentCategory.key).then((toDos) => {
      setCurrentToDos(toDos);
      setCacheStale(false);
    });
  };

  const onChangeCategory = (categoryKey: string) => {
    updateCurrentToDos(categories!.find((category) => category.key === categoryKey)!);
  };

  const onAddNewItem = () => {
    setIsCreatingNewItem(true);
  };

  const onSubmit = (text: string) => {
    setIsCreatingNewItem(false);
    createItem({
      name: text,
      categoryKey: currentCategory!.key,
      tags: [],
    }).then(() => setCacheStale(true));
  };

  const onDelete = (id: string) => {
    deleteItem(id).then(() => setCacheStale(true));
  };

  const classes = useAppStyles();

  return (
    <>
      {categories && currentCategory && (
        <Container className={classes.container}>
          <TabBar categories={categories} currentCategory={currentCategory} onChangeCategory={onChangeCategory} />
          {features.useSearchBar && <SearchBar />}
          <ToDoItemList
            items={currentToDos || []}
            categoryName={currentCategory.displayName}
            isCreatingNewItem={isCreatingNewItem}
            onSubmitNewItem={onSubmit}
            onDeleteItem={onDelete}
          />
          <AddNewToDoItemButton onClick={onAddNewItem} />
        </Container>
      )}
    </>
  );
};

export default App;
