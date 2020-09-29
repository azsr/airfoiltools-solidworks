// ==UserScript==
// @name         Airfoil for Solidworks
// @version      20.03
// @description  Converts the "Dat file" textbox into a copy-and-pastable Solidworks-compatible version, overwriting the "Parser" box
// @author       David Wang (wang.dav@northeastern.edu)
// @match        http://airfoiltools.com/airfoil/details?airfoil=*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

(function() {
    'use strict';

    $(document).ready(function() {
        // Read in Selig data information
        var dat = $('.details .cell2').children().first().text();
        // Split into lines
        var datarr = dat.split("\n");
        // Remove header text
        datarr.splice(0,1);
        datarr.splice(-1,1);
        dat = "";
        // Figure out if the data is indented
        var offset = 0;
        for (; offset < datarr[0].length && datarr[0][offset] == ' '; offset++) {}
        // Extract numbers and concatenate
        for (var i = 0; i < datarr.length; i++) {
            // Where the first number ends and the second number starts
            var first = offset;
            var last = datarr[i].length - 1;
            // Iterate through each line to find that out
            for ( ; first < datarr[i].length && datarr[i][first] !=' '; first++) {}
            for ( ; last >= 0 && datarr[i][last] != ' '; last--) {}
            // Concatenate into tab-separated lines
            dat += "" + datarr[i].substr(offset,first-offset-1) + "\t" + datarr[i].substr(last+(last===datarr[i].length-1?0:1)) + "\t0.0\n";
        }
        // Show on website
        $('.details .cell3h').html("<b>Solidworks file</b>");
        $('.details .cell3').attr("id", "solidworks");
        $('.details .cell3').html("<pre style=\"height:100px;overflow:auto;text-align:left;background-color:#ddd\">\n" + dat + "</pre>");

        // Future plans: One-click copying
        //$('.details .cell3').append("<input type=\"button\" onclick=\"if (!window.__cfRLUnblockHandlers) return false; jsCopy();\" value=\"Copy to clipboard\">");
        //$('script').append("function jsCopy() {copyToClip(document.getElementById(\"solidworks\").innerHTML);document.getElementById(\"copiedNotice\").solidworks = \"Copied!\";}");
    }
    );
})();
