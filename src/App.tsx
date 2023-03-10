import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Routes from "routes";
import store from "store";
import Cover from "components/cover";
import "global.scss";

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes />
    </HashRouter>
    <Cover />
  </Provider>
);

export default App;
