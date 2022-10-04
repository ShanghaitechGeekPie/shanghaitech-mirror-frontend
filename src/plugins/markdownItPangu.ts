// Author: @mochaaP
// From: https://github.com/shigma/markdown-it-pangu/issues/1

import pangu from 'pangu'
import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'
import { escapeHtml, isWhiteSpace } from 'markdown-it/lib/common/utils'

const getPrevChar = (tokens: Token[], index: number) => {
  let prevChar = ""
  for (let i = index - 1; i >= 0; i -= 1) {
    const { content, type } = tokens[i]
    if (type === 'html_inline') break
    if (content && content.length) { prevChar = content.slice(-1); break }
  }
  return prevChar
}

export default (md: MarkdownIt, options: any = {}) => {
  const { additionalRules = ['code_inline'] } = options

  md.renderer.rules.text = (tokens, index, ...others) => {
    const prevChar = getPrevChar(tokens, index)
    return escapeHtml(pangu.spacing(prevChar + tokens[index].content).slice(prevChar.length))
  }

  additionalRules.forEach((type: string) => {
    const additionalRule = md.renderer.rules[type]
    if (!additionalRule) return

    md.renderer.rules[type] = (tokens, index, options, env, self) => {
      let output = additionalRule(tokens, index, options, env, self)
      if (output.length) {
        if (index > 0 && !isWhiteSpace(output.charCodeAt(0))) output = ' ' + output
        if (index < tokens.length - 1 && !isWhiteSpace(output.charCodeAt(output.length - 1))) output += ' '
      }
      return output
    }
  })
}