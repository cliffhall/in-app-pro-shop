import React from "react";
import {Glyphicon} from "react-bootstrap";
import {AtomSpinner} from "react-epic-spinners";

import ItemView from "./ItemView";
import {CURRENCIES} from "../constants";
import {AppPanelGroup, AppTable, AppWell} from "./styled";

export default function ItemList(props) {
    const {skusFetched, skuType, shop, skus} = props;

    // Render the SKU rows
    const renderSKUs = () => {
        return skus.map( sku => skuType.skuTypeId === sku.skuTypeId ? <ItemView key={sku.skuId} sku={sku}/> : null );
    };

    return skusFetched
        ? <AppPanelGroup id={`skus-${skuType.skuTypeId}`}>
            <AppTable striped bordered condensed hover>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Description</td>
                    <td align="right">Price (<Glyphicon glyph={CURRENCIES[shop.fiat].icon} />)</td>
                    <td align="middle">Consumable</td>
                    <td align="middle">Limited</td>
                    <td align="right">Limit</td>
                </tr>
                </thead>
                <tbody>
                {renderSKUs()}
                </tbody>
            </AppTable>
        </AppPanelGroup>
        : <AppWell>
            <h2>Fetching SKUs</h2>
            <AtomSpinner color='red'/>
        </AppWell>;
};
