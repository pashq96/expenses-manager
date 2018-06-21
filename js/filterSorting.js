$(function () {
    $('.date').datepicker({
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dayNamesMin: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        dateFormat: 'dd.mm.yy',
        firstDay: 'пн'
    })

    let $sum = 0
    $('#sum').text($sum)

    //при вводе даты сортировка
    if ($('#dateWith').val() == '' && $('#dateTo').val() == '') {
        getValueAfterReload()
    }


    $('#dateWith').change(function () {
        if (localStorage.length > 0) {
            $('li').remove()
            $sum = 0
            for (i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var returnObj = JSON.parse(localStorage.getItem(key))

                let $dateTo = $('#dateTo').val().replace('.', '/')
                let $dateWith = $('#dateWith').val().replace('.', '/')
                let dateLocalStorage = returnObj.date.replace('.', '/')

                if ($('#dateTo').val() !== '') {

                    if ($dateWith <= dateLocalStorage && $dateTo >= dateLocalStorage) {


                        $('#tdList').append("<li class='item' data-id='" + returnObj.id + "' data-item=" + returnObj.cost + " date-sort=" + returnObj.date + ">" + returnObj.id + ' | ' + returnObj.name + ' | ' + returnObj.cost + ' | ' + returnObj.date + "</li>")

                        $sum += parseInt(returnObj.cost)
                        $('#sum').text($sum)
                    }
                } else if ($dateWith <= dateLocalStorage) {

                    $('#tdList').append("<li class='item' data-id='" + returnObj.id + "' data-item=" + returnObj.cost + " date-sort=" + returnObj.date + ">" + returnObj.id + ' | ' + returnObj.name + ' | ' + returnObj.cost + ' | ' + returnObj.date + "</li>")

                    $sum += parseInt(returnObj.cost)
                    $('#sum').text($sum)
                }

                if ($('#dateWith').val() == '' && $('#dateTo').val() == '') {
                    getValueAfterReload()
                }
            }
        }
    })

    $('#dateTo').change(function () {
        if (localStorage.length > 0) {
            $('li').remove()
            $sum = 0
            for (i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var returnObj = JSON.parse(localStorage.getItem(key))

                let $dateTo = $('#dateTo').val().replace('.', '/')
                let dateLocalStorage = returnObj.date.replace('.', '/')
                let $dateWith = $('#dateWith').val().replace('.', '/')

                if ($('#dateWith').val() !== '') {

                    if ($dateWith <= dateLocalStorage && $dateTo >= dateLocalStorage) {


                        $('#tdList').append("<li class='item' data-id='" + returnObj.id + "' data-item=" + returnObj.cost + " date-sort=" + returnObj.date + ">" + returnObj.id + ' | ' + returnObj.name + ' | ' + returnObj.cost + ' | ' + returnObj.date + "</li>")

                        $sum += parseInt(returnObj.cost)
                        $('#sum').text($sum)
                    }
                } else if ($dateTo >= dateLocalStorage) {
                    $('#tdList').append("<li class='item' data-id='" + returnObj.id + "' data-item=" + returnObj.cost + " date-sort=" + returnObj.date + ">" + returnObj.id + ' | ' + returnObj.name + ' | ' + returnObj.cost + ' | ' + returnObj.date + "</li>")

                    $sum += parseInt(returnObj.cost)
                    $('#sum').text($sum)
                }
                if ($('#dateWith').val() == '' && $('#dateTo').val() == '') {
                    getValueAfterReload()
                }
            }
        }
    })


    //-----------------------------------


    // Сортировка по дате/сумме

    $('#choose').change(function () {
        let $choose = $("#choose option:selected").val()
        if ($choose == "sortCost") {

            var mylist = $('ul');
            var listitems = mylist.children('li').get();
            listitems.sort(function (a, b) {
                var distA = parseInt($(a).attr('data-item'));
                var distB = parseInt($(b).attr('data-item'));
                return (distA < distB) ? -1 : (distA > distB) ? 1 : 0;
            });
            $.each(listitems, function (idx, itm) {
                mylist.append(itm);
            })
        }
        //        if($choose == "sortDate") {
        //            let $dateSort = $('date-sort')
        //            var mylist = $('ul')
        //            var listitems = mylist.children('li').get()
        //            function dateSorter(a, b) {
        //                var c = new Date('date-sort');
        //                var d = new Date('date-sort');
        //                return c-d;
        //            }
        //            $.each(listitems, function(idx, itm){ 
        //              mylist.append(itm);
        //            })
        //            
        //            console.log($dateSort)
        //            
        //        }
    })

    //------------------------------------------------
    // вызов функции вывода элементов из localStorage в DOM на главной стр
    function getValueAfterReload() {

        if (localStorage.length > 0) {
            for (i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var returnObj = JSON.parse(localStorage.getItem(key))

                $('#tdList').append("<li class='item' data-id='" + returnObj.id + "' data-item=" + returnObj.cost + " date-sort=" + returnObj.date + "><foo>" + returnObj.id + '</foo><foo>' + returnObj.name + '</foo><foo>' + returnObj.cost + '</foo><foo>' + returnObj.date + "</foo></li>")

                $sum += parseInt(returnObj.cost)
                $('#sum').text($sum)
            }

        }
    }
    //-----------------------------------------------   
    //Создание лишек

    //    function creatLi(){
    //        $('#tdList').append("<li class='item' data-id='"+ returnObj.id  + "' data-item=" + returnObj.cost  + " date-sort=" + returnObj.date  + ">" + returnObj.id + ' | ' + returnObj.name +' | ' + returnObj.cost +' | ' + returnObj.date + "</li>")
    //            
    //           $sum+=parseInt(returnObj.cost)
    //            $('#sum').text($sum)
    //    }

    //--------------------------------------------------------------------------
    // запись по клику на страницу edit_route.html
    function openEditToute() {
        var key = sessionStorage.key(0)
        var route = JSON.parse(sessionStorage.getItem(key))
        $('.id').val(route.id)
        $('.name').val(route.name)
        $('.cost').val(route.cost)
        $('.date').val(route.date)

    }
    if (sessionStorage.length > 0) openEditToute()
    //-----------------------------------------------

    //нажатие на кнопку сохранить
    $("#save").click(function () {

        newObj()

        window.location.href = "index.html"
        sessionStorage.clear()
    })
    //------------------------------------------

    //нажатие на кнопку удалить
    $("#del").click(function () {
        $id = $('.id').val()
        localStorage.removeItem($id)
        sessionStorage.clear()
        window.location.href = "index.html"
    })
    //------------------------------------------




    // добавление меню редактирования
    $('#tdList').on({
        mouseenter: function () {
            var listElem = $(this);
            listElem.append('<div class="hover-edit-menu"><a href="#" class="edit-button"><i class="fas fa-pencil-alt"></i></a></div>')

            // редактирование значения элемента списка
            $('.hover-edit-menu').on('click', '.edit-button', function () {

                window.location.href = "editid_route.html"
                var route = sessionStorage.setItem(listElem.attr("data-id"), localStorage.getItem(listElem.attr("data-id")))
            })
        },

        mouseleave: function () {
            $('.hover-edit-menu').remove();
        }

    }, '.item')





    //блокирование изменения id  в инпуте
    function blockInput() {
        $('.id').prop('disabled', true)
    }
    blockInput()
    //------------------------------------------


    // добавление нового расхода
    $("#addRoute").click(function () {
        newObj()
        window.location.href = "index.html"
    })
    //------------------------------------------------------------------

    //Создание и редактирование объекта
    function newObj() {
        let route = new Object()

        route = {
            id: $('.id').val(),
            name: $('.name').val(),
            cost: $('.cost').val(),
            date: $('.date').val(),
        }

        let keys = Object.keys(route)

        let sRoute = JSON.stringify(route)
        localStorage.setItem(route[keys[0]], sRoute)

        for (var i = 0; i < localStorage.length; i++) {
            key = localStorage.key(i)
            var returnObj = JSON.parse(localStorage.getItem(key))
        }

    }
    //--------------------------------------------------------------------
});
