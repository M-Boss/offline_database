/**
 * Created by guy on 8/16/18.
 */
const OfflineDictionary = require('../OfflineDicrionary')
const assert = require('assert')
describe('OfflineDatabase', function(){

    let db = null;

    function beforeEach(){
        db = new OfflineDatabase()
    }

    it('first insertion should return ID1', function(done){
        const id = db.ref("users").push({name: "Bob", address: {city:"New York",
            country: "US"}});
        assert(id === 'ID1')
    })
});




