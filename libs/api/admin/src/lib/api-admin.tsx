import styles from './api-admin.module.scss';

/* eslint-disable-next-line */
export interface ApiAdminProps {}

export function ApiAdmin(props: ApiAdminProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ApiAdmin!</h1>
    </div>
  );
}

export default ApiAdmin;
