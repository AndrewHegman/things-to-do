import "./App.css";
import React from "react";
import { createItem, getCategories, getToDos, deleteItem } from "./API/MockFetch";
import { Category } from "./Interface/Category";
import { SearchBar } from "./Components/SearchBar";
import { TabBar } from "./Components/TabBar/TabBar";
import { ToDoItem } from "./Interface/ToDoItem";
import { ToDoItemList } from "./Components/ToDoItemList";
import { features } from "./features";
import { Container } from "@material-ui/core";
import { useAppStyles } from "./App.styles";
import { Route, RouteComponentProps, Switch, useHistory, useRouteMatch } from "react-router";
import { IRouterState } from "./Interface/Router";
import { DeveloperTools } from "./Components/DeveloperTools";

const App: React.FC<{}> = () => {
  const [isLoadingCategories, setIsLoadingCategories] = React.useState<boolean>(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [cacheStale, setCacheStale] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsLoadingCategories(true);
    getCategories().then((categories) => {
      setCategories(categories);
      setIsLoadingCategories(false);
    });
  }, []);

  const onDelete = (id: string) => {
    deleteItem(id).then(() => setCacheStale(true));
  };

  const classes = useAppStyles();

  return (
    <>
      <Container className={classes.container}>
        {features.useSearchBar && <SearchBar />}
        {isLoadingCategories && <div>loading...</div>}

        <Switch>
          <Route exact path={"/:category"}>
            {!isLoadingCategories && (
              <>
                <TabBar categories={categories} slowMode={false} />
                <ToDoItemList onDeleteItem={onDelete} />
              </>
            )}
          </Route>

          <Route path="*">
            <div>Whale whale whale whale</div>
          </Route>
        </Switch>
      </Container>
      <DeveloperTools />
    </>
  );
};

export default App;
