import React from "react";
import {AtomSpinner} from "react-epic-spinners";

import CategoryView from "./CategoryView";
import {AppPanelGroup, AppWell} from "../styles";

export default function CategoryList(props) {

    // Get the salient props
    const {skuTypesFetched, skuTypes, drizzle, shop} = props;

    // Render the SKU Type list(or a message and spinner if still fetching
    return <AppPanelGroup id="skuTypes">
        {
            skuTypesFetched
                ? skuTypes.map( skuType => <CategoryView drizzle={drizzle} key={skuType.skuTypeId} skuType={skuType} shop={shop}/> )
                : <AppWell>
                    <h2>Fetching Categories</h2>
                    <AtomSpinner color='red'/>
                </AppWell>
        }
    </AppPanelGroup>
};
