import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { ServiceApiService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  orders: any[] = [];

  dailyRevenue: any[] = [];
  monthlyRevenue: any[] = [];
  selectedTable: string = 'daily';
  startDate: string = "";
  endDate: string = "";
  sumPrice:number=0;
  constructor(private readonly _chart : ServiceApiService) {}

  ngOnInit() {
    this._chart.getOrderList().subscribe(res =>{
      this.orders = res ;
      this.processOrders();
    })
    
  }

  processOrders() {
    const dailyRevenueMap: { [key: string]: number } = {};
    const monthlyRevenueMap: { [key: string]: number } = {};

    this.orders.filter(order => order.status === "1").forEach(order => {
      const date = new Date(order.orderDate);
      const day = date.toISOString().split('T')[0]; // yyyy-mm-dd
      const month = date.toISOString().slice(0, 7); // yyyy-mm

      if (!dailyRevenueMap[day]) {
        dailyRevenueMap[day] = 0;
      }
      if (!monthlyRevenueMap[month]) {
        monthlyRevenueMap[month] = 0;
      }

      dailyRevenueMap[day] += order.sumPrice;
      monthlyRevenueMap[month] += order.sumPrice;
    });

    this.dailyRevenue = Object.keys(dailyRevenueMap).map(date => ({ date, revenue: dailyRevenueMap[date] }));
    this.monthlyRevenue = Object.keys(monthlyRevenueMap).map(month => ({ date: month, revenue: monthlyRevenueMap[month] }));
  }
  onTableSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTable = selectElement.value;
  }
  onStartDateChange(event: Event) {
    this.startDate = (event.target as HTMLInputElement).value;
  }

  onEndDateChange(event: Event) {
    this.endDate = (event.target as HTMLInputElement).value;
  }
  filterRevenueByDate() {
    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end date.');
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    const filteredOrders = this.orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return order.status === "1" && orderDate >= start && orderDate <= end;
    });

    const dailyRevenueMap: { [key: string]: number } = {};
    const monthlyRevenueMap: { [key: string]: number } = {};

    filteredOrders.forEach(order => {
      const date = new Date(order.orderDate);
      const day = date.toISOString().split('T')[0]; // yyyy-mm-dd
      const month = date.toISOString().slice(0, 7); // yyyy-mm

      if (!dailyRevenueMap[day]) {
        dailyRevenueMap[day] = 0;
      }
      if (!monthlyRevenueMap[month]) {
        monthlyRevenueMap[month] = 0;
      }

      dailyRevenueMap[day] += order.sumPrice;
      monthlyRevenueMap[month] += order.sumPrice;
    });

    this.dailyRevenue = Object.keys(dailyRevenueMap).map(date => ({ date, revenue: dailyRevenueMap[date] }));
    this.monthlyRevenue = Object.keys(monthlyRevenueMap).map(month => ({ date: month, revenue: monthlyRevenueMap[month] }));
    this.sumPrice = 0;
    this.dailyRevenue.forEach(x => {
      this.sumPrice += x.revenue
    })
  }
  resetfilter(){
    this._chart.getOrderList().subscribe(res =>{
      this.orders = res ;
      this.processOrders();
    })
  }
}
