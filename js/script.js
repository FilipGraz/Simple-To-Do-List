/* 
 tablica obiektów 2 obiektu ponieważ możemy sprawdzić jak przykłądowe 2 zadania bedą wyglądały - przykład
 
 content treść zadania, done - boolean frua albo false
 */

{
  const tasks = [
    {
      content: "kupić bilety na samolot",
      done: false,
    },
    {
      content: "uczyc się Frontendu",
      done: true,
    },
  ];

  /*proste funkcje które robią jedną rzecz z tymi zadaniami*/

  const addNewTask = (newTaskContent) => {
    /*addNewTask dodaje nowe zadanie i przyjmuje 1 argument, treść nowego zadania,  dodaje nowe zadanie bez done ponieważ zadanie nie jest a początku nie jest wykonane i odpala funkcje render     */
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (taskIndex) => {
    /* removeTask dostaje tylko index zadania i za pomocą metody splice usuwa zadanie i odpala funkcje render   */
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    /*toggleTaskDone dostaje tylko index zadania i pod konkretnym indexem zmienia wartość done i znowu odpala render  */
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  };

  const bindEvents = () => {
    /*funkcja bindevents bierze wszytskie przyciski do usuwania i za pomomoca querySellectorAll to jest node list później możemy iterować za pomocą forEach i dlatego możemy każdemu z tych przyciskó przypisać ecentlestener click i użyć funkcji remove task (podobnie dla toggleDoneButtons)   */
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  /*funkcja render za każdym razem po jakiejkoklwiek akcji zupełnie od nowa renderuje zawartoś html tej listy (template strings) łącze html z jakimiś wyrażeniami i dlatego czy task jest done to dodaje stylowanie (przekreślenie lub nie)   */
  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li${task.done ? ' style="text-decoration: line-through"' : ""}>
        <button class="js-done">zrobione?</button>
        <button class="js-remove">usuń</button>
          ${task.content}</li$>`;
    }

    document.querySelector(" .js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    /*onFurmSubmit bierze treść co jest wpisana w formularzu (inpucie)  */
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      /*jeżeli jest pusty formularz to nic nie robi  */
      return;
    }

    addNewTask(
      newTaskContent
    ); /*jeżeli jest coś wpisane dodaje nowe zadanie do listy  */
  };

  const init = () => {
    /*funkcja init początkowy render dzięki temu widzimy wpisaną treść na początku  */
    render();

    const form = document.querySelector(
      ".js-form"
    ); /* do formularza dodajemy onform Submit*/

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
