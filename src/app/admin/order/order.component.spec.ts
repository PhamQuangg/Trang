import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { HttpClientModule } from '@angular/common/http';
import { Renderer2, RendererFactory2 } from '@angular/core';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderComponent ],
      imports: [ HttpClientModule ],
      providers: [ Renderer2, RendererFactory2 ] // Thêm các providers cần thiết
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
