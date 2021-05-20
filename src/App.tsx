import "./App.css";
import { Main } from "./Pages/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { categories } from "./Data/Category";
import React from "react";

function App() {
  React.useEffect(() => {
    // need to fetch categories/routes here
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        {categories.map((category) => (
          <Route path={category.pathName} exact key={category.pathName}>
            <Main currentCategory={category} categories={categories} />
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
