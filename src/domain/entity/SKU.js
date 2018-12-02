/**
 * Schema Entity: SKU
 *
 * @author Cliff Hall <cliff@futurescale.com>
 */
class SKU {

    /**
     * Constructor
     * @param shopId
     * @param skuId
     * @param skuTypeId
     * @param price
     * @param name
     * @param description
     * @param consumable
     * @param limited
     * @param limit
     */
    constructor (shopId, skuId, skuTypeId, price, name, description, consumable=false, limited=false, limit) {
        this.shopId = shopId;
        this.skuId = skuId;
        this.skuTypeId = skuTypeId;
        this.price = price;
        this.name = name;
        this.description = description;
        this.consumable = consumable;
        this.limited = limited;
        this.limit = limit;
    }

    /**
     * Get a new SKU instance from an array returned from SKUFactory.getSKU()
     * @param a
     * @returns {SKU}
     */
    static fromArray(a) {

        return new SKU(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
    }

    /**
     * Get a new SKU instance from a database representation
     * @param o
     * @returns {SKU}
     */
    static fromObject(o) {
        return new SKU(o.shopId, o.skuId, o.skuTypeId, o.price, o.name, o.description, o.consumable, o.limited, o.limit);
    }

    /**
     * Get a database representation of this SKU instance
     * @returns {object}
     */
    toObject() {
        return JSON.parse(JSON.stringify(this));
    }

    /**
     * Get a string representation of this SKU instance
     * @returns {boolean}
     */
    toString() {
        return [
            this.shopId,
            this.skuId,
            this.skuTypeId,
            this.price,
            this.name,
            this.description,
            this.consumable ? 'consumable' : 'not consumable',
            this.limited ? 'limited' : 'not limited',
            this.limit
        ].join(', ');
    }

    /**
     * Is this SKU instance's shopId field valid?
     * @returns {boolean}
     */
    shopIdIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.shopId === 'number' &&
                this.shopId >= 0
            );
        } catch (e) {
        }
        return valid;
    }

    /**
     * Is this SKU instance's skuId field valid?
     * @returns {boolean}
     */
    skuIdIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.skuId === 'number' &&
                this.skuId >= 0
            );
        } catch (e) {
        }
        return valid;
    }

    /**
     * Is this SKU instance's skuTypeId field valid?
     * @returns {boolean}
     */
    skuTypeIdIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.skuTypeId === 'number' &&
                this.skuTypeId >= 0
            );
        } catch (e) {
        }
        return valid;
    }

    /**
     * Is this SKU instance's price field valid?
     * @returns {boolean}
     */
    priceIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.price === 'number'
            );
        } catch (e) {
        }
        return valid;
    }

    /**
     * Is this SKU instance's name field valid?
     * @returns {boolean}
     */
    nameIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.name === 'string' &&
                this.name.length > 0
            );
        } catch (e) {
        }
        return valid;
    };

    /**
     * Is this SKU instance's description field valid?
     * @returns {boolean}
     */
    descriptionIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.description === 'string'
            );
        } catch (e) {
        }
        return valid;
    };

    /**
     * Is this SKU instance's consumable field valid?
     * @returns {boolean}
     */
    consumableIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.consumable === 'boolean'
            );
        } catch (e) {
        }
        return valid;
    };

    /**
     * Is this SKU instance's limited field valid?
     * @returns {boolean}
     */
    limitedIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.limited === 'boolean'
            );
        } catch (e) {
        }
        return valid;
    };

    /**
     * Is this SKU instance's limit field valid?
     * @returns {boolean}
     */
    limitIsValid() {
        let valid = false;
        try {
            valid = (
                this.limitedIsValid() &&
                typeof this.limit === 'number' &&
                this.limit > 0
            ) || true;
        } catch (e) {
        }
        return valid;
    }

    /**
     * Is this SKU instance valid?
     * @returns {boolean}
     */
    isValid() {
        return (
            this.shopIdIsValid() &&
            this.skuIdIsValid() &&
            this.skuTypeIdIsValid &&
            this.priceIsValid() &&
            this.nameIsValid() &&
            this.descriptionIsValid() &&
            this.consumableIsValid() &&
            this.limitedIsValid() &&
            this.limitIsValid()
        );
    };
}

export default SKU;