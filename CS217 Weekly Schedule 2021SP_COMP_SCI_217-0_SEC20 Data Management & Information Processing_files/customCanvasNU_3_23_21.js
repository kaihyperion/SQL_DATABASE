//Minified working as of Aug 28, 2019
function removeStorage(e) { try { localStorage.removeItem(e), localStorage.removeItem(e + "_expiresIn") } catch (t) { return console.log("removeStorage: Error removing key [" + e + "] from localStorage: " + JSON.stringify(t)), !1 } return !0 } function getStorage(e) { var t = Date.now(), o = localStorage.getItem(e + "_expiresIn"); if (null == o && (o = 0), o < t) return removeStorage(e), null; try { return localStorage.getItem(e) } catch (t) { return console.log("getStorage: Error reading key [" + e + "] from localStorage: " + JSON.stringify(t)), null } } function setStorage(e, t, o) { o = null == o ? 86400 : Math.abs(o); var s = Date.now() + 1e3 * o; try { localStorage.setItem(e, t), localStorage.setItem(e + "_expiresIn", s) } catch (t) { return console.log("setStorage: Error setting key [" + e + "] in localStorage: " + JSON.stringify(t)), !1 } return !0 } async function coursesRequest(e) { let t = await fetch("/api/v1/users/self/courses?per_page=100"), o = await t.text(); o = o.substr(9), o = JSON.parse(o); var s = JSON.stringify(o); return setStorage("ga_enrollments", s, null), parseCourses(e, s) } function parseCourses(e, t) { if (null != t) { let s = JSON.parse(t); for (var o = 0; o < s.length; o++)if (s[o].id == e) return s[o] } return null } function gaCourseDimensions(e) { custom_ga("set", "dimension4", e.id), custom_ga("set", "dimension5", e.name), custom_ga("set", "dimension6", e.account_id), custom_ga("set", "dimension7", e.enrollment_term_id), custom_ga("set", "dimension8", e.enrollments[0].type), custom_ga("send", "pageview") } function googleAnalyticsCode(e) { var t, o, s, n; if (custom_ga("create", e, "auto"), t = ENV.current_user_id, o = ENV.current_user_roles, custom_ga("set", "userId", t), custom_ga("set", "dimension1", t), custom_ga("set", "dimension3", o), n = window.location.pathname.match(/\/courses\/(\d+)/)) { n = n[1], s = 0; try { let e = getStorage("ga_enrollments"); if (null != e) { var r = parseCourses(n, e); null === r ? coursesRequest(n).then(e => { null === e ? (custom_ga("set", "dimension4", n), custom_ga("send", "pageview")) : gaCourseDimensions(e) }) : gaCourseDimensions(r) } else coursesRequest(n).then(e => { null === e ? (custom_ga("set", "dimension4", n), custom_ga("send", "pageview")) : gaCourseDimensions(e) }) } catch (e) { if ((s += 1) > 5) return custom_ga("set", "dimension4", n), void custom_ga("send", "pageview") } } else custom_ga("send", "pageview") } !function (e, t, o, s, n, r, a) { e.GoogleAnalyticsObject = n, e[n] = e[n] || function () { (e[n].q = e[n].q || []).push(arguments) }, e[n].l = 1 * new Date, r = t.createElement(o), a = t.getElementsByTagName(o)[0], r.async = 1, r.src = "https://www.google-analytics.com/analytics.js", a.parentNode.insertBefore(r, a) }(window, document, "script", 0, "custom_ga");
googleAnalyticsCode("UA-52922333-1");

function onElementRendered(selector, cb, _attempts) {
    var el = $(selector);
    _attempts = ++_attempts || 1;
    if (el.length) return cb(el);
    if (_attempts == 6000) return;
    setTimeout(function () {
        onElementRendered(selector, cb, _attempts);
    }, 250);
};

$(document).ready(function () {
    let els = document.querySelectorAll('#section-tabs a')
    for (let el of els) {
        let text = el.innerText
        if (text.startsWith('NU ')) {
            el.innerText = text.replace(/^NU /, '')
            el.innerHTML = '<img src="https://canvas.northwestern.edu/files/10126053/download?download_frd=1" style="height: 16px; padding-bottom: 3px;" />&nbsp;' + el.innerText
        }
    }
    //console.log("NUS");
    function receiveMessage(event) {
        if (typeof event === 'string') {
            try {
                var event2 = JSON.parse(event)
                event = event2
            } catch (e) { }
        }
        if (event.data.method == 'changeStyleId') {
            var element = document.getElementById(event.data.id)
            element.style[event.data.param] = event.data.value
        } else if (event.data.method == 'changeStyleClass') {
            var elements = document.getElementsByClassName(event.data.class)
            for (var i in elements) {
                var element = elements[i]
                element.style[event.data.param] = event.data.value
            }
        } else if (event.data.method == 'getParentURL') {
            var iframe = document.getElementById('tool_content').contentWindow
            console.log('sending', document.URL)
            iframe.postMessage(document.URL, '*')
        } else if (event.data.method == 'debug') {
            console.log(event)
            var iframe = document.getElementById('tool_content').contentWindow
            var ev = JSON.parse(JSON.stringify(event))
            iframe.postMessage({ event: ev, url: document.URL }, '*')
        } else (
            console.error('Unknown event.', event)
        )
        return { success: true }
    }
    window.addEventListener("message", receiveMessage, false);
    if ('evaluate' in document) { // Forget it if we are in IE 11
        function r(e, t, n) {
            var i = $(e);
            n = ++n || 1;
            if (i.length) return t(i);
            if (n == 60) return;
            setTimeout(function () {
                r(e, t, n)
            }, 250)
        }

        function i(e, t, n) {
            var r = $._data($(e)[0], "events");
            n = ++n || 1;
            if (r.click.length) return t(r);
            if (n == 600) return;
            setTimeout(function () {
                i(e, t, n)
            }, 250)
        }

        function getElementByXpath(path) {
            return $(document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
        };

        function s() {
            //console.log("NUDEP");
            $("#create-users-step-1 > p").text("Type or paste a list of NetIDs below:");
            $("#user_list_textarea").attr("placeholder", "Examples: abc123, def456, etc.");
            $('#peoplesearch_radio_sis_user_id').parent().hide();
            $('#peoplesearch_radio_cc_path').parent().hide();
            //$('#peoplesearch_radio_unique_id').prop("checked", true);
            $('#peoplesearch_radio_unique_id').click();
            $('#peoplesearch_radio_unique_id').parent().hide();
            $($('#peoplesearch_radio_unique_id').next().children()[1]).text('NetID');
            //$($('.peoplesearch__instructions > span > span')[0]).text('Add user(s) by NetID.');

            $($($($('.addpeople__peoplesearch').children()[1]).children()[0]).children()[2]).text('abc123, def456, etc.');
            //$($($($('.addpeople__peoplesearch').children()[0]).children()[0]).children()[0]).text('Add user(s) by NetID');
            var addUsersText = getElementByXpath('/html/body/span/div/div/div/div[3]/div/div/fieldset[1]/span/span/span[1]/legend/span');
            addUsersText.text('Add user(s) by NetID');
        }

        function as() {
            //console.log("NUAS");
            var dialog = getElementByXpath("/html/body/div[4]/div/div/div/div[3]/div/div/div/div[1]/div[2]");
            if (dialog.text() == 'We were unable to find matches below. Select any you would like to create as new users. Unselected will be skipped at this time.') {
                dialog.text('We were unable to find matches below. Please check the NetID you are attempting to add.');
            }
            var namebutton = getElementByXpath('/html/body/div[4]/div/div/div/div[3]/div/div/div/div[2]/table/tbody/tr/td[2]/button');
            namebutton.hide();
            var checkbox = getElementByXpath('/html/body/div[4]/div/div/div/div[3]/div/div/div/div[2]/table/tbody/tr/td[1]/label/span/span[1]');
            checkbox.hide();
            // var loginid = getElementByXpath('/html/body/div[4]/div/div/div/div[3]/div/div/div/div[2]/table/thead/tr/th[4]');
            var loginid = getElementByXpath('//*[@id="add_people_modal"]/div[2]/div/div/div/fieldset[1]/span/span/span[2]/span/span/span/span[2]/div/label/span[2]')
            loginid.text('NetID');
            var cb2 = getElementByXpath('/html/body/div[4]/div/div/div/div[3]/div/div/div/div[2]/table/thead/tr/th[1]/label');
            cb2.hide();
            var add_users_text = getElementByXpath('//*[@id="add_people_modal"]/div[2]/div/div/fieldset[1]/span/span/span[1]/span')
            add_users_text.text('Add user(s) by NetID.');
            add_users_text = getElementByXpath('//*[@id="add_people_modal"]/div[2]/div/div/div/fieldset[1]/span/span/span[1]/span')
            add_users_text.text('Add user(s) by NetID.');
        }
        $(document).click(function () {
            setTimeout(function () {
                $('#addpeople_back').click(function () {
                    console.log("NU1");
                    setTimeout(s, 50);
                    setTimeout(s, 250);
                    setTimeout(s, 500);
                });
            }, 250);
            //console.log("NU2");
            as();
            setTimeout(as, 50);
            setTimeout(as, 250);
            setTimeout(as, 500);
        });

        function o() {
            $(".alert.alert-error.content-box > p small").text("Examples: abc123, def456, etc.")
        }

        function u() {
            e = setInterval(s, 250)
        }

        function a() {
            t = setInterval(o, 250)
        }

        function f() {
            onElementRendered('.addpeople', function (e) {
                s();
                setTimeout(s, 50);
                setTimeout(s, 250);
                setTimeout(s, 500);
            });
            var n = document.URL;
            if (n.indexOf("users") > 1) {
                r(".ui-widget-overlay", function () {
                    u();
                    a();
                    $("span.ui-icon.ui-icon-closethick").on("click", function () {
                        clearInterval(t);
                        clearInterval(e)
                    })
                })
            }
        }
        var e;
        var t;
        var n = document.URL;
        r("#identity-help-container", function (e) {
            $("#identity-help-container").bind("click", function (e) {
                r("#help-dialog-options a[href=#create_ticket] .subtext", function (e) {
                    $("#help-dialog-options a[href=#create_ticket] .text").html("Ask For Help");
                    $("#help-dialog-options a[href=#create_ticket] .subtext").html("Submit a ticket to Canvas Support")
                })
            })
        });
        if (n.indexOf("users") > 1) {
            r("#addUsers", function (e) {
                i("#addUsers", function (e) {
                    $("#addUsers").bind("click", function (e) {
                        f()
                    })
                })
            })
        }
    } else {
        console.log("Can't run NU customizations in IE 11");
    }
});
/*
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-52922333-1', 'auto');
ga('send', 'pageview');
*/

$('#login_forgot_password').click(function () {

    onElementRendered('.ic-Login__body', function (e) {
        $("#forgot_password_instructions").text("Enter your Email and we'll send you a link to change your password.");
        $("label[for='pseudonym_session_unique_id_forgot']").text('Email');
    });
});