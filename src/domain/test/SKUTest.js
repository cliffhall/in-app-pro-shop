/**
 * Jasmine Test for Schema Entity: SKU
 *
 * @author Cliff Hall <cliff@futurescale.com>
 */
import {SKU} from '../index';

describe( "A valid SKU entity", () => {

    it( "can be created with complete constructor inputs", () => {

        const SHOP_ID = 444;
        const SKU_ID = 9;
        const SKU_TYPE_ID = 12;
        const PRICE = 500;
        const NAME = 'Sword of Destiny';
        const DESC = 'You were meant to wield this blade, you just know it.';
        const CONSUMABLE = false;
        const LIMITED = true;
        const LIMIT = 1;

        let sku = new SKU(SHOP_ID, SKU_ID, SKU_TYPE_ID, PRICE, NAME, DESC, CONSUMABLE, LIMITED, LIMIT);

        expect( sku ).not.toBeUndefined();
        expect( sku.shopId ).toBe( SHOP_ID );
        expect( sku.skuId ).toBe( SKU_ID );
        expect( sku.skuTypeId ).toBe( SKU_TYPE_ID );
        expect( sku.price ).toBe( PRICE );
        expect( sku.name ).toBe( NAME );
        expect( sku.description ).toBe( DESC );
        expect( sku.consumable ).toBe( CONSUMABLE );
        expect( sku.limited ).toBe( LIMITED );
        expect( sku.limit ).toBe( LIMIT );
        expect( sku.isValid() ).toBe( true );

    });

    it( "can be created with a plain object using fromArray()", () => {

        const SHOP_ID = 444;
        const SKU_ID = 9;
        const SKU_TYPE_ID = 12;
        const PRICE = 500;
        const NAME = 'Sword of Destiny';
        const DESC = 'You were meant to wield this blade, you just know it.';
        const CONSUMABLE = false;
        const LIMITED = true;
        const LIMIT = 1;

        const INPUT = [SHOP_ID, SKU_ID, SKU_TYPE_ID, PRICE, NAME, DESC, CONSUMABLE, LIMITED, LIMIT];

        let sku = SKU.fromArray( INPUT );

        expect( sku ).not.toBeUndefined();
        expect( sku.shopId ).toBe( SHOP_ID );
        expect( sku.skuId ).toBe( SKU_ID );
        expect( sku.skuTypeId ).toBe( SKU_TYPE_ID );
        expect( sku.price ).toBe( PRICE );
        expect( sku.name ).toBe( NAME );
        expect( sku.description ).toBe( DESC );
        expect( sku.consumable ).toBe( CONSUMABLE );
        expect( sku.limited ).toBe( LIMITED );
        expect( sku.limit ).toBe( LIMIT );
        expect( sku.isValid() ).toBe( true );

    });

    it( "can be created with a plain object using fromObject()", () => {

        const SHOP_ID = 444;
        const SKU_ID = 9;
        const SKU_TYPE_ID = 12;
        const PRICE = 500;
        const NAME = 'Sword of Destiny';
        const DESC = 'You were meant to wield this blade, you just know it.';
        const CONSUMABLE = false;
        const LIMITED = true;
        const LIMIT = 1;

        const INPUT = {
            shopId: SHOP_ID,
            skuId: SKU_ID,
            skuTypeId: SKU_TYPE_ID,
            price: PRICE,
            name: NAME,
            description: DESC,
            consumable: CONSUMABLE,
            limited: LIMITED,
            limit: LIMIT
        };

        let sku = SKU.fromObject( INPUT );

        expect( sku ).not.toBeUndefined();
        expect( sku.shopId ).toBe( SHOP_ID );
        expect( sku.skuId ).toBe( SKU_ID );
        expect( sku.skuTypeId ).toBe( SKU_TYPE_ID );
        expect( sku.price ).toBe( PRICE );
        expect( sku.name ).toBe( NAME );
        expect( sku.description ).toBe( DESC );
        expect( sku.consumable ).toBe( CONSUMABLE );
        expect( sku.limited ).toBe( LIMITED );
        expect( sku.limit ).toBe( LIMIT );
        expect( sku.isValid() ).toBe( true );

    });

    it( "can be created with a plain object that was created using toObject()", () => {

        const SHOP_ID = 444;
        const SKU_ID = 9;
        const SKU_TYPE_ID = 12;
        const PRICE = 500;
        const NAME = 'Sword of Destiny';
        const DESC = 'You were meant to wield this blade, you just know it.';
        const CONSUMABLE = false;
        const LIMITED = true;
        const LIMIT = 1;

        let obj = new SKU(SHOP_ID, SKU_ID, SKU_TYPE_ID, PRICE, NAME, DESC, CONSUMABLE, LIMITED, LIMIT).toObject();
        let sku = SKU.fromObject( obj );

        expect( sku ).not.toBeUndefined();
        expect( sku.shopId ).toBe( SHOP_ID );
        expect( sku.skuId ).toBe( SKU_ID );
        expect( sku.skuTypeId ).toBe( SKU_TYPE_ID );
        expect( sku.price ).toBe( PRICE );
        expect( sku.name ).toBe( NAME );
        expect( sku.description ).toBe( DESC );
        expect( sku.consumable ).toBe( CONSUMABLE );
        expect( sku.limited ).toBe( LIMITED );
        expect( sku.limit ).toBe( LIMIT );
        expect( sku.isValid() ).toBe( true );

    });

});