(function() {
  $.extend($.fn, {
    pic: function(opt) {
      var def = {
        item: '.item',
        page: '.page',
        pageItem: '.icon',
        num: 10,
        showNum: 7,
        itemWidth: 0,
        activeItemWidth: 0
      };

      $.extend(def, opt)

      var $el = $(this)
      var currentIndex = -1
      var $currentItem = []
      var sideNum = 0
      var $page = $el.find(def.page)
      var $allItem = $el.find(def.item)
      var itemWidth = 0
      var activeItemWidth = 0

      def.num = $allItem.length;

      var pic = {
        initData: function () {
          currentIndex = 0
          sideNum = Math.floor(def.showNum / 2)
          itemWidth = def.itemWidth || $allItem.eq(0).width()
          activeItemWidth = def.activeItemWidth || 150

          console.log(itemWidth, activeItemWidth, def.showNum)

          $el.width(itemWidth * (def.showNum - 1) + (activeItemWidth ))
        },
        bindEvt: function () {
          var that = this;
          $el.on("click", (def.pageItem + "," + def.item), function (e) {
            var index = $(this).index()

            that.switch(index)
          })
        },
        switch (index) {
          currentIndex = index
          this.setClass()
        },
        getCurrentItem: function () {
          return $el.find(".item").eq(currentIndex)
        },
        checkNum: function (index) {
          if (index < 0) {
            return index + def.num
          } else if (index >= def.num) {
            return index - def.num
          } else {
            return index
          }
        },
        setPosition ($dom, type, index, flag) {
          var left = "";
          var itemCss = {}
          var picCss = {}
          var rotate = 0
          var scale = 0

          if (type === 'pre') {
            itemCss.left = index * 100;
            itemCss.zIndex = 1
            itemCss.opacity = 1
            if (sideNum - index === 1) {
              rotate = 0
              scaleX = 0.98
              scaleY = 0.92
            } else {
              rotate = 10
              scaleX = 1
              scaleY = 0.9
            }
            picCss.transform = "scale(" + scaleX + ", " + scaleY +  ") rotateY(" + rotate + "deg) "
          } else if (type === "next") {
            itemCss.left = (index + 0.5) * itemWidth;
            itemCss.opacity = 1
            itemCss.zIndex = 1
            if (sideNum - index === -1) {
              rotate = 0
              scaleY = 0.92
              scaleX = 0.98
            } else {
              rotate = -10
              scaleY = 0.9
              scaleX = 1
            }
            picCss.transform = "scale(" + scaleX + ", " + scaleY +  ") rotateY(" + rotate + "deg) "

          } else if (type === 'active') {
            itemCss.left = sideNum * itemWidth
            itemCss.opacity = 1
            picCss.transform = "scale(1)"

          } 

          if (flag) {
            itemCss.zIndex = -1
          } else {
            itemCss.opacity = 1
          }
          $dom.css(itemCss).find(".pic").css(picCss)
        },
        setClass: function () {
          var num = def.num;
          var preLen = (def.showNum - 1) / 2
          var nextLen = preLen;
          var i = 0;
          var j = 0;
          var showArr = []
          var $currentItem = this.getCurrentItem().addClass("active").siblings().removeClass("active").end()

          this.setPosition($currentItem, 'active')
          $el.find(".icon").eq(currentIndex).addClass("active").siblings().removeClass("active")
          showArr = [currentIndex]
          for (i = preLen ; i >= 0; i--) {
            j++;
            var index = this.checkNum($currentItem.index() - 1)
            var x = (preLen - j) 
            $currentItem = $allItem.eq(index)
            this.setPosition($currentItem, 'pre', x, i == 0)
            showArr.push(index)
          }

          i= 0
          j = 0

          $currentItem = this.getCurrentItem()
          for (i = nextLen; i >= 0; i--) {
            j++
            var index = this.checkNum($currentItem.index() + 1)
            var x = (nextLen - j)
            $currentItem = $allItem.eq(index)
            this.setPosition($currentItem, 'next', sideNum + j, i === 0)
            showArr.push(index)
          }
          $allItem.filter(function(i) {
            return $.inArray(i, showArr) === -1
          }).css({
            left: 0,
            opacity: 0
          })
        },
        renderPage: function () {
          var html = ""
          for (var i = 0; i < def.num; i++) {
            html += "<i class='icon'></i>"
          }
          
          $page.html(html)
        },
        init: function () {
          this.bindEvt();
          this.initData();
          this.renderPage()
          this.setClass();
        }
      }

      pic.init();
      
    }
  })
})()