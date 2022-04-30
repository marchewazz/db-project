import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowsService } from 'src/app/services/showsService/shows.service';

@Component({
  selector: 'app-single-show-page',
  templateUrl: './single-show-page.component.html',
  styleUrls: ['./single-show-page.component.scss']
})
export class SingleShowPageComponent implements OnInit {

  show: any;
  showRatings: boolean = false;

  constructor(private route: ActivatedRoute, private ss: ShowsService) { }

  ngOnInit(): void {
    const showData = {
      showID: this.route.snapshot.paramMap.get('id')
    }
    this.ss.getOneShow(showData).subscribe((res: any) => {
      this.show = JSON.parse(res.show);
      console.log(this.show);
      
    })
  }

}
