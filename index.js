import { h, app } from 'hyperapp'
import { div, h1, h2, ul, li } from '@hyperapp/html'

app({
	init: () => ({
		word: 'application',
		guesses: ['a', 'b', 'c', 'd'],
	}), // we don't have a state here
	view: (state) => (
		div({},
			[ h1({}, state.word)
			, h2({}, 'Your Guesses:')
				, ul({ class: 'guesses' },
					state.guesses.map(guess => 
						li({ class: 'guess' }, guess)
					)
				)
			]
		)
	),
  node: document.getElementById('app')
})
