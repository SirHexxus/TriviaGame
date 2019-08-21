// Author: James Stacy
// Description: Game Logic For a Simple Trivia Game
// Started: 8-20-2019
// Deployed: TBD

// Global Variable Declarations
var card = $("#contentCard");
var title = $(".contentTitle");
var name = $(".gameTitle");
var startBtn = $(".start-btn");
var rightCounter = wrongCounter = timeoutCounter = 0;
var questionsAndAnswers = {
    set1:{
        question:"Question 1 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    },
    set2:{
        question:"Question 2 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    },
    set3:{
        question:"Question 3 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    },
    set4:{
        question:"Question 4 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    },
    set5:{
        question:"Question 5 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    },
    set6:{
        question:"Question 6 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    },
    set7:{
        question:"Question 7 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    },
    set8:{
        question:"Question 8 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    },
    set9:{
        question:"Question 9 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    },
    set10:{
        question:"Question 10 goes here",
        rightAnswer: "This is the Right Answer",
        wrongAnswers:[ "Wrong Answer 1", "Wrong Answer 2", "Wrong Answer 3"]
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - -
// Function Definitions
// questionTimer
// answerCardTimer
// contentInitializer
// transition

// - - - - - - - - - - - - - - - - - - - - - - - - -
// Game Logic
// when document is ready
    // on click of start button
        // initialize content with first question
        // if correct answer clicked and time not up
            // rightCounter++
            // Show "Got it right screen"
        // if wrong answer clicked and time not up
            // wrongCounter ++
            // Show "Got it wrong screen"
        // if time up before click
            // timeoutCounter++
            // Show "Time's Up screen"
        // initialize next question card
        // repeat 28 - 37