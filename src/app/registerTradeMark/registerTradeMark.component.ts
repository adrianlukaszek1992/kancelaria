import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {NgForm} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'register-tradeMark',
  templateUrl: './registerTradeMark.component.html',
  styleUrls: ['./registerTradeMark.component.scss']
})
export class RegisterTradeMarkComponent {
  analysisTypes = ['Podstawowa', 'Premium'];
  defaultImage: string;
  analysisTypeRegistred: string;
  priceConfig: any[];
  isLoading = true;
  price: string;
  jsonURL = 'assets/priceConfig.json';
  filePath: string;
  tradeMarkName: string;
  sumUpText: string = 'Ochrona obejmie następujące towary: ';
  sumUpObjects: string[] = [];
  sumUpTransferObjects: string[] = [];
  selectedClasses: string[] = [];
  selectedBaseNumbers: string[] = [];
  selectedProducts: string[] = [];
  areaRegistered: string;
  selectedTradeMarkType: string;
  isFileUploadHidden: boolean = true;
  noProductsSelected: boolean = true;
  isTrademarkTextHidden: boolean = true;
  tradeMarkTypes: string[] = ['Słowne', 'Graficzne', 'Słowno-Graficzne'];
  areas: string[] = ['Polska', 'UE'];
  public displayedColumns = ['classNumber', 'products', 'add'];
  public dataSource = new MatTableDataSource<any[]>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public userArray: any[] = [];

  filedata: any;

  constructor(private http: HttpClient, private router: Router) {
    this.http.get('./assets/trademark.csv', {responseType: 'text'})
      .subscribe(
        data => {
          const csvToRowArray = data.split('\n');
          this.userArray = csvToRowArray.map(element => {
            const row = element.split(',');
            return {
              'classNumber': row[0],
              'baseNumber': row[1],
              'products': row[2]
            };
          });

          this.dataSource = new MatTableDataSource(this.userArray);
          this.paginator.pageSize = 10;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
          this.dataSource.sort = this.sort;
          console.log(this.userArray);
        },
        error => {
          console.log(error);
          this.isLoading = false;
        }
      );
    this.getJSON().subscribe(data => {
      this.priceConfig = data;
      console.log(data);
      console.log(this.priceConfig);
    });
  }

  handleNext() {
    if (!this.selectedTradeMarkType || !this.selectedProducts.length || !this.areaRegistered) {
      window.alert('Proszę uzepłnij wszystkie pola');
      return;
    }
    if (!this.filePath && !this.tradeMarkName) {
      window.alert('Proszę uzepłnij wszystkie pola');
      return;
    }
    AppService.setProducts(this.parseTransferObjectToString());
    AppService.setAreaRegistered(this.areaRegistered);
    AppService.setFilePath(this.filePath);
    AppService.setSelectedTradeMarkType(this.selectedTradeMarkType);
    AppService.setPrice(this.price);
    AppService.setTradeMarkName(this.tradeMarkName);
    this.router.navigateByUrl('/personal-data');

    // const url='https://sarey.pl/dev/rajan/wp-admin/admin-ajax.php';
    //
    // window.location.href = `${url}?action=postProduct&products=${this.products}&selectedTradeMarkType=${this.selectedTradeMarkType}&areaRegistered=${this.areaRegistered}&filePath=${this.filePath}&tradeMarkName=${this.tradeMarkName}`;

  }

  analysisTypeChanged(analysisType) {
    this.analysisTypeRegistred = analysisType;
    if (analysisType === 'Podstawowa') {
      this.price = '35';
      return;
    }
    this.price = '85';
  }

  // calculatePrice() {
  //
  //   if (this.areaRegistered === 'Polska') {
  //     this.price =(850+ this.selectedClasses.reduce((acc: number, val: string) => {
  //       acc = acc + Number(this.priceConfig['Poland'][val]);
  //       return acc;
  //     }, 0)).toString()+'€';
  //     return;
  //   }
  //   this.price = (850+this.selectedClasses.reduce((acc: number, val: string) => {
  //     acc = acc + Number(this.priceConfig['EU'][val]);
  //     return acc;
  //   }, 0)).toString()+'€';
  // }

  parseTransferObjectToString() {
    let result = '';
    this.sumUpTransferObjects.forEach(obj => {
      result = result + obj;
    });
    return result;

  }

  fileEvent(e, f: NgForm) {
    if (!this.isFileExtensionCorrect(e.target.files[0]['name'])) {
      window.alert('Akceptujemy tylko pliki o rozszerzeniach .jpg, .png, .gif, .tif, .tiff, .eps');
      return;
    }
    this.filedata = e.target.files[0];
    console.log(this.filedata);
    this.onSubmitform(f);
  }

  areaChanged(area) {
    this.areaRegistered = area;
    // if(this.selectedClasses.length){
    //   this.calculatePrice();
    // }
  }

  isFileExtensionCorrect(fileName) {
    return fileName.endsWith('.jpg') || fileName.endsWith('.png')
      || fileName.endsWith('.gif') || fileName.endsWith('.tif')
      || fileName.endsWith('.tiff') || fileName.endsWith('.eps');
  }

  selectedTradeMarkTypeChanged(tradeMarkType) {
    this.selectedTradeMarkType = tradeMarkType;
    this.isFileUploadHidden = tradeMarkType === 'Słowne';
    this.isTrademarkTextHidden = !this.isFileUploadHidden;

  }

  tradeMarkNameChanged(event) {
    this.tradeMarkName = event.target.value;
  }

  /* Upload button functioanlity */
  onSubmitform(f: NgForm) {

    let myFormData = new FormData();

    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    myFormData.append('uploadFile', this.filedata);

    /* Image Post Request */
    this.http.post('https://sarey.pl/dev/rajan/tools/save.php', myFormData, {
      headers: headers
    }).subscribe(data => {
      this.filePath = data['data'];
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get(this.jsonURL);
  }


  handleClick(element) {
    console.log(element);
  }

  public customSort = (event) => {
    console.log(event);
  };

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  handleAdd(products: string, classNumber: string, baseNumber: string) {
    // if (!this.areaRegistered) {
    //   window.alert('Wybierz proszę najpierw gdzie chcesz zarejestrować znak towarowy');
    //   return;
    // }
    this.noProductsSelected = false;
    if (!this.selectedClasses.includes(classNumber)) {
      this.selectedClasses.push(classNumber);
      this.selectedBaseNumbers.push(baseNumber);
      this.selectedProducts.push(products);
      this.sumUpObjects.push('Klasa' + classNumber + ': ' + products);
      this.sumUpTransferObjects.push('Klasa' + classNumber + ': ' + products + '-' + baseNumber);
    } else if (!this.selectedBaseNumbers.includes(baseNumber)) {
      this.selectedBaseNumbers.push(baseNumber);
      this.selectedProducts.push(products);
      this.sumUpObjects = this.sumUpObjects.map(obj => {
        if (obj.includes(classNumber)) {
          obj = obj + ', ' + products;
        }
        return obj;
      });
      this.sumUpTransferObjects = this.sumUpTransferObjects.map(obj => {
        if (obj.includes(classNumber)) {
          obj = obj + ', ' + products + '-' + baseNumber;
        }
        return obj;
      });
    }
    //this.calculatePrice();
  }

  delete(i) {
    console.log(this.selectedClasses);
    console.log(this.sumUpObjects[i]);
    const classToRemove = this.sumUpObjects[i].slice(this.sumUpObjects[i].indexOf('Klasa') + 5, this.sumUpObjects[i].indexOf(':'));
    this.selectedClasses = this.selectedClasses.reduce((acc :any, item :string) => {
      if (item === classToRemove) {
        return acc;
      }
      return [...acc, item];
    }, []);
    this.sumUpObjects.splice(i, 1);
  }

}
