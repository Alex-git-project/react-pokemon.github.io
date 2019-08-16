import React from 'react';
import {inject, observer} from 'mobx-react';
import './list.css'
import Post from "./Post/Post";
import Pagination from "./pagination/Pagination";
import {isEmpty} from "../../additionalFunctions";
import SelectCountPage from "../SelectCountPage/SelectCountPage";

@inject('PokemonStore')
@observer
class List extends React.Component {
    constructor(props) {
        super(props)
        this.PokemonStore = this.props.PokemonStore;
    }

    componentWillMount() {
        if (isEmpty(this.PokemonStore.pokemon)) {
            this.PokemonStore.setApiPokemins()
        }
    }


    render() {
        this.pokemon = this.PokemonStore.filterPokemon();
        let componentList = this.pokemon.map(name => <Post key={name} name={name} PokemonStore={this.PokemonStore}/>);
        return (
            <div className="page-row">
                {this.PokemonStore.activeSearch == false ? <SelectCountPage/> : null}
                <ul className="listPost">
                    {componentList.length ? componentList: 'not found'}
                </ul>
                {this.PokemonStore.activeSearch == false ? <Pagination/> : null}
            </div>
        );
    }
};

export default List;








