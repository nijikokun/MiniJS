// Copyright @nijikokun 2012
$(window).load(function(){
    function contains (obj, a) {
        var i = a.length;
        while (i--) {
           if (a[i] === obj) {
               return true;
           }
        }
        return false;
    }
    
    var colors = 'red,pink,purple,green,blue,orange'.split(',');
    var hash = location.href.split('#');
    
    function _ (id) { 
        return document.getElementById(id); 
    }
    
    function find (tag) {
        if(!tag) return MicroJS;
        var results=[];
        for(var i in MicroJS) {
            if(!MicroJS.hasOwnProperty(i)) continue;
            if(contains(tag, MicroJS[i].tags)) {
                results.push(MicroJS[i]);
            }
        }
        return results;
    }

    function render (data) {
        $('.list').empty();
        for(var i in data) {
            if(!data.hasOwnProperty(i)) continue;
            var item = data[i];
            item.color = colors[Math.round(Math.random()*colors.length-1)];
            item.github = item.ghwatchers ? true : false;
            $('.list').append(Mustache.to_html($('.item').text(), item));
        }
    }
    
    function select (tag) {
        var options = _('needs').options, i=options.length;
        while(i--) if(options[i].value==tag) _('needs').selectedIndex = i;
    }

    _('needs').onchange = function () {
        var value = _('needs').options[_('needs').selectedIndex].value;
        render(find(value));
        location.href=location.href.replace(/(#.*$)|($)/,'#' + value);
    }

    _('finder').onkeyup = function () {
        if(!this.value || !$.trim(this.value)) return $('li').show();
        var value = $.trim(this.value).toLowerCase(), name = null, desc = null;

        $('li').show().filter(function(index) {
            name = this.getAttribute('data-name');
            desc = this.getAttribute('data-description');

            if(!name || !desc) 
                return false;

            if(name.toLowerCase().indexOf(value) != -1)
                return false;

            if(desc.toLowerCase().indexOf(value) != -1)
                return false;

            console.log(name, value);
            return true;
        }).hide();
    }

    render(hash.length ? (select(hash[1]), find(hash[1])) : MicroJS);
});