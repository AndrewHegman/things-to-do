import "./App.css";
import React from "react";
import { SearchBar } from "./Components/SearchBar";
import { features } from "./features";
import { Container, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useAppStyles } from "./App.styles";
import { Redirect, Route, Switch } from "react-router";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { actions } from "./Redux";
import { RootState } from "./Redux/store";
import { categories } from "./API/categories";
import { ToDoItemListPage } from "./Pages/ToDoItemList/ToDoItemList";
import { NoCategoriesPage } from "./Pages/NoCategoriesPage/NoCategoriesPage";

// #dcdcdc
// 65c3c8

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#8eacbc",
      main: "#65c3c8",
      dark: "#34515f",
      contrastText: "#000",
    },
    secondary: {
      light: "#cfff94",
      main: "#9ccc64",
      dark: "#6b9b36",
      contrastText: "#000",
    },
    background: {
      default: "#efeae6",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#faf7f5",
      },
    },
    MuiChip: {
      root: {
        fontWeight: "bold",
        fontSize: "16px",
      },
      outlinedPrimary: {
        color: "#65c3c8",
      },
      colorPrimary: {
        color: "#faf7f5",
      },
      // label: {
      //   color: "#faf7f5",
      // },
    },
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    currentCategory: state.categories.currentCategory,
    isSlowMode: state.common.isSlowMode,
    slowModeTime: state.common.slowModeTime,
  };
};

const AppComponent: React.FC<PropsFromRedux> = (props) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsLoading(true);
    categories
      .getCategories(props.isSlowMode, props.slowModeTime)
      .then((categories) => {
        setIsLoading(false);
        dispatch(actions.categories.setCategories(categories));
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
    // No dependency array beause this should only run once--on app load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useAppStyles(theme);

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        {features.useSearchBar && <SearchBar />}
        {isLoading && <div>loading...</div>}

        <Switch>
          <Route exact path={"/:categoryId"}>
            {!isLoading && <ToDoItemListPage />}
          </Route>
          <Route exact path={"/"}>
            <NoCategoriesPage />
          </Route>
          <Route path="*">
            <div>Whale whale whale whale</div>
          </Route>
        </Switch>
        <Redirect to={props.currentCategory.pathName} />
      </Container>
    </ThemeProvider>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
const App = connect(mapStateToProps)(AppComponent);
export default App;
