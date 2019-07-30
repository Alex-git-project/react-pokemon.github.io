import React from 'react';
import { inject, observer } from 'mobx-react';
import './list.css'
import Post from "./Post/Post";

const List = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    TodoStore.getPokemins();
    const pokemons = TodoStore.filterPokemon
    //TodoStore.posts.length == 0 ? TodoStore.getPokemins() : false;
    //let mass = TodoStore.filterUser.Object.case(user => <Post key={user.name} name={user.name} url={user.url}/>)
    return (
       <div className="page-row">
           <ul className="listPost">
               {pokemons.map(name => <Post key={name} name={name}/>)}
           </ul>
       </div>
    );
}));

export default List;
