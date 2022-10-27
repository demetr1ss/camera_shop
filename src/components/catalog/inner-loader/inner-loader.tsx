import styles from './inner-loader.module.css';

function InnerLoader() {
  return (
    <div className={styles.container} data-testid='inner-loader'>
      <div className={styles['loadingio-spinner-eclipse-12i4fne0gitq']}>
        <div className={styles['ldio-5uvrrzwz2by']}><div></div></div>
      </div>
    </div>
  );
}

export default InnerLoader;
