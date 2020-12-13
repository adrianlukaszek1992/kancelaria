import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit{
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
  companyAddress: string;
  nip: string;
  companyName: string;
  address: string;
  lastName: string;
  name: string;

  constructor() {

  }
  ngOnInit() {
    this._price = AppService.getPrice();
    this._filePath = AppService.getFilePath();
    this._areaRegistered = AppService.getAreaRegistered();
    this._selectedTradeMarkType = AppService.getSelectedTradeMarkType();
    this._tradeMarkName = AppService.getTradeMarkName();
    this._products = AppService.getProducts();
    console.log(this._products)
  }

  selectedCustomerTypeChanged(customerType){

    this.isCompany = customerType === 'Firma';
    this.isPerson = !this.isCompany;
  }

  submit(){
    if((!this.name || !this.lastName || !this.address)
      && (!this.companyName || !this.companyAddress ||  !this.nip) ){
      window.alert('Proszę uzepłnij wszystkie pola');
      return;
    }
    const url='https://sarey.pl/dev/rajan/wp-admin/admin-ajax.php';

    window.location.href = `${url}?action=postProduct&products=${this._products}&selectedTradeMarkType=${this._selectedTradeMarkType}&areaRegistered=${this._areaRegistered}&filePath=${this._filePath}&tradeMarkName=${this._tradeMarkName}&name=${this.name}&lastName=${this.lastName}&address=${this.address}&companyName=${this.companyName}&nip=${this.nip}&companyAddress=${this.companyAddress}&price=${this._price}`;
    //window.location.href = `${url}?action=postProduct&products=${this._products}`;
  }


  nameChanged(event) {
    this.name = event.target.value;
  }

  lastNameChanged(event) {
    this.lastName = event.target.value;
  }

  addressChanged(event) {
    this.address = event.target.value;
  }

  companyNameChanged(event) {
    this.companyName = event.target.value;
  }

  nipChanged(event) {
    this.nip = event.target.value;
  }

  companyAddressChanged(event) {
    this.companyAddress = event.target.value;
  }

}
