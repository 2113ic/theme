import { UseGenerator } from './theme'

const generator = new UseGenerator({
  include: ['red', 'teal', 'amber', 'blue', 'slate']
})

generator.scss()
  .then(res => console.log(res))
  .catch(err => console.warn(err))

// generator.css()
//   .then(res => console.log(res.css))
//   .catch(err => console.warn(err))
