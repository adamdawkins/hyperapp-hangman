import { app } from "hyperapp"
import { preventDefault, targetValue } from "@hyperapp/events"
import {
  div,
  h1,
  h2,
  ul,
  li,
  span,
  input,
  label,
  form,
  button
} from "@hyperapp/html"
import { generate, number } from "@hyperapp/random"
import WORDS from "./words"

const mdash = "\u2014"
const MAX_BAD_GUESSES = 7

//
// UTILITIES
//

const contains = (list, item) => list.indexOf(item) > -1

//
// HELPERS
//

const isGuessed = (letter, state) => contains(state.guesses, letter)
const isInWord = (letter, state) => contains(state.word, letter)
const badGuesses = state =>
  state.guesses.filter(guess => !isInWord(guess, state))
const isVictorious = state =>
  state.word.map(letter => isGuessed(letter, state)).every(value => value)
const isGameOver = state => badGuesses(state).length >= MAX_BAD_GUESSES

//
// EFFECTS
//

const getRandomWord = (words, action) =>
  generate(action, number(rand => words[Math.floor(rand * words.length)]))

//
// ACTIONS
//

const GuessLetter = state => ({
  ...state,
  guesses: state.guesses.concat([state.guessedLetter]),
  guessedLetter: ""
})

const SetGuessedLetter = (state, letter) => ({
  ...state,
  guessedLetter: letter
})

const SetWord = (state, word) => ({
  ...state,
  word: word.split("")
})

//
// VIEWS
//

const Word = state =>
  h1({}, state.word.map(letter => WordLetter(letter, isGuessed(letter, state))))

const WordLetter = (letter, guessed) =>
  span({ class: "letter" }, guessed ? letter : mdash)

const BadGuesses = state => [
  h2({}, "Incorrect Guesses:"),
  ul(
    { class: "guesses" },
    badGuesses(state).map(guess => li({ class: "guess" }, guess))
  )
]

const UserInput = letter =>
  form({ onSubmit: preventDefault(GuessLetter) }, [
    label({}, "Your guess:"),
    ,
    input({
      value: letter,
      type: "text",
      maxlength: 1,
      class: "input",
      onInput: [SetGuessedLetter, targetValue]
    }),
    button({ type: "submit" }, "Guess!")
  ])

//
// THE APP
//

app({
  init: [
    {
      word: [],
      guesses: [],
      guessedLetter: "",
      maxBadGuesses: 7
    },
    getRandomWord(WORDS, SetWord)
  ],
  view: state =>
    div(
      {},
      isGameOver(state)
        ? h1({}, `Game Over! The word was "${state.word.join("")}"`)
        : isVictorious(state)
        ? [h1({}, "You Won!"), Word(state)]
        : [UserInput(state.guessedLetter), Word(state), BadGuesses(state)]
    ),
  node: document.getElementById("app")
})
