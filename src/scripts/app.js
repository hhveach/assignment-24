import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';

const MainComponent = React.createClass({

  getInitialState: function(){
    return {  inputValue: '',
              inputItem: []
           }
  },

  _handleChange: function(evt){ this.setState({inputValue: evt.target.value}) },

  _handleSubmit: function(evt){
    if(this.state.inputValue.length === 0){
      alert('Type something to add your item');
      return;
    }
    let newArr = this.state.inputItem.concat(this.state.inputValue);
    this.setState({inputItem: newArr, inputValue: ''})
  },

  remove: function(evt, index){
    let newArr = this.state.inputItem.filter(function(listEl, ind){
      return index !== ind;
    })
    this.setState({inputItem: newArr})
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
        <div className="date-input">
          <input ref="date" className="date" type="date"/>
          <input className="important" type="checkbox"/><span>Critical?</span>
        </div>
        <ListContainer toDoItems={this.state.inputItem} removeItem={this.remove}/>
                        {/* date={this.refs.date.value}/> */}
      </div>
    )
  }
});

const ListContainer = React.createClass({

  _createToDoList: function(arrOfItems, dueDate){
    let comp = this;
    let array = arrOfItems.map(function(listEl, index){
      return (<li className="list-item"><input className="check" type="checkbox"/>{listEl} {dueDate}
              <i onClick={(evt) => comp.props.removeItem(evt, index)} className="fa fa-trash" aria-hidden="true"></i></li>)
    })
    return array;
  },

  render: function(){
    return (<ul>
              {this._createToDoList(this.props.toDoItems, this.props.date)}
            </ul>)
  }
});

ReactDOM.render(<MainComponent/>, document.querySelector('#app-container'));
