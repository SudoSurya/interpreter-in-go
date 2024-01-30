import { Token } from "../token/token";

export interface Node {
    TokenLiteral(): string;
}

export interface Statement extends Node {
    statementNode(): void;
}

export interface Expression extends Node {
    expressionNode(): void;
}

export class Program {
    public Statements: Statement[] = [] as Statement[];

    public TokenLiteral(): string {
        if (this.Statements.length > 0) {
            return this.Statements[0].TokenLiteral()
        } else {
            return ""
        }
    }
}

export class LetStatement {
    public token: Token = {} as Token;
    public name: Identifier = new Identifier()
    public value: Expression = new Identifier()

    public statementNode(): void {
        throw new Error("unimplemented")
    }

    public TokenLiteral(): string {
        return this.token.Literal
    }
}

export class Identifier {
    public token: Token = {} as Token;
    public value: string = "";

    public expressionNode(): void {
        throw new Error("unimplemented")
    }

    public TokenLiteral(): string {
        return this.token.Literal
    }
}
