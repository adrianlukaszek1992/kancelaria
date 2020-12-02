import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from '../_interface/Owner';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<any[]>()

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public userArray: any[] = [];
  constructor(private http: HttpClient){
    this.http.get('./assets/data.csv', {responseType: 'text'})
      .subscribe(
        data => {
          const csvToRowArray = data.split("\n");
          this.userArray = csvToRowArray.map(element=>{
            const row = element.split(",");
            return {
              'baseNumber': row[0],
              'classNumber': row[1],
              'products': row[2]
            };
          })

          this.dataSource = new MatTableDataSource(this.userArray)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.userArray);
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {

  }
  handleClick(element){
    console.log(element)
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

}
