import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent {
  private _price: string;
  private _filePath: string;
  private _areaRegistered: string;
  private _selectedTradeMarkType: string;
  private _tradeMarkName: string;
  private _products: string;
  customerTypes: string[] = ['Osoba fizyczna', 'Firma'];
  selectedCustomerType : string;
  isCompany:boolean =false;
  isPerson:boolean = false;

  constructor(appService: AppService) {
    this._price = appService.price;
    this._filePath = appService.filePath;
    this._areaRegistered = appService.areaRegistered;
    this._selectedTradeMarkType = appService.selectedTradeMarkType;
    this._tradeMarkName = appService.tradeMarkName;
    this._products = appService.products;
  }
  selectedCustomerTypeChanged(customerType){

    this.isCompany = customerType === 'Firma';
    this.isPerson = !this.isCompany;
  }

}
