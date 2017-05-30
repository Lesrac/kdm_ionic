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

  private createDbConnection(): Promise<SQLiteObject> {
    return this.sqlite.create({name: 'kdm.db', location: 'default'});
  }

  private createTables(db: SQLiteObject): void {
    this.createSettlements(db);
    this.createMonsters(db);
    this.createResources(db);
    this.createMonsterResources(db);
    this.createSettlementResources(db);
    this.createHuntableMonster(db);
    this.createHuntedMonster(db);
    this.createSurvivor(db);
    this.createSettlementSurvivor(db);
    this.createMilestone(db);
    this.createLanternEvent(db);
    this.createStoryEvent(db);
    this.createSettlementMilestone(db);
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
      'ID INTEGER NOT NULL' +
      'CONSTRAINT Key2 PRIMARY KEY AUTOINCREMENT,' +
      'Name varchar(50) NOT NULL,' +
      'Level INTEGER NOT NULL DEFAULT 1,' +
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
      'Amount INTEGER NOT NULL DEFAULT 0,' +
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

  private createMonsterResources(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Monster_Resources' +
      '(' +
      'ResourceName varchar(50) NOT NULL,' +
      'Amount INTEGER NOT NULL DEFAULT 0,' +
      'MonsterID INTEGER NOT NULL,' +
      'Attribute1 INTEGER NOT NULL,' +
      'CONSTRAINT Key5 PRIMARY KEY (ResourceName,MonsterID,Attribute1),' +
      'CONSTRAINT Monster_Resource FOREIGN KEY (Attribute1) REFERENCES Monsters (ID),' +
      'CONSTRAINT Resource_Monster FOREIGN KEY (ResourceName) REFERENCES Resources (Name)' +
      ')', [])
      .then(() => {
        console.log('TABLE monsterResources CREATED');
      })
      .catch(x => {
        console.log('Error in creating monsterResources table');
        console.log(x);
      });
  }

  private createSettlementResources(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Settlement_Resources' +
      '(' +
      'SettlementID INTEGER NOT NULL,' +
      'ResourceName varchar(50) NOT NULL,' +
      'Amount INTEGER NOT NULL DEFAULT 0,' +
      'CONSTRAINT Key6 PRIMARY KEY (SettlementID,ResourceName),' +
      'CONSTRAINT Relationship5 FOREIGN KEY (SettlementID) REFERENCES Settlements (ID),' +
      'CONSTRAINT Relationship6 FOREIGN KEY (ResourceName) REFERENCES Resources (Name)' +
      ')', [])
      .then(() => {
        console.log('TABLE settlementResources CREATED');
      })
      .catch(x => {
        console.log('Error in creating settlementResources table');
        console.log(x);
      });
  }

  private createHuntableMonster(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Huntable_Monsters' +
      '(' +
      'SettlementID INTEGER NOT NULL,' +
      'MonsterID INTEGER NOT NULL,' +
      'IsHuntable boolean NOT NULL DEFAULT false,' +
      'DefeatedLevelOne boolean NOT NULL DEFAULT false,' +
      'DefeatedLevelTwo boolean NOT NULL DEFAULT false,' +
      'DefeatedLevelThree boolean NOT NULL DEFAULT false,' +
      'CONSTRAINT Key7 PRIMARY KEY (SettlementID,MonsterID),' +
      'CONSTRAINT Relationship7 FOREIGN KEY (SettlementID) REFERENCES Settlements (ID),' +
      'CONSTRAINT Relationship8 FOREIGN KEY (MonsterID) REFERENCES Monsters (ID)' +
      ')', [])
      .then(() => {
        console.log('TABLE huntableMonster CREATED');
      })
      .catch(x => {
        console.log('Error in creating huntableMonster table');
        console.log(x);
      });
  }

  private createHuntedMonster(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Hunted_Monster' +
      '(' +
      'SettlementID INTEGER NOT NULL,' +
      'MonsterID INTEGER NOT NULL,' +
      'CONSTRAINT Key8 PRIMARY KEY (SettlementID,MonsterID),' +
      'CONSTRAINT Relationship9 FOREIGN KEY (SettlementID) REFERENCES Settlements (ID),' +
      'CONSTRAINT Relationship10 FOREIGN KEY (MonsterID) REFERENCES Monsters (ID)' +
      ')', [])
      .then(() => {
        console.log('TABLE huntedMonsters CREATED');
      })
      .catch(x => {
        console.log('Error in creating huntedMonsters table');
        console.log(x);
      });
  }

  private createSurvivor(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Survivors' +
      '(' +
      'ID INTEGER NOT ' +
      'CONSTRAINT Key9 PRIMARY KEY AUTOINCREMENT,' +
      'Name varchar(50) NOT NULL,' +
      'IsAlive boolean NOT NULL DEFAULT true,' +
      'IsMale boolean NOT NULL,' +
      'Experience INTEGER NOT NULL DEFAULT 0,' +
      'Survival INTEGER NOT NULL DEFAULT 1,' +
      'CanDodge boolean NOT NULL DEFAULT false,' +
      'CanEncourage boolean NOT NULL DEFAULT false,' +
      'CanSurge boolean NOT NULL DEFAULT false,' +
      'CanDash boolean NOT NULL DEFAULT false,' +
      'Movement INTEGER NOT NULL DEFAULT 5,' +
      'Accuracy INTEGER NOT NULL,' +
      'Strength INTEGER NOT NULL,' +
      'Evasion INTEGER NOT NULL,' +
      'Luck INTEGER NOT NULL,' +
      'Speed INTEGER NOT NULL,' +
      'Insanity INTEGER NOT NULL,' +
      'IsBrainDamaged boolean NOT NULL DEFAULT false,' +
      'HeadArmor INTEGER NOT NULL,' +
      'HeadHeavyInjury boolean NOT NULL,' +
      'ArmsArmor INTEGER NOT NULL,' +
      'ArmsLightInjury boolean NOT NULL,' +
      'ArmsHeavyInjury boolean NOT NULL,' +
      'BodyArmor INTEGER NOT NULL,' +
      'BodyLightInjury boolean NOT NULL,' +
      'BodyHeavyInjury boolean NOT NULL,' +
      'WaistArmor INTEGER NOT NULL,' +
      'WaistLightInjury boolean NOT NULL,' +
      'WaistHeavyInjury boolean NOT NULL,' +
      'LegsArmor INTEGER NOT NULL,' +
      'LegsLightInjury boolean NOT NULL,' +
      'LegsHeavyInjury boolean NOT NULL,' +
      'CannotUseFightingArts boolean NOT NULL,' +
      'CannotSpendSurvival boolean NOT NULL,' +
      'SkipNextHunt boolean NOT NULL' +
      ')', [])
      .then(() => {
        console.log('TABLE survivors CREATED');
      })
      .catch(x => {
        console.log('Error in creating survivors table');
        console.log(x);
      });
  }

  private createSettlementSurvivor(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Settlement_Survivors' +
      '(' +
      'SettlementID INTEGER NOT NULL,' +
      'SurvivorID INTEGER NOT NULL,' +
      'CONSTRAINT Key10 PRIMARY KEY (SettlementID,SurvivorID),' +
      'CONSTRAINT Relationship11 FOREIGN KEY (SettlementID) REFERENCES Settlements (ID),' +
      'CONSTRAINT Relationship12 FOREIGN KEY (SurvivorID) REFERENCES Survivors (ID)' +
      ')', [])
      .then(() => {
        console.log('TABLE settlementSurvivors CREATED');
      })
      .catch(x => {
        console.log('Error in creating settlementSurvivors table');
        console.log(x);
      });
  }

  private createMilestone(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Milestones' +
      '(' +
      'Tag varchar(50) NOT NULL,' +
      'Value INTEGER NOT NULL,' +
      'ObserverTarget varchar(25) NOT NULL,' +
      'LanternEventID INTEGER NOT NULL' +
      'CONSTRAINT Key11 PRIMARY KEY AUTOINCREMENT,' +
      'CONSTRAINT Relationship16 FOREIGN KEY (LanternEventID) REFERENCES Lantern_Events (ID)' +
      ')', [])
      .then(() => {
        console.log('TABLE milestones CREATED');
      })
      .catch(x => {
        console.log('Error in creating milestones table');
        console.log(x);
      });
  }

  private createLanternEvent(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Lantern_Events' +
      '(' +
      'ID INTEGER NOT NULL' +
      'CONSTRAINT Key12 PRIMARY KEY AUTOINCREMENT,' +
      'Name varchar(50) NOT NULL,' +
      'Todo varchar(50) NOT NULL' +
      ')', [])
      .then(() => {
        console.log('TABLE lanternEvent CREATED');
      })
      .catch(x => {
        console.log('Error in creating lanternEvent table');
        console.log(x);
      });
  }

  private createStoryEvent(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Story_Events' +
      '(' +
      'Title varchar(50) NOT NULL,' +
      'Description varchar(250) NOT NULL,' +
      'ID INTEGER NOT NULL,' +
      'LanternEventID INTEGER NOT NULL,' +
      'CONSTRAINT Key13 PRIMARY KEY (ID,LanternEventID),' +
      'CONSTRAINT Relationship21 FOREIGN KEY (LanternEventID) REFERENCES Lantern_Events (ID)' +
      ')', [])
      .then(() => {
        console.log('TABLE storyEvents CREATED');
      })
      .catch(x => {
        console.log('Error in creating storyEvents table');
        console.log(x);
      });
  }

  private createSettlementMilestone(db: SQLiteObject): void {
    db.executeSql('CREATE TABLE IF NOT EXISTS Settlement_Milestones' +
      '(' +
      'SettlementID INTEGER NOT NULL,' +
      'LanternEventID INTEGER NOT NULL,' +
      'CONSTRAINT Key14 PRIMARY KEY (SettlementID,LanternEventID),' +
      'CONSTRAINT Relationship18 FOREIGN KEY (SettlementID) REFERENCES Settlements (ID),' +
      'CONSTRAINT Relationship19 FOREIGN KEY (LanternEventID) REFERENCES Milestones (LanternEventID)' +
      ')', [])
      .then(() => {
        console.log('TABLE settlementMilestones CREATED');
      })
      .catch(x => {
        console.log('Error in creating settlementMilestones table');
        console.log(x);
      });
  }

}
