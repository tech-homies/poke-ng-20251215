import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Layout } from './layout';

describe('LayoutComponent', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Layout],
      imports: [MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
