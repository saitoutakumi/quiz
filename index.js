const answer = document.getElementById("answer");

class Quiz {
  constructor(quizData) {
    this.quizData = quizData;
  }
  getCategory(num) {
    return this.quizData[num].category;
  }
  getType(num) {
    return this.quizData[num].type;
  }
  getDifficulty(num) {
    return this.quizData[num].difficulty;
  }
  getQuestion(num) {
    return this.quizData[num].question;
  }
  getCorrect_answer(num) {
    return this.quizData[num].correct_answer;
  }
  getIncorrect_answers(num) {
    return this.quizData[num].incorrect_answers;
  }
}

let num = 0;

fetch("https://opentdb.com/api.php?amount=10")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
    // 10問分で初期化
    const quiz = new Quiz(res.results);
    const category = quiz.getCategory(num);
    const type = quiz.getType(num);
    const diffculty = quiz.getDifficulty(num);
    const question = quiz.getQuestion(num);
    const correct_answer = quiz.getCorrect_answer(num);
    const incorrect_answers = quiz.getIncorrect_answers(num);
    // クリックされるたびに、showQuizを実行させて、クイズを一問ずつ表示する
    showQuiz(
      category,
      type,
      diffculty,
      question,
      correct_answer,
      incorrect_answers
    );
    answer.addEventListener("click", () => {
      showQuiz(
        quiz.getCategory(num),
        quiz.getType(num),
        quiz.getDifficulty(num),
        quiz.getQuestion(num),
        quiz.getCorrect_answer(num),
        quiz.getIncorrect_answers(num)
      );
    });
  });

// 不正解のボタンを生成する関数
const i_button = document.getElementById("incorrect_answers1");
const creatAnswersbutton = (incorrect_answers) => {
  const i_button = document.createElement("button");
  i_button.innerHTML = incorrect_answers;
  i_button.style.backgroundColor = "lightgray";
  div.appendChild(i_button);
};

const showQuiz = (
  category,
  type,
  difficulty,
  question,
  correct_answer,
  incorrect_answers
) => {
  const quizNu = document.getElementById("num");
  quizNu.innerHTML = "問題" + [num + 1];

  const quizCa = document.getElementById("category");
  quizCa.innerHTML = "「ジャンル」" + category;

  const quizDi = document.getElementById("difficulty");
  quizDi.innerHTML = "「難易度」" + difficulty;

  const quizQu = document.getElementById("question");
  quizQu.innerHTML = question;

  creatAnswersbutton(incorrect_answers);
  // const quizCo_a = document.getElementById("correct_answer");
  // quizCo_a.innerHTML = correct_answer;

  num++;

  // console.log("start showQuiz()");
  // console.log(`${num + 1}問目のデータ`);
  // console.log(category);
  // console.log(type);
  // console.log(diffculty);
  // console.log(question);
  // console.log(correct_answer);
  // console.log(incorrect_answers);
};

// 「ようこそ」「ボタンをクリックしてください」
// クリックしたら画面の切り替え(APIを取得→クリックイベントにする？)
// ボタンを押したら「取得中」「少々お持ちください」を表示（APIを取得）
// クイズ十問分を取得
// 取得したら一問目の詳細を表示
// 選択肢をボタンで表示（オブジェクト内では、「正解」と「不正解」で存在）
// 並びをランダムにする必要あり
// 配列「不正解」の選択肢を一つずつボタンで出力
// 選択肢のボタンがクリックされたら次の問題へ
// 何回正解がクリックされたか取得
// 十問解答したら、終了、正解数を表示
// 「ホームに戻る」で最初に戻る
