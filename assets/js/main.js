/* Modal-window-call */
$(document).ready(function(){
    $("[data-modal-button]").on("click", function () {
        $("[data-modal]").removeClass("popup_closed");
        $('body').addClass('no-scroll');
        $("[data-modal-close]").on("click", function () {
            $("[data-modal]").addClass("popup_closed");
            $('body').removeClass('no-scroll');
        });
        $("[data-modal]").on("click", function () {
            $("[data-modal]").addClass("popup_closed");
            $('body').removeClass('no-scroll');
        });
        $(".popup_content").on("click", function (event) {
            event.stopPropagation();
        });
    }); 
});

/* Modal-window-buses */
const modalButton = $('[data-modal]');
const modalClose = $("[data-close]");
modalButton.on("click", function(event){
    event.preventDefault();
    let $this = $(this);
    let modalId = $this.data('modal');
    $(modalId).addClass('modal-show');
    $("body").addClass("no-scroll");

    setTimeout(function() {
        $(modalId).find('.modal__dialog').css({
            transform: "scale(1)"
        });
    }, 200);
});

modalClose.on("click", function(event){
    event.preventDefault();
    let $this = $(this);
    let modalParent = $this.parents('.modal');

    modalParent.find('.modal__dialog').css({
        transform: "scale(0)"
    });

    setTimeout(function() {
        modalParent.removeClass('modal-show');
        $("body").removeClass("no-scroll");
    }, 200);
});

$(".modal").on("click", function(event){
    let $this = $(this);

    $this.find('.modal__dialog').css({
        transform: "scale(0)"
    });

    setTimeout(function() {
        $this.removeClass('modal-show');
        $("body").removeClass("no-scroll");
    }, 200);
});

$(".modal__dialog").on("click", function(event){
    event.stopPropagation();
});

/* Mask */

$(function(){
    $("#phone").mask("+375(99) 999-99-99");
});

/* Validate Form and Send Mail*/

new window.JustValidate('.consult_form', {
    rules: {
        name:{
            required: true  
        },
        phone: {
            required: true           
        }
    },
    messages: {
        name: {
            required: 'Это поле не должно быть пустым'
        },
        phone:{
            required: 'Это поле не должно быть пустым'
        } 
    },
    colorWrong: '#ff0030',
    submitHandler: function (thisForm) {
        let formData = new FormData(thisForm);

        let xhr = new XMLHttpRequest();
        const message = {
            loading: 'Загрузка...',
            success: 'Спасибо, скоро свяжемся!',
            failure: 'Что-то пошло не так...'
        };

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        thisForm.append(statusMessage);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Отправлено');
                    statusMessage.textContent = message.success;
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                } else {
                    statusMessage.textContent = message.failure;                  
                }
            }
        }
        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        thisForm.reset();
    }
});

/* Burger-menu */

$(".menu-icon-wrapper").on("click", function(){
    $(".menu-icon").toggleClass("menu-icon-active");  
    $('body').toggleClass("lock");
});

$("#menu-icon-wrapper").on("click", function(event){
    event.preventDefault();

    const nav = document.querySelector(".nav");
    nav.classList.toggle("active");
});



