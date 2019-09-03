$(() => {
  let flag = true;
  //login
  $(".login-button").on("click", e => {
    e.preventDefault();
    let data = {
      email: $("#login-email").val(),
      password: $("#login-password").val(),
    };
    console.log(data);
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/login",
    }).done(data => {
      if (data.success) {
        loginResult("Successful authorization!", "alert-success");
        $(location).attr("href", "/user/account");
      } else {
        loginResult(data.error, "alert-danger");
        console.log(data.error);
      }
    });
  });
});

let loginResult = (text, clazz) => {
  $(".login-form").after(
    '<div id="errorAlert" class="alert ' +
      clazz +
      ' alert-dismissible fade show position-absolute text-center" role="alert" style="top: 0%;right: 0%;left: 0%">' +
      '   <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
      '       <span aria-hidden="true">×</span>' +
      "   </button>" +
      text +
      "</div>" +
      "<script>" +
      "   $(() => {" +
      "       window.setTimeout(() => {" +
      "           $('#errorAlert').alert('close');" +
      "       }, 2000);" +
      "   });" +
      "</script>"
  );
};
