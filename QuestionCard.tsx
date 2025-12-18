import React from 'react';
import { Question } from '../types';
import ScratchBlockVisual from './ScratchBlockVisual';

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedOptionId: string | undefined;
  isSubmitted: boolean;
  onSelectOption: (questionId: number, optionId: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  selectedOptionId,
  isSubmitted,
  onSelectOption,
}) => {
  const isCorrect = isSubmitted && selectedOptionId === question.correctOptionId;
  const isWrong = isSubmitted && selectedOptionId !== question.correctOptionId && selectedOptionId !== undefined;
  const showResult = isSubmitted;

  return (
    <div className={`bg-white rounded-2xl shadow-sm border-2 p-6 mb-6 transition-all duration-300 ${
        isSubmitted 
            ? isCorrect 
                ? 'border-green-400 bg-green-50' 
                : 'border-red-400 bg-red-50'
            : 'border-gray-100 hover:border-blue-200'
    }`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Visual Side */}
        <div className="md:w-1/4 flex flex-col justify-center items-center">
            <div className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">
                Category: {question.category}
            </div>
            <ScratchBlockVisual category={question.category} />
        </div>

        {/* Content Side */}
        <div className="md:w-3/4 flex flex-col">
            <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold font-display">
                    {index + 1}
                </span>
                <h3 className="text-lg font-bold text-gray-800 leading-tight pt-1">
                    {question.question}
                </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {question.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isThisCorrect = option.id === question.correctOptionId;
                
                let buttonClass = "relative w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center group ";
                
                if (isSubmitted) {
                    if (isThisCorrect) {
                        buttonClass += "bg-green-100 border-green-500 text-green-900 font-semibold";
                    } else if (isSelected && !isThisCorrect) {
                        buttonClass += "bg-red-100 border-red-500 text-red-900 opacity-80";
                    } else {
                        buttonClass += "bg-gray-50 border-gray-100 text-gray-400";
                    }
                } else {
                    if (isSelected) {
                        buttonClass += "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-sm";
                    } else {
                        buttonClass += "bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:bg-gray-50";
                    }
                }

                return (
                    <button
                        key={option.id}
                        onClick={() => !isSubmitted && onSelectOption(question.id, option.id)}
                        disabled={isSubmitted}
                        className={buttonClass}
                    >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-sm mr-3 border ${
                            isSubmitted && isThisCorrect 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : isSelected 
                                    ? 'bg-indigo-500 border-indigo-500 text-white' 
                                    : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                            {option.id}
                        </span>
                        {option.text}
                        
                        {/* Status Icons */}
                        {showResult && isThisCorrect && (
                            <span className="absolute right-4 text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                        )}
                        {showResult && isSelected && !isThisCorrect && (
                             <span className="absolute right-4 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                             </span>
                        )}
                    </button>
                );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;