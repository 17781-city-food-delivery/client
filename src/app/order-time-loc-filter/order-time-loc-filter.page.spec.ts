import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTimeLocFilterPage } from './order-time-loc-filter.page';

describe('OrderTimeLocFilterPage', () => {
  let component: OrderTimeLocFilterPage;
  let fixture: ComponentFixture<OrderTimeLocFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTimeLocFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTimeLocFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
