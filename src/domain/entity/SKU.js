/**
 * Schema Entity: SKU
 *
 * @author Cliff Hall <cliff@futurescale.com>
 */
class SKU {

    /**
     * Constructor
     * @param shopId
     * @param name
     * @param description
     * @constructor
     */

    constructor (shopId, skuTypeId, name, description) {
        this.skuTypeId = skuTypeId;
        this.shopId = shopId;
        this.name = name;
        this.description = description;
    }

    /**
     * Get a new SKUType instance from an array returned from SKUTypeFactory.getSKUType()
     * @param a
     * @returns {SKUType}
     */
    static fromArray(a) {
        return new SKUType(a[0], a[1], a[2], a[3]);
    }

    /**
     * Get a new SKUType instance from a database representation
     * @param o
     * @returns {SKUType}
     */
    static fromObject(o) {
        return new SKUType(o.shopId, o.skuTypeId, o.name, o.description);
    }

    /**
     * Get a database representation of this SKUType instance
     * @returns {object}
     */
    toObject() {
        return JSON.parse(JSON.stringify(this));
    }

    /**
     * Get a string representation of this SKUType instance
     * @returns {boolean}
     */
    toString() {
        return [
            this.shopId,
            this.skuTypeId,
            this.name,
            this.description
        ].join(', ');
    }

    /**
     * Is this SKUType instance's shopId field valid?
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
     * Is this SKUType instance's skuTypeId field valid?
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
     * Is this SKUType instance's name field valid?
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
     * Is this SKUType instance's description field valid?
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
     * Is this SKUType instance valid?
     * @returns {boolean}
     */
    isValid() {
        return (
            this.shopIdIsValid() &&
            this.skuTypeIdIsValid &&
            this.nameIsValid() &&
            this.descriptionIsValid()
        );
    };
}

export default SKUType;