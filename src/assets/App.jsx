import Die from'./Die.jsx'
import { useState } from 'react'
import { nanoid } from 'nanoid'


export default function App(){
  const [dice, setDice] = useState(generateAllNewDice())


  const gameWon = dice.every(die=>die.isHeld) &&
  dice.every(die=>die.value===dice[0].value)
 
  function generateAllNewDice(){
    const newDice =[]
    for (let i=0; i<10; i++){
      const rand= {value : Math.floor(Math.random() * 6) + 1, 
        isHeld : false,
        id: Math.floor(Math.random() * 100) + 6
      }
      newDice.push(rand)
    }
    return newDice
  }

  function hold(id){
   setDice(oldDice => oldDice.map(die=> die.id===id ? 
   {...die, isHeld : !die.isHeld} : 
   die))
  }

  function rollDice(){
    
      if (!gameWon){
        setDice(oldDice => oldDice.map(die => 
          die.isHeld ?    
          die :             //if the isHeld is true it will return those element
          {...die, value : Math.floor(Math.random() * 6) + 1}    //by using {...die, value : number} it will return the same array of 
          ))                                                    // objects which include id but will change the value number to new number
    
      } else{
        setDice(generateAllNewDice())
      }

  }
  
  const diceElements = dice.map(dieObject=>
     <Die 
        key={dieObject.id}
        value={dieObject.value} 
        isHeld={dieObject.isHeld} 
        hold={hold} 
        id={dieObject.id} 
      />)

  return(
    <main>
      <div className='dice-container'>
        {diceElements}
      </div>

    <button className='dice-roll' onClick={rollDice} >
      {gameWon ? "New game" : "Roll"}
    </button>
    </main>
  )
}