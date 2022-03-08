const firebaseConfig = {
  apiKey: "AIzaSyC-BH7dwAm0Dn9mF7MOzWvVohxrJbyhtsk",
  authDomain: "abcd-7c23e.firebaseapp.com",
  databaseURL: "https://abcd-7c23e-default-rtdb.firebaseio.com",
  projectId: "abcd-7c23e",
  storageBucket: "abcd-7c23e.appspot.com",
  messagingSenderId: "481700467827",
  appId: "1:481700467827:web:e4292a41388f16e0dbc606"
};


firebase.initializeApp(firebaseConfig);




user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
name:user_name,
message:msg,
likes:0,
like:0


});

document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;

     console.log(firebase_message_id);
       console.log(message_data);
       name = message_data['name'];
       message = message_data['message'];
    likes=message_data['like'];
     name_with_tag = "<h4> "+ name +"<img class='user_tick' src='https://mahdihat791.github.io/v2/kwitter/tick.png'></h4>";
     message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button="<button class='btn btn-warning' id="+firebase_message_id+"value="+likes+"onclick='updateLike(this.id)'>";
     span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ likes +"</span></button><hr>";

    row = name_with_tag + message_with_tag +like_button+  span_with_tag;       
    document.getElementById("output").innerHTML += row;

  } });  }); }


  function updateLike(message_id){
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes=Number(likes)+1;
    firebase.database().ref(room_name).child(message_id).update({
like:updated_likes
    });
  }
getData();
function back(){
  window.location="Kwitter_room.html"
}