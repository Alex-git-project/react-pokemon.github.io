import React from 'react';
import {inject, observer} from 'mobx-react';
import './selectCountPage.css';
import {quantituSize} from '../../stores/TodoStore';


const SelectCountPage = inject('TodoStore')(observer(props => {

    const TodoStore = props.TodoStore;

    function updatePageSize(e) {
        TodoStore.setPageSize(e.target.getAttribute('data-size'));
    }

    let arrSizePage = Object.values(quantituSize);

    let list = arrSizePage.map(item =>
        <div className={`countPageSize ${item == TodoStore.pageSize ? 'activeSize' : ''}`} onClick={updatePageSize}
             data-size={item}>
            {item}</div>)
    return (
        <div className="page-row">
            <div className="boxSelect">
                <div className="viewCount">
                    <span className='textComponent'>count pokemon {TodoStore.pageSize}</span>
                    <div className="viewCountChildren">
                        {list}
                    </div>
                </div>
            </div>
        </div>
    );


}));

export default SelectCountPage;
