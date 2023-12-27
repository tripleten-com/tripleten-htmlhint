import { Hint, ReportType, Rule, Ruleset } from './types'

interface DynamicObj {
  [key: string]: string | number
}

export default class Reporter {
  public html: string
  public lines: string[]
  public brLen: number
  public ruleset: Ruleset
  public messages: Hint[]

  public constructor(html: string, ruleset: Ruleset) {
    this.html = html
    this.lines = html.split(/\r?\n/)
    const match = /\r?\n/.exec(html)

    this.brLen = match !== null ? match[0].length : 0
    this.ruleset = ruleset
    this.messages = []
  }

  public info(
    message: string,
    params: DynamicObj,
    line: number,
    col: number,
    rule: Rule,
    raw: string,
    rawMessage?: string
  ): void {
    this.report(
      ReportType.info,
      message,
      params,
      line,
      col,
      rule,
      raw,
      rawMessage
    )
  }

  public warn(
    message: string,
    params: DynamicObj,
    line: number,
    col: number,
    rule: Rule,
    raw: string,
    rawMessage?: string
  ): void {
    this.report(
      ReportType.warning,
      message,
      params,
      line,
      col,
      rule,
      raw,
      rawMessage
    )
  }

  public error(
    message: string,
    params: DynamicObj,
    line: number,
    col: number,
    rule: Rule,
    raw: string,
    rawMessage?: string
  ): void {
    this.report(
      ReportType.error,
      message,
      params,
      line,
      col,
      rule,
      raw,
      rawMessage
    )
  }

  private report(
    type: ReportType,
    message: string,
    params: DynamicObj,
    line: number,
    col: number,
    rule: Rule,
    raw: string,
    rawMessage?: string
  ) {
    const lines = this.lines
    const brLen = this.brLen
    let evidence = ''
    let evidenceLen = 0

    for (let i = line - 1, lineCount = lines.length; i < lineCount; i++) {
      evidence = lines[i]
      evidenceLen = evidence.length
      if (col > evidenceLen && line < lineCount) {
        line++
        col -= evidenceLen
        if (col !== 1) {
          col -= brLen
        }
      } else {
        break
      }
    }

    this.messages.push({
      type: type,
      message: {
        id: message,
        values: params,
      },
      raw: raw,
      rawMessage: rawMessage || '',
      evidence: evidence,
      line: line,
      col: col,
      rule: {
        id: rule.id,
        description: rule.description,
        link: `https://htmlhint.com/docs/user-guide/rules/${rule.id}`,
      } as Rule,
    })
  }
}
