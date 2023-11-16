import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddedProductsComponent } from './view-added-products.component';

describe('ViewAddedProductsComponent', () => {
  let component: ViewAddedProductsComponent;
  let fixture: ComponentFixture<ViewAddedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAddedProductsComponent]
    });
    fixture = TestBed.createComponent(ViewAddedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
