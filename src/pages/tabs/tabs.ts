import { Component } from '@angular/core';

import { SellPage } from '../sell/sell';
import { InventoryPage } from '../inventory/inventory'
import { BuyPage } from '../buy/buy';
import { MorePage } from '../more/more';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1 = BuyPage;
  tab2 = SellPage;
  tab3 = InventoryPage;
  tab4 = MorePage;

  constructor() {
  }
}
