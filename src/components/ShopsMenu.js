import React from "react";
import {AppMenuItem, AppNavDropdown} from "./styled";

export default function ShopsMenu(props) {

    // Get the salient props
    const {
        shops,
        selectShop,
        selectedShopId,
        creatingShop
    } = props;

    // Render the menu
    return <AppNavDropdown
            disabled={creatingShop}
            title={`Shops (${shops.length})`}
            id='shop-dropdown'>
            {shops.length
                ? shops.map(
                    shop => <AppMenuItem
                        key={shop.shopId}
                        active={shop.shopId === selectedShopId}
                        onSelect={() => selectShop(shop.shopId)}
                    >{shop.name}</AppMenuItem>)
                : <AppMenuItem disabled={true}>No Shops</AppMenuItem>}
            <AppMenuItem divider/>
            <AppMenuItem onClick={() => selectShop(null)} disabled={!selectedShopId}>Create Shop</AppMenuItem>
        </AppNavDropdown>;
};
