import React , {useEffect} from 'react';
import {inject, observer} from 'mobx-react';
import './postStyle.css';
import {FaSistrix} from 'react-icons/fa';


const Post = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    const pokemon = TodoStore.pokemons[props.name];

    useEffect(() => {
        TodoStore.getObjPokemin(props.name)
    },[])

    console.log(pokemon)
    return (
        <li>
            <div className='item'>
                <div className='imageBox'>
                    <img className="imgPost" src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png'/>
                </div>
                <div className='postData'>
                    <h4>{props.name}</h4>
                    <ul className="descriptionPost">
                        <li>ubivan</li>
                        <li>hidden</li>
                    </ul>
                </div>
            </div>
        </li>
    );
}));

export default Post;
