import { Component } from '@angular/core';
import { ServiceApiService, CartegoryService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  listData: any[] = [];
  itemsPerPage: number = 9;
  page: number = 1;
  total: number = 0;

  constructor(
    private readonly productService: ServiceApiService,
    private cartegoryService : CartegoryService 
  ) {}

  ngOnInit() {
    this.getData();
  }
  listWomen:any[] = [];
  listMen:any[] = [];
  getData() {
    this.productService.getProductList().subscribe(res => {
      this.listData = res;
      this.total = this.listData.length;
      this.cartegoryService.getList().subscribe(res => {
        this.listData.forEach((item) =>{
          var obj = res.find(x => x.id == item.category)
          if(obj != null){
            item.categoryName = obj.name
          }
          if(item.gender == "1" && this.listMen.length < 3){
            this.listMen.push(item)
          }
          if(item.gender == "2" && this.listWomen.length < 3){
            this.listWomen.push(item)
          }
        })
      })
    });
  }
}
