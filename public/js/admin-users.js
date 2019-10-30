$(document).ready(function() {
  // $("button.btn-user-activate").click(function(e) {
  //   e.preventDefault();
  //   let { userId } = this.dataset;
  //   let changedEntry = {
  //     status: "active",
  //   };
  //   $.ajax({
  //     type: "PUT",
  //     data: JSON.stringify(changedEntry),
  //     contentType: "application/json",
  //     url: "/admin-users/" + userId,
  //   }).done(data => {
  //     if (data.success) {
  //       console.log("user status changed");
  //     } else {
  //       console.error(data.error);
  //     }
  //   });
  // });

  $("button.btn-user-block").click(function(e) {
    e.preventDefault();
    let { userId, userStatus } = this.dataset;
    let changedEntry = {
      status: userStatus === "active" ? "disabled" : "active",
    };
    var $this = $(this);
    var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Loading...';
    if ($(this).html() !== loadingText) {
      $this.data("original-text", $(this).html());
      $this.html(loadingText);
    }
    $.ajax({
      type: "PUT",
      data: JSON.stringify(changedEntry),
      contentType: "application/json",
      url: "/admin-users/" + userId,
    }).done(response => {
      if (response.success) {
        console.log("user status changed");
        $this.html(
          response.data.status === "disabled"
            ? "Разброкировать"
            : "Заблокировать"
        );
        $("button.btn-user-delete").attr("disabled", false);
      } else {
        console.error(response.error);
      }
      // $this.html($this.data("original-text"));
    });
  });

  $("button.btn-user-delete").click(function(e) {
    e.preventDefault();
    let { userId } = this.dataset;
    let changedEntry = {
      status: "deleted",
    };
    var $this = $(this);
    var loadingText = '<i class="fa fa-circle-o-notch fa-spin"></i> Loading...';
    if ($(this).html() !== loadingText) {
      $this.data("original-text", $(this).html());
      $this.html(loadingText);
    }
    $.ajax({
      type: "PUT",
      data: JSON.stringify(changedEntry),
      contentType: "application/json",
      url: "/admin-users/" + userId,
    }).done(response => {
      if (response.success) {
        console.log("user status changed");
        $this.html($this.data("original-text"));
        $this.prop("disabled", true);
      } else {
        console.error(response.error);
        $this.html($this.data("original-text"));
      }
    });
  });
});
