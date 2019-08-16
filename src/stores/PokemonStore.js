import React from 'react';
import axios from "axios";
import {observable, action, computed, decorate} from 'mobx';

export const quantituSize = {
    maximum: 50,
    average: 20,
    minimum: 10
}

class PokemonStore {
    @observable inputSearch = "";
    @observable pokemon = {};
    @observable pageSize = quantituSize.minimum;
    @observable totalPokemon = 0;
    @observable currentPage = 0;
    @observable ability = [];
    @observable activeAbility = false;
    @observable activeSearch = false;


    setAbility(data) {
        let ability = [...this.ability];
        ability = data;
        this.ability = ability
    }

    clearMass() {
        this.pokemon = {}
    }

    setPageSize(action) {
        this.pageSize = Number(action);
        this.setApiPokemins()
    }

    getQuantituPage() {
        return Math.ceil(this.totalPokemon / this.pageSize);
    }

    setCurrentPage(action) {
        this.newCurrentPage(action);
        this.setApiPokemins()
    }

    newCurrentPage(action) {
        let currentPage = {...this.currentPage}
        currentPage = action;
        this.currentPage = currentPage;
        this.setApiPokemins()
    }


    setApiPokemins = async () => {
        const result = await axios(
            `https://pokeapi.co/api/v2/pokemon/?limit=${this.pageSize}&offset=${this.currentPage * this.pageSize}`
        )
        this.totalPokemon = result.data.count;
        this.setPokemins(result.data.results, 'pokemon')
    }

    setPokemins(pokemonList, toObj) {
        const pokemon = {}
        pokemonList.forEach(({name, url}) => {
            pokemon[name] = {url}
        });
        this[toObj] = pokemon
    };


    //search


    // getting Pokémon in advanced search
    setActiveAbility(abilityList) {
        let arr = []
        abilityList.forEach(url => {
            fetch(url)
                .then(res => res.json())
                .then(json => {
                    json.pokemon.forEach(item => {
                        arr.push(item.pokemon)
                    })
                    this.setPokemins(arr, 'pokemon');
                })
        });

    }

    //set value input field
    updateSearch = (action) => {
        this.inputSearch = action
    }

    //getting all pokemon from api
    getSearch = async () => {
        const result = await axios(
            `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${this.totalPokemon}`
        );
        this.setPokemins(result.data.results, 'pokemon')
    };

    //this.pokemon object output ( output all pokemon)
    filterPokemon() {
        let matchesFilter = new RegExp(this.inputSearch, "i");
        return Object.keys(this.pokemon).filter(name => matchesFilter.test(name))
    }

}

const store = new PokemonStore();
export default store;
