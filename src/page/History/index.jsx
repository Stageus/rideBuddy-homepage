import Aside from '../../widgets/Aside';
import Header from '../../widgets/Header';
import { PageWrapper } from './style/style';
import HistoryForm from './ui/HistoryForm';


const History = () => {
  return (
    <>
      <Header></Header>
      <Aside></Aside>
      <PageWrapper>
        <HistoryForm></HistoryForm>
      </PageWrapper>
    </>
  );
};

export default History;
