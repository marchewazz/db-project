import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-tool',
  templateUrl: './search-tool.component.html',
  styleUrls: ['./search-tool.component.scss']
})
export class SearchToolComponent implements OnInit {

  phrase: FormControl = new FormControl();

  isPhraseValid: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(): void {
    const phrase = this.phrase.value;
    
    if(!phrase) this.isPhraseValid = false

    if(phrase) this.redirect(`/search/${phrase}`)
  }

  redirect(path: string): void{
    this.router.navigate([path]);
  }
}
