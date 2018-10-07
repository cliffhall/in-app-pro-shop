// Shop related actions
export const CREATING_SHOP  = 'shop/creating';
export const IDS_REQUESTED  = 'shop/ids-requested';
export const SHOP_REQUESTED = 'shop/shop-requested';

// Create a shop
export const createShop = (name, desc) => {
    return {
        type: CREATING_SHOP,
        creatingShop: true,
        name,
        desc
    };
};
