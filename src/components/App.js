import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Search from "./Search";
import Header from "./Header";
import List from "./listPost/List";
import SelectCountPage from "./SelectCountPage/SelectCountPage";
import AdvancedSearch from "./advancedSearch/AdvancedSearch";
import Example from "./Example";


@inject('TodoStore')
@observer
class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Search />
                <AdvancedSearch />
                <SelectCountPage />
                <List />
                <Example />
            </div>
        );
    }
}

export default App;
