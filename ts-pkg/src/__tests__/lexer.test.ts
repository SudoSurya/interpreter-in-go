import { expect, test } from "@jest/globals";
import { Tokens } from "../token/token";
import { Tokenizer } from "../lexer/lexer";
test("lexer test", () => {
    const input = `let five = 5;
    10 == 10;
    10 != 9;
    `
    const tests = [
        { Type: Tokens.LET, Literal: "let" },
        { Type: Tokens.IDENT, Literal: "five" },
        { Type: Tokens.ASSIGN, Literal: "=" },
        { Type: Tokens.INT, Literal: "5" },
        { Type: Tokens.SEMICOLON, Literal: ";" },
        { Type: Tokens.INT, Literal: "10" },
        { Type: Tokens.EQ, Literal: "==" },
        { Type: Tokens.INT, Literal: "10" },
        { Type: Tokens.SEMICOLON, Literal: ";" },
        { Type: Tokens.INT, Literal: "10" },
        { Type: Tokens.NOT_EQ, Literal: "!=" },
        { Type: Tokens.INT, Literal: "9" },
        { Type: Tokens.SEMICOLON, Literal: ";" },
        { Type: Tokens.EOF, Literal: "" },
    ]

    const l = new Tokenizer(input)

    tests.forEach((tt) => {
        const tok = l.NextToken()
        console.log(tok)
        expect(tok.Type).toBe(tt.Type)
        expect(tok.Literal).toBe(tt.Literal)
    })
})
