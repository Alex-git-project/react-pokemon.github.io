import React from 'react';
import {inject, observer} from 'mobx-react';
import './list.css'
import Post from "./Post/Post";
import Pagination from "./pagination/Pagination";
import {isEmpty} from "../../additionalFunctions";
import SelectCountPage from "../SelectCountPage/SelectCountPage";

@inject('TodoStore')
@observer
class List extends React.Component {
    constructor(props) {
        super(props)
        this.TodoStore = this.props.TodoStore;
    }

    componentWillMount() {
        if (isEmpty(this.TodoStore.pokemon)) {
            this.TodoStore.setApiPokemins()
        }
    }


    render() {
        this.pokemon = this.TodoStore.filterPokemon();
        let componentList = this.pokemon.map(name => <Post key={name} name={name} TodoStore={this.TodoStore}/>);
        return (
            <div className="page-row">
                {this.TodoStore.activeSearch == false ? <SelectCountPage/> : null}
                <ul className="listPost">
                    {componentList.length ? componentList: 'not found'}
                </ul>
                {this.TodoStore.activeSearch == false ? <Pagination/> : null}
            </div>
        );
    }
};

export default List;








