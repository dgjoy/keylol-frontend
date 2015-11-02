(function() {
	Quill.registerModule("click-expand", function(quill, options) {
		var $container = $(quill.container);
		var $editorArea = $(quill.editor.root);
		$container.dblclick(function() {
			if ($container.hasClass("ql-auto-expand")) {
				$container.removeClass("ql-auto-expand");
			} else {
				$editorArea.css("min-height", $container.css("height"));
				$container.addClass("ql-auto-expand");
			}
		});
	});
})();