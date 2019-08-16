import React from 'react';
import {inject, observer} from 'mobx-react';
import './selectCountPage.css';
import {quantituSize} from '../../stores/PokemonStore';


const SelectCountPage = inject('PokemonStore')(observer(props => {

    const PokemonStore = props.PokemonStore;

    function updatePageSize(e) {
        PokemonStore.setPageSize(e.target.getAttribute('data-size'));
    }

    let arrSizePage = Object.values(quantituSize);

    let list = arrSizePage.map(item =>
        <div className={`countPageSize ${item == PokemonStore.pageSize ? 'activeSize' : ''}`} onClick={updatePageSize}
             data-size={item}>
            {item}</div>)
    return (
        <div className="page-row">
            <div className="boxSelect">
                <div className="viewCount">
                    <span className='textComponent'>count pokemon {PokemonStore.pageSize}</span>
                    <div className="viewCountChildren">
                        {list}
                    </div>
                </div>
            </div>
        </div>
    );


}));

export default SelectCountPage;
