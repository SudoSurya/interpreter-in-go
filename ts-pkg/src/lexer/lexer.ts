import { Token, Tokens } from "../token/token";


type Lexer = {
    input: string;
    position: number;
    readPosition: number;
    ch: string;
}

export class LexerClass {
    public lexer: Lexer = {
        input: "",
        position: 0,
        readPosition: 0,
        ch: "",
    }
    constructor(input: string) {
        this.lexer.input = input;
        this.readChar();
    }

    New(input: string): Lexer {
        this.lexer.input = input;
        this.readChar();
        return this.lexer;
    }

    private readChar(): void {
        if (this.lexer.readPosition >= this.lexer.input.length) {
            this.lexer.ch = "";
        } else {
            this.lexer.ch = this.lexer.input[this.lexer.readPosition];
        }
        this.lexer.position = this.lexer.readPosition;
        this.lexer.readPosition += 1;
    }

    public NextToken(): Token {
        let tok: Token
        switch (this.lexer.ch) {
            case "=":
                tok = this.newToken(Tokens.ASSIGN, this.lexer.ch);
                break;
            case ";":
                tok = this.newToken(Tokens.SEMICOLON, this.lexer.ch);
                break;
            case "(":
                tok = this.newToken(Tokens.LPAREN, this.lexer.ch);
                break;
            case ")":
                tok = this.newToken(Tokens.RPAREN, this.lexer.ch);
                break;
            case ",":
                tok = this.newToken(Tokens.COMMA, this.lexer.ch);
                break;
            case "+":
                tok = this.newToken(Tokens.PLUS, this.lexer.ch);
                break;
            case "{":
                tok = this.newToken(Tokens.LBRACE, this.lexer.ch);
                break;
            case "}":
                tok = this.newToken(Tokens.RBRACE, this.lexer.ch);
                break;
            case "":
                tok = this.newToken(Tokens.EOF, "");
                break;
            default:
                throw new Error(`Unknown token: ${this.lexer.ch}`);
        }
        this.readChar();
        return tok;
    }

    private newToken(tokenType: Tokens, ch: string): Token {
        return { Type: tokenType, Literal: ch };
    }
}
