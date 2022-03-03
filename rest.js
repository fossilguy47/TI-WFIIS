window.onload = elementsLoad();

var request;
var objJSON;



function getRequestObject()      {
   if ( window.ActiveXObject)  {
      return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
   } else if (window.XMLHttpRequest)  {
      return (new XMLHttpRequest())  ;
   } else {
      return (null) ;
   }
}


function LoginWrapper(){//funkcja wyswietlajaca formularz logowania 
   var login = "<div class=\"text_center\"><input type=\"text\" id=\"log\" class=\"form-control\" placeholder=\"Proszę podać login\"> <br> <input type=\"password\" class=\"form-control\" id=\"pass\" placeholder=\"Proszę podać hasło\"> <br><br> <button type=\"button\" class=\"btn btn-dark\" onclick=\"Login(); return false;\">Zaloguj się</button></div>"
   document.getElementById("wyswietlacz").innerHTML = login;
}


function RegisterWrapper(){//funkcja wyswietlajaca formularz rejestracji
   var register = "<div class=\"text_center\"><input type=\"text\" class=\"form-control\" id=\"reg_log\" placeholder=\"Proszę podać login\"> <br> <input type=\"password\" class=\"form-control\" id=\"reg_pass\" placeholder=\"Proszę podać hasło\"> <br> <input type=\"password\" class=\"form-control\" id=\"reg_pass_check\" placeholder=\"Proszę powtórzyć hasło\"> <br><br> <button type=\"button\" class=\"btn btn-dark\" onclick=\"Register(); return false;\">Zarejestruj się</button></div>"
   document.getElementById("wyswietlacz").innerHTML = register;
}


function QuestionsWrapper(){//funkcja wyswietlajaca formularz ankiety
   var questions = "<h2>Oceń prowadzącego w poszczególnych aspektach w skali od 1 do 10.</h2> <br><br><h4>Przygotowanie prowadzącego do zajęć.</h4><br> ";
    questions += "tragicznie - 0 <input type=\"range\" id=\"q1_1\" min =\"0\" max=\"10\" name=\"q1\" oninput=\"num1.value = this.value\" > 10 - idealnie <br><output id=\"num1\">5</output>";

   questions += "<br><br><h4>Ciekawość przygotowanych materiałów.</h4><br> ";
   questions += "tragicznie - 0 <input type=\"range\" id=\"q2_1\" min =\"0\" max=\"10\" name=\"q2\" oninput=\"num2.value = this.value\" > 10 - idealnie <br><output id=\"num2\">5</output>";
   
   questions += "<br><br><h4>Podejście do studentów.</h4><br> ";
   questions += "tragicznie - 0 <input type=\"range\" id=\"q3_1\" min =\"0\" max=\"10\" name=\"q3\" oninput=\"num3.value = this.value\" > 10 - idealnie <br><output id=\"num3\">5</output>";
 
   questions += "<br><br><h4>Punktualność.</h4><br> ";
   questions += "tragicznie - 0 <input type=\"range\" id=\"q4_1\" min =\"0\" max=\"10\" name=\"q4\" oninput=\"num4.value = this.value\" > 10 - idealnie <br><output id=\"num4\">5</output>";

   questions += "<br><br><h4>Jasno określa i stosuje zasady zalcizenia.</h4><br>";
   questions += "tragicznie - 0 <input type=\"range\" id=\"q5_1\" min =\"0\" max=\"10\" name=\"q5\" oninput=\"num5.value = this.value\" > 10 - idealnie <br><output id=\"num5\">5</output>";

   questions += "<br><br>Wybierz Twoim zdaniem najlepszą cechę prowadzącego:<br>";
   questions += "<input type=\"radio\" id=\"q6_1\" value=\"Punktualność\" name=\"q6\"> <label for=\"q6_1\"> Punktualność </label><br>";
   questions += "<input type=\"radio\" id=\"q6_2\" value=\"Przygotwanie do zajęć\" name=\"q6\"> <label for=\"q6_2\"> Przygotwanie do zajęć </label><br>";
   questions += "<input type=\"radio\" id=\"q6_3\" value=\"Podejście do studenta\" name=\"q6\"> <label for=\"q6_3\"> Podejście do studenta </label><br>";
   questions += "<input type=\"radio\" id=\"q6_4\" value=\"Umiejętność zaciekawienia\" name=\"q6\"> <label for=\"q6_4\"> Umiejętność zaciekawienia </label><br>";
   questions += "<input type=\"radio\" id=\"q6_5\" value=\"Sposób oceny i jej obiektywność\" name=\"q6\"> <label for=\"q6_5\"> Sposób oceny i jej obiektywność </label><br><br>";
 
   questions += "<br><br>Wybierz Twoim zdaniem najgorszą cechę prowadzącego:<br>";
   questions += "<input type=\"radio\" id=\"q7_1\" value=\"Niepunktualność\" name=\"q7\"> <label for=\"q7_1\"> Niepunktualność </label><br>";
   questions += "<input type=\"radio\" id=\"q7_2\" value=\"Gburowatość\" name=\"q7\"> <label for=\"q7_2\"> Gburowatość </label><br>";
   questions += "<input type=\"radio\" id=\"q7_3\" value=\"Brak wiedzy\" name=\"q7\"> <label for=\"q7_3\"> Brak wiedzy </label><br>";
   questions += "<input type=\"radio\" id=\"q7_4\" value=\"Nieciekawy sposób przekazywania wiedzy\" name=\"q7\"> <label for=\"q7_4\"> Nieciekawy sposób przekazywania wiedzy </label><br>";
   questions += "<input type=\"radio\" id=\"q7_5\" value=\"Niejasny sposób oceny\" name=\"q7\"> <label for=\"q7_5\"> Niejasny i nieprzyjazy sposób oceny </label><br><br>";


   document.getElementById("wyswietlacz").innerHTML = questions;
}


function Register(){//funkcja opakowujaca proces rejestracji
   if(RegisterValidator()){
      AddRegister();
   }
}


function RegisterValidator(){//funkcja sprawdzajaca poprawnosc wprowadzonych danych w formularzu rejestracji
   var login = document.getElementById("reg_log").value;
   var pass = document.getElementById("reg_pass").value;
   var pass_check = document.getElementById("reg_pass_check").value;
   
   if(login == "" || pass == "" || pass_check == ""){
      document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">Proszę wypełnić wszystkie pola!</div>";
      return false;
   }else{
      if(pass != pass_check){
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">Wprowadzone hasła nie są takie same!</div>";
         return false;
      }else{
         return true;
      }
   }
}


function LocalDBWrapper(){//funckcja wywolujaca funkcje wyswietlajaca zawartosc bazy danych przegladarki
   readLocalDB();
}


function QuestionsLocalValidatorWrapper(){//funkcja opakowujaca dodajaca odpowiedni przycisk dla formularzu ankiety
   QuestionsWrapper();
   document.getElementById("wyswietlacz").innerHTML += "<div class=\"text_center\"><button type=\"button\" class=\"btn btn-dark\" onclick=\"QuestionsLocalValidator()\">Wyślij</button></div><br>";
}


function QuestionsGlobalValidatorWrapper(){//funkcja opakowujaca dodajaca odpowiedni przycisk dla formularzu ankiety
   QuestionsWrapper();
   document.getElementById("wyswietlacz").innerHTML += "<div class=\"text_center\"><button type=\"button\" class=\"btn btn-dark\" onclick=\"QuestionsGlobalValidator()\">Wyślij</button></div><br>";
}


function QuestionsLocalValidator(){//funkcja opakowujaca proces wysylania ankiety do lokalnej bazy danych
   if(validate()){
      prepareInsertData();
      addLocalDB();
   }else{
      alert("Proszę zaznaczyć wszystkie odpowiedzi");
   }
}


function QuestionsGlobalValidator(){ //funkcja opakowujaca proces wysylania ankiety do bazy danych po stronie serwera
   if(validate()){
      prepareInsertData();
      addGlobalDB(answersLocal);
   }else{
      alert("Proszę zaznaczyć wszystkie odpowiedzi");

   }
}


function validate(){//funkcja sprawdzajaca, czy wszystkie pozycje w ankiecie zostaly zaznaczone
   return validate_check("q6") && validate_check("q7");
}


function validate_check(q_id){//funkcja sprawdzajaca, czy wszystkie pozycje w ankiecie zostaly zaznaczone
   var check = document.getElementsByName(q_id);
   var flag = 0;
   for(var i = 0; i < check.length; i++){
      if(check[i].checked){
         flag++;
      }
   }
   return flag != 0;
}


function answerValue(q_id){//funkcja zwracajaca wartosc z zaznaczonego pytania w ankiecie
   var val = document.getElementsByName(q_id);
   for(var i = 0; i < val.length; i++){
      if(val[i].checked){
         return val[i].value;
      }
   }
}


function prepareInsertData(){//funkcja zbierajaca wszystkie odpowiedzi
   var q1= document.getElementById('num1').value;
   var q2 = document.getElementById('num2').value;
   var q3 = document.getElementById('num3').value;
   var q4 = document.getElementById('num4').value;
   var q5 = document.getElementById('num5').value;
   var q6 = answerValue("q6");
   var q7 = answerValue("q7");


   answersLocal = [q1, q2, q3, q4, q5, q6, q7]
}


var indexedDb = window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB;
var idDbRequest = indexedDb.open("surveyLocal", 3);
var answersLocal = [];
var login_flag = new Boolean(true);
var login_name = "";
var db;

idDbRequest.onupgradeneeded = function(event){//utworzenie lokalnej bazy danych
   db = event.target.result;
   var data = db.createObjectStore("survey", { keyPath: "id", autoIncrement: true });
   data.createIndex("answers", "answers", { unique: false });
   data.createIndex("date", "date", { unique: false });
};

idDbRequest.onsuccess = function(event){//utworzenie lokalnej bazy danych
   db = event.target.result;
};


function addLocalDB(){//funkcja dodajaca elementy do lokalnej bazy danych
   var data = {};
   data.answers = answersLocal.join([separator = ',']);
   data.date = new Date().toUTCString();
   var dbTransaction = db.transaction(["survey"], "readwrite");
   var objStore = dbTransaction.objectStore("survey");
   var objStoreRequest = objStore.add(data);
   objStoreRequest.onsuccess = function(event) {
      answersLocal = [];
      document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">Pomyślnie dodano dane do bazy danych po stronie przeglądarki!</div>";
   };
}


function readLocalDB(){//funkcja czytajaca wszystkie elementy w lokalnej bazie danych
   var choices = [];
   var id = [];
	var dates = [];
   var dbTransaction = db.transaction("survey", "readwrite");
   var objStore = dbTransaction.objectStore("survey");

   objStore.openCursor().onsuccess = function (event) {
      var result = event.target.result;
      if (result) {
            choices[choices.length] = result.value.answers.split(",");
	    dates[dates.length] = result.value.date;
            id[id.length] = result.value.id;
            result.continue();
      } else {
            showLocal(id, choices, dates);
      }
   };
}


function showLocal(id, answ, dates){//funkcja wyswietlajaca elementy z lokalnej bazy danych w formie tabeli
   var data = "<table class=\"table\" style=\"color: #FFFFFF;\"><tr><th scope=\"col\">id</th><th scope=\"col\">Pytanie 1</th><th scope=\"col\">Pytanie 2</th><th scope=\"col\">Pytanie 3</th><th scope=\"col\">Pytanie 4</th><th scope=\"col\">Pytanie 5</th><th scope=\"col\">Pytanie 6</th><th scope=\"col\">Pytanie 7</th><th scope=\"col\">Data dodania</th></tr>";
   for (var i = 0; i < answ.length; i++) {
      data += "<tr><th scope=\"row\">"+id[i]+"</th><td>"+answ[i][0]+"</td><td>"+answ[i][1]+"</td><td>"+answ[i][2]+"</td><td>"+answ[i][3]+"</td><td>"+answ[i][4]+"</td><td>"+answ[i][5]+"</td><td>"+answ[i][6]+"</td><td>"+dates[i]+"</td></tr>";
   }
   data += "</table></div>";
   document.getElementById("wyswietlacz").innerHTML = data;
}


function deleteFromLocalDB(){//funkcja czyszczaca cala lokalna baze danych
   var dbTransaction = db.transaction("survey", "readwrite");
   var objStore = dbTransaction.objectStore("survey");
   objStore.openCursor().onsuccess = function (event) {
      var result = event.target.result;
      if(result){
         result.delete();
         result.continue();
      }
   };
}


function setCookies(value){//funkcja ustawiajaca wartosci ciasteczek
   document.cookie = "sessionToken=" + value + "; path=/";
}


function getSessionCookie(){//funkcja zwracajaca akutalne ciasteczko
   var cookies = document.cookie.split(';');
   for (var i = 0; i < cookies.length; i++){
      var queue = cookies[i];
      while (queue.charAt(0) == ' ') {
         queue = queue.substring(1, queue.length);
      }
      if(queue.indexOf("sessionToken=") == 0){
         return queue.substring("sessionToken=".length, queue.length);
      }
   }
   return "";
}


function elementsLoggedIn(){//funkcja wczytujaca elementy strony dla zalogowanego uzytkownika
   var elements = "";
   var elements1 = "";
   elements1 += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"LogoutWrapper(); return false;\">Wyloguj się</button>  "
   elements += "<form name=\"f1\">";
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"QuestionsGlobalValidatorWrapper()\">Wypełnij ankietę</button>  "
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"AnalizeWrapper()\">Analiza danych</button>  "
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"GlobalDBWrapper()\">Podgląd danych z bazy danych po stronie serwera</button>"
   elements += "</form>";
   document.getElementById("formularz").innerHTML = elements;
   document.getElementById("naglowek").innerHTML = elements1;

}


function elementsNotLoggedIn(){//funkcja wczytujaca elementy strony dla niezalogowanego uzytkownika
   var elements = "";
   var elements1 = "";
   elements1 += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"LoginWrapper(); return false;\">Zaloguj się</button>  "
   elements1 += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"RegisterWrapper()\">Zarejestruj się</button>  "

   elements += "<form name=\"f1\">";
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"QuestionsLocalValidatorWrapper()\">Wypełnij ankietę</button>  "
   elements += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"LocalDBWrapper()\">Podgląd danych lokalnych</button>"
   elements += "</form>";
   document.getElementById("formularz").innerHTML = elements;
   document.getElementById("naglowek").innerHTML = elements1;

}


function elementsLoad(){//opakowanie procesu sprawdzajacego aktywne sesje
   checkSession();
}


function checkSession(){//funkcja sprawdzajaca aktywne sesje
   var session = {};
   var token = getSessionCookie();
   if(token == ""){
      elementsNotLoggedIn();
   }else{
      session.token = token;
      txt = JSON.stringify(session);
      request = getRequestObject() ;
      request.onreadystatechange = function() {
         if (request.readyState == 4 && request.status == 200)    {
            var tmp = JSON.parse(request.response);
            if(tmp.return.localeCompare("\"yes\"")){
               setCookies(token);
               login_flag = true;
               login_name = tmp.login;
               elementsLoggedIn();
            }
         }else if(request.status == 400){
            Logout();
            setCookies("");
            login_flag = false;
            login_name = "";
            elementsNotLoggedIn();
         }
      }
      request.open("POST", "http://pascal.fis.agh.edu.pl/~9szostak/projekt2/rest/sessionCheck", true);
      request.send(txt);
   }
}


function AddRegister(){//funkcja dodajaca nowego uzytkownika
   var user = {};
   user.login = document.getElementById("reg_log").value;
   user.pass = document.getElementById("reg_pass").value;
   txt = JSON.stringify(user);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 || request.status == 400 )    {
         //var tmp = JSON.parse(JSON.stringify(request.response));
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">"+tmp.return+"</div>";
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~9szostak/projekt2/rest/register", true);
   request.send(txt);
}


function Login(){//funkcja realizujaca logowanie do serwisu
   var user = {};
   user.login = document.getElementById("log").value;
   user.pass = document.getElementById("pass").value;
   txt = JSON.stringify(user);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 )    {
         login_name = document.getElementById("log").value;
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-success\" role=\"alert\">"+tmp.return+"</div>";
         setCookies(tmp.token);
         login_flag = true;
         elementsLoggedIn();
         synchronizeLocalToGlobalDB();
      }else if(request.readyState == 4 && request.status == 400){
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">"+tmp.return+"</div>";
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~9szostak/projekt2/rest/login", true);
   request.send(txt);
}


function LogoutWrapper(){//funkcja opakowujaca proces wylogowywania z serwisu
   Logout();
   login_flag = false;
   login_name = "";
   elementsNotLoggedIn();
}


function Logout(){//funkcja realizujaca proces wylogowywania z serwisu
   var session = {};
   var token = getSessionCookie();
   
   session.token = token;
   txt = JSON.stringify(session);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 || request.status == 400 )    {
         var tmp = JSON.parse(request.response);
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-success\" role=\"alert\">"+tmp.return+"</div>";
         setCookies("");
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~9szostak/projekt2/rest/logout", true);
   request.send(txt);
}


function addGlobalDB(answers){//funkcja realizujaca dodawanie danych do bazy danych po stronie serwera
   var data = {};
   data.date = new Date();

   data.user = login_name;
   data.answers = answers;
   txt = JSON.stringify(data);
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200 || request.status == 400)    {
         document.getElementById("wyswietlacz").innerHTML = "<div class=\"alert alert-primary\" role=\"alert\">Poprawnie dodano do bazy danych po stronie serwera!</div>";
      }
   }
   request.open("POST", "http://pascal.fis.agh.edu.pl/~9szostak/projekt2/rest/add", true);
   request.send(txt);
}


function synchronizeLocalToGlobalDB(){//funkcja realizujaca synchronizacje danych z bazy danych przegladarki do bazy danych po stronie serwera zaraz po zalogowaniu sie uzytkownika
   var choices = [];

   var dbTransaction = db.transaction("survey", "readwrite");
   var objStore = dbTransaction.objectStore("survey");

   objStore.openCursor().onsuccess = function (event) {
      var result = event.target.result;
      if (result) {
         var tmp = result.value.answers.split(",");
         for(var i = 0; i < tmp.length-2; i++){
            tmp[i] = new Number(tmp[i]);
         }
         choices[choices.length] = tmp;
         result.continue();
      } else {
         if(choices.length != 0){
            for(var i = 0; i < choices.length; i++){
               addGlobalDB(choices[i]);
            }
            deleteFromLocalDB();
            document.getElementById("wyswietlacz").innerHTML += "<div class=\"alert alert-success\" role=\"alert\">Pomyslnie zsynchronizowano dane!</div>";
         }
      }
   };
}


function GlobalDBWrapper(){//funkcja opakowujaca proces wyswietlania danych z bazy danych po stronie serwera
   readGlobalDB();
}


function readGlobalDB(){//funkcja realizujaca proces odczytania danych z bazy danych po stronie serwera
   var idx = [];
   var choices = [];
   var dates = []
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4)    {
         objJSON = JSON.parse(request.response);
         for ( var id in objJSON )  {
            idx[id] = id;
            dates[id] = objJSON[id]["date"];
            choices[id] = JSON.stringify(objJSON[id]["answers"]).split(",");
            }
            showGlobal(idx, choices, dates);
         }
      }
   request.open("GET", "http://pascal.fis.agh.edu.pl/~9szostak/projekt2/rest/read", true);
   request.send(null);
}


function showGlobal(id, answ, dates){//funkcja realizujaca proces wyswietlenia danych z bazy danych po stronie serwera w formie tabeli
   var data = "<table class=\"table\"style=\"color: #FFFFFF;\"><tr><th scope=\"col\">id</th><th scope=\"col\">Pytanie 1</th><th scope=\"col\">Pytanie 2</th><th scope=\"col\">Pytanie 3</th><th scope=\"col\">Pytanie 4</th><th scope=\"col\">Pytanie 5</th><th scope=\"col\">Pytanie 6</th><th scope=\"col\">Pytanie 7</th></tr>";
   for (var i = 0; i < answ.length; i++) {
      data += "<tr><th scope=\"row\">"+id[i]+"</th><td>"+answ[i][0].split("[")[1]+"</td><td>"+answ[i][1]+"</td><td>"+answ[i][2]+"</td><td>"+answ[i][3]+"</td><td>"+answ[i][4]+"</td><td>"+answ[i][5]+"</td><td>"+answ[i][6].slice(0,-1)+"</td><td>"+ dates[i]+"</td></tr>";
   }
   data += "</table>";
   document.getElementById("wyswietlacz").innerHTML = data;
}


function AnalizeWrapper(){//funkcja opakowujaca dla procesu wizualizacji danych z bazy danych po stronie serwera
   var choices = [];
   request = getRequestObject() ;
   request.onreadystatechange = function() {
      if (request.readyState == 4)    {
         objJSON = JSON.parse(request.response);
         for ( var id in objJSON )  {
            choices[id] = JSON.stringify(objJSON[id]["answers"]).split(",");
            }
            
            Analize(choices);
         }
      }
   request.open("GET", "http://pascal.fis.agh.edu.pl/~9szostak/projekt2/rest/read", true);
   request.send(null);
}


function Analize(answers){//analiza zlozonych odpowiedzi
   var count = [0,0,0,0,0];
   var sum1 = 0;
   var test = ["ANdrzej", "bamdrzej", "bartolomeusz"];
   //console.log(test[1]);
   //console.log(test); 
   //console.log(answers);
    for(var i = 0; i < answers.length; i++){
      answers[i][0] = answers[i][0].split("[")[1];
      answers[i][4] = answers[i][4].split("]")[0];
      for(var j = 0; j < answers[i].length-2; j++){
          answers[i][j] = answers[i][j].replace(/["]+/g, '');           
          //console.log(typeof answers[i][j]);
          //console.log(answers[i][j].valueOf());
          count[j] += new Number(answers[i][j]);
       
      }
   }
   for(var i = 0; i < count.length;i++){
       count[i] /= answers.length;
   }

   //console.log(count);
   CreateCanvas(count);
}


function CreateCanvas(data){//wizualizacja danych w formie histogramow
   document.getElementById("wyswietlacz").innerHTML = "<canvas id=\"obszar1\" style=\"border-style: solid;\"></canvas>";
   obszar1 = document.getElementById("obszar1");
   obszar1.width = 0.8*window.innerWidth;
   obszar1.height = 400;
   context = obszar1.getContext("2d");
   context.strokeStyle = "#FF0000";
   var pos = obszar1.width/6;
   CreateChart(obszar1,context, data[0], pos, "Przygotowanie");
   CreateChart(obszar1,context, data[1], 2*pos, "Ciekawość");
   CreateChart(obszar1,context, data[2], 3*pos, "Charakter");
   CreateChart(obszar1,context, data[3], 4*pos, "Punktualność");
   CreateChart(obszar1,context, data[4], 5*pos, "Zasady zaliczenia");
   context.stroke();
}


function CreateChart(obszar, ctx, data, position, title){//funkcja wyswietlajaca slupki odpowiedzi
   var grid_size = 38;
   var x_axis_distance_grid_lines = 5;
   var y_axis_distance_grid_lines = 5;
   var x_axis_starting_point = { number: 1, suffix: '\u03a0' };
   var y_axis_starting_point = { number: 1, suffix: '' };
   var num_lines_y = Math.floor(obszar.width/grid_size);
   var num_lines_x = Math.floor(obszar.height/grid_size);
// pomocnicze linie pokazujace poziom
    for(var i=0; i<=num_lines_x; i++) {
       ctx.beginPath();
       ctx.lineWidth = 0.7;
       ctx.strokeStyle = "#a08f96";
       ctx.globalAlpha = 0.2;
       ctx,fillStyle = "#a08f96";
       ctx.moveTo(0, grid_size*i+0.5);
       ctx.lineTo(obszar.width, grid_size*i+0.5);
       ctx.stroke();
   }

//czesc odpowiedzialna za numerki z lewej
    for(i=0; i<11; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(-3, grid_size*i+0.5);
        ctx.lineTo(3, grid_size*i+0.5);
        ctx.stroke();
        ctx.fillStyle = "#a08f96";

    // Text value at that point
        ctx.font = '12px Arial';
        ctx.textAlign = 'start';
        ctx.fillText(y_axis_starting_point.number*i , 8, obszar.height - grid_size*i-10);
   }

//wykresy + podpisy pod slupkami
   ctx.globalAlpha = 1; 
   ctx.fillStyle = "#FFFFFF";
   ctx.font = "bold 10px sans-serif";
   ctx.fillText(title, position-30, obszar.height-10);
   var start = position - 30;
   ctx.fillRect(position ,obszar.height-20, 25, - data*(38));
   ctx.fillStyle = "white";
}


