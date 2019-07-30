import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Search from "./Search";
import Header from "./Header";
import List from "./listPost/List";


@inject('TodoStore')
@observer
class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Search />
                <List />
            </div>
        );
    }
}

export default App;
