import { resolve } from 'path'
import { writeJson } from 'fs-extra'
import { Config, Modules } from './types'

// __ means don't display
// _ means don't delimit with '-'
interface PrefixedArray<T> extends Array<T> {
  prefix: string
}

function concatPrefixes(a: string, b: string) {
  if (a.startsWith('__')) a = ''
  return a && b ? (b.startsWith('_') ? a + b.substr(1) : a + '-' + b) : a + b
}

function prefixArray<T>(prefix: string, elements: T[]) {
  elements['prefix'] = prefix
  return (elements as any) as PrefixedArray<T>
}

function flattenPrefixedArray(
  prefixedArray: PrefixedArray<string | PrefixedArray<string>>
): string[] {
  const prefix = prefixedArray.prefix
  return prefixedArray.reduce<string[]>((acc, el) => {
    if (typeof el === 'string') return [...acc, concatPrefixes(prefix, el)]
    el.prefix = concatPrefixes(prefix, el.prefix)
    return [...acc, ...flattenPrefixedArray(el)]
  }, [])
}

function omitDefault(config: {} | undefined): {} | undefined {
  if (!config) return
  const { default: _, ...rest } = config as any
  return rest
}

function configKeys(config: {}) {
  return Object.keys(config).map(key => (key === 'default' ? '_' : key))
}

function prefixConfigKeys(prefix: string, config: {} | undefined) {
  return config && prefixArray(prefix, configKeys(config))
}

function prefixNestedConfigKeys(basePrefix: string, config: {} | undefined, prefixes: string[]) {
  return (
    config &&
    prefixArray(basePrefix, prefixes.map(prefix => prefixArray(prefix, configKeys(config))))
  )
}

function getPluginPrefixedArray(
  config: Config,
  plugin: keyof Modules
):
  | PrefixedArray<PrefixedArray<string>>
  | PrefixedArray<string>
  | PrefixedArray<string>[]
  | undefined {
  switch (plugin as keyof Modules) {
    case 'appearance':
      return prefixArray('__util', ['appearance-none'])
    case 'backgroundAttachment':
      return prefixArray('bg', ['fixed', 'local', 'scroll'])
    case 'backgroundColors':
      return prefixConfigKeys('bg', config.backgroundColors)
    case 'backgroundPosition':
      return prefixArray('bg', [
        'bottom',
        'center',
        'left',
        'left-bottom',
        'left-top',
        'right',
        'right-bottom',
        'right-top',
        'top',
      ])
    case 'backgroundRepeat':
      return prefixArray('bg', ['repeat', 'no-repeat', 'repeat-x', 'repeat-y'])
    case 'backgroundSize':
      return prefixConfigKeys('bg', config.backgroundSize)
    case 'borderCollapse':
      return prefixArray('border', ['collapse', 'separate'])
    case 'borderColors':
      return prefixConfigKeys('border', omitDefault(config.borderColors))
    case 'borderRadius':
      return prefixNestedConfigKeys('rounded', config.borderRadius, [
        '_',
        't',
        'r',
        'b',
        'l',
        'tl',
        'tr',
        'br',
        'bl',
      ])
    case 'borderStyle':
      return prefixArray('border', ['solid', 'dashed', 'dotted', 'none'])
    case 'borderWidths':
      return prefixNestedConfigKeys('border', config.borderWidths, ['_', 't', 'r', 'b', 'l'])
    case 'cursor':
      return prefixArray('cursor', ['auto', 'default', 'pointer', 'wait', 'move', 'not-allowed'])
    case 'display':
      return prefixArray('__display', [
        'block',
        'inline-block',
        'inline',
        'table',
        'table-row',
        'table-cell',
        'hidden',
      ])
    case 'flexbox':
      return prefixArray('__flexbox', [
        'flex',
        'inline-flex',
        'flex-row',
        'flex-row-reverse',
        'flex-col',
        'flex-col-reverse',
        'flex-wrap',
        'flex-wrap-reverse',
        'flex-no-wrap',
        'items-start',
        'items-end',
        'items-center',
        'items-baseline',
        'items-stretch',
        'self-auto',
        'self-start',
        'self-end',
        'self-center',
        'self-stretch',
        'justify-start',
        'justify-end',
        'justify-center',
        'justify-between',
        'justify-around',
        'content-center',
        'content-start',
        'content-end',
        'content-between',
        'content-around',
        'flex-1',
        'flex-auto',
        'flex-initial',
        'flex-none',
        'flex-grow',
        'flex-shrink',
        'flex-no-grow',
        'flex-no-shrink',
      ])
    case 'float':
      return prefixArray('float', ['right', 'left', 'none'])
    case 'fonts':
      return prefixConfigKeys('font', config.fonts)
    case 'fontWeights':
      return prefixConfigKeys('font', config.fontWeights)
    case 'height':
      return prefixConfigKeys('h', config.height)
    case 'leading':
      return prefixConfigKeys('leading', config.leading)
    case 'lists':
      return prefixArray('__util', ['list-reset'])
    case 'margin':
      return prefixNestedConfigKeys('m', config.margin, ['_', '_y', '_x', '_t', '_r', '_b', '_l'])
    case 'maxHeight':
      return prefixConfigKeys('max-h', config.maxHeight)
    case 'maxWidth':
      return prefixConfigKeys('max-w', config.maxWidth)
    case 'minHeight':
      return prefixConfigKeys('min-h', config.minHeight)
    case 'minWidth':
      return prefixConfigKeys('min-w', config.minWidth)
    case 'negativeMargin':
      return prefixNestedConfigKeys('-m', config.negativeMargin, [
        '_',
        '_y',
        '_x',
        '_t',
        '_r',
        '_b',
        '_l',
      ])
    case 'objectFit':
      return prefixArray('object', ['contain', 'cover', 'fill', 'none', 'scale-down'])
    case 'objectPosition':
      return prefixArray('object', [
        'bottom',
        'center',
        'left',
        'left-bottom',
        'left-top',
        'right',
        'right-bottom',
        'right-top',
        'top',
      ])
    case 'opacity':
      return prefixConfigKeys('opacity', config.opacity)
    case 'outline':
      return prefixArray('__util', ['outline-none'])
    case 'overflow':
      return [
        prefixArray('overflow', [
          'auto',
          'hidden',
          'visible',
          'scroll',
          'x-auto',
          'y-auto',
          'x-hidden',
          'y-hidden',
          'x-visible',
          'y-visible',
          'x-scroll',
          'y-scroll',
        ]),
        prefixArray('__util', ['scrolling-touch', 'scrolling-auto']),
      ]
    case 'padding':
      return prefixNestedConfigKeys('p', config.padding, ['_', '_y', '_x', '_t', '_r', '_b', '_l'])
    case 'pointerEvents':
      return prefixArray('__util', ['pointer-events-none', 'pointer-events-auto'])
    case 'position':
      return [
        prefixArray('__position', [
          'static',
          'fixed',
          'absolute',
          'relative',
          'sticky',
          'pin',
          'pin-none',
          'pin-y',
          'pin-x',
          'pin-t',
          'pin-r',
          'pin-b',
          'pin-l',
        ]),
      ]
    case 'resize':
      return prefixArray('resize', ['_', 'none', 'y', 'x'])
    case 'shadows':
      return prefixConfigKeys('shadow', config.shadows)
    case 'svgFill':
      return prefixConfigKeys('fill', config.svgFill)
    case 'svgStroke':
      return prefixConfigKeys('stroke', config.svgStroke)
    case 'tableLayout':
      return prefixArray('table', ['auto', 'fixed'])
    case 'textAlign':
      return prefixArray('text', ['left', 'center', 'right', 'justify'])
    case 'textColors':
      return prefixConfigKeys('text', config.textColors)
    case 'textSizes':
      return prefixConfigKeys('text', config.textSizes)
    case 'textStyle':
      return prefixArray('__textStyle', [
        'italic',
        'roman',
        'uppercase',
        'lowercase',
        'capitalize',
        'normal-case',
        'underline',
        'line-through',
        'no-underline',
        'antialiased',
        'subpixel-antialiased',
      ])
    case 'tracking':
      return prefixConfigKeys('tracking', config.tracking)
    case 'userSelect':
      return prefixArray('__util', ['select-none', 'select-text'])
    case 'verticalAlign':
      return prefixArray('align', [
        'baseline',
        'top',
        'middle',
        'bottom',
        'text-top',
        'text-bottom',
      ])
    case 'visibility':
      return prefixArray('__util', ['visible', 'invisible'])
    case 'whitespace':
      return prefixArray('__whitespace', [
        'whitespace-normal',
        'whitespace-no-wrap',
        'whitespace-pre',
        'whitespace-pre-line',
        'whitespace-pre-wrap',
        'break-words',
        'break-normal',
        'truncate',
      ])
    case 'width':
      return prefixConfigKeys('w', config.width)
    case 'zIndex':
      return prefixConfigKeys('z', config.zIndex)
  }
}

function getGeneratedRule(config: Config, plugin: keyof Modules) {
  const prefixedArray = getPluginPrefixedArray(config, plugin as keyof Modules)
  if (!prefixedArray) return []
  if (!('prefix' in prefixedArray)) {
    return prefixedArray.reduce<string[]>(
      (acc, prefixedArray) => [...acc, ...flattenPrefixedArray(prefixedArray)],
      []
    )
  } else {
    return flattenPrefixedArray(prefixedArray)
  }
}

function parseTailwind(path: string) {
  const config: Config = require(resolve(path))
  const generatedRules = Object.keys(config.modules).reduce<Record<string, string[]>>(
    (acc, plugin) => ({
      ...acc,
      [plugin]: getGeneratedRule(config, plugin as keyof Modules),
    }),
    {}
  )
  return generatedRules
}

writeJson(resolve('test-output.json'), parseTailwind('tailwind.js'), { spaces: 2 })
