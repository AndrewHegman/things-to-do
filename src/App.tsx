import "./App.css";
import React from "react";
import { ToDoList } from "./Components/ToDoList";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import { actions } from "./Redux";
import { selectors } from "./Redux/categories";
import { CategoriesDialog } from "./Components/CategoriesDialog";
import { TTDAppBar } from "./Components/AppBar";
import { ThemeProvider } from "@emotion/react";

const App: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const currentCategory = useAppSelector(selectors.selectCurrentCategory);

  const chooseACategoryPage = <div onClick={() => dispatch(actions.categoriesDialog.open())}>Please choose a category by clicking here</div>;

  const theme = {};

  return (
    <ThemeProvider theme={theme}>
      <div>
        <TTDAppBar />
        <CategoriesDialog />
        {currentCategory ? <ToDoList /> : chooseACategoryPage}
      </div>
    </ThemeProvider>
  );
};

export default App;
