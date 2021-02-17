function showCookiesForTab(tabs) {
  // 从标签页获取选择的那个页面
  let tab = tabs.pop();

  // 获取当前页面所有的 cookie
  var gettingAllCookies = browser.cookies.getAll({url: tab.url});
  gettingAllCookies.then((cookies) => {

    //获取 插件的 页面展示元素
    var activeTabUrl = document.getElementById('header-title');
    var text = document.createTextNode("页面: "+tab.title);
    var cookieList = document.getElementById('cookie-list');
    activeTabUrl.appendChild(text);

    if (cookies.length > 0) {
      //获取的 cookie 展示到 每一个 <li> 中
      for (let cookie of cookies) {
        let li = document.createElement("li");

   let content = document.createTextNode(cookie.name + ": "+ cookie.value);
        li.appendChild(content);
        cookieList.appendChild(li);
      }
    } else {
      let p = document.createElement("p");
      let content = document.createTextNode("该页面没有 cookie");
      let parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);
    }
  });
}

// 获取活动选项卡以运行回调函数。
// 它向我们的回调发送一个选项卡对象数组
function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}
getActiveTab().then(showCookiesForTab);
