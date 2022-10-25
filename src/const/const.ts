export const MAX_RATING = 5;
export const MIN_REVIEW_LENGTH = 5;
export const DEFAULT_PAGE = 1;
export const LIMIT_CARD_PER_PAGE = 9;
export const PAGE_STEP = 1;
export const MAX_SIMILAR_CAMERAS = 3;
export const SLIDE_STEP = 1;
export const REVIEWS_PER_PAGE = 3;
export const BREADCRUMBS_POX_X = 380;

export const enum AppRoute {
  Main = '/',
  CatalogPage = '/catalog/page_:page',
  ProductPage = '/product/:id',
  NotFound = '/*',
}

type FiltersType = {
  [key: string]: {
    [key: string]: string
  }
}

export const Filters: FiltersType = {
  Category: {
    photocamera: 'Фотоаппарат',
    videocamera: 'Видеокамера'
  },
  Type: {
    digital: 'Цифровая',
    film: 'Плёночная',
    snapshot: 'Моментальная',
    collection: 'Коллекционная'
  },
  Level: {
    zero: 'Нулевой',
    'non-professional': 'Любительский',
    professional: 'Профессиональный'
  }
};

type FilterTitleType = {
    [key: string]: string
}

export const FilterTitle: FilterTitleType = {
  Category: 'Категория',
  Type: 'Тип камеры',
  Level: 'Уровень',
} as const;

export const APIRoute = {
  Cameras: '/cameras',
  Camera: '/cameras/:id',
  Reviews: '/cameras/:id/reviews?_sort=createAt&_order=desc&_end=:count',
  PostReview: '/reviews',
  SimilarCameras: '/cameras/:id/similar',
  Promo: '/promo',
} as const;

export const QueryParameter = {
  Limit: '_limit',
  Page: '_page',
  NameLike: 'name_like',
  Sort: '_sort',
  Order: '_order',
  Type: 'type',
  Category: 'category',
  Level: 'level',
  MinPrice: 'price_gte',
  MaxPrice: 'price_lte'
} as const;

type QueryParameterKeys = keyof typeof QueryParameter;
export type QueryParameterValues = typeof QueryParameter[QueryParameterKeys];

export const FILTER_PARAMS: string[] = [
  QueryParameter.Level,
  QueryParameter.Type,
  QueryParameter.Category,
  QueryParameter.MaxPrice,
  QueryParameter.MinPrice
];

export const SortType = {
  Price: 'price',
  Rating: 'rating',
} as const;

export const OrderType = {
  Desc: 'desc',
  Asc: 'asc',
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

type RatingTitlesType = {
  [key: number]: string
}

export const RatingTitle: RatingTitlesType = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично'
} as const;

export const rating = Object.keys(RatingTitle).reverse().map(Number);
