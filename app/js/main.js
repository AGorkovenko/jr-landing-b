// Header Nav smooth scroll
(function () {
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    var $target = $($(this).attr('href'));
    var offsetTop = $target.offset().top;
    var duration = (offsetTop > 1000) ? offsetTop / 2.5 : 500;

    if($target.length) {
      $('html, body').animate({
        scrollTop: offsetTop
      }, duration)
    }
  });
}());

// Glide slider
(function () {
  $(function () {
    $("#review-slider").glide({
      type: "carousel",
      animationTimingFunc: 'cubic-bezier(0.77, 0, 0.175, 1)',
      animationDuration: 650,
      dragDistance: 180,
      touchDistance: 150,
      autoplay: 5000
    });
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
(function() {
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
(function() {
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

    function scroll() {
      if (numbers.getBoundingClientRect().top - window.innerHeight <= 0) {
        usersCounter.start();
        tasksCounter.start();
        window.removeEventListener('scroll', scroll);
      }
    }

    var usersEl = document.getElementById('counter-users');
    var tasksEl = document.getElementById('counter-tasks');

    var usersCounter = new CountUp(usersEl, 0, usersEl.getAttribute('data-value'), 0, 3);
    var tasksCounter = new CountUp(tasksEl, 0, tasksEl.getAttribute('data-value'), 0, 3);

    usersCounter.printValue = function (value) {
      fillCounter(value, usersEl);
    };

    tasksCounter.printValue = function (value) {
      fillCounter(value, tasksEl);
    };

    usersCounter.reset();
    tasksCounter.reset();

    window.addEventListener('scroll', scroll);
}());
