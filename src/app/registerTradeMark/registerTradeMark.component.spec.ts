import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTradeMarkComponent } from './registerTradeMark.component';

describe('TableComponent', () => {
  let component: RegisterTradeMarkComponent;
  let fixture: ComponentFixture<RegisterTradeMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTradeMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTradeMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
