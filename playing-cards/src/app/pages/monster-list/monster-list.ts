import { Component, model, inject, signal, computed, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MonsterService } from '../../services/monster/monster';
import { Monster } from '../../models/monster.model';
import { CommonModule } from '@angular/common';
import { PlayingCard } from '../../components/playing-card/playing-card';
import { SearchBar } from '../../components/search-bar/search-bar';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [CommonModule, PlayingCard, SearchBar],
  templateUrl: './monster-list.html',
  styleUrl: './monster-list.css',
})
export class MonsterList implements OnInit {
  private monsterService = inject(MonsterService);
  private router = inject(Router);
  
  monsters = signal<Monster[]>([]);
  search = model('');
  
  filteredMonsters = computed(() => {
    return this.monsters().filter(monster => 
      monster.name.toLowerCase().includes(this.search().toLowerCase())
    );
  });

  constructor() {
    this.loadMonsters();
  }

  ngOnInit() {
    this.loadMonsters();
  }

  private loadMonsters() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    const genericMonster = new Monster();
    const addedMonster = this.monsterService.add(genericMonster);
    this.router.navigate(['/monster', addedMonster.id]); 
  }

  viewMonster(id: number) {
    this.router.navigate(['/monster', id]);
  }
}