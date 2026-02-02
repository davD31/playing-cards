import { Monster } from "../models/monster.model";

export enum MonsterType {
    PLANT = "plant",
    ELECTRIC = "electric",
    FIRE = "fire",
    WATER = "water",
}

export interface IMonsterProperties {
    imageUrl: string;
    color: string;
}

export const MonsterTypeProperties: {[key: string]: IMonsterProperties} = {
    [MonsterType.PLANT]: {
        imageUrl: '/plante.jpg',  
        color: 'rgba(135, 255, 124)'
    },
    [MonsterType.ELECTRIC]: {
        imageUrl: '/electric.jpg', 
        color: 'rgba(255, 255, 104)'
    },
    [MonsterType.FIRE]: {
        imageUrl: '/feu.jpg',  
        color: 'rgba(255, 104, 124)'
    },
    [MonsterType.WATER]: {
        imageUrl: '/eau.jpg',  
        color: 'rgba(118, 235, 240)'
    },
}