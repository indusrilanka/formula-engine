import { createToken, Lexer, TokenType } from "chevrotain";


enum TokenName {
    WhiteSpace = "WhiteSpace",
    Comma = "Comma",
    keyWords = "keyWords",
    ExchangeCommission = "ExchangeCommission",
    NetSettle = "NetSettle",
    BrokerCommission = "BrokerCommission",
    NumberLiteral = "NumberLiteral",
    Integer = "Integer",
    Float = "Float",
    Exponent = "Exponent",

    AdditionOperator = "AdditionOperator",
    Plus = "Plus",
    Minus = "Minus",
    MultiplicationOperator = "MultiplicationOperator",
    Mul = "Multiply",
    Div = "Divide",
    ExponentiationOperator = "ExponentiationOperator",

    NumberPrePostFix = "NumberPrePostFix",
    Percent = "Percent",
    LParen = "LParen",
    RParen = "RParen",
    VariableStart = "VariableStart",
    VariableEnd = "VariableEnd",

    Min = "Min",
    Max = "Max"
}

const AdditionOperator = createToken({
    name: TokenName.AdditionOperator,
    pattern: Lexer.NA,
});
const Plus = createToken({
    name: TokenName.Plus,
    pattern: /\+/,
    label: 'Plus',
    categories: AdditionOperator,
});
const Minus = createToken({
    name: TokenName.Minus,
    pattern: /-/,
    label: 'Minus',
    categories: AdditionOperator,
});

const MultiplicationOperator = createToken({
    name: TokenName.MultiplicationOperator,
    pattern: Lexer.NA,
});
const Mul = createToken({
    name: TokenName.Mul,
    pattern: /\*/,
    label: 'Multification',
    categories: MultiplicationOperator,
});
const Div = createToken({
    name: TokenName.Div,
    pattern: /\//,
    label: 'Division',
    categories: MultiplicationOperator,
});

const LParen = createToken({
    name: TokenName.LParen,
    label: 'Right Parenthesis',
    pattern: /\(/,
});
const RParen = createToken({
    name: TokenName.RParen,
    label: 'Left Parenthesis',
    pattern: /\)/,
});

const WhiteSpace = createToken({
    name: TokenName.WhiteSpace,
    pattern: /\s+/,
    label: 'White Spaces',
    group: Lexer.SKIPPED,
});

const NumberLiteral = createToken({
    name: TokenName.NumberLiteral,
    label: 'Number Literal',
    pattern: /[0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?/,
});

const keyWords = createToken({
    name: TokenName.keyWords,
    label: 'Keywords',
    pattern: Lexer.NA,
});

const ExchangeCommission = createToken({
    name: TokenName.ExchangeCommission,
    pattern: /ExchangeCommission/,
    label: 'Exchange Commission',
    categories: keyWords,
});

const NetSettle = createToken({
    name: TokenName.NetSettle,
    pattern: /NetSettle/,
    label: 'Net Settle',
    categories: keyWords,
});

const BrokerCommission = createToken({
    name: TokenName.BrokerCommission,
    pattern: /BrokerCommission/,
    label: 'Broker Commission',
    categories: keyWords,
});



const tokensByPriority = [
    WhiteSpace,
    Plus,
    Minus,
    Mul,
    Div,
    LParen,
    RParen,
    AdditionOperator,
    NumberLiteral,
    ExchangeCommission,
    BrokerCommission,
    NetSettle,
    keyWords,
    MultiplicationOperator,
];

export const FormulaLexer = new Lexer(tokensByPriority, {
    ensureOptimizations: true,
});

export type TokenTypeDict = { [key in TokenName]: TokenType };
export const tokens: TokenTypeDict = tokensByPriority.reduce(
    (acc, tokenType) => {
        acc[tokenType.name as keyof TokenTypeDict] = tokenType;
        return acc;
    },
    {} as TokenTypeDict
);