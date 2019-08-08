import React, {useEffect , useState} from 'react';
import {inject, observer} from 'mobx-react';
import './postStyle.css';

const Post = inject('TodoStore')(observer(props => {

    const TodoStore = props.TodoStore;
    debugger

    const [pokemon , setPokemon] = useState(TodoStore.pokemons[props.name]);

    useEffect( () => {
        fetch(TodoStore.pokemons[props.name].url)
            .then(res => res.json())
            .then(json => {
                setPokemon(json)
            });
    },[]);


    let mass;
    let imagePokemon;
    if (pokemon.abilities) {
        mass = pokemon.abilities.map(item => <li>{item.ability.name}</li>);
        imagePokemon = (<img className="imgPost" src={pokemon.sprites.front_shiny}/>)
    }

    return (
        <li>
            <div className='item'>
                <div className='imageBox'>
                    {imagePokemon}
                </div>
                <div className='postData'>
                    <h4>{pokemon.name}</h4>
                    <ul className="descriptionPost">
                        {mass}
                    </ul>
                </div>
            </div>
        </li>
    );
}));

/*@inject('TodoStore')
@observer
class Post extends Component {

    componentDidMount() {
        this.props.TodoStore.getObjPokemin(this.props.name);
    }

    render() {
        const TodoStore = this.props.TodoStore;
        const pokemon = TodoStore.pokemons[this.props.name];
        let mass;
        let imagePokemon;
        if (pokemon.abilities) {
            mass = pokemon.abilities.map(item => <li>{item.ability.name}</li>);
            imagePokemon = (<img className="imgPost" src={pokemon.sprites.front_shiny}/>)
        }

        return (
            <li>
                <div className='item'>
                    <div className='imageBox'>
                        {imagePokemon}
                    </div>
                    <div className='postData'>
                        <h4>{pokemon.name}</h4>
                        <ul className="descriptionPost">
                            {mass}
                        </ul>
                    </div>
                </div>
            </li>
        );
    }
};*/

export default Post;
