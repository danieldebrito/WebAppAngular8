import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bulones-info',
  templateUrl: './bulones-info.component.html',
  styleUrls: ['./bulones-info.component.css']
})
export class BulonesInfoComponent implements OnInit {

  constructor() { }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.scrollTop();
  }

}
