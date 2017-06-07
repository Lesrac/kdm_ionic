import 'reflect-metadata';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPageComponent } from '../pages/tabs/tabs.component';
import { Settlement } from '../model/settlement';
import { Armor } from '../model/armor';
import { BaseModel } from '../model/base_model';
import { Characteristic } from '../model/characteristic';
import { Principle } from '../model/principle';
import { Monster } from '../model/monster';
import { Milestone } from '../model/milestone';
import { Weapon } from '../model/weapon';
import { HuntableMonster } from '../model/linking/huntable_monster';
import { HuntedMonster } from '../model/linking/hunted_monster';
import { MonsterResource } from '../model/linking/monster_resource';
import { PrincipleType } from '../model/principle_type';
import { Disorder } from '../model/disorder';
import { Equipment } from '../model/equipment';
import { Resource } from '../model/resource';
import { LanternEvent } from '../model/lantern_event';
import { FightingArt } from '../model/fighting_art';
import { Innovation } from '../model/innovation';
import { StoryEvent } from '../model/story_event';
import { Survivor } from '../model/survivor';
import { Timeline } from '../model/timeline';
import { ArmorSpace } from '../model/armor_space';
import { Direction } from '../model/direction';
import { Affinity } from '../model/affinity';
import { InnovationTag } from '../model/innovation_tag';
import { ResourceType } from '../model/resource_type';
import { SettlementTimeline } from '../model/linking/settlement_timeline';
import { StorageTag } from '../model/storage_tag';
import { createConnection } from "typeorm";

@Component({
  templateUrl: 'app.component.html',
})
export class MyApp {
  rootPage: any = TabsPageComponent;

  constructor(platform: Platform,
              private statusBar: StatusBar,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      createConnection({
        driver: {
          type: 'websql',
          database: 'kdm',
        },
        entities: [
          Armor, ArmorSpace, BaseModel, Characteristic, Disorder, Equipment, FightingArt, Innovation, LanternEvent,
          Location, Milestone, Monster, Principle, PrincipleType, Resource, Settlement, Storage, StorageTag, StoryEvent,
          Survivor, Timeline, Weapon, HuntableMonster, HuntedMonster, MonsterResource, Direction, Affinity,
          InnovationTag, ResourceType, SettlementTimeline,
        ],
        logging: {
          logFailedQueryError: true,
          logQueries: true,
          logSchemaCreation: true,
          logOnlyFailedQueries: true,
        },
        autoSchemaSync: true,
      }).then(async connection => {
        const settlement = new Settlement('Wise City');
        const settlementRepo = connection.getRepository(Settlement);
        await settlementRepo.persist(settlement);
      });
    });
  }
}
