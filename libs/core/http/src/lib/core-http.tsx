import styles from './core-http.module.scss';

/* eslint-disable-next-line */
export interface CoreHttpProps {}

export function CoreHttp(props: CoreHttpProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CoreHttp!</h1>
    </div>
  );
}

export default CoreHttp;
