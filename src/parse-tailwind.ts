import postcss, { AtRule, ChildNode, Rule } from 'postcss'
import tailwind from 'tailwindcss'
import { Config } from './types'

type RootLike = { nodes?: ChildNode[] }

const config: Config = require('../tailwind')

const selectors = new Map<string, Set<string>>()

function addSelector(selector: string, ...modifiers: string[]) {
  modifiers.forEach(modifier => {
    if (!selectors.has(selector)) selectors.set(selector, new Set())
    selectors.get(selector)!.add(modifier)
  })
}

function parseNodes(root: RootLike) {
  root.nodes!.forEach(node => {
    if (node.type === 'rule') {
      let selector = node.selector
        .replace(/(?<!\\):[a-z\-]+$/, '') // remove pseudoselectors, use negative lookbehind to unmatch modifiers
        .replace(/\\/g, '') // remove escape character
        .substr(1) // remove beginning dot (.)
      // match modifiers (xl:bg-white or hover:bg-white)
      const modifierRegex = /^([a-z]+):/
      let match = modifierRegex.exec(selector)
      if (match != null) {
        const modifiers: string[] = []
        // modifiers can be combined (xl:hover:bg-white) so we collect all modifiers
        while (match != null) {
          const modifier = match[0]
          modifiers.push(modifier)
          selector = selector.substr(modifier.length)
          match = modifierRegex.exec(selector)
        }
        addSelector(selector, ...modifiers)
      } else {
        addSelector(selector, '')
      }
    } else if (node.type === 'atrule' && node.nodes) {
      parseNodes(node)
    }
  })
}

postcss([tailwind(config)])
  .process('@tailwind utilities;', { from: undefined })
  .then(result => {
    const root = result.root!
    parseNodes(root)
    for (const [selector, modifiers] of selectors.entries()) {
      console.log(selector, Array.from(modifiers.values()))
    }
  })
