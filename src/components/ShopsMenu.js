import React from "react";
import {KitMenuItem, KitNavDropdown} from "./theme";

export default function ShopsMenu(props) {

    // Get the salient props
    const {
        shops,
        selectShop,
        selectedShopId,
        creatingShop
    } = props;

    // Render the menu
    return <KitNavDropdown
            disabled={creatingShop}
            title={`Shops (${shops.length})`}
            id='shop-dropdown'>
            {shops.length
                ? shops.map(
                    shop => <KitMenuItem
                        key={shop.shopId}
                        active={shop.shopId === selectedShopId}
                        onSelect={() => selectShop(shop.shopId)}
                    >{shop.name}</KitMenuItem>)
                : <KitMenuItem disabled={true}>No Shops</KitMenuItem>}
            <KitMenuItem divider/>
            <KitMenuItem onClick={() => selectShop(null)} disabled={!selectedShopId}>Create Shop</KitMenuItem>
        </KitNavDropdown>;
};
