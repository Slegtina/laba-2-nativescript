import { Observable, EventData, ListPicker} from '@nativescript/core'

const digit = ['0','1','2','3','4','5','6','7','8','9','.'];
const units = {'мм³':1, 'см³':1000,'дм³':1000000, 'м³':1000000000};
const values2 = ["мм³","см³","дм³","м³"];
let selected1 = 0;
let selected2 = 0; 

function convert(num: number, index1: number, index2:number){
    const mul1 = units[values2[index1]];
    const mul2 = units[values2[index2]];
    const diff = mul2/mul1;
    return num/diff;
}

export class volume extends Observable {
    values = ["мм³","см³","дм³","м³"];
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