import React, {useState, useEffect} from "react"
import { View } from "./components/View";

//getting values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('games');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  const [games, setGames]= useState([getDatafromLS()]);

  //input field states
  const [game_name, setGameName]= useState('');
  const [type, setType]= useState('');
  const [size, setSize]= useState('');
  const [price, setPrice]= useState('');

  //form submit event
  const handleAddGameSubmit=(e)=>{
    e.preventDefault();

    //creating an object
    let game={
      game_name,
      type,
      size,
      price
    }
    setGames([...games, game]);
    setGameName('');
    setType('');
    setSize('');
    setPrice('');
  }

  //delete from LS
  const deleteGame=(game_name)=>{
    const filteredGames=games.filter((element,index)=>{
      return element.game_name !== game_name
    })
    setGames(filteredGames);
  }

  //saving data to local storage
  useEffect(()=>{
    localStorage.setItem('games', JSON.stringify(games));
  },[games])

  return(
    <div className="wrapper">
      <div className="main">
        <div className="form-container">
          <form autoComplete="off" className="form-group"
          onSubmit={handleAddGameSubmit}>
            <label>Game Name</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setGameName(e.target.value)} value={game_name}></input>
            <label>Type</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setType(e.target.value)} value={type}></input>
            <label>Size</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setSize(e.target.value)} value={size}></input>
            <label>Price</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setPrice(e.target.value)} value={price}></input>
            <br></br>
            <button type="submit" className="btn btn-secondary btn-md">
              Add Game
            </button>
          </form>
        </div>

        <div className="view-container">
          {games.length>0&&<>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Game Name</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
              
                <View games={games} deleteGame={deleteGame}/>
              </tbody>
            </table>
          </div>
          <button className="btn btn-danger btn-md" 
          onClick={()=>setGames([])}>Remove All</button>
          </>}
          {games.length <1 && <div>No games added.</div>}
        </div>
      </div>
    </div>
  )
}

export default App;