import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainerDialog } from './add-trainer-dialog';

describe('AddTrainerDialog', () => {
  let component: AddTrainerDialog;
  let fixture: ComponentFixture<AddTrainerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrainerDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
