$("#navbar").html('<nav style="box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;" class="navbar navbar-expand-lg navbar-light bg-white">\n' +
    '    <a class="navbar-brand" href="index.html"><img style="width: 100px;" src="assets/img/dux.png"></a>\n' +
    '    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\n' +
    '        <span class="navbar-toggler-icon"></span>\n' +
    '    </button>\n' +
    '\n' +
    '    <div class="collapse navbar-collapse" id="navbarSupportedContent">\n' +
    '        <ul class="navbar-nav mr-auto">\n' +
    '            <li class="nav-item">\n' +
    '                <a class="nav-link" href="index.html">Main <span class="sr-only">(current)</span></a>\n' +
    '            </li>\n' +
    '            <li class="nav-item">\n' +
    '                <a class="nav-link" href="kontakti.html">Contacts</a>\n' +
    '            </li>\n' +
    '            <li class="nav-item">\n' +
    '                <a class="nav-link" href="auth.html">Reg/Auth</a>\n' +
    '            </li>\n' +
    '            <li class="nav-item">\n' +
    '                <a class="nav-link" href="lk.html">My account</a>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '        <div class="form-inline my-2 my-lg-0">\n' +
    '            <div id="right_block">\n' +
    '                <button data-toggle="modal" data-target="#exampleModal" class="btn btn-outline-success my-2 my-sm-0" type="button"><i class="fa fa-shopping-basket"></i></button>\n' +
    '            </div>\n' +
    '<button type="button" class="btn btn-info ml-1 unlogin">Log Out</button>\n' +
    '        </form>\n' +
    '    </div>\n' +
    '</nav><!-- Modal -->\n' +
    '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
    '  <div class="modal-dialog" role="document">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h5 class="modal-title" id="exampleModalLabel">Basket</h5>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '          <span aria-hidden="true">&times;</span>\n' +
    '        </button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '        <table id="basket_table" class="table table-sm table-striped table-bordered table-hover dataTable no-footer w-100">' +
    '           <thead>' +
    '               <th>Name</th>' +
    '               <th>Cost</th>' +
    '               <th>Action</th>' +
    '           </thead>' +
    '        </table>\n' +
    '      </div>\n' +
    '      <div class="modal-footer">\n' +
    '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
    '        <button type="button" class="btn btn-primary new_order">Order</button><button type="button" style="display: none;" onclick="window.location.href=`auth.html`" class="btn btn-danger u_need_auth">You need auth</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');
$('.unlogin').on('click', function() {
    localStorage.removeItem('auth_user');
    location.reload();
});
if (!localStorage.getItem('auth_user')) {
    $('.unlogin').hide();
}
var table_basket = $('#basket_table').DataTable({
    processing: true,
    ordering: false,
    //language: {url: '//cdn.datatable_baskets.net/plug-ins/1.10.20/i18n/Russian.json'},
    data: JSON.parse(localStorage.getItem("basket")),
    "columns": [{
            render: function(data, type, row) {
                return row.name;
            }
        },
        {
            render: function(data, type, row) {
                return row.price;
            }
        },
        {
            render: function(data, type, row) {
                return '<div onclick="fromBasket(' + row.id + ')" style="text-align: center; cursor:pointer;"><i style="color: red;" class="fa fa-times"></i></div>';
            }
        }
    ],
});

function toBasket(id, name, price) {
    var basket = JSON.parse(localStorage.getItem("basket"));
    if (basket == null) {
        basket = [];
    }
    var item = {
        id: id,
        name: name,
        price: price
    };

    var find = basket.find(x => x.id === id);

    if (find != null) {
        showMessage('This item is already isset', 'error');
    } else {

        basket.push(item);
        localStorage.setItem("basket", JSON.stringify(basket));
        //auth
        showMessage('Item added to cart', 'success');
        table_basket.clear().draw();
        table_basket.rows.add(basket);
        table_basket.columns.adjust().draw();
    }
}

function fromBasket(id) {
    var basket = JSON.parse(localStorage.getItem("basket"));
    var removeIndex = basket.map(function(item) { return item.id; }).indexOf(id.toString());
    basket.splice(removeIndex, 1);
    localStorage.setItem("basket", JSON.stringify(basket));
    table_basket.clear().draw();
    table_basket.rows.add(basket);
    table_basket.columns.adjust().draw();
    showMessage('item deleted', 'success');
}
if (!localStorage.getItem('auth_user')) {
    $('.new_order').hide();
    $('.u_need_auth').show();
}
$('.new_order').on('click', function() {
    if (localStorage.getItem("basket") !== "[]") {
        var orders = JSON.parse(localStorage.getItem("orders"));
        if (orders == null) {
            orders = [];
        }
        var order = {
            user: localStorage.getItem('auth_user'),
            json_order: localStorage.getItem("basket")
        };

        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        //auth
        showMessage('Order created', 'success');
        var basket = [];
        localStorage.setItem("basket", JSON.stringify(basket));
        table_basket.clear().draw();
        table_basket.rows.add(basket);
        table_basket.columns.adjust().draw();

    } else {
        showMessage('basket empty', 'warning');
    }
});
$(function() {
    'use strict';

    var regex = {
        reg_email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        reg_password: /^([a-zA-Z0-9@#$%^&+=*.\-_]){6,}$/,
    };
    $.each($('.register input:not([type="text"])'), function() {
        $(this).on('focusout', function() {
            if (!regex[$(this).attr('name')].test($(this).val())) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
    });
});