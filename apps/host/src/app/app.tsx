import * as React from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

const Dashboard = React.lazy(() => import('dashboard/Module'));
const Intelligence = React.lazy(() => import('intelligence/Module'));
const Planning = React.lazy(() => import('planning/Module'));
const Output = React.lazy(() => import('output/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/intelligence">Intelligence</Link>
        </li>
        <li>
          <Link to="/planning">Planning</Link>
        </li>
        <li>
          <Link to="/output">Output</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
