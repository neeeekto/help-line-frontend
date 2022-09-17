// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import { useJobsQuery } from '@help-line/api/admin';

export function App() {
  const jobsQuery = useJobsQuery();
  return <>{jobsQuery.isLoading ? 'loading' : jobsQuery.data?.length}</>;
}

export default App;
