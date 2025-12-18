import * as XLSX from 'xlsx';
import { Question } from '../types';

interface ExportData {
  questions: Question[];
  userAnswers: Record<number, string>;
  score: number;
  totalQuestions: number;
}

export const exportToExcel = (data: ExportData) => {
  const { questions, userAnswers, score, totalQuestions } = data;
  
  // 準備工作表 1：測驗結果摘要
  const summaryData = [
    ['Scratch 小考題 - 測驗結果'],
    [''],
    ['測驗日期', new Date().toLocaleString('zh-TW')],
    ['總分', `${score} / ${totalQuestions * 10}`],
    ['答對題數', `${score / 10} / ${totalQuestions}`],
    ['正確率', `${((score / (totalQuestions * 10)) * 100).toFixed(1)}%`],
    [''],
  ];

  // 準備工作表 2：詳細答案
  const detailData = [
    ['題號', '題目', '你的答案', '正確答案', '是否正確', '類別'],
  ];

  questions.forEach((q, index) => {
    const userAnswer = userAnswers[q.id] || '未作答';
    const correctAnswer = q.correctOptionId;
    const isCorrect = userAnswer === correctAnswer;
    const userAnswerText = q.options.find(opt => opt.id === userAnswer)?.text || userAnswer;
    const correctAnswerText = q.options.find(opt => opt.id === correctAnswer)?.text || correctAnswer;

    detailData.push([
      index + 1,
      q.question,
      userAnswerText,
      correctAnswerText,
      isCorrect ? '✓' : '✗',
      q.category,
    ]);
  });

  // 創建工作簿
  const wb = XLSX.utils.book_new();
  
  // 創建工作表
  const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
  const ws2 = XLSX.utils.aoa_to_sheet(detailData);

  // 設置列寬
  ws1['!cols'] = [{ wch: 15 }, { wch: 30 }];
  ws2['!cols'] = [
    { wch: 6 },   // 題號
    { wch: 50 },  // 題目
    { wch: 25 },  // 你的答案
    { wch: 25 },  // 正確答案
    { wch: 10 },  // 是否正確
    { wch: 15 },  // 類別
  ];

  // 添加工作表到工作簿
  XLSX.utils.book_append_sheet(wb, ws1, '測驗摘要');
  XLSX.utils.book_append_sheet(wb, ws2, '詳細答案');

  // 生成檔案名稱
  const fileName = `Scratch測驗結果_${new Date().toISOString().split('T')[0]}.xlsx`;

  // 下載檔案
  XLSX.writeFile(wb, fileName);
};

