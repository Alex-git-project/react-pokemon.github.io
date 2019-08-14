import React from 'react';
import {inject, observer} from 'mobx-react';
import './search.css'
import '../App.css'
import {debounce} from "lodash"

const Search = inject('TodoStore')((props => {
    const TodoStore = props.TodoStore;

    let propSymb = function (obj) {
        return Object.getOwnPropertyNames(obj)
    };

    let pokemonCount = (propSymb(TodoStore.pokemon).length) - 1;

    let updateInput = debounce((text) => {
    debugger
        text != "" ?
            !TodoStore.activeAbility ?
                TodoStore.totalPokemon != pokemonCount ?
                    (TodoStore.getSearch(), TodoStore.updateSearch(text) , TodoStore.activeSearch = true) : false :
                TodoStore.updateSearch(text) :
            false


        text == "" ?
            !TodoStore.activeAbility ? (
                TodoStore.clearMass(),
                    TodoStore.activeSearch = false,
                    TodoStore.setApiPokemins(),
                    TodoStore.updateSearch(text)
            ) : TodoStore.updateSearch(text) :
            false;

    }, 2000);


    return (
        <div className="page-row">
            <form>
                <input
                    onChange={e => updateInput(e.target.value)}
                    className="inputSearch"
                    type="text"
                    placeholder="Search"
                />
            </form>
        </div>
    );
}));

export default Search;
