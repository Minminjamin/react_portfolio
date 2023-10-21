import News from "../news/News";
import Visual from "../visual/Visual";
import Info from "../info/Info";
import "../mainWrap/Main.scss";
import Btns from "../btns/Btns";
import Welcome from "../welcome/Welcome";

const Main = () => {
  return (
    <main className="mainWrap">
      <Welcome />
      <Visual />
      <Info />
      <News />
      <Btns />
    </main>
  );
};

export default Main;
