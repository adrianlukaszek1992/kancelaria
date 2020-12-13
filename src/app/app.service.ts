import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  static getPrice(): string {
    return this._price;
  }

  static setPrice(value: string) {
    this._price = value;
  }

  static getFilePath(): string {
    return this._filePath;
  }

  static setFilePath(value: string) {
    this._filePath = value;
  }

  static getAreaRegistered(): string {
    return this._areaRegistered;
  }

  static setAreaRegistered(value: string) {
    this._areaRegistered = value;
  }

  static getSelectedTradeMarkType(): string {
    return this._selectedTradeMarkType;
  }

  static setSelectedTradeMarkType(value: string) {
    this._selectedTradeMarkType = value;
  }

  static getTradeMarkName(): string {
    return this._tradeMarkName;
  }

  static setTradeMarkName(value: string) {
    this._tradeMarkName = value;
  }

  static getProducts(): string {
    return this._products;
  }

  static setProducts(value: string) {
    this._products = value;
  }
  private static _price:string;
  private static _filePath:string;
  private static _areaRegistered:string;
  private static _selectedTradeMarkType:string;
  private static _tradeMarkName:string;
  private static _products:string;
  constructor() { }

}
