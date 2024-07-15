import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSizeComponent } from './modal-size.component';

describe('ModalSizeComponent', () => {
  let component: ModalSizeComponent;
  let fixture: ComponentFixture<ModalSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
