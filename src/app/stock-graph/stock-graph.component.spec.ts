import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IgxFinancialChartModule } from 'igniteui-angular-charts';
import { StockGraphComponent } from './stock-graph.component';

describe('StockGraphComponent', () => {
  let component: StockGraphComponent;
  let fixture: ComponentFixture<StockGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StockGraphComponent],
      imports: [IgxFinancialChartModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
