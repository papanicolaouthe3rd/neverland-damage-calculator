// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import StatsComparisonEvalPage from 'pages/StatsComparisonEvalPage/StatsComparisonEvalPage';

function App() {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div className="container">
      <StatsComparisonEvalPage />
    </div>
  );
}

export default App;
