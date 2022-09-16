import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Categories } from "./pages/Categories";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { CategoryPage } from "./pages/Category";
import { NotFound } from "./pages/NotFound";
import { client } from "./graphql";
import { useStore } from "./store";
import { Category, useGetCategoriesQuery } from "@ttd/graphql";
import { Modal } from "./store/modals";
import { CreateThing } from "./pages/CreateThing";

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
  const { setCategories, openModal, closeModal } = useStore();
  const { loading, error, data } = useGetCategoriesQuery();
  const [loadingCategories, setLoadingCategories] = React.useState(loading);

  React.useEffect(() => {
    if (!loading && data && !error) {
      setCategories(data.categories);
      console.log(data.categories);
      setLoadingCategories(false);
    }
  }, [loading, data, setCategories, openModal, closeModal, error]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Categories loading={loadingCategories} />}></Route>
          <Route path="category">
            <Route index element={<Categories loading={loadingCategories} />} />
            <Route path=":categoryId">
              <Route element={<CategoryPage loading={loadingCategories} />} index />
              <Route path="create" element={<CreateThing />} />
            </Route>
          </Route>

          <Route path="/error/not-found" element={<NotFound />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
