import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNoteComponent } from './page-note.component';

describe('PageNoteComponent', () => {
  let component: PageNoteComponent;
  let fixture: ComponentFixture<PageNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
