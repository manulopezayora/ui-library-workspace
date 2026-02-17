import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxManuUiLibrary } from './ngx-manu-ui-library';

describe('NgxManuUiLibrary', () => {
  let component: NgxManuUiLibrary;
  let fixture: ComponentFixture<NgxManuUiLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxManuUiLibrary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxManuUiLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
