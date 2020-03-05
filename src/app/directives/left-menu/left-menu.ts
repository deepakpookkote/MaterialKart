import { Component } from '@angular/core';
import { AppComponent } from './../../app.component';
  import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'left-menu',
  styles:[`

    .account-left-menu1{
      position: fixed;
      z-index: 9999999;
      border-right: 1px solid #ffffff;
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
      background: #ffffff;
      height:70%;
      left:10px;
      overflow-y: scroll;
      width: 15%;
         -ms-overflow-style: none;  /* IE 10+ */
          overflow: -moz-scrollbars-none;  /* Firefox*/
    }

    .account-left-menu1::-webkit-scrollbar{
        display: none;  // Safari and Chrome
    }

    .panel-group::-webkit-scrollbar{
        display: none;  // Safari and Chrome
    }

   .checkbox label{
     font-size: 1.2em
   }
   .left-menu-box{
     padding: 5px;
     margin-top:0px;
   }
  .left-menu-box label{
     font-size: 14px;
   }




.panel-body > ul > li  {
	padding:5px 0;
  margin-left:10px;
}


.panel-body > ul > li > a:hover {

  font-weight:400;
  font-size:15px;
  color:#000000;
  position:relative;
}

.panel-primary{
  border-color:#6E8895 !important;
  color:#6E8895;
}


  `],
  template: `




  <div class="account-left-menu1 left-menu-box">
<!--
    <div id="custom-search-input">
                    <div class="input-group col-md-12">
                         <input type="text" class="  search-query form-control" placeholder="Search" />
                         <span class="input-group-btn">
                             <button class="btn btn-mdb bg-mdb" type="button">
                                 <span class=" glyphicon glyphicon-search"></span>
                             </button>
                         </span>
                     </div>
   </div> -->
   <div>
    <!-- <h5><b>Filter by categories</b></h5>

     <div  style="margin-left:-10px;">
       <div class="checkbox">
         <label  >  <input type="checkbox" value="">  <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
           Accessories
         </label>
       </div>
       <div class="checkbox">
         <label > <input type="checkbox" value="" checked>  <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
           Adhesives
         </label>
       </div>
       <div class="checkbox  ">
         <label > <input type="checkbox" value=""  >  <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
           Appliances
         </label>
       </div>
       <div class="checkbox  ">
         <label > <input type="checkbox" value=""  >  <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
           Bedding
         </label>
       </div>

       <div class="checkbox  ">
         <label > <input type="checkbox" value=""  >  <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
           Ceilings
         </label>
       </div>
       <div class="checkbox  ">
         <label > <input type="checkbox" value=""  >  <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
           Cleaning
         </label>
       </div>
       <div class="checkbox  ">
         <label > <input type="checkbox" value=""  >  <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
           Concrete
         </label>
       </div>
       <div class="checkbox  ">
         <label > <input type="checkbox" value=""  >  <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
          Wall Finishes
         </label>
       </div>




   </div>-->

   <div class="panel-group" id="accordion" style="margin-top: 7px;">
  <div class="panel panel-primary" >
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Categories &nbsp; <i class="fa fa-angle-double-down pull-right" aria-hidden="true"></i></a>
      </h4>
    </div>
    <div id="collapse1" class="panel-collapse collapse in">
      <div class="panel-body">

        <ul id="categories" role="tablist" aria-multiselectable="true">

          <li><a href="#" class="animated fadeInLeftShort">Accessories</a></li>
          <li><a href="#" class="animated fadeInLeftShort">Adhesives</a></li>
          <li><a href="#" class="animated fadeInLeftShort">Appliances</a></li>
          <li><a href="#" class="animated fadeInLeftShort">Bedding</a></li>
          <li><a href="#" class="animated fadeInLeftShort">Ceilings</a></li>
          <li><a href="#" class="animated fadeInLeftShort">Concrete</a></li>
          <li><a href="#" class="animated fadeInLeftShort">Wall Finishes</a></li>
          <li><a href="#" class="animated fadeInLeftShort">Blazers</a></li>



        </ul>


      </div>
    </div>
  </div>


</div>


<!--<hr>
   <div>
    <h5><b>Sort the product by</b></h5>
   <select class="form-control">

     <option>Trending</option>
     <option>Popular</option>
     <option>Date Added</option>
   </select>
</div>-->

<!--

   <div class="dropdown" style="padding-right: 30px;">
     <button class="btn btn-default dropdown-toggle form-control" style="text-align: left; " type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
       Sort the Product By
       <span class="caret"></span>
     </button>
     <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
       <li><a href="#">Trending</a></li>
       <li><a href="#">Popular</a></li>
       <li><a href="#">Date Added</a></li>
       <li role="separator" class="divider"></li>
       <li><a href="#">Budget</a></li>
     </ul>
   </div>

<br>

   <div data-role="rangeslider">
          <label for="price-min">Price Range:</label>
          <input type="range" name="price-min" id="price-min" value="200" min="0" max="1000">
          <input style="margin-top:-5px;" type="range" name="price-max" id="price-max" value="900" min="0" max="1000">
        </div>

    <div>
    <h5>Certification levels</h5>
<table class="table table-bordered table-striped">
 <tr> <th colspan="2">Rating Points</th> </tr>
 <tr><td>LEED Certified Basic</td><td>26-32</td></tr>
 <tr><td>LEED Certified Silver</td><td>36-42</td></tr>
 <tr><td>LEED Certified Gold</td><td>46-52</td></tr>
 <tr><td>LEED Certified Platinum</td><td>56-62</td></tr>
</table>


LEED Certified Silver
level
33-38
LEED Certified Gold level 39-51
LEED Certified Platinum
level
52-69
    </div>
-->

   </div> <!-- Filter by Category -->

  </div>


  `,
})
export class LeftMenu  { name = 'Angular'; }
