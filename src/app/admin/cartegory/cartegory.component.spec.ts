import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartegoryComponent } from './cartegory.component';

describe('CartegoryComponent', () => {
  let component: CartegoryComponent;
  let fixture: ComponentFixture<CartegoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartegoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
