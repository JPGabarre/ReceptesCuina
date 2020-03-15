import { PipeTransform, Pipe } from '@angular/core';
import { Recepta } from '../modelos/recepta.modelo';

@Pipe({
    name: 'ReceptaFiltre'
})
export class ReceptasFilterPipe implements PipeTransform {
    transform(receptas: Recepta[], searchTerm: string): Recepta[] {
        if(!receptas || !searchTerm){
            return receptas;
        }

        return receptas.filter(recepta =>
            recepta.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) ! == 0);
    }
}
