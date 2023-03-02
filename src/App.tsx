import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "routes";
import store from "store";
import Cover from "components/cover";
import "global.scss";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <Cover />
  </Provider>
);

export default App;
