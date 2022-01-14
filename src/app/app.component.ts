import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    
  public products:Product[]=[];
  public categories:string[]=[];
  public p:number;
  constructor(private httpClient:HttpClient){

  }
  ngOnInit(): void {
    this.getProducts();

  }
  getProducts(){
    this.httpClient.get<any>('https://fakestoreapi.com/products').subscribe(
      response =>{
        this.products = response;
        response.forEach(element => {
          let cat = element.category;
          console.log(typeof this.categories)
          if(!this.categories.includes(cat))
            this.categories.push(cat);
        });
        
      }
    )

  }

  key:string='';
  reverse:boolean=false;
  sortBy(key){
    this.reverse=!this.reverse;
    this.key=(this.reverse?"-":"")+key;
  }

  group:string[]=[];
  cat:string=null
  groupByCategory(cat){
    this.group.push("category");
    if(cat!="")
    {
      this.cat=cat;
    }
    else
    {
      this.cat=null
    }
    console.log(cat,this.group);
  }
}