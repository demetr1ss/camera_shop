import { toast, Zoom } from 'react-toastify';
import { ReviewType } from './types/types';

type showNotifyPropsType = {
  type: string;
  message: string;
}

const ToastType = {
  Error: 'error',
  Warn: 'warn',
} as const;


export const showNotify = (options: showNotifyPropsType): void => {
  switch(options.type) {
    case ToastType.Error:
      toast.error(options.message, {
        toastId: 1,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
        transition: Zoom,
        pauseOnHover: false,
      });
      break;
    case ToastType.Warn:
      toast.warn(options.message, {
        toastId: 2,
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
        transition: Zoom,
        pauseOnHover: false,
      });
      break;
    default:
      throw new Error(`toast type "${options.type}" not exist`);
  }};

export const getArrayWithFixLength = (length: number) => Array.from({length}, (_, i) => i + 1);

export const scrollToTop = () => window.scrollTo(0, 0);

export const sortReviewFromNewToOld = (reviews: ReviewType[]) =>
  reviews.sort((a: ReviewType, b: ReviewType) =>
    Date.parse(b.createAt) - Date.parse(a.createAt)
  );

export const humanDate = (date: string) => new Date(date).toLocaleDateString('ru-GB', {
  day: 'numeric',
  month: 'long'
});

export const dateTime = (date: string) => new Date(date).toISOString();
