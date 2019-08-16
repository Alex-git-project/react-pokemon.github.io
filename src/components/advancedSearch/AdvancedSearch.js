import React, {useEffect, useState,useMemo} from 'react';
import {inject} from 'mobx-react';
import './advancedSearch.css';
import axios from "axios";

function getCheckedCheckBoxes() {
    let selectedCheckBoxes = document.querySelectorAll('input.checkbox:checked');
    let checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.value);
    return checkedValues;
}

const AdvancedSearch = inject('PokemonStore')((props => {
    let heightHiddenList = 300;//attention hardcode
    let hiddenBox = React.createRef();
    const [mass, setMass] = useState([]);
    const PokemonStore = props.PokemonStore;

    //getting fields for advanced search
    useEffect(() => {
        let setAbility = async () => {
            const result = await axios(
                `https://pokeapi.co/api/v2/ability/?offset=20&limit=20` //I'm sorry, but I didn’t want to display all 260 Pokemon ability
            )
            setMass(result.data.results)
            PokemonStore.setAbility(result.data.results)
        };
        setAbility();
    },[]);

    function search(e) {
        e.preventDefault() //cancel click-through
        let dataSearch = getCheckedCheckBoxes(); //getting marked checkboxes

        dataSearch.length ?
            (PokemonStore.setActiveAbility(dataSearch), PokemonStore.activeSearch = true , PokemonStore.activeAbility = true) :
            (PokemonStore.setApiPokemins(), PokemonStore.activeSearch = false, PokemonStore.activeAbility = false);
    }

    //advanced search exit
    function active() {
        parseInt(hiddenBox.current.style.height) == 0 ?
            hiddenBox.current.style.height = (heightHiddenList + 'px') :
            hiddenBox.current.style.height = 0;
    }

    return (
        <div className='page-row'>
            <div ref={hiddenBox} id='hiddenBox' className='listAbility hiddenBox'>
                <form onSubmit={search}>
                    <ul className='listItemAdvansed'>
                        {mass.map(item =>
                            <li className='itemAdvansed'>
                                {item.name}
                                <input className="checkbox" type="checkbox" value={item.url} name=""/>
                            </li>)
                        }
                    </ul>
                    <input className='buttonSearchAdvanced' type='submit' value='Search'/>
                </form>
            </div>
            <div onClick={active} className='activeList'>
                Advenced search
            </div>
        </div>
    );


}));

export default AdvancedSearch;
