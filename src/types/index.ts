export interface Course {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  level: string
  description: string
  topics: string[]
  totalTopics: number
  estimatedHours: number
}

export interface Topic {
  id: string
  title: string
  subtitle: string
  icon: string
  estimatedMinutes: number
  theory: string
  quiz: QuizQuestion[]
  flashcards: Flashcard[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface Flashcard {
  front: string
  back: string
}

export interface Progress {
  courseId: string
  topicId: string
  completed: boolean
  quizScore: number
  lastSeen: string
}
