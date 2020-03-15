import { Component, OnInit } from '@angular/core';

import { Comentari } from '../modelos/comentari.modelo';
import { Recepta } from '../modelos/recepta.modelo';
import { receptas } from '../modelos/recepta.modelo';

@Component({
  selector: 'app-receptas',
  templateUrl: './receptas.component.html',
  styleUrls: ['./receptas.component.css']
})
export class ReceptasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  receptasComp=receptas;
  receptasForm:Recepta = new Recepta();

  comentari:Comentari = new Comentari();

  //Variable a on guardarem el valor de la searchBar del html
  searchTerm: string;
  //Variable a on guardarem el valor del select per ordenar del html
  ordre: string;

  //Funció que quan s'activi examinarà quina es la tipus de ordre que s'ha demanat en el select del html
  //i llavors ordenarà el arraylist de receptes segons aquests criteris
  ordenar(){
    if(this.ordre=='asc'){
      // Ascending
      this.receptasComp.sort((a,b) => 0 - (a.nombre > b.nombre ? -1 : 1));
    }else if(this.ordre=='desc'){
      // Descending
      this.receptasComp.sort((a,b) => 0 - (a.nombre > b.nombre ? 1 : -1)); 
    }else if(this.ordre=='ingAsc'){
      // Ascending Ingredient
      this.receptasComp.sort((a,b) => 0 - (a.ingredients > b.ingredients ? -1 : 1));
    }else if(this.ordre=='ingDesc'){
      // Descending Ingredient
      this.receptasComp.sort((a,b) => 0 - (a.ingredients > b.ingredients ? 1 : -1)); 
    }
    
  }
  

  //Funció amb la que extrec el ultim id de recepta
  //(gracies a ella utilitzaré l'ultim id sempre alhora de crear una nova recepta)
  ultimIDRecepta(){
    var i:any = 0;
    for (i in receptas) {
      console.log(i);
    }
    return i;
  }

  //Funció amb la que extrec el ultim id de comentaris
  //(gracies a ella utilitzaré l'ultim id sempre alhora de crear un nou comentari)
  ultimIDComentari(idRecepta:number){
    var i:any = 0;
    for (i in receptas[idRecepta].comentaris) {
      console.log(i);
    }
    return i;
  }

  //Aquesta funció comprova si el nom de la recepta que es vol crear ja existeix, 
  //retornar boolean false en cas de que aquesta recepta ja es trobi en l'array receptes
  comprovarNomRecepta(nom:string){
    var i:any = 0;
    for (i in receptas) {
      if(receptas[i].nombre==nom){
        return false;
      }
    }
    return true;
  }

  //Funció per afegir una recepta 
  addRecepta(){
    let validar:boolean = this.comprovarNomRecepta(this.receptasForm.nombre);
    if(validar==true){
      this.receptasForm.id = this.ultimIDRecepta()+1;
      this.receptasComp.push(this.receptasForm);
    }
    this.receptasForm = new Recepta();
  }

  //Funcio per afegir un comentari en l'array de comentaris d'una recepta
  addComentari(id:number){
    var i:any = 0;
    for (i in receptas) {
      if(receptas[i].id==id){
        console.log('Lo he encontrado '+receptas[i].nombre);
        if(this.comentari.stars!=null && this.comentari.review!=""){
            this.comentari.id = this.ultimIDComentari(id)+1;
            this.comentari.dia = new Date();
            receptas[i].comentaris.push(this.comentari);
        }
        this.comentari = new Comentari();
      }
    }
  }

}
