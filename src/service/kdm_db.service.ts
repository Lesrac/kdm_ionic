/**
 * Created by Daniel on 18.05.2017.
 */
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { Settlement } from '../model/settlement';
import { Monster } from '../model/monster';
import { KDMInitDBService } from './kdm_init_db.service';
import { JsonToObjectConverter } from '../util/json_to_object_converter';

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
          settlement.id = stlmt.id;
          return settlement;
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
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM SETTLEMENTS', [])
          .then(data => {
            let settlements: Settlement[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              settlements.push(JsonToObjectConverter.convertToSettlementObject(data.rows.item(i)));
            }
            return settlements;
          }),
      );
  }

  getAllInitialQuarries(): Promise<Monster[]> {
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM MONSTERS WHERE ID < ? and IsNemesis = ?', [KDMInitDBService.incrementalID, false])
          .then(data => {
            let monsters: Monster[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              monsters.push(JsonToObjectConverter.convertToMonsterObject(data.rows.item(i)));
            }
            return monsters;
          }),
      );
  }

  getAllInitialNemesisMonsters(): Promise<Monster[]> {
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM MONSTERS WHERE ID < ? and IsNemesis = ?', [KDMInitDBService.incrementalID, true])
          .then(data => {
            let monsters: Monster[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              monsters.push(JsonToObjectConverter.convertToMonsterObject(data.rows.item(i)));
            }
            return monsters;
          }),
      );
  }

  getMonsters(): Promise<Monster[]> {
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM MONSTERS', [])
          .then(data => {
            let monsters: Monster[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              monsters.push(JsonToObjectConverter.convertToMonsterObject(data.rows.item(i)));
            }
            return monsters;
          }),
      );
  }

  getHuntedMonsters(settlementId: number): Promise<Monster[]> {
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM Monsters WHERE ID IN (' +
            'SELECT MonsterID from Hunted_Monsters WHERE SettlementID = ?)', [settlementId])
          .then(data => {
            let monsters: Monster[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              // todo Hunted_Monsters converter
              monsters.push(JsonToObjectConverter.convertToMonsterObject(data.rows.item(i)));
            }
            return monsters;
          }),
      );
  }

  private createDbConnection(): Promise<SQLiteObject> {
    return this.sqlite.create({name: 'kdm.db', location: 'default'});
  }

}
