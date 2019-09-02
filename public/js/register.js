$(() => {
  let flag = true;
  // register
  $(".register-button").on("click", e => {
    e.preventDefault();
    let data = {
      name: $("#register-name").val(),
      lastName: $("#register-lastName").val(),
      email: $("#register-email").val(),
      password: $("#register-password").val(),
      confirmPass: $("#register-confirmPass").val()
    };
    console.log(data);
    $.ajax({
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
      url: "/reg"
    }).done(data => {
      if (data.success) {
        regResult("User created successfully!", "alert-success");
        $(location).attr("href", "/user/account");
      } else {
        regResult(data.error, "alert-danger");
        console.log(data.error);
      }
    });
  });
});

let regResult = (text, clazz) => {
  $(".reg-form").after(
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
