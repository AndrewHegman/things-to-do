import "./App.css";
import React from "react";
import { createItem, getToDos, deleteItem } from "./API/MockFetch";
import { Category } from "./Interface/Category";
import { SearchBar } from "./Components/SearchBar";
import { TabBar } from "./Components/TabBar/TabBar";
import { ToDoItem } from "./Interface/ToDoItem";
import { ToDoItemList } from "./Components/ToDoItemList";
import { features } from "./features";
import { Container } from "@material-ui/core";
import { useAppStyles } from "./App.styles";
import { Redirect, Route, RouteComponentProps, Switch, useHistory, useRouteMatch } from "react-router";
import { IRouterState } from "./Interface/Router";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { actions } from "./Redux";
import { RootState } from "./Redux/store";

const mapStateToProps = (state: RootState) => {
  return {
    isLoading: state.categories.isLoading,
    currentCategory: state.categories.currentCategory,
  };
};

const AppComponent: React.FC<PropsFromRedux> = (props) => {
  // const [isLoadingCategories, setIsLoadingCategories] = React.useState<boolean>(true);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [cacheStale, setCacheStale] = React.useState<boolean>(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getCategories());

    // setIsLoadingCategories(true);
    // getCategories().then((categories) => {
    //   setCategories(categories);
    //   setIsLoadingCategories(false);
    // });
  }, []);

  const onDelete = (id: string) => {
    deleteItem(id).then(() => setCacheStale(true));
  };

  const classes = useAppStyles();

  return (
    <Container className={classes.container}>
      {features.useSearchBar && <SearchBar />}
      {props.isLoading && <div>loading...</div>}

      <Switch>
        <Route exact path={"/:categoryId"}>
          {!props.isLoading && (
            <>
              <TabBar slowMode={false} />
              <ToDoItemList onDeleteItem={onDelete} />
            </>
          )}
        </Route>

        <Route path="*">
          <div>Whale whale whale whale</div>
        </Route>
      </Switch>
      <Redirect to={props.currentCategory.pathName} />
    </Container>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
const App = connect(mapStateToProps)(AppComponent);
export default App;
