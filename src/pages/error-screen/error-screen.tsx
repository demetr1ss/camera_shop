import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoute } from '../../const/const';
import styles from './error-screen.module.css';

export default function ErrorScreen() {
  return (
    <div className="wrapper">
      <Header />
      <main>

        <div className="page-content">
          <section className={styles.container}>
            <h1 className={styles.error404}>Oops..</h1>
            <h2 className={styles.description}>Something went wrong</h2>
            <Link className={styles.link} to={AppRoute.Main}>Try again</Link>
          </section>
        </div>
      </main>
    </div>
  );
}
