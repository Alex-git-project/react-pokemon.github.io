import React from 'react';
import {inject, observer} from 'mobx-react';
import './list.css'
import Post from "./Post/Post";
import Pagination from "./pagination/Pagination";
import {isEmpty} from "../../additionalFunctions";

@inject('TodoStore')
@observer
class List extends React.Component {
    constructor(props) {
        super(props)
        this.TodoStore = this.props.TodoStore;
    }

    componentWillMount() {
        if (isEmpty(this.TodoStore.pokemons)) {
            this.TodoStore.setApiPokemins()
        }
    }

    render() {
        this.pokemons = this.TodoStore.filterPokemon();
        return (
            <div className="page-row">
                <ul className="listPost">
                    {this.pokemons.map(name => <Post key={name} name={name}/>)}
                </ul>
                {this.TodoStore.activeSearch == false ? <Pagination/> : null}
            </div>
        );
    }
};

export default List;








