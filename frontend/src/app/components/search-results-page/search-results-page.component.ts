import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from 'src/app/services/searchService/search.service';

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.scss']
})
export class SearchResultsPageComponent implements OnInit {

  showsResults: any;
  usersResults: any;

  phrase: any = "";

  resultsTab: string = "shows";

  constructor(private router: Router, private route: ActivatedRoute, private ss: SearchService) { }

  ngOnInit(): void {
    this.phrase = this.route.snapshot.paramMap.get('phrase');
    this.ss.searchForPhrase(this.route.snapshot.paramMap.get('phrase')).subscribe((res: any) => {
      console.log(res);
      this.showsResults = JSON.parse(res.showsResults).Search;
      this.usersResults = JSON.parse(res.usersResults);
    })
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }

  createPath(path: string, param: any): string{
    return path+param
  }
}
