import { Comentari } from './comentari.modelo';


export class Recepta {
    public id: number;
    public nombre: string;
    public pasos: string;
    public ingredients: string;
    public comentaris: Comentari[] = [];
    //Variable booelana que utilitzaré per saber si es vol editar una recepta o no.
    public edit:boolean = false;
}

export const receptas: Array<Recepta> = [];

/*

Antiga arraylist que tenia (part1)

{id: 1 , nombre: 'Gofres', 
pasos:'Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum justo litora sem, ullamcorper eleifend fermentum pulvinar mollis sed nullam sociis mi senectus. Est ut malesuada suspendisse sagittis fames feugiat morbi egestas fringilla litora, dictum vitae dignissim interdum netus laoreet cras magnis tellus. Mauris iaculis magnis porta sed porttitor varius etiam eros, laoreet condimentum conubia lobortis felis vel eget vivamus, sociis cursus cubilia curabitur nulla sem montes.', 
ingredients:'farina,sucre,ous', comentaris:[
  {id:1, stars:4, review: 'Molt bona!', dia: new Date()},
  {id:2, stars:2, review: 'No m\'agradat', dia: new Date()}
]},
{id: 2 , nombre: 'Tortitas',
pasos:'Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum justo litora sem, ullamcorper eleifend fermentum pulvinar mollis sed nullam sociis mi senectus. Est ut malesuada suspendisse sagittis fames feugiat morbi egestas fringilla litora, dictum vitae dignissim interdum netus laoreet cras magnis tellus. Mauris iaculis magnis porta sed porttitor varius etiam eros, laoreet condimentum conubia lobortis felis vel eget vivamus, sociis cursus cubilia curabitur nulla sem montes.', 
ingredients:'farina,sucre,ous', comentaris:[
  {id:1, stars:4, review: 'Molt bona!', dia: new Date()},
  {id:2, stars:2, review: 'No m\'agradat', dia: new Date()}
 ]},
{id: 3 , nombre: 'Pastel',
pasos:'Lorem ipsum dolor sit amet consectetur adipiscing elit vestibulum justo litora sem, ullamcorper eleifend fermentum pulvinar mollis sed nullam sociis mi senectus. Est ut malesuada suspendisse sagittis fames feugiat morbi egestas fringilla litora, dictum vitae dignissim interdum netus laoreet cras magnis tellus. Mauris iaculis magnis porta sed porttitor varius etiam eros, laoreet condimentum conubia lobortis felis vel eget vivamus, sociis cursus cubilia curabitur nulla sem montes.', 
ingredients:'farina,sucre,ous', comentaris:[
  {id:1, stars:4, review: 'Molt bona!', dia: new Date()},
  {id:2, stars:2, review: 'No m\'agradat', dia: new Date()}
]}
*/