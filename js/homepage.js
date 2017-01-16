// $(document).ready(function() {
//
//     $("#owl-example").owlCarousel();
//
// });

//
// $(document).ready(function() {
//
//     $("#owl-demo1").owlCarousel({
//
//         responsive:true,
//         slideSpeed : 300,
//         pagination: false,
//         singleItem:true,
//         autoPlay : 3000,
//         navigation:false
//         // "singleItem:true" is a shortcut for:
//         // items : 1,
//         // itemsDesktop : false,
//         // itemsDesktopSmall : false,
//         // itemsTablet: false,
//         // itemsMobile : false
//
//     });
//
//
//     $("#owl-demo2").owlCarousel({
//
//         autoPlay: 3000, //Set AutoPlay to 3 seconds
//         // pagination: false,
//         items :6,
//         itemsDesktop : [1199,3]
//
//     });
//     var x = document.getElementsByClassName("one_slide");
//     for (var i = 0; i < x.length; i++) {
//         x[i].style.height = window.innerHeight + "px";
//         x[i].style.opacity = 0.35;
//     }
// });
//
//



$(document).ready(function() {


    var x = document.getElementsByClassName("one_slide");
    for (var i = 0; i < x.length; i++) {
        x[i].style.height = window.innerHeight + "px";
        x[i].style.opacity = 0.35;
    }
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    // sync1.style.height = window.innerHeight + "px";

    sync1.owlCarousel({
        autoPlay:3000,
        // rewindNav:false,
        // responsive:true,
        singleItem : true,
        slideSpeed : 1000,
        navigation: false,
        pagination:false,
        afterAction : syncPosition,
        responsiveRefreshRate : 200,
    });

    sync2.owlCarousel({
        autoPlay:3000,
        items :7,
        itemsDesktop      : [1199,10],
        itemsDesktopSmall     : [979,10],
        itemsTablet       : [768,8],
        itemsMobile       : [479,4],
        pagination:false,
        responsiveRefreshRate : 100,
        afterInit : function(el){
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });

    function syncPosition(el){
        var current = this.currentItem;
        $("#sync2")
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced")
        if($("#sync2").data("owlCarousel") !== undefined){
            center(current)
        }
    }

    $("#sync2").on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo",number);
    });

    function center(number){
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for(var i in sync2visible){
            if(num === sync2visible[i]){
                var found = true;
            }
        }

        if(found===false){
            if(num>sync2visible[sync2visible.length-1]){
                sync2.trigger("owl.goTo", num - sync2visible.length+2)
            }else{
                if(num - 1 === -1){
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if(num === sync2visible[sync2visible.length-1]){
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if(num === sync2visible[0]){
            sync2.trigger("owl.goTo", num-1)
        }

    }

});

