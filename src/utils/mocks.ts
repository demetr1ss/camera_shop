import { CameraType, PromoType, ReviewType } from '../types/types';
import { datatype, commerce, image, internet } from 'faker';

export const createRandomCamera = (): CameraType => ({
  id: datatype.number(),
  name: commerce.product(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  category: datatype.string(),
  description: commerce.productDescription(),
  level: datatype.string(),
  rating: datatype.number({min: 0, max: 5}),
  price: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number()
});

export const createRandomPromo = (): PromoType => ({
  id: datatype.number(),
  name: commerce.product(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const createMockReview = (): ReviewType => ({
  id: datatype.uuid(),
  userName: internet.userName(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  review: datatype.string(),
  rating: datatype.number({min: 0, max: 5}),
  createAt: String(datatype.datetime()),
  cameraId: datatype.number(),
});
