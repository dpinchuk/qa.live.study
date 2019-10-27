$(document).ready(function() {
  $("button.btn-user-activate").click(function(e) {
    e.preventDefault();
    let { userId } = this.dataset;
    let changedEntry = {
      status: "active",
    };
    $.ajax({
      type: "PUT",
      data: JSON.stringify(changedEntry),
      contentType: "application/json",
      url: "/admin-users/" + userId,
    }).done(data => {
      if (data.success) {
        console.log("user status changed");
      } else {
        console.error(data.error);
      }
    });
  });

  $("button.btn-user-block").click(function(e) {
    e.preventDefault();
    let { userId, userStatus } = this.dataset;
    let changedEntry = {
      status: userStatus === "active" ? "disabled" : "active",
    };
    $.ajax({
      type: "PUT",
      data: JSON.stringify(changedEntry),
      contentType: "application/json",
      url: "/admin-users/" + userId,
    }).done(data => {
      if (data.success) {
        console.log("user status changed");
      } else {
        console.error(data.error);
      }
    });
  });

  $("button.btn-user-delete").click(function(e) {
    e.preventDefault();
    let { userId } = this.dataset;
    let changedEntry = {
      status: "deleted",
    };
    $.ajax({
      type: "PUT",
      data: JSON.stringify(changedEntry),
      contentType: "application/json",
      url: "/admin-users/" + userId,
    }).done(data => {
      if (data.success) {
        console.log("user status changed");
      } else {
        console.error(data.error);
      }
    });
  });
});
