import { Component } from '@angular/core';

import { ManagePage } from '../manage/manage';
import { InventoryPage } from '../inventory/inventory'
import { MarketplacePage } from '../marketplace/marketplace';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1 = MarketplacePage;
  tab2 = ManagePage;
  tab3 = InventoryPage;
  tab4 = SettingsPage;

  constructor() { }
}
