import { Component } from '@angular/core';
declare var $:any;

@Component({
  selector: 'common-footer',
  styles: [`
    .top-menu a{
      color: green;
    }

    footer{

      background: #414042;
      color: white;
    /*  border-top: 8px solid #53536a; */
    }
    .copyright-line{
      border-top: 1px solid #f1f1f1; margin-left: 2%; margin-right: 2%; margin-top: 5px;padding-top: 5px;

    }
    .btn-xs{
      padding:10px;
      margin: 1px;
    }
    .width-full{
      width: 100%;
    }

    .item {
      display:inline-block;
  }
  .flex, .flexcenter {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}

.flexcenter {
  justify-content: center;
}

.sm-link {
  margin: 0 15px;
}

.sm {
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  padding: .2em 0;
  width: 1.8em;
  border-radius: 4px;
  background-size: 100% 200%;
  background-position: 0 20%;
  background-repeat: no-repeat;
  text-align: center;
  color: whitesmoke;
  font-size: 1.2em;
  text-shadow: 4px 2px 4px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 4px 2px 10px 0px rgba(50, 50, 50, 0.6);
  -moz-box-shadow: 4px 2px 10px 0px rgba(50, 50, 50, 0.6);
  box-shadow: 4px 2px 10px 0px rgba(50, 50, 50, 0.6);
}
.sm:hover {
  background-position: 0 100%;
  text-shadow: 4px 2px 4px rgba(0, 0, 0, 0.7);
}

.twitter {
  background-image: -webkit-linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
  background-image: -o-linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
  background-image: -moz-linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
  background-image: linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
}

.facebook {
  background-image: -webkit-linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
  background-image: -o-linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
  background-image: -moz-linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
  background-image: linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
}

.linkedin {
  background-image: -webkit-linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
  background-image: -o-linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
  background-image: -moz-linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
  background-image: linear-gradient(#e8e6e6 50%, #e8e6e6 50%);
}
.smicons{
  display: inline-flex;
  @extend .flexcenter;
  margin-left:-15px;
  padding-top:4px;
}



  `],
  template: `


<footer>
<div style="height:20px;"></div>
<div>
<div class="row">
 <div class="col-md-3">
 </div>
 <div class="col-md-7">
 <div class="row">
  <div class="col-md-4">
   <h4 style="color:white !important;"> Learn More </h4>
   <div style="height:10px; "></div>
   <ul>
     <li ><a style="color:white;"  href="#page-about" >About Us</a></li>
     <li style="margin-top:4px;"><a style="color:white;" href="#page-ratings">Ratings</a></li>
     <li style="margin-top:4px;"><a style="color: white;" href="#page-faq" >FAQ</a></li>


    </ul>
   </div>
   <div class="col-md-4">
    <h4 style="color:white !important;"> Stay connected </h4>
    <ul>
      <li style="padding-top:12px;"><input id="Email" name="Email" placeholder="Enter your email" maxlength="255" type="" style="width: 144px;"></li>
      <li style="margin-top:4px;">
      <button type="button" class="btn btn-sm btn-outline-primary" ripple-radius style="width: 144px;border-color: #ffffff !important;margin-left: 0px;color:#ffffff !important;font-size:12px;">SIGN UP</button>

      </li>
     </ul>
   </div>
   <div class="col-md-4">
    <h4 style="color:white !important;"> Support </h4>
    <div style="height:10px; "></div>
    <ul>
      <li style="margin-top:-4px;"><a style="color: white;" href="#page-contact">Contact Us</a></li>
        <li style="margin-top:4px;"><a style="color: white;font-weight:700;" href="#page-contact">Follow Us</a></li>
      <li>
      <div class="wrapper smicons">
      <a class="sm-link" href="#">
        <div class="sm twitter" title="Twitter" data-toggle="tooltip" data-placement="bottom">
        <i class="fa fa-twitter" style="color:#333030;"></i>
        </div>
      </a>

      <a class="sm-link" href="#">
        <div class="sm facebook" title="Facebook" data-toggle="tooltip" data-placement="bottom">
          <i class="fa fa-facebook" style="color:#333030;"></i>
        </div>
      </a>

      <a class="sm-link" href="#">
        <div class="sm linkedin" title="Linkedin" data-toggle="tooltip" data-placement="bottom" >
          <i class="fa fa-linkedin" style="color:#333030;"></i>
        </div>
      </a>
      </div>

      </li>

     </ul>
   </div>
  </div>
 </div>
 <div class="col-md-4">
 </div>
</div>

</div><!-- margin 20% -->





<div style="height:40px;"></div>
<div align="center" style="background:#221f20;padding:15px 10px 0px 10px;" class="">
&copy; 2017 GBCI
<div style="height:20px;"></div>
</div>

</footer>

<chat-box (message)="messageTyped($event)"></chat-box>

  `,
})
export class CommonFooter {

  messageTyped(e: string) {
    console.log(e);
  }

  ngOnInit(){
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
  }

}
