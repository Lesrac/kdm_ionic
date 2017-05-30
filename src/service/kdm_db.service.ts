/**
 * Created by Daniel on 18.05.2017.
 */
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { Settlement } from '../model/settlement';
import { Monster } from '../model/monster';
import { KDMInitDBService } from './kdm_init_db.service';

@Injectable()
export class KDMDBService {
  db: SQLiteObject;

  constructor(private platform: Platform,
              private sqlite: SQLite,
              private kdmInitDB: KDMInitDBService) {
    console.log('Enter: KDMDBService');
  }

  initDB(): void {
    if (this.platform.is('cordova')) {
      console.log('INIT cordova sqlite db');
      this.createDbConnection()
        .then((db: SQLiteObject) => {
          this.db = db;
          this.kdmInitDB.initDB(db);
          console.log('Tables created');
        })
        .catch(err => {
          console.error('Error in KDMDBService', err);
        });
    } else {

    }
  }

  saveSettlement(settlement: Settlement): Promise<Settlement> {
    console.log('db value');
    console.log(this.db);
    let placeholders = '(?, ?, ?, ?, ?)';
    let parameters = [settlement.name,
      settlement.survivalLimit, settlement.population, settlement.deathcount, settlement.settlementLost];

    return this.createDbConnection()
      .then(sqliteObject => sqliteObject
        .executeSql(`INSERT INTO SETTLEMENTS (name, survivalLimit, population,
      deathcount, settlementLost) VALUES ` + placeholders, parameters)
        .then(stlmt => {
          console.log('inserted into settlements: ', settlement.id);
          stlmt = settlement;
          return stlmt;
        }));

  }

  removeSettlement(settlement: Settlement): void {
    let parameters = [settlement.id];

    this.createDbConnection()
      .then(sqliteObject => sqliteObject
        .executeSql('DELETE FROM SETTLEMENTS WHERE ID = ?', parameters)
        .then(() =>
          console.log('removed from settlements: ', settlement.id),
        )
        .catch(x => {
          console.log('Error remove from settlements');
          console.log(x);
        }),
      )
    ;
  }

  getSettlements(): Promise<Settlement[]> {
    console.log('Select settlements');
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM SETTLEMENTS', [])
          .then(data => {
            console.log('Found: ', data.rows.length);
            let settlements: Settlement[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              console.log('Element: ', data.rows.item(i));
              let id = data.rows.item(i).ID;
              let name = data.rows.item(i).Name;
              settlements.push(new Settlement(name, id));
            }
            return settlements;
          }),
      );
  }

  getMonsters(): Promise<Monster[]> {
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM MONSTERS', [])
          .then(data => {
            console.log('Found: ', data.rows.length);
            let monsters: Monster[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              console.log('Element: ', data.rows.item(i));
              let id = data.rows.item(i).ID;
              let name = data.rows.item(i).Name;
              let monster = new Monster(name);
              monster.id = id;
              monsters.push(monster);
            }
            return monsters;
          }),
      );
  }

  private createDbConnection(): Promise<SQLiteObject> {
    return this.sqlite.create({name: 'kdm.db', location: 'default'});
  }

}
