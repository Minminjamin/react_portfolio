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
import { useMedia } from "./hooks/useMedia";
import { useDispatch } from "react-redux";
import Menu from "./component/common/menu/Menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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

        <Menu />
        {/* {isOpen && <Menu />} */}
        <Route path="/" component={Footer} />
        {/* <Footer /> */}
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
