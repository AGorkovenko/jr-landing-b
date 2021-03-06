// Header Nav smooth scroll
(function () {
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    var $target = $($(this).attr('href'));
    var offsetTop = $target.offset().top;
    var duration = (offsetTop > 1000) ? offsetTop / 2.5 : 500;

    if ($target.length) {
      $('html, body').animate({
        scrollTop: offsetTop
      }, duration)
    }
  });
}());

// Glide slider
(function () {
  $(function () {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var timingFunction = !isMobile ? 'cubic-bezier(0.77, 0, 0.175, 1)' : null;

    var reviewSlider = $("#review-slider").glide({
      type: "carousel",
      animationDuration: 650,
      dragDistance: 180,
      touchDistance: 50,
      autoplay: 5000
    });

    if(!isMobile) {
      reviewSlider.animationTimingFunc = timingFunction;
    }
  });
}());

// Typed code
(function () {
  $(function () {
    var secondPart = {
      stringsElement: $('.typed-strings-2'),
      typeSpeed: 10
    };
    $("#typed-1").typed({
      stringsElement: $('.typed-strings-1'),
      typeSpeed: 10,
      callback: function (curString, curStrPos) {
        $("#typed-1").next('.typed-cursor').hide(0);
        $("#typed-2").typed(secondPart);
      }
    });
  });
}());

// WoW animation
(function () {
  var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      mobile: false,
      live: true,
      scrollContainer: null
    }
  );
  wow.init();
}());

// Counters animation
(function () {
  function fillCounter(value, elem) {
    elem.innerHTML = "";

    while (elem.childElementCount < ('' + value).length) {
      var li = document.createElement('li');
      elem.appendChild(li);
    }

    value = ('' + value).split('');
    value.forEach(function (item, i) {
      elem.children[i].textContent = item;
    });
  }

  var numbers = document.querySelector("#counters");

  var usersEl = document.getElementById('counter-users');
  var tasksEl = document.getElementById('counter-tasks');
  var usersAmount = usersEl.getAttribute('data-value');
  var tasksAmount = tasksEl.getAttribute('data-value');

  $.ajax({
    type   : "GET",
    url    : "/api/rest/user/server/statistics.json?v=2" + new Date().getTime(),
    data   : "",
    success: function (info) {
      usersAmount = info.usersCount;
      tasksAmount = info.taskSolvedCount;
    },
    complete: function () {
      function scroll() {
        if (numbers.getBoundingClientRect().top - window.innerHeight <= 0) {
          usersCounter.start();
          tasksCounter.start();
          window.removeEventListener('scroll', scroll);
        }
      }

      var usersCounter = new CountUp(usersEl, 0, usersAmount, 0, 3);
      var tasksCounter = new CountUp(tasksEl, 0, tasksAmount, 0, 3);

      usersCounter.printValue = function (value) {
        fillCounter(value, usersEl);
      };

      tasksCounter.printValue = function (value) {
        fillCounter(value, tasksEl);
      };

      usersCounter.reset();
      tasksCounter.reset();

      window.addEventListener('scroll', scroll);
    }
  });
}());
