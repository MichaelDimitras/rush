/*
* Database wrapper
*/
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json')
const MomentTarget = require('../data/momentTarget');

const MOMENT_TABLE = 'momentTargets';

class DB {    
    
    constructor() {
        this.db =  low(adapter);
        setDefaults(this.db);
    }

    saveMoment(url, targetPrice) {
        try {
            this.db.set([MOMENT_TABLE, url], new MomentTarget(url ,targetPrice)).write();
            return true;
        } catch (err) {
            console.error(`Error saaving to db: ${err}`);
            return false;
        }
    }

    getMoment(url) {
        if(!this.hasMoment(url)) {
            return null;
        }
        const targetPrice = this.db.get([MOMENT_TABLE, url]).value().targetPrice;
        return new MomentTarget(url, targetPrice);
    }

    hasMoment(url) {
        return this.db.has([MOMENT_TABLE, url]).value() || null;
    }

    listMoments() {
        return this.db.get(MOMENT_TABLE).value() || {};
    }

    deleteMoment(url) {
        if(this.hasMoment(url)) {
            this.db.unset([MOMENT_TABLE, url]).write();
        }
    }

    hasMoments() {
        return this.db.has(MOMENT_TABLE).value();
    }
}

const setDefaults = (db) => {
    if (!db.has(MOMENT_TABLE).value()) {
        console.log('No moments table found, writing default');
        db.defaults({ [MOMENT_TABLE]: {} }).write();
    }    
    return db;
}

module.exports = DB;