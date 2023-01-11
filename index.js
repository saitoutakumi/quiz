// class User {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }
// const user1 = new User("bob", 23);
// console.log("user1", user1);
// console.log("user1", user1.age);

const answer = document.getElementById("answer");

fetch("https://opentdb.com/api.php?amount=10")
  .then((res) => {
    return res.json();
  })

  .then((results) => {
    ShowQuiz(results);
  })

  .catch((error) => console.log(error));

class Quiz {
  // Quizというクラス
  constructor(quizData) {
    this.quizData = quizData;
  }
  getCategory(num) {
    return this.quizData[num].category;
  }
  getType(num) {
    return this.quizData[num].type;
  }
}

let num = 0;
const ShowQuiz = (quizes) => {
  const quiz = quizes.results;
  const quiz10 = new Quiz(quiz);
  const category = quiz10.getCategory(num);
  const type = quiz10.getType(num);
  answer.addEventListener("click", () => {
    console.log(quiz10);
    if (num < 10) {
      num++;
      ShowQuiz(quizes);
      console.log("category:", category);
      console.log("type:", type);
      console.log(num);
    } else {
      console.log("finish!!");
    }
  });
};

//なんかで一つずつクイズを表示させる必要がありそう？？

//ワンクリックで複数クイズが表示されてしまう
//試しにconst category = quiz10.getCategory(4);
//などと記載しても５問目のクイズが表示される。
//→任意のクイズナンバーを受け取っている
