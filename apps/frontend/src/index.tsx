import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Categories } from "./pages/Categories";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { CategoryPage } from "./pages/Category";
import { NotFound } from "./pages/NotFound";
import { client } from "./graphql";
import { useStore } from "./store";
import { Modal } from "./store/modals";
import { ThingPage } from "./pages/Thing";
import { GetCategoriesDocument, useGetCategoriesQuery } from "@ttd/graphql";

const theme = createTheme({
  typography: {
    fontFamily: `'Ubuntu Condensed', sans-serif`,
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FF005C",
          color: "#ffffff",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#5a5a5a",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const styles = {
            border: `1px solid ${theme.palette.primary.main}`,
          };
          if (ownerState.variant === "outlined" && !ownerState.error) {
            return !ownerState.multiline ? { ...styles, background: "#ffffff" } : styles;
          }
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
        root: ({ theme }) => ({
          "&.Mui-error": {
            border: `1px solid ${theme.palette.error.main}`,
          },
        }),
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: "15px !important",
        },
        underline: {
          "::before": {
            borderBottom: "1px solid #5a5a5a",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#5a5a5a",
    },
    secondary: {
      main: "#FF005C",
    },
    error: {
      main: "#FF4D4D",
    },
    background: {
      default: "#303030",
      paper: "#303030",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const App = () => {
  const getCategories = useGetCategoriesQuery();

  const { setCategories, currentThing, closeModal } = useStore();
  const [loadingData, setLoadingData] = React.useState(getCategories.loading);

  React.useEffect(() => {
    client.watchQuery({ query: GetCategoriesDocument }).subscribe({
      next(value) {
        setCategories(value.data.categories as any);
      },
    });
  }, []);

  React.useEffect(() => {
    if (!getCategories.loading && getCategories.data) {
      setCategories(getCategories.data.categories);
      closeModal(Modal.Loading);
      setLoadingData(false);
    }
  }, [getCategories.loading]);

  return (
    <Routes>
      <Route path="/" element={<Categories />}></Route>
      <Route path="category">
        <Route index element={<Categories />} />
        <Route path=":categoryId">
          <Route element={<CategoryPage loading={loadingData} />} index />
          <Route path="create" element={<ThingPage thing={currentThing || undefined} />} />
        </Route>
      </Route>

      <Route path="/error/not-found" element={<NotFound />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
