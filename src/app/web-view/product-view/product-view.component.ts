import { Component } from '@angular/core';
import { ServiceApiService, CartegoryService } from 'src/app/share/service/service-api.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent {

  listData: any[] = [];
  itemsPerPage: number = 9;
  page: number = 1;
  total: number = 0;
  listCategory:any = [];
  filteredData:any = [];
  searchName:string = "";
  activeCategory: string | null = null;
  constructor(
    private readonly productService: ServiceApiService,
    private cartegoryService : CartegoryService 
  ) {}

  ngOnInit() {
    this.getData();
  }
  onSearch(){
    if(this.searchName != ""){
      this.listData = this.listData.filter(item => 
        item.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    }
    else{
      this.getData();
    }
  }
  getData() {
    this.productService.getProductList().subscribe(res => {
      this.listData = res;
      this.total = this.listData.length;
      this.cartegoryService.getList().subscribe(res => {
        this.listCategory = res;
        this.listData.forEach((item) =>{
          var obj = res.find(x => x.id == item.category)
          if(obj != null){
            item.categoryName = obj.name
          }
        })
      })
    });
  }
  filterByCategory(categoryId: string) {
    this.activeCategory = categoryId;
    if(this.filteredData.length != 0){
      this.listData = this.filteredData;
    }
    else{
      this.filteredData =  this.listData ;
    }
    this.listData = this.listData.filter(item => item.category === categoryId);
  }
  resetData(){
    this.getData();
  }

}
