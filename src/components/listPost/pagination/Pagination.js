import React from 'react';
import {inject, observer} from 'mobx-react';
import './pagination.css'

const Pagination = inject('PokemonStore')(observer(props => {
    const PokemonStore = props.PokemonStore;

    let currentPage = PokemonStore.currentPage;

    let totalPage = PokemonStore.getQuantituPage();

    let minimumAllowable = 0;
    let maximumAllowable = 0;

    if (totalPage > 1) {
        minimumAllowable = currentPage > 1 ? currentPage - 1 : 0;

        if (currentPage <= 1) {
            maximumAllowable = 5 > totalPage ? totalPage : 5;
        } else {
            maximumAllowable = currentPage + 3 > totalPage ? totalPage : currentPage + 3;
        }
    }

    let countPage = getPaginationList();

    function clickItem(e) {
        PokemonStore.setCurrentPage(e.target.value);
    }

    function getPaginationList() {
        let massCountPage = [];
        for (let i = minimumAllowable; i < maximumAllowable; i++) {
            massCountPage.push(
                <li className={i == currentPage ? "listItemActive listItem" : "listItem"} value={i}
                    onClick={i == currentPage ? null : clickItem}>{i + 1}</li>
            )
        }
        return massCountPage;
    }

    return (
        <ul className="list">
            {countPage}
        </ul>
    );
}));

export default Pagination;
