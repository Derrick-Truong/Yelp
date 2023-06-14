
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/User/LoginFormModal";
import AllRestaurants from "./components/Restaurant/AllRestaurants";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateReview from "./components/Reviews/CreateReview";
import Test1 from "./components/Aws/Test1";
import TestRestaurant from "./components/Restaurant/TestRestaurant";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
  <>
  <Navigation isLoaded={isLoaded}/>
   {isLoaded && (
      <Switch>
        <Route exact path="/">
          <AllRestaurants/>
        </Route>
        <Route exact path="/Test1">
          <Test1/>
        </Route>
          <Route exact path="/restaurants/:restaurantId">
            <TestRestaurant/>
          </Route>
        <Route exact path='/createreview'>
          <CreateReview/>
        </Route>
      </Switch>
    )
   }
    </>
  );
}

export default App;
