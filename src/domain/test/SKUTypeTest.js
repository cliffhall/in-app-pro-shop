/**
 * Jasmine Test for Schema Entity: SKUType
 *
 * @author Cliff Hall <cliff@futurescale.com>
 */
import {SKUType} from '../index';

describe( "A valid SKUType entity", () => {

    it( "can be created with complete constructor inputs", () => {

        const SHOP_ID = 444;
        const SKU_TYPE_ID = 12;
        const NAME = 'Weapons';
        const DESC = 'Defend, attack, do what you need to do.';

        let skuType = new SKUType(SHOP_ID, SKU_TYPE_ID, NAME, DESC);

        expect( skuType ).not.toBeUndefined();
        expect( skuType.shopId ).toBe( SHOP_ID );
        expect( skuType.skuTypeId ).toBe( SKU_TYPE_ID );
        expect( skuType.name ).toBe( NAME );
        expect( skuType.description ).toBe( DESC );
        expect( skuType.isValid() ).toBe( true );

    });

    it( "can be created with a plain object using fromArray()", () => {

        const SHOP_ID = 444;
        const SKU_TYPE_ID = 12;
        const NAME = 'Weapons';
        const DESC = 'Defend, attack, do what you need to do.';

        const INPUT = [ SHOP_ID, SKU_TYPE_ID, NAME, DESC ];

        let skuType = SKUType.fromArray( INPUT );

        expect( skuType ).not.toBeUndefined();
        expect( skuType.shopId ).toBe( SHOP_ID );
        expect( skuType.skuTypeId ).toBe( SKU_TYPE_ID );
        expect( skuType.name ).toBe( NAME );
        expect( skuType.description ).toBe( DESC );
        expect( skuType.isValid() ).toBe( true );

    });

    it( "can be created with a plain object using fromObject()", () => {

        const SHOP_ID = 444;
        const SKU_TYPE_ID = 12;
        const NAME = 'Weapons';
        const DESC = 'Defend, attack, do what you need to do.';

        const INPUT = {
            shopId: SHOP_ID,
            skuTypeId: SKU_TYPE_ID,
            name: NAME,
            description: DESC
        };

        let skuType = SKUType.fromObject( INPUT );

        expect( skuType ).not.toBeUndefined();
        expect( skuType.shopId ).toBe( SHOP_ID );
        expect( skuType.skuTypeId ).toBe( SKU_TYPE_ID );
        expect( skuType.name ).toBe( NAME );
        expect( skuType.description ).toBe( DESC );
        expect( skuType.isValid() ).toBe( true );

    });

    it( "can be created with a plain object that was created using toObject()", () => {

        const SHOP_ID = 444;
        const SKU_TYPE_ID = 12;
        const NAME = 'Weapons';
        const DESC = 'Defend, attack, do what you need to do.';

        let obj = new SKUType(SHOP_ID, SKU_TYPE_ID, NAME, DESC).toObject();
        let skuType = SKUType.fromObject( obj );

        expect( skuType ).not.toBeUndefined();
        expect( skuType.shopId ).toBe( SHOP_ID );
        expect( skuType.skuTypeId ).toBe( SKU_TYPE_ID );
        expect( skuType.name ).toBe( NAME );
        expect( skuType.description ).toBe( DESC );
        expect( skuType.isValid() ).toBe( true );

    });

});