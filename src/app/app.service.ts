import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  get price(): string {
    return this._price;
  }

  set price(value: string) {
    this._price = value;
  }

  get filePath(): string {
    return this._filePath;
  }

  set filePath(value: string) {
    this._filePath = value;
  }

  get areaRegistered(): string {
    return this._areaRegistered;
  }

  set areaRegistered(value: string) {
    this._areaRegistered = value;
  }

  get selectedTradeMarkType(): string {
    return this._selectedTradeMarkType;
  }

  set selectedTradeMarkType(value: string) {
    this._selectedTradeMarkType = value;
  }

  get tradeMarkName(): string {
    return this._tradeMarkName;
  }

  set tradeMarkName(value: string) {
    this._tradeMarkName = value;
  }

  get products(): string {
    return this._products;
  }

  set products(value: string) {
    this._products = value;
  }
  private _price:string;
  private _filePath:string;
  private _areaRegistered:string;
  private _selectedTradeMarkType:string;
  private _tradeMarkName:string;
  private _products:string;
  constructor() { }

}
