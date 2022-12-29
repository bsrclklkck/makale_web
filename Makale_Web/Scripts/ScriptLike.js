﻿/// <reference path="jquery-3.6.1.min.js" />


$(function () {

    var notid_dizi = []; //boş dizi tanımladık
    $("div[data-notid]").each(function (i, e) { //data-notid olan div lazım.bu özellikte olan divlerin her birinde dön."e" divleri temsil ediyo. "i" indexi temsil ediyor. (elementin içindedeki id bilgisini alıyor)
        notid_dizi.push($(e).data("notid")); //bu id leri diziye ekle. push et.
    });
        $.ajax({
            method: "POST",
            url: "/Not/GetLikes",
            data: { id_dizi: notid_dizi }
        }).done(function (data) {
            if (data.sonuc != null && data.sonuc.length > 0)
            {
                for (var i = 0; i < data.sonuc.length; i++)
                {
                    var id = data.sonuc[i];
                    var div = $("div[data-notid=" + id + "]");
                    var btn = div.find("button[data-like]");
                    btn.data("like", true);

                    var span = btn.children().first();
                    var span2 = btn.find("span.like-kalp")

                    span.removeClass("glyphicon-heart-empty");
                    span.addClass("glyphicon-heart");

                }
            }

        }).fail(function () {

        });
    $("button[data-like]").click(function () {
        var btn = $(this);
        var like = btn.data("like");
        var notid = btn.data("notid");
        var spankalp = btn.find("span.like-kalp");
        var spansayi = btn.find("span.begenisayisi");

        $.ajax({
            method: "POST",
            url: "/NOT/SetLikes",
            data: { notid: notid, like: !like }
        }).done(function (data) {

            if (data.hata) {
                alert("begeni işlemi gerçekleşmedi")
            }
            else {
                like = !like;
                btn.data("like", like);
                spansayi.text(data.res);

                spankalp.removeClass("glyphicon-heart-empty");
                spankalp.removeClass("glyphicon-heart");

                if (like) {

                    spankalp.addClass("glyphicon-heart");
                }
                else {
                    spankalp.addClass("glyphicon-heart-empty");
                }

            }

        }).fail(function () {

            alert("sunucu ile bağlantı kurulamadı");

        });

    });

 });