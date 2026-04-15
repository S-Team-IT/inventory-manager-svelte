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
