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
import { HuntableMonster } from '../model/linking/huntable_monster';
import { HuntedMonster } from '../model/linking/hunted_monster';

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
// dummy database for browser development?
    }
  }

  saveSettlement(settlement: Settlement): Promise<Settlement> {
    let placeholders = '(?, ?, ?, ?, ?, ?)';
    let parameters = [settlement.id, settlement.name,
      settlement.survivalLimit, settlement.population, settlement.deathcount, settlement.settlementLost];
    return this.createDbConnection()
      .then(sqliteObject => sqliteObject
        .executeSql(`REPLACE INTO Settlements (id, name, survivalLimit, population,
      deathcount, settlementLost) VALUES ` + placeholders, parameters)
        .then(stlmt => {
          settlement.id = stlmt.insertId;
          console.log('inserted into settlements: ', settlement.id);
        })
        .then(() => {
          settlement.huntedMonsters.forEach(huntedMonster => {
            this.saveMonster(huntedMonster.monster).then(monster => this.saveHuntedMonster(huntedMonster));
          });
        })
        .then(() => {
          settlement.huntableMonsters.forEach(huntableMonster => {
            this.saveHuntableMonster(huntableMonster);
          });
        })
        .then(() => settlement));
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
      );
  }

  getSettlements(): Promise<Settlement[]> {
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM SETTLEMENTS', [])
          .then(data => {
            let settlements: Settlement[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              const settlement: Settlement = JsonToObjectConverter.convertToSettlementObject(data.rows.item(i));
              this.getHuntedMonsters(settlement.id).then(huntedMonsters => settlement.huntedMonsters = huntedMonsters);
              this.getHuntableMonsters(settlement.id).then(huntableMonsters =>
                settlement.huntableMonsters = huntableMonsters);
              settlements.push(settlement);
            }
            return settlements;
          }),
      );
  }

  saveMonster(monster: Monster): Promise<Monster> {
    let placeholders = '(?, ?, ?, ?)';
    let parameters = [monster.id, monster.name, monster.level, monster.isNemesis];

    return this.createDbConnection()
      .then(sqliteObject => sqliteObject
        .executeSql(`REPLACE INTO Monsters (id, name, level, isNemesis) VALUES ` + placeholders, parameters)
        .then(stlmt => {
          console.log('inserted into monsters: ', monster.id);
          monster.id = stlmt.id;
          return monster;
        }));

  }

  saveHuntedMonster(huntedMonster: HuntedMonster): Promise<void> {
    // TODO huntedResources
    let placeholders = '(?, ?)';
    let parameters = [huntedMonster.settlement.id, huntedMonster.monster.id];

    return this.createDbConnection()
      .then(sqliteObject => sqliteObject
        .executeSql(`REPLACE INTO Hunted_Monsters (settlementID, monsterID) VALUES ` + placeholders, parameters)
        .then(huntedMonsterReturn => {
          console.log(
            'inserted into huntedMonsters: ', huntedMonsterReturn.SettlementID, ' : ', huntedMonsterReturn.MonsterID);
          return Promise.resolve();
        }));
  }

  saveHuntableMonster(huntableMonster: HuntableMonster): Promise<void> {
    let placeholders = '(?, ?, ?, ?, ?, ?)';
    let parameters = [huntableMonster.settlement.id, huntableMonster.monster.id, huntableMonster.isHuntable,
      huntableMonster.defeatedLevelOne, huntableMonster.defeatedLevelTwo, huntableMonster.defeatedLevelThree];

    return this.createDbConnection()
      .then(sqliteObject => sqliteObject
        .executeSql(`REPLACE INTO Huntable_Monsters (settlementID, monsterID, isHuntable, defeatedLevelOne,
        defeatedLevelTwo, defeatedLevelThree) VALUES ` + placeholders, parameters)
        .then(huntableMonsterRet => {
          console.log('inserted into huntableMonster: ', huntableMonsterRet.insertId);
          return Promise.resolve();
        }));
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

  getHuntedMonsters(settlementId: number): Promise<HuntedMonster[]> {
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM Monsters WHERE ID IN (' +
            'SELECT MonsterID from Hunted_Monsters WHERE SettlementID = ?)', [settlementId])
          .then(data => {
            let huntedMonsters: HuntedMonster[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              huntedMonsters.push(JsonToObjectConverter.convertToHuntedMonsterObject(data.rows.item(i)));
            }
            return huntedMonsters;
          }),
      );
  }

  getHuntableMonsters(settlementId: number): Promise<HuntableMonster[]> {
    return this.createDbConnection()
      .then(sqliteObject =>
        sqliteObject
          .executeSql('SELECT * FROM Monsters WHERE ID IN (' +
            'SELECT MonsterID from Huntable_Monsters WHERE SettlementID = ?)', [settlementId])
          .then(data => {
            let huntableMonsters: HuntableMonster[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              huntableMonsters.push(JsonToObjectConverter.convertToHuntableMonsterObject(data.rows.item(i)));
            }
            return huntableMonsters;
          }),
      );
  }

  private createDbConnection(): Promise<any> {
    return this.sqlite.create({name: 'kdm.db', location: 'default'});
  }

}
