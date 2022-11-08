// class User {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }
// const user1 = new User("bob", 23);
// console.log("user1", user1);
// console.log("user1", user1.age);

fetch("https://opentdb.com/api.php?amount=10")
  .then((res) => res.json())
  .then((res) => console.log("res", res))
  .then((res) => new Quiz(res.results))
  .catch((error) => console.log(error));

class Quiz {
  constructor(quizdate) {
    this.quizDate = quizdate;
    this.category = quizdate.category;
    this.type = quizdate.type;
    this.difficulty = quizdate.difficulty;
    this.question = quizdate.question;
    this.correct_answer = quizdate.correct_answer;
    this.incorrect_answers = quizdate.incorrect_answers;
  }
  getCategory() {
    return this.category;
  }
}
