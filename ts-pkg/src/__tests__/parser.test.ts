import { expect, test } from "@jest/globals";
import { Tokenizer } from "../lexer/lexer";
import { newParser } from "../parser/Parser";
import { LetStatement, Statement } from "../parser/ast";

test("let parser ", () => {
    let input = `
    let x = 5;
    let y = 10;
    let foobar = 838383;
    `

    let lexer = new Tokenizer(input);

    let p = newParser(lexer)

    let program = p.ParseProgram();

    if (program == null) {
        console.error("ParseProgram() returned nil")
        return
    }

    if (program.Statements.length != 3) {
        console.error("program.Statements does not contain 3 statements. got=%d", program.Statements.length)
        return
    }

    let tests = [
        { expectedIdentifier: "x" },
        { expectedIdentifier: "y" },
        { expectedIdentifier: "foobar" }
    ]

    for (let i = 0; i < tests.length; i++) {
        let stmt = program.Statements[i]
        if (!testLetStatement(stmt, tests[i].expectedIdentifier)) {
            return
        }
    }
})

function testLetStatement(s: Statement, name: string): boolean {
    if (s.TokenLiteral() != "let") {
        console.error("s.TokenLiteral not 'let'. got=%s", s.TokenLiteral())
        return false
    }
    let letStmt = s as unknown as LetStatement

    if (letStmt.name.value != name) {
        console.error("letStmt.Name.Value not '%s'. got=%s", name, letStmt.name.value)
        return false
    }

    if (letStmt.TokenLiteral() != name) {
        console.error("s.Name not '%s'. got=%s", name, letStmt.name)
        return false
    }

    return true
}
