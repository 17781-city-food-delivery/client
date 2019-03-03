import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMealListPage } from './owner-meal-list.page';

describe('OwnerMealListPage', () => {
  let component: OwnerMealListPage;
  let fixture: ComponentFixture<OwnerMealListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerMealListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerMealListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
