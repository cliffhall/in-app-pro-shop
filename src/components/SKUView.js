import React, { Component } from 'react';

class SKUView extends Component {

    render() {

        const {sku} = this.props;

        return  (
            <tr>
                <td>{sku.name}</td>
                <td>{sku.description}</td>
                <td>{sku.price}</td>
                <td>{sku.consumable ? 'yes' : 'no'}</td>
                <td>{sku.limited ? 'yes' : 'no'}</td>
                <td>{sku.limited ? sku.limit : ''}</td>
            </tr>
        );
    }
}

export default SKUView;
