import styles from './core-auth.module.scss';

/* eslint-disable-next-line */
export interface CoreAuthProps {}

export function CoreAuth(props: CoreAuthProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CoreAuth!</h1>
    </div>
  );
}

export default CoreAuth;
