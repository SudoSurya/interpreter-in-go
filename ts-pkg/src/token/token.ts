/* Token Types */
export type TokenType = string;

export interface Token {
    Type: TokenType;
    Literal: string;
}

/* Different Tokens */

export enum Tokens {
    ILLEGAL = 'ILLEGAL',
    EOF = 'EOF',

    // Identifiers + literals
    IDENT = 'IDENT', // add, foobar, x, y, ...
    INT = 'INT', // 1343456

    // Operators
    ASSIGN = '=',
    PLUS = '+',

    // Delimiters
    COMMA = ',',
    SEMICOLON = ';',

    LPAREN = '(',
    RPAREN = ')',
    LBRACE = '{',
    RBRACE = '}',

    // Keywords
    FUNCTION = 'FUNCTION',
    LET = 'LET',
}

let keywords: { [key: string]: TokenType } = {
    'fn': Tokens.FUNCTION,
    'let': Tokens.LET,
}

export function LookupIdent(ident: string): TokenType {
    if (keywords[ident]) {
        return keywords[ident];
    }
    return Tokens.IDENT;
}
