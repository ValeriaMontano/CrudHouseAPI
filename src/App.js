import React from "react";
import "./App.css";
import House from "./house";

const HOUSES_ENDPOINT = "https://ancient-taiga-31359.herokuapp.com/api/houses";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNewRoom = this.addNewRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }
  // NOTE :if the state is not null we iterate through all the houses in the state and create a house elem out of them
  //line15-22
  render() {
    const houses = this.state //create a variable, if the state exists see line below//keepthe index for each elem in our list that wecreate
      ? this.state.houses.map((house, index) => (
          <House
            key={index} //index, unique identifier for elem, so the virtual DOM can better indentify each elem in our list
            data={house}
            addNewRoom={this.addNewRoom}
            deleteRoom={this.deleteRoom}
          />
        ))
      : //continue ,if it's not we are going to make it null and not render anything, if it's not null we render all the houses
        null;
    //and return all the houses we created on line 9 and 10
    return <div>{houses}</div>;
  }
  //we make our http requests or asyn calls
  //use fetch and then we change it to json so we canuse it 37
  //then handle the promise this give us :what data comeback weare going to call setstate:
  //the houses property is going to be out data

  componentDidMount() {
    fetch(HOUSES_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          houses: data,
        });
      });
  }
  //add the functionality for the deleteRoom functions
  //e is always the default action that comesback when a button is click e or when the browser fires off an event

  deleteRoom(e, house, room) {
    const index = house.rooms.indexOf(room); //now weare able to have an index and uniq identify which room we are going to delete
    //we are removing/splicing out of the rooms array
    //the elem at position index,we are splicing out only one of them
    house.rooms.splice(index, 1);
    //make the update permanent in the data base that our api is wrapping around
    updateHouse(house).then(() => {
      //takethe previous state and interate through each of the houses in the previous state
      // and when we find the house id that = the house with the id we actually are updating we set h to it
      //and that is going to be the new state object and return the state on line 65
      this.setState((state) => {
        for (let h of state.houses) {
          if (h._id === house._id) {
            let h = house;
            break;
          }
        }
        return state;
      });
    });
    e.preventDefault();
  }
  addNewRoom(e, house, room) {
    house.rooms.push(room);
    updateHouse(house).then(() => {
      this.setState((state) => {
        for (let h of state.houses) {
          if (h._id === house._id) {
            let h = house;
            break;
          }
        }
        return state;
      });
    });
    e.preventDefault();
  }
}
//whatever house was passed intothis method we send a put request with it line 57
//we basically send the house back to the server to be updated in the database
function updateHouse(house) {
  return fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(house),
  });
}
