/* eslint-disable */

import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import {Recepie} from './recepie';

export class RecepieList extends Component {
  constructor() {
    super();

    let recepiesInLocalStorageStart = localStorage.recepiesInLocalStorageKey;
    if (recepiesInLocalStorageStart) {
      recepiesInLocalStorageStart = JSON.parse(recepiesInLocalStorageStart);
      this.state = {
        recepieList: recepiesInLocalStorageStart
      };
      localStorage.recepiesInLocalStorageKey = JSON.stringify(this.state.recepieList);
    } else {
      this.state = {
        recepieList: [
          {name: 'Pizza', ingredients: 'chesse, ham, tomato'},
          {name: 'Eggs', ingredients: 'eggs, olive, oil'},
          {name: 'Sandwich', ingredients: 'toast, chesse, mayo, pickles'},
          {name: 'Hot Dog', ingredients: 'bun, sausage'},
          {name: 'Cake', ingredients: 'sugar, flower, butter'}
        ]
      };
    }
    this.changeNameCallBack = this.changeNameCallBack.bind(this);
    this.changeIngredientsCallBack = this.changeIngredientsCallBack.bind(this);
    this.removeRecepieCallBack = this.removeRecepieCallBack.bind(this);
    this.handleAddRecepie = this.handleAddRecepie.bind(this);
  }

  componentDidUpdate() {
    localStorage.recepiesInLocalStorageKey = JSON.stringify(this.state.recepieList);
  }

  changeNameCallBack(newName, i) {
    const arr = this.state.recepieList;
    arr[i].name = newName;
    this.setState({recepieList: arr});
  }

  changeIngredientsCallBack(newIngredients, i) {
    const arr = this.state.recepieList;
    arr[i].ingredients = newIngredients;
    this.setState({recepieList: arr});
  }

  removeRecepieCallBack(i) {
    const arr = this.state.recepieList;
    arr.splice(i, 1);
    this.setState({recepieList: arr});
  }

  handleAddRecepie() {
    const arr = this.state.recepieList;
    arr.push({name: 'Edit name', ingredients: ''});
    console.log('arr: ', arr);
    this.setState({recepieList: arr});
  }

  render() {
    return (
      <div className="RecepieList">
        <div className="container">
          <h1 className="appTitle">Recepie Box</h1>
          <ul className="list-group">
            {this.state.recepieList.map((recepie, i) => {
              return (
                <Recepie
                  name={recepie.name}
                  ingredients={recepie.ingredients}
                  key={i}
                  index={i}
                  changeName={this.changeNameCallBack}
                  changeIngredients={this.changeIngredientsCallBack}
                  removeRecepie={this.removeRecepieCallBack}
                  />
              );
            })}
          </ul>
          <div className="addRecepieButtonWrapper">
            <Button onClick={this.handleAddRecepie} bsStyle="primary" bsSize="large">Add recepie</Button>
          </div>
        </div>
      </div>
    );
  }
}

