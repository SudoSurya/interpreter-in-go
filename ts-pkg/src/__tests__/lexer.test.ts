import { expect, test } from "@jest/globals";
import { Tokens } from "../token/token";
import { LexerClass } from "../lexer/lexer";
test("lexer test", () => {
    const input = `=+(){},;`

    const tests = [
        { Type: Tokens.ASSIGN, Literal: "=" },
        { Type: Tokens.PLUS, Literal: "+" },
        { Type: Tokens.LPAREN, Literal: "(" },
        { Type: Tokens.RPAREN, Literal: ")" },
        { Type: Tokens.LBRACE, Literal: "{" },
        { Type: Tokens.RBRACE, Literal: "}" },
        { Type: Tokens.COMMA, Literal: "," },
        { Type: Tokens.SEMICOLON, Literal: ";" },
        { Type: Tokens.EOF, Literal: "" },
    ]

    const l = new LexerClass(input)

    tests.forEach((tt) => {
        const tok = l.NextToken()
        expect(tok.Type).toBe(tt.Type)
        expect(tok.Literal).toBe(tt.Literal)
    })
})
