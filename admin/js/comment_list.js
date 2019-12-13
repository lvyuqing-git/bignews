



$(function () {


    let perpage = 10;
    let mypage = 1;


    function getData(page, callback) {
        $.ajax({
            url: window.BigNew.comment_list,
            type: 'get',
            data: {
                perpage: perpage,
                page: page
            },
            success: function (res) {
                console.log(res);

                $('tbody').html(template('commit', res));

                if (callback != null) {
                    callback(res);
                } else if (res.data.totalPage == 0 && res.data.totalCount == 0) {
                    $('#pagination-demo').hide();
                }

            }
        });
    }

    getData(mypage, function (res) {
        $('#pagination-demo').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: 7,
            onPageClick: function (event, page) {
                mypage = page;
                getData(page);
            }
        });
    });
    //删除
    $('tbody').on('click', '#delete', function () {
        $.ajax({
            url: BigNew.comment_delete,
            type: 'post',
            data: {
                id: $(this).attr('data-id'),
            },
            success: function (res) {
                console.log(res);

                getData(mypage, function (res) {
                    $('#pagination-demo').twbsPagination('changeTotalPages', res.data.totalPage, mypage);
                });

            }
        });
    });
    //不通过
    $('tbody').on('click', '#warning', function () {
        $.ajax({
            url: BigNew.comment_reject,
            type: 'post',
            data: {
                id: $(this).attr('data-id'),
            },
            success: function (res) {
                getData(mypage);
            }
        });
    });

    //通过
    $('tbody').on('click', '#success', function () {
        $.ajax({
            url: BigNew.comment_pass,
            type: 'post',
            data: {
                id: $(this).attr('data-id'),
            },
            success: function (res) {
                getData(mypage);
            }
        });
    });



});