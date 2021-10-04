export enum Role {
  admin = 'admin',
  user = 'user',
  seller = 'seller'
}
export enum Status {
  draft = 'draft',
  review = 'review',
  published = 'published'
}

export enum userStatus {
  pending = 'pending',
  active = 'active',
  inactive = 'inactive',
  blocked = 'blocked'
}

export enum AddressType {
  home = 'home',
  work = 'work'
}

export enum ImgRef {
  product = 'Product',
  user = 'User',
  seller = 'Seller',
  page = 'Page'
}

export enum Gender {
  male = 'male',
  female = 'female',
  not_disclosed = 'not_disclosed'
}

export enum OrderStatus {
  pending = 'pending',
  placed = 'placed',
  accepted = 'accepted',
  ready_to_ship = 'ready_to_ship',
  shipped = 'shipped',
  out_for_delivery = 'out_for_delivery',
  deilvered = 'delivered',
  return_requested = 'return_requested',
  return_accepted = 'return_requested',
  returned_to_seller = 'returned_to_seller',
  replacement_shipped = 'replacement_shipped',
  refunded = 'refunded',
  cancelled = 'cancelled',
  return_to_origin = 'return_to_origin'
}
