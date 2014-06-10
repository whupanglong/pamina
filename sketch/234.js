alert(123);
var pah = window.pahlib;

pah.addAccesskey({
  '.music-tag':'n'
});

pah.menu({
  'main-page': {
    'text':'首页',
    'selector':'[data-log=nav-home]'
  },
  'bang-dan': {
    'text':'榜单',
    'selector':'[data-log=nav-top]'
  },
  'ge-shou': {
    'text':'歌手',
    'selector':'[data-log=nav-singer]'
  }
});

/*
var pah = window.pahlib;
pah.addTitle({
  '#userName':'请输入用户名',
  '#passWord':'请输入密码',
  '#confirmPassWord':'请再次输入密码',
  '#ivr_pwd':'请输入语音查询密码，为6位数字',
  '#confirmIvr_pwd':'请再次输入语音查询密码，为6位数字',
  '#randCode':'请输入验证码，可以截图给朋友识别'
});


pah.aria({
  '[for=userName]':{
    'role':'log',
    'aria-live':'polite',
    'aria-atomic':'true',
    'aria-relevant':'additions'
  }
});

pah.addAccesskey({
  '[name="tj_tieba"]':'n'
});

pah.menu({
  'hellods': {
    'text':'jijijiji',
    'selector':'[name=tj_news]'
  },
  'dsadfsafa':{
    'text':'dgdsafged',
    'selector':'[name=tj_tieba]'
  }
});
alert(pah.menu);

*/







