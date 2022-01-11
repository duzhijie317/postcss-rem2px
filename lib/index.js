'use strict'

const postcss = require('postcss')
const Rem2px = require('./rem2px.js')

module.exports = (options = {}) => {
    return {
        postcssPlugin: 'postcss-rem2px',
        Once(root, { result }) {
            const oldCssText = root.toString()
            const rem2px = new Rem2px(options)
            const newCssText = rem2px.generateRem(oldCssText)
            const newCssObj = postcss.parse(newCssText)
            result.root = newCssObj
        }
    }
}
module.exports.postcss = true
