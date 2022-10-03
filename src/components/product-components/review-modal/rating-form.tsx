import { Fragment, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { rating, RatingTitle } from '../../../const/const';
import { ReviewPostKeysType } from '../../../types/types';

type RatingFormPropsType = {
  getInputClassName: (inputName: ReviewPostKeysType, additionalClassName?: string) => string;
  ratingRegester: UseFormRegisterReturn;
  isFormDisabled: boolean;
}

export default function RatingForm({ getInputClassName, ratingRegester, isFormDisabled }: RatingFormPropsType) {
  const [currentRating, setCurrentRating] = useState(0);

  return (
    <fieldset className={getInputClassName('rating', 'rate')}>
      <legend className="rate__caption">Рейтинг
        <svg width="9" height="9" aria-hidden="true" >
          <use xlinkHref="#icon-snowflake" />
        </svg>
      </legend>
      <div className="rate__bar">
        <div className="rate__group">
          {rating.map((item) => (
            <Fragment key={item}>
              <input
                className="visually-hidden"
                id={`star-${item}`}
                type="radio"
                defaultValue={item}
                disabled={isFormDisabled}
                {...ratingRegester}
                onChange={() => setCurrentRating(item)}
              />
              <label className="rate__label" htmlFor={`star-${item}`} title={RatingTitle[item]} />
            </Fragment>
          ))}
        </div>
        <div className="rate__progress">
          <span className="rate__stars">
            {currentRating}
          </span>
          <span>
            /
          </span>
          <span className="rate__all-stars">
            5
          </span>
        </div>
      </div>
      <p className="rate__message">
        Нужно оценить товар
      </p>
    </fieldset>
  );
}
