import { Component, OnInit } from '@angular/core';

import { Comentari } from '../modelos/comentari.modelo';
import { Recepta } from '../modelos/recepta.modelo';
import { receptas } from '../modelos/recepta.modelo';

import axios from 'axios';

@Component({
  selector: 'app-receptas',
  templateUrl: './receptas.component.html',
  styleUrls: ['./receptas.component.css']
})
export class ReceptasComponent implements OnInit {

  constructor() { }

  receptasComp=receptas;

  ngOnInit(): void {
    //Aquesta funcio fa que substituim l'array de receptesComp per la que tenim a la base de dades del json-server
    axios.get('http://localhost:3000/receptes')
            .then(resp => {
                var data = resp.data;
                data.forEach(e => {
                  var receptaAPI:Recepta = new Recepta();
                  receptaAPI.id=e.id;
                  receptaAPI.nombre=e.nom;
                  receptaAPI.pasos=e.elaboracio;
                  receptaAPI.ingredients=e.ingredients;
                  e.reviews.forEach(c =>{
                    var comentariAPI:Comentari = new Comentari();
                    comentariAPI.id=c.id;
                    comentariAPI.stars=c.stars;
                    comentariAPI.review=c.body;
                    comentariAPI.dia=c.createdOn;
                    receptaAPI.comentaris.push(comentariAPI);
                  })
                  this.receptasComp.push(receptaAPI);
                });
            })
            .catch(error => {
                console.log(error);
            });
  }

  receptasForm:Recepta = new Recepta();

  receptasEdit:Recepta = new Recepta();

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
    for (i in this.receptasComp) {
      console.log(this.receptasComp[i].nombre);
    }
    var n:number = Number(this.receptasComp[i].id);
    n=n+1;
    return n;
  }

  //Funció amb la que extrec el ultim id de comentaris
  //(gracies a ella utilitzaré l'ultim id sempre alhora de crear un nou comentari)
  ultimIDComentari(idRecepta:number){
    var i:any = 0;
    for (i in this.receptasComp[idRecepta-1].comentaris) {
      console.log(i);
    }
    var n:number = Number(this.receptasComp[idRecepta-1].comentaris[i].id);
    n=n+1;
    return n;
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
    /*
    ANTIC CODI DE LA PART 1

    let validar:boolean = this.comprovarNomRecepta(this.receptasForm.nombre);
    if(validar==true){
      this.receptasForm.id = this.ultimIDRecepta()+1;
      this.receptasComp.push(this.receptasForm);
    }
    this.receptasForm = new Recepta();
    */
   
    let validar:boolean = this.comprovarNomRecepta(this.receptasForm.nombre);
    if(validar==true){
      this.receptasForm.id = this.ultimIDRecepta();
      this.receptasComp.push(this.receptasForm);
      console.log(this.receptasForm.id);
    }

    //Aqui afegeixo una recepta a l'array de receptes de l'api
    axios.post('http://localhost:3000/receptes', {
      nom: this.receptasForm.nombre,
      elaboracio: this.receptasForm.pasos,
      ingredients: this.receptasForm.ingredients,
      reviews: this.receptasForm.comentaris,
      id: this.receptasForm.id
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    this.receptasForm = new Recepta();

  }

  //Funcio per afegir un comentari en l'array de comentaris d'una recepta
  addComentari(id:number){
    var i:any = 0;
    for (i in this.receptasComp) {
      if(this.receptasComp[i].id==id){
        console.log('Lo he encontrado '+this.receptasComp[i].nombre);
        if(this.comentari.stars!=null && this.comentari.review!=""){
            this.comentari.id = this.ultimIDComentari(id)+1;
            this.comentari.dia = new Date();
            this.receptasComp[i].comentaris.push(this.comentari);
        }
        this.comentari = new Comentari();
      }
    }

    //Afegeixo un comentari a l'array de comentaris de les receptes de l'api
    axios.put('http://localhost:3000/receptes/'+id, {
      nom: this.receptasComp[id-1].nombre,
      elaboracio: this.receptasComp[id-1].pasos,
      ingredients: this.receptasComp[id-1].ingredients,
      reviews: this.receptasComp[id-1].comentaris,
      id: id
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  
  //Funció per editar una recepta
  canEdit(id:number){
    if(this.receptasComp[id-1].edit==false){
      this.receptasComp[id-1].edit=true;
    }else if(this.receptasComp[id-1].edit==true){
      this.receptasComp[id-1].edit=false;
    }
  }

  //Funció per editar una recepta
  editar(id:number){
    this.receptasComp[id-1].ingredients=this.receptasEdit.ingredients;
    this.receptasComp[id-1].pasos=this.receptasEdit.pasos;
    this.receptasEdit = new Recepta();

    axios.put('http://localhost:3000/receptes/'+id, {
      nom: this.receptasComp[id-1].nombre,
      elaboracio: this.receptasComp[id-1].pasos,
      ingredients: this.receptasComp[id-1].ingredients,
      reviews: this.receptasComp[id-1].comentaris,
      id: id
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    this.receptasComp[id-1].edit=false;

  }

  //Funció per eliminar una recepta
  eliminar(id:number){
    this.receptasComp.splice(id-1, 1);
    axios.delete('http://localhost:3000/receptes/'+id, {
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


}
