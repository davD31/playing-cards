import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCard } from "../../components/playing-card/playing-card";
import { Monster as MonsterModel } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';            
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialog } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    PlayingCard, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './monster.html',
  styleUrl: './monster.css',
})
export class Monster implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private readonly dialog = inject(MatDialog);

  monsterId = signal<number | undefined>(undefined);
  private routeSubscription: Subscription | null = null;
  private formValuesSubscription: Subscription | null = null;
  
  selectedFileName: string = '';

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    attackDescription: ['', [Validators.required]]
  });

  currentMonster: MonsterModel = Object.assign(new MonsterModel(), this.formGroup.value);

  monsterTypes = Object.values(MonsterType);

  ngOnInit(): void {
    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.currentMonster = Object.assign(new MonsterModel(), data);
    });
    
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.monsterId.set(parseInt(params['id']));
        
        const id = this.monsterId();
        
        if (id !== undefined) {
          const monsterFound = this.monsterService.get(id);
          
          if (monsterFound) {
            this.currentMonster = monsterFound;
            this.formGroup.patchValue(monsterFound);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.formValuesSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

  submit(event: Event) {
    event.preventDefault();
    
    if (this.formGroup.invalid) {
      console.log('❌ Formulaire invalide');
      return;
    }

    const monsterToSave = Object.assign(new MonsterModel(), this.formGroup.value);
    const id = this.monsterId();
    
    if (id === undefined) {
      const addedMonster = this.monsterService.add(monsterToSave);
      console.log('✅ Monster added:', addedMonster);
    } else {
      monsterToSave.id = id;
      this.monsterService.update(monsterToSave);
      console.log('✅ Monster updated:', monsterToSave);
    }
    
    this.router.navigate(['/home']);
  }

  get name() {
    return this.formGroup.get('name');
  }

  get hp() {
    return this.formGroup.get('hp');
  }

  get image() {
    return this.formGroup.get('image');
  }

  get type() {
    return this.formGroup.get('type');
  }

  get figureCaption() {
    return this.formGroup.get('figureCaption');
  }

  get attackName() {
    return this.formGroup.get('attackName');
  }

  get attackStrength() {
    return this.formGroup.get('attackStrength');
  }

  get attackDescription() {
    return this.formGroup.get('attackDescription');
  }

  isFieldValid(name: string) {
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  deleteMonster() {
    const id = this.monsterId();
    
    if (id !== undefined) {
      const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialog, {
        data: { monsterName: this.currentMonster.name }
      });
      
      dialogRef.afterClosed().subscribe(confirmation => {
        if (confirmation) {
          this.monsterService.delete(id);
          this.navigateBack();
        }
      });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const reader = new FileReader();
    
    if (input.files && input.files.length) {
      const [file] = input.files;
      
      this.selectedFileName = file.name;
      
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string
        });
      };
    }
  }
}