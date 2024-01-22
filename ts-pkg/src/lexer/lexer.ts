import { LookupIdent, Token, Tokens } from "../token/token";


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
        let tok: Token = { Type: "", Literal: "" };

        this.skipWhitespace();

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
                if (this.isLetter(this.lexer.ch)) {
                    tok.Literal = this.readIdentifier();
                    tok.Type = LookupIdent(tok.Literal);
                    return tok;
                } else if (this.isDigit(this.lexer.ch)) {
                    tok.Literal = this.readNumber();
                    tok.Type = Tokens.INT;
                    return tok;
                }
                else {
                    tok = this.newToken(Tokens.ILLEGAL, this.lexer.ch);
                }
        }
        this.readChar();
        return tok;
    }

    private newToken(tokenType: Tokens, ch: string): Token {
        return { Type: tokenType, Literal: ch };
    }
    private skipWhitespace(): void {
        while (this.lexer.ch === " " || this.lexer.ch === "\t" || this.lexer.ch === "\n" || this.lexer.ch === "\r") {
            this.readChar();
        }
    }

    private readIdentifier(): string {
        let pos = this.lexer.position
        while (this.isLetter(this.lexer.ch)) {
            this.readChar()
        }
        return this.lexer.input.slice(pos, this.lexer.position)
    }

    private readNumber(): string {
        let pos = this.lexer.position
        while (this.isDigit(this.lexer.ch)) {
            this.readChar()
        }
        return this.lexer.input.slice(pos, this.lexer.position)
    }

    private isLetter(ch: string): boolean {
        return "a" <= ch && ch <= "z" || "A" <= ch && ch <= "Z" || ch === "_";
    }

    private isDigit(ch: string): boolean {
        return "0" <= ch && ch <= "9";
    }
}
