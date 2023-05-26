import { CstNode, tokenMatcher } from "chevrotain";
import { tokens } from "./lexer";
import { FormulaParser } from "./parser";

export interface IVisitor {
    visit(cst: CstNode, state?: any): any;
}

export function createEvalVisitor(parser: FormulaParser): IVisitor {

    const mapping: any = {
        ExchangeCommission: [10, 20, 30],
        BrokerCommission: [10, 20, 30],
        NetSettle: [10, 20, 30]
    };



    const FormulaVisitorBase = parser.getBaseCstVisitorConstructorWithDefaults();

    class InterpreterVisitor extends FormulaVisitorBase {
        constructor() {
            super();
            this.validateVisitor();
        }

        expression(ctx: any, state: any): any {
            return this.visit(ctx.additionExpression, state);
        }

        additionExpression(ctx: any, state: any): any {
            let result = this.visit(ctx.lhs, state);
            if (!ctx.rhs) return result;
            for (let i = 0; i < ctx.rhs.length; i++) {
                const operator = ctx.AdditionOperator[i];
                const value = this.visit(ctx.rhs[i], state);
                if (tokenMatcher(operator, tokens.Plus)) {
                    result += value;
                } else if (tokenMatcher(operator, tokens.Minus)) {
                    result -= value;
                } else {
                    throw new Error(
                        `Unknown operator: ${operator.image} at ${operator.startOffset}`
                    );
                }
            }
            return result;
        }

        multiplicationExpression(ctx: any, state: any): any {
            let result = this.visit(ctx.lhs, state);
            if (!ctx.rhs) return result;
            for (let i = 0; i < ctx.rhs.length; i++) {
                const operator = ctx.MultiplicationOperator[i];
                const value = this.visit(ctx.rhs[i], state);
                if (tokenMatcher(operator, tokens.Multiply)) {
                    result *= value;
                } else if (tokenMatcher(operator, tokens.Divide)) {
                    result /= value;
                } else {
                    throw new Error(
                        `Unknown operator: ${operator.image} at ${operator.startOffset}`
                    );
                }
            }
            return result;
        }

        atomicExpression(ctx: any, state: any): any {
            if (ctx.parenthesisExpression) {
                return this.visit(ctx.parenthesisExpression, state);
            }
            if (ctx.NumberLiteral) {
                return Number.parseFloat(ctx.NumberLiteral[0].image);
            }
            if (ctx.keyWords) {
                // return this.visit(ctx.keyWords, state);
                // const { i } = state;
                const keyword = ctx.keyWords[0].image;
                console.log("keyword: ", keyword);
                return mapping[keyword][1];
            }
        }

        parenthesisExpression(ctx: any, state: any): any {
            return this.visit(ctx.expression, state);
        }
    }

    return new InterpreterVisitor();
}