/**
 * Schema Entity: Shop
 *
 * @author Cliff Hall <cliff@futurescale.com>
 */
class Shop {

    /**
     * Constructor
     * @param owner
     * @param shopId
     * @param name
     * @param description
     * @param fiat
     * @constructor
     */

    constructor (owner, shopId, name, description, fiat="USD") {
        this.owner = owner;
        this.shopId = shopId;
        this.name = name;
        this.description = description;
        this.fiat = fiat;
    }

    /**
     * Get a new Shop instance from an array returned from ShopFactory.getShop()
     * @param a
     * @returns {Shop}
     */
    static fromArray(a) {
        return new Shop(a[0], a[1], a[2], a[3], a[4]);
    }

    /**
     * Get a new Shop instance from a database representation
     * @param o
     * @returns {Shop}
     */
    static fromObject(o) {
        return new Shop(o.owner, o.shopId, o.name, o.description, o.fiat);
    }

    /**
     * Get a database representation of this Shop instance
     * @returns {object}
     */
    toObject() {
        return JSON.parse(JSON.stringify(this));
    }

    /**
     * Get a string representation of this Shop instance
     * @returns {boolean}
     */
    toString() {
        return [
            this.owner,
            this.shopId,
            this.name,
            this.description,
            this.fiat
        ].join(', ');
    }

    /**
     * Is this Shop instance's owner field valid?
     * @returns {boolean}
     */
    ownerIsValid() {
        let valid = false;
        let regex = RegExp(/^0x[a-fA-F0-9]{40}$/);
        try {
            valid = (
                typeof this.owner === 'string' &&
                regex.test(this.owner)
            );
        } catch (e) {
        }
        return valid;
    };

    /**
     * Is this Shop instance's shopId field valid?
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
     * Is this Shop instance's name field valid?
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
     * Is this Shop instance's description field valid?
     * @returns {boolean}
     */
    descriptionIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.description === 'string' &&
                this.description.length > 0
            );
        } catch (e) {
        }
        return valid;
    };

    /**
     * Is this Shop instance's fiat field valid?
     * @returns {boolean}
     */
    fiatIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.fiat === 'string' &&
                this.fiat.length > 0
            );
        } catch (e) {
        }
        return valid;
    };

    /**
     * Is this Shop instance valid?
     * @returns {boolean}
     */
    isValid() {
        return (
            this.ownerIsValid() &&
            this.shopIdIsValid() &&
            this.nameIsValid() &&
            this.descriptionIsValid() &&
            this.fiatIsValid()
        );
    };
}

export default Shop;