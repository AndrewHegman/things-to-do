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
import { useGetCategoriesQuery } from "@ttd/graphql";
import { Modal } from "./store/modals";

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
        root: {
          background: "#ffffff",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "15px !important",
        },
        input: (props) => {
          const { theme } = props;
          return {
            color: theme.palette.primary.main,
            background: theme.palette.text.primary,
            borderRadius: "15px",
          };
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

  React.useEffect(() => {
    if (loading) {
      openModal(Modal.Loading);
    }
    if (!loading && data && !error) {
      setCategories(data.categories);
      closeModal(Modal.Loading);
    }
  }, [loading, data, setCategories, openModal, closeModal, error]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Categories />}></Route>
          <Route path="category/:categoryId" element={<CategoryPage />}></Route>
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
