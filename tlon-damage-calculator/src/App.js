// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StatsAndTargetForm from './components/StatsAndTargetForm/StatsAndTargetForm';

function App() {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div className="container">
      <StatsAndTargetForm onSuccessfulSubmitCallback={onSubmit} />
    </div>
  );
}

export default App;
