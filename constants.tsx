import { Question, BlockCategory } from './types';

export const RAW_QUESTIONS: Question[] = [
  {
    id: 1,
    category: BlockCategory.Events,
    question: "哪一個積木可以讓故事「開始」？",
    correctOptionId: "A",
    options: [
      { id: "A", text: "當綠旗被點擊" },
      { id: "B", text: "重複無限次" },
      { id: "C", text: "說出「開始了」" },
      { id: "D", text: "切換到背景「start」" }
    ]
  },
  {
    id: 2,
    category: BlockCategory.Events,
    question: "如果角色被追到，要切換成「逃跑場景」，最合適的方式是：",
    correctOptionId: "B",
    options: [
      { id: "A", text: "切換造型 → 等待 2 秒" },
      { id: "B", text: "廣播訊息「逃跑」" },
      { id: "C", text: "永遠重複 → 角色移動" },
      { id: "D", text: "y 改變 -10" }
    ]
  },
  {
    id: 3,
    category: BlockCategory.Looks,
    question: "哪一個積木可以切換到故事的下一個背景？",
    correctOptionId: "C",
    options: [
      { id: "A", text: "切換造型到（下一個）" },
      { id: "B", text: "隱藏／顯示" },
      { id: "C", text: "切換背景到（下一個背景）" },
      { id: "D", text: "等待 1 秒" }
    ]
  },
  {
    id: 4,
    category: BlockCategory.Motion,
    question: "以下哪一個動作「會把角色瞬間移動到指定位置」？",
    correctOptionId: "D",
    options: [
      { id: "A", text: "x 改變 10" },
      { id: "B", text: "y 改變 -10" },
      { id: "C", text: "面向 90 度" },
      { id: "D", text: "定位到 x:0, y:100" }
    ]
  },
  {
    id: 5,
    category: BlockCategory.Looks,
    question: "哪一個積木最常用來讓角色看起來像在走路？",
    correctOptionId: "A",
    options: [
      { id: "A", text: "切換到下一個造型" },
      { id: "B", text: "切換背景" },
      { id: "C", text: "设置大小為 100%" },
      { id: "D", text: "永遠重複" }
    ]
  },
  {
    id: 6,
    category: BlockCategory.Events,
    question: "如果你想做「點小女孩一下，她就會說話」，應使用哪個事件？",
    correctOptionId: "B",
    options: [
      { id: "A", text: "當背景切換時" },
      { id: "B", text: "當角色被點擊" },
      { id: "C", text: "當按鍵被按下" },
      { id: "D", text: "當綠旗被點擊" }
    ]
  },
  {
    id: 7,
    category: BlockCategory.Looks,
    question: "想讓角色 A 先說完話，再換角色 B 說話，最常用的是哪種方式？",
    correctOptionId: "A",
    options: [
      { id: "A", text: "A 說 2 秒 → B 說 2 秒" },
      { id: "B", text: "永遠重複 → 兩人都說" },
      { id: "C", text: "切換造型" },
      { id: "D", text: "改變角色大小" }
    ]
  },
  {
    id: 8,
    category: BlockCategory.Events,
    question: "如果想做「角色 A 說完話後通知角色 B 開始說」，該用哪個積木？",
    correctOptionId: "B",
    options: [
      { id: "A", text: "改變顏色效果" },
      { id: "B", text: "廣播訊息「輪到你」" },
      { id: "C", text: "變數加 1" },
      { id: "D", text: "面向角色 B" }
    ]
  },
  {
    id: 9,
    category: BlockCategory.Control,
    question: "哪種情境最適合使用「永遠重複」？",
    correctOptionId: "B",
    options: [
      { id: "A", text: "x改變10" },
      { id: "B", text: "播放一次音效" },
      { id: "C", text: "說一句話" },
      { id: "D", text: "切換場景一次" }
    ]
  },
  {
    id: 10,
    category: BlockCategory.Looks,
    question: "下列哪一項「不會」改變角色造型？",
    correctOptionId: "B",
    options: [
      { id: "A", text: "切換造型到「笑臉」" },
      { id: "B", text: "設定大小為 150%" },
      { id: "C", text: "切換到下一個造型" },
      { id: "D", text: "更換為不同角色的造型" }
    ]
  }
];