# ScriptSense

ScriptSense is an interactive web application designed to help users learn and assess their knowledge of JavaScript concepts through quizzes and training resources. The app provides instant feedback, concept breakdowns, and tracks quiz history for ongoing improvement.

## Features

- **JavaScript Quiz:** Take quizzes on various JavaScript topics and receive instant feedback.
- **Concept Breakdown:** View detailed performance by concept to identify strengths and areas for improvement.
- **Results History:** Track your quiz attempts, scores, and progress over time.
- **Training Resources:** Access curated resources for further learning on each concept.
- **Responsive UI:** Modern, user-friendly interface built with React and Vite.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ScriptSense
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

```
src/
  components/        # Reusable UI components (QuestionCard, ResultsCard, TrainingCard, etc.)
  data/              # Quiz questions and training resources
  pages/             # Main app pages (Home, ResultsPage, TrainingPage, etc.)
  utils/             # Utility functions (assessment, localStorage, etc.)
public/              # Static assets
```

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- CSS

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

MIT

## Author

Gillian Roberts

---

_This application was written by AI as part of an experiment to assess the use of AI in engineering workflows._
