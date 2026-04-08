import type { product } from "types/supabase";

export type returnType = {
    enabledProducts: product[];
    disabledProducts: product[];
};

export function sortProductsIntoEnabledDisabled(products: product[]) {
    const enabledProducts: product[] = [];
    const disabledProducts: product[] = [];

    products.forEach((product) => {
        if (product.isDisabled) disabledProducts.push(product);
        else enabledProducts.push(product);
    });

    return {
        enabledProducts: enabledProducts,
        disabledProducts: disabledProducts,
    };
}
