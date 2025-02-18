const wrongSound = new Audio('wrong-effect.mp3');
// const btnSound = new Audio('button-effect.mp3');
const btnSound2 = new Audio('button-user.mp3');

// function for sound effects
function playsound(){
    wrongSound.play();
}
function playsound3(){
    btnSound2.play();
}

userSeq=[]
gameSeq=[]
let started=false
let h3=document.querySelector('h3')
let body=document.querySelector('body')
let colors=['red','yellow','green','blue']
let level=0
let highestScore=0
let h2=document.querySelector('h2')

// function to start the game
function start(){
    if(started==false){
        started=true
        levelUp()
    }
}
body.addEventListener('keypress', start)

// function to levelup
function levelUp(){
    userSeq=[]
    level++
    h3.innerText=`Level - ${level}`
    randomColor()
}

// function to select random color
function randomColor(){
    idx=Math.floor(Math.random()*4)
    color=colors[idx]
    gameSeq.push(color)
    // console.log('game: ', gameSeq)
    // above statement is to crack the game.
    flash(color)
}

// function to flash the color
function flash(color){
    currentDiv=document.querySelector(`.${color}`)
    let originalColor=currentDiv.style.backgroundColor
    currentDiv.style.backgroundColor='grey'
    setTimeout(function(){
        currentDiv.style.backgroundColor=originalColor
    }, 250)
    // playsound2()
}

// function to take response from user
let boxs=document.querySelectorAll('.box')
for(box of boxs){
    box.addEventListener('click', userBtn)
}
function userBtn(event){
    pushedBtn=event.target
    let userColor=`${event.target.id}`
    userSeq.push(userColor)
    checkAns(userSeq.length-1)
    userFlash(userColor)
}

function userFlash(userColor){
    originalColor=pushedBtn.style.backgroundColor
    pushedBtn.style.backgroundColor='black'
    setTimeout(function(){
        pushedBtn.style.backgroundColor=originalColor
    }, 100)
    playsound3()
}

// to check if user input is correct or not
function checkAns(idx){

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        playsound()
        h3.innerHTML=`Game Over!<br>Your score is ${level}<br> Press any key to start again`
        topScore()
        restart()
    }
}

// function to restart the game
function restart(){
    level=0
    started=false
    gameSeq=[]
    userSeq=[]
}

// function to store highest score in the memory of tab
function topScore(){
    if(level>=highestScore){
        highestScore=level
        h2.innerText=`Highest Score: ${highestScore}`
    }
}