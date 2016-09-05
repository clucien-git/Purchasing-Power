$(document).ready(function(){
    $("#menuLink").click(function(){
        $("#menuOverlay").attr('active','yes');
        $("#menu").attr('active','yes');
        $("body").addClass('noscroll');
        return false;
    });

    $(document).click(function (e){
        var container = $("#menu");
        if (!container.is(e.target) && container.has(e.target).length === 0){
            $("#menu").removeAttr('active');
            $("#menuOverlay").removeAttr('active');
            $("#departments").removeClass('open');
            $("body").removeClass('noscroll');
        }
    });
    $("#menuHeader img").click(function(){
        $("#menu").removeAttr('active');
        $("#menuOverlay").removeAttr('active');
        $("#departments").removeClass('open');
        $("body").removeClass('noscroll');
    });

    $("#searchLink").click(function(){
        $("#searchOverlay").attr('active','yes');
        $("#searchBar").attr('active','yes');
        $("#recentSearch").removeClass('hidden');
        $("body").addClass('noscroll');
        return false;
    });
    $("#cancelSearch").click(function(){
        $("#recentSearch").addClass('hidden');
        $("#searchBar").removeAttr('active');
        $("#searchOverlay").removeAttr('active');
        $("#recentSearch .remove").removeClass('hidden');
        $("#recentSearch .delete").addClass('hidden');
        $("#searchBar form input").val("");
        $("body").removeClass('noscroll');
        return false;
    });
    $("#departmentsLink").click(function(){
        $("#departments").toggleClass('open');
        //if ($('#departments').attr("class") == 'open') {
        //    Util.setUpShopPPSubMenu();
        //}
        return false;
    });
    $("#moreLink, #lessLink").click(function(){
        $("#moreLink").toggleClass('hidden');
        $("#lessLink").toggleClass('hidden');
        $("#moreDetails").toggleClass('hidden');
        $("#moreDetails2").toggleClass('hidden');
        return false;
    });
    $('.goBack').click(function(){
        parent.history.back();
        return false;
    });

    var phoneNumber = '1-888-923-6236'; // NOTE: this needs to be updatable with the user's employer phone number
    phoneNumber = phoneNumber.replace(/\D/g,'');
    var telephone = "tel:" + phoneNumber
    $("#phoneLink").attr('href', telephone);
    $("#phoneNumber").html(phoneNumber);
    $('#phoneNumber').html(function(){
        var length = phoneNumber.length;
        if(length == 10){
            var string = $(this).html();
            $(this).html(string.substring(0,3) + '-' + string.substring(3,6) + '-' + string.substring(6,10))
        };
        if(length == 11){
            var string = $(this).html();
            $(this).html(string.substring(0,1) + '-' + string.substring(1,4) + '-' + string.substring(4,7) + '-' + string.substring(7,11))
        };
    });

    $(document).click(function (e){
        var container = $("#recentSearch span");
        if (!container.is(e.target) && container.has(e.target).length === 0){
            $("#recentSearch .remove").removeClass('hidden');
            $("#recentSearch .delete").addClass('hidden');
        }
    });
    $(document).on('click', "#recentSearch .remove", function () {
        $("#recentSearch .remove").removeClass('hidden');
        $("#recentSearch .delete").addClass('hidden');
        $(this).addClass('hidden').siblings().removeClass('hidden');
    });
    $(document).on('click', '#recentSearch .delete', function () {
        var searchList = [];
        searchList = store.get("searchTerms");
        var index = searchList.indexOf($(this).parent().find('a').text());
        if (parseInt(index) != -1) {
            searchList.splice(parseInt(index), 1);
            store.set("searchTerms", searchList);
        }
        $(this).closest('li').remove();
        // NOTE: Need to include function to remove from source list.
    });

    $(".emailAddress").each(function() {
        var addy = $(this).html();
        var name = /(.+)@/.exec(addy)[0];
        var domain = addy.substring(addy.lastIndexOf('@')+1);
        var tld = addy.substring(addy.lastIndexOf('.')+1);
        var trim = domain.slice(0,3);
        var output = name + trim + "..."+ tld;
        $(this).html(output);
    });

//    $("#email").each(function() {
//        var addy = $(this).html();
//        var name = /(.+)@/.exec(addy)[0];
//        var domain = addy.substring(addy.lastIndexOf('@')+1);
//        var tld = addy.substring(addy.lastIndexOf('.')+1);
//        var trim = domain.slice(0,3);
//        var output = name + trim + "..."+ tld;
//        $(this).html(output);
//    });


    $("a[href^='http']").each(function() {
        var url = window.location.pathname;
        var path = url.substring(url.lastIndexOf('/')+1);
        var screenName = path.substr(0, path.lastIndexOf('.')) || path;
        var _href = $(this).attr("href");
        $(this).attr("href", _href + '?chn=app&scn=' + screenName);
    });

});

