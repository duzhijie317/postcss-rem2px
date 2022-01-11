const css = require('css')
const extend = require('extend')

const defaultConfig = {
    transformType: 'rem',
    sdw: 1920,
    ddw: 1920,
    srfs: 100,
    drfs: 100,
    forbidComment: 'no',
    precision: 4,
    remLimit: 0
}

const remRegExp = /\b(\d+(\.\d+)?)rem\b/


function Rem2px(options) {
    this.config = {}
    extend(this.config, defaultConfig, options)
}


Rem2px.prototype.getCalcValue = function (type, value) {
    const { srfs, drfs, ddw, sdw, precision } = this.config
    const remGlobalRegExp = new RegExp(remRegExp.source, 'g')
    function generateValue(val) {
        const _val = parseFloat(Number(val).toFixed(precision))
        return Number(_val) === 0 ? String(_val): _val + type
    }
    return value.replace(remGlobalRegExp, (m, p1) => {
        if (type === 'px') {
            return generateValue(Number(p1) * srfs * (ddw / sdw))
        } else {
            if(Number(p1) <= this.config.remLimit) {
                return Number(p1) === 0 ? '0' : (`${p1}px`)
            } else {
                return generateValue(Number(p1) * srfs * ( sdw / ddw ) / drfs)
            }
        }
    })
}

Rem2px.prototype.generateRem = function (cssText) {
    const self = this
    const astObj = css.parse(cssText)
    const rules = astObj.stylesheet?.rules || []
    function processRules(rules){
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i]
            if (rule.type === 'media') {
                processRules(rule.rules)
                continue
            } else if (rule.type === 'keyframes') {
                processRules(rule.keyframes)
                continue
            } else if (rule.type !== 'rule' && rule.type !== 'keyframe') {
                continue
            }
            const declarations = rule.declarations
            for (let j = 0; j < declarations.length; j++) {
                const declaration = declarations[j]
                if (declaration.type === 'declaration' && remRegExp.test(declaration.value)) {
                    const nextDeclaration = rule?.declarations[j + 1]
                    if (nextDeclaration && nextDeclaration.type === 'comment') {
                        if (nextDeclaration.comment.trim() === self.config.forbidComment) {
                            declarations.splice(j + 1, 1)
                            continue
                        }
                    }
                    declaration.value = self.getCalcValue(self.config.transformType, declaration.value)
                }
            }
        }
    }
    processRules(rules)
    return css.stringify(astObj)
}

module.exports = Rem2px
