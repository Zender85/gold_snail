/* НАСТРОЙКА:

     1. Подключаем скрипт /cdn/js/popups.js

     2. После него, в конце body запускаем всплывашки с настройками следующим образом:
    <script>
    initPopups({
        product : 'PRODUCT NAME', // списываем название продукта
        lang : 'vn', // язык (пока доступны vn, ro, es, it, id, de, th)
        wheel : true, // сообщения о покупках с разными скидками, либо только 50%
        bgColor: 'rgba(4, 0, 255, 0.8)', // цвет фона сообщения
        textColor : '#fff', // цвет основного текста сообщения
        emphColor : 'cyan' // цвет выделений в сообщениях (например, 'со скидкой XX%', '' )
        blackIcons :  true // черные или белые иконки, значения true или false
    });
</script>
*/


function initPopups(settings) {
    // блок проверки
    if (!settings) {
        console.log('%c%s', 'font-size: 30px; color: red;background-color: #ffe7e8', 'Хей, а скрипт настроить? ');
        throw new Error('No Settings Found');
    }
    if (!settings.product) {
        console.log('%c%s', 'font-size: 30px; color: red;background-color: #ffe7e8', 'А продукт кто будет указывать??');
        throw new Error('Product is not set!');
    }
    if (!settings.lang) {
        console.log('%c%s', 'font-size: 30px; color: red;background-color: #ffe7e8', 'А язык??');
        throw new Error('Language is not set!');
    }
    console.log('Product: ' + settings.product + ',\nLanguage: ' + settings.lang+',\nWheel: ' + !!settings.wheel);

    // вставляем стили и блок
    if (window.location.protocol == 'file:') {
         var popupsBlock = '<div class="show-message"></div><style>@import url("popups/css/popups.css");.show-message__item, .show-message__item-first{background-color:' +  ((!settings.bgColor) ? ' ' : settings.bgColor) + ';}.show-message__info{color: ' + ((!settings.textColor) ? ' ' : settings.textColor) + ';} .show-message__info #js-user-id {color: ' + ((!settings.textColor) ? ' ' : settings.textColor) + '} .show-message__emph { color: ' + ((!settings.emphColor) ? ' ' : settings.emphColor) + '}  ' + ((!settings.blackIcons) ? ' ' : '.show-message__info.icon-box::before {  content: " ";  background-image: url("http://world-jounal.com/cdn/img/count-user_black.png");} .everad-sprite-bucket+.show-message__info.icon-box::before { background-image: url("http://world-jounal.com/cdn/img/count-order-984_black.png");}') + '</style>';
         console.log('connecting files locally');
    } else {
    var popupsBlock = '<div class="show-message"></div><style>@import url("popups/css/popups.css");.show-message__item, .show-message__item-first{background-color:' +  ((!settings.bgColor) ? ' ' : settings.bgColor) + ';}.show-message__info{color: ' + ((!settings.textColor) ? ' ' : settings.textColor) + ';} .show-message__info #js-user-id {color: ' + ((!settings.textColor) ? ' ' : settings.textColor) + '} .show-message__emph { color: ' + ((!settings.emphColor) ? ' ' : settings.emphColor) + '}  ' + ((!settings.blackIcons) ? ' ' : '.show-message__info.icon-box::before {  content: " ";  background-image: url("/cdn/img/count-user_black.png");} .everad-sprite-bucket+.show-message__info.icon-box::before { background-image: url("/cdn/img/count-order-984_black.png");}') + '</style>';
    }
    document.body.insertAdjacentHTML('beforeend', popupsBlock);
    count_class = ".count-people";

    //функция определения размера скидки (если есть колесо - то будут выводиться разне значения, если нет - то 50%)
    function getDiscount() {
        if (settings.wheel) {
            var discountVal = ['10%', '30%', '15%', '35%'];
            return discountVal[Math.floor(Math.random() * 4)];
        } else {
            var discountVal = '50%';
            return discountVal;
        }
    }
    lastpack_class = ".lastpack";

    // тексты сообщений
    var popupsMsg = {
        'vn': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Số lượng người truy cập trang web:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> vừa đặt mua ' + settings.product + ' <span class="show-message__emph">với giá khuyến mãi ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;"> Còn <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph">' + Math.ceil(Math.random() * 15 + 10) + '</span></span> sản phẩm với giá khuyễn mãi.</span></p></div>'
        },
        'ru': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Посетителей на сайте:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> заказала ' + settings.product + ' <span class="show-message__emph"></span></p></div>',
            message04: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> заказала ' + settings.product + ' <span class="show-message__emph"></span></p></div>',
        },
        'ro': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Utilizatori pe pagină:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> a comandat  ' + settings.product + ' <span class="show-message__emph">cu o reducere de  ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;"> Ambalaje rămase cu reducere: <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph">' + Math.ceil(Math.random() * 15 + 10) + '</span></span></span></p></div>'
        },
         'it': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Utenti sulla pagine:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> ha ordinato  ' + settings.product + ' <span class="show-message__emph">con lo sconto del ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;"> Confezioni rimanenti in offerta: <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph">' + Math.ceil(Math.random() * 15 + 10) + '</span></span></span></p></div>'
        },
         'es': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Usuarios on-line:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> ha pedido ' + settings.product + ' <span class="show-message__emph">con el descuento de ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Quedan con la oferta especial:  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph">' + Math.ceil(Math.random() * 15 + 10) + '</span></span></span></p></div>'
        },
         'id': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Jumlah pengunjung situs ini: <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> telah membeli ' + settings.product + ' <span class="show-message__emph">dengan diskon ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Tersisa  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph">' + Math.ceil(Math.random() * 15 + 10) + '</span></span> buah selama masa promo</span></p></div>'
        },
          'de': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Anzahl der Besucher auf der Webseite:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> bestellte  ' + settings.product + ' <span class="show-message__emph"> mit einem Rabatt von  ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Nur noch  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph">' + Math.ceil(Math.random() * 15 + 10) + '</span></span> St. zum Aktionspreis</span></p></div>'
        },
         'th': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">ผู้เยี่ยมชมเว็บไซต์ในขณะนี้:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> สั่ง  ' + settings.product + ' <span class="show-message__emph"> ได้รับส่วนลด  ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">สินค้าโปรโมชั่นคงเหลือ  <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph">' + Math.ceil(Math.random() * 15 + 10) + '</span></span> ชิ้น</span></p></div>'
        },
        'gr': {
            message02: '<div class="show-message__item show-message_online"><i class="everad-sprite everad-sprite-online_user"></i><p class="show-message__info icon-box horizon">Ο αριθμός των επισκεπτών στην ιστοσελίδα:  <span id="js-user-id"></span></p></div>',
            message03: '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> παρήγγειλα ' + settings.product + ' <span class="show-message__emph">με έκπτωση ' + getDiscount() + '</span></p></div>',
            message04: '<div class="show-message__item show-message_call last-message"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span style="font-size: 16px;">Έμειναν <span class="pacedNamed"></span><span style="font-size: 20px;font-weight: bold;"><span class="show-message__emph">' + Math.ceil(Math.random() * 15 + 10) + '</span></span> τεμ. με έκπτωση</span></p></div>'
        }
    }
    flag_phone = true;
    flag_five = true;
    flag_key = true;
    idleTimer = null;
    idleState = false;
    idleWait = 30000;
    if (parseInt($(".price_land_s1:first").text()) > 0) {
        price = parseInt($(".price_land_s1:first").text()) || 990
    } else {
        price = 0
    }
    var d = first_count();
    var c = new Date();
    var e = parseInt(c.getDate());
    var b = "27";
    changeBlink(b);
    var a = [4, 4, 4, 5, 5];
    if (localStorage.getItem("___cp")) {
        tm = parseInt(localStorage.getItem("___tm"));
        if (e - tm == 0) {
            d = localStorage.getItem("___cp");
            b = localStorage.getItem("___lp");
            changeBlink(b);
        } else {
            setLS(e, b, a, d)
        }
    } else {
        setLS(e, b, a, d)
    }
    $(count_class).text(d);
    $(lastpack_class).text(b);
    if ($(window).width() > 991) {
        $(document).bind("keydown", function() {
            if (flag_key) {
                clearTimeout(idleTimer);
                idleState = false;
                idleTimer = setTimeout(function() {
                    flag_key = false;
                    /*$.magnificPopup.open({
                        items: {
                            //src: "#pu-form",
                            src: "#myModal",    
                            type: "inline"
                        }
                    });*/
                    idleState = true
                }, idleWait)
            }
        });
        $("body").trigger("keydown")
    }
    $(".show-message").on("click", function() {
        $(".show-message__item").fadeOut(100);
        setTimeout(function() {
            $(".show-message").empty()
        }, 200)
    });
    setTimeout(function() {
        popUp()
    }, 8000)

    function first_count() {
        var e = new Date();
        var c = e.getHours();
        var a = e.getMinutes();
        var b = 100;
        var f = b + c * 12 + Math.floor(a / 5);
        return f
    }

    function popUp() {
        var a = rand(321, 769);
        localStorage.setItem("___rp", a);
        shwMsg(popupsMsg[settings.lang].message02, "", a);
        setTimeout(function() {
            var b = parseInt(localStorage.getItem("___lp"));
            if (b <= 5) {
                if (flag_five) {
                    shwMsg(popupsMsg[settings.lang].message03, orderName(), 0);
                    flag_five = false;
                    setTimeout(function() {
                        showPopupEnd()
                    }, 12000)
                }
            } else {
                var c = JSON.parse(localStorage.getItem("___sp"));
                showPopupBegin(b, c)
            }
        }, 12000)
    }

    function showPopupBegin(e, b) {
        var a = orderName();
        var g;
        var c;
        var i;
        var f;
        var h;
        var d;
        if ((b.length == 2) && (flag_phone)) {
            // message03 = '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> vừa đặt mua ' + settings.product + ' <span class="show-message__emph">với giá khuyến mãi ' + discountVal[Math.floor(Math.random() * 4)] + '</span></p></div>';
            shwMsg(popupsMsg[settings.lang].message03, orderName(), 0);
            flag_phone = false;
            setTimeout(function() {
                h = e;
                showPopupBegin(h, b)
            }, 13000)
        } else {
            g = Math.floor(Math.random() * (b.length));
            c = b[g];
            i = parseInt(window.price777) * parseInt(c) + window.curr777;
            f = parseInt(localStorage.getItem("___cp")) + 1;
            h = e - c;
            if ((price == 0) || (price == 1)) {
                /*d = '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name">' + a + "</span></span>, сделал(а) заказ полного курса</p></div>"  */
            } else {
                d = '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name">' + a + '</span></span>, сделал(а) заказ на сумму ' + i + ', заказано <span class="bay">' + c + '</span> <span class="paced">упаковок</span><br><span class="package_left"> Осталось <span class="pacedNamed"></span> по акции <span class="blink_me">' + h + "</span></span></p></div>";
                changeBlink(h);
            }
            b.splice(g, 1);
            localStorage.setItem("___lp", h);
            localStorage.setItem("___sp", JSON.stringify(b));
            localStorage.setItem("___cp", f);
            $(count_class).text(f);
            $(lastpack_class).text(h);
            shwMsg(popupsMsg[settings.lang].message03, orderName(), 0);
            setTimeout(function() {
                if (h > 5) {
                    showPopupBegin(h, b)
                } else {
                    if (flag_five) {
                        shwMsg(popupsMsg[settings.lang].message03, orderName(), 0);
                        flag_five = false;
                        setTimeout(function() {
                            showPopupEnd()
                        }, 12000)
                    } else {
                        showPopupEnd()
                    }
                }
            }, 13000)
        }
    }

    function showPopupEnd() {
        var b = true;
        var a = "";
        setInterval(function() {
            var c = new Array(0, 1);
            var d = c[Math.floor(Math.random() * (c.length))];
            if (d == 0) {
                kindx = rand(1, 33);
                rp = parseInt(localStorage.getItem("___rp"));
                if (b) {
                    rp = rp + kindx;
                    b = false
                } else {
                    rp = rp - kindx;
                    b = true
                }
                localStorage.setItem("___rp", rp);
                shwMsg(popupsMsg[settings.lang].message02, "", rp)
            } else {
                a = orderName();
                // message03 = '<div class="show-message__item show-message_call"><i class="everad-sprite everad-sprite-bucket"></i><p class="show-message__info icon-box horizon"><span class="js-show-name"><span class="js-name"></span></span> vừa đặt mua ' + settings.product + ' <span class="show-message__emph">với giá khuyến mãi ' + discountVal[Math.floor(Math.random() * 4)] + '</span></p></div>';
                shwMsg(popupsMsg[settings.lang].message03, orderName(), 0)
            }
        }, 13000)
    }

    function orderName() {
        var popupsNames = {
            'vn': ["Linh", "Mai", "Huyền", "Hoàng", "Thúy", "Tâm", "Đức", "Mạnh", "Đông", "Nam", "Bắc", "Ngọc", "Quỳnh", "Nhi", "Vinh", "Huy", "Thiện", "Thảo", "Vân", "Tiên", "Ánh", "Lâm", "My", "Thu", "Thư", "Bách", "Đăng", "Thủy", "Oanh", "Trường", "Sơn", "Tú", "Quý", "Phú", "Hải", "Quân", "Minh", "Hương", "Xuân", "Duy", "Việt", "Tuấn", "Duy Anh", "Việt Anh", "Đức Anh", "Thuận", "Hưng", "Hùng", "Tiến", "Thành", "Tuấn Anh", "Vân Anh", "Ngọc Anh", "Quỳnh Anh", "Lan Anh", "Khanh", "Vĩnh", "Hiền", "Tuyền", "Kim Anh", "Tuân", "Thắng"],
            'ru': ["Лиза", "Катерина", "Анна", "Елена В.", "Мария П.", "Юлия", "Валентина Петровна", "Алена", "Алина", "Алиса", "Алла", "Ольга", "Анжелика", "Вера", "Валерия", "Дарья", "Диана", "Ирина", "Инна", "Карина", "Кристина", "Людмила", "Маргарита", "Надежда", "Наталья", "Оксана", "Олеся", "Полина", "Регина", "Светлана", "Софья", "Татьяна", "Тамара", "Яна"],
            'ro': ["Alexandru B. ", "Mihai O.", "Ştefan", "Ionuţ Cr.", "David", "Matei", "Ion L.", "Georghe", "Florentin", "Floarea", "Viorel B.", "Nicu T.", "Daniel", "Elena", "Petre M.", "Marius", "Andrei", "Alex P.", "Vasile", "Constantin", "Dumitru", "Nicolae"],
            'it' : ["Camillo", "Arturo", "Sergio", "Valerio", "Amedeo", "Paolo", "Michele", "Valentino", "Pietro", "Pasquale", "Vincenzo", "Jacopo", "Arnoldo", "Luciano", "Stefano", "Antonella", "Assunta", "Roberta", "Emma", "Michela", "Giorgina", "Emilia", "Marisa", "Diana", "Brigida", "Alessia", "Elisabetta", "Cecilia", "Rosina", "Fabiola"],
            'es' : ["Cristián", "Gonzalo", "Gustavo", "César", "José", "Felipe", "Carlos", "Eduardo", "Adrián", "Cristóbal", "Miguel", "Juan Carlos", "Roberto", "Alberto", "Ricardo", "Inés", "Felisa", "Rocío", "Marta", "Josefa", "Beatriz", "Manuela", "Margarita", "Esperanza", "Carla", "Francisca", "Elvira", "Irene", "Lorena", "Monica"],
            'id' : ["Sayed", "Andin", "Rizki", "Mahmud", "Mohammad", "Rahem", "Joko", "Agus", "Wahyu", "Ahmad", "Kurniawan", "Budi", "Arief", "Yusuf", "Fajar", "Indra", "Abdul", "Nugroho", "Hadiyat", "Brian", "Taufik", "Aki", "Rudi", "Hanif", "Rian", "Pji", "Subhar", "Yon", "Wanto", "Aden", "Nanang", "Nur", "Dwi"," Putri", "Siti", "Ainun", "Aurelia", "Maria", "Lidya", "Ratna", "Fitri", "Pratiwi", "Lestari", "Rahma", "Anita", "Kurnia", "Yunita", "Widya", "Agustina", "Intan", "Rini", "Maya", "Devi", "Utami", "Mimin", "Cantika", "Yuni", "Diana"],
            'de' :  ["Georg", "Manfred", "Hans", "Otto", "Alfred", "Stefan", "Tomas", "Rudolph", "Til", "Sebastian", "Karl", "Kristian", "Günther", "Hermann", "Calvin", "Franka", "Sofie", "Karoline", "Frida", "Maria", "Anke", "Elisabeth", "Elsa", "Louisa", "Miriam", "Herta", "Helene", "Edwina", "Ingrid", "Andrea"],
            'th' : ['พัช', 'ต้น', 'น้ำทิพย์', 'ทราย', 'นุดา', 'ภาษณ์', 'กันต์', 'ผึ้ง', 'คิง', 'แต้ว', 'พิชญ์', 'ต้นตาล', 'มิกกี้', 'บีม', 'ซันนี่', 'ต้นข้าว', 'วิน', 'เบส', 'เรน', 'นาวิน', 'ออกัส', 'อะตอม', 'ต้นข้าว', 'พิมพ์', 'แมน', 'ไอด้า', 'ดาว', 'อาร์ต', 'โอม', 'จอมใจ', 'ภีม', 'เพชร', 'พลอยใส'],
            'gr' : ["Γεώργιος", "Δημήτριος", "Κωνσταντίνος", "Ιωάννης", "Νικόλαος", "Χρήστος", "Παναγιώτης", "Βασίλειος", "Αθανάσιος", "Ευάγγελος", "Ραφαήλ", "Ροβέρτος", "Σεβαστιανός", "Στέφανος", "Φάνης", "Μαρία", "Ελένη", "Αικατερίνη", "Βασιλική", "Γεωργία", "Σοφία", "Αναστασία", "Ευαγγελία", "Ιωάννα", "Δήμητρα", "Δωροθέα", "Κασσάνδρα", "Κύρα", "Ηλιάνα", "Ίρις", "Γιωργία","Αγάπη"]
        }
        var popupsFromword = {
            'vn' : ' từ ',
            'ro' : ' din ',
            'ru' : ' из г. ',
            'it' : ' da ',
            'es' : ' de la ciudad ',
            'id' : ' dari kota ',
            'de' : ' aus ',
            'th' : 'จาก',
            'gr' : ' από την πόλη '
        }
        var popupsCities = {
            'vn': ["Hà Nội", "Tp. Hồ Chí Minh", "Hải Phòng", "Nha Trang", "Vũng Tàu", "Thanh Hóa", "Huế", "Đà Nẵng", "Đà Lạt", "Cần Thơ", "Biên Hòa", "Buôn Ma Thuột", "Vinh", "Quy Nhơn", "Long Xuyên", "Thái Nguyên", "Nam Định", "Rạch Giá", "Thủ Dầu Một", "Hạ Long", "Phan Thiết", "Thanh Hóa"],
            'ro': ["Bucureşti", "Iași", "Cluj-Napoca", "Timișoara", "Constanța", "Craiova", "Galați", "Brașov"],
            'ru': ["Москва", "Санкт-Петербург", "Саратов", "Владивосток", "Владимир", "Казань", "Сызрань", "Екатеринбург", "Екатеринбург", "Новосибирск", "Нижний Новгород", "Самара"],
            'it' :  ["Roma", "Napoli", "Palermo", "Pisa", "Firenze", "Siena", "Milano", "Torino", "Verona", "Venezia", "Catania", "Perugia", "Genova", "Bologna", "Bergamo"],
            'es' : ["Madrid", "Vitoria-Gasteiz", "Segovia", "Salamanca", "Badajoz", "Santander", "A Coruña", "València", "Murcia", "Granada", "Barcelona", "Sevilla", "Toledo", "Cáceres", "Ávila"],
            'id' : ["Banda Aceh", "Langsa", "Meulaboh", "Sabang", "Denpasar", "Cilegon", "Tangerang", "Medan", "Yogyakarta", "Palembang", "Surabaya", "Jambi", "Gorontalo", "Bandung", "Bogor", "Bekasi", "Depok", "Cirebon", "Purwokerto", "Semarang", "Surakarta", "Malang", "Pontianak", "Tarakan", 'Palu', 'Makassar', 'Pekanbaru', 'Bukittinggi', 'Sibolga', 'Bima', 'Samarinda', 'Bau-Bau', 'Kotamobagu', 'Pagaralam', 'Tanjungbalai'],
            'de' :  ["Leipzig", "München", "Düsseldorf", "Hamburg", "Berlin", "Köln", "Frankfurt", "Nürnberg", "Stuttgart", "Dortmund", "Lübeck", "Dresden", "Hannover", "Bremen", "Heidelberg"],
            'th' : ['กรุงเทพฯ', 'เชียงใหม่', 'น่าน', 'พังงา', 'กระบี่', 'จันทบุรี', 'ปทุมธานี', 'ราชบุรี', 'ลำปาง', 'ชลบุรี', 'ร้อยเอ็ด', 'ภูเก็ต', 'กำแพงเพชร', 'นนทบุรี', 'พะเยา', 'ตราด', 'ขอนแก่น', 'อำนาจเจริญ', 'เชียงราย', 'สุรินทร์', 'ชุมพร', 'นครราชสีมา', 'แม่ฮ่องสอน', 'แพร่', 'ลพบุรี', 'นครพนม', 'สระแก้ว', 'หนองคาย', 'มุกดาหาร', 'อ่างทอง', 'สุโขทัย', 'ระยอง', 'ตรัง', 'สุพรรณบุรี', 'พิจิตร' ],
            'gr' : ["Αθήνα", "Καλλιθέα", "Τρίπολη", "Αγρίνιο", "Ιωάννινα", "Θεσσαλονίκη", "Αλεξανδρούπολη", "Καβάλα", "Άρτα", "Πάτρα", "Καλαμάτα", "Σπάρτη", "Ηράκλειο", "Χανιά", "Λαγανάς"]
        }
        var d = popupsNames[settings.lang][Math.floor(Math.random() * (popupsNames[settings.lang].length))];
        var b = popupsCities[settings.lang][Math.floor(Math.random() * (popupsCities[settings.lang].length))];
        return d + popupsFromword[settings.lang] + b
    }

    function rand(b, a) {
        b = parseInt(b);
        a = parseInt(a);
        return Math.floor(Math.random() * (a - b + 1)) + b
    }

    function shwMsg(c, a, b) {
        $(".show-message").append(c);
        if (a != "") {
            $(".js-name").text(a)
        }
        if (b != 0) {
            $("#js-user-id").text(b)
        }
        $(".show-message__item").slideDown(500).delay(5000).slideUp(500).delay(5000);
        setTimeout(function() {
            $(".show-message").empty()
        }, 6500)
    }

    function setLS(d, b, a, c) {
        localStorage.setItem("___cp", c);
        localStorage.setItem("___tm", d);
        localStorage.setItem("___lp", b);
        localStorage.setItem("___sp", JSON.stringify(a))
    };

    function changeBlink(e) {
        var elem = document.body.querySelectorAll('.left.blink');
        for (var i = 0; i < elem.length; i++) {
            elem[i].innerHTML = e;
        };
    }
}