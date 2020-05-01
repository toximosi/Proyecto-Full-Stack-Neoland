import { Pipe, PipeTransform } from '@angular/core';
//variables universales---------------------> environment
import { environment } from '../../environments/environment';

@Pipe({
  name: 'urlimg'
})
export class UrlimgPipe implements PipeTransform {

  url: string;

  transform(img: string): string {

    this.url = environment.imgUrl;

    img = `${this.url}${img}`;

    /* console.log(img); */

    return img;

  }

}
