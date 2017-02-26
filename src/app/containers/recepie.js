/* eslint linebreak-style: ["error", "windows"] */

import React, {Component} from 'react';

import {Modal, Button, FormControl, ControlLabel} from 'react-bootstrap';

const styles = {
  editNameStyle: {
    color: "#AEA9B6"
  }
};

export class Recepie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
    this.handleRemoveRecepie = this.handleRemoveRecepie.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit() {
    this.setState({editMode: true}, () => {
    });
  }

  handleChangeName(e) {
    this.props.changeName(e.target.value, this.props.index);
  }

  handleChangeIngredients(e) {
    this.props.changeIngredients(e.target.value, this.props.index);
  }

  handleRemoveRecepie() {
    this.setState({editMode: false});
    this.props.removeRecepie(this.props.index);
  }

  render() {
    const close = () => this.setState({editMode: false});
    const editNameGray = this.props.name === "Edit name";
    console.log(editNameGray);
    return (
      <div className="Recepie">
        <li className="list-group-item list-group-item-action">
          <div className="recepieTitle" style={editNameGray ? styles.editNameStyle : {}}>{this.props.name}</div>
          <button className="editButton btn btn-outline-primary" onClick={this.handleEdit}><string className="editIcon" name="vertical_ellipsis">&#8942;</string></button>
        </li>
        <Modal
          show={this.state.editMode}
          onHide={close}
          container={this}
          aria-labelledby="contained-modal-title"
          >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              <ControlLabel className="modalTitle">Recepie name:</ControlLabel>
              <FormControl
                type="text"
                value={this.props.name}
                onChange={this.handleChangeName}
                />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ControlLabel>Ingredients:</ControlLabel>
            <FormControl
              type="textarea"
              value={this.props.ingredients}
              onChange={this.handleChangeIngredients}
              />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="removeButton btn btn-outline-danger"
              onClick={this.handleRemoveRecepie}
              >Delete
            </button>
            <Button className="closeButton" bsStyle="primary" onClick={close}>Save & Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Recepie.propTypes = {
  index: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  ingredients: React.PropTypes.string.isRequired,
  changeName: React.PropTypes.func.isRequired,
  changeIngredients: React.PropTypes.func.isRequired,
  removeRecepie: React.PropTypes.func.isRequired
};
