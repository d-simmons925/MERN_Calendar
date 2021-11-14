import { useEffect } from "react";
import AppNavbar from "./components/AppNavbar";
import Calendar from "./components/Calendar";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;
