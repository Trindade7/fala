import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeesageBarComponent } from './new-meesage-bar.component';

describe('NewMeesageBarComponent', () => {
  let component: NewMeesageBarComponent;
  let fixture: ComponentFixture<NewMeesageBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMeesageBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMeesageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
