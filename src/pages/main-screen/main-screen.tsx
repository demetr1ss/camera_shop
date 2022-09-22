import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';

export default function MainScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <Catalog />
        </div >
      </main >
    </div>
  );
}

