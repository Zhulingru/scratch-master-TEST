import React, { useState, useEffect, useCallback } from 'react';
import { RAW_QUESTIONS } from './constants';
import { Question } from './types';
import { shuffleArray } from './utils';
import QuestionCard from './components/QuestionCard';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Initialize and shuffle questions on mount
  useEffect(() => {
    initializeQuiz();
  }, []);

  const initializeQuiz = useCallback(() => {
    // Shuffle the questions
    const shuffled = shuffleArray(RAW_QUESTIONS);
    
    // Also optional: shuffle options inside questions if we wanted to, 
    // but the prompt implies options are A,B,C,D fixed text, just the question order changes.
    // However, if we shuffle options, the IDs (A,B,C,D) need to remain consistent for display 
    // or be re-mapped. For safety and simplicity based on prompt "randomize questions", 
    // we only shuffle the question array.

    setQuestions(shuffled);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectOption = (questionId: number, optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    // Calculate Score
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionId) {
        calculatedScore += 10;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allAnswered = questions.length > 0 && questions.every(q => userAnswers[q.id]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-scratch-control rounded text-white flex items-center justify-center font-bold text-xl">S</div>
                <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800">Scratch <span className="text-indigo-600">小考題</span></h1>
            </div>
            
            {!isSubmitted ? (
                 <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                 已完成: <span className="text-indigo-600 font-bold">{Object.keys(userAnswers).length}</span> / {questions.length}
               </div>
            ) : (
                <div className="text-lg font-bold">
                    得分: <span className={`text-2xl ${score === 100 ? 'text-green-500' : score >= 60 ? 'text-indigo-600' : 'text-red-500'}`}>{score}</span> / 100
                </div>
            )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Intro Banner (Only visible if not submitted) */}
        {!isSubmitted && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white mb-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-2">六年級基礎測試</h2>
                <p className="opacity-90">請回答以下 10 道題目，每題 10 分。完成後點擊下方按鈕查看成績！</p>
            </div>
        )}

        {/* Result Banner (Only visible if submitted) */}
        {isSubmitted && (
            <div className={`rounded-2xl p-8 text-center mb-8 shadow-lg transition-all transform animate-fade-in-up ${
                score === 100 ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-white' : 
                score >= 60 ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 
                'bg-white border-2 border-red-100 text-gray-800'
            }`}>
                <h2 className="text-3xl font-bold mb-2">
                    {score === 100 ? "太強了！滿分！🏆" : 
                     score >= 80 ? "很棒的成績！🌟" : 
                     score >= 60 ? "及格通過！👍" : 
                     "再接再厲！💪"}
                </h2>
                <p className="opacity-90 text-lg">
                    你在 10 題中答對了 {score / 10} 題。
                </p>
                <button 
                    onClick={initializeQuiz}
                    className="mt-6 bg-white text-indigo-600 font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 transition-transform active:scale-95"
                >
                    再測驗一次
                </button>
            </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
            {questions.map((q, index) => (
                <QuestionCard
                    key={q.id}
                    index={index}
                    question={q}
                    selectedOptionId={userAnswers[q.id]}
                    isSubmitted={isSubmitted}
                    onSelectOption={handleSelectOption}
                />
            ))}
        </div>

      </main>

      {/* Footer Action Bar */}
      {!isSubmitted && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <div className="max-w-3xl mx-auto flex justify-between items-center">
                  <span className="text-sm text-gray-500 hidden md:inline">
                    {allAnswered ? "準備好了嗎？" : "請完成所有題目"}
                  </span>
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-lg shadow-md transition-all transform ${
                        allAnswered 
                        ? 'bg-scratch-control hover:bg-orange-400 text-white hover:-translate-y-1' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    送出答案
                  </button>
              </div>
          </div>
      )}
    </div>
  );
};

export default App;