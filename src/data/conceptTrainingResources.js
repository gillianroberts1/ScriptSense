// Training resources for each quiz concept
// Note: 'Emerging' level users should be recommended beginner-level courses.
// If a course is marked 'beginner', it is suitable for both 'beginner' and 'emerging' users.
const conceptTrainingResources = {
  VariablesAndTypes: {
    label: "Variables and Types",
    description:
      "Covers variable declarations, types, type coercion, and related fundamentals in JavaScript.",
    resources: [
      {
        id: "pluralsight-js-fundamentals",
        title: "JavaScript Fundamentals",
        type: "course",
        level: "beginner",
        url: "https://www.pluralsight.com/courses/javascript-fundamentals",
      },
      {
        id: "frontendmasters-js-deep-dive",
        title: "Deep JavaScript Foundations",
        type: "learning path",
        level: "intermediate",
        url: "https://frontendmasters.com/courses/deep-javascript-v3/",
      },
      {
        id: "freecodecamp-js-algorithms",
        title: "JavaScript Algorithms and Data Structures",
        type: "course",
        level: "advanced",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      },
    ],
  },
  FunctionsAndScope: {
    label: "Functions and Scope",
    description:
      "Covers function declarations, expressions, scope, closures, and related topics.",
    resources: [
      {
        id: "udemy-js-functions-beginner",
        title: "JavaScript Functions for Beginners",
        type: "course",
        level: "beginner",
        url: "https://www.udemy.com/course/javascript-essentials/",
      },
      {
        id: "frontendmasters-js-closure-scope",
        title: "JavaScript: Scope & Closures",
        type: "lesson",
        level: "intermediate",
        url: "https://frontendmasters.com/courses/deep-javascript-v3/",
      },
      {
        id: "pluralsight-js-advanced-functions",
        title: "Advanced JavaScript Functions",
        type: "course",
        level: "advanced",
        url: "https://app.pluralsight.com/ilx/video-courses/functions-javascript/course-overview",
      },
    ],
  },
  AsynchronousJS: {
    label: "Asynchronous JavaScript",
    description:
      "Covers callbacks, promises, async/await, and event loop concepts.",
    resources: [
      {
        id: "freecodecamp-js-async",
        title: "Asynchronous JavaScript",
        type: "lesson",
        level: "beginner",
        url: "https://www.freecodecamp.org/news/asynchronous-javascript-explained/",
      },
      {
        id: "pluralsight-js-async-patterns",
        title: "JavaScript Asynchronous Programming",
        type: "course",
        level: "intermediate",
        url: "https://www.pluralsight.com/courses/javascript-asynchronous-programming",
      },
      {
        id: "frontendmasters-js-async-deep-dive",
        title: "Asynchronous JavaScript Deep Dive",
        type: "course",
        level: "advanced",
        url: "https://frontendmasters.com/courses/asynchronous-javascript/",
      },
    ],
  },
  ObjectsAndArrays: {
    label: "Objects and Arrays",
    description:
      "Covers object creation, array methods, manipulation, and related data structures.",
    resources: [
      {
        id: "udemy-js-objects-arrays",
        title: "JavaScript Objects and Arrays",
        type: "course",
        level: "beginner",
        url: "https://frontendmasters.com/courses/getting-started-javascript-v3/",
      },
      {
        id: "freecodecamp-js-arrays-guide",
        title: "JavaScript Array Methods Explained",
        type: "lesson",
        level: "intermediate",
        url: "https://www.udemy.com/course/javascript-coding/",
      },
      {
        id: "pluralsight-js-objects-arrays-advanced",
        title: "Advanced JavaScript Objects and Arrays",
        type: "course",
        level: "advanced",
        url: "https://app.pluralsight.com/ilx/video-courses/javascript-arrays-objects/course-overview",
      },
    ],
  },
  DOMAndEvents: {
    label: "DOM & Events",
    description: "Covers DOM manipulation, event handling, and browser APIs.",
    resources: [
      {
        id: "freecodecamp-js-dom-intro",
        title: "Introduction to the DOM",
        type: "lesson",
        level: "beginner",
        url: "https://www.freecodecamp.org/news/introduction-to-the-dom/",
      },
      {
        id: "frontendmasters-js-dom-events",
        title: "JavaScript and the DOM",
        type: "course",
        level: "intermediate",
        url: "https://frontendmasters.com/courses/hard-parts-ui-dev/",
      },
      {
        id: "udemy-js-dom-events-advanced",
        title: "Advanced JavaScript DOM and Events",
        type: "course",
        level: "advanced",
        url: "https://frontendmasters.com/courses/hard-parts-ui-dev/",
      },
    ],
  },
};

// Dedicated learning paths for each level
export const learningPaths = {
  beginner: {
    levelLabel: "beginner",
    id: "freecodecamp-js-beginner-path",
    title: "JavaScript Basics (Learning Path)",
    type: "learning path",
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
  },
  intermediate: {
    levelLabel: "intermediate",
    id: "pluralsight-js-intermediate-path",
    title: "Intermediate JavaScript (Learning Path)",
    type: "learning path",
    url: "https://app.pluralsight.com/paths/skill/javascript-2022",
  },
  advanced: {
    levelLabel: "advanced",
    id: "frontendmasters-js-advanced-path",
    title: "JavaScript: The Hard Parts (Learning Path)",
    type: "learning path",
    url: "https://frontendmasters.com/learn/professional/",
  },
};

export default conceptTrainingResources;
