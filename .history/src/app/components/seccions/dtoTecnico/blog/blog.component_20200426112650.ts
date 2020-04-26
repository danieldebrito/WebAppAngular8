import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() { }

  public scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.scrollTop();
  }

}
