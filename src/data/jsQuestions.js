// JavaScript Quiz Questions for ScriptSense App
// Each question object has: id, conceptId, questionText, options, correctOptionIndex

const jsQuestions = [
  // Variables and Types (1-6)
  {
    id: 1,
    conceptId: "Variables and types",
    questionText:
      "Which keyword is used to declare a variable that can be reassigned?",
    options: ["const", "let", "static", "define"],
    correctOptionIndex: 1,
  },
  {
    id: 2,
    conceptId: "Variables and types",
    questionText:
      "What is the type of the value returned by typeof null in JavaScript?",
    options: ["object", "null", "undefined", "number"],
    correctOptionIndex: 0,
  },
  {
    id: 3,
    conceptId: "Variables and types",
    questionText: "What will console.log(typeof NaN) output?",
    options: ["undefined", "object", "number", "NaN"],
    correctOptionIndex: 2,
  },
  {
    id: 4,
    conceptId: "Variables and types",
    questionText: "Which of these is NOT a primitive type in JavaScript?",
    options: ["string", "boolean", "array", "number"],
    correctOptionIndex: 2,
  },
  {
    id: 5,
    conceptId: "Variables and types",
    questionText: "What is the result of 2 + '2' in JavaScript?",
    options: ["4", "22", "NaN", "undefined"],
    correctOptionIndex: 1,
  },
  {
    id: 6,
    conceptId: "Variables and types",
    questionText: "Which statement correctly declares a constant variable?",
    options: ["let x = 5;", "const x = 5;", "var x = 5;", "constant x = 5;"],
    correctOptionIndex: 1,
  },

  // Functions and Scope (7-12)
  {
    id: 7,
    conceptId: "functions and scope",
    questionText: "What is the correct way to define a function in JavaScript?",
    options: [
      "function myFunc() {}",
      "def myFunc() {}",
      "func myFunc() {}",
      "define myFunc() {}",
    ],
    correctOptionIndex: 0,
  },
  {
    id: 8,
    conceptId: "functions and scope",
    questionText:
      "What will this code output?\nlet x = 10;\nfunction test() { let x = 20; console.log(x); }\ntest();",
    options: ["10", "20", "undefined", "ReferenceError"],
    correctOptionIndex: 1,
  },
  {
    id: 9,
    conceptId: "functions and scope",
    questionText: "Which of the following is a function expression?",
    options: [
      "function foo() {}",
      "let foo = function() {}",
      "foo: function() {}",
      "def foo() {}",
    ],
    correctOptionIndex: 1,
  },
  {
    id: 10,
    conceptId: "functions and scope",
    questionText:
      "What is the scope of a variable declared with var inside a function?",
    options: ["Global", "Block", "Function", "Module"],
    correctOptionIndex: 2,
  },
  {
    id: 11,
    conceptId: "functions and scope",
    questionText: "What does the return statement do in a function?",
    options: [
      "Exits the function and returns a value",
      "Declares a variable",
      "Calls another function",
      "Pauses the function",
    ],
    correctOptionIndex: 0,
  },
  {
    id: 12,
    conceptId: "functions and scope",
    questionText:
      "What will this code output?\nlet a = 1;\nfunction foo() { a = 2; }\nfoo();\nconsole.log(a);",
    options: ["1", "2", "undefined", "ReferenceError"],
    correctOptionIndex: 1,
  },

  // Asynchronous JS (13-18)
  {
    id: 13,
    conceptId: "Asynchronous JS",
    questionText:
      "Which of these is used to handle asynchronous operations in JavaScript?",
    options: ["Promise", "Loop", "Class", "Object"],
    correctOptionIndex: 0,
  },
  {
    id: 14,
    conceptId: "Asynchronous JS",
    questionText: "What does setTimeout do?",
    options: [
      "Repeats a function forever",
      "Executes a function after a delay",
      "Stops a function",
      "Executes a function immediately",
    ],
    correctOptionIndex: 1,
  },
  {
    id: 15,
    conceptId: "Asynchronous JS",
    questionText:
      "Which keyword is used to pause execution in an async function?",
    options: ["wait", "pause", "await", "stop"],
    correctOptionIndex: 2,
  },
  {
    id: 16,
    conceptId: "Asynchronous JS",
    questionText:
      "What will this code output?\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nconsole.log('C');",
    options: ["A B C", "A C B", "B A C", "C A B"],
    correctOptionIndex: 1,
  },
  {
    id: 17,
    conceptId: "Asynchronous JS",
    questionText: "How do you handle errors in a Promise chain?",
    options: ["with .catch()", "with .error()", "with .fail()", "with .then()"],
    correctOptionIndex: 0,
  },
  {
    id: 18,
    conceptId: "Asynchronous JS",
    questionText: "Which of these is NOT a valid state of a Promise?",
    options: ["pending", "fulfilled", "rejected", "resolved"],
    correctOptionIndex: 3,
  },

  // Objects and Arrays (19-24)
  {
    id: 19,
    conceptId: "Objects and Arrays",
    questionText:
      "How do you access the value of 'name' in this object?\nconst obj = { name: 'Sam' };",
    options: ["obj.name", "obj['name']", "obj(name)", "Both A and B"],
    correctOptionIndex: 3,
  },
  {
    id: 20,
    conceptId: "Objects and Arrays",
    questionText: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctOptionIndex: 0,
  },
  {
    id: 21,
    conceptId: "Objects and Arrays",
    questionText:
      "What will this code output?\nconst arr = [1,2,3];\nconsole.log(arr.length);",
    options: ["2", "3", "4", "undefined"],
    correctOptionIndex: 1,
  },
  {
    id: 22,
    conceptId: "Objects and Arrays",
    questionText: "How do you remove the first element from an array?",
    options: ["pop()", "shift()", "splice()", "remove()"],
    correctOptionIndex: 1,
  },
  {
    id: 23,
    conceptId: "Objects and Arrays",
    questionText: "Which of these is a valid way to create an empty object?",
    options: ["{}", "[]", "Object.create()", "Both A and C"],
    correctOptionIndex: 3,
  },
  {
    id: 24,
    conceptId: "Objects and Arrays",
    questionText: "What does Array.isArray([]) return?",
    options: ["true", "false", "undefined", "null"],
    correctOptionIndex: 0,
  },

  // DOM & Events (25-30)
  {
    id: 25,
    conceptId: "DOM and Events",
    questionText: "Which method selects an element by its ID?",
    options: [
      "getElementById",
      "querySelectorAll",
      "getElementsByClassName",
      "getElementByTagName",
    ],
    correctOptionIndex: 0,
  },
  {
    id: 26,
    conceptId: "DOM and Events",
    questionText: "What does event.preventDefault() do?",
    options: [
      "Stops event propagation",
      "Prevents default browser action",
      "Removes the event listener",
      "Submits the form",
    ],
    correctOptionIndex: 1,
  },
  {
    id: 27,
    conceptId: "DOM and Events",
    questionText: "Which event is fired when a user clicks a button?",
    options: ["mouseover", "keydown", "click", "submit"],
    correctOptionIndex: 2,
  },
  {
    id: 28,
    conceptId: "DOM and Events",
    questionText: "How do you add a click event listener to a button in JS?",
    options: [
      "button.addEventListener('click', handler)",
      "button.onClick(handler)",
      "button.click(handler)",
      "button.addEvent('click', handler)",
    ],
    correctOptionIndex: 0,
  },
  {
    id: 29,
    conceptId: "DOM and Events",
    questionText: "What does document.createElement('div') do?",
    options: [
      "Creates a new div element",
      "Selects a div element",
      "Deletes a div element",
      "Clones a div element",
    ],
    correctOptionIndex: 0,
  },
  {
    id: 30,
    conceptId: "DOM and Events",
    questionText: "Which property changes the text inside an HTML element?",
    options: ["innerText", "value", "textContent", "Both A and C"],
    correctOptionIndex: 3,
  },
];

// Quiz meta info
export const jsQuizMeta = {
  language: "JavaScript",
};

export default jsQuestions;
