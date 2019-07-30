import { h, app } from 'hyperapp'
import { preventDefault, targetValue } from "@hyperapp/events"
import { div, h1, h2, ul, li, span, input, label, form, button } from '@hyperapp/html'

const mdash = "\u2014"
const MAX_BAD_GUESSES = 7

// HELPERS
// returns true if everything in it is true
//    all :: [Boolean] => Boolean
const all = list => {
  var i = 0;
  while (i < list.length) {
    if (!list[i]) {
      return false
    }
    i += 1;
  }

  return true
}

const contains = (list, item) => list.indexOf(item) > -1

const isGuessed = (letter, state) => contains(state.guesses, letter)
const isInWord = (letter, state) => contains(state.word, letter)


const badGuesses = state => state.guesses.filter( guess => !isInWord(guess, state))

const isVictorious = state => all(state.word.map(letter => isGuessed(letter, state)))
const isGameOver = state => badGuesses(state).length >= MAX_BAD_GUESSES




// ACTIONS

const GuessLetter = (state) => ({
		...state, 
			guesses: state.guesses.concat([state.guessedLetter]),
			guessedLetter: '',
	})

const SetGuessedLetter = (state, letter)  => ({
		...state, 
			guessedLetter: letter,
})


// VIEWS

const Word = (state) =>  (
  h1({}, state.word.map(letter => WordLetter(letter, isGuessed(letter, state))))
)

const WordLetter = (letter, guessed) => (
  span({ class: 'letter' }, guessed ? letter : mdash)
)

const BadGuesses = (state) => (
  [ h2({}, 'Incorrect Guesses:')
    , ul({ class: 'guesses' }, badGuesses(state).map(
        guess => li({ class: 'guess' }, guess)
    ))
  ]
)

const UserInput = (letter) => (
	form({ onSubmit: preventDefault(GuessLetter) },
    [ label({}, 'Your guess:'),
			, input({ value: letter
							, type: 'text'
              , maxlength: 1
							, class: 'input'
							, onInput: [SetGuessedLetter, targetValue]
              })
      , button({ type: 'submit'}, "Guess!")
    ]
  )
)

// THE APP

app({
	init: {
		word: 'application'.split(''),
		guesses: [],
		guessedLetter: '',
    maxBadGuesses: 7,
	},
	view: (state) => ( 
		div({},
			isGameOver(state)
			? 
			h1({}, `Game Over! The word was "${state.word.join('')}"`)
			:
			(
				isVictorious(state)
				?
				[ h1({}, "You Won!"),
					Word(state)
				]
				:
				[ UserInput(state.guessedLetter),
					, Word(state),
					, BadGuesses(state)
				]
			)
		)
	),
  node: document.getElementById('app')
})
