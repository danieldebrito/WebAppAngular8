import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apriete',
  templateUrl: './apriete.component.html',
  styleUrls: ['./apriete.component.css']
})
export class AprieteComponent implements OnInit {

  constructor() { }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.scrollTop();
  }

}
