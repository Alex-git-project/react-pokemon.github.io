import React from 'react';
import { inject, observer } from 'mobx-react';
import './header.css'

const Header = inject('TodoStore')(observer(props => {
  const TodoStore = props.TodoStore;
  return (
      <header>
          <div className="headerTitleSection">
              <div className="page-row">
                  <h1 className="generalHeader">Pokemon</h1>
              </div>
          </div>
      </header>
  );
}));

export default Header;
