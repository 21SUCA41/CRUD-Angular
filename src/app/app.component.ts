import { Component } from '@angular/core';
import { FruitService } from './fruit/fruit.service';
import { Fruit } from './fruit/fruit';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
  fruitform:any;
  editMode: boolean = false;
  editId: number | null = null;
 
   constructor(private fruitService:FruitService,private fb:FormBuilder){
    this.fruitform = this.fb.group({
      name : new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
      
      price : new FormControl('',Validators.required)
  
    }); }
    get fname(): FormControl{
      return this.fruitform.get('name') as FormControl
    }
    get fquantity(): FormControl{
      return this.fruitform.get('quantity') as FormControl
    }
    get fprice(): FormControl{
      return this.fruitform.get('price') as FormControl
    }
    allfruit:Fruit[]=[];
  // // ngOnInit(): void {
  // //   // this.fruitService.getAll().subscribe((data)=>{
  // //   //   this.allfruit=data;
  // //   // })
  
  // }
  submit(){
    // let obj = {
    //   ...this.fruitform.value,
    //   id:crypto.randomUUID()
    // }
    // console.log(obj)
    // this.allfruit.push(obj)
    const formData = this.fruitform.value;

    if (this.editMode && this.editId !== null) {
      // ✅ Edit mode: update existing item
      this.allfruit = this.allfruit.map(fruit =>
        fruit.id === this.editId ? { ...formData, id: this.editId } : fruit
      );
      this.editMode = false;
      this.editId = null;
    } else {
      // ✅ Add mode: add new item
      const newFruit = {
        ...formData,
        id: crypto.randomUUID()
      };
      this.allfruit.push(newFruit);
    }
  
    // ✅ Reset form
    this.fruitform.reset();
  }
  removeItem(id: number) {
    this.allfruit = this.allfruit.filter(item => item.id !== id);
  }
 
  edit(item: any) {
    this.editMode = true;
    this.editId = item.id;
  
    this.fruitform.setValue({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    });}
    reset(){
      this.fruitform.reset();
      this.editMode=false;
    }

}


