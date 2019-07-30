import React from 'react';
import {observable, action, computed, decorate} from 'mobx';

class TodoStore {
    @observable inputSearch = "";
    @observable pokemons = {};
    pageSize = 10;
    totalPokemons = 0;
    currentPage = 1;

    getPokemins() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20')
            .then(res => res.json())
            .then(json => {
                this.setPokemins(json.results)
            })
    };


    getObjPokemin(name) {
        fetch(this.pokemons[name].url)
            .then(res => res.json())
            .then(json => {
                const pokemons = {...this.pokemons}
                pokemons[name] = json
                this.pokemons = pokemons
            })
    };


    setPokemins(pokemonsList) {
        pokemonsList.forEach(({
         name,url
        })=>{
            const pokemons = {...this.pokemons}
            pokemons[name]={url}
            this.pokemons = pokemons
        })
    };

    updateSearch = (action) => {
        this.inputSearch = action
    }

    @computed
    get filterPokemon() {

        let matchesFilter = new RegExp(this.inputSearch, "i");
        return Object.keys(this.pokemons).filter(name => matchesFilter.test(name))
    }

}

/*decorate(TodoStore,{
    getObjPokemin: action.bound,
    getPokemins: action.bound,
    setPokemins: action
})*/



const store = new TodoStore();
export default store;
