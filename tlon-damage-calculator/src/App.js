// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import StatsComparisonEvalPage from 'pages/StatsComparisonEvalPage/StatsComparisonEvalPage';

import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import packageJson from '../package.json'; // Import package.json to get the homepage


const { homepage } = packageJson;
const basename = homepage ? new URL(homepage).pathname : '/';


function App() {
  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<StatsComparisonEvalPage  />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
