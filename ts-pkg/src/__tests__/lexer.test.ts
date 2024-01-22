import { expect, test } from "@jest/globals";
import { Tokens } from "../token/token";
import { LexerClass } from "../lexer/lexer";
test("lexer test", () => {
    const input = `let five = 5;
                    let ten = 10;
    let add = fn(x, y) {
        x + y;
    };
    let result = add(five, ten);
    `
    const tests = [
        { Type: Tokens.LET, Literal: "let" },
        { Type: Tokens.IDENT, Literal: "five" },
        { Type: Tokens.ASSIGN, Literal: "=" },
        { Type: Tokens.INT, Literal: "5" },
        { Type: Tokens.SEMICOLON, Literal: ";" },
        { Type: Tokens.LET, Literal: "let" },
        { Type: Tokens.IDENT, Literal: "ten" },
        { Type: Tokens.ASSIGN, Literal: "=" },
        { Type: Tokens.INT, Literal: "10" },
        { Type: Tokens.SEMICOLON, Literal: ";" },
        { Type: Tokens.LET, Literal: "let" },
        { Type: Tokens.IDENT, Literal: "add" },
        { Type: Tokens.ASSIGN, Literal: "=" },
        { Type: Tokens.FUNCTION, Literal: "fn" },
        { Type: Tokens.LPAREN, Literal: "(" },
        { Type: Tokens.IDENT, Literal: "x" },
        { Type: Tokens.COMMA, Literal: "," },
        { Type: Tokens.IDENT, Literal: "x" },
        { Type: Tokens.PLUS, Literal: "+" },
        { Type: Tokens.IDENT, Literal: "y" },
        { Type: Tokens.SEMICOLON, Literal: ";" },
        { Type: Tokens.RBRACE, Literal: "}" },
        { Type: Tokens.SEMICOLON, Literal: ";" },
        { Type: Tokens.LET, Literal: "let" },
        { Type: Tokens.IDENT, Literal: "result" },
        { Type: Tokens.ASSIGN, Literal: "=" },
        { Type: Tokens.IDENT, Literal: "add" },
        { Type: Tokens.LPAREN, Literal: "(" },
        { Type: Tokens.IDENT, Literal: "five" },
        { Type: Tokens.COMMA, Literal: "," },
        { Type: Tokens.IDENT, Literal: "ten" },
        { Type: Tokens.RPAREN, Literal: ")" },
        { Type: Tokens.SEMICOLON, Literal: ";" },
        { Type: Tokens.EOF, Literal: "" },
    ]

    const l = new LexerClass(input)

    tests.forEach((tt) => {
        const tok = l.NextToken()
        console.log(tok)
        expect(tok.Type).toBe(tt.Type)
        expect(tok.Literal).toBe(tt.Literal)
    })
})
