import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-account-info',
  templateUrl: './change-account-info.component.html',
  styleUrls: ['./change-account-info.component.css']
})
export class ChangeAccountInfoComponent implements OnInit {
  id;

  constructor( private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];

   }

  ngOnInit(): void {
    
  }

}
