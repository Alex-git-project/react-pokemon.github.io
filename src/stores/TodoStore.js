import React from 'react';
import {observable, action, computed, decorate} from 'mobx';

export const quantituSize = {
    maximum: 50,
    average: 20,
    minimum: 10
}


class TodoStore {
    @observable inputSearch = "";
    @observable pokemons = {};
    @observable pageSize = quantituSize.minimum;
    @observable totalPokemons = 0;
    @observable currentPage = 0;
    @observable ability = [];
    @observable activeSearch = false;


    getAbility(){
        return this.ability;
    }

    clearMass() {
        this.pokemons = {}
    }

    setPageSize(action) {
        this.pageSize = Number(action);
        this.setApiPokemins()
    }

    getQuantituPage() {
        return Math.ceil(this.totalPokemons / this.pageSize);
    }

    setCurrentPage(action) {
        this.newCurrentPage(action);
    }

    newCurrentPage(action) {
        let currentPage = {...this.currentPage}
        currentPage = action;
        this.currentPage = currentPage;
        this.setApiPokemins()
    }

    setApiPokemins() {
        fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${this.pageSize}&offset=${this.currentPage * this.pageSize}`)
            .then(res => res.json())
            .then(json => {
                this.totalPokemons = json.count;
                this.setPokemins(json.results, 'pokemons')
            })
    };


    getObjPokemin(name, arr = 'pokemons') {
        fetch(this[arr][name].url)
            .then(res => res.json())
            .then(json => {
                const pokemons = {...this.pokemons}
                pokemons[name] = {...pokemons[name], ...json}
                this[arr] = pokemons
            })
    };


    setPokemins(pokemonsList, toObj) {
        const pokemons = {}
        pokemonsList.forEach(({name, url}) => {
            pokemons[name] = {url}
        });
        this[toObj] = pokemons
    };


    //search


    // getting Pokémon in advanced search
    setActiveAbility(abilityList) {
        let arr = []
        abilityList.forEach( url => {
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    json.pokemon.forEach( item => {
                        arr.push(item.pokemon)
                    })
                    debugger
                    this.setPokemins(arr , 'pokemons');
                })
        });

    }

    //getting Ability from api
    setAbility() {
        fetch(`https://pokeapi.co/api/v2/ability/?offset=20&limit=20`)
            .then(res => res.json())
            .then(json => {
                let ability = [...this.ability];
                ability = (json.results);
                this.ability = ability
            })
    }

    //set value input field
    updateSearch = (action) => {
        this.inputSearch = action
    }

    //getting all pokemons from api
    getSearch() {
        fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${this.totalPokemons}`)
            .then(res => res.json())
            .then(json => {
                this.setPokemins(json.results, 'pokemons')
            })
    };

    //this.pokemons object output ( output all pokemons)
    filterPokemon() {
        let matchesFilter = new RegExp(this.inputSearch, "i");
        return Object.keys(this.pokemons).filter(name => matchesFilter.test(name))
    }

}

const store = new TodoStore();
export default store;
