import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../_models/index';
import { Tag, Tickettype } from '../../_models/index';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AlertService, UserService } from '../../_services/index';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {


    arrBirds: any [] = [
        { id:1, name: 'Normal' },
        { id:2, name: 'Critical'},
        { id:3, name: 'Urgent' },
        
      ];
    model: any = {};
    loading = false;
   
    ticketdate:any;
      username:string;
      ticketid:any;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { 

            var name= localStorage.getItem('username');
            this.username=name.replace(/\"/g, "");

            this.model.ownername=this.username;
            this.model.status = "Open";
            
            this.model.ticketdate = new Date();
             

        }

    ticket() {
       alert(this.model.ticketdate);
        alert(this.model.priority);
        alert(this.model.ownername);
        alert(this.model.status);
     
        //console.log(this.model.description);
        this.loading = true;
        this.userService.addBook(this.model)
       /*let bookData = {
        name: this.model.subject,
        password: this.model.description,
        
      }*/

      //vgrthis.userService.addBook(bookData)
            .subscribe(
                data => {
                    this.alertService.success('Ticket Created successfully', true);
                    alert("Ticket Created Successfully");
                    //this.router.navigate(['/addbook']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    groupp: Group[] = [];
    //users: User[] = [];
    tag:Tag[] = [];
    types:Tickettype[] = [];

    ngOnInit() {
        this.userService.getAllgroups().subscribe(groupp => { this.groupp = groupp; });
        this.userService.getAlltags().subscribe(tag => { this.tag = tag; });
        this.userService.getAlltypes().subscribe(types => {  this.types = types;});
    }

}
