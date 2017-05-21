/**
 * Created by Daniel on 18.05.2017.
 */
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';
import { Settlement } from '../model/settlement';

@Injectable()
export class KDMDBService {
  db: SQLiteObject;

  constructor(private platform: Platform,
              private sqlite: SQLite) {
    console.log('Enter: KDMDBService');
  }

  initDB(): void {
    if (this.platform.is('cordova')) {
      console.log('INIT cordova sqlite db');
      this.createDbConnection()
        .then((db: SQLiteObject) => {
          this.db = db;
          this.createTables(db);
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
        .then(x => {
            console.log('removed from settlements: ', settlement.id);
          },
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
              console.log(id);
              console.log(name);
              settlements.push(new Settlement(name, id));
            }
            return settlements;
          }),
      );
  }

  private createDbConnection(): Promise<SQLiteObject> {
    return this.sqlite.create({name: 'kdm.db', location: 'default'});
  }

  private createTables(db: SQLiteObject): void {
    this.createSettlements(db);
    this.createMonsters(db);
    this.createResources(db);
  }

  private createSettlements(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Settlements (' +
      'ID INTEGER NOT NULL ' +
      'CONSTRAINT Key1 PRIMARY KEY ON CONFLICT REPLACE AUTOINCREMENT,' +
      'Name varchar(50) NOT NULL,' +
      'SurvivalLimit INTEGER NOT NULL DEFAULT 0,' +
      'DeathCount INTEGER NOT NULL DEFAULT 0,' +
      'Population INTEGER NOT NULL DEFAULT 0,' +
      'SettlementLost INTEGER NOT NULL DEFAULT 0)', [])
      .then(() => {
        console.log('TABLE settlements CREATED');
      })
      .catch(x => {
        console.log('Error in creating settlements table');
        console.log(x);
      });
  }

  private createMonsters(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Monsters' +
      '(' +
      'Name varchar(50) NOT NULL,' +
      'Level INTEGER NOT NULL DEFAULT 1,' +
      'IsNemesis boolean NOT NULL DEFAULT false,' +
      'IsHuntable boolean NOT NULL DEFAULT false,' +
      'CONSTRAINT Key2 PRIMARY KEY (Name)' +
      ')', [])
      .then(() => {
        console.log('TABLE monsters CREATED');
      })
      .catch(x => {
        console.log('Error in creating monsters table');
        console.log(x);
      });
  }

  private createResources(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Resources' +
      '(' +
      'Name varchar(50) NOT NULL,' +
      'Description TEXT NOT NULL,' +
      'ExistingCards INTEGER NOT NULL DEFAULT 1,' +
      'StorageTag INTEGER NOT NULL,' +
      'ResourceType INTEGER NOT NULL,' +
      'CONSTRAINT Key4 PRIMARY KEY (Name)' +
      ')', [])
      .then(() => {
        console.log('TABLE resources CREATED');
      })
      .catch(x => {
        console.log('Error in creating resources table');
        console.log(x);
      });
  }
}
