import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private ss: SearchService) { }

  ngOnInit(): void {
    this.phrase = this.route.snapshot.paramMap.get('phrase');
    this.ss.searchForPhrase(this.route.snapshot.paramMap.get('phrase')).subscribe((res: any) => {
      console.log(res);
      this.showsResults = JSON.parse(res.showsResults).Search;
      this.usersResults = JSON.parse(res.usersResults);
    })
  }

}
