import logo from "./logo.svg";
import "./App.css";
import Header from "./component/common/header/Header";
import "./styles/global.scss";
import Department from "./component/sub/department/Department";
import Youtube from "./component/sub/youtube/Youtube";
import { Route } from "react-router-dom";
import Members from "./component/sub/members/Members";

function App() {
  return (
    <>
      <Header />
      <Route path="/department" component={Department} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/members" component={Members} />
    </>
  );
}

export default App;
