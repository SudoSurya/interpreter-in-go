import { Tokenizer } from "../lexer/lexer"
import { Token, TokenType, Tokens } from "../token/token"
import { Identifier, LetStatement, Program, Statement } from "./ast"

type Parser = {
    l: Tokenizer
    curToken: Token
    peekToken: Token
}

export const newParser = (l: Tokenizer): Parserizer => {
    let p = new Parserizer(l)
    p.nextToken()
    p.nextToken()

    return p
}

export class Parserizer {
    public parser: Parser = {} as Parser

    constructor(l: Tokenizer) {
        this.parser.l = l
    }

    public nextToken() {
        this.parser.curToken = this.parser.peekToken
        this.parser.peekToken = this.parser.l.NextToken()
    }
    public ParseProgram(): Program {
        let program = new Program()
        program.Statements = [] as unknown as Statement[]

        while (this.parser.curToken.Type != Tokens.EOF) {
            let stmt = this.ParseStatement()
            if (stmt != null) {
                program.Statements.push(stmt)
            }
            this.nextToken()
        }
        return program
    }

    public ParseStatement(): Statement | null {
        switch (this.parser.curToken.Type) {
            case Tokens.LET:
                return this.ParseLetStatement()
            default:
                return null
        }
    }

    public ParseLetStatement(): LetStatement | null {
        let stmt = new LetStatement()
        stmt.token = this.parser.curToken

        if(this.expectPeek(Tokens.IDENT)){
            return null
        }

        stmt.name = new Identifier()

        stmt.name.token = this.parser.curToken
        stmt.name.value = this.parser.curToken.Literal

        if(!this.expectPeek(Tokens.ASSIGN)){
            return null
        }

        while(!this.curTokenIs(Tokens.SEMICOLON)){
            this.nextToken()
        }

        return stmt
    }

    private curTokenIs(t: TokenType): boolean {
        return this.parser.curToken.Type == t
    }

    private peekTokenIs(t: TokenType): boolean {
        return this.parser.peekToken.Type == t
    }

    private expectPeek(t: TokenType): boolean {
        if (this.peekTokenIs(t)) {
            this.nextToken()
            return true
        } else {
            return false
        }
    }
}
