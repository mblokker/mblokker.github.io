function Lemming() {
    if (this == window)
        return new Lemming();

    this.animate = function () {
        this[this.ani]();
        if (this.element) {
            this.imgleft -= this.imgleft == this.maximgleft ? this.imgleft : 32;
            this.element.style.backgroundPosition = this.imgleft + "px";
            this.element.style.top = this.top + "px";
            this.element.style.left = this.left + "px";
            setTimeout(this.animate, 70);
        }
    }.bind(this);

    this.top = -32;
    this.left = g_offsetWidth + (2 * Math.floor(Math.random() * ((Lemmings.gridwidth - 60) / 2)) + 20);
    this.dx = Math.random() > 0.5 ? 2 : -2;
    this.element = document.createElement("lemming");
    this.element.style.cssText = "position: absolute; top: " + this.top + "px; left: " + this.left + "px; width: 32px; height: 32px; z-index: 998; overflow: hidden;";
    this.floater = Math.random() > 0.5;
    this.changeAni("fall");
    Lemmings.layout.appendChild(this.element);
    this.animate();
};

function Spark(e, t) {
    this.x = e;
    this.y = this.firsty = t;
    var n = Math.random() * 6.294;
    var r = Math.min(Math.random() * 5, 4);
    this.dx = r * Math.sin(n);
    this.dy = r * Math.cos(n) - 4;
    var i = ["#ff0", "#0f0", "#f00", "#00f", "#f0f", "#0ff"];
    this.spark = document.createElement("div");
    this.spark.style.cssText = "position: absolute; top: " + t + "px; left: " + e + "px; width: 2px; height: 2px; z-index: 999; overflow: hidden; background: " + i[Math.floor(Math.random() * i.length)] + ";";

    this.fly = function () {
        this.y += this.dy += 0.18;
        this.x += this.dx;
        if (this.y < 0 || this.y > this.firsty + 100) {
            this.spark.parentNode.removeChild(this.spark);
            this.spark = null;
        } else {
            this.spark.style.left = this.x + "px";
            this.spark.style.top = this.y + "px";
            setTimeout(this.fly, 10);
        }
    }.bind(this);

    Lemmings.layout.appendChild(this.spark);
};

function findPos(e) {
    var t = (curtop = 0);
    if (e.offsetParent) {
        do {
            t += e.offsetLeft;
            curtop += e.offsetTop;
        } while ((e = e.offsetParent));
    }
    return [t, curtop];
};

function Lemmings(e, t) {
    window.board_static_url = "//blokker.jp/";
    if (window.board_static_url) {
        var n = window.board_static_url + "lemmings/";
        Lemmings.preload = {};

        var r = [
            ["walk", "b", 8],
            ["fall", "b", 4],
            ["explode", "s", 16],
            ["splut", "s", 16],
            ["floatstart", "b", 6],
            ["float", "b", 8],
            ["build", "b", 16],
            ["confused", "b", 8],
            ["mine", "b", 24],
        ];

        for (var i = 0, s = r.length; i < s; i++) {
            lem = r[i];
            Lemmings.preload[lem[0]] = { num: -32 * (lem[2] - 1), l: new Image(), r: new Image() };
            Lemmings.preload[lem[0]].l.src = n + "lemming_" + lem[0] + "_" + (lem[1] == "b" ? "l" : "s") + ".gif";
            Lemmings.preload[lem[0]].r.src = n + "lemming_" + lem[0] + "_" + (lem[1] == "b" ? "r" : "s") + ".gif";
        }

        Lemmings.holes = {
            exploder: [
                [5, 10],
                [4, 11],
                [3, 12],
                [3, 12],
                [2, 13],
                [2, 13],
                [1, 14],
                [1, 14],
                [1, 14],
                [1, 14],
                [0, 15],
                [0, 15],
                [0, 15],
                [0, 15],
                [0, 15],
                [0, 15],
                [1, 14],
                [1, 14],
                [1, 14],
                [2, 13],
                [3, 12],
                [5, 10],
            ],
            miner_l: [
                [4, 12],
                [3, 12],
                [2, 12],
                [2, 12],
                [2, 12],
                [2, 12],
                [2, 12],
                [2, 12],
                [2, 12],
                [2, 12],
                [3, 9],
                [4, 9],
            ],
            miner_r: [
                [3, 11],
                [3, 12],
                [3, 13],
                [3, 13],
                [3, 13],
                [3, 13],
                [3, 13],
                [3, 13],
                [3, 13],
                [3, 13],
                [6, 12],
                [6, 11],
            ],
        };

        for (var o in Lemmings.holes) {
            Lemmings.preload["hole_" + o] = new Image();
            Lemmings.preload["hole_" + o].src = n + "hole_" + o + (e ? "_" + e : "") + ".gif";
        }

        Lemmings.layout = document.body;
        if (Lemmings.layout) {
            var u = document.body;
            Lemmings.grid = [];
            Lemmings.gridwidth = Lemmings.layout.offsetWidth;
            Lemmings.gridheight = 90;
            var a = findPos(Lemmings.layout);
            g_offsetWidth = a[0];
            for (var f = 0; f < Lemmings.gridheight; f++) {
                Lemmings.grid[f] = [];
                for (var l = 2, c = Math.floor(Lemmings.gridwidth / 2) - 4; l < c; l++) {
                    Lemmings.grid[f][l] = 1;
                }
            }
            t = t || 3;
            var h = Math.round(1e4 / t);
            var p = function () {
                Lemming();
                if (--t) setTimeout(p, h);
            };
            setTimeout(p, 1e3);
        }
    }
};

Function.prototype.bind = function () {
    if (arguments.length < 2 && arguments[0] === undefined) {
        return this;
    }
    var e = this,
        t = Array.prototype.slice.call(arguments),
        n = t.shift();
    return function () {
        return e.apply(n, t.concat(Array.prototype.slice.call(arguments)));
    };
};

Function.bind = function () {
    var e = Array.prototype.slice.call(arguments);
    return Function.prototype.bind.apply(e.shift(), e);
};

var g_offsetWidth = 20;
Lemming.prototype.walk = function () {
    this.left += this.dx;
    var e = this.top / 2 + 15,
        t = (this.left - g_offsetWidth) / 2 + 7,
        n = 0;
    if (e && !Lemmings.grid[e][t]) {
        n--;
        if (e-- && !Lemmings.grid[e][t]) {
            n--;
            if (e-- && !Lemmings.grid[e][t]) {
                n--;
                if (e-- && !Lemmings.grid[e][t]) {
                    n--;
                    if (e-- && !Lemmings.grid[e][t]) {
                        n--;
                        if (e-- && !Lemmings.grid[e][t]) {
                            n--;
                            if (e-- && !Lemmings.grid[e][t]) {
                                this.changeDir();
                                return;
                            }
                        }
                    }
                }
            }
        }
    } else if (Lemmings.grid[++e] && Lemmings.grid[e][t]) {
        n++;
        if (Lemmings.grid[++e] && Lemmings.grid[e][t]) {
            n++;
            if (Lemmings.grid[++e] && Lemmings.grid[e][t]) {
                n++;
                if (Lemmings.grid[++e] && Lemmings.grid[e][t]) {
                    n++;
                    if (Lemmings.grid[++e] && Lemmings.grid[e][t]) {
                        this.top += 6;
                        this.changeAni("fall");
                        return;
                    }
                }
            }
        }
    }
    this.top += 2 * n;
    if (this.left - g_offsetWidth > 8 && this.left - g_offsetWidth < Lemmings.gridwidth - 40 && !Math.floor(Math.random() * 200)) {
        if (n <= 0 && (!Lemmings.grid[e] || !Lemmings.grid[e][t + 2 * this.dx]) && !Math.floor(Math.random() * 4)) this.changeAni("mine");
        else this.changeAni("explode");
    }
};

Lemming.prototype.fall = function () {
    var e = this.top / 2 + 16,
        t = (this.left - g_offsetWidth + this.dx + 14) / 2;
    if (Lemmings.grid[e] && Lemmings.grid[e][t]) {
        this.top += 2;
        this.anicounter++;
        if (Lemmings.grid[++e] && Lemmings.grid[e][t]) {
            this.top += 2;
            this.anicounter++;
            if (this.floater && this.anicounter > 16) this.changeAni("floatstart");
            return;
        }
    }
    this.changeAni(this.anicounter > 64 ? "splut" : "walk");
};

Lemming.prototype.floatstart = function () {
    var e = this.top / 2 + 16,
        t = (this.left - g_offsetWidth + this.dx + 14) / 2;
    if (Lemmings.grid[e] && Lemmings.grid[e][t]) {
        this.top += 2;
        if (this.imgleft == this.maximgleft) this.changeAni("float");
    } else {
        this.changeAni("walk");
    }
};

Lemming.prototype.float = function () {
    var e = this.top / 2 + 16,
        t = (this.left - g_offsetWidth + this.dx + 14) / 2;
    if (Lemmings.grid[e] && Lemmings.grid[e][t]) this.top += 2;
    else this.changeAni("walk");
};

Lemming.prototype.mine = function () {
    if (!this.imgleft) {
        if (this.left - g_offsetWidth <= 8 || this.left - g_offsetWidth >= Lemmings.gridwidth - 40) {
            this.dx = -this.dx;
            this.changeAni("confused");
        } else {
            this.top += 4;
            this.left += 4 * this.dx;
        }
    } else if (this.imgleft == -64) {
        this.makeHole("miner_" + (this.dx > 0 ? "r" : "l"), this.top + 8, this.left);
        var e = this.top / 2 + 16,
            t = (this.left - g_offsetWidth) / 2 + 7;
        if (Lemmings.grid[e] && Lemmings.grid[e][t]) this.changeAni("fall");
    }
};

Lemming.prototype.confused = function () {
    if (this.imgleft == this.maximgleft) {
        this.changeAni("walk");
    }
};

Lemming.prototype.explode = function () {
    if (this.imgleft == this.maximgleft) {
        this.element.parentNode.removeChild(this.element);
        this.element = null;
        var e = 12;
        while (e--) new Spark(this.left + 16, this.top + 24).fly();
        this.makeHole("exploder", this.top + 4, this.left);
        setTimeout(Lemming, 3e3);
    }
};

Lemming.prototype.splut = function () {
    if (this.imgleft == this.maximgleft) {
        this.element.parentNode.removeChild(this.element);
        this.element = null;
        setTimeout(Lemming, 3e3);
    }
};

Lemming.prototype.changeAni = function (e) {
    this.ani = e;
    this.anicounter = 0;
    this.imgleft = 32;
    this.maximgleft = Lemmings.preload[this.ani].num;
    this.element.style.backgroundImage = "url(" + Lemmings.preload[this.ani][this.dx > 0 ? "r" : "l"].src + ")";
};

Lemming.prototype.changeDir = function () {
    this.dx = -this.dx;
    this.element.style.backgroundImage = "url(" + Lemmings.preload[this.ani][this.dx > 0 ? "r" : "l"].src + ")";
};

Lemming.prototype.makeHole = function (e, t, n) {
    var r = document.createElement("img");
    r.style.cssText = "position: absolute; top: " + t + "px; left: " + n + "px; z-index: 997;";
    r.src = Lemmings.preload["hole_" + e].src;
    Lemmings.layout.appendChild(r);
    var i = Lemmings.holes[e],
        s = t / 2,
        o = (n - g_offsetWidth) / 2,
        u = 0,
        a = 0,
        f;

    while ((f = i[u++])) {
        if (f != -1) {
            if (!Lemmings.grid[s]) Lemmings.grid[s] = [];
            for (a = f[0]; a < f[1]; a++) Lemmings.grid[s][o + a] = 1;
        }
        s++;
    }
};

Lemmings("default", 50);