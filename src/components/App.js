import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Search from "./Search";
import Header from "./Header";
import List from "./listPost/List";
import AdvancedSearch from "./advancedSearch/AdvancedSearch";



@inject('PokemonStore')
@observer
class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Search />
                <AdvancedSearch />
                <List />
            </div>
        );
    }
}

export default App;
