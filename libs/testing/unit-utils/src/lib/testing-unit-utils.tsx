import styles from './testing-unit-utils.module.scss';

/* eslint-disable-next-line */
export interface TestingUnitUtilsProps {}

export function TestingUnitUtils(props: TestingUnitUtilsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to TestingUnitUtils!</h1>
    </div>
  );
}

export default TestingUnitUtils;
