import { Component, computed, input } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  standalone: true, 
  imports: [],
  templateUrl: './playing-card.html',
  styleUrl: './playing-card.css',
})
export class PlayingCard {
  monster = input(new Monster());

  monsterTypeIcon = computed(() => {
    return MonsterTypeProperties[this.monster().type].imageUrl;
  });

  backgroundColor = computed(() => {
    return MonsterTypeProperties[this.monster().type].color;
  });
}