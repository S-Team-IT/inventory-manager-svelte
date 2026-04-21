const FILTER = { none: "none", productid: "productid" } as const;
export type FILTER = (typeof FILTER)[keyof typeof FILTER];
