import { useState, useEffect } from 'react'
import { Header } from './components/header'
import './App.css'
import roulette from '../roulette.png'

function App() {
    const numbers = [22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32, 0, 26, 3, 35, 12, 28, 7, 29, 18]
    const black = [22, 31, 20, 33, 24, 10, 8, 11, 13, 6, 17, 2, 4, 15, 26, 35, 28, 29]
    const red = [9, 14, 1, 16, 5, 23, 30, 36, 27, 34, 25, 21, 19, 32, 3, 12, 7, 18]
    const [money, setMoney] = useState(15)
    const [b, setB] = useState(5)
    const [rotation, setRotation] = useState(0) // État pour l'angle de rotation

    const wheelStyle = {
        backgroundImage: `url(${roulette})`,
        backgroundSize: 'cover',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)',
        margin: '10px',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        content: '""'
    };

    function bet(x) {
        if (money < b) {
            alert('Vous n\'avez pas assez d\'argent')
        } else {
            let m = money-b
            setMoney(money - b)
            let choice = Math.floor(Math.random() * numbers.length)
            let r = rotation - (rotation % 360)
            setRotation(3 * 360 + (r + choice * (360 / numbers.length))) // Augmente l'angle de rotation de 360 degrés

            // Attendre la fin de la transition
            const wheelElement = document.querySelector('.wheel');
            wheelElement.addEventListener('transitionend', () => {
                if (black.includes(numbers[choice]) && x === "black") {
                    setMoney(m + b * 2)
                } else if (red.includes(numbers[choice]) && x === "red") {
                    setMoney(m + b * 2)
                } else if (numbers[choice] === 0 && x === "zero") {
                    setMoney(m + b * 72)
                }
            }, { once: true });
        }
    }

    return (
        <>
            <Header money={money}></Header>

            <div className="result">
                <div className="arrow">
                    ==>
                </div>
                <div className="wheel" style={ wheelStyle}>
                </div>
            </div>

            <div className="card">
                <input type="number" onInput={(e)=>setB(e.target.value)} defaultValue={5}/>
                <button onClick={() => bet("red")}>
                    Rouge
                </button>
                <button onClick={() => bet("black")}>
                    Noir
                </button>
                <button onClick={() => bet("zero")}>
                    Zéro
                </button>
            </div>
        </>
    )
}

export default App