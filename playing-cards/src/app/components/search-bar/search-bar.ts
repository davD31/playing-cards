import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  search = model<string>('');
  
  searchButtonClicked = output({alias: 'submit'});

  searchClick() {
    console.log("Recherche:", this.search());
    this.searchButtonClicked.emit();
  }
}