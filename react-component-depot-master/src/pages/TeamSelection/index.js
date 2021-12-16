import React, { useState } from "react";
import Header from "components/Header";
import playersJSON from "resources/data/players.json";
import { useDrag, useDrop } from "react-dnd";
import ExternalInfo from "components/ExternalInfo";
import { useEffect } from "react";

const TeamSelection = () => {
  const [players, setPlayers] = useState(() => playersJSON);
  const [team, setTeam] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "player",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "team",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  console.log("tajjdf dfidfd")
  const movePlayer = (item) => {
    console.log(item);
    if (item && item.type === "player") {
      //Accepting player into the team
      console.log('ddddddddddddddddddddddddddddddddddddddddd')
      setPlayers((_players) => _players.filter((_, idx) => idx !== item.index),);
      setTeam((_team) => [..._team, players[item.index]]);
      console.log(players[item.index])

    } else {
      //Removing a player from team
      setPlayers((_players) => [..._players, team[item.index]]);
      setTeam((_team) => _team.filter((_, idx) => idx !== item.index));

    }
  };

  const dragHoverTeamBG = isOver ? "bg-warning" : "bg-light";
  const dragHoverPlayerBG = isPlayerOver ? "bg-warning" : "bg-light";

  const fetchData = async() => {
    return await fetch("https://localhost:5000/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <>
      <Header title="Team Selection (Drag And Drop)" />

      <ExternalInfo page="dnd" />

      <div className="row">
        <div className="col text-center">
          <h2>Team Selection Component</h2>
          <p>Demonstrating react-dnd by implementing team selection UI</p>
          <div className="row justify-content-md-center">
            <div className={`col-5 border m-2 ${dragHoverPlayerBG}`}>
              <div className="bg-info row text-white">
                <div className="col font-weight-bold">Available Players</div>
              </div>
              <div className="list-group py-2 h-100" ref={removeFromTeamRef}>

                <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>name</th>
                      <th>age</th>
                    </tr>

                  </thead>
                  <tbody>
                    <tr >
                      {players.map((player, idx) => (

                        <Player
                          {...player}
                          key={player.id}
                          index={idx}
                          playerType="player"
                          onDropPlayer={movePlayer}
                        />
                      ))}

                    </tr>

                  </tbody>
                </table>



              </div>
            </div>
            <div className={`col-5 border m-2 ${dragHoverTeamBG}`}>
              <div className="bg-success row text-white">
                <div className="col font-weight-bold">THE A-TEAM</div>
              </div>
              <div className="list-group py-2 h-100" ref={addToTeamRef}>

                {team.map((player, idx) => (
                  <Player
                    {...player}
                    key={player.id}
                    index={idx}
                    playerType="team"
                    onDropPlayer={movePlayer}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Player = ({
  name,
  age,
  nationality,
  photo,
  index,
  playerType,
  onDropPlayer,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: playerType,
      index,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li className="list-group-item my-1 p-2" ref={dragRef}>
      <div className="card border-0">
        <div className="row no-gutters">

          <div className="col-md-9">
            <div className="">

              <td>{index}</td>
              <td>{name}</td>
              <td>{age}</td>



            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default TeamSelection;
