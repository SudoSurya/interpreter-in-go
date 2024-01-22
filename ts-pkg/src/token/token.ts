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
    MINUS = '-',
    BANG = '!',
    ASTERISK = '*',
    SLASH = '/',

    LT = '<',
    GT = '>',

    EQ = '==',
    NOT_EQ = '!=',

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
    TRUE = 'TRUE',
    FALSE = 'FALSE',
    IF = 'IF',
    ELSE = 'ELSE',
    RETURN = 'RETURN',
}

let keywords: { [key: string]: TokenType } = {
    'fn': Tokens.FUNCTION,
    'let': Tokens.LET,
    'true': Tokens.TRUE,
    'false': Tokens.FALSE,
    'if': Tokens.IF,
    'else': Tokens.ELSE,
    'return': Tokens.RETURN,
}

export function LookupIdent(ident: string): TokenType {
    if (keywords[ident]) {
        return keywords[ident];
    }
    return Tokens.IDENT;
}
