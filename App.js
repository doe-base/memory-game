// Game Data  
let gameData = [
    {
        id: 1,
        name: 'Ae',
        src: './images/Ae.png' 
    },
    {
        id: 2,
        name: 'Ai',
        src: './images/Ai.png' 
    },
    {
        id: 3,
        name: 'An',
        src: './images/An.png' 
    },
    {
        id: 4,
        name: 'Id',
        src: './images/Id.png' 
    },
    {
        id: 5,
        name: 'Lr',
        src: './images/Lr.png' 
    },
    {
        id: 6,
        name: 'Pr',
        src: './images/Pr.png' 
    },
    {
        id: 7,
        name: 'Ps',
        src: './images/Ps.png' 
    },
    {
        id: 8,
        name: 'Xd',
        src: './images/Xd.png' 
    },
    {
        id: 9,
        name: 'Ae',
        src: './images/Ae.png' 
    },
    {
        id: 10,
        name: 'Ai',
        src: './images/Ai.png' 
    },
    {
        id: 11,
        name: 'An',
        src: './images/An.png' 
    },
    {
        id: 12,
        name: 'Id',
        src: './images/Id.png' 
    },
    {
        id: 13,
        name: 'Lr',
        src: './images/Lr.png' 
    },
    {
        id: 14,
        name: 'Pr',
        src: './images/Pr.png' 
    },
    {
        id: 15,
        name: 'Ps',
        src: './images/Ps.png' 
    },
    {
        id: 16,
        name: 'Xd',
        src: './images/Xd.png' 
    }
].sort((a, b) => 0.5 - Math.random())
let gameData2 = [

    {
        id: 2,
        name: 'An',
        src: './images/An.png' 
    },
    {
        id: 3,
        name: 'Ps',
        src: './images/Ps.png' 
    },
    {
        id: 4,
        name: 'Xd',
        src: './images/Xd.png' 
    },
    {
        id: 6,
        name: 'An',
        src: './images/An.png' 
    },
    {
        id: 7,
        name: 'Ps',
        src: './images/Ps.png' 
    },
    {
        id: 8,
        name: 'Xd',
        src: './images/Xd.png' 
    }
].sort((a, b) => 0.5 - Math.random())
let gameData3 = [
    {
        id: 1,
        name: 'Ae',
        src: './images/Ae.png' 
    },
    {
        id: 2,
        name: 'Ps',
        src: './images/Ps.png' 
    },
    {
        id: 3,
        name: 'Ae',
        src: './images/Ae.png' 
    },
    {
        id: 4,
        name: 'Ps',
        src: './images/Ps.png' 
    },
].sort((a, b) => 0.5 - Math.random())

const gridContainerEl = document.getElementById('game-grid-container')
const gameInfo = document.getElementById('game-info')
const gameOption = document.getElementById('game-option')
const gameGameEl = document.getElementById('game-game')
const gameEndedEl = document.getElementById('game-ended')
const startBtns = document.querySelectorAll('.btns')

let secondEl = document.getElementById('sec')
let secOptionalEl = document.getElementById('sec-optional')
let minEl = document.getElementById('min')
const timeEl = document.getElementById('time')

const timeTakenEl = document.getElementById('item-taken')
const cardFilpsEl = document.getElementById('card-flips')
const bestTimeEl = document.getElementById('best-time')
const bestFlipEl = document.getElementById('best-flip')
let gameStarted = false
let gameEnded = false
let userChoise = null
let timeStarted = false


window.addEventListener('DOMContentLoaded', ()=>{
    // using local storage here
    localStorage.setItem('best-flip', 0)
    localStorage.setItem('best-time', 0)

startBtns.forEach(btn =>{
    btn.addEventListener('click', (e)=>{
        if(e.target.classList.contains('byfour')){
            userChoise = gameData
            gridContainerEl.classList.remove('bythrees')
            gridContainerEl.classList.add('byfours')
        }else if (e.target.classList.contains('bythree')){
            userChoise = gameData2
            gridContainerEl.classList.remove('byfours')
            gridContainerEl.classList.add('bythrees')
        }else{
            userChoise = gameData3
            gridContainerEl.classList.remove('byfours')
            gridContainerEl.classList.add('bytwos')
        }

        gameStarted = true
        changePage()
        startGame()
    })
})

})




let itemEl;
function startGame(){
    // Dynamiclly reder the photo-card el
    const gameLayOut = userChoise.map((item) => {
    return `
        <div  class="item hide" id="${item.name}" onClick={setCardFlips(event)} lang="${item.id}">
            <img src="${item.src}"  id="${item.id}"/>
        </div>
    `
}).join('')
gridContainerEl.innerHTML = gameLayOut
itemEl = document.querySelectorAll('.item')
itemEl.forEach(item => {
    item.addEventListener('click', (e)=>{
        if(!timeStarted){
            timer()
            timeStarted = true
        }
        openCard(e)
        checker()
        closeCards()
    })
})
}



let numItemsOpen = new Set
let cardFlips = 0
let timeSec = 0
let timeMin = 1
let myInterval;

const setCardFlips = (e) =>{  
    if(numItemsOpen.size < 2){
        itemEl.forEach(item=>{
            !item.classList.contains('active') && item.lang == e.target.lang ? cardFlips++ : null
            document.querySelector(".count").innerHTML = cardFlips
        })
    }
}

const timer = () => {
    
       myInterval = setInterval(()=>{
            timeSec++
            secondEl.innerHTML = timeSec

            if(timeSec >= 10){
                secOptionalEl.innerHTML = ''
            }else{
                secOptionalEl.innerHTML = '0'
            }
            if(timeSec >= 59){
                minEl.innerHTML = timeMin++
                timeSec = 0
            }
        },1000)

}

const calcultateScore = () =>{
    timeTakenEl.innerHTML = timeEl.innerHTML
    cardFilpsEl.innerHTML = cardFlips

    let bestFlip = localStorage.getItem('best-flip')

    if(bestFlip < cardFlips){
        localStorage.setItem('best-flip', cardFlips)
    }

    bestFlipEl.textContent = localStorage.getItem('best-flip')
}



const openCard = (e) =>{
    if(numItemsOpen.size < 2){
        e.target.classList.remove('hide')

        itemEl.forEach(item => {
            !item.classList.contains('hide') && !item.classList.contains('active') ?  numItemsOpen.add(item) : null
        })
    }
}


const checker = () =>{
    let openedCardsArr = []
    let activeCard = new Set
    itemEl.forEach(item => !item.classList.contains('hide') && !item.classList.contains('active') ? openedCardsArr.push(item) : null)

    if(openedCardsArr.length >= 2){
        if(openedCardsArr[0].id === openedCardsArr[1].id){
            openedCardsArr.map(item => item.classList.add('active'))
            itemEl.forEach(item => item.classList.contains('active')  ? activeCard.add(item) : null)
            activeCard.size === userChoise.length && endGame()
            openedCardsArr.length = 0
        }else{
            openedCardsArr.length = 0
        }
    }
}


const closeCards = () =>{
        if(numItemsOpen.size > 1){
                    setTimeout(function(){
                        itemEl.forEach(item =>{
                            if(!item.classList.contains('active')){
                                item.classList.add('hide')
                                numItemsOpen.clear()
                            }
                        })
                    },600)
                    
            }
}


function changePage(){
    if(gameStarted){
        gameOption.classList.add('display-none')
        gameGameEl.classList.remove('display-none')
    }
}
function endGame(){
    gameStarted = false
    gameEnded = true
    timeStarted = false
    numItemsOpen.clear()

    gameGameEl.classList.add('display-none')
    gameEndedEl.classList.remove('display-none')
    gameInfo.classList.add('display-none')

    calcultateScore()
    clearInterval(myInterval)
    cardFlips = 0
    timeSec = 0
    timeMin = 1

}

const playAgainBtn = document.getElementById('play-again-btn')
const playAgain = () =>{
    gameEndedEl.classList.add('display-none')
    gameInfo.classList.remove('display-none')
    gameOption.classList.remove('display-none')
    
    document.querySelector('.count').innerHTML = 0
    secOptionalEl.innerHTML = 0
    secondEl.innerHTML = 0
    minEl = 0
    
}
playAgainBtn.addEventListener('click', ()=>{
    playAgain()
})