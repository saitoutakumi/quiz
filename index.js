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
  answer.addEventListener("click", () => {
    const quiz = quizes.results;
    const quiz10 = new Quiz(quiz);
    const category = quiz10.getCategory(num++);
    const type = quiz10.getType(num++);
    console.log(quiz10);
    console.log("category:", category);
    console.log("type:", type);
    if (num > 10) {
      console.log("finish!!");
    } else {
      ShowQuiz();
    }
  });
};
