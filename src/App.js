import logo from "./logo.svg";
import "./App.css";
import Header from "./component/common/header/Header";
import "./styles/global.scss";
import Department from "./component/sub/department/Department";
import Youtube from "./component/sub/youtube/Youtube";

function App() {
  return (
    <>
      <Header />
      <Youtube />
      {/* <Department /> */}
    </>
  );
}

export default App;
