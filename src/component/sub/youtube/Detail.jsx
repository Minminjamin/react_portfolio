import { useParams } from "react-router-dom";
import Layout from "../../common/layout/Layout";

const Detail = () => {
  const { id } = useParams();
  return (
    <Layout title={"Youtube Detail"}>
      <p>유튜브 상세 페이지 {id}</p>
    </Layout>
  );
};

export default Detail;
