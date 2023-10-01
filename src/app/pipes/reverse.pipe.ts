import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(ch:string) {
    let newch : string = "";

  for (let i = ch.length-1; i >=0; i--) {
    newch= newch+ch[i] ;
    // newch+=ch[i];
    
  }

  return newch;
  }

}
