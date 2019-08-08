import React from 'react';
import {inject, observer} from 'mobx-react';
import './search.css'
import '../App.css'
import {debounce} from "lodash"

const Search = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;

    let propSymb = function (obj) {
        return Object.getOwnPropertyNames(obj)
    };

    let pokemonsCount = (propSymb(TodoStore.pokemons).length) - 1;

    let updateInput = debounce((text) => {

        TodoStore.totalPokemons != pokemonsCount && text != "" ?
            (TodoStore.getSearch(), TodoStore.updateSearch(text) , TodoStore.activeSearch = true) :
            false;

        if (text == "") {
            TodoStore.clearMass()
            TodoStore.activeSearch = false
            TodoStore.setApiPokemins()
            TodoStore.updateSearch(text);
        }
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
