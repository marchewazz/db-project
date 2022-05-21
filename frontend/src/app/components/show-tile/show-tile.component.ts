import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-tile',
  templateUrl: './show-tile.component.html',
  styleUrls: ['./show-tile.component.scss']
})
export class ShowTileComponent implements OnInit {

  @Input() showData: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }

  createPath(path: string, param: any): string{
    return path+param
  }
}
