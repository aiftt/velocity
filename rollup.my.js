const typescript = require("rollup-plugin-typescript2") ;

module.exports =  {
  input: 'src/velocity.ts',
  output: {
    file: 'velocity.es6.js',
    name: 'velocity',
    format: 'es'
  },
  plugins: [
    typescript(Object.assign({}, {
//			verbosity: 2,
			clean: true
		}, {
			tsconfig: 'src/tsconfig.json'
		}))
  ]
}
