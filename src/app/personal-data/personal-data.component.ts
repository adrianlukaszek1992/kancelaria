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
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  postalCode: string;
  house: string;
  appartment: string;
  companyStreet: string;
  companyCity: string;
  companyPostalCode: string;
  companyHouse: string;
  companyAppartment: string;
  correctEmail : boolean =true;
  correctPhone: boolean = true;
 correctNIP: boolean= true;
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
    if((!this.name || !this.lastName || !this.city || !this.house || !this.postalCode)
      && (!this.companyName || !this.companyCity ||  !this.nip || !this.companyHouse || !this.companyPostalCode) || !this.email || !this.phoneNumber ){
      window.alert('Proszę uzepłnij wszystkie pola');
      return;
    }
    const url='https://sarey.pl/dev/rajan/wp-admin/admin-ajax.php';
    window.alert('Rejestacja zakończona pomyślnie');
    this.companyAddress = this.companyCity + ', ' + this.companyStreet + ', ' + this.companyHouse + ', ' + this.companyAppartment + ', ' + this.companyPostalCode;
    this.address = this.city + ', ' + this.street + ', ' + this.house + ', ' + this.appartment + ', ' + this.postalCode;
    window.location.href = `${url}?action=postProduct&products=${this._products}&selectedTradeMarkType=${this._selectedTradeMarkType}&areaRegistered=${this._areaRegistered}&filePath=${this._filePath}&tradeMarkName=${this._tradeMarkName}&name=${this.name}&lastName=${this.lastName}&companyName=${this.companyName}&nip=${this.nip}&price=${this._price}&email=${this.email}&phoneNumber=${this.phoneNumber}&companyAddress=${this.companyAddress}&address=${this.address}`;

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
    if(!this.validateNIP(event.target.value)){
      this.correctNIP = false;
      return;
    }
    this.correctNIP = true;
    this.nip = event.target.value;
  }

  companyAddressChanged(event) {
    this.companyAddress = event.target.value;
  }

  emailChanged(event) {
    if(!this.validateEmail(event.target.value)){
      this.correctEmail = false;
      return;
    }
    this.correctEmail = true;
    this.email = event.target.value;
  }

  phoneNumberChanged(event) {
    if(!this.validatePhone(event.target.value)){
      this.correctPhone = false;
      return;
    }
    this.correctPhone = true;
    this.phoneNumber = event.target.value;
  }
  streetChanged(event) {
    this.street = event.target.value;
  }

  houseChanged(event) {
    this.house = event.target.value;
  }

  appartmentChanged(event) {
    this.appartment = event.target.value;
  }

  postalCodeChanged(event) {
    this.postalCode = event.target.value;
  }

  cityChanged(event) {
    this.city = event.target.value;
  }

  companyStreetChanged(event) {
    this.companyStreet = event.target.value;
  }

  companyHouseChanged(event) {
    this.companyHouse = event.target.value;
  }

  companyAppartmentChanged(event) {
    this.companyAppartment = event.target.value;
  }

  companyPostalCodeChanged(event) {
    this.companyPostalCode = event.target.value;
  }

  companyCityChanged(event) {
    this.companyCity = event.target.value;
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
    return re.test(String(phone).toLowerCase());
  }

  validateNIP(nip) {
    const re = /^\d{10}$/;
    return re.test(String(nip).toLowerCase());
  }
}
