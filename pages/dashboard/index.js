import Header from '../../components/Header';

const Dashboard = (props) => {
  return <>Dashboard</>;
};

Dashboard.getInitialProps = ({ query }) => {
  return { message: query };
};

export default Dashboard;
