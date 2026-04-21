export type product = {
  masterID: string;
  name: string;
  photoPaths: string[];
  quantity: number;
  category: {
    name: string;
  };
  isDisabled: boolean;
};

export type transaction = {
  id: string;
  creationTimestamp: Date;
  logger: {
    firstName: string;
  };
  product: {
    name: string;
  };
  quantityChanged: number;
  deliveryID: string;
};

export type supplier = {
  id: string;
  name: string;
};

export type deliveryOrder = {
  orderID: string;
  orderDate: Date;
  supplier: {
    name: string;
  };
};

export type user = {
  id: string;
  role: string;
  email: string;
  firstName: string;
};

export type category = {
  id: string;
  name: string;
};

export type productInsert = {
  product_id: string;
  master_id: string;
  name: string;
  photo_paths: string[];
  category_id: number;
  supplier_id: number;
  initial_quantity: number;
  current_quantity: number;
  disabled: boolean;
};

export type balance = {
  balance: number;
};

export type balanceTransaction = {
  project_id: string;
  balance_changed: number;
  created_at: Date;
  logger_id: string;
};
