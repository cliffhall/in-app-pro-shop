import React, {Component} from 'react';

class ItemView extends Component {

    render() {

        const {sku} = this.props;

        return  (
            <tr>
                <td>{sku.name}</td>
                <td>{sku.description}</td>
                <td align="right">{parseFloat(sku.price / 100).toFixed(2)}</td>
                <td align="middle">{sku.consumable ? 'yes' : 'no'}</td>
                <td align="middle">{sku.limited ? 'yes' : 'no'}</td>
                <td align="right">{sku.limited ? sku.limit : ''}</td>
            </tr>
        );
    }
}

export default ItemView;
