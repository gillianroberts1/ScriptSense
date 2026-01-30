// Utility functions for localStorage persistence

// Save a new result to the history array
export function saveResults(newResult) {
  const history = loadResultsHistory();
  history.push(newResult);
  localStorage.setItem("quizResultsHistory", JSON.stringify(history));
}

// Load the latest result (for backward compatibility)
export function loadResults() {
  const history = loadResultsHistory();
  return history.length > 0 ? history[history.length - 1] : null;
}

// Load all results history
export function loadResultsHistory() {
  const data = localStorage.getItem("quizResultsHistory");
  if (!data) return [];
  try {
    return JSON.parse(data);
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return [];
  }
}

export function saveTraining(training) {
  localStorage.setItem("trainingData", JSON.stringify(training));
}

export function loadTraining() {
  const data = localStorage.getItem("trainingData");
  if (!data) return null;
  try {
    return JSON.parse(data);
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return null;
  }
}
