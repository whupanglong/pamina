// ==UserScript==
// @name          Hello World
// @namespace     http://diveintogreasemonkey.org/download/
// @description   blind web assisstant to make web content more friendly to screen reader
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

console.log('Hello world!');
(function(){
    var readabilityCSS='@charset "utf-8";\n/* CSS Document */\n\n/*\n#readOverlay  {\n	background-image: none;\n	background: #eee;\n	font-family:Georgia,"Century Schoolbook","Times New Roman",Times,serif;\n\n}\n*/\n#readOverlay {\n	display: block;\n	position: absolute;\n	top: 0;\n	left: 0;\n	width: 100%;\n}\n#readInner {\n	line-height: 1.4em;\n	margin: 1em auto;\n	max-width: 800px;\n}\n#readInner a {\n	color:#003399;\n	text-decoration:none;\n}\n#readInner a:hover {\n	text-decoration:underline;\n}\n#readInner * {\n	margin-bottom: 16px;\n	border: none;\n	background: none;\n}\n#readInner img {\n	float: left;\n	margin-right: 12px;\n	margin-bottom: 12px;\n}\n#readInner h1 {\n	display: block;\n	width: 100%;\n	border-bottom: 1px solid #333;\n	font-size: 1.2em;\n}\n#readInner blockquote {\n	margin-left: 3em;\n	margin-right: 3em;\n}\n#readFooter {\n	display: block;\n	border-top: 1px solid #333;\n	text-align: center;\n	clear: both;\n}\ndiv.footer-right {\n	float: right;\n	line-height: 1;\n	text-align: right;\n	font-size: .75em;\n	margin-top: 18px\n}\na.footer-twitterLink {\n	clear: both;\n	float: left;\n	font-size: 11px;\n	margin-left: 228px;\n	margin-top: -32px;\n}\nspan.version {\n	display: none;\n}\n\n/* Article Tools */\n#readTools {\n	width: 34px;\n	height: 150px;\n	position: fixed;\n	z-index: 100;\n	top: 10px;\n	left: 10px;\n}\n#readTools a {\n    overflow: hidden;\n	margin-bottom: 8px;\n	display: block;\n    opacity: .4;\n    filter:alpha(opacity=40);\n    text-indent: -99999px;\n    height: 34px;\n	text-decoration: none;\n}\n\n#kindle-page{\n    background: url(../images/read-kindle.png) no-repeat left top;\n}\n#email-page{\n    background: url(http://lab.arc90.com/experiments/readability/images/read-email.png) no-repeat left top;\n}\n#reload-page{\n    background: url(http://lab.arc90.com/experiments/readability/images/read-refresh.png) no-repeat left top;\n}\n#print-page{\n    background: url(http://lab.arc90.com/experiments/readability/images/read-print.png) no-repeat left top;\n}\n#readTools a:hover{\n    opacity: 1;\n    filter:alpha(opacity=100);\n}\n/* ---------------- USER-CONFIGURABLE STYLING --------------------- */\n\n/* ---------------- USER-CONFIGURABLE STYLING --------------------- */\n\n/* Size options */\n\n.size-small {\n	font-size: 12px;\n}\n.size-medium {\n	font-size: 18px;\n}\n.size-large {\n	font-size: 26px;\n}\n.size-x-large {\n	font-size: 34px;\n}\n/* Style options */\n\n.style-novel {\n	font-family:"Palatino Linotype", "Book Antiqua", Palatino, serif;\n	background: #F4F3DB;\n	color: #222;\n}\n.style-ebook {\n	font-family:Arial, Helvetica, sans-serif;\n	background: #eee;\n	color: #333;\n}\n.style-ebook h1 {\n	font-family: "Arial Black", Gadget, sans-serif;\n	font-weight: normal;\n}\n.style-newspaper {\n	font-family:"Times New Roman", Times, serif;\n	background: #FFF;\n	color: #222;\n}\n.style-newspaper h1 {\n	text-transform:capitalize;\n	font-family: Georgia, "Times New Roman", Times, serif;\n}\n.style-terminal {\n	font-family: "Lucida Console", Monaco, monospace;\n	background: #1D4E2C;\n	color: #C6FFC6;\n}\n.style-terminal #readInner a {\n	color: #009933;\n}\n\n\n/* Begin Typekit Styles */\n\n.style-classy {\n	font-family: sans-serif;\n	background-color: #FDFDFD;\n	color: #434343;\n}\n\n.style-classy #readInner a {\n	color: #8F674B;\n	text-decoration: none;\n}\n\n.style-post {\n	font-family: "Droid Sans", "Arial", sans-serif;\n	background-color: #FFF;\n	color: #222;\n}\n\n.style-post h1 {\n	font-family: "League Gothic";\n	font-size: 53px;\n	letter-spacing: 2px;\n	line-height: 1.4;\n	text-align: center;\n	text-transform: uppercase;\n}\n\n/* Margin Options */\n\n.margin-x-wide {\n	width: 35%;\n}\n.margin-wide {\n	width: 55%;\n}\n.margin-medium {\n	width: 75%;\n}\n.margin-narrow {\n	width: 95%;\n}\n/* ---------------- USER-CONFIGURABLE STYLING --------------------- */\n\n/* ------ DEBUG ------- */\n\n.bug-green {\n	background: #BBF9B0;\n	border: 4px solid green;\n}\n.bug-red {\n	background: red;\n}\n.bug-yellow {\n	background: #FFFF8E;\n}\n.bug-blue {\n	background: #BFDFFF;\n}\n\n/* ---------------- EMAIL POP UP --------------------- */\n\n#email-container{\n    position: fixed;\n    top: 60px;\n    left: 50%;\n    margin: 0 0 0 -240px;\n    padding: 0;\n    width: 500px;\n    height: 490px;\n    border: solid 3px #666;\n    background-color: #fff;\n    z-index: 100 !important;\n    overflow: hidden;\n}\n\n\n/* ---------------- KINDLE POP UP --------------------- */\n\n#kindle-container{\n    position: fixed;\n    top: 60px;\n    left: 50%;\n    margin: 0 0 0 -240px;\n    padding: 0;\n    width: 500px;\n    height: 490px;\n    border: solid 3px #666;\n    background-color: #fff;\n    z-index: 100 !important;\n    overflow: hidden;\n}';
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    
    //lock if this page is already converted
    var convertFlag = false;

    var dbg = function(s) {
        if(typeof console !== 'undefined');
        console.log("Readability: " + s);
    };

/*
 * Readability. An Arc90 Lab Experiment. 
 * Website: http://lab.arc90.com/experiments/readability
 * Source:  http://code.google.com/p/arc90labs-readability
 *
 * Copyright (c) 2009 Arc90 Inc
 * Readability is licensed under the Apache License, Version 2.0.
 **/
    var readability = {
        version:     '0.0.1',
        iframeLoads: 0,
        frameHack:   false, /**
                             * The frame hack is to workaround a firefox bug where if you
                             * pull content out of a frame and stick it into the parent element, the scrollbar won't appear.
                             * So we fake a scrollbar in the wrapping div.
                             **/
        bodyCache:  null,   /* Cache the body HTML in case we need to re-use it later */

        /**
         * All of the regular expressions in use within readability.
         * Defined up here so we don't instantiate them repeatedly in loops.
         **/
        regexps: {
            unlikelyCandidatesRe:   /combx|comment|disqus|foot|header|menu|meta|nav|rss|shoutbox|sidebar|sponsor/i,
            okMaybeItsACandidateRe: /and|article|body|column|main/i,
            positiveRe:             /article|body|content|entry|hentry|page|pagination|post|text/i,
            negativeRe:             /combx|comment|contact|foot|footer|footnote|link|media|meta|promo|related|scroll|shoutbox|sponsor|tags|widget/i,
            divToPElementsRe:       /<(a|blockquote|dl|div|ol|p|pre|table|ul)/i,
            replaceBrsRe:           /(<br[^>]*>[ \n\r\t]*){2,}/gi,
            replaceFontsRe:         /<(\/?)font[^>]*>/gi,
            trimRe:                 /^\s+|\s+$/g,
            normalizeRe:            /\s{2,}/g,
            killBreaksRe:           /(<br\s*\/?>(\s|&nbsp;?)*){1,}/g,
            videoRe:                /http:\/\/(www\.)?(youtube|vimeo|youku)\.com/i
        },

        /**
         * Runs readability.
         * 
         * Workflow:
         *  1. Prep the document by removing script tags, css, etc.
         *  2. Build readability's DOM tree.
         *  3. Grab the article content from the current dom tree.
         *  4. Replace the current DOM tree with the new one.
         *  5. Read peacefully.
         *
         * @return void
         **/
        init: function(preserveUnlikelyCandidates) {
            preserveUnlikelyCandidates = (typeof preserveUnlikelyCandidates == 'undefined') ? false : preserveUnlikelyCandidates;

            if(document.body && !readability.bodyCache){
                readability.bodyCache = document.body.innerHTML;
            }

            readability.prepDocument();

            /* Build readability's DOM tree */
            var overlay        = document.createElement("DIV");
            var innerDiv       = document.createElement("DIV");
            //var articleTools   = readability.getArticleTools();
            var articleTitle   = readability.getArticleTitle();
            var articleContent = readability.grabArticle(preserveUnlikelyCandidates);
            //var articleFooter  = readability.getArticleFooter();

            /**
             * If we attempted to strip unlikely candidates on the first run through, and we ended up with no content,
             * that may mean we stripped out the actual content so we couldn't parse it. So re-run init while preserving
             * unlikely candidates to have a better shot at getting our content out properly.
             **/
            if(readability.getInnerText(articleContent, false) == ""){
                if(!preserveUnlikelyCandidates) {
                    document.body.innerHTML = readability.bodyCache;
                    return readability.init(true);
                }
                else{
                    articleContent.innerHTML = "<p>对不起，暂不能转换此网页，请同时按alt和b返回</p>";
                }
            }

            overlay.id              = "readOverlay";
            innerDiv.id             = "readInner";

            /* Apply user-selected styling */
            //document.body.className = readStyle;
            //overlay.className       = readStyle;
            //innerDiv.className      = readMargin + " " + readSize;h

            /* Glue the structure of our document together. */
            //articleContent.appendChild( articleFooter  );
            innerDiv.appendChild( articleTitle   );
            innerDiv.appendChild( articleContent );
            //overlay.appendChild( articleTools   );
            overlay.appendChild( innerDiv );

            /* Clear the old HTML, insert the new content. */
            document.body.innerHTML = "";
            document.body.insertBefore(overlay, document.body.firstChild);

            if(readability.frameHack){
                var readOverlay = document.getElementById('readOverlay');
                readOverlay.style.height = '100%';
                readOverlay.style.overflow = 'auto';
            }

        },

        /**
         * Get the article tools Element that has buttons like reload, print, email.
         *
         * @return void
         **/
        getArticleTools: function () {
            var articleTools = document.createElement("DIV");

            articleTools.id        = "readTools";
            articleTools.innerHTML = "\
                                      <a href='#' onclick='return window.location.reload()' title='Reload original page' id='reload-page'>Reload Original Page</a>\
                                      <a href='#' onclick='javascript:window.print();' title='Print page' id='print-page'>Print Page</a>\
                                      ";

            return articleTools;
        },

        /**
         * Get the article title as an H1. Currently just uses document.title,
         * we might want to be smarter in the future.
         *
         * @return void
         **/
        getArticleTitle: function () {
            var articleTitle = document.createElement("H1");
            articleTitle.innerHTML = document.title;

            return articleTitle;
        },

        /**
         * Get the footer with the readability mark etc.
         *
         * @return void
         **/
        getArticleFooter: function () {
            var articleFooter = document.createElement("DIV");

            articleFooter.id = "readFooter";
            articleFooter.innerHTML = "\
                                       <div class='footer-right' >\
                                       <span class='version'>Readability version " + readability.version + "</span>\
                                       </div>\
                                       ";

            return articleFooter;
        },

        /**
         * Prepare the HTML document for readability to scrape it.
         * This includes things like stripping javascript, CSS, and handling terrible markup.
         * 
         * @return void
         **/
        prepDocument: function () {
            /**
             * In some cases a body element can't be found (if the HTML is totally hosed for example)
             * so we create a new body node and append it to the document.
             */
            if(document.body === null){
                body = document.createElement("body");
                try {
                    document.body = body;
                }
                catch(e) {
                    document.documentElement.appendChild(body);
                }
            }

            //choose the biggest frame
            var frames = document.getElementsByTagName('frame');
            if(frames.length > 0){
                var bestFrame = null;
                var bestFrameSize = 0;
                for(var frameIndex = 0; frameIndex < frames.length; frameIndex++){
                    var frameSize = frames[frameIndex].offsetWidth + frames[frameIndex].offsetHeight;
                    var canAccessFrame = false;
                    try {
                        frames[frameIndex].contentWindow.document.body;
                        canAccessFrame = true;
                    } catch(e) {}

                    if(canAccessFrame && frameSize > bestFrameSize){
                        bestFrame = frames[frameIndex];
                        bestFrameSize = frameSize;
                    }
                }

                if(bestFrame){
                    var newBody = document.createElement('body');
                    newBody.innerHTML = bestFrame.contentWindow.document.body.innerHTML;
                    newBody.style.overflow = 'scroll';
                    document.body = newBody;

                    var frameset = document.getElementsByTagName('frameset')[0];
                    if(frameset){
                        frameset.parentNode.removeChild(frameset);
                    }

                    readability.frameHack = true;
                }
            }

            /* If we're using a typekit style, inject the JS for it. */
            //if (readStyle == "style-classy") {
            //	var typeKitScript  = document.createElement('script');
            //	typeKitScript.type = "text/javascript";
            //	typeKitScript.src  = "http://use.typekit.com/sxt6vzy.js";
            //
            //	document.body.appendChild(typeKitScript);
            //
            //	/**
            //	 * Done as a script elem so that it's ensured it will activate
            //	 * after typekit is loaded from the previous script src.
            //	 **/
            //	var typeKitLoader  = document.createElement('script');
            //	typeKitLoader.type = "text/javascript";
            //
            //	var typeKitLoaderContent = document.createTextNode('try{Typekit.load();}catch(e){}');
            //	typeKitLoader.appendChild(typeKitLoaderContent);
            //	document.body.appendChild(typeKitLoader);
            //}

            /* remove all scripts that are not readability */
            var scripts = document.getElementsByTagName('script');
            for(i = scripts.length-1; i >= 0; i--){
                if(typeof(scripts[i].src) == "undefined" || scripts[i].src.indexOf('readability') == -1 || scripts[i].src.indexOf('pah') == -1){
                    scripts[i].parentNode.removeChild(scripts[i]);
                }
            }

            /* remove all stylesheets */
            for (var k=0;k < document.styleSheets.length; k++) {
                if (document.styleSheets[k].href != null && document.styleSheets[k].href.lastIndexOf("readability") == -1) {
                    document.styleSheets[k].disabled = true;
                }
            }

            /* Remove all style tags in head (not doing this on IE) - TODO: Why not? */
            var styleTags = document.getElementsByTagName("style");
            for (var j=0;j < styleTags.length; j++){
                if (navigator.appName != "Microsoft Internet Explorer"){
                    styleTags[j].textContent = "";
                }
            }
            /* Turn all double br's into p's */
            /* Note, this is pretty costly as far as processing goes. Maybe optimize later. */
            document.body.innerHTML = document.body.innerHTML.replace(readability.regexps.replaceBrsRe, '</p><p>').replace(readability.regexps.replaceFontsRe, '<$1span>')
        },

        /**
         * Prepare the article node for display. Clean out any inline styles,
         * iframes, forms, strip extraneous <p> tags, etc.
         *
         * @param Element
         * @return void
         **/
        prepArticle: function (articleContent) {
            readability.cleanStyles(articleContent);
            readability.killBreaks(articleContent);

            /* Clean out junk from the article content */
            readability.clean(articleContent, "form");
            readability.clean(articleContent, "object");
            readability.clean(articleContent, "h1");
            /**
             * If there is only one h2, they are probably using it
             * as a header and not a subheader, so remove it since we already have a header.
             ***/
            if(articleContent.getElementsByTagName('h2').length == 1)
                readability.clean(articleContent, "h2");
            readability.clean(articleContent, "iframe");

            readability.cleanHeaders(articleContent);

            /* Do these last as the previous stuff may have removed junk that will affect these */
            readability.cleanConditionally(articleContent, "table");
            readability.cleanConditionally(articleContent, "ul");
            readability.cleanConditionally(articleContent, "div");

            /* Remove extra paragraphs */
            var articleParagraphs = articleContent.getElementsByTagName('p');
            for(i = articleParagraphs.length-1; i >= 0; i--)
            {
                var imgCount    = articleParagraphs[i].getElementsByTagName('img').length;
                var embedCount  = articleParagraphs[i].getElementsByTagName('embed').length;
                var objectCount = articleParagraphs[i].getElementsByTagName('object').length;

                if(imgCount == 0 && embedCount == 0 && objectCount == 0 && readability.getInnerText(articleParagraphs[i], false) == '')
                {
                    articleParagraphs[i].parentNode.removeChild(articleParagraphs[i]);
                }
            }

            try {
                articleContent.innerHTML = articleContent.innerHTML.replace(/<br[^>]*>\s*<p/gi, '<p');		
            }
            catch (e) {
                dbg("Cleaning innerHTML of breaks failed. This is an IE strict-block-elements bug. Ignoring.");
            }
        },

        /**
         * Initialize a node with the readability object. Also checks the
         * className/id for special names to add to its score.
         *
         * @param Element
         * @return void
         **/
        initializeNode: function (node) {
            node.readability = {"contentScore": 0};			

            switch(node.tagName) {
                case 'DIV':
                    node.readability.contentScore += 5;
                    break;

                case 'PRE':
                case 'TD':
                case 'BLOCKQUOTE':
                    node.readability.contentScore += 3;
                    break;

                case 'ADDRESS':
                case 'OL':
                case 'UL':
                case 'DL':
                case 'DD':
                case 'DT':
                case 'LI':
                case 'FORM':
                    node.readability.contentScore -= 3;
                    break;

                case 'H1':
                case 'H2':
                case 'H3':
                case 'H4':
                case 'H5':
                case 'H6':
                case 'TH':
                    node.readability.contentScore -= 5;
                    break;
            }

            node.readability.contentScore += readability.getClassWeight(node);
        },

        /***
         * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
         *               most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
         *
         * @return Element
         **/
        grabArticle: function (preserveUnlikelyCandidates) {
            /**
             * First, node prepping. Trash nodes that look cruddy (like ones with the class name "comment", etc), and turn divs
             * into P tags where they have been used inappropriately (as in, where they contain no other block level elements.)
             *
             * Note: Assignment from index for performance. See http://www.peachpit.com/articles/article.aspx?p=31567&seqNum=5
             * TODO: Shouldn't this be a reverse traversal?
             **/
            for(var nodeIndex = 0; (node = document.getElementsByTagName('*')[nodeIndex]); nodeIndex++){
                /* Remove unlikely candidates */
                if (!preserveUnlikelyCandidates) {
                    var unlikelyMatchString = node.className + node.id;
                    if (unlikelyMatchString.search(readability.regexps.unlikelyCandidatesRe) !== -1 &&
                            unlikelyMatchString.search(readability.regexps.okMaybeItsACandidateRe) == -1 &&
                            node.tagName !== "BODY"){
                        dbg("Removing unlikely candidate - " + unlikelyMatchString);
                        node.parentNode.removeChild(node);
                        nodeIndex--;
                        continue;
                    }
                }

                /* Turn all divs that don't have children block level elements into p's */
                if (node.tagName === "DIV") {
                    if (node.innerHTML.search(readability.regexps.divToPElementsRe) === -1){
                        dbg("Altering div to p");
                        var newNode = document.createElement('p');
                        try {
                            newNode.innerHTML = node.innerHTML;
                            node.parentNode.replaceChild(newNode, node);
                            nodeIndex--;
                        }
                        catch(e){
                            dbg("Could not alter div to p, probably an IE restriction, reverting back to div.")
                        }
                    }else{
                        /* EXPERIMENTAL */
                        for(var i = 0, il = node.childNodes.length; i < il; i++) {
                            var childNode = node.childNodes[i];
                            if(childNode.nodeType == Node.TEXT_NODE) {
                                dbg("replacing text node with a p tag with the same content.");
                                var p = document.createElement('p');
                                p.innerHTML = childNode.nodeValue;
                                p.style.display = 'inline';
                                p.className = 'readability-styled';
                                childNode.parentNode.replaceChild(p, childNode);
                            }
                        }
                    }
                }
            }

            /**
             * Loop through all paragraphs, and assign a score to them based on how content-y they look.
             * Then add their score to their parent node.
             *
             * A score is determined by things like number of commas, class names, etc. Maybe eventually link density.
             **/
            var allParagraphs = document.getElementsByTagName("p");
            var candidates    = [];

            for (var j=0; j	< allParagraphs.length; j++) {
                var parentNode      = allParagraphs[j].parentNode;
                var grandParentNode = parentNode.parentNode;
                var innerText       = readability.getInnerText(allParagraphs[j]);

                /* If this paragraph is less than 25 characters, don't even count it. */
                if(innerText.length < 25){
                    continue;
                }

                /* Initialize readability data for the parent. */
                if(typeof parentNode.readability == 'undefined'){
                    readability.initializeNode(parentNode);
                    candidates.push(parentNode);
                }

                /* Initialize readability data for the grandparent. */
                if(typeof grandParentNode.readability == 'undefined'){
                    readability.initializeNode(grandParentNode);
                    candidates.push(grandParentNode);
                }

                var contentScore = 0;

                /* Add a point for the paragraph itself as a base. */
                contentScore++;

                /* Add points for any commas within this paragraph */
                contentScore += innerText.split(',').length;

                /* For every 100 characters in this paragraph, add another point. Up to 3 points. */
                contentScore += Math.min(Math.floor(innerText.length / 100), 3);

                /* Add the score to the parent. The grandparent gets half. */
                parentNode.readability.contentScore += contentScore;
                grandParentNode.readability.contentScore += contentScore/2;
            }

            /**
             * After we've calculated scores, loop through all of the possible candidate nodes we found
             * and find the one with the highest score.
             **/
            var topCandidate = null;
            for(var i=0, il=candidates.length; i < il; i++){
                /**
                 * Scale the final candidates score based on link density. Good content should have a
                 * relatively small link density (5% or less) and be mostly unaffected by this operation.
                 **/
                candidates[i].readability.contentScore = candidates[i].readability.contentScore * (1-readability.getLinkDensity(candidates[i]));

                dbg('Candidate: ' + candidates[i] + " (" + candidates[i].className + ":" + candidates[i].id + ") with score " + candidates[i].readability.contentScore);

                if(!topCandidate || candidates[i].readability.contentScore > topCandidate.readability.contentScore)
                    topCandidate = candidates[i];
            }

            /**
             * If we still have no top candidate, just use the body as a last resort.
             * We also have to copy the body node so it is something we can modify.
             **/
            if (topCandidate == null || topCandidate.tagName == "BODY"){
                topCandidate = document.createElement("DIV");
                topCandidate.innerHTML = document.body.innerHTML;
                document.body.innerHTML = "";
                document.body.appendChild(topCandidate);
                readability.initializeNode(topCandidate);
            }


            /**
             * Now that we have the top candidate, look through its siblings for content that might also be related.
             * Things like preambles, content split by ads that we removed, etc.
             **/
            var articleContent = document.createElement("DIV");
            articleContent.id = "readability-content";
            var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * 0.2);
            var siblingNodes = topCandidate.parentNode.childNodes;
            for(var i=0, il=siblingNodes.length; i < il; i++){
                var siblingNode = siblingNodes[i];
                var append      = false;

                dbg("Looking at sibling node: " + siblingNode + " (" + siblingNode.className + ":" + siblingNode.id + ")" + ((typeof siblingNode.readability != 'undefined') ? (" with score " + siblingNode.readability.contentScore) : ''));
                dbg("Sibling has score " + (siblingNode.readability ? siblingNode.readability.contentScore : 'Unknown'));

                if(siblingNode === topCandidate){
                    append = true;
                }

                if(typeof siblingNode.readability != 'undefined' && siblingNode.readability.contentScore >= siblingScoreThreshold){
                    append = true;
                }

                if(siblingNode.nodeName == "P") {
                    var linkDensity = readability.getLinkDensity(siblingNode);
                    var nodeContent = readability.getInnerText(siblingNode);
                    var nodeLength  = nodeContent.length;

                    if(nodeLength > 80 && linkDensity < 0.25){
                        append = true;
                    }else if(nodeLength < 80 && linkDensity == 0 && nodeContent.search(/\.( |$)/) !== -1){
                        append = true;//false?
                    }
                }

                if(append){
                    dbg("Appending node: " + siblingNode);

                        /* Append sibling and subtract from our list because it removes the node when you append to another node */
                    articleContent.appendChild(siblingNode);
                    i--;
                    il--;
                }
            }

            /**
             * So we have all of the content that we need. Now we clean it up for presentation.
             **/
            readability.prepArticle(articleContent);

            return articleContent;
        },

        /**
         * Get the inner text of a node - cross browser compatibly.
         * This also strips out any excess whitespace to be found.
         *
         * @param Element
         * @return string
         **/
        getInnerText: function (e, normalizeSpaces) {
            var textContent    = "";

            normalizeSpaces = (typeof normalizeSpaces == 'undefined') ? true : normalizeSpaces;

            if (navigator.appName == "Microsoft Internet Explorer")
                textContent = e.innerText.replace( readability.regexps.trimRe, "" );
            else
                textContent = e.textContent.replace( readability.regexps.trimRe, "" );

            if(normalizeSpaces)
                return textContent.replace( readability.regexps.normalizeRe, " ");
            else
                return textContent;
        },

        /**
         * Get the number of times a string s appears in the node e.
         *
         * @param Element
         * @param string - what to split on. Default is ","
         * @return number (integer)
         **/
        getCharCount: function (e,s) {
            s = s || ",";
            return readability.getInnerText(e).split(s).length;
        },

        /**
         * Remove the style attribute on every e and under.
         * TODO: Test if getElementsByTagName(*) is faster.
         *
         * @param Element
         * @return void
         **/
        cleanStyles: function (e) {
            e = e || document;
            var cur = e.firstChild;

            if(!e) return;

            // Remove any root styles, if we're able.
            if(typeof e.removeAttribute == 'function' && e.className != 'readability-styled'){
                e.removeAttribute('style');
            }

            // Go until there are no more child nodes
            while ( cur != null ) {
                if ( cur.nodeType == 1 ) {
                    // Remove style attribute(s) :
                    if(cur.className != "readability-styled") {
                        cur.removeAttribute("style");
                    }
                    readability.cleanStyles( cur );
                }
                cur = cur.nextSibling;
            }
        },

        /**
         * Get the density of links as a percentage of the content
         * This is the amount of text that is inside a link divided by the total text in the node.
         * 
         * @param Element
         * @return number (float)
         **/
        getLinkDensity: function (e) {
            var links      = e.getElementsByTagName("a");
            var textLength = readability.getInnerText(e).length;
            var linkLength = 0;
            for(var i=0, il=links.length; i<il;i++){
                linkLength += readability.getInnerText(links[i]).length;
            }

            return linkLength / textLength;
        },

        /**
         * Get an elements class/id weight. Uses regular expressions to tell if this 
         * element looks good or bad.
         *
         * @param Element
         * @return number (Integer)
         **/
        getClassWeight: function (e) {
            var weight = 0;

            /* Look for a special classname */
            if (e.className != "")
            {
                if(e.className.search(readability.regexps.negativeRe) !== -1)
                    weight -= 25;

                if(e.className.search(readability.regexps.positiveRe) !== -1)
                    weight += 25;
            }

            /* Look for a special ID */
            if (typeof(e.id) == 'string' && e.id != "")
            {
                if(e.id.search(readability.regexps.negativeRe) !== -1)
                    weight -= 25;

                if(e.id.search(readability.regexps.positiveRe) !== -1)
                    weight += 25;
            }

            return weight;
        },

        /**
         * Remove extraneous break tags from a node.
         *
         * @param Element
         * @return void
         **/
        killBreaks: function (e) {
            try {
                e.innerHTML = e.innerHTML.replace(readability.regexps.killBreaksRe,'<br />');
            }
            catch (e) {
                dbg("KillBreaks failed - this is an IE bug. Ignoring.");
            }
        },

        /**
         * Clean a node of all elements of type "tag".
         * (Unless it's a youtube/vimeo video. People love movies.)
         *
         * @param Element
         * @param string tag to clean
         * @return void
         **/
        clean: function (e, tag) {
            var targetList = e.getElementsByTagName( tag );
            var isEmbed = (tag == 'object' || tag == 'embed');

            for (var y=targetList.length-1; y >= 0; y--) {
                /* Allow youtube and vimeo videos through as people usually want to see those. */
                if(isEmbed && targetList[y].innerHTML.search(readability.regexps.videoRe) !== -1){
                    continue;
                }

                targetList[y].parentNode.removeChild(targetList[y]);
            }
        },

        /**
         * Clean an element of all tags of type "tag" if they look fishy.
         * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
         *
         * @return void
         **/
        cleanConditionally: function (e, tag) {
            var tagsList = e.getElementsByTagName(tag);
            var curTagsLength = tagsList.length;

            /**
             * Gather counts for other typical elements embedded within.
             * Traverse backwards so we can remove nodes at the same time without effecting the traversal.
             *
             * TODO: Consider taking into account original contentScore here.
             **/
            for (var i=curTagsLength-1; i >= 0; i--) {
                var weight = readability.getClassWeight(tagsList[i]);

                dbg("Cleaning Conditionally " + tagsList[i] + " (" + tagsList[i].className + ":" + tagsList[i].id + ")" + ((typeof tagsList[i].readability != 'undefined') ? (" with score " + tagsList[i].readability.contentScore) : ''));

                if(weight < 0){
                    tagsList[i].parentNode.removeChild(tagsList[i]);
                }else if ( readability.getCharCount(tagsList[i],',') < 10) {
                    /**
                     * If there are not very many commas, and the number of
                     * non-paragraph elements is more than paragraphs or other ominous signs, remove the element.
                     **/

                    var p      = tagsList[i].getElementsByTagName("p").length;
                    var img    = tagsList[i].getElementsByTagName("img").length;
                    var li     = tagsList[i].getElementsByTagName("li").length-100;
                    var input  = tagsList[i].getElementsByTagName("input").length;

                    var embedCount = 0;
                    var embeds     = tagsList[i].getElementsByTagName("embed");
                    for(var ei=0,il=embeds.length; ei < il; ei++) {
                        if (embeds[ei].src.search(readability.regexps.videoRe) == -1) {
                            embedCount++;
                        }
                    }

                    var linkDensity   = readability.getLinkDensity(tagsList[i]);
                    var contentLength = readability.getInnerText(tagsList[i]).length;
                    var toRemove      = false;

                    if ( img > p ) {
                        toRemove = true;
                    } else if(li > p && tag != "ul" && tag != "ol") {
                        toRemove = true;
                    } else if( input > Math.floor(p/3) ) {
                        toRemove = true; 
                    } else if(contentLength < 25 && (img == 0 || img > 2) ) {
                        toRemove = true;
                    } else if(weight < 25 && linkDensity > .2) {
                        toRemove = true;
                    } else if(weight >= 25 && linkDensity > .5) {
                        toRemove = true;
                    } else if((embedCount == 1 && contentLength < 75) || embedCount > 1) {
                        toRemove = true;
                    }

                    if(toRemove) {
                        tagsList[i].parentNode.removeChild(tagsList[i]);
                    }
                }
            }
        },

        /**
         * Clean out spurious headers from an Element. Checks things like classnames and link density.
         *
         * @param Element
         * @return void
         **/
        cleanHeaders: function (e) {
            for (var headerIndex = 1; headerIndex < 7; headerIndex++) {
                var headers = e.getElementsByTagName('h' + headerIndex);
                for (var i=headers.length-1; i >=0; i--) {
                    if (readability.getClassWeight(headers[i]) < 0 || readability.getLinkDensity(headers[i]) > 0.33) {
                        headers[i].parentNode.removeChild(headers[i]);
                    }
                }
            }
        },



        htmlspecialchars: function (s) {
            if (typeof(s) == "string") {
                s = s.replace(/&/g, "&amp;");
                s = s.replace(/"/g, "&quot;");
                s = s.replace(/'/g, "&#039;");
                s = s.replace(/</g, "&lt;");
                s = s.replace(/>/g, "&gt;");
            }

            return s;
        }

    };

    var makeItReadable = function(){
        readability.init(); 
        addGlobalStyle(readabilityCSS);
    }
    window.addEventListener("keydown",function(e){
        //
        if(e.which == 66 && e.altKey){
            //alt+b
            if(!convertFlag){
                makeItReadable();//main route
                convertFlag = true;
            }else{//return to previous page
                window.location.reload();
            }

        }
    });
})();