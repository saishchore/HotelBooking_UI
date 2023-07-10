import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotellistComponent } from './hotellist.component';

describe('HotellistComponent', () => {
  let component: HotellistComponent;
  let fixture: ComponentFixture<HotellistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotellistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotellistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
