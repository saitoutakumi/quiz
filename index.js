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
        console.log("お疲れ様でした");
      }
    });
  });

// ？？なぜ下記でダメだったのか(not defined）？？
// const MakeChoices2 = (incorrect_answers, correct_answer) => {
//   const choices2 = incorrect_answers.concat(correct_answer);
//   console.log("練習", choices2);
// };

// 選択肢ボタンを生成する関数
// ??生成したボタンの間を離すにはどうしたら？？
// ??選択肢が変な出方する。（消えない）??
// ???ではなぜ選択肢だけ残ってしまう？問題文等は毎回消える？？
const creatbutton = (incorrect_answers, correct_answer) => {
  answer.innerHTML = "";
  const choices = incorrect_answers.concat(correct_answer);
  console.log("不正解", incorrect_answers);
  console.log("正解", correct_answer);
  choices.forEach((choice, index) => {
    const Cho_button = document.createElement("div");
    answer.appendChild(Cho_button);
    const Cho_button2 = document.createElement("button");
    Cho_button.appendChild(Cho_button2);
    Cho_button2.innerHTML = choice;
    choices.id = "allanswer";
    console.log("id:", choices.id);
    console.log(index, choice);
    Cho_button2.style.backgroundColor = "lightgray";
    // return choices;
  });
};

// 正解をカウントする関数
const countAnswer = () => {
  const allanswer = document.getElementById("allanswer");
  allanswer.addEventListener("click", () => {
    // creatbutton();
    console.log("押されました");
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
  const quizNu = document.getElementById("num");
  quizNu.innerHTML = "問題" + [num + 1];
  const quizCa = document.getElementById("category");
  quizCa.innerHTML = "「ジャンル」" + category;
  const quizDi = document.getElementById("difficulty");
  quizDi.innerHTML = "「難易度」" + difficulty;
  const quizQu = document.getElementById("question");
  quizQu.innerHTML = question;
  creatbutton(incorrect_answers, correct_answer, choices);
  num++;

  //   console.log("start showQuiz()");
  //   console.log(`${num + 1}問目のデータ`);
  //   console.log(category);
  //   console.log(type);
  //   console.log(difficulty);
  //   console.log(question);
  //   console.log(correct_answer);
  //   console.log(incorrect_answers);
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
