import "./App.css";
import Header from "./component/common/header/Header";
import "./styles/global.scss";
import Department from "./component/sub/department/Department";
import Youtube from "./component/sub/youtube/Youtube";
import { Route, Switch } from "react-router-dom";
import Members from "./component/sub/members/Members";
import Gallery from "./component/sub/gallery/Gallery";
import Contact from "./component/sub/contact/Contact";
import Footer from "./component/common/footer/Footer";
import Detail from "./component/sub/youtube/Detail";
import Community from "./component/sub/community/Community";
import Main from "./component/main/mainWrap/Main";
import { useEffect, useRef } from "react";
import { useMedia } from "./hooks/useMedia";
// import "./styles/index.css";

function App() {
  const refMain = useRef(null);

  return (
    <main className={useMedia()}>
      <Switch>
        <Route exact path="/">
          <Header isMain={true} />
          <Main />
        </Route>
        <Route path="/">
          <Header isMain={false} />
        </Route>
      </Switch>
      <Route path="/department" component={Department} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/members" component={Members} />
      <Route path="/contact" component={Contact} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/community" component={Community} />
      <Route path="/detail/:id" component={Detail} />

      <Route path="/" component={Footer} />
      {/* // <Footer /> */}
    </main>
  );
}

export default App;
