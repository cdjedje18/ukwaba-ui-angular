import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrganization } from './show-organization';

describe('ShowOrganization', () => {
  let component: ShowOrganization;
  let fixture: ComponentFixture<ShowOrganization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowOrganization],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowOrganization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
