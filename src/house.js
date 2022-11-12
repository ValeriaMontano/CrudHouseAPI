import React from "react";
import NewRoomForm from "./new-room-form";

export default class House extends React.Component {
  render() {
    const rooms = this.props.data.rooms
      ? this.props.data.rooms.map(
          (
            room,
            index //iterateover the rooms, create li out of them
          ) => (
            <li key={index}>
              {room.name} Area:{room.area}
              <button
                onClick={(e) => this.props.deleteRoom(e, this.props.data, room)}
              >
                Delete
              </button>
            </li>
          )
        )
      : null;
    //addthem to the ul line 21 and add the name 20 and add the new room form to it
    return (
      <div>
        <h1>{this.props.data.name}</h1>
        <ul>{rooms}</ul>
        <NewRoomForm
          addNewRoom={this.props.addNewRoom}
          data={this.props.data}
        />
      </div>
    );
  }
}
