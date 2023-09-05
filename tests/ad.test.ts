import { AdRecord } from "../record/ad.record"
import { AdEntity } from "../types";
import { pool } from "../utils/db";

const defaultObj = {
    id: '0',
    name: 'Test Name',
    description: 'blah',
    price: 0,
    url: 'https://megak.pl',
    lat: 9,
    lon: 9,
}

afterAll(async()=>{
    await pool.end();
})

test('AdRecord.getOne returns data from database for one entry.', async()=>{
    const ad = await AdRecord.getOne('abc');
    
    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('Testowa');


});

test('AdRecord.getOne returns null from database for unexisting entry',async()=>{
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
});

test('AdRecord.findAll returns array of found entries.', async()=>{
    const ads = await AdRecord.findAll('');
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found entries when searching for "a".', async()=>{
    const ads = await AdRecord.findAll('a');
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns empty array when searching for something that does not exist.', async()=>{
    const ads = await AdRecord.findAll('--------------------------------------------');
    expect(ads).not.toEqual([]);
    
});

test('AdRecord.findAll returns smaller amount of data.', async()=>{
    const ads = await AdRecord.findAll('');
    expect((ads[0] as AdEntity).price).not.toBeDefined();
    expect((ads[0] as AdEntity).description).not.toBeDefined();
    
});

test('AdRecord.insert returns new UUID.', async()=>{
    const ad = new AdRecord(defaultObj);
    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
    
});

test('AdRecord.insert inserts data to data base.', async()=>{
    const ad = new AdRecord(defaultObj);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
    
});
