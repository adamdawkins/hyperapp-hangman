import { h, app } from 'hyperapp'
import { div, h1, h2, ul, li, span } from '@hyperapp/html'

const mdash = "\u2014";

app({
	init: () => ({
		word: 'application'.split(''),
		guesses: ['a', 'b', 'c', 'd'],
	}),
	view: (state) => (
		div({},
			[ h1({}, state.word.map(() => span({class: 'letter'}, mdash)))
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
