function Subject(subject, dvrConDis, dvrOralDis, somme) {
  this.subject = subject;
  this.dvrConDis = dvrConDis;
  this.dvrOralDis = dvrOralDis;
  this.somme = somme;
  this.score = { controle: 0, synthese: 0, oral: 0 };
  this.average = 0;
}

const mat = [
  new Subject("Francais", "visible", "visible", 4),
  new Subject("Math", "visible", "hidden", 3),
  new Subject("Physique", "visible", "visible", 4),
];

const next = document.querySelector(".next-btn");
const prev = document.querySelector(".prev-btn");
const su = document.querySelector("#su");
const calc = document.querySelector("#calc");
const contrle = document.querySelector(".controle");
const oral = document.querySelector(".oral");
const averageDisplay = document.getElementById("average");
const syntheseInput = document.getElementById("synthese");
const oralInput = document.getElementById("oral");
const oralLabel = document.getElementById("oralLabel");
const controleInput = document.getElementById("controle");

averageDisplay.textContent = "Moyen: 0.00 ";
prev.classList.add("hidden");

let num = 0;
let scores = [];
let clicker = false;

function show(num) {
  let sub = mat[num];
  su.textContent = sub.subject;
  contrle.classList.remove("visible", "hidden");
  oral.classList.remove("visible", "hidden");
  contrle.classList.add(sub.dvrConDis);
  oral.classList.add(sub.dvrOralDis);
  if (sub.subject == "Physique") {
    oralLabel.textContent = "Tp:";
  } else {
    oralLabel.textContent = "Oral:";
  }
  syntheseInput.value = sub.score.synthese || "";
  oralInput.value = sub.score.oral || "";
  controleInput.value = sub.score.controle || "";
  averageDisplay.textContent = `Moyen: ${sub.average || "0.00"}`;
}

function update(x) {
  let sub = mat[x];
  let syn = parseFloat(syntheseInput.value) || 0;
  let oralDvr = parseFloat(oralInput.value) || 0;
  let controleDvr = parseFloat(controleInput.value) || 0;

  sub.score.controle = controleDvr;
  sub.score.oral = oralDvr;
  sub.score.synthese = syn;

  syntheseInput.value = oralInput.value = controleInput.value = "";
}

function moy(oral, cont, syne, quo) {
  return ((oral + cont + syne * 2) / quo).toFixed(2);
}

function realTime(x) {
  let sub = mat[x];
  let syn = parseFloat(syntheseInput.value) || 0;
  let oralDvr = parseFloat(oralInput.value) || 0;
  let controleDvr = parseFloat(controleInput.value) || 0;

  sub.score.controle = controleDvr;
  sub.score.oral = oralDvr;
  sub.score.synthese = syn;

  sub.average = moy(
    sub.score.oral,
    sub.score.controle,
    sub.score.synthese,
    sub.somme
  );
  averageDisplay.textContent = `Moyen: ${sub.average || "0.00"}`;
}
next.addEventListener("click", function () {
  let sub = mat[num];
  update(num);
  let gen = moy(
    sub.score.oral,
    sub.score.controle,
    sub.score.synthese,
    sub.somme
  );
  scores.push(gen);
  clicker = false;

  num++;
  if (num >= mat.length - 1) {
    next.classList.add("hidden");
    calc.classList.add("visible");
  }
  prev.disabled = false;
  prev.classList.remove("hidden");
  console.log(scores);
  averageDisplay.textContent = "Moyen: 0.00";
  show(num);
});

prev.addEventListener("click", function () {
  num--;
  clicker = false;
  if (num <= 0) {
    prev.classList.add("hidden");
  }
  scores.pop();
  mat[num].average = 0;
  console.log(scores);
  calc.classList.remove("visible");
  next.classList.remove("hidden");
  averageDisplay.textContent = "Moyen: 0.00";
  show(num);
});

[syntheseInput, oralInput, controleInput].forEach((input) => {
  input.addEventListener("input", function () {
    realTime(num);
  });
});

calc.addEventListener("click", function () {
  if (!clicker) {
    clicker = true;
    let sub = mat[mat.length - 1];
    update(mat.length - 1);
    let gen = moy(
      sub.score.oral,
      sub.score.controle,
      sub.score.synthese,
      sub.somme
    );
    scores.push(gen);
    console.log(scores);
    let res = 0;
    for (let i = 0; i < scores.length; i++) {
      res += parseFloat(scores[i]);
    }
    res = res / 3;
    averageDisplay.textContent = `Moyen: ${res.toFixed(2)}`;
    console.log(mat);
  }
});
