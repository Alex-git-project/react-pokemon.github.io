import React from 'react';
import { inject, observer } from 'mobx-react';
import './pagination.css'


const Pagination = inject('TodoStore')(observer(props => {
    const TodoStore = props.TodoStore;
    let currentPage = TodoStore.currentPage;
    let minimumAllowable = currentPage > 2 ? currentPage-1:0;
    let maximumAllowable = currentPage > 2 ? currentPage+3:5;


    let countPage = getPaginationList();

    function clickItem(e) {
        TodoStore.setCurrentPage(e.target.value);
    }

    function getPaginationList() {
        let massCountPage = [];
        for (let i = minimumAllowable ; i < maximumAllowable;i++){
            massCountPage.push(
                <li className={i == currentPage ? "listItemActive listItem": "listItem"} value={i} onClick={  i == currentPage ? null:clickItem}>{i+1}</li>
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
