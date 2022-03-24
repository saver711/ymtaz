/* COMMON JS CODE */

$(document).ready(function () {
  // all of my code
  // general

  $(".goTo").on("click", function () {
    $("html").animate(
      {
        scrollTop: $("." + $(this).data("scroll")).offset().top - 100,
      },
      1400
    );
  });

  // nav
  $("#menuToggle input").on("click", function () {
    $(".navbar__navs").toggleClass("hide");
  });

  $(".navbar__navs li").on("click", function () {
    $("#menuToggle input").click();
  });

  // cmnForm -mine

  let fileInput = $('.cmnForm input[type="file"]');
  $(fileInput).on("change", function () {
    let files =
        document.forms[$(this).parents("form").attr("name")]["file"].files,
      fileName = "",
      n;

    if (files.length > 1) {
      let p = document.createElement("p");
      let more = document.createTextNode(files.length + " ملفات وهم : ");
      $(this).siblings("label").find("ul")[0].appendChild(more);
    }

    for (n = 0; n < files.length; n++) {
      let li = document.createElement("li");
      let text = document.createTextNode(files[n].name);
      li.appendChild(text);
      $(this).siblings("label").find("ul")[0].appendChild(li);
    }
  });
  $(fileInput).on("click", function () {
    $(this).siblings("label").find("ul").html("");
  });

  //  (videos, library pages)
  $(".slide").on("click", function () {
    $(".slide").removeClass("active");
    $(this).addClass("active");
  });
  $(".slides-toggler").on("click", function () {
    $(".slides-container").slideToggle();
  });

  // library page
  $(".library .slide").on("click", function () {
 
    // $("." + $(this).parent('.col-6').siblings('.col-6').children('.slide').data("lib")).hide();

    $('.library .box-container .box').hide();

    $("." + $(this).data("lib")).show();
  });

  let WIDTH_LIMIT = 767;
  let windowWidth = window.innerWidth;

  if (windowWidth <= WIDTH_LIMIT) {
    $(".library .slide").on("click", function () {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("." + $(this).data("lib")).offset().top,
        },
        600
      );
    });
  } else {
  }

  //   login/signup
  $(".forget-text").on("click", function () {
    $(".forget-mail").slideDown();
  });

  // search-results
  $(".slider-head").on("click", function () {
    $(this).children("svg").toggleClass("rotate");
    $(this).siblings(".slider-slided").slideToggle();
  });





  //cmnFormValidation
  
$('form[name="form"]').on('submit', function(e){
e.preventDefault();


  let errMsgDiv = $(this).children('.formErr').children('p'),
  //name
  usernmVar = document.form.usernm,
  usernmMyVar = $(this).children('input[name="usernm"]'),
  usernmVarLength = usernmVar.value.length,
  nameErrMsg1 = 'لا تترك حقل الاسم فارغ',
  nameErrMsg2 = 'الاسم لا يقل عن 5 أحرف',

  //email
  useremailMyVar = $(this).children('input[name="useremail"]'),
  useremailVar = document.form.useremail,
  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  emailErrMsg1 = 'اكتب البريد الالكتروني بصورة صحيحة',

  //phone
  userphoneVar = document.form.userphone,
  userphoneMyVar = $(this).children('input[name="userphone"]'),
  phoneformat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  phoneErrMsg1 = 'اكتب رقم الهاتف بصورة صحيحة',

  //subject
  usersubjectMyVar = $(this).children('input[name="usersubject"]'),
  usersubjectVar = document.form.usersubject,
  subjectErrMsg1 = 'لا تترك اسم الموضوع فارغ',
  usersubjectVarLength = usersubjectVar.value.length,

  //msg
  usermsgMyVar = $(this).children('textarea[name="textmsg"]'),
  usermsgVar = document.form.textmsg,
  msgErrMsg1 = 'لا تترك حقل التفاصيل فارغ',
  usermsgVarLength = usermsgVar.value.length;

  function showErrMsg() {
    errMsgDiv.show();
    setTimeout(function () {
      errMsgDiv.hide();
  }, 2000);
  }

  


  // user name
  if(usernmMyVar.data('required') === 'required') {
    if(usernmVarLength == 0) {
    
      errMsgDiv.text(nameErrMsg1);
  
      usernmVar.focus();
      showErrMsg();
  return false;
    } else if(usernmVarLength < 5) {
      errMsgDiv.text(nameErrMsg2)
      usernmVar.focus();
      showErrMsg();
  return false;
  
    } else{
      errMsgDiv.text('');
  
      
     }
  }
  
//email
if (useremailMyVar.data('required') === 'required') {

  if(useremailVar.value.match(mailformat)) {

    errMsgDiv.text('');

    } else{
      
      errMsgDiv.text(emailErrMsg1);
      useremailVar.focus();
      showErrMsg();
  return false;
      
    }
}
  

    //phone
    if(userphoneMyVar.data('required') === 'required'){
      if(userphoneVar.value.match(phoneformat)) {

        errMsgDiv.text('');
    
        } else{
          
          errMsgDiv.text(phoneErrMsg1)
          userphoneVar.focus();
          showErrMsg();
      return false;
          
        }
    }
 

    // subject title
    if(usersubjectMyVar.data('required') === 'required') {
      if(usersubjectVarLength == 0) {
      
        errMsgDiv.text(subjectErrMsg1);
    
        usersubjectVar.focus();
        showErrMsg();
    return false;
      }else{
        errMsgDiv.text('');
    
        
       }
    }

    // details
    if(usermsgMyVar.data('required') === 'required') {
      if(usermsgVarLength == 0) {
      
        errMsgDiv.text(msgErrMsg1);
    
        usermsgVar.focus();
        showErrMsg();
    return false;
      }else{
        errMsgDiv.text('');
    
        
       }
    }
  
    


  return true;



});


// signupform validation

$('form[name="signupform"]').on('submit', function(){



  let errMsgDiv = $(this).children('.formErr').children('p'),
  //name
  usernmVar = document.signupform.usernm,
  usernmMyVar = $(this).children('.log__row').children('.log__col').children('input[name="usernm"]'),
  usernmVarLength = usernmVar.value.length,
  nameErrMsg1 = 'لا تترك حقل الاسم فارغ',
  nameErrMsg2 = 'الاسم لا يقل عن 5 أحرف',

   //email
   useremailMyVar = $(this).children('.log__row').children('.log__col').children('input[name="useremail"]'),
   useremailVar = document.signupform.useremail,
   mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
   emailErrMsg1 = 'اكتب البريد الالكتروني بصورة صحيحة',

  //pass
  userpassVar = document.signupform.userpass,
  userpassMyVar = $(this).children('.log__row').children('.log__col').children('input[name="userpass"]'),
  userpassVarLength = userpassVar.value.length,
  passErrMsg1 = 'لا تترك حقل كلمة السر فارغ',
  passErrMsg2 = 'كلمة السر لا تقل عن 5 أحرف',

  //job checkboxes
  jobErrMsg1 = 'من فضلك اختر مهنة واحدة علي الأقل'

//phone
  userphoneVar = document.signupform.userphone,
  userphoneMyVar = $(this).children('.log__row').children('.log__col').children('input[name="userphone"]'),
  phoneformat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  phoneErrMsg1 = 'اكتب رقم الهاتف بصورة صحيحة',

  // userminiabout
  userminiaboutMyVar = $(this).children('.log__row').children('.log__col').children('input[name="userminiabout"]'),
  userminiaboutVar = document.signupform.userminiabout,
  miniaboutErrMsg1 = 'لا تترك التعريف المختصر فارغ',
  userminiaboutVarLength = userminiaboutVar.value.length,

   //commitment
   commitmentErrMsg1 = 'حقل التعهد مطلوب',

   // useridentity
  useridentityMyVar = $(this).children('.log__row').children('.log__col').children('input[name="useridentity"]'),
  useridentityVar = document.signupform.useridentity,
  identityErrMsg1 = 'لا تترك حقل الهوية فارغ',
  useridentityVarLength = useridentityVar.value.length,

  // userlicence
  userlicenceMyVar = $(this).children('.log__row').children('.log__col').children('input[name="userlicence"]'),
  userlicenceVar = document.signupform.userlicence,
  licenceErrMsg1 = 'لا تترك حقل رقم الترخيص فارغ',
  userlicenceVarLength = userlicenceVar.value.length;


  //console.log(usernmVar.attr('name'))
  function showErrMsg() {
    errMsgDiv.show();
    setTimeout(function () {
      errMsgDiv.hide();
  }, 2000);
  }

  


  // user name
  if(usernmMyVar.data('required') === 'required') {
    
    if(usernmVarLength == 0) {
    
      errMsgDiv.text(nameErrMsg1);
  
      usernmVar.focus();
      showErrMsg();
  return false;
    } else if(usernmVarLength < 5) {
      errMsgDiv.text(nameErrMsg2)
      usernmVar.focus();
      showErrMsg();
  return false;
  
    } else{
      errMsgDiv.text('');
  
      
     }
  }
  
//email
if (useremailMyVar.data('required') === 'required') {

  if(useremailVar.value.match(mailformat)) {

    errMsgDiv.text('');

    } else{
      
      errMsgDiv.text(emailErrMsg1);
      useremailVar.focus();
      showErrMsg();
  return false;
      
    }
}

//pass
if(userpassMyVar.data('required') === 'required') {
    
  if(userpassVarLength == 0) {
  
    errMsgDiv.text(passErrMsg1);

    userpassVar.focus();
    showErrMsg();
return false;
  } else if(userpassVarLength < 5) {
    errMsgDiv.text(passErrMsg2)
    userpassVar.focus();
    showErrMsg();
return false;

  } else{
    errMsgDiv.text('');

    
   }
}
  

//job
if(!$('input:checkbox[name="userjob"]').is(':checked')) {
  errMsgDiv.text(jobErrMsg1);
  $('.jobLabel').css('color', 'red');
  setTimeout(function () {
    $('.jobLabel').css('color', '#777777');
}, 2000);
  
          showErrMsg();
      return false;
}

    //phone
    if(userphoneMyVar.data('required') === 'required'){
      if(userphoneVar.value.match(phoneformat)) {

        errMsgDiv.text('');
    
        } else{
          
          errMsgDiv.text(phoneErrMsg1)
          userphoneVar.focus();
          showErrMsg();
      return false;
          
        }
    }
 

    //userminiabout
    if(userminiaboutMyVar.data('required') === 'required') {
      if(userminiaboutVarLength == 0) {
      
        errMsgDiv.text(miniaboutErrMsg1);
    
        userminiaboutVar.focus();
        showErrMsg();
    return false;
      }else{
        errMsgDiv.text('');
    
        
       }
    }


    //commitment
if(!$('input:checkbox[name="usercommitment"]').is(':checked')) {
  errMsgDiv.text(commitmentErrMsg1);
  $('.commitmentLabel').css('color', 'red');
  setTimeout(function () {
    $('.commitmentLabel').css('color', '#777777');
}, 2000);
  
          showErrMsg();
      return false;
}

//useridentity
if(useridentityMyVar.data('required') === 'required') {
  if(useridentityVarLength == 0) {
  
    errMsgDiv.text(identityErrMsg1);

    useridentityVar.focus();
    showErrMsg();
return false;
  }else{
    errMsgDiv.text('');

    
   }
}

//userlicence
if(userlicenceMyVar.data('required') === 'required') {
  if(userlicenceVarLength == 0) {
  
    errMsgDiv.text(licenceErrMsg1);

    userlicenceVar.focus();
    showErrMsg();
return false;
  }else{
    errMsgDiv.text('');

    
   }
}

  
    


  return true;




});

// loginform validation

$('form[name="loginform"]').on('submit', function(){



  let errMsgDiv = $(this).children('.formErr').children('p'),


   //email
   useremailMyVar = $(this).children('.log__row').children('.log__col').children('input[name="useremail"]'),
   useremailVar = document.loginform.useremail,
   mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
   emailErrMsg1 = 'اكتب البريد الالكتروني بصورة صحيحة',

  //pass
  userpassVar = document.loginform.userpass,
  userpassMyVar = $(this).children('.log__row').children('.log__col').children('input[name="userpass"]'),
  userpassVarLength = userpassVar.value.length,
  passErrMsg1 = 'لا تترك حقل كلمة السر فارغ',
  passErrMsg2 = 'كلمة السر لا تقل عن 5 أحرف';


  //console.log(usernmVar.attr('name'))
  function showErrMsg() {
    errMsgDiv.show();
    setTimeout(function () {
      errMsgDiv.hide();
  }, 2000);
  }

  
//email
if (useremailMyVar.data('required') === 'required') {

  if(useremailVar.value.match(mailformat)) {

    errMsgDiv.text('');

    } else{
      
      errMsgDiv.text(emailErrMsg1);
      useremailVar.focus();
      showErrMsg();
  return false;
      
    }
}

//pass
if(userpassMyVar.data('required') === 'required') {
    
  if(userpassVarLength == 0) {
  
    errMsgDiv.text(passErrMsg1);

    userpassVar.focus();
    showErrMsg();
return false;
  } else if(userpassVarLength < 5) {
    errMsgDiv.text(passErrMsg2)
    userpassVar.focus();
    showErrMsg();
return false;

  } else{
    errMsgDiv.text('');

    
   }
}
  


  
    


  return true;



});


// restoreloginform validation

$('form[name="restoreloginform"]').on('submit', function(){



  let errMsgDiv = $(this).children('.formErr').children('p'),


   //email
   useremailMyVar = $(this).children('.log__row').children('.log__col').children('input[name="restoreuseremail"]'),
   useremailVar = document.restoreloginform.restoreuseremail,
   mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
   emailErrMsg1 = 'اكتب البريد الالكتروني بصورة صحيحة';


  //console.log(usernmVar.attr('name'))
  function showErrMsg() {
    errMsgDiv.show();
    setTimeout(function () {
      errMsgDiv.hide();
  }, 2000);
  }

  
//email
if (useremailMyVar.data('required') === 'required') {

  if(useremailVar.value.match(mailformat)) {

    errMsgDiv.text('');

    } else{
      
      errMsgDiv.text(emailErrMsg1);
      useremailVar.focus();
      showErrMsg();
  return false;
      
    }
}


  return true;



});



// loginformphone validation
$('form[name="loginformphone"]').on('submit', function(){



  let errMsgDiv = $(this).children('.formErr').children('p'),


//phone
  userphoneVar = document.loginformphone.userphone,
  userphoneMyVar = $(this).children('.log__row').children('.log__col').children('input[name="userphone"]'),
  phoneformat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  phoneErrMsg1 = 'اكتب رقم الهاتف بصورة صحيحة';




  function showErrMsg() {
    errMsgDiv.show();
    setTimeout(function () {
      errMsgDiv.hide();
  }, 2000);
  }

  





    //phone
    if(userphoneMyVar.data('required') === 'required'){
      if(userphoneVar.value.match(phoneformat)) {

        errMsgDiv.text('');
    
        } else{
          
          errMsgDiv.text(phoneErrMsg1)
          userphoneVar.focus();
          showErrMsg();
      return false;
          
        }
    }
 






  
    


  return true;



});





// login-phone
$(".otp-inputbar").keypress(function (e) {
  if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      $("#errmsg").html("أكتب أرقام فقط").show().fadeOut("slow");
      return false;
  }
});
$(".otp-inputbar").on("keyup", function (e) {
  if ($(this).val()) {
      $(this).next().focus();
  }
//   delete and backspace btns
  var KeyID = e.keyCode;
  switch (KeyID) {
      case 8:
          $(this).val("");
          $(this).prev().focus();
          break;
      case 46:
          $(this).val("");
          $(this).prev().focus();
          break;
      default:
          break;
  }
});
// catch the endVal
$(".otp-inputbar:last-of-type").on("keyup", function (e){
let endVal = $(".otp-inputbar-1").val() + "" + $(".otp-inputbar-2").val() + "" + $(".otp-inputbar-3").val() + "" + $(".otp-inputbar-4").val();
console.log(endVal)
})







  // At the bottom of  jQuery code: hide preloader
  $(".preloader-container").fadeOut();
});


