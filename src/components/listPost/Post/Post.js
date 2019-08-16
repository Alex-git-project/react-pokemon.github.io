import React, {useEffect, useState} from 'react';
import './postStyle.css';
import axios from "axios";

function Post(props) {
    const PokemonStore = props.PokemonStore;
    const [pokemon, setData] = useState({});

    useEffect( () => {
        let getObj = (async () => {
            const result = await axios(
                PokemonStore.pokemon[props.name].url,
            )
            setData(result.data)
        });
        getObj();
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
};

export default Post;
