import {generatePath, useNavigate} from 'react-router-dom';
import {URLSearchParams} from 'url';
import {AppRoute, DEFAULT_PAGE} from '../const/const';

export default function useResetPage() {
  const navigate = useNavigate();

  return (params: URLSearchParams) => navigate({
    pathname: generatePath(AppRoute.CatalogPage, {page: String(DEFAULT_PAGE)}),
    search: decodeURI(params.toString())
  });
}
