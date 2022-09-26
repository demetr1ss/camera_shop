import styles from './loading-screen.module.css';

export default function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <img src='/img/Eclipse-1.9s-341px.svg' alt='loader'/>
    </div>
  );
}
