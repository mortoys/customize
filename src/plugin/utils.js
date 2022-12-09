
function getPathDetail(path) {
    const compos = path.split('#')
    return compos.length > 1
        ? [compos[0], compos[1]]
        : [compos[0], '']
}
function isMatchPathWithKey(path, rulePath) {
    const [compoName, compoKey] = getPathDetail(path)
    const [ruleName, ruleKey] = getPathDetail(rulePath)
    return (compoName == ruleName) && ((compoKey == ruleKey) || !ruleKey)
}

function isMatchRule(path_, rulePath_) {
    let path = [...path_]
    let rulePath = [...rulePath_]

    if(!isMatchPathWithKey(path[0], rulePath[0]))
        return false
    rulePath.shift()
    path.shift()

    while(rulePath.length != 0) {
        if(isMatchPathWithKey(path[0], rulePath[0])) {
            rulePath.shift()
            path.shift()
        } else
            path.shift()
        
        if(rulePath.length != 0 && path.length == 0) return false
    } 
    return true
}

export function findActiveRuleOnCompo(allrules, path) {
    return allrules.filter(rule => isMatchRule(path, rule.path))
}

export function resolveTypes(types, path) {
    return types[path[0]]
}

export function valuateImportant(rulePath) {
    return rulePath.map(path => path.includes('#') ? 110 : 10).reduce((a, b)=>a+b, 0)
}

export function resolveRule(allrules, path) {
    const rules = findActiveRuleOnCompo(allrules, path)
    const result = rules.reduce((ret, rule) => {
        const key = rule['key']
        if(ret[key]) {
            if(ret[key].important <= rule.important)
                ret[key] = rule
        } else 
            ret[key] = rule
        return ret
    }, {})
    return Object.keys(result).reduce((ret, key) => {
        ret[key] = result[key]['value']
        return ret
    }, {})
}

export function getPath(vm) {
    const root = vm.$root
    const key = vm.$vnode.key || ''
    const name = vm.$options.name
    const path = [key ? name + '#' + key : name]

    var $parent = vm.$parent
    while($parent != root) {
        const name = vm.$parent.$options.name
        const key = vm.$parent.$vnode.key
        path.push(key ? name+'#'+key : name)
        $parent = $parent.$parent
    }
    return path
}