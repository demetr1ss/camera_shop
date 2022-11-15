import styles from './not-found-screen.module.css';
import Header from '../../components/header/header';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import {showNotify} from '../../utils/utils';

export default function NotFoundScreen(): JSX.Element {
  const location = useLocation();
  showNotify({
    type: 'error',
    message: `Page "${location.pathname}" not found`
  });

  return (
    <div className="wrapper">
      <Header />
      <main>

        <div className="page-content">
          <section className={styles.container}>
            <h1 className={styles.error404}>404</h1>
            <h2 className={styles.description}>Page not found</h2>
            <Link className={styles.link} to={AppRoute.Main}>Вернуться на главную</Link>
          </section>
        </div>
      </main>
    </div>
  );
}
