export const enum AppRoute {
  Main = '/',
  CatalogPage = '/catalog',
  ProductPage = '/product/:id',
  NotFound = '/*',
}

type FiltersType = {
  [key: string]: {
    [key: string]: string
  }
}

export const Filters: FiltersType = {
  'Категория': {
    photocamera: 'Фотокамера',
    videocamera: 'Видеокамера'
  },
  'Тип камеры': {
    digital: 'Цифровая',
    film: 'Пленочная',
    snapshot: 'Моментальная',
    collection: 'Коллекционная'
  },
  'Уровень': {
    zero: 'Нулевой',
    'non-professional': 'Любительский',
    professional: 'Профессиональный'
  }
};

export const APIRoute = {
  Cameras: '/cameras?_limit=9&_page=:page',
  Camera: '/cameras/:id',
  Reviews: '/cameras/:id/reviews',
  PostReview: '/reviews',
  SimilarCameras: '/cameras/:id/similar',
  Promo: '/promo',
} as const;

export const NameSpace = {
  App: 'APP',
  Cameras: 'CAMERAS',
  Camera: 'CAMERA',
  Reviews: 'REVIEWS',
  Promo: 'PROMO',
} as const;

export const enum LoadingStatus {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}

export const ProductTabsHash = {
  Specifications: '#specifications',
  Description: '#description'
} as const;

export const MAX_RATING = 5;
export const DEFAULT_PAGE = 1;
export const LIMIT_CARD_PER_PAGE = 9;
export const PAGE_STEP = 1;
export const MAX_SIMILAR_CAMERAS = 3;
export const SLIDE_STEP = 1;
export const REVIEWS_PER_PAGE = 3;
