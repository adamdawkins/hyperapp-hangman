import { h, app } from 'hyperapp'
import { div, h1, h2, ul, li, span } from '@hyperapp/html'

// HELPERS
const contains = (list, item) => list.indexOf(item) > -1

const isGuessed = (letter, state) => contains(state.guesses, letter)
const isInWord = (letter, state) => contains(state.word, letter)




const mdash = "\u2014";

// ACTIONS

// VIEWS

// THE APP

app({
	init: () => ({
		word: 'application'.split(''),
		guesses: ['a', 'b', 'c', 'd'],
	}),
	view: (state) => (
		div({},
			[ h1({}, state.word.map(letter => span({class: 'letter'}, isGuessed(letter, state) ? letter : mdash)))
			, h2({}, 'Incorrect Guesses:')
				, ul({ class: 'guesses' },
          state.guesses.filter(guess => !isInWord(guess, state)).map(guess => 
						li({ class: 'guess' }, guess)
					)
				)
			]
		)
	),
  node: document.getElementById('app')
})
