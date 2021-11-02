$(function () {
  // Get user basic info
  getUserInfo;

  var layer = layui.layer;
  $("#btnLogout").on("click", function () {
    // 提示用户是否确认退出
    layer.confirm("Log out?", { icon: 3, title: "Prompt" }, function (index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem("token");
      // 2. 重新跳转到登录页面
      location.href = "/login.html";
      // 关闭 confirm 询问框
      layer.close(index);
    });
  });
});

// Get user basic info
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // Request header configuration object
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      console.log(res);
      console.log("Succeeded to get user info!");
      if (res.status !== 0) {
        // console.log("Fals")
        return layui.layer.msg("Failed to get user info!");
      }
      // Call renderAvatar to render user avatar.
      renderAvatar(res.data);
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: function (res) {
    //   console.log("执行了 complete 回调：");
    //   console.log(res);
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     // 1. 强制清空 token
    //     localStorage.removeItem("token");
    //     // 2. 强制跳转到登录页面
    //     location.href = "/login.html";
    //   }
    // },
  });
}

function renderAvatar(user) {
  // 1. 获取用户的名称
  var name = user.nickName || user.userName;
  // 2. 设置欢迎的文本
  $("#welcome").html("Welcome&nbsp;&nbsp;" + name);
  // 3. 按需渲染用户的头像
  if (user.userPicture !== null) {
    // 3.1 渲染图片头像
    $(".layui-nav-img").attr("src", user.userPicture).show();
    $(".text-avatar").hide();
  } else {
    // 3.2 渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
