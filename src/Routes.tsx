import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Cart from "./pages/Cart";
import Swatches from "./pages/Swatches";

export default function Routes() {
  return (
    <Switch>
      <Route path="/cart" component={Cart} />
      <Route exact path={["/", "/swatches"]} component={Swatches} />
    </Switch>
  );
}
