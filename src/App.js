import logo from "./logo.svg";
import "./App.css";
import Header from "./component/common/header/Header";
import "./styles/global.scss";
import Department from "./component/sub/department/Department";

function App() {
  return (
    <>
      <Header />
      <Department />
    </>
  );
}

export default App;
