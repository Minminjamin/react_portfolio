import News from "../news/News";
import Visual from "../visual/Visual";
import Info from "../info/Info";
import "../mainWrap/Main.scss";
import Btns from "../btns/Btns";

const Main = () => {
  return (
    <main className="mainWrap">
      <Visual />
      <Info />
      <News />
      <Btns />
    </main>
  );
};

export default Main;
