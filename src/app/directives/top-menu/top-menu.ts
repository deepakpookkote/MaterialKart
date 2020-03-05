import { Component } from '@angular/core';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'top-menu',
  styles:[`
    .top-menu a{
    /*  color: green;*/
    color: white;

    }
    .top-menu a:hover{
     color: #8eb640;
    }
  `],
  template: `


<!--
<nav class="navbar navbar-fixed-top navbar-default top-menu" style="background: #e7e7e7; border-bottom:1px solid silver;">
-->  <nav class="navbar navbar-fixed-top navbar-default top-menu" style="background: #6b878c; border-bottom:1px solid silver;">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#" >Material</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
    <!--  <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

        <ul class="nav navbar-nav navbar-right">

          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Shop by Category <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Category one</a></li>
              <li><a href="#">Category two</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Some other category</a></li>
            </ul>
          </li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#page-login">Login</a></li>
          <li class="pointer"><a href="#page-merchant-register">Register</a></li>
        </ul>
      </div>
      -->
      <!-- /.navbar-collapse -->

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#page-about" class="page-scroll">About</a></li>
          <li ><a href="#page-landing#ratingspos"  class="page-scroll">Ratings</a></li>
          <li><a href="#page-faq" class="page-scroll">FAQ</a></li>
          <li><a href="#page-contact" class="page-scroll">Contact Us</a></li>
      <!--    <li><a href="#page-login">Login</a></li>
          <li><a href="#page-merchant-register">Register</a></li> -->
          <li *ngIf="token!=''"><a (click)="logout();">Logout</a></li>
          <li *ngIf="token==''"><a href="#page-login">Login</a></li>
          <!--  <li><a target="_new" href="#page-register">Register</a></li> -->
        </ul>
      </div>



    </div><!-- /.container-fluid -->
  </nav>

<div style="height:70px;"></div>

  `,
})
export class TopMenu extends AppComponent {
  public token = localStorage.getItem('GBCItoken');
    logout(){
      localStorage.removeItem('GBCItoken');
      this.token = '';
       this.redirect('page-landing',{});
    }
}
