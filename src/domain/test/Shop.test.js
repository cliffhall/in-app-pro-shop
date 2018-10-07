/**
 * Jasmine Test for Schema Entity: Shop
 *
 * @author Cliff Hall <cliff@futurescale.com>
 */
import {Shop} from '../index';

describe( "A valid Shop entity", () => {

    it( "can be created with complete constructor inputs", () => {

        const OWNER = '0x52908400098527886E0F7030069857D2E4169EE7';
        const ID = 52;
        const NAME = 'Barely Legal Pawn';
        const DESC = 'Great stuff, cheap!';

        let shop = new Shop(OWNER, ID, NAME, DESC);

        expect( shop ).not.toBeUndefined();
        expect( shop.owner ).toBe( OWNER );
        expect( shop.shopId ).toBe( ID );
        expect( shop.name ).toBe( NAME );
        expect( shop.description ).toBe( DESC );
        expect( shop.isValid() ).toBe( true );

    });

    it( "can be created with a plain object using fromArray()", () => {

        const OWNER = '0x52908400098527886E0F7030069857D2E4169EE7';
        const ID = 52;
        const NAME = 'Barely Legal Pawn';
        const DESC = 'Great stuff, cheap!';

        const INPUT = [ OWNER, ID, NAME, DESC ];

        let shop = Shop.fromArray( INPUT );

        expect( shop ).not.toBeUndefined();
        expect( shop.owner ).toBe( OWNER );
        expect( shop.shopId ).toBe( ID );
        expect( shop.name ).toBe( NAME );
        expect( shop.description ).toBe( DESC );
        expect( shop.isValid() ).toBe( true );

    });

    it( "can be created with a plain object using fromObject()", () => {

        const OWNER = '0x52908400098527886E0F7030069857D2E4169EE7';
        const ID = 52;
        const NAME = 'Barely Legal Pawn';
        const DESC = 'Great stuff, cheap!';

        const INPUT = {
            owner: OWNER,
            shopId: ID,
            name: NAME,
            description: DESC
        };

        let shop = Shop.fromObject( INPUT );

        expect( shop ).not.toBeUndefined();
        expect( shop.owner ).toBe( OWNER );
        expect( shop.shopId ).toBe( ID );
        expect( shop.name ).toBe( NAME );
        expect( shop.description ).toBe( DESC );
        expect( shop.isValid() ).toBe( true );

    });

    it( "can be created with a plain object that was created using toObject()", () => {

        const OWNER = '0x52908400098527886E0F7030069857D2E4169EE7';
        const ID = 52;
        const NAME = 'Barely Legal Pawn';
        const DESC = 'Great stuff, cheap!';

        let obj = new Shop(OWNER, ID, NAME, DESC).toObject();
        let shop = Shop.fromObject( obj );

        expect( shop ).not.toBeUndefined();
        expect( shop.owner ).toBe( OWNER );
        expect( shop.shopId ).toBe( ID );
        expect( shop.name ).toBe( NAME );
        expect( shop.description ).toBe( DESC );
        expect( shop.isValid() ).toBe( true );

    });

});