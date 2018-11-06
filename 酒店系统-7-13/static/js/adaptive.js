!function(){
                var htmlEl = document.getElementsByTagName('html')[0];
                var fitPage = function(){
                      /* The calculate of with from zepto  */
                 var w = htmlEl.getBoundingClientRect().width;
                 w = Math.round(w);
                 w = w > 750 ? 750: w;
                 var newW = w/750 * 100;    
                 htmlEl.style.fontSize = newW + 'px';
                }
                fitPage();
            
                var t;
                var func = function(){
                 clearTimeout(t);
                 t = setTimeout(fitPage, 25);
                }
                window.addEventListener('resize', func);
            }();