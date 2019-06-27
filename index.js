import { h, app } from 'hyperapp'
import { div, h1, h2 } from '@hyperapp/html'

app({
	init: () => ({
		word: 'application',
		guesses: [],
	}), // we don't have a state here
	view: (state) => (
		div({},
			[ h1({}, state.word)
			, h2({}, 'Your Guesses:')
			]
		)
	),
  node: document.getElementById('app')
})

