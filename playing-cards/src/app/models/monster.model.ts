import { MonsterType } from "../utils/monster.utils";

export class Monster {


  id: number = -1;
  name: string = "Voltali";
  image: string = "/voltali.jpg";
  type: MonsterType = MonsterType.ELECTRIC;
  hp: number = 60;
  figureCaption: string = "N*001 Monster";

  attackName: string = "Thunder Struck";
  attackStrength: number = 60;
  attackDescription: string = "Un évoli ayant évolué dans un environnement orageux foudreux";

  copy(): Monster {
    return Object.assign(new Monster(), this);
  }

}