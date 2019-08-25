// Author: James Stacy
// Description: Game Logic For a Simple D&D 5e Trivia Game
// Started: 8-20-2019
// Deployed: TBD

// Global Variable Declarations
var card = $("#contentCard");
var rightCounter = wrongCounter = timeoutCounter = 0;
var questCounter = 0;
var timer;
var questionArray = [];
var questionsAndAnswers = {
    set1:{
        question:"What Does 'D&D' Stand For?",
        rightAnswer: "Dungeons & Dragons",
        answers:[ "It Doesn't Stand For Anything. It's Just The Name.", "Dorks & Dweebs", "Demons & Devils.", "Dungeons & Dragons"]
    },
    set2:{
        question:"In D&D, Your Character's Job Is Represented By A Title Called A Class. Which Of These Is *NOT* A Standard Class in D&D 5th Edition?",
        rightAnswer: "Hunter",
        answers:[ "Paladin", "Wizard", "Rogue", "Hunter"]
    },
    set3:{
        question:"Which Of These Is A Weapon That Wizards Are Naturally Proficient With?",
        rightAnswer: "Dagger",
        answers:[ "Greatsword", "Longbow", "Mace", "Dagger"]
    },
    set4:{
        question:"Which Of These Is The 'Default Setting' Of D&D 5e?",
        rightAnswer: "The Forgotten Realms",
        answers:[ "Eberron", "Greyhawk", "Ludira", "The Forgotten Realms"]
    },
    set5:{
        question:"If A Spell Has A Somatic Component...",
        rightAnswer: "The Caster Must Have At Least One Hand Free To Cast",
        answers:[ "The Spell Is Cast By Dancing", "The Component Is Used Up When The Spell Is Cast", "Only Wizards Can Cast It", "The Caster Must Have At Least One Hand Free To Cast"]
    },
    set6:{
        question:"Bards Are Considered One Of The Most Versatile Classes Because Of Which Class Ability?",
        rightAnswer: "Jack Of All Trades",
        answers:[ "Inspiration", "Mystic Secrets", "Fighting Style", "Jack Of All Trades"]
    },
    set7:{
        question:"Most Actions Are Completed Based On Dice Rolls. What Is The Single Most Important Die In D&D?",
        rightAnswer: "The 20-Sided Die",
        answers:[ "The White Die", "It's Different From Character To Character", "Percentage Dice", "The 20-Sided Die"]
    },
    set8:{
        question:"One Of The People In Any Given Game Of D&D Is Responsible For Describing The Scene, Setting The Difficulty Of Encounters, And Playing The Monsters And Non-Player Characters. What Are They Called?",
        rightAnswer: "The Dungeon Master",
        answers:[ "The Game Manager", "The Overlord", "The Storyteller", "The Dungeon Master"]
    },
    set9:{
        question:"If A Character Is Described As 'Lawful-Good', We Are Refferring To The Character's...",
        rightAnswer: "Alignment",
        answers:[ "Moral-Compass", "Ideals", "Character Rating", "Alignment"]
    },
    set10:{
        question:"The Creature That Inspired This D&D Race Are The Hobbits From Tolkien's Middle-Earth. But What Are They Called In D&D?",
        rightAnswer: "Halflings",
        answers:[ "Midgets", "Dwarves", "'Little People'", "Halflings"]
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - -
// Function Definitions
// initialize contentCard
var initializeCard = function() {
    // console.log("In initializeCard");
    // reset timer
    // console.log("clearing timer");
    clearTimeout(timer);
    // empty out the Content Card
    card.empty();
}

// set timer for question
var questionTimer = function() {
    // console.log("starting Question Timer");
    timer = setTimeout(function() {
        // if time up before click
        if (isDone()){
            endCard();
        }
        else {
            timeoutCounter++;
            transition("timeUp", questionArray[questCounter]);
        }
    }, 15*1000 );
};

// create Q&A card
var questionCard = function(set) {
    // console.log("In questionCard");
    // initialize card
    initializeCard();

    // create elements for each piece of the set
    var questHead = $("<h2>");
    var ansDivs = $("<ol>");

    // randomize answers array
    // console.log(set);
    set.answers.sort(function(a, b){return 0.5 - Math.random()});
    // console.log("answers randomized");

    // insert set data into their elements
    questHead.text("Question #" + (questCounter+1) + ": " + set.question);
    for (var i = 0; i < set.answers.length; i++) {
        var newDiv = $("<li>");
        newDiv.html("<h3>" + set.answers[i] + "</h3>");
        newDiv.addClass("answer");
        if (set.answers[i] === set.rightAnswer) {
            newDiv.attr("isRight", true);
        }
        else {
            newDiv.attr("isRight", false);
        }
        ansDivs.append(newDiv);
        // console.log("answer #" + i + " added")
    }

    // append elements to contentCard
    card.append(questHead, $("<hr>"), ansDivs);
    questionTimer();
};

//  create transition card
var transition = function(whichOne, nextSet) {
    // console.log("In transition");
    // initialize card
    initializeCard();

    // choose which card to display
    switch (whichOne) {
        // if answer correct
        case "correct":
            // console.log("You got it right!");
            // display correct answer card
            var title = $("<h2>");
            var stuff = $("<h4>");
            title.text("Correct!");
            stuff.html(questionArray[questCounter-1].question + "<br><hr><br>" + questionArray[questCounter-1].rightAnswer + "<br>Was the correct answer.<br>Right: " + rightCounter + " || Wrong: " + wrongCounter + " || Timed Out: " + timeoutCounter);

            // append elements to contentCard
            card.append(title, stuff);
            break;
        // if answer incorrect
        case "incorrect":
            // console.log("You got it wrong");
            // display incorrect answer card
            var title = $("<h2>");
            var stuff = $("<h4>");
            title.text("Incorrect!");
            stuff.html(questionArray[questCounter-1].question + "<br><hr><br>" + questionArray[questCounter-1].rightAnswer + "<br>Was the correct answer.<br>Right: " + rightCounter + " || Wrong: " + wrongCounter + " || Timed Out: " + timeoutCounter);

            // append elements to contentCard
            card.append(title, stuff);
            break;
        // if time runs out
        case "timeUp":
            // console.log("Time's up!");
            // display timeUp card
            var title = $("<h2>");
            var stuff = $("<h4>");
            title.text("Time's Up!");
            stuff.html(questionArray[questCounter-1].question + "<br><hr><br>" + questionArray[questCounter-1].rightAnswer + "<br>Was the correct answer.<br>Right: " + rightCounter + " || Wrong: " + wrongCounter + " || Timed Out: " + timeoutCounter);

            // append elements to contentCard
            card.append(title, stuff);
            break;
    }

    //start transition timer
    // console.log("starting transition timer");
    timer = setTimeout(function() {
        questionCard(nextSet);
    }, 5*1000 );
};

// checking to see if finished
var isDone = function() {
    if (questCounter < 9) {
        questCounter++;
        return false;
    }
    else if (questCounter >= 9) {
        return true;
    }
};

var endCard = function() {
    // console.log("In endCard");
    initializeCard();
    var winLose;
    var title = $("<h2>");
    var subtitle =$("<h3>");
    var stuff = $("<h4>");
    if (rightCounter > (wrongCounter + timeoutCounter) ) {
        winLose = "You Win!<br>";
    }
    else if (rightCounter <= (wrongCounter + timeoutCounter) ) {
        winLose = "You Lost...<br>But "
    }
    title.html(winLose + "Thank You For Playing!");
    subtitle.text("Game will restart in a few seconds!");
    stuff.text("Right: " + rightCounter + " || Wrong: " + wrongCounter + " || Timed Out: " + timeoutCounter);

    // append elements to contentCard
    card.append(title, subtitle, "<br><hr><br>", stuff);
    // console.log("Game Over!")
    timer = setTimeout(function() {
        questCounter = 0;
        rightCounter = 0;
        wrongCounter = 0;
        timeoutCounter = 0;
        questionCard(questionArray[0]);
    }, 20*1000 );
};

// - - - - - - - - - - - - - - - - - - - - - - - - -
// Game Logic
// when document is ready
$(document).ready(function() {
    // push sets into array
    for (var x in questionsAndAnswers) {
        questionArray.push(questionsAndAnswers[x]);
    }

    // randomize question order
    questionArray.sort(function(a, b){return 0.5 - Math.random()});

    // on click of start button
    $("#start").on("click", function() {
        // create a Q&A card with current set
        questionCard(questionArray[questCounter]);
    });
    
    // on click of an answer
    $(document).on("click", ".answer", function() {
        // if correct answer clicked and time not up
        if ($(this).attr("isRight") === "true") {
            rightCounter++;
            if (isDone()) {
                endCard();
            }
            else {
                transition("correct", questionArray[questCounter]);
            }
        }
        // if wrong answer clicked and time not up
        else if ($(this).attr("isRight") === "false") {
            wrongCounter++;
            if (isDone()) {
                endCard();
            }
            else {
                transition("incorrect", questionArray[questCounter]);
            }
        }
    });
});