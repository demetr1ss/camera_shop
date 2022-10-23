export type CameraType = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  category: string,
  description: string,
  level: string,
  rating: number,
  price: number,
  previewImg: string,
  previewImg2x: string,
  previewImgWebp: string,
  previewImgWebp2x: string,
  reviewCount: number
}

export type CamerasPriceRangeType = {
  min: number,
  max: number
}

export type fetchCameraPayloadType = {
  page: number,
  sortType?: string,
  orderType?: string,
}

export type SearchCameraType = {
  id: number,
  name: string,
}

export type PromoType = {
  id: number,
  name: string,
  previewImg: string,
  previewImg2x: string,
  previewImgWebp: string,
  previewImgWebp2x: string
}

export type ReviewType = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  review: string,
  rating: number,
  createAt: string,
  cameraId: number,
}

export type ReviewPostType = {
  cameraId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  review: string,
  rating: number,
}

export type FetchReviewType = {
  id: number;
  count: number;
}

export type ReviewPostKeysType = keyof ReviewPostType;
