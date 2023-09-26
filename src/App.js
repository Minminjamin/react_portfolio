import logo from "./logo.svg";
import "./App.css";
import Header from "./component/common/header/Header";
import "./styles/global.scss";
import Department from "./component/sub/department/Department";
import Youtube from "./component/sub/youtube/Youtube";
import { Route } from "react-router-dom";
import Members from "./component/sub/members/Members";
import Gallery from "./component/sub/gallery/Gallery";
import Contact from "./component/sub/contact/Contact";

function App() {
  return (
    <>
      <Header />
      <Route path="/department" component={Department} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/members" component={Members} />
      <Route path="/contact" component={Contact} />
      <Route path="/gallery" component={Gallery} />
    </>
  );
}

export default App;
