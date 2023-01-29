const answer = document.getElementById("answer");
const top = document.getElementById("top");

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

const title = document.createElement("div");
top.appendChild(title);
title.innerHTML = "ようこそ";
const s_button = document.createElement("button");
top.appendChild(s_button);
s_button.innerHTML = "スタート";

s_button.addEventListener("click", () => {
  let num = 0;
  let co_n = 0;

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
        if (num < 10) {
          showQuiz(
            quiz.getCategory(num),
            quiz.getType(num),
            quiz.getDifficulty(num),
            quiz.getQuestion(num),
            quiz.getCorrect_answer(num),
            quiz.getIncorrect_answers(num),
            creatbutton(incorrect_answers, correct_answer)
          );
        } else {
          console.log("正解数", co_n);
        }
      });
    });

  // 配列をランダムにする関数
  const shuffleArray = (incorrect_answers, correct_answer) => {
    const choices = incorrect_answers.concat(correct_answer);
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = choices[i];
      choices[i] = choices[j];
      choices[j] = temp;
    }
  };

  // 選択肢ボタンを表示する
  const creatbutton = (incorrect_answers, correct_answer) => {
    answer.innerHTML = "";
    const choices = incorrect_answers.concat(correct_answer);
    shuffleArray(choices);
    choices.forEach((choice, index) => {
      const Cho_button = document.createElement("div");
      answer.appendChild(Cho_button);
      const Cho_button2 = document.createElement("button");
      Cho_button.appendChild(Cho_button2);
      Cho_button2.innerHTML = choice;
      // console.log(index, choice);
      Cho_button2.style.backgroundColor = "lightgray";
      Cho_button2.addEventListener("click", () => {
        if (Cho_button2.innerHTML === correct_answer) {
          co_n++;
          console.log("正解数", co_n);
        }
      });
    });
  };

  const showQuiz = (
    category,
    type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers,
    choices
  ) => {
    const quizNu = document.getElementById("top");
    quizNu.innerHTML = "問題" + [num + 1];
    const quizCa = document.getElementById("category");
    quizCa.innerHTML = "「ジャンル」" + category;
    const quizDi = document.getElementById("difficulty");
    quizDi.innerHTML = "「難易度」" + difficulty;
    const quizQu = document.getElementById("question");
    quizQu.innerHTML = question;
    creatbutton(incorrect_answers, correct_answer, choices);
    num++;
  };
});

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
