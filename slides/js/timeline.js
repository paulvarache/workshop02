(function () {
    window.Timeline = function (opts) {
        if(document.querySelector('#tl' + opts.id)) {
            return;
        }
        var tl = document.createElement('div');
        tl.className = 'timeline';
        tl.id = 'tl' + opts.id;
        var tp = null;
        for (var i in opts.points) {
            tp = document.createElement('span');
            tp.className = 'timepoint';
            tp.innerHTML = opts.points[i].content;
            tp.style.left = opts.points[i].position + '%';
            tl.appendChild(tp);
        }
        document.body.appendChild(tl);
        return tl;
    };
})(window);