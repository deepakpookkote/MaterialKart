import {Injectable} from '@angular/core'
import {Http, Headers, RequestOptions } from '@angular/http'

import 'rxjs/Rx';
//import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/map';
declare var $:any;

@Injectable()
export class ApiService {
      //public base = 'http://localhost/Group10/GBCI/Gitlab/API/v1/app/index.php?path=';
      //public base = 'http://localhost/Group10/GBCI/Gitlab/API/v1/app/index.php?path=';

 public base:any='https://product.gbci.org/green-building/dev-1/api/app/index.php?path=';

 // public base:any = 'http://172.16.0.224/API_GreenBuilding/api/app/';

  //  public base = 'http://128.199.209.142/green-building/dev-1/api/app/';
  //  public base = 'http://localhost/group10/customers/greenbuilding/GITLAB/API-v1/app/';
  // private base = 'http://localhost/group10/customers/schoolbus/GITLAB/api/app-raw/';
    private result:any;

    constructor(private http:Http) {

    }



//Organization
/*
    orgCreate(data){ var result:any;
      return  this.post('organization/create',data)
   }

/*

 Client Side

 this.orgCreate({---data---}).then(response => {
                 result=response
               })
               .catch(error => {
                   console.log('Error while logging in', error)
               });


   */

   //users account add
   accountInfoAdd(data:any){
      return this.post('users/accountInfo_add',data);
   }

   //users account info
   accountInfoView(data:any){
      return this.post('users/account_info',data);
   }

   //users account edit
   accountInfoEdit(data:any){
     return this.post('users/accountInfo_edit',data);
 }

   // Product Image add
   productImageAdd(data:any){
     return this.post('images/push',data);
   }

   //wishlistData
   productInWishlist(data:any){
     return this.post('wishlist/productInWishlist',data);
   }

   availableWishlists(data:any){
     return this.post('wishlist/viewwishlistcategory',data);
   }

   viewWishlists(data:any){
     return this.post('wishlist/viewwishlists',data);
   }

   //Merchant product add
   merchantProductAdd(data:any){
     return this.post('Merchant/merchant_product_add',data);
   }

   merchantProductView(data:any){
     return this.post('Merchant/merchant_product_view',data);
   }

   //Merchant product edit
    merchantProductEdit(data:any){
      return this.post('Merchant/merchant_product_update',data);
    }

   //articles

   publicArticleView(data:any){
     return this.post('articles/public_article_view',data);
   }

   recentActivity(data:any){
     return this.post('api/recentActivity',data);
   }

   publicProductView(data:any){
     return this.post('products/public_product_view',data);
   }

   ComproductPageAdd(data:any){
      return this.post('communication/productpageadd',data);
  }

  ComproductPageView(data:any){
    return this.post('communication/productpageview',data);
  }

  ComParticularMemberMessage(data:any){
    return this.post('communication/particularmembermessage',data);
  }

  ComMailboxInbox(data:any){
    return this.post('communication/mailboxinbox',data);
  }

  projectsShareUsers(data:any){
    return this.post('projects/shareUsers',data);
  }

  projectsShareProjects(data:any){
    return this.post('projects/shareProjects',data);
  }

  projectsRemoveUsers(data:any){
    return this.post('projects/removeSharedUsers',data);
  }

  usersPublic_users_list(data:any){
    return this.post('users/public_users_list',data);
  }


 /*
    getThread(id) {
        return this.get(`getThread?id=${id}`)
    }

    waitForEvent(lastEventId) {
        return this.get(`waitForEvent?lastEventId=${lastEventId}`)
    }

    getMarkedPosts(username) {
        return this.get('clientData/getMarkedPosts?username=' + encodeURIComponent(username))
    }
    */



    private get(url:any) {
        return this.http.get(this.base + url)
            .map(res => res.json())
    }



    private post(url:any, params:any) {

 var data = JSON.stringify( params );

     let headers = new Headers(
      { 'Content-Type':'application/json'}
      // { 'Content-Type': 'Access-Control-Allow-Headers' }
      // { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      );
        let options = new RequestOptions({ headers: headers });


     return this.http.post(this.base + url , data , options)
                   .toPromise()
                   .then(res => res.json())
                   .catch(res => res.json())


     }

   test( params:any){
     var data = JSON.stringify( params );

         let headers = new Headers(
        //  { 'Content-Type':'application/json'}
          // { 'Content-Type': 'Access-Control-Allow-Headers' }
          // { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
          );
            let options = new RequestOptions({ headers: headers });
console.log(data);

         return this.http.post('http://localhost:13615/users/test/' , data , options)
                       .toPromise()
                       .then(res => res.json())
                       .catch(res => res.json())


         }



     socketConnectionTest(){
        var data = JSON.stringify( { name:'aaaa' }  );

         let headers = new Headers(
        //  { 'Content-Type': 'application/json' },
        //  { 'Content-Type':'application/json; charset=utf-8'}

          // { 'Content-Type': 'Access-Control-Allow-Headers' }
          // { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
          );
            let options = new RequestOptions({ headers: headers });


         return this.http.post('http://localhost:2483' , data , options)
                       .toPromise()
                       .then(res => res.json())
                       .catch(res => res.json())
   }




}
