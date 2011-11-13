function validate_user(form){
  var attempt_user     = form['user'].value;
  var attempt_password = form['password'].value;

  jQuery.ajax({
    url: "usuarios.txt",
    context: document.body,
    success: function(data){
      var usuarios = data.split("\n");

      var redirected = false;
      for(var i = 0; 2*i < usuarios.length; i++){
        if( !usuarios[parseInt(i*2)] || !usuarios[parseInt(i*2+1)]){ break; }

        var user     = usuarios[parseInt(i*2)].replace(/(\r\n|\n|\r)/gm,"");
        var password = usuarios[parseInt(i*2+1)].replace(/(\r\n|\n|\r)/gm,"");

        if(attempt_user == user && attempt_password == password){
          redirected = true;
          window.location.replace("consumo.html");
          break;
        }
      }
      if(redirected == false){ window.location.replace("auth_error.html") }
    }
  });

  return false;
}