import React from 'react';
import { inject, observer } from 'mobx-react';
import './search.css'
import '../App.css'
import {FaSistrix} from 'react-icons/fa'


const Search = inject('TodoStore')(observer(props => {
  const TodoStore = props.TodoStore;
    function updateInput(e){
        TodoStore.updateSearch(e.target.value)
    }
    console.log(TodoStore.inputSearch);
  return (
     <div className="pageRow">
         <form>
             <input value={TodoStore.inputSearch}
                    onChange={updateInput}
                    className="inputSearch"
                    type="text"
                    placeholder="Search"
             />
             <button className="buttonSearch">
                 <FaSistrix size="20"/>
             </button>
         </form>
     </div>
  );
}));

export default Search;
