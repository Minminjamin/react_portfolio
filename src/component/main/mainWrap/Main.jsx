import News from "../news/News";
import Visual from "../visual/Visual";
import Info from "../info/Info";
import "./Main.scss";

const Main = () => {
  return (
    <main className="mainWrap">
      <Visual />
      <News />
      <Info />
    </main>
  );
};

export default Main;
