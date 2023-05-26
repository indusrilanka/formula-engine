import { Component, Inject, Pipe, PipeTransform } from '@angular/core';
import { Lexer, createSyntaxDiagramsCode } from 'chevrotain';
import { FormulaLexer, tokens } from 'src/utill/lexer';

import { FormulaParser } from 'src/utill/parser';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormulaEngine } from 'src/utill/engin';
import { log } from 'console';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any) {
    console.log(this.sanitizer.bypassSecurityTrustHtml(value))

    const html = this.sanitizer.bypassSecurityTrustHtml(value);
    console.log('hello', html);
    return html;
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formula-engine';
  userHtml: any;

  public result: any;

  words = [
    "Apple",
    "Pencil",
    "Pen",
    "Chair",
    "Helmet",
    "Grapes",
    "Tub",
    "Trophy",
    "Cookie",
    "Donut",
    "Shirt",
    "Bat",
    "Ash",
    "Bell",
    "Chat",
    "Ball",
    "Eye",
    "Fish",
    "Zip",
    "Game",
    "Juice",
    "Orange",
    "Fan",
    "Ice",
  ];

  suggestion = "";
  profileForm = new FormGroup({
    name: new FormControl(''),

  });

  /**
   *
   */
  constructor(@Inject(DOCUMENT) private document: any) {

    this.run();

    this.words.sort();

    console.log(this.words);
    this.clearSuggestion();

    // this.profileForm.patchValue({
    //   name: 'Apple',
    // });

    this.profileForm.valueChanges.subscribe(value => {
      this.onValueChange(value);
    })

    let wo: any = 'Hello';

    for (let i in wo) {
      console.log(i);
    }





    // const parser = new FormulaParser()

    // function run(code: string) {

    //   const result = FormulaLexer.tokenize(code)
    //   parser.reset();
    //   parser.input = result.tokens

    //   const cst = parser.expression();

    //   if (!cst || parser.errors.length > 0) {
    //     console.log("Parsing error", parser.errors);
    //     return;
    //   }

    //   return cst;
    // }

    // // var container = document.getElementById("container");

    // this.userHtml = createSyntaxDiagramsCode(parser.getSerializedGastProductions());


    // // document.write(createSyntaxDiagramsCode(parser.getSerializedGastProductions()))

    // console.log(run('(5*BrokerCommission/0'));

  }

  clearSuggestion() {
    this.suggestion = "";
  }

  caseCheck(word: any, input: any) {
    //Array of characters
    word = word.split("");
    let inp = input;
    //loop through every character in ino
    for (let i in inp) {
      //if input character matches with character in word no need to change
      if (inp[i] == word[i]) {
        continue;
      } else if (inp[i].toUpperCase() == word[i]) {
        //if inp[i] when converted to uppercase matches word[i] it means word[i] needs to be lowercase
        word.splice(i, 1, word[i].toLowerCase());
      } else {
        //word[i] needs to be uppercase
        word.splice(i, 1, word[i].toUpperCase());
      }
    }
    //array to string
    return word.join("");
  };

  onValueChange(input: any) {
    this.clearSuggestion();
    //Convert input value to regex since string.startsWith() is case sensitive
    let regex = new RegExp("^" + input.name, "i");
    //loop through words array
    for (let i in this.words) {
      //check if input matches with any word in words array
      if (regex.test(this.words[i]) && input.name != "") {
        //Change case of word in words array according to user input
        this.words[i] = this.caseCheck(this.words[i], input.name);
        //display suggestion
        this.suggestion = this.words[i];
        break;
      }
    }
  }


  run() {
    const formula = '(5*BrokerCommission/0)'
    const formulaEngine = new FormulaEngine();
    this.result = formulaEngine.exec(formula);
  }
}
