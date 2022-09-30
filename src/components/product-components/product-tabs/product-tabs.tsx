import { useEffect, useState } from 'react';
import browserHistory from '../../../browser-history';
import { ProductTabsHash } from '../../../const/const';
import { CameraType } from '../../../types/types';

type ProductTabsType = {
  camera: CameraType
}

export default function ProductTabs({ camera }: ProductTabsType) {
  const {
    vendorCode,
    type,
    category,
    level,
    description,
  } = camera;

  const [activeTab, setActiveTab] = useState<string>(
    browserHistory.location.hash ||
    ProductTabsHash.Description
  );

  useEffect(() => {
    browserHistory.push(activeTab);
  }, [activeTab]);


  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={`tabs__control ${activeTab === ProductTabsHash.Specifications ? 'is-active' : ''}`}
          type="button"
          onClick={() => setActiveTab(ProductTabsHash.Specifications)}
        >
          Характеристики
        </button>
        <button
          className={`tabs__control ${activeTab === ProductTabsHash.Description ? 'is-active' : ''}`}
          type="button"
          onClick={() => setActiveTab(ProductTabsHash.Description)}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${activeTab === ProductTabsHash.Specifications ? 'is-active' : ''}`}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text"> {vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={`tabs__element ${activeTab === ProductTabsHash.Description ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
