import { writable } from "svelte/store"
import words4 from "../words/words4"
import words5 from "../words/words5"
import words6 from "../words/words6"
import words7 from "../words/words7"

function random(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive  
}

function randomList() {
    switch (random(4, 7)) {
        case 4:
            return words4
        case 5:
            return words5
        case 6:
            return words6
        case 7:
            return words7
    }
}

function randomFromArray(array: any[]) {
    return array[random(0, array.length - 1)]
}

function verticalOffOfHorizontalWord(board: string[][], word: string, wordX: number, wordY: number) {
    const wordHalf = Math.floor(word.length / 2)

    /**
     * Random index of the center word, used to find where the second word is going to be placed
     */
    const centerIndex = random(wordX - wordHalf, wordX - wordHalf + word.length - 1)

    /**
     * Random value of word, filtered so it includes the {@link centerIndex} letter
     */
    const secondWord: string = randomFromArray(randomList().filter(word => word.includes(board[wordY][centerIndex])))

    /**
     * Index of the {@link centerIndex} in {@link secondWord}
     */
    const secondCenterIndex: number = randomFromArray(secondWord.split("").map((letter, i) => { if (letter === board[wordY][centerIndex]) return i; return null }).filter(v => v !== null))
    const centerSecondIndex = board[wordY].indexOf(secondWord[secondCenterIndex])

    /* ---------------------------- Invalid detection --------------------------- */
    const y = wordY - secondWord.slice(0, secondCenterIndex).length
    let hit = false
    for (let i = 0; i < secondWord.length; i++) {
        if (y + i === wordY) continue
        if (board[y + i]?.[centerIndex] !== "") {
            hit = true
            break
        }
    }

    if (hit) return true

    secondWord.slice(0, secondCenterIndex).split("").reverse().forEach((letter, i) => board[wordY - i - 1][centerSecondIndex] = letter)
    secondWord.slice(secondCenterIndex + 1, secondWord.length).split("").forEach((letter, i) => board[wordY + i + 1][centerSecondIndex] = letter)

    return false
}

function generateBoard(board: string[][]) {
    /* ------------------------------- Center word ------------------------------ */
    const center = Math.floor(board.length / 2)
    const centerWord: string = randomFromArray(randomList())
    const centerWordHalf = Math.floor(centerWord.length / 2)

    centerWord.slice(0, centerWordHalf).split("").reverse().forEach((letter, i) => board[center][center - i - 1] = letter)
    centerWord.slice(centerWordHalf, centerWord.length).split("").forEach((letter, i) => board[center][center + i] = letter)

    /* ------------------------------- Second word ------------------------------ */
    let vOH = verticalOffOfHorizontalWord(board, centerWord, center, center)
    while (vOH === true) {
        vOH = verticalOffOfHorizontalWord(board, centerWord, center, center)
    }

    vOH = verticalOffOfHorizontalWord(board, centerWord, center, center)
    while (vOH === true) {
        vOH = verticalOffOfHorizontalWord(board, centerWord, center, center)
    }
}

class Game {
    board: string[][]

    constructor() {
        this.board = [...Array(13)].map(() => [...Array(13)].map(() => ""))
        generateBoard(this.board)
    }
}

const game = writable(new Game())

export {
    Game,
    game
}

