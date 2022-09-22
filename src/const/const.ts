export const enum AppRoute {
  Main = '/',
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

export const MAX_RATING = 5;
