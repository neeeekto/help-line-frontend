import styles from './api-client.module.scss';

/* eslint-disable-next-line */
export interface ApiClientProps {}

export function ApiClient(props: ApiClientProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ApiClient!</h1>
    </div>
  );
}

export default ApiClient;
