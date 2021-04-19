const button1 = document.querySelector('#button1') 
let button1Pressed = 0
const button2 = document.querySelector('#button2')
let button2Pressed = 0
const button3 = document.querySelector('#button3')
let button3Pressed = 0
const button4 = document.querySelector('#button4')
let button4Pressed = 0
const button5 = document.querySelector('#button5')
let button5Pressed = 0
const button6 = document.querySelector('#button6')
let button6Pressed = 0

const landingPage = document.querySelector('#landingPage')
const instructions = document.querySelector('#instructions')
const playZone = document.querySelector('#playZone')
const endPage = document.querySelector('#endPage')

let playing = false
let unlimited = false

let gameHP, gameScore, difficulty 
let playsNotes1, playsNotes2, playsNotes3, playsNotes4, playsNotes5, playsNotes6
let replay

const gameEnd = function(win) {
  playing = false
  unlimited = false
  playZone.style.display = 'none'
  endPage.style.display = 'flex'
  if (win) {
    document.querySelector('#loseText').style.display = 'none'
    document.querySelector('#winText').style.display = 'block'
    document.querySelector('#endHP').style.display = 'block'
    
  } else {
    document.querySelector('#loseText').style.display = 'block'
    document.querySelector('#winText').style.display = 'none'
    document.querySelector('#endHP').style.display = 'none'
  }
  switch (difficulty) {
    case 'easy':
      document.querySelector('#difficulty').innerHTML = 'Difficulty: <span style="color:green">Easy</span>'
      break
    case 'medium':
      document.querySelector('#difficulty').innerHTML = 'Difficulty: <span style="color:yellow">Medium</span>'
      break
    case 'hard':
      document.querySelector('#difficulty').innerHTML = 'Difficulty: <span style="color:orange">Hard</span>'
      break
    case 'expert':
      document.querySelector('#difficulty').innerHTML = 'Difficulty: <span style="color:red">Expert</span>'
      break
  }
  document.querySelector('#endScore').innerText = 'Your score: ' + gameScore
  document.querySelector('#endHP').innerText = 'Your HP: ' + gameHP
  if (gameHP === 10) {
    document.querySelector('#flawless').style.display = 'block'
  }
  let notes = document.querySelectorAll('.note')
  notes.forEach( note => {note.remove()})
  replay = setTimeout(() => {endPage.addEventListener('click', showInstructions)},1500)
  document.querySelector('#ez').removeEventListener('click', easyGame)
  document.querySelector('#med').removeEventListener('click', medGame)
  document.querySelector('#hard').removeEventListener('click', hardGame)
  document.querySelector('#exp').removeEventListener('click', expGame)
}

const updateHP = function() {
  gameHP--
  document.querySelector('#hp').innerText = `HP: ${gameHP}`
  if (gameHP === 0) {gameEnd()}
}

const updateScore = function() {
  gameScore++
  document.querySelector('#score').innerText = `Score: ${gameScore}`
  if (gameScore === 20 && difficulty === 'easy' && !unlimited || 
      gameScore === 35 && difficulty === 'medium' && !unlimited ||
      gameScore === 70 && difficulty === 'hard' && !unlimited ||
      gameScore === 100 && difficulty === 'expert' && !unlimited ) {gameEnd('win')}
}

const addNote = function(noteNum) {
  newNote = document.createElement('div')
  newNote.classList.add('note')
  switch (noteNum) {
    case 1:
      newNote.style.backgroundColor = 'rgba(0,255,0,0.5)'
      newNote.classList.add('note1')
      break
    case 2:
      newNote.style.backgroundColor = 'rgba(255,0,0,0.5)'
      newNote.classList.add('note2')
      break
    case 3:
      newNote.style.backgroundColor = 'rgba(255,255,0,0.5)'
      newNote.classList.add('note3')
      break
    case 4:
      newNote.style.backgroundColor = 'rgba(0,0,255,0.5)'
      newNote.classList.add('note4')
      break
    case 5:
      newNote.style.backgroundColor = 'rgba(255,187,0,0.5)'
      newNote.classList.add('note5')
      break
    case 6:
      newNote.style.backgroundColor = 'rgb(145, 26, 192)'
      newNote.classList.add('note6')
      break
  }
  newNote.addEventListener('animationend', e => {
    e.target.remove()
    updateHP()
  })
  document.querySelector('#fret' + noteNum).appendChild(newNote)
}

const noteRandomizer = function(diff) {
  if (playing) {
    const randNum = () => {return Math.floor(Math.random() * diff) * 1000}
    const randNum1 = randNum(), randNum2 = randNum(), randNum3 = randNum(), randNum4 = randNum(), randNum5 = randNum(), randNum6 = randNum()
    setTimeout( () => {addNote(1)}, randNum1)
    setTimeout( () => {addNote(2)}, randNum2)
    setTimeout( () => {addNote(3)}, randNum3)
    setTimeout( () => {addNote(4)}, randNum4)
    setTimeout( () => {addNote(5)}, randNum5)
    setTimeout( () => {addNote(6)}, randNum6)
    setTimeout( () => {noteRandomizer(diff)}, 1000 * diff)
  }
}

let buttonPos, buttonUpperY, buttonLowerY

const playGame = function(diff) {
  let notes = document.querySelectorAll('.note')
  notes.forEach( note => {note.remove()})
  gameHP = 11
  gameScore = -1
  playing = true
  updateHP()
  updateScore()
  instructions.style.display = 'none'
  playZone.style.display = 'flex'
  endPage.style.display = 'none'
  document.querySelector('#endHP').style.display = 'block'
  document.querySelector('#flawless').style.display = 'none'
  buttonPos = button1.getBoundingClientRect()
  buttonUpperY = buttonPos.y - (buttonPos.height / 2)
  buttonLowerY = buttonPos.y + (buttonPos.height / 2)
  noteRandomizer(diff)
}

const easyGame = function() {
  difficulty = 'easy'
  playGame(12)
}

const medGame = function() {
  difficulty = 'medium'
  playGame(8)
}

const hardGame = function() {
  difficulty = 'hard'
  playGame(3)
}

const expGame = function() {
  difficulty = 'expert'
  playGame(2)
}

const showInstructions = function() {
  // document.querySelector('#logo').style.display = 'inline'
  landingPage.style.display = 'none'
  instructions.style.display = 'flex'
  endPage.style.display = 'none'
  document.querySelector('#ez').addEventListener('click', easyGame)
  document.querySelector('#med').addEventListener('click', medGame)
  document.querySelector('#hard').addEventListener('click', hardGame)
  document.querySelector('#exp').addEventListener('click', expGame)
}

const checkNotePos = function(note) {
  let noteY = note.getBoundingClientRect().y
  return noteY > buttonUpperY && noteY < buttonLowerY
}

const checkStrum = function() {
  const buttonCode = button1Pressed.toString() + button2Pressed + button3Pressed + button4Pressed + button5Pressed + button6Pressed
  const buggedNoteCodes = ['10011','01011','00111','11011','10111','01111','11111']
  let noteCode = ''
  const notesPlaying = []
  const notes1 = document.querySelectorAll('.note1')
  const notes2 = document.querySelectorAll('.note2')
  const notes3 = document.querySelectorAll('.note3')
  const notes4 = document.querySelectorAll('.note4')
  const notes5 = document.querySelectorAll('.note5')
  const notes6 = document.querySelectorAll('.note6')
  for (i = 1; i < 7; i++) {
    const notesArray = Array.from(eval(`notes${i}`))
    const noteIndex = notesArray.findIndex(checkNotePos)
    if (noteIndex > -1) {
      noteCode += '1'
      notesPlaying.push(noteIndex)
    } else {
      noteCode += '0'
      notesPlaying.push(undefined)
    }
    if (i === 6) {
      if (buttonCode === noteCode && noteCode !== '00000' || buggedNoteCodes.includes(noteCode)) {
        for (j = 0; j < noteCode.length; j++) {
          if (notesPlaying[j] !== undefined) {
            updateScore()
            eval(`notes${j+1}[notesPlaying[j]]`).remove()
          }
        }
      } else {
        updateHP()
      }
    }
  }
}

landingPage.addEventListener('click', showInstructions)

document.querySelector('#strum').addEventListener('click', checkStrum)

document.body.addEventListener('keydown', e => {
  if (e.key == 1) {
    button1Pressed = 1
    button1.innerHTML = 'PRESSED'
    button1.style.boxShadow = '-2px -2px gray'
    button1.style.backgroundColor = '#00BB00'
  }
})
document.body.addEventListener('keyup', e => {
  if (e.key == 1) {
    button1Pressed = 0
    button1.innerHTML = '1'
    button1.style.boxShadow = '0px 0px'
    button1.style.backgroundColor = '#00FF00'
  }
})

document.body.addEventListener('keydown', e => {
  if (e.key == 2) {
    button2Pressed = 1
    button2.innerHTML = 'PRESSED'
    button2.style.boxShadow = '-2px -2px gray'
    button2.style.backgroundColor = '#BB0000'
  }
})
document.body.addEventListener('keyup', e => {
  if (e.key == 2) {
    button2Pressed = 0
    button2.innerHTML = '2'
    button2.style.boxShadow = '0px 0px'
    button2.style.backgroundColor = '#FF0000'
  }
})

document.body.addEventListener('keydown', e => {
  if (e.key == 3) {
    button3Pressed = 1
    button3.innerHTML = 'PRESSED'
    button3.style.boxShadow = '-2px -2px gray'
    button3.style.backgroundColor = '#BBBB00'
  }
})
document.body.addEventListener('keyup', e => {
  if (e.key == 3) {
    button3Pressed = 0
    button3.innerHTML = '3'
    button3.style.boxShadow = '0px 0px'
    button3.style.backgroundColor = '#FFFF00'
  }
})

document.body.addEventListener('keydown', e => {
  if (e.key == 4) {
    button4Pressed = 1
    button4.innerHTML = 'PRESSED'
    button4.style.boxShadow = '-2px -2px gray'
    button4.style.backgroundColor = '#0000BB'
  }
})
document.body.addEventListener('keyup', e => {
  if (e.key == 4) {
    button4Pressed = 0
    button4.innerHTML = '4'
    button4.style.boxShadow = '0px 0px'
    button4.style.backgroundColor = '#0000FF'
  }
})

document.body.addEventListener('keydown', e => {
  if (e.key == 5) {
    button5Pressed = 1
    button5.innerHTML = 'PRESSED'
    button5.style.boxShadow = '-2px -2px gray'
    button5.style.backgroundColor = '#BB9900'
  }
})
document.body.addEventListener('keyup', e => {
  if (e.key == 5) {
    button5Pressed = 0
    button5.innerHTML = '5'
    button5.style.boxShadow = '0px 0px'
    button5.style.backgroundColor = '#FFBB00'
  }
})

document.body.addEventListener('keydown', e => {
  if (e.key == 6) {
    button6Pressed = 1
    button6.innerHTML = 'PRESSED'
    button6.style.boxShadow = '-2px -2px gray'
    button6.style.backgroundColor = '#BB9900'
  }
})

document.body.addEventListener('keyup', e => {
  if (e.key == 6) {
    button5Pressed = 0
    button6.innerHTML = '6'
    button6.style.boxShadow = '0px 0px'
    button6.style.backgroundColor = '#FFBB00'
  }
})


