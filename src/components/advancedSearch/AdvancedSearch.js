import React from 'react';
import {inject, observer} from 'mobx-react';
import './advancedSearch.css';
import {isEmpty} from "../../additionalFunctions";

function getCheckedCheckBoxes() {
    let selectedCheckBoxes = document.querySelectorAll('input.checkbox:checked');
    let checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.value);
    return checkedValues;
}

const AdvancedSearch = inject('TodoStore')(observer(props => {
    let hiddenBox = document.getElementById('hiddenBox');
    let hiddenList = document.getElementById('hiddenList');
    const TodoStore = props.TodoStore;

    isEmpty(TodoStore.ability) ? TodoStore.setAbility() : false;

    function search(e) {
        e.preventDefault()
        let dataSearch = getCheckedCheckBoxes();
        dataSearch.length ?
            (TodoStore.setActiveAbility(dataSearch),TodoStore.activeSearch = true ):
            (TodoStore.setApiPokemins(),TodoStore.activeSearch = false);
    }

    function getHeight(obj) {
        let style = window.getComputedStyle(obj);
        return style.getPropertyValue('height');
    }

    function active() {
        parseInt(getHeight(hiddenBox)) == 0 ?
            hiddenBox.style.height = (parseInt(getHeight(hiddenList)) + 40) + 'px' :
            hiddenBox.style.height = '0px';
    }

    let mass = TodoStore.getAbility();
    return (
        <div className='page-row'>
            <div id='hiddenBox' className='listAbility hiddenBox'>
                <form id='hiddenList' onSubmit={search}>
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
