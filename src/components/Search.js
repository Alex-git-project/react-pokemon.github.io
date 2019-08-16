import React from 'react';
import {inject} from 'mobx-react';
import './search.css'
import '../App.css'
import {debounce} from "lodash"

const Search = inject('PokemonStore')((props => {
    const PokemonStore = props.PokemonStore;

    let propSymb = function (obj) {
        return Object.getOwnPropertyNames(obj)
    };

    let pokemonCount = (propSymb(PokemonStore.pokemon).length) - 1;

    let updateInput = debounce((text) => {

        if(text != ""){
            if(!PokemonStore.activeAbility){
                if(PokemonStore.totalPokemon != pokemonCount){
                    PokemonStore.getSearch()
                    PokemonStore.updateSearch(text)
                    PokemonStore.activeSearch = true
                }
            }  else {
                PokemonStore.updateSearch(text)
            }
        }

        text == "" ?
            !PokemonStore.activeAbility ? (
                PokemonStore.clearMass(),
                    PokemonStore.activeSearch = false,
                    PokemonStore.setApiPokemins(),
                    PokemonStore.updateSearch(text)
            ) : PokemonStore.updateSearch(text) :
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
