import Header from '../../components/Header';
import MaterialForm from "../../components/MaterialForm";

const Dashboard = (props) => {
  return <MaterialForm />;
};

Dashboard.getInitialProps = ({ query }) => {
  return { message: query };
};

export default Dashboard;
