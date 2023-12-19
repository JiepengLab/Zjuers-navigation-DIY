jQuery(document).ready(function ($) {
	var sweetTitles = {
		x: 10,
		y: 20,
		tipElements: "a,span,img,div ",
		noTitle: false,
		init: function () {
			var noTitle = this.noTitle;
			$(this.tipElements).each(function () {
				$(this).mouseover(function (e) {
					if (noTitle) {
						isTitle = true;
					} else {
						isTitle = $.trim(this.title) != '';
					}
					if (isTitle) {
						this.myTitle = this.title;
						this.title = "";
						var tooltip =
							"<div class='tooltip' style='z-index:999999'><div class='tipsy-arrow tipsy-arrow-n' style='z-index:999999'></div><div class='tipsy-inner' style='z-index:999999'>" + this.myTitle +
							"</div></div>";
						$('body').append(tooltip);
						$('.tooltip').css({
							"top": (e.pageY + 20) + "px",
							"left": (e.pageX - 20) + "px"
						}).show('fast');
					}
				}).mouseout(function () {
					if (this.myTitle != null) {
						this.title = this.myTitle;
						$('.tooltip').remove();
					}
				}).mousemove(function (e) {
					$('.tooltip').css({
						"top": (e.pageY + 20) + "px",
						"left": (e.pageX - 20) + "px"
					});
				});
			});
		}
	};
	$(function () {
		sweetTitles.init();
	});
});
