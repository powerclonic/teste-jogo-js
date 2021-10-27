const playerModel = document.querySelector(".playerModel")
const enemyBody = document.querySelector(".enemyBody")
const body = document.querySelector(".bodyBlock")

const enemyLifeBar = document.querySelector("#enemyLifeBar")
const playerLifeBar = document.querySelector("#playerLifeBar")

const winScreen = document.querySelector(".winScreen")
const loseScreen = document.querySelector(".loseScreen")

const sizeX = Math.floor(body.clientWidth / 50) * 50
const sizeY = Math.floor(body.clientHeight / 50) * 50

const maxY = sizeY - 50
const maxX = sizeX - 50
const maxXY = 0

let deb = true

const moveVal = 50

log(`X = ${sizeX}`)
log(`Y = ${sizeY}`)

log(`maxX = ${maxX}`)
log(`maxY = ${maxY}`)

let leftPos = Number(playerModel.style.left)
let topPos = Number(playerModel.style.top)

let enmLeftPos = Math.floor(sizeX / 2)
let enmTopPos = Math.floor(sizeY / 2)

const centralizeEnemy = () => { enemyBody.style.left = `${enmLeftPos}px`; enemyBody.style.top = `${enmTopPos}px` }
centralizeEnemy()

let plrLife = 10
let enmLife = 10

document.addEventListener("keypress", function (e) {
    const key = e.key

    if (key === 'a') {
        if (leftPos - moveVal >= maxXY) {
            leftPos -= moveVal
            playerModel.style.left = `${leftPos}px`
        }
        return
    }

    if (key === 'd') {
        if (leftPos + moveVal < maxX) {
            leftPos += moveVal
            playerModel.style.left = `${leftPos}px`
        }
        return
    }

    if (key === 'w') {
        if (topPos - moveVal >= maxXY) {
            topPos -= moveVal
            playerModel.style.top = `${topPos}px`
        }
        return
    }

    if (key === 's') {
        if (topPos + moveVal < maxY) {
            topPos += moveVal
            playerModel.style.top = `${topPos}px`
        }
        return
    }
})

document.addEventListener('click', function (e) {
    const el = e.target

    if (el != enemyBody) {
        plrLife -= 1
        playerLifeBar.value = plrLife

        if (plrLife === 0) {
            caseDie(enmLife)
        }

    } else {
        if (deb) {
            enmLife -= 1
            enemyLifeBar.value = enmLife
            deb = false
            if (enmLife === 0) {
                caseWin()
            }
            setTimeout(function () {
                deb = true
            }, 1)
        }
    }
})

setInterval(function (max = 150, min = 25) {
    const moveValue = Math.floor(Math.random() * (max - min)) + min
    const moveDir = Math.floor(Math.random() * (10 - 6)) + 6

    if (moveDir === 6) {
        if (enmLeftPos + moveValue < maxX) {
            enmLeftPos += moveValue
            enemyBody.style.left = `${enmLeftPos}px`
            // log(`x+ = ${enmLeftPos}`)
        }
        return
    }
    if (moveDir === 7) {
        if (enmLeftPos - moveValue >= maxXY) {
            enmLeftPos -= moveValue
            enemyBody.style.left = `${enmLeftPos}px`
            // log(`x- = ${enmLeftPos}`)
        }
        return
    }
    if (moveDir === 8) {
        if (enmTopPos + moveValue < maxY) {
            enmTopPos += moveValue
            enemyBody.style.top = `${enmTopPos}px`
            // log(`y+ = ${enmTopPos}`)
        }
        return
    }
    if (moveDir === 9) {
        if (enmTopPos - moveValue >= maxXY) {
            enmTopPos -= moveValue
            enemyBody.style.top = `${enmTopPos}px`
            // log(`y- = ${enmTopPos}`)
        }
        return
    }
    // log(moveDir)
}, 1500)

function log(text) {
    console.log(text)
}

function caseWin() {
    winScreen.style.display = 'flex'
    enemyBody.remove()
    setTimeout(() => window.location.reload(), 2500)
}

function caseDie(hp) {
    loseScreen.style.display = 'flex'
    playerModel.remove()
    document.querySelector(".remBossLife").textContent = `${hp}`
    setTimeout(() => window.location.reload(), 2500)
}