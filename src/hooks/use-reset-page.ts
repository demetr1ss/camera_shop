import { generatePath, useNavigate } from 'react-router-dom';
import { URLSearchParams } from 'url';
import { AppRoute, DEFAULT_PAGE } from '../const/const';

function useResetPage() {
  const navigate = useNavigate();

  const resetPage = (params: URLSearchParams) => navigate({
    pathname: generatePath(AppRoute.CatalogPage, {page: String(DEFAULT_PAGE)}),
    search: decodeURI(params.toString())
  });

  return resetPage;
}

export default useResetPage;
