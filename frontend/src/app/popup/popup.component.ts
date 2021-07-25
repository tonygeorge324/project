import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor( public customerService: CustomerService) { }

  ngOnInit(): void {
  }

}
