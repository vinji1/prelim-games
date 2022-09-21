import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({games, deleteGame}) => {
    return games.map(game=>(
        <tr key={game.game_name}>
            <td>{game.game_name}</td>
            <td>{game.type}</td>
            <td>{game.size}</td>
            <td>{game.price}</td>
            <td className='delete-btn' onClick={()=>deleteGame(game.game_name )}>
                <Icon icon={trash}/>
            </td>
        </tr>
    ))
}