import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';

console.log('wired');

const MainComponent = React.createClass({

  getInitialState: function(){
    return {  inputValue: '',
              inputItem: [],
              isDeleted: false
           }
  },

  _handleChange: function(evt){
    this.setState({inputValue: evt.target.value})
  },

  _handleSubmit: function(evt){
    let newArr = this.state.inputItem.concat(this.state.inputValue);
    this.setState({inputItem: newArr, inputValue: ''})
  },

  remove: function(evt){
    evt.preventDefault();
    let clicked = evt.currentTarget;
    clicked.classList.add('clicked');
    let filtered = this.state.inputItem.filter(function(listEl){
      if(listEl.className !== 'list-item clicked'){
        return false;
      }
      else {return true;}
    })

    this.setState({inputItem: filtered})

  },

  render: function(){
    return (
      <div className="main-content">
        <div className="header">
          <h1>To Do</h1>
        </div>
        <div className="input">
          <input ref="input" type="text" placeholder="Enter a task"
                 value={this.state.inputValue} onChange={this._handleChange}/>
          <button onClick={this._handleSubmit} className="btn-main">Add</button>
        </div>
        <ListContainer toDoItems={this.state.inputItem} removeItem={this.remove}/>
      </div>
    )
  }
});

const ListContainer = React.createClass({

  _createToDoList: function(arrOfItems, state){
    let comp = this;
    let array = arrOfItems.map(function(listEl){
      return (<li className="list-item">{listEl}
              <i onClick={comp.props.removeItem} className="fa fa-trash" aria-hidden="true"></i></li>)
    })
    return array;
  },

  render: function(){
    return (<ul>
              {this._createToDoList(this.props.toDoItems)}
            </ul>
            )
  }
});

ReactDOM.render(<MainComponent/>, document.querySelector('#app-container'));
