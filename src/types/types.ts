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

export type FetchCameraPayloadType = {
  currentPage: number;
  params: {
    sortType: string | null
    orderType: string | null
    category: string | null | string[]
    level: string | null | string[]
    maxPrice: string | null
    minPrice: string | null
    type: string | null | string[]
  }
}

export type CurrentCatalogPathType = {
  currentPage: number;
  search?: string;
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
