import { h, app } from 'hyperapp'
import { div, h1 } from '@hyperapp/html'

app({
  init: () => ({}), // we don't have a state here
  view: () => (
    div({ class: 'pure-javascript' },
      [ h1({}, "This was added with pure javascript, check me out!")
      ]
    )
  ),
  node: document.getElementById('app')
})

