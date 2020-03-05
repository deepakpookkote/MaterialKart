import { Component } from '@angular/core';

@Component({
  selector:'merchant-users-add',
  template:`
     <div class="row">
      <div class="col-sm-6">
        <label>First Name</label>
        <input class="form-control" />
      </div>
      <div class="col-sm-6">
        <label>First Name</label>
        <input class="form-control" />
      </div>
     </div>

     <div class="row">
      <div class="col-sm-6">
        <label>Organization Email</label>
        <input class="form-control" />
      </div>
      <div class="col-sm-6">
        <label>Password</label>
        <input class="form-control" />
      </div>
     </div>

     <div class="row">
      <div class="col-sm-6">
        <label>Gender</label>
        <select class="form-control">
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
      <div class="col-sm-6">

       <label>Role</label>
        <label class="text-primary pull-right pointer">Manage</label>

        <select class="form-control">
          <option>Master</option>
          <option>Product Manager</option>
        </select>
      </div>
     </div>

     <div class="row">
      <div class="col-sm-6">
        <label>Location</label>
        <input class="form-control" />
      </div>
      <div class="col-sm-6">
        <label>City</label>
        <input class="form-control" />
      </div>
     </div>

     <div class="row">
      <div class="col-sm-6">
        <label>State</label>
        <input class="form-control" />
      </div>
      <div class="col-sm-6">
        <label>Country</label>
        <input class="form-control" />
      </div>
     </div>

     <div class="row">
      <div class="col-sm-6">
        <label>Report to</label>
        <input class="form-control" />
      </div>
      <div class="col-sm-6">
        <label>Status</label>
        <select class="form-control">
          <option>Active</option>
          <option>In active</option>
        </select>
      </div>
     </div>




  `
})

export class MerchantUsersAddDir {

}
