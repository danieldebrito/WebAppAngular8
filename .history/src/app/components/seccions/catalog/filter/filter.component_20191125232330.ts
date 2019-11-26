import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

      // para colapsar menues de filtros.
      public isCollapsed = false;
      public isCollapsed2 = true;
      public isCollapsed3 = true;

  constructor() { }

  colapsar1() {
    this.isCollapsed = false;
    this.isCollapsed2 = true;
    this.isCollapsed3 = true;
}

colapsar2() {
    this.isCollapsed = true;
    this.isCollapsed2 = false;
    this.isCollapsed3 = true;
}

colapsar3() {
    this.isCollapsed = true;
    this.isCollapsed2 = true;
    this.isCollapsed3 = false;
}

  ngOnInit() {
  }

}
