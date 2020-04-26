import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-retenes-info',
  templateUrl: './retenes-info.component.html',
  styleUrls: ['./retenes-info.component.css']
})
export class RetenesInfoComponent implements OnInit {

  constructor() { }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.scrollTop();
  }

}
