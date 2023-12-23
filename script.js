// 1. we will convert the input into Number;
// 2. startNewTimer will get the values of hh mm ss .
// 3. now we need to convert everything into seconds because
//    thats how we get the time. if h=2; then sec=h*3600;
//    if m=20 then sec=m*60; and sec is sec.
// 4. we add all the seconds. we get total time in sec.
// 5 then we create a new timer
const activeTimer = document.querySelector(".active-timers");
// here get collect data
function startNewTimer() {
  // || is for when no value is entered by user
  const hours = document.getElementById("hours").value || 0;
  const minutes = document.getElementById("minutes").value || 0;
  const seconds = document.getElementById("seconds").value || 0;
  // validate the entered hours,min and sec
  if (!hours && !minutes && !seconds) {
    alert("Please Enter valid time");
    return;
  }
  const totalTime =
    Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
  // as time is calculated we need to create timers
  //  we will call the create timer function.

  createTimer(totalTime);
}

function createTimer(totalTime) {
  // to display Data
  const timerDiv = document.createElement("div");
  timerDiv.classList.add("timer");
  const time = document.createElement("span");
  time.classList.add("time");
  timerDiv.appendChild(time);
  // buttons
  //stop button
  const stopBtn = document.createElement("button");
  stopBtn.textContent = "STOP";
  stopBtn.classList.add("timerBtn");
  stopBtn.onclick = () => {
    clearInterval(timer);
    stopBtn.textContent = "Play";
  };
  timerDiv.appendChild(stopBtn);
  //delet timer button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "DELETE";
  deleteBtn.classList.add("timerBtn");
  deleteBtn.onclick = () => {
    // remove the timer div (.remove)
    clearInterval(timer);
    activeTimer.removeChild(timerDiv);
  };
  timerDiv.appendChild(deleteBtn);
  // the TIMER
  const timer = setInterval(() => {
    totalTime--;
    // Now to display the time we need to convert it back.
    const Dhour = Math.floor(totalTime / 3600);
    const Dminutes = Math.floor((totalTime % 3600) / 60);
    const Dseconds = Math.floor(totalTime % 60);
    // %60 to get in hours.
    time.textContent = `Time Left : ${Dhour} : ${Dminutes} : ${Dseconds}`;

    if (totalTime<=0) {
      let audio = new Audio("./bell.mp3");
      audio.play();
      clearInterval(timer);
      time.textContent = "TIME'S UP !";
      timerDiv.removeChild(stopBtn);
      //   timerDiv.removeChild(deleteBtn);
      deleteBtn.style.backgroundColor = "#34344A";
      deleteBtn.style.color = "#F0F757";

      timerDiv.style.color = "#34344A";
      timerDiv.style.backgroundColor = "#F0F757";
    }
  }, 1000);

  activeTimer.appendChild(timerDiv);
}
