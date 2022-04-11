import { Observable, EventData, ListPicker  } from '@nativescript/core'

const digit = ['0','1','2','3','4','5','6','7','8','9','.'];
const units = {'rur': 74.8501, 'use':1, 'eur':0.9161 ,'gbp':0.7011};
const values2 = ["rur","use","eur","gbp"];
let selected1 = 0;
let selected2 = 0;

function convert(num: number, index1: number, index2:number){
     const mul1 = units[values2[index1]];
     const mul2 = units[values2[index2]];
     // Сначала переводим в доллары с помощью деления, 
     // а потом переводим в нужную валюту умножением
     num = (num/mul1)*mul2

     return num.toFixed(2); // возвращаем результат с окргулением до 2-ух знаков после запятой
}

export class currency extends Observable {
     values = ["rur","use","eur","gbp"]; //gbp - фунты 
     num1 = "";
     num2 = "";
     sel1 = 0;
     sel2 = 0;
     onTap(args) {
          let button = args.object;
          if (button.text === "⌫"){
               let text = this.get('num1');
               this.set('num1', text.slice(0,-1));
          }
          else if (button.text === "⇄"){
               let a = this.get('num1');
               let b = this.get('num2');
               this.set('num2', a);
               this.set('num1', b);

               let temp = selected1;
               selected1 = selected2;
               selected2 = temp;
               this.set('sel1', selected1);
               this.set('sel2', selected2);
          }
          else if (button.text === "."){
               let text = this.get('num1');
               if (!text.includes(button.text)){
                    this.set('num1', text + button.text);
               }
          }
          else{
               let text = this.get('num1');
               this.set('num1', text + button.text);
          }
          let oldVal = Number(this.get('num1'));
          let newVal = convert(oldVal, selected1, selected2);
          this.set('num2', String(newVal));
     }
     onListPickerLoaded1(args){
          const listPicker = args.object;
          listPicker.on('selectedIndexChange', (event: EventData) => {
               const picker = event.object as ListPicker;
               selected1 = picker.selectedIndex;

               let oldVal = Number(this.get('num1'));
               let newVal = convert(oldVal, selected1, selected2);
               this.set('num2', String(newVal));
          })
     }
     onListPickerLoaded2(args){
          const listPicker = args.object;
          listPicker.on('selectedIndexChange', (event: EventData) => {
               const picker = event.object as ListPicker;
               selected2 = picker.selectedIndex;

               let oldVal = Number(this.get('num1'));
               let newVal = convert(oldVal, selected1, selected2);
               this.set('num2', String(newVal));
          })
     }
}