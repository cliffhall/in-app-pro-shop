/**
 * Jasmine Test for Schema Entity: Shop
 *
 * @author Cliff Hall <cliff@futurescale.com>
 */
import {Shop} from '../index';

describe( "A valid Shop entity", () => {

    it( "can be created with complete constructor inputs", () => {

        const OWNER = '0x52908400098527886E0F7030069857D2E4169EE7';
        const SHOP_ID = 52;
        const NAME = 'Barely Legal Pawn';
        const DESC = 'Great stuff, cheap!';
        const FIAT = 'USD';

        let shop = new Shop(OWNER, SHOP_ID, NAME, DESC, FIAT);

        expect( shop ).not.toBeUndefined();
        expect( shop.owner ).toBe( OWNER );
        expect( shop.shopId ).toBe( SHOP_ID );
        expect( shop.name ).toBe( NAME );
        expect( shop.description ).toBe( DESC );
        expect( shop.fiat ).toBe( FIAT );
        expect( shop.isValid() ).toBe( true );

    });

    it( "can be created with a plain object using fromArray()", () => {

        const OWNER = '0x52908400098527886E0F7030069857D2E4169EE7';
        const SHOP_ID = 52;
        const NAME = 'Barely Legal Pawn';
        const DESC = 'Great stuff, cheap!';
        const FIAT = 'USD';

        const INPUT = [ OWNER, SHOP_ID, NAME, DESC, FIAT ];

        let shop = Shop.fromArray( INPUT );

        expect( shop ).not.toBeUndefined();
        expect( shop.owner ).toBe( OWNER );
        expect( shop.shopId ).toBe( SHOP_ID );
        expect( shop.name ).toBe( NAME );
        expect( shop.description ).toBe( DESC );
        expect( shop.fiat ).toBe( FIAT );
        expect( shop.isValid() ).toBe( true );

    });

    it( "can be created with a plain object using fromObject()", () => {

        const OWNER = '0x52908400098527886E0F7030069857D2E4169EE7';
        const SHOP_ID = 52;
        const NAME = 'Barely Legal Pawn';
        const DESC = 'Great stuff, cheap!';
        const FIAT = 'USD';

        const INPUT = {
            owner: OWNER,
            shopId: SHOP_ID,
            name: NAME,
            description: DESC,
            fiat: FIAT
        };

        let shop = Shop.fromObject( INPUT );

        expect( shop ).not.toBeUndefined();
        expect( shop.owner ).toBe( OWNER );
        expect( shop.shopId ).toBe( SHOP_ID );
        expect( shop.name ).toBe( NAME );
        expect( shop.description ).toBe( DESC );
        expect( shop.fiat ).toBe( FIAT );
        expect( shop.isValid() ).toBe( true );

    });

    it( "can be created with a plain object that was created using toObject()", () => {

        const OWNER = '0x52908400098527886E0F7030069857D2E4169EE7';
        const SHOP_ID = 52;
        const NAME = 'Barely Legal Pawn';
        const DESC = 'Great stuff, cheap!';
        const FIAT = 'USD';

        let obj = new Shop(OWNER, SHOP_ID, NAME, DESC, FIAT).toObject();
        let shop = Shop.fromObject( obj );

        expect( shop ).not.toBeUndefined();
        expect( shop.owner ).toBe( OWNER );
        expect( shop.shopId ).toBe( SHOP_ID );
        expect( shop.name ).toBe( NAME );
        expect( shop.description ).toBe( DESC );
        expect( shop.fiat ).toBe( FIAT );
        expect( shop.isValid() ).toBe( true );

    });

});