var e, t = Object.prototype.hasOwnProperty,
    n = Object.getOwnPropertySymbols,
    a = Object.prototype.propertyIsEnumerable,
    l = Object.assign,
    s = (e, l) => {
        var s = {};
        for (var o in e) t.call(e, o) && l.indexOf(o) < 0 && (s[o] = e[o]);
        if (null != e && n)
            for (var o of n(e)) l.indexOf(o) < 0 && a.call(e, o) && (s[o] = e[o]);
        return s
    };

function o(e, t) {
    const n = Object.create(null),
        a = e.split(",");
    for (let l = 0; l < a.length; l++) n[a[l]] = !0;
    return t ? e => !!n[e.toLowerCase()] : e => !!n[e]
}! function(e = ".", t = "__import__") {
    try {
        self[t] = new Function("u", "return import(u)")
    } catch (n) {
        const a = new URL(e, location),
            l = e => {
                URL.revokeObjectURL(e.src), e.remove()
            };
        self[t] = e => new Promise(((n, s) => {
            const o = new URL(e, a);
            if (self[t].moduleMap[o]) return n(self[t].moduleMap[o]);
            const r = new Blob([`import * as m from '${o}';`, `${t}.moduleMap['${o}']=m;`], {
                    type: "text/javascript"
                }),
                i = Object.assign(document.createElement("script"), {
                    type: "module",
                    src: URL.createObjectURL(r),
                    onerror() {
                        s(new Error(`Failed to import: ${e}`)), l(i)
                    },
                    onload() {
                        n(self[t].moduleMap[o]), l(i)
                    }
                });
            document.head.appendChild(i)
        })), self[t].moduleMap = {}
    }
}("/dist/assets/");
const r = o("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt"),
    i = o("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");

function c(e) {
    if (E(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const a = e[n],
                l = c(D(a) ? p(a) : a);
            if (l)
                for (const e in l) t[e] = l[e]
        }
        return t
    }
    if (M(e)) return e
}
const u = /;(?![^(]*\))/g,
    d = /:(.+)/;

function p(e) {
    const t = {};
    return e.split(u).forEach((e => {
        if (e) {
            const n = e.split(d);
            n.length > 1 && (t[n[0].trim()] = n[1].trim())
        }
    })), t
}

function f(e) {
    let t = "";
    if (D(e)) t = e;
    else if (E(e))
        for (let n = 0; n < e.length; n++) {
            const a = f(e[n]);
            a && (t += a + " ")
        } else if (M(e))
            for (const n in e) e[n] && (t += n + " ");
    return t.trim()
}

function h(e, t) {
    if (e === t) return !0;
    let n = I(e),
        a = I(t);
    if (n || a) return !(!n || !a) && e.getTime() === t.getTime();
    if (n = E(e), a = E(t), n || a) return !(!n || !a) && function(e, t) {
        if (e.length !== t.length) return !1;
        let n = !0;
        for (let a = 0; n && a < e.length; a++) n = h(e[a], t[a]);
        return n
    }(e, t);
    if (n = M(e), a = M(t), n || a) {
        if (!n || !a) return !1;
        if (Object.keys(e).length !== Object.keys(t).length) return !1;
        for (const n in e) {
            const a = e.hasOwnProperty(n),
                l = t.hasOwnProperty(n);
            if (a && !l || !a && l || !h(e[n], t[n])) return !1
        }
    }
    return String(e) === String(t)
}

function m(e, t) {
    return e.findIndex((e => h(e, t)))
}
const g = e => null == e ? "" : M(e) ? JSON.stringify(e, b, 2) : String(e),
    b = (e, t) => R(t) ? {
        [`Map(${t.size})`]: [...t.entries()].reduce(((e, [t, n]) => (e[`${t} =>`] = n, e)), {})
    } : L(t) ? {
        [`Set(${t.size})`]: [...t.values()]
    } : !M(t) || E(t) || j(t) ? t : String(t),
    v = {},
    x = [],
    y = () => {},
    k = () => !1,
    w = /^on[^a-z]/,
    _ = e => w.test(e),
    C = e => {
        //e.startsWith("onUpdate:")
    },
    A = Object.assign,
    S = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1)
    },
    P = Object.prototype.hasOwnProperty,
    T = (e, t) => P.call(e, t),
    E = Array.isArray,
    R = e => "[object Map]" === U(e),
    L = e => "[object Set]" === U(e),
    I = e => e instanceof Date,
    O = e => "function" == typeof e,
    D = e => "string" == typeof e,
    N = e => "symbol" == typeof e,
    M = e => null !== e && "object" == typeof e,
    $ = e => M(e) && O(e.then) && O(e.catch),
    V = Object.prototype.toString,
    U = e => V.call(e),
    j = e => "[object Object]" === U(e),
    F = e => D(e) && "NaN" !== e && "-" !== e[0] && "" + parseInt(e, 10) === e,
    B = o(",key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    H = e => {
        const t = Object.create(null);
        return n => t[n] || (t[n] = e(n))
    },
    G = /-(\w)/g,
    q = H((e => e.replace(G, ((e, t) => t ? t.toUpperCase() : "")))),
    z = /\B([A-Z])/g,
    W = H((e => e.replace(z, "-$1").toLowerCase())),
    K = H((e => e.charAt(0).toUpperCase() + e.slice(1))),
    J = H((e => e ? `on${K(e)}` : "")),
    X = (e, t) => e !== t && (e == e || t == t),
    Y = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    },
    Q = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n
        })
    },
    Z = e => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t
    },
    ee = new WeakMap,
    te = [];
let ne;
const ae = Symbol(""),
    le = Symbol("");

function se(e, t = v) {
    (function(e) {
        return e && !0 === e._isEffect
    })(e) && (e = e.raw);
    const n = function(e, t) {
        const n = function() {
            if (!n.active) return t.scheduler ? void 0 : e();
            if (!te.includes(n)) {
                ie(n);
                try {
                    return ue.push(ce), ce = !0, te.push(n), ne = n, e()
                } finally {
                    te.pop(), pe(), ne = te[te.length - 1]
                }
            }
        };
        return n.id = re++, n.allowRecurse = !!t.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = e, n.deps = [], n.options = t, n
    }(e, t);
    return t.lazy || n(), n
}

function oe(e) {
    e.active && (ie(e), e.options.onStop && e.options.onStop(), e.active = !1)
}
let re = 0;

function ie(e) {
    const {
        deps: t
    } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0
    }
}
let ce = !0;
const ue = [];

function de() {
    ue.push(ce), ce = !1
}

function pe() {
    const e = ue.pop();
    ce = void 0 === e || e
}

function fe(e, t, n) {
    if (!ce || void 0 === ne) return;
    let a = ee.get(e);
    a || ee.set(e, a = new Map);
    let l = a.get(n);
    l || a.set(n, l = new Set), l.has(ne) || (l.add(ne), ne.deps.push(l))
}

function he(e, t, n, a, l, s) {
    const o = ee.get(e);
    if (!o) return;
    const r = new Set,
        i = e => {
            e && e.forEach((e => {
                (e !== ne || e.allowRecurse) && r.add(e)
            }))
        };
    if ("clear" === t) o.forEach(i);
    else if ("length" === n && E(e)) o.forEach(((e, t) => {
        ("length" === t || t >= a) && i(e)
    }));
    else switch (void 0 !== n && i(o.get(n)), t) {
        case "add":
            E(e) ? F(n) && i(o.get("length")) : (i(o.get(ae)), R(e) && i(o.get(le)));
            break;
        case "delete":
            E(e) || (i(o.get(ae)), R(e) && i(o.get(le)));
            break;
        case "set":
            R(e) && i(o.get(ae))
    }
    r.forEach((e => {
        e.options.scheduler ? e.options.scheduler(e) : e()
    }))
}
const me = o("__proto__,__v_isRef,__isVue"),
    ge = new Set(Object.getOwnPropertyNames(Symbol).map((e => Symbol[e])).filter(N)),
    be = we(),
    ve = we(!1, !0),
    xe = we(!0),
    ye = we(!0, !0),
    ke = {};

function we(e = !1, t = !1) {
    return function(n, a, l) {
        if ("__v_isReactive" === a) return !e;
        if ("__v_isReadonly" === a) return e;
        if ("__v_raw" === a && l === (e ? Je : Ke).get(n)) return n;
        const s = E(n);
        if (!e && s && T(ke, a)) return Reflect.get(ke, a, l);
        const o = Reflect.get(n, a, l);
        if (N(a) ? ge.has(a) : me(a)) return o;
        if (e || fe(n, 0, a), t) return o;
        if (st(o)) {
            return !s || !F(a) ? o.value : o
        }
        return M(o) ? e ? Qe(o) : Ye(o) : o
    }
} ["includes", "indexOf", "lastIndexOf"].forEach((e => {
    const t = Array.prototype[e];
    ke[e] = function(...e) {
        const n = at(this);
        for (let t = 0, l = this.length; t < l; t++) fe(n, 0, t + "");
        const a = t.apply(n, e);
        return -1 === a || !1 === a ? t.apply(n, e.map(at)) : a
    }
})), ["push", "pop", "shift", "unshift", "splice"].forEach((e => {
    const t = Array.prototype[e];
    ke[e] = function(...e) {
        de();
        const n = t.apply(this, e);
        return pe(), n
    }
}));

function _e(e = !1) {
    return function(t, n, a, l) {
        const s = t[n];
        if (!e && (a = at(a), !E(t) && st(s) && !st(a))) return s.value = a, !0;
        const o = E(t) && F(n) ? Number(n) < t.length : T(t, n),
            r = Reflect.set(t, n, a, l);
        return t === at(l) && (o ? X(a, s) && he(t, "set", n, a) : he(t, "add", n, a)), r
    }
}
const Ce = {
        get: be,
        set: _e(),
        deleteProperty: function(e, t) {
            const n = T(e, t);
            e[t];
            const a = Reflect.deleteProperty(e, t);
            return a && n && he(e, "delete", t, void 0), a
        },
        has: function(e, t) {
            const n = Reflect.has(e, t);
            return N(t) && ge.has(t) || fe(e, 0, t), n
        },
        ownKeys: function(e) {
            return fe(e, 0, E(e) ? "length" : ae), Reflect.ownKeys(e)
        }
    },
    Ae = {
        get: xe,
        set: (e, t) => !0,
        deleteProperty: (e, t) => !0
    },
    Se = A({}, Ce, {
        get: ve,
        set: _e(!0)
    });
A({}, Ae, {
    get: ye
});
const Pe = e => M(e) ? Ye(e) : e,
    Te = e => M(e) ? Qe(e) : e,
    Ee = e => e,
    Re = e => Reflect.getPrototypeOf(e);

function Le(e, t, n = !1, a = !1) {
    const l = at(e = e.__v_raw),
        s = at(t);
    t !== s && !n && fe(l, 0, t), !n && fe(l, 0, s);
    const {
        has: o
    } = Re(l), r = n ? Te : a ? Ee : Pe;
    return o.call(l, t) ? r(e.get(t)) : o.call(l, s) ? r(e.get(s)) : void 0
}

function Ie(e, t = !1) {
    const n = this.__v_raw,
        a = at(n),
        l = at(e);
    return e !== l && !t && fe(a, 0, e), !t && fe(a, 0, l), e === l ? n.has(e) : n.has(e) || n.has(l)
}

function Oe(e, t = !1) {
    return e = e.__v_raw, !t && fe(at(e), 0, ae), Reflect.get(e, "size", e)
}

function De(e) {
    e = at(e);
    const t = at(this);
    return Re(t).has.call(t, e) || (t.add(e), he(t, "add", e, e)), this
}

function Ne(e, t) {
    t = at(t);
    const n = at(this),
        {
            has: a,
            get: l
        } = Re(n);
    let s = a.call(n, e);
    s || (e = at(e), s = a.call(n, e));
    const o = l.call(n, e);
    return n.set(e, t), s ? X(t, o) && he(n, "set", e, t) : he(n, "add", e, t), this
}

function Me(e) {
    const t = at(this),
        {
            has: n,
            get: a
        } = Re(t);
    let l = n.call(t, e);
    l || (e = at(e), l = n.call(t, e)), a && a.call(t, e);
    const s = t.delete(e);
    return l && he(t, "delete", e, void 0), s
}

function $e() {
    const e = at(this),
        t = 0 !== e.size,
        n = e.clear();
    return t && he(e, "clear", void 0, void 0), n
}

function Ve(e, t) {
    return function(n, a) {
        const l = this,
            s = l.__v_raw,
            o = at(s),
            r = e ? Te : t ? Ee : Pe;
        return !e && fe(o, 0, ae), s.forEach(((e, t) => n.call(a, r(e), r(t), l)))
    }
}

function Ue(e, t, n) {
    return function(...a) {
        const l = this.__v_raw,
            s = at(l),
            o = R(s),
            r = "entries" === e || e === Symbol.iterator && o,
            i = "keys" === e && o,
            c = l[e](...a),
            u = t ? Te : n ? Ee : Pe;
        return !t && fe(s, 0, i ? le : ae), {
            next() {
                const {
                    value: e,
                    done: t
                } = c.next();
                return t ? {
                    value: e,
                    done: t
                } : {
                    value: r ? [u(e[0]), u(e[1])] : u(e),
                    done: t
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}

function je(e) {
    return function(...t) {
        return "delete" !== e && this
    }
}
const Fe = {
        get(e) {
            return Le(this, e)
        },
        get size() {
            return Oe(this)
        },
        has: Ie,
        add: De,
        set: Ne,
        delete: Me,
        clear: $e,
        forEach: Ve(!1, !1)
    },
    Be = {
        get(e) {
            return Le(this, e, !1, !0)
        },
        get size() {
            return Oe(this)
        },
        has: Ie,
        add: De,
        set: Ne,
        delete: Me,
        clear: $e,
        forEach: Ve(!1, !0)
    },
    He = {
        get(e) {
            return Le(this, e, !0)
        },
        get size() {
            return Oe(this, !0)
        },
        has(e) {
            return Ie.call(this, e, !0)
        },
        add: je("add"),
        set: je("set"),
        delete: je("delete"),
        clear: je("clear"),
        forEach: Ve(!0, !1)
    };

function Ge(e, t) {
    const n = t ? Be : e ? He : Fe;
    return (t, a, l) => "__v_isReactive" === a ? !e : "__v_isReadonly" === a ? e : "__v_raw" === a ? t : Reflect.get(T(n, a) && a in t ? n : t, a, l)
} ["keys", "values", "entries", Symbol.iterator].forEach((e => {
    Fe[e] = Ue(e, !1, !1), He[e] = Ue(e, !0, !1), Be[e] = Ue(e, !1, !0)
}));
const qe = {
        get: Ge(!1, !1)
    },
    ze = {
        get: Ge(!1, !0)
    },
    We = {
        get: Ge(!0, !1)
    },
    Ke = new WeakMap,
    Je = new WeakMap;

function Xe(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : function(e) {
        switch (e) {
            case "Object":
            case "Array":
                return 1;
            case "Map":
            case "Set":
            case "WeakMap":
            case "WeakSet":
                return 2;
            default:
                return 0
        }
    }((e => U(e).slice(8, -1))(e))
}

function Ye(e) {
    return e && e.__v_isReadonly ? e : Ze(e, !1, Ce, qe)
}

function Qe(e) {
    return Ze(e, !0, Ae, We)
}

function Ze(e, t, n, a) {
    if (!M(e)) return e;
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e;
    const l = t ? Je : Ke,
        s = l.get(e);
    if (s) return s;
    const o = Xe(e);
    if (0 === o) return e;
    const r = new Proxy(e, 2 === o ? a : n);
    return l.set(e, r), r
}

function et(e) {
    return tt(e) ? et(e.__v_raw) : !(!e || !e.__v_isReactive)
}

function tt(e) {
    return !(!e || !e.__v_isReadonly)
}

function nt(e) {
    return et(e) || tt(e)
}

function at(e) {
    return e && at(e.__v_raw) || e
}
const lt = e => M(e) ? Ye(e) : e;

function st(e) {
    return Boolean(e && !0 === e.__v_isRef)
}

function ot(e) {
    return it(e)
}
class rt {
    constructor(e, t = !1) {
        this._rawValue = e, this._shallow = t, this.__v_isRef = !0, this._value = t ? e : lt(e)
    }
    get value() {
        return fe(at(this), 0, "value"), this._value
    }
    set value(e) {
        X(at(e), this._rawValue) && (this._rawValue = e, this._value = this._shallow ? e : lt(e), he(at(this), "set", "value", e))
    }
}

function it(e, t = !1) {
    return st(e) ? e : new rt(e, t)
}

function ct(e) {
    return st(e) ? e.value : e
}
const ut = {
    get: (e, t, n) => ct(Reflect.get(e, t, n)),
    set: (e, t, n, a) => {
        const l = e[t];
        return st(l) && !st(n) ? (l.value = n, !0) : Reflect.set(e, t, n, a)
    }
};

function dt(e) {
    return et(e) ? e : new Proxy(e, ut)
}
class pt {
    constructor(e, t) {
        this._object = e, this._key = t, this.__v_isRef = !0
    }
    get value() {
        return this._object[this._key]
    }
    set value(e) {
        this._object[this._key] = e
    }
}
class ft {
    constructor(e, t, n) {
        this._setter = t, this._dirty = !0, this.__v_isRef = !0, this.effect = se(e, {
            lazy: !0,
            scheduler: () => {
                this._dirty || (this._dirty = !0, he(at(this), "set", "value"))
            }
        }), this.__v_isReadonly = n
    }
    get value() {
        return this._dirty && (this._value = this.effect(), this._dirty = !1), fe(at(this), 0, "value"), this._value
    }
    set value(e) {
        this._setter(e)
    }
}

function ht(e, t, n, a) {
    let l;
    try {
        l = a ? e(...a) : e()
    } catch (s) {
        gt(s, t, n)
    }
    return l
}

function mt(e, t, n, a) {
    if (O(e)) {
        const l = ht(e, t, n, a);
        return l && $(l) && l.catch((e => {
            gt(e, t, n)
        })), l
    }
    const l = [];
    for (let s = 0; s < e.length; s++) l.push(mt(e[s], t, n, a));
    return l
}

function gt(e, t, n, a = !0) {
    t && t.vnode;
    if (t) {
        let a = t.parent;
        const l = t.proxy,
            s = n;
        for (; a;) {
            const t = a.ec;
            if (t)
                for (let n = 0; n < t.length; n++)
                    if (!1 === t[n](e, l, s)) return;
            a = a.parent
        }
        const o = t.appContext.config.errorHandler;
        if (o) return void ht(o, null, 10, [e, l, s])
    }! function(e, t, n, a = !0) {
        console.error(e)
    }(e, 0, 0, a)
}
let bt = !1,
    vt = !1;
const xt = [];
let yt = 0;
const kt = [];
let wt = null,
    _t = 0;
const Ct = [];
let At = null,
    St = 0;
const Pt = Promise.resolve();
let Tt = null,
    Et = null;

function Rt(e) {
    const t = Tt || Pt;
    return e ? t.then(this ? e.bind(this) : e) : t
}

function Lt(e) {
    if (!(xt.length && xt.includes(e, bt && e.allowRecurse ? yt + 1 : yt) || e === Et)) {
        const t = function(e) {
            let t = yt + 1,
                n = xt.length;
            const a = Mt(e);
            for (; t < n;) {
                const e = t + n >>> 1;
                Mt(xt[e]) < a ? t = e + 1 : n = e
            }
            return t
        }(e);
        t > -1 ? xt.splice(t, 0, e) : xt.push(e), It()
    }
}

function It() {
    bt || vt || (vt = !0, Tt = Pt.then($t))
}

function Ot(e, t, n, a) {
    E(e) ? n.push(...e) : t && t.includes(e, e.allowRecurse ? a + 1 : a) || n.push(e), It()
}

function Dt(e, t = null) {
    if (kt.length) {
        for (Et = t, wt = [...new Set(kt)], kt.length = 0, _t = 0; _t < wt.length; _t++) wt[_t]();
        wt = null, _t = 0, Et = null, Dt(e, t)
    }
}

function Nt(e) {
    if (Ct.length) {
        const e = [...new Set(Ct)];
        if (Ct.length = 0, At) return void At.push(...e);
        for (At = e, At.sort(((e, t) => Mt(e) - Mt(t))), St = 0; St < At.length; St++) At[St]();
        At = null, St = 0
    }
}
const Mt = e => null == e.id ? 1 / 0 : e.id;

function $t(e) {
    vt = !1, bt = !0, Dt(e), xt.sort(((e, t) => Mt(e) - Mt(t)));
    try {
        for (yt = 0; yt < xt.length; yt++) {
            const e = xt[yt];
            e && ht(e, null, 14)
        }
    } finally {
        yt = 0, xt.length = 0, Nt(), bt = !1, Tt = null, (xt.length || Ct.length) && $t(e)
    }
}

function Vt(e, t, ...n) {
    const a = e.vnode.props || v;
    let l = n;
    const s = t.startsWith("update:"),
        o = s && t.slice(7);
    if (o && o in a) {
        const e = `${"modelValue"===o?"model":o}Modifiers`,
            {
                number: t,
                trim: s
            } = a[e] || v;
        s ? l = n.map((e => e.trim())) : t && (l = n.map(Z))
    }
    let r = J(q(t)),
        i = a[r];
    !i && s && (r = J(W(t)), i = a[r]), i && mt(i, e, 6, l);
    const c = a[r + "Once"];
    if (c) {
        if (e.emitted) {
            if (e.emitted[r]) return
        } else(e.emitted = {})[r] = !0;
        mt(c, e, 6, l)
    }
}

function Ut(e, t, n = !1) {
    if (!t.deopt && void 0 !== e.__emits) return e.__emits;
    const a = e.emits;
    let l = {},
        s = !1;
    if (!O(e)) {
        const a = e => {
            s = !0, A(l, Ut(e, t, !0))
        };
        !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
    }
    return a || s ? (E(a) ? a.forEach((e => l[e] = null)) : A(l, a), e.__emits = l) : e.__emits = null
}

function jt(e, t) {
    return !(!e || !_(t)) && (t = t.slice(2).replace(/Once$/, ""), T(e, t[0].toLowerCase() + t.slice(1)) || T(e, W(t)) || T(e, t))
}
let Ft = null;

function Bt(e) {
    Ft = e
}

function Ht(e) {
    const {
        type: t,
        vnode: n,
        proxy: a,
        withProxy: l,
        props: s,
        propsOptions: [o],
        slots: r,
        attrs: i,
        emit: c,
        render: u,
        renderCache: d,
        data: p,
        setupState: f,
        ctx: h
    } = e;
    let m;
    Ft = e;
    try {
        let e;
        if (4 & n.shapeFlag) {
            const t = l || a;
            m = Da(u.call(t, t, d, s, f, p, h)), e = i
        } else {
            const n = t;
            0, m = Da(n.length > 1 ? n(s, {
                attrs: i,
                slots: r,
                emit: c
            }) : n(s, null)), e = t.props ? i : qt(i)
        }
        let g = m;
        if (!1 !== t.inheritAttrs && e) {
            const t = Object.keys(e),
                {
                    shapeFlag: n
                } = g;
            t.length && (1 & n || 6 & n) && (o && t.some(C) && (e = zt(e, o)), g = Ra(g, e))
        }
        n.dirs && (g.dirs = g.dirs ? g.dirs.concat(n.dirs) : n.dirs), n.transition && (g.transition = n.transition), m = g
    } catch (g) {
        gt(g, e, 1), m = Ea(ba)
    }
    return Ft = null, m
}

function Gt(e) {
    let t;
    for (let n = 0; n < e.length; n++) {
        const a = e[n];
        if (!Ca(a)) return;
        if (a.type !== ba || "v-if" === a.children) {
            if (t) return;
            t = a
        }
    }
    return t
}
const qt = e => {
        let t;
        for (const n in e)("class" === n || "style" === n || _(n)) && ((t || (t = {}))[n] = e[n]);
        return t
    },
    zt = (e, t) => {
        const n = {};
        for (const a in e) C(a) && a.slice(9) in t || (n[a] = e[a]);
        return n
    };

function Wt(e, t, n) {
    const a = Object.keys(t);
    if (a.length !== Object.keys(e).length) return !0;
    for (let l = 0; l < a.length; l++) {
        const s = a[l];
        if (t[s] !== e[s] && !jt(n, s)) return !0
    }
    return !1
}

function Kt(e) {
    if (O(e) && (e = e()), E(e)) {
        e = Gt(e)
    }
    return Da(e)
}
let Jt = 0;
const Xt = e => Jt += e;

function Yt(e, t, n = {}, a) {
    let l = e[t];
    Jt++, ka();
    const s = l && Qt(l(n)),
        o = _a(ma, {
            key: n.key || `_${t}`
        }, s || (a ? a() : []), s && 1 === e._ ? 64 : -2);
    return Jt--, o
}

function Qt(e) {
    return e.some((e => !Ca(e) || e.type !== ba && !(e.type === ma && !Qt(e.children)))) ? e : null
}

function Zt(e, t = Ft) {
    if (!t) return e;
    const n = (...n) => {
        Jt || ka(!0);
        const a = Ft;
        Bt(t);
        const l = e(...n);
        return Bt(a), Jt || wa(), l
    };
    return n._c = !0, n
}
let en = null;
const tn = [];

function nn(e) {
    tn.push(en = e)
}

function an() {
    tn.pop(), en = tn[tn.length - 1] || null
}

function ln(e) {
    return t => Zt((function() {
        nn(e);
        const n = t.apply(this, arguments);
        return an(), n
    }))
}

function sn(e, t, n, a = !1) {
    const l = {},
        s = {};
    Q(s, Sa, 1), on(e, t, l, s), n ? e.props = a ? l : Ze(l, !1, Se, ze) : e.type.props ? e.props = l : e.props = s, e.attrs = s
}

function on(e, t, n, a) {
    const [l, s] = e.propsOptions;
    if (t)
        for (const o in t) {
            const s = t[o];
            if (B(o)) continue;
            let r;
            l && T(l, r = q(o)) ? n[r] = s : jt(e.emitsOptions, o) || (a[o] = s)
        }
    if (s) {
        const t = at(n);
        for (let a = 0; a < s.length; a++) {
            const o = s[a];
            n[o] = rn(l, t, o, t[o], e)
        }
    }
}

function rn(e, t, n, a, l) {
    const s = e[n];
    if (null != s) {
        const e = T(s, "default");
        if (e && void 0 === a) {
            const e = s.default;
            s.type !== Function && O(e) ? (al(l), a = e(t), al(null)) : a = e
        }
        s[0] && (T(t, n) || e ? !s[1] || "" !== a && a !== W(n) || (a = !0) : a = !1)
    }
    return a
}

function cn(e, t, n = !1) {
    if (!t.deopt && e.__props) return e.__props;
    const a = e.props,
        l = {},
        s = [];
    let o = !1;
    if (!O(e)) {
        const a = e => {
            o = !0;
            const [n, a] = cn(e, t, !0);
            A(l, n), a && s.push(...a)
        };
        !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a)
    }
    if (!a && !o) return e.__props = x;
    if (E(a))
        for (let r = 0; r < a.length; r++) {
            const e = q(a[r]);
            un(e) && (l[e] = v)
        } else if (a)
            for (const r in a) {
                const e = q(r);
                if (un(e)) {
                    const t = a[r],
                        n = l[e] = E(t) || O(t) ? {
                            type: t
                        } : t;
                    if (n) {
                        const t = fn(Boolean, n.type),
                            a = fn(String, n.type);
                        n[0] = t > -1, n[1] = a < 0 || t < a, (t > -1 || T(n, "default")) && s.push(e)
                    }
                }
            }
    return e.__props = [l, s]
}

function un(e) {
    return "$" !== e[0]
}

function dn(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : ""
}

function pn(e, t) {
    return dn(e) === dn(t)
}

function fn(e, t) {
    if (E(t)) {
        for (let n = 0, a = t.length; n < a; n++)
            if (pn(t[n], e)) return n
    } else if (O(t)) return pn(t, e) ? 0 : -1;
    return -1
}

function hn(e, t, n = tl, a = !1) {
    if (n) {
        const l = n[e] || (n[e] = []),
            s = t.__weh || (t.__weh = (...a) => {
                if (n.isUnmounted) return;
                de(), al(n);
                const l = mt(t, n, e, a);
                return al(null), pe(), l
            });
        return a ? l.unshift(s) : l.push(s), s
    }
}
const mn = e => (t, n = tl) => !sl && hn(e, t, n),
    gn = mn("bm"),
    bn = mn("m"),
    vn = mn("bu"),
    xn = mn("u"),
    yn = mn("bum"),
    kn = mn("um"),
    wn = mn("rtg"),
    _n = mn("rtc");

function Cn(e, t) {
    return Pn(e, null, t)
}
const An = {};

function Sn(e, t, n) {
    return Pn(e, t, n)
}

function Pn(e, t, {
    immediate: n,
    deep: a,
    flush: l,
    onTrack: s,
    onTrigger: o
} = v, r = tl) {
    let i, c, u = !1;
    if (st(e) ? (i = () => e.value, u = !!e._shallow) : et(e) ? (i = () => e, a = !0) : i = E(e) ? () => e.map((e => st(e) ? e.value : et(e) ? En(e) : O(e) ? ht(e, r, 2, [r && r.proxy]) : void 0)) : O(e) ? t ? () => ht(e, r, 2, [r && r.proxy]) : () => {
            if (!r || !r.isUnmounted) return c && c(), ht(e, r, 3, [d])
        } : y, t && a) {
        const e = i;
        i = () => En(e())
    }
    const d = e => {
        c = m.options.onStop = () => {
            ht(e, r, 4)
        }
    };
    let p = E(e) ? [] : An;
    const f = () => {
        if (m.active)
            if (t) {
                const e = m();
                (a || u || X(e, p)) && (c && c(), mt(t, r, 3, [e, p === An ? void 0 : p, d]), p = e)
            } else m()
    };
    let h;
    f.allowRecurse = !!t, h = "sync" === l ? f : "post" === l ? () => la(f, r && r.suspense) : () => {
        !r || r.isMounted ? function(e) {
            Ot(e, wt, kt, _t)
        }(f) : f()
    };
    const m = se(i, {
        lazy: !0,
        onTrack: s,
        onTrigger: o,
        scheduler: h
    });
    return il(m, r), t ? n ? f() : p = m() : "post" === l ? la(m, r && r.suspense) : m(), () => {
        oe(m), r && S(r.effects, m)
    }
}

function Tn(e, t, n) {
    const a = this.proxy;
    return Pn(D(e) ? () => a[e] : e.bind(a), t.bind(a), n, this)
}

function En(e, t = new Set) {
    if (!M(e) || t.has(e)) return e;
    if (t.add(e), st(e)) En(e.value, t);
    else if (E(e))
        for (let n = 0; n < e.length; n++) En(e[n], t);
    else if (L(e) || R(e)) e.forEach((e => {
        En(e, t)
    }));
    else
        for (const n in e) En(e[n], t);
    return e
}

function Rn() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map
    };
    return bn((() => {
        e.isMounted = !0
    })), yn((() => {
        e.isUnmounting = !0
    })), e
}
const Ln = [Function, Array],
    In = {
        name: "BaseTransition",
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: Ln,
            onEnter: Ln,
            onAfterEnter: Ln,
            onEnterCancelled: Ln,
            onBeforeLeave: Ln,
            onLeave: Ln,
            onAfterLeave: Ln,
            onLeaveCancelled: Ln,
            onBeforeAppear: Ln,
            onAppear: Ln,
            onAfterAppear: Ln,
            onAppearCancelled: Ln
        },
        setup(e, {
            slots: t
        }) {
            const n = nl(),
                a = Rn();
            let l;
            return () => {
                const s = t.default && Vn(t.default(), !0);
                if (!s || !s.length) return;
                const o = at(e),
                    {
                        mode: r
                    } = o,
                    i = s[0];
                if (a.isLeaving) return Nn(i);
                const c = Mn(i);
                if (!c) return Nn(i);
                const u = Dn(c, o, a, n);
                $n(c, u);
                const d = n.subTree,
                    p = d && Mn(d);
                let f = !1;
                const {
                    getTransitionKey: h
                } = c.type;
                if (h) {
                    const e = h();
                    void 0 === l ? l = e : e !== l && (l = e, f = !0)
                }
                if (p && p.type !== ba && (!Aa(c, p) || f)) {
                    const e = Dn(p, o, a, n);
                    if ($n(p, e), "out-in" === r) return a.isLeaving = !0, e.afterLeave = () => {
                        a.isLeaving = !1, n.update()
                    }, Nn(i);
                    "in-out" === r && (e.delayLeave = (e, t, n) => {
                        On(a, p)[String(p.key)] = p, e._leaveCb = () => {
                            t(), e._leaveCb = void 0, delete u.delayedLeave
                        }, u.delayedLeave = n
                    })
                }
                return i
            }
        }
    };

function On(e, t) {
    const {
        leavingVNodes: n
    } = e;
    let a = n.get(t.type);
    return a || (a = Object.create(null), n.set(t.type, a)), a
}

function Dn(e, t, n, a) {
    const {
        appear: l,
        mode: s,
        persisted: o = !1,
        onBeforeEnter: r,
        onEnter: i,
        onAfterEnter: c,
        onEnterCancelled: u,
        onBeforeLeave: d,
        onLeave: p,
        onAfterLeave: f,
        onLeaveCancelled: h,
        onBeforeAppear: m,
        onAppear: g,
        onAfterAppear: b,
        onAppearCancelled: v
    } = t, x = String(e.key), y = On(n, e), k = (e, t) => {
        e && mt(e, a, 9, t)
    }, w = {
        mode: s,
        persisted: o,
        beforeEnter(t) {
            let a = r;
            if (!n.isMounted) {
                if (!l) return;
                a = m || r
            }
            t._leaveCb && t._leaveCb(!0);
            const s = y[x];
            s && Aa(e, s) && s.el._leaveCb && s.el._leaveCb(), k(a, [t])
        },
        enter(e) {
            let t = i,
                a = c,
                s = u;
            if (!n.isMounted) {
                if (!l) return;
                t = g || i, a = b || c, s = v || u
            }
            let o = !1;
            const r = e._enterCb = t => {
                o || (o = !0, k(t ? s : a, [e]), w.delayedLeave && w.delayedLeave(), e._enterCb = void 0)
            };
            t ? (t(e, r), t.length <= 1 && r()) : r()
        },
        leave(t, a) {
            const l = String(e.key);
            if (t._enterCb && t._enterCb(!0), n.isUnmounting) return a();
            k(d, [t]);
            let s = !1;
            const o = t._leaveCb = n => {
                s || (s = !0, a(), k(n ? h : f, [t]), t._leaveCb = void 0, y[l] === e && delete y[l])
            };
            y[l] = e, p ? (p(t, o), p.length <= 1 && o()) : o()
        },
        clone: e => Dn(e, t, n, a)
    };
    return w
}

function Nn(e) {
    if (Un(e)) return (e = Ra(e)).children = null, e
}

function Mn(e) {
    return Un(e) ? e.children ? e.children[0] : void 0 : e
}

function $n(e, t) {
    6 & e.shapeFlag && e.component ? $n(e.component.subTree, t) : 128 & e.shapeFlag ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t
}

function Vn(e, t = !1) {
    let n = [],
        a = 0;
    for (let l = 0; l < e.length; l++) {
        const s = e[l];
        s.type === ma ? (128 & s.patchFlag && a++, n = n.concat(Vn(s.children, t))) : (t || s.type !== ba) && n.push(s)
    }
    if (a > 1)
        for (let l = 0; l < n.length; l++) n[l].patchFlag = -2;
    return n
}
const Un = e => e.type.__isKeepAlive,
    jn = {
        name: "KeepAlive",
        __isKeepAlive: !0,
        props: {
            include: [String, RegExp, Array],
            exclude: [String, RegExp, Array],
            max: [String, Number]
        },
        setup(e, {
            slots: t
        }) {
            const n = new Map,
                a = new Set;
            let l = null;
            const s = nl(),
                o = s.suspense,
                r = s.ctx,
                {
                    renderer: {
                        p: i,
                        m: c,
                        um: u,
                        o: {
                            createElement: d
                        }
                    }
                } = r,
                p = d("div");

            function f(e) {
                Gn(e), u(e, s, o)
            }

            function h(e) {
                n.forEach(((t, n) => {
                    const a = cl(t.type);
                    !a || e && e(a) || m(n)
                }))
            }

            function m(e) {
                const t = n.get(e);
                l && t.type === l.type ? l && Gn(l) : f(t), n.delete(e), a.delete(e)
            }
            r.activate = (e, t, n, a, l) => {
                const s = e.component;
                c(e, t, n, 0, o), i(s.vnode, e, t, n, s, o, a, l), la((() => {
                    s.isDeactivated = !1, s.a && Y(s.a);
                    const t = e.props && e.props.onVnodeMounted;
                    t && ra(t, s.parent, e)
                }), o)
            }, r.deactivate = e => {
                const t = e.component;
                c(e, p, null, 1, o), la((() => {
                    t.da && Y(t.da);
                    const n = e.props && e.props.onVnodeUnmounted;
                    n && ra(n, t.parent, e), t.isDeactivated = !0
                }), o)
            }, Sn((() => [e.include, e.exclude]), (([e, t]) => {
                e && h((t => Fn(e, t))), t && h((e => !Fn(t, e)))
            }), {
                flush: "post",
                deep: !0
            });
            let g = null;
            const b = () => {
                null != g && n.set(g, qn(s.subTree))
            };
            return bn(b), xn(b), yn((() => {
                n.forEach((e => {
                    const {
                        subTree: t,
                        suspense: n
                    } = s, a = qn(t);
                    if (e.type !== a.type) f(e);
                    else {
                        Gn(a);
                        const e = a.component.da;
                        e && la(e, n)
                    }
                }))
            })), () => {
                if (g = null, !t.default) return null;
                const s = t.default(),
                    o = s[0];
                if (s.length > 1) return l = null, s;
                if (!(Ca(o) && (4 & o.shapeFlag || 128 & o.shapeFlag))) return l = null, o;
                let r = qn(o);
                const i = r.type,
                    c = cl(i),
                    {
                        include: u,
                        exclude: d,
                        max: p
                    } = e;
                if (u && (!c || !Fn(u, c)) || d && c && Fn(d, c)) return l = r, o;
                const f = null == r.key ? i : r.key,
                    h = n.get(f);
                return r.el && (r = Ra(r), 128 & o.shapeFlag && (o.ssContent = r)), g = f, h ? (r.el = h.el, r.component = h.component, r.transition && $n(r, r.transition), r.shapeFlag |= 512, a.delete(f), a.add(f)) : (a.add(f), p && a.size > parseInt(p, 10) && m(a.values().next().value)), r.shapeFlag |= 256, l = r, o
            }
        }
    };

function Fn(e, t) {
    return E(e) ? e.some((e => Fn(e, t))) : D(e) ? e.split(",").indexOf(t) > -1 : !!e.test && e.test(t)
}

function Bn(e, t, n = tl) {
    const a = e.__wdc || (e.__wdc = () => {
        let t = n;
        for (; t;) {
            if (t.isDeactivated) return;
            t = t.parent
        }
        e()
    });
    if (hn(t, a, n), n) {
        let e = n.parent;
        for (; e && e.parent;) Un(e.parent.vnode) && Hn(a, t, n, e), e = e.parent
    }
}

function Hn(e, t, n, a) {
    const l = hn(t, e, a, !0);
    kn((() => {
        S(a[t], l)
    }), n)
}

function Gn(e) {
    let t = e.shapeFlag;
    256 & t && (t -= 256), 512 & t && (t -= 512), e.shapeFlag = t
}

function qn(e) {
    return 128 & e.shapeFlag ? e.ssContent : e
}
const zn = e => "_" === e[0] || "$stable" === e,
    Wn = e => E(e) ? e.map(Da) : [Da(e)],
    Kn = (e, t, n) => Zt((e => Wn(t(e))), n),
    Jn = (e, t) => {
        const n = e._ctx;
        for (const a in e) {
            if (zn(a)) continue;
            const l = e[a];
            if (O(l)) t[a] = Kn(0, l, n);
            else if (null != l) {
                const e = Wn(l);
                t[a] = () => e
            }
        }
    },
    Xn = (e, t) => {
        const n = Wn(t);
        e.slots.default = () => n
    };

function Yn(e, t) {
    if (null === Ft) return e;
    const n = Ft.proxy,
        a = e.dirs || (e.dirs = []);
    for (let l = 0; l < t.length; l++) {
        let [e, s, o, r = v] = t[l];
        O(e) && (e = {
            mounted: e,
            updated: e
        }), a.push({
            dir: e,
            instance: n,
            value: s,
            oldValue: void 0,
            arg: o,
            modifiers: r
        })
    }
    return e
}

function Qn(e, t, n, a) {
    const l = e.dirs,
        s = t && t.dirs;
    for (let o = 0; o < l.length; o++) {
        const r = l[o];
        s && (r.oldValue = s[o].value);
        const i = r.dir[a];
        i && mt(i, n, 8, [e.el, r, e, t])
    }
}

function Zn() {
    return {
        app: null,
        config: {
            isNativeTag: k,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            isCustomElement: k,
            errorHandler: void 0,
            warnHandler: void 0
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null)
    }
}
let ea = 0;

function ta(e, t) {
    return function(n, a = null) {
        null == a || M(a) || (a = null);
        const l = Zn(),
            s = new Set;
        let o = !1;
        const r = l.app = {
            _uid: ea++,
            _component: n,
            _props: a,
            _container: null,
            _context: l,
            version: fl,
            get config() {
                return l.config
            },
            set config(e) {},
            use: (e, ...t) => (s.has(e) || (e && O(e.install) ? (s.add(e), e.install(r, ...t)) : O(e) && (s.add(e), e(r, ...t))), r),
            mixin: e => (l.mixins.includes(e) || (l.mixins.push(e), (e.props || e.emits) && (l.deopt = !0)), r),
            component: (e, t) => t ? (l.components[e] = t, r) : l.components[e],
            directive: (e, t) => t ? (l.directives[e] = t, r) : l.directives[e],
            mount(s, i) {
                if (!o) {
                    const c = Ea(n, a);
                    return c.appContext = l, i && t ? t(c, s) : e(c, s), o = !0, r._container = s, s.__vue_app__ = r, c.component.proxy
                }
            },
            unmount() {
                o && (e(null, r._container), delete r._container.__vue_app__)
            },
            provide: (e, t) => (l.provides[e] = t, r)
        };
        return r
    }
}

function na(e) {
    return O(e) ? {
        setup: e,
        name: e.name
    } : e
}
const aa = {
        scheduler: Lt,
        allowRecurse: !0
    },
    la = function(e, t) {
        t && t.pendingBranch ? E(e) ? t.effects.push(...e) : t.effects.push(e) : Ot(e, At, Ct, St)
    },
    sa = (e, t, n, a) => {
        if (E(e)) return void e.forEach(((e, l) => sa(e, t && (E(t) ? t[l] : t), n, a)));
        let l;
        l = !a || a.type.__asyncLoader ? null : 4 & a.shapeFlag ? a.component.exposed || a.component.proxy : a.el;
        const {
            i: s,
            r: o
        } = e, r = t && t.r, i = s.refs === v ? s.refs = {} : s.refs, c = s.setupState;
        if (null != r && r !== o && (D(r) ? (i[r] = null, T(c, r) && (c[r] = null)) : st(r) && (r.value = null)), D(o)) {
            const e = () => {
                i[o] = l, T(c, o) && (c[o] = l)
            };
            l ? (e.id = -1, la(e, n)) : e()
        } else if (st(o)) {
            const e = () => {
                o.value = l
            };
            l ? (e.id = -1, la(e, n)) : e()
        } else O(o) && ht(o, s, 12, [l, i])
    };

function oa(e) {
    return function(e, t) {
        const {
            insert: n,
            remove: a,
            patchProp: l,
            forcePatchProp: s,
            createElement: o,
            createText: r,
            createComment: i,
            setText: c,
            setElementText: u,
            parentNode: d,
            nextSibling: p,
            setScopeId: f = y,
            cloneNode: h,
            insertStaticContent: m
        } = e, g = (e, t, n, a = null, l = null, s = null, o = !1, r = !1) => {
            e && !Aa(e, t) && (a = te(e), K(e, l, s, !0), e = null), -2 === t.patchFlag && (r = !1, t.dynamicChildren = null);
            const {
                type: i,
                ref: c,
                shapeFlag: u
            } = t;
            switch (i) {
                case ga:
                    b(e, t, n, a);
                    break;
                case ba:
                    k(e, t, n, a);
                    break;
                case va:
                    null == e && w(t, n, a, o);
                    break;
                case ma:
                    D(e, t, n, a, l, s, o, r);
                    break;
                default:
                    1 & u ? S(e, t, n, a, l, s, o, r) : 6 & u ? N(e, t, n, a, l, s, o, r) : (64 & u || 128 & u) && i.process(e, t, n, a, l, s, o, r, ae)
            }
            null != c && l && sa(c, e && e.ref, s, t)
        }, b = (e, t, a, l) => {
            if (null == e) n(t.el = r(t.children), a, l);
            else {
                const n = t.el = e.el;
                t.children !== e.children && c(n, t.children)
            }
        }, k = (e, t, a, l) => {
            null == e ? n(t.el = i(t.children || ""), a, l) : t.el = e.el
        }, w = (e, t, n, a) => {
            [e.el, e.anchor] = m(e.children, t, n, a)
        }, _ = ({
            el: e,
            anchor: t
        }, a, l) => {
            let s;
            for (; e && e !== t;) s = p(e), n(e, a, l), e = s;
            n(t, a, l)
        }, C = ({
            el: e,
            anchor: t
        }) => {
            let n;
            for (; e && e !== t;) n = p(e), a(e), e = n;
            a(t)
        }, S = (e, t, n, a, l, s, o, r) => {
            o = o || "svg" === t.type, null == e ? P(t, n, a, l, s, o, r) : L(e, t, l, s, o, r)
        }, P = (e, t, a, s, r, i, c) => {
            let d, p;
            const {
                type: f,
                props: m,
                shapeFlag: g,
                transition: b,
                scopeId: v,
                patchFlag: x,
                dirs: y
            } = e;
            if (e.el && void 0 !== h && -1 === x) d = e.el = h(e.el);
            else {
                if (d = e.el = o(e.type, i, m && m.is), 8 & g ? u(d, e.children) : 16 & g && R(e.children, d, null, s, r, i && "foreignObject" !== f, c || !!e.dynamicChildren), y && Qn(e, null, s, "created"), m) {
                    for (const t in m) B(t) || l(d, t, null, m[t], i, e.children, s, r, ee);
                    (p = m.onVnodeBeforeMount) && ra(p, s, e)
                }
                E(d, v, e, s)
            }
            y && Qn(e, null, s, "beforeMount");
            const k = (!r || r && !r.pendingBranch) && b && !b.persisted;
            k && b.beforeEnter(d), n(d, t, a), ((p = m && m.onVnodeMounted) || k || y) && la((() => {
                p && ra(p, s, e), k && b.enter(d), y && Qn(e, null, s, "mounted")
            }), r)
        }, E = (e, t, n, a) => {
            if (t && f(e, t), a) {
                const l = a.type.__scopeId;
                l && l !== t && f(e, l + "-s"), n === a.subTree && E(e, a.vnode.scopeId, a.vnode, a.parent)
            }
        }, R = (e, t, n, a, l, s, o, r = 0) => {
            for (let i = r; i < e.length; i++) {
                const r = e[i] = o ? Na(e[i]) : Da(e[i]);
                g(null, r, t, n, a, l, s, o)
            }
        }, L = (e, t, n, a, o, r) => {
            const i = t.el = e.el;
            let {
                patchFlag: c,
                dynamicChildren: d,
                dirs: p
            } = t;
            c |= 16 & e.patchFlag;
            const f = e.props || v,
                h = t.props || v;
            let m;
            if ((m = h.onVnodeBeforeUpdate) && ra(m, n, t, e), p && Qn(t, e, n, "beforeUpdate"), c > 0) {
                if (16 & c) O(i, t, f, h, n, a, o);
                else if (2 & c && f.class !== h.class && l(i, "class", null, h.class, o), 4 & c && l(i, "style", f.style, h.style, o), 8 & c) {
                    const r = t.dynamicProps;
                    for (let t = 0; t < r.length; t++) {
                        const c = r[t],
                            u = f[c],
                            d = h[c];
                        (d !== u || s && s(i, c)) && l(i, c, u, d, o, e.children, n, a, ee)
                    }
                }
                1 & c && e.children !== t.children && u(i, t.children)
            } else r || null != d || O(i, t, f, h, n, a, o);
            const g = o && "foreignObject" !== t.type;
            d ? I(e.dynamicChildren, d, i, n, a, g) : r || F(e, t, i, null, n, a, g), ((m = h.onVnodeUpdated) || p) && la((() => {
                m && ra(m, n, t, e), p && Qn(t, e, n, "updated")
            }), a)
        }, I = (e, t, n, a, l, s) => {
            for (let o = 0; o < t.length; o++) {
                const r = e[o],
                    i = t[o],
                    c = r.type === ma || !Aa(r, i) || 6 & r.shapeFlag || 64 & r.shapeFlag ? d(r.el) : n;
                g(r, i, c, null, a, l, s, !0)
            }
        }, O = (e, t, n, a, o, r, i) => {
            if (n !== a) {
                for (const c in a) {
                    if (B(c)) continue;
                    const u = a[c],
                        d = n[c];
                    (u !== d || s && s(e, c)) && l(e, c, d, u, i, t.children, o, r, ee)
                }
                if (n !== v)
                    for (const s in n) B(s) || s in a || l(e, s, n[s], null, i, t.children, o, r, ee)
            }
        }, D = (e, t, a, l, s, o, i, c) => {
            const u = t.el = e ? e.el : r(""),
                d = t.anchor = e ? e.anchor : r("");
            let {
                patchFlag: p,
                dynamicChildren: f
            } = t;
            p > 0 && (c = !0), null == e ? (n(u, a, l), n(d, a, l), R(t.children, a, d, s, o, i, c)) : p > 0 && 64 & p && f && e.dynamicChildren ? (I(e.dynamicChildren, f, a, s, o, i), (null != t.key || s && t === s.subTree) && ia(e, t, !0)) : F(e, t, a, d, s, o, i, c)
        }, N = (e, t, n, a, l, s, o, r) => {
            null == e ? 512 & t.shapeFlag ? l.ctx.activate(t, n, a, o, r) : M(t, n, a, l, s, o, r) : V(e, t, r)
        }, M = (e, t, n, a, l, s, o) => {
            const r = e.component = function(e, t, n) {
                const a = e.type,
                    l = (t ? t.appContext : e.appContext) || Za,
                    s = {
                        uid: el++,
                        vnode: e,
                        type: a,
                        parent: t,
                        appContext: l,
                        root: null,
                        next: null,
                        subTree: null,
                        update: null,
                        render: null,
                        proxy: null,
                        exposed: null,
                        withProxy: null,
                        effects: null,
                        provides: t ? t.provides : Object.create(l.provides),
                        accessCache: null,
                        renderCache: [],
                        components: null,
                        directives: null,
                        propsOptions: cn(a, l),
                        emitsOptions: Ut(a, l),
                        emit: null,
                        emitted: null,
                        ctx: v,
                        data: v,
                        props: v,
                        attrs: v,
                        slots: v,
                        refs: v,
                        setupState: v,
                        setupContext: null,
                        suspense: n,
                        suspenseId: n ? n.pendingId : 0,
                        asyncDep: null,
                        asyncResolved: !1,
                        isMounted: !1,
                        isUnmounted: !1,
                        isDeactivated: !1,
                        bc: null,
                        c: null,
                        bm: null,
                        m: null,
                        bu: null,
                        u: null,
                        um: null,
                        bum: null,
                        da: null,
                        a: null,
                        rtg: null,
                        rtc: null,
                        ec: null
                    };
                return s.ctx = {
                    _: s
                }, s.root = t ? t.root : s, s.emit = Vt.bind(null, s), s
            }(e, a, l);
            if (Un(e) && (r.ctx.renderer = ae), function(e, t = !1) {
                    sl = t;
                    const {
                        props: n,
                        children: a
                    } = e.vnode, l = ll(e);
                    sn(e, n, l, t), ((e, t) => {
                        if (32 & e.vnode.shapeFlag) {
                            const n = t._;
                            n ? (e.slots = t, Q(t, "_", n)) : Jn(t, e.slots = {})
                        } else e.slots = {}, t && Xn(e, t);
                        Q(e.slots, Sa, 1)
                    })(e, a);
                    const s = l ? function(e, t) {
                        const n = e.type;
                        e.accessCache = Object.create(null), e.proxy = new Proxy(e.ctx, Ya);
                        const {
                            setup: a
                        } = n;
                        if (a) {
                            const n = e.setupContext = a.length > 1 ? function(e) {
                                const t = t => {
                                    e.exposed = dt(t)
                                };
                                return {
                                    attrs: e.attrs,
                                    slots: e.slots,
                                    emit: e.emit,
                                    expose: t
                                }
                            }(e) : null;
                            tl = e, de();
                            const l = ht(a, e, 0, [e.props, n]);
                            if (pe(), tl = null, $(l)) {
                                if (t) return l.then((t => {
                                    ol(e, t)
                                }));
                                e.asyncDep = l
                            } else ol(e, l)
                        } else rl(e)
                    }(e, t) : void 0;
                    sl = !1
                }(r), r.asyncDep) {
                if (l && l.registerDep(r, U), !e.el) {
                    const e = r.subTree = Ea(ba);
                    k(null, e, t, n)
                }
            } else U(r, e, t, n, l, s, o)
        }, V = (e, t, n) => {
            const a = t.component = e.component;
            if (function(e, t, n) {
                    const {
                        props: a,
                        children: l,
                        component: s
                    } = e, {
                        props: o,
                        children: r,
                        patchFlag: i
                    } = t, c = s.emitsOptions;
                    if (t.dirs || t.transition) return !0;
                    if (!(n && i >= 0)) return !(!l && !r || r && r.$stable) || a !== o && (a ? !o || Wt(a, o, c) : !!o);
                    if (1024 & i) return !0;
                    if (16 & i) return a ? Wt(a, o, c) : !!o;
                    if (8 & i) {
                        const e = t.dynamicProps;
                        for (let t = 0; t < e.length; t++) {
                            const n = e[t];
                            if (o[n] !== a[n] && !jt(c, n)) return !0
                        }
                    }
                    return !1
                }(e, t, n)) {
                if (a.asyncDep && !a.asyncResolved) return void j(a, t, n);
                a.next = t,
                    function(e) {
                        const t = xt.indexOf(e);
                        t > -1 && xt.splice(t, 1)
                    }(a.update), a.update()
            } else t.component = e.component, t.el = e.el, a.vnode = t
        }, U = (e, t, n, a, l, s, o) => {
            e.update = se((function() {
                if (e.isMounted) {
                    let t, {
                            next: n,
                            bu: a,
                            u: r,
                            parent: i,
                            vnode: c
                        } = e,
                        u = n;
                    n ? (n.el = c.el, j(e, n, o)) : n = c, a && Y(a), (t = n.props && n.props.onVnodeBeforeUpdate) && ra(t, i, n, c);
                    const p = Ht(e),
                        f = e.subTree;
                    e.subTree = p, g(f, p, d(f.el), te(f), e, l, s), n.el = p.el, null === u && function({
                        vnode: e,
                        parent: t
                    }, n) {
                        for (; t && t.subTree === e;)(e = t.vnode).el = n, t = t.parent
                    }(e, p.el), r && la(r, l), (t = n.props && n.props.onVnodeUpdated) && la((() => {
                        ra(t, i, n, c)
                    }), l)
                } else {
                    let o;
                    const {
                        el: r,
                        props: i
                    } = t, {
                        bm: c,
                        m: u,
                        parent: d
                    } = e;
                    c && Y(c), (o = i && i.onVnodeBeforeMount) && ra(o, d, t);
                    const p = e.subTree = Ht(e);
                    if (r && re ? re(t.el, p, e, l) : (g(null, p, n, a, e, l, s), t.el = p.el), u && la(u, l), o = i && i.onVnodeMounted) {
                        const e = t;
                        la((() => {
                            ra(o, d, e)
                        }), l)
                    }
                    const {
                        a: f
                    } = e;
                    f && 256 & t.shapeFlag && la(f, l), e.isMounted = !0, t = n = a = null
                }
            }), aa)
        }, j = (e, t, n) => {
            t.component = e;
            const a = e.vnode.props;
            e.vnode = t, e.next = null,
                function(e, t, n, a) {
                    const {
                        props: l,
                        attrs: s,
                        vnode: {
                            patchFlag: o
                        }
                    } = e, r = at(l), [i] = e.propsOptions;
                    if (!(a || o > 0) || 16 & o) {
                        let a;
                        on(e, t, l, s);
                        for (const s in r) t && (T(t, s) || (a = W(s)) !== s && T(t, a)) || (i ? !n || void 0 === n[s] && void 0 === n[a] || (l[s] = rn(i, t || v, s, void 0, e)) : delete l[s]);
                        if (s !== r)
                            for (const e in s) t && T(t, e) || delete s[e]
                    } else if (8 & o) {
                        const n = e.vnode.dynamicProps;
                        for (let a = 0; a < n.length; a++) {
                            const o = n[a],
                                c = t[o];
                            if (i)
                                if (T(s, o)) s[o] = c;
                                else {
                                    const t = q(o);
                                    l[t] = rn(i, r, t, c, e)
                                }
                            else s[o] = c
                        }
                    }
                    he(e, "set", "$attrs")
                }(e, t.props, a, n), ((e, t) => {
                    const {
                        vnode: n,
                        slots: a
                    } = e;
                    let l = !0,
                        s = v;
                    if (32 & n.shapeFlag) {
                        const e = t._;
                        e ? 1 === e ? l = !1 : A(a, t) : (l = !t.$stable, Jn(t, a)), s = t
                    } else t && (Xn(e, t), s = {
                        default: 1
                    });
                    if (l)
                        for (const o in a) zn(o) || o in s || delete a[o]
                })(e, t.children), Dt(void 0, e.update)
        }, F = (e, t, n, a, l, s, o, r = !1) => {
            const i = e && e.children,
                c = e ? e.shapeFlag : 0,
                d = t.children,
                {
                    patchFlag: p,
                    shapeFlag: f
                } = t;
            if (p > 0) {
                if (128 & p) return void G(i, d, n, a, l, s, o, r);
                if (256 & p) return void H(i, d, n, a, l, s, o, r)
            }
            8 & f ? (16 & c && ee(i, l, s), d !== i && u(n, d)) : 16 & c ? 16 & f ? G(i, d, n, a, l, s, o, r) : ee(i, l, s, !0) : (8 & c && u(n, ""), 16 & f && R(d, n, a, l, s, o, r))
        }, H = (e, t, n, a, l, s, o, r) => {
            t = t || x;
            const i = (e = e || x).length,
                c = t.length,
                u = Math.min(i, c);
            let d;
            for (d = 0; d < u; d++) {
                const a = t[d] = r ? Na(t[d]) : Da(t[d]);
                g(e[d], a, n, null, l, s, o, r)
            }
            i > c ? ee(e, l, s, !0, !1, u) : R(t, n, a, l, s, o, r, u)
        }, G = (e, t, n, a, l, s, o, r) => {
            let i = 0;
            const c = t.length;
            let u = e.length - 1,
                d = c - 1;
            for (; i <= u && i <= d;) {
                const a = e[i],
                    c = t[i] = r ? Na(t[i]) : Da(t[i]);
                if (!Aa(a, c)) break;
                g(a, c, n, null, l, s, o, r), i++
            }
            for (; i <= u && i <= d;) {
                const a = e[u],
                    i = t[d] = r ? Na(t[d]) : Da(t[d]);
                if (!Aa(a, i)) break;
                g(a, i, n, null, l, s, o, r), u--, d--
            }
            if (i > u) {
                if (i <= d) {
                    const e = d + 1,
                        u = e < c ? t[e].el : a;
                    for (; i <= d;) g(null, t[i] = r ? Na(t[i]) : Da(t[i]), n, u, l, s, o), i++
                }
            } else if (i > d)
                for (; i <= u;) K(e[i], l, s, !0), i++;
            else {
                const p = i,
                    f = i,
                    h = new Map;
                for (i = f; i <= d; i++) {
                    const e = t[i] = r ? Na(t[i]) : Da(t[i]);
                    null != e.key && h.set(e.key, i)
                }
                let m, b = 0;
                const v = d - f + 1;
                let y = !1,
                    k = 0;
                const w = new Array(v);
                for (i = 0; i < v; i++) w[i] = 0;
                for (i = p; i <= u; i++) {
                    const a = e[i];
                    if (b >= v) {
                        K(a, l, s, !0);
                        continue
                    }
                    let c;
                    if (null != a.key) c = h.get(a.key);
                    else
                        for (m = f; m <= d; m++)
                            if (0 === w[m - f] && Aa(a, t[m])) {
                                c = m;
                                break
                            } void 0 === c ? K(a, l, s, !0) : (w[c - f] = i + 1, c >= k ? k = c : y = !0, g(a, t[c], n, null, l, s, o, r), b++)
                }
                const _ = y ? function(e) {
                    const t = e.slice(),
                        n = [0];
                    let a, l, s, o, r;
                    const i = e.length;
                    for (a = 0; a < i; a++) {
                        const i = e[a];
                        if (0 !== i) {
                            if (l = n[n.length - 1], e[l] < i) {
                                t[a] = l, n.push(a);
                                continue
                            }
                            for (s = 0, o = n.length - 1; s < o;) r = (s + o) / 2 | 0, e[n[r]] < i ? s = r + 1 : o = r;
                            i < e[n[s]] && (s > 0 && (t[a] = n[s - 1]), n[s] = a)
                        }
                    }
                    s = n.length, o = n[s - 1];
                    for (; s-- > 0;) n[s] = o, o = t[o];
                    return n
                }(w) : x;
                for (m = _.length - 1, i = v - 1; i >= 0; i--) {
                    const e = f + i,
                        r = t[e],
                        u = e + 1 < c ? t[e + 1].el : a;
                    0 === w[i] ? g(null, r, n, u, l, s, o) : y && (m < 0 || i !== _[m] ? z(r, n, u, 2) : m--)
                }
            }
        }, z = (e, t, a, l, s = null) => {
            const {
                el: o,
                type: r,
                transition: i,
                children: c,
                shapeFlag: u
            } = e;
            if (6 & u) return void z(e.component.subTree, t, a, l);
            if (128 & u) return void e.suspense.move(t, a, l);
            if (64 & u) return void r.move(e, t, a, ae);
            if (r === ma) {
                n(o, t, a);
                for (let e = 0; e < c.length; e++) z(c[e], t, a, l);
                return void n(e.anchor, t, a)
            }
            if (r === va) return void _(e, t, a);
            if (2 !== l && 1 & u && i)
                if (0 === l) i.beforeEnter(o), n(o, t, a), la((() => i.enter(o)), s);
                else {
                    const {
                        leave: e,
                        delayLeave: l,
                        afterLeave: s
                    } = i, r = () => n(o, t, a), c = () => {
                        e(o, (() => {
                            r(), s && s()
                        }))
                    };
                    l ? l(o, r, c) : c()
                }
            else n(o, t, a)
        }, K = (e, t, n, a = !1, l = !1) => {
            const {
                type: s,
                props: o,
                ref: r,
                children: i,
                dynamicChildren: c,
                shapeFlag: u,
                patchFlag: d,
                dirs: p
            } = e;
            if (null != r && sa(r, null, n, null), 256 & u) return void t.ctx.deactivate(e);
            const f = 1 & u && p;
            let h;
            if ((h = o && o.onVnodeBeforeUnmount) && ra(h, t, e), 6 & u) Z(e.component, n, a);
            else {
                if (128 & u) return void e.suspense.unmount(n, a);
                f && Qn(e, null, t, "beforeUnmount"), c && (s !== ma || d > 0 && 64 & d) ? ee(c, t, n, !1, !0) : (s === ma && (128 & d || 256 & d) || !l && 16 & u) && ee(i, t, n), 64 & u && (a || !ca(e.props)) && e.type.remove(e, ae), a && J(e)
            }((h = o && o.onVnodeUnmounted) || f) && la((() => {
                h && ra(h, t, e), f && Qn(e, null, t, "unmounted")
            }), n)
        }, J = e => {
            const {
                type: t,
                el: n,
                anchor: l,
                transition: s
            } = e;
            if (t === ma) return void X(n, l);
            if (t === va) return void C(e);
            const o = () => {
                a(n), s && !s.persisted && s.afterLeave && s.afterLeave()
            };
            if (1 & e.shapeFlag && s && !s.persisted) {
                const {
                    leave: t,
                    delayLeave: a
                } = s, l = () => t(n, o);
                a ? a(e.el, o, l) : l()
            } else o()
        }, X = (e, t) => {
            let n;
            for (; e !== t;) n = p(e), a(e), e = n;
            a(t)
        }, Z = (e, t, n) => {
            const {
                bum: a,
                effects: l,
                update: s,
                subTree: o,
                um: r
            } = e;
            if (a && Y(a), l)
                for (let i = 0; i < l.length; i++) oe(l[i]);
            s && (oe(s), K(o, e, t, n)), r && la(r, t), la((() => {
                e.isUnmounted = !0
            }), t), t && t.pendingBranch && !t.isUnmounted && e.asyncDep && !e.asyncResolved && e.suspenseId === t.pendingId && (t.deps--, 0 === t.deps && t.resolve())
        }, ee = (e, t, n, a = !1, l = !1, s = 0) => {
            for (let o = s; o < e.length; o++) K(e[o], t, n, a, l)
        }, te = e => 6 & e.shapeFlag ? te(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : p(e.anchor || e.el), ne = (e, t) => {
            null == e ? t._vnode && K(t._vnode, null, null, !0) : g(t._vnode || null, e, t), Nt(), t._vnode = e
        }, ae = {
            p: g,
            um: K,
            m: z,
            r: J,
            mt: M,
            mc: R,
            pc: F,
            pbc: I,
            n: te,
            o: e
        };
        let le, re;
        t && ([le, re] = t(ae));
        return {
            render: ne,
            hydrate: le,
            createApp: ta(ne, le)
        }
    }(e)
}

function ra(e, t, n, a = null) {
    mt(e, t, 7, [n, a])
}

function ia(e, t, n = !1) {
    const a = e.children,
        l = t.children;
    if (E(a) && E(l))
        for (let s = 0; s < a.length; s++) {
            const e = a[s];
            let t = l[s];
            1 & t.shapeFlag && !t.dynamicChildren && ((t.patchFlag <= 0 || 32 === t.patchFlag) && (t = l[s] = Na(l[s]), t.el = e.el), n || ia(e, t))
        }
}
const ca = e => e && (e.disabled || "" === e.disabled);

function ua(e) {
    return fa("components", e) || e
}
const da = Symbol();

function pa(e) {
    return D(e) ? fa("components", e, !1) || e : e || da
}

function fa(e, t, n = !0) {
    const a = Ft || tl;
    if (a) {
        const n = a.type;
        if ("components" === e) {
            if ("_self" === t) return n;
            const e = cl(n);
            if (e && (e === t || e === q(t) || e === K(q(t)))) return n
        }
        return ha(a[e] || n[e], t) || ha(a.appContext[e], t)
    }
}

function ha(e, t) {
    return e && (e[t] || e[q(t)] || e[K(q(t))])
}
const ma = Symbol(void 0),
    ga = Symbol(void 0),
    ba = Symbol(void 0),
    va = Symbol(void 0),
    xa = [];
let ya = null;

function ka(e = !1) {
    xa.push(ya = e ? null : [])
}

function wa() {
    xa.pop(), ya = xa[xa.length - 1] || null
}

function _a(e, t, n, a, l) {
    const s = Ea(e, t, n, a, l, !0);
    return s.dynamicChildren = ya || x, wa(), ya && ya.push(s), s
}

function Ca(e) {
    return !!e && !0 === e.__v_isVNode
}

function Aa(e, t) {
    return e.type === t.type && e.key === t.key
}
const Sa = "__vInternal",
    Pa = ({
        key: e
    }) => null != e ? e : null,
    Ta = ({
        ref: e
    }) => null != e ? D(e) || st(e) || O(e) ? {
        i: Ft,
        r: e
    } : e : null,
    Ea = function(e, t = null, n = null, a = 0, l = null, s = !1) {
        e && e !== da || (e = ba);
        if (Ca(e)) {
            const a = Ra(e, t, !0);
            return n && Ma(a, n), a
        }
        o = e, O(o) && "__vccOpts" in o && (e = e.__vccOpts);
        var o;
        if (t) {
            (nt(t) || Sa in t) && (t = A({}, t));
            let {
                class: e,
                style: n
            } = t;
            e && !D(e) && (t.class = f(e)), M(n) && (nt(n) && !E(n) && (n = A({}, n)), t.style = c(n))
        }
        const r = D(e) ? 1 : (e => e.__isSuspense)(e) ? 128 : (e => e.__isTeleport)(e) ? 64 : M(e) ? 4 : O(e) ? 2 : 0,
            i = {
                __v_isVNode: !0,
                __v_skip: !0,
                type: e,
                props: t,
                key: t && Pa(t),
                ref: t && Ta(t),
                scopeId: en,
                children: null,
                component: null,
                suspense: null,
                ssContent: null,
                ssFallback: null,
                dirs: null,
                transition: null,
                el: null,
                anchor: null,
                target: null,
                targetAnchor: null,
                staticCount: 0,
                shapeFlag: r,
                patchFlag: a,
                dynamicProps: l,
                dynamicChildren: null,
                appContext: null
            };
        if (Ma(i, n), 128 & r) {
            const {
                content: e,
                fallback: t
            } = function(e) {
                const {
                    shapeFlag: t,
                    children: n
                } = e;
                let a, l;
                return 32 & t ? (a = Kt(n.default), l = Kt(n.fallback)) : (a = Kt(n), l = Da(null)), {
                    content: a,
                    fallback: l
                }
            }(i);
            i.ssContent = e, i.ssFallback = t
        }!s && ya && (a > 0 || 6 & r) && 32 !== a && ya.push(i);
        return i
    };

function Ra(e, t, n = !1) {
    const {
        props: a,
        ref: l,
        patchFlag: s,
        children: o
    } = e, r = t ? $a(a || {}, t) : a;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: r,
        key: r && Pa(r),
        ref: t && t.ref ? n && l ? E(l) ? l.concat(Ta(t)) : [l, Ta(t)] : Ta(t) : l,
        scopeId: e.scopeId,
        children: o,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== ma ? -1 === s ? 16 : 16 | s : s,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Ra(e.ssContent),
        ssFallback: e.ssFallback && Ra(e.ssFallback),
        el: e.el,
        anchor: e.anchor
    }
}

function La(e = " ", t = 0) {
    return Ea(ga, null, e, t)
}

function Ia(e, t) {
    const n = Ea(va, null, e);
    return n.staticCount = t, n
}

function Oa(e = "", t = !1) {
    return t ? (ka(), _a(ba, null, e)) : Ea(ba, null, e)
}

function Da(e) {
    return null == e || "boolean" == typeof e ? Ea(ba) : E(e) ? Ea(ma, null, e) : "object" == typeof e ? null === e.el ? e : Ra(e) : Ea(ga, null, String(e))
}

function Na(e) {
    return null === e.el ? e : Ra(e)
}

function Ma(e, t) {
    let n = 0;
    const {
        shapeFlag: a
    } = e;
    if (null == t) t = null;
    else if (E(t)) n = 16;
    else if ("object" == typeof t) {
        if (1 & a || 64 & a) {
            const n = t.default;
            return void(n && (n._c && Xt(1), Ma(e, n()), n._c && Xt(-1)))
        } {
            n = 32;
            const a = t._;
            a || Sa in t ? 3 === a && Ft && (1024 & Ft.vnode.patchFlag ? (t._ = 2, e.patchFlag |= 1024) : t._ = 1) : t._ctx = Ft
        }
    } else O(t) ? (t = {
        default: t,
        _ctx: Ft
    }, n = 32) : (t = String(t), 64 & a ? (n = 16, t = [La(t)]) : n = 8);
    e.children = t, e.shapeFlag |= n
}

function $a(...e) {
    const t = A({}, e[0]);
    for (let n = 1; n < e.length; n++) {
        const a = e[n];
        for (const e in a)
            if ("class" === e) t.class !== a.class && (t.class = f([t.class, a.class]));
            else if ("style" === e) t.style = c([t.style, a.style]);
        else if (_(e)) {
            const n = t[e],
                l = a[e];
            n !== l && (t[e] = n ? [].concat(n, a[e]) : l)
        } else "" !== e && (t[e] = a[e])
    }
    return t
}

function Va(e, t) {
    if (tl) {
        let n = tl.provides;
        const a = tl.parent && tl.parent.provides;
        a === n && (n = tl.provides = Object.create(a)), n[e] = t
    } else;
}

function Ua(e, t, n = !1) {
    const a = tl || Ft;
    if (a) {
        const l = null == a.parent ? a.vnode.appContext && a.vnode.appContext.provides : a.parent.provides;
        if (l && e in l) return l[e];
        if (arguments.length > 1) return n && O(t) ? t() : t
    }
}
let ja = !1;

function Fa(e, t, n = [], a = [], l = [], s = !1) {
    const {
        mixins: o,
        extends: r,
        data: i,
        computed: c,
        methods: u,
        watch: d,
        provide: p,
        inject: f,
        components: h,
        directives: m,
        beforeMount: g,
        mounted: b,
        beforeUpdate: x,
        updated: k,
        activated: w,
        deactivated: _,
        beforeDestroy: C,
        beforeUnmount: S,
        destroyed: P,
        unmounted: T,
        render: R,
        renderTracked: L,
        renderTriggered: I,
        errorCaptured: D,
        expose: N
    } = t, $ = e.proxy, V = e.ctx, U = e.appContext.mixins;
    if (s && R && e.render === y && (e.render = R), s || (ja = !0, Ba("beforeCreate", "bc", t, e, U), ja = !1, qa(e, U, n, a, l)), r && Fa(e, r, n, a, l, !0), o && qa(e, o, n, a, l), f)
        if (E(f))
            for (let v = 0; v < f.length; v++) {
                const e = f[v];
                V[e] = Ua(e)
            } else
                for (const v in f) {
                    const e = f[v];
                    M(e) ? V[v] = Ua(e.from || v, e.default, !0) : V[v] = Ua(e)
                }
    if (u)
        for (const v in u) {
            const e = u[v];
            O(e) && (V[v] = e.bind($))
        }
    if (s ? i && n.push(i) : (n.length && n.forEach((t => za(e, t, $))), i && za(e, i, $)), c)
        for (const v in c) {
            const e = c[v],
                t = ul({
                    get: O(e) ? e.bind($, $) : O(e.get) ? e.get.bind($, $) : y,
                    set: !O(e) && O(e.set) ? e.set.bind($) : y
                });
            Object.defineProperty(V, v, {
                enumerable: !0,
                configurable: !0,
                get: () => t.value,
                set: e => t.value = e
            })
        }
    var j;
    if (d && a.push(d), !s && a.length && a.forEach((e => {
            for (const t in e) Wa(e[t], V, $, t)
        })), p && l.push(p), !s && l.length && l.forEach((e => {
            const t = O(e) ? e.call($) : e;
            Reflect.ownKeys(t).forEach((e => {
                Va(e, t[e])
            }))
        })), s && (h && A(e.components || (e.components = A({}, e.type.components)), h), m && A(e.directives || (e.directives = A({}, e.type.directives)), m)), s || Ba("created", "c", t, e, U), g && gn(g.bind($)), b && bn(b.bind($)), x && vn(x.bind($)), k && xn(k.bind($)), w && Bn(w.bind($), "a", j), _ && function(e, t) {
            Bn(e, "da", t)
        }(_.bind($)), D && ((e, t = tl) => {
            hn("ec", e, t)
        })(D.bind($)), L && _n(L.bind($)), I && wn(I.bind($)), S && yn(S.bind($)), T && kn(T.bind($)), E(N) && !s)
        if (N.length) {
            const t = e.exposed || (e.exposed = dt({}));
            N.forEach((e => {
                t[e] = function(e, t) {
                    return st(e[t]) ? e[t] : new pt(e, t)
                }($, e)
            }))
        } else e.exposed || (e.exposed = v)
}

function Ba(e, t, n, a, l) {
    Ga(e, t, l, a);
    const {
        extends: s,
        mixins: o
    } = n;
    s && Ha(e, t, s, a), o && Ga(e, t, o, a);
    const r = n[e];
    r && mt(r.bind(a.proxy), a, t)
}

function Ha(e, t, n, a) {
    n.extends && Ha(e, t, n.extends, a);
    const l = n[e];
    l && mt(l.bind(a.proxy), a, t)
}

function Ga(e, t, n, a) {
    for (let l = 0; l < n.length; l++) {
        const s = n[l].mixins;
        s && Ga(e, t, s, a);
        const o = n[l][e];
        o && mt(o.bind(a.proxy), a, t)
    }
}

function qa(e, t, n, a, l) {
    for (let s = 0; s < t.length; s++) Fa(e, t[s], n, a, l, !0)
}

function za(e, t, n) {
    const a = t.call(n, n);
    M(a) && (e.data === v ? e.data = Ye(a) : A(e.data, a))
}

function Wa(e, t, n, a) {
    const l = a.includes(".") ? function(e, t) {
        const n = t.split(".");
        return () => {
            let t = e;
            for (let e = 0; e < n.length && t; e++) t = t[n[e]];
            return t
        }
    }(n, a) : () => n[a];
    if (D(e)) {
        const n = t[e];
        O(n) && Sn(l, n)
    } else if (O(e)) Sn(l, e.bind(n));
    else if (M(e))
        if (E(e)) e.forEach((e => Wa(e, t, n, a)));
        else {
            const a = O(e.handler) ? e.handler.bind(n) : t[e.handler];
            O(a) && Sn(l, a, e)
        }
}

function Ka(e, t, n) {
    const a = n.appContext.config.optionMergeStrategies,
        {
            mixins: l,
            extends: s
        } = t;
    s && Ka(e, s, n), l && l.forEach((t => Ka(e, t, n)));
    for (const o in t) a && T(a, o) ? e[o] = a[o](e[o], t[o], n.proxy, o) : e[o] = t[o]
}
const Ja = e => e ? ll(e) ? e.exposed ? e.exposed : e.proxy : Ja(e.parent) : null,
    Xa = A(Object.create(null), {
        $: e => e,
        $el: e => e.vnode.el,
        $data: e => e.data,
        $props: e => e.props,
        $attrs: e => e.attrs,
        $slots: e => e.slots,
        $refs: e => e.refs,
        $parent: e => Ja(e.parent),
        $root: e => Ja(e.root),
        $emit: e => e.emit,
        $options: e => function(e) {
            const t = e.type,
                {
                    __merged: n,
                    mixins: a,
                    extends: l
                } = t;
            if (n) return n;
            const s = e.appContext.mixins;
            if (!s.length && !a && !l) return t;
            const o = {};
            return s.forEach((t => Ka(o, t, e))), Ka(o, t, e), t.__merged = o
        }(e),
        $forceUpdate: e => () => Lt(e.update),
        $nextTick: e => Rt.bind(e.proxy),
        $watch: e => Tn.bind(e)
    }),
    Ya = {
        get({
            _: e
        }, t) {
            const {
                ctx: n,
                setupState: a,
                data: l,
                props: s,
                accessCache: o,
                type: r,
                appContext: i
            } = e;
            if ("__v_skip" === t) return !0;
            let c;
            if ("$" !== t[0]) {
                const r = o[t];
                if (void 0 !== r) switch (r) {
                    case 0:
                        return a[t];
                    case 1:
                        return l[t];
                    case 3:
                        return n[t];
                    case 2:
                        return s[t]
                } else {
                    if (a !== v && T(a, t)) return o[t] = 0, a[t];
                    if (l !== v && T(l, t)) return o[t] = 1, l[t];
                    if ((c = e.propsOptions[0]) && T(c, t)) return o[t] = 2, s[t];
                    if (n !== v && T(n, t)) return o[t] = 3, n[t];
                    ja || (o[t] = 4)
                }
            }
            const u = Xa[t];
            let d, p;
            return u ? ("$attrs" === t && fe(e, 0, t), u(e)) : (d = r.__cssModules) && (d = d[t]) ? d : n !== v && T(n, t) ? (o[t] = 3, n[t]) : (p = i.config.globalProperties, T(p, t) ? p[t] : void 0)
        },
        set({
            _: e
        }, t, n) {
            const {
                data: a,
                setupState: l,
                ctx: s
            } = e;
            if (l !== v && T(l, t)) l[t] = n;
            else if (a !== v && T(a, t)) a[t] = n;
            else if (T(e.props, t)) return !1;
            return ("$" !== t[0] || !(t.slice(1) in e)) && (s[t] = n, !0)
        },
        has({
            _: {
                data: e,
                setupState: t,
                accessCache: n,
                ctx: a,
                appContext: l,
                propsOptions: s
            }
        }, o) {
            let r;
            return void 0 !== n[o] || e !== v && T(e, o) || t !== v && T(t, o) || (r = s[0]) && T(r, o) || T(a, o) || T(Xa, o) || T(l.config.globalProperties, o)
        }
    },
    Qa = A({}, Ya, {
        get(e, t) {
            if (t !== Symbol.unscopables) return Ya.get(e, t, e)
        },
        has: (e, t) => "_" !== t[0] && !r(t)
    }),
    Za = Zn();
let el = 0;
let tl = null;
const nl = () => tl || Ft,
    al = e => {
        tl = e
    };

function ll(e) {
    return 4 & e.vnode.shapeFlag
}
let sl = !1;

function ol(e, t, n) {
    O(t) ? e.render = t : M(t) && (e.setupState = dt(t)), rl(e)
}

function rl(e, t) {
    const n = e.type;
    e.render || (e.render = n.render || y, e.render._rc && (e.withProxy = new Proxy(e.ctx, Qa))), tl = e, de(), Fa(e, n), pe(), tl = null
}

function il(e, t = tl) {
    t && (t.effects || (t.effects = [])).push(e)
}

function cl(e) {
    return O(e) && e.displayName || e.name
}

function ul(e) {
    const t = function(e) {
        let t, n;
        return O(e) ? (t = e, n = y) : (t = e.get, n = e.set), new ft(t, n, O(e) || !e.set)
    }(e);
    return il(t.effect), t
}

function dl(e, t, n) {
    const a = arguments.length;
    return 2 === a ? M(t) && !E(t) ? Ca(t) ? Ea(e, null, [t]) : Ea(e, t) : Ea(e, null, t) : (a > 3 ? n = Array.prototype.slice.call(arguments, 2) : 3 === a && Ca(n) && (n = [n]), Ea(e, t, n))
}

function pl(e, t) {
    let n;
    if (E(e) || D(e)) {
        n = new Array(e.length);
        for (let a = 0, l = e.length; a < l; a++) n[a] = t(e[a], a)
    } else if ("number" == typeof e) {
        n = new Array(e);
        for (let a = 0; a < e; a++) n[a] = t(a + 1, a)
    } else if (M(e))
        if (e[Symbol.iterator]) n = Array.from(e, t);
        else {
            const a = Object.keys(e);
            n = new Array(a.length);
            for (let l = 0, s = a.length; l < s; l++) {
                const s = a[l];
                n[l] = t(e[s], s, l)
            }
        }
    else n = [];
    return n
}
const fl = "3.0.7",
    hl = "http://www.w3.org/2000/svg",
    ml = "undefined" != typeof document ? document : null;
let gl, bl;
const vl = {
    insert: (e, t, n) => {
        t.insertBefore(e, n || null)
    },
    remove: e => {
        const t = e.parentNode;
        t && t.removeChild(e)
    },
    createElement: (e, t, n) => t ? ml.createElementNS(hl, e) : ml.createElement(e, n ? {
        is: n
    } : void 0),
    createText: e => ml.createTextNode(e),
    createComment: e => ml.createComment(e),
    setText: (e, t) => {
        e.nodeValue = t
    },
    setElementText: (e, t) => {
        e.textContent = t
    },
    parentNode: e => e.parentNode,
    nextSibling: e => e.nextSibling,
    querySelector: e => ml.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    cloneNode: e => e.cloneNode(!0),
    insertStaticContent(e, t, n, a) {
        const l = a ? bl || (bl = ml.createElementNS(hl, "svg")) : gl || (gl = ml.createElement("div"));
        l.innerHTML = e;
        const s = l.firstChild;
        let o = s,
            r = o;
        for (; o;) r = o, vl.insert(o, t, n), o = l.firstChild;
        return [s, r]
    }
};
const xl = /\s*!important$/;

function yl(e, t, n) {
    if (E(n)) n.forEach((n => yl(e, t, n)));
    else if (t.startsWith("--")) e.setProperty(t, n);
    else {
        const a = function(e, t) {
            const n = wl[t];
            if (n) return n;
            let a = q(t);
            if ("filter" !== a && a in e) return wl[t] = a;
            a = K(a);
            for (let l = 0; l < kl.length; l++) {
                const n = kl[l] + a;
                if (n in e) return wl[t] = n
            }
            return t
        }(e, t);
        xl.test(n) ? e.setProperty(W(a), n.replace(xl, ""), "important") : e[a] = n
    }
}
const kl = ["Webkit", "Moz", "ms"],
    wl = {};
const _l = "http://www.w3.org/1999/xlink";
let Cl = Date.now;
"undefined" != typeof document && Cl() > document.createEvent("Event").timeStamp && (Cl = () => performance.now());
let Al = 0;
const Sl = Promise.resolve(),
    Pl = () => {
        Al = 0
    };

function Tl(e, t, n, a) {
    e.addEventListener(t, n, a)
}

function El(e, t, n, a, l = null) {
    const s = e._vei || (e._vei = {}),
        o = s[t];
    if (a && o) o.value = a;
    else {
        const [n, r] = function(e) {
            let t;
            if (Rl.test(e)) {
                let n;
                for (t = {}; n = e.match(Rl);) e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0
            }
            return [W(e.slice(2)), t]
        }(t);
        if (a) {
            Tl(e, n, s[t] = function(e, t) {
                const n = e => {
                    (e.timeStamp || Cl()) >= n.attached - 1 && mt(function(e, t) {
                        if (E(t)) {
                            const n = e.stopImmediatePropagation;
                            return e.stopImmediatePropagation = () => {
                                n.call(e), e._stopped = !0
                            }, t.map((e => t => !t._stopped && e(t)))
                        }
                        return t
                    }(e, n.value), t, 5, [e])
                };
                return n.value = e, n.attached = (() => Al || (Sl.then(Pl), Al = Cl()))(), n
            }(a, l), r)
        } else o && (! function(e, t, n, a) {
            e.removeEventListener(t, n, a)
        }(e, n, o, r), s[t] = void 0)
    }
}
const Rl = /(?:Once|Passive|Capture)$/;
const Ll = /^on[a-z]/;
const Il = (e, {
    slots: t
}) => dl(In, Nl(e), t);
Il.displayName = "Transition";
const Ol = {
        name: String,
        type: String,
        css: {
            type: Boolean,
            default: !0
        },
        duration: [String, Number, Object],
        enterFromClass: String,
        enterActiveClass: String,
        enterToClass: String,
        appearFromClass: String,
        appearActiveClass: String,
        appearToClass: String,
        leaveFromClass: String,
        leaveActiveClass: String,
        leaveToClass: String
    },
    Dl = Il.props = A({}, In.props, Ol);

function Nl(e) {
    let {
        name: t = "v",
        type: n,
        css: a = !0,
        duration: l,
        enterFromClass: s = `${t}-enter-from`,
        enterActiveClass: o = `${t}-enter-active`,
        enterToClass: r = `${t}-enter-to`,
        appearFromClass: i = s,
        appearActiveClass: c = o,
        appearToClass: u = r,
        leaveFromClass: d = `${t}-leave-from`,
        leaveActiveClass: p = `${t}-leave-active`,
        leaveToClass: f = `${t}-leave-to`
    } = e;
    const h = {};
    for (const A in e) A in Ol || (h[A] = e[A]);
    if (!a) return h;
    const m = function(e) {
            if (null == e) return null;
            if (M(e)) return [Ml(e.enter), Ml(e.leave)]; {
                const t = Ml(e);
                return [t, t]
            }
        }(l),
        g = m && m[0],
        b = m && m[1],
        {
            onBeforeEnter: v,
            onEnter: x,
            onEnterCancelled: y,
            onLeave: k,
            onLeaveCancelled: w,
            onBeforeAppear: _ = v,
            onAppear: C = x,
            onAppearCancelled: S = y
        } = h,
        P = (e, t, n) => {
            Vl(e, t ? u : r), Vl(e, t ? c : o), n && n()
        },
        T = (e, t) => {
            Vl(e, f), Vl(e, p), t && t()
        },
        E = e => (t, a) => {
            const l = e ? C : x,
                o = () => P(t, e, a);
            l && l(t, o), Ul((() => {
                Vl(t, e ? i : s), $l(t, e ? u : r), l && l.length > 1 || Fl(t, n, g, o)
            }))
        };
    return A(h, {
        onBeforeEnter(e) {
            v && v(e), $l(e, s), $l(e, o)
        },
        onBeforeAppear(e) {
            _ && _(e), $l(e, i), $l(e, c)
        },
        onEnter: E(!1),
        onAppear: E(!0),
        onLeave(e, t) {
            const a = () => T(e, t);
            $l(e, d), ql(), $l(e, p), Ul((() => {
                Vl(e, d), $l(e, f), k && k.length > 1 || Fl(e, n, b, a)
            })), k && k(e, a)
        },
        onEnterCancelled(e) {
            P(e, !1), y && y(e)
        },
        onAppearCancelled(e) {
            P(e, !0), S && S(e)
        },
        onLeaveCancelled(e) {
            T(e), w && w(e)
        }
    })
}

function Ml(e) {
    return Z(e)
}

function $l(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.add(t))), (e._vtc || (e._vtc = new Set)).add(t)
}

function Vl(e, t) {
    t.split(/\s+/).forEach((t => t && e.classList.remove(t)));
    const {
        _vtc: n
    } = e;
    n && (n.delete(t), n.size || (e._vtc = void 0))
}

function Ul(e) {
    requestAnimationFrame((() => {
        requestAnimationFrame(e)
    }))
}
let jl = 0;

function Fl(e, t, n, a) {
    const l = e._endId = ++jl,
        s = () => {
            l === e._endId && a()
        };
    if (n) return setTimeout(s, n);
    const {
        type: o,
        timeout: r,
        propCount: i
    } = Bl(e, t);
    if (!o) return a();
    const c = o + "end";
    let u = 0;
    const d = () => {
            e.removeEventListener(c, p), s()
        },
        p = t => {
            t.target === e && ++u >= i && d()
        };
    setTimeout((() => {
        u < i && d()
    }), r + 1), e.addEventListener(c, p)
}

function Bl(e, t) {
    const n = window.getComputedStyle(e),
        a = e => (n[e] || "").split(", "),
        l = a("transitionDelay"),
        s = a("transitionDuration"),
        o = Hl(l, s),
        r = a("animationDelay"),
        i = a("animationDuration"),
        c = Hl(r, i);
    let u = null,
        d = 0,
        p = 0;
    "transition" === t ? o > 0 && (u = "transition", d = o, p = s.length) : "animation" === t ? c > 0 && (u = "animation", d = c, p = i.length) : (d = Math.max(o, c), u = d > 0 ? o > c ? "transition" : "animation" : null, p = u ? "transition" === u ? s.length : i.length : 0);
    return {
        type: u,
        timeout: d,
        propCount: p,
        hasTransform: "transition" === u && /\b(transform|all)(,|$)/.test(n.transitionProperty)
    }
}

function Hl(e, t) {
    for (; e.length < t.length;) e = e.concat(e);
    return Math.max(...t.map(((t, n) => Gl(t) + Gl(e[n]))))
}

function Gl(e) {
    return 1e3 * Number(e.slice(0, -1).replace(",", "."))
}

function ql() {
    return document.body.offsetHeight
}
const zl = new WeakMap,
    Wl = new WeakMap,
    Kl = {
        name: "TransitionGroup",
        props: A({}, Dl, {
            tag: String,
            moveClass: String
        }),
        setup(e, {
            slots: t
        }) {
            const n = nl(),
                a = Rn();
            let l, s;
            return xn((() => {
                if (!l.length) return;
                const t = e.moveClass || `${e.name||"v"}-move`;
                if (! function(e, t, n) {
                        const a = e.cloneNode();
                        e._vtc && e._vtc.forEach((e => {
                            e.split(/\s+/).forEach((e => e && a.classList.remove(e)))
                        }));
                        n.split(/\s+/).forEach((e => e && a.classList.add(e))), a.style.display = "none";
                        const l = 1 === t.nodeType ? t : t.parentNode;
                        l.appendChild(a);
                        const {
                            hasTransform: s
                        } = Bl(a);
                        return l.removeChild(a), s
                    }(l[0].el, n.vnode.el, t)) return;
                l.forEach(Jl), l.forEach(Xl);
                const a = l.filter(Yl);
                ql(), a.forEach((e => {
                    const n = e.el,
                        a = n.style;
                    $l(n, t), a.transform = a.webkitTransform = a.transitionDuration = "";
                    const l = n._moveCb = e => {
                        e && e.target !== n || e && !/transform$/.test(e.propertyName) || (n.removeEventListener("transitionend", l), n._moveCb = null, Vl(n, t))
                    };
                    n.addEventListener("transitionend", l)
                }))
            })), () => {
                const o = at(e),
                    r = Nl(o),
                    i = o.tag || ma;
                l = s, s = t.default ? Vn(t.default()) : [];
                for (let e = 0; e < s.length; e++) {
                    const t = s[e];
                    null != t.key && $n(t, Dn(t, r, a, n))
                }
                if (l)
                    for (let e = 0; e < l.length; e++) {
                        const t = l[e];
                        $n(t, Dn(t, r, a, n)), zl.set(t, t.el.getBoundingClientRect())
                    }
                return Ea(i, null, s)
            }
        }
    };

function Jl(e) {
    const t = e.el;
    t._moveCb && t._moveCb(), t._enterCb && t._enterCb()
}

function Xl(e) {
    Wl.set(e, e.el.getBoundingClientRect())
}

function Yl(e) {
    const t = zl.get(e),
        n = Wl.get(e),
        a = t.left - n.left,
        l = t.top - n.top;
    if (a || l) {
        const t = e.el.style;
        return t.transform = t.webkitTransform = `translate(${a}px,${l}px)`, t.transitionDuration = "0s", e
    }
}
const Ql = e => {
    const t = e.props["onUpdate:modelValue"];
    return E(t) ? e => Y(t, e) : t
};

function Zl(e) {
    e.target.composing = !0
}

function es(e) {
    const t = e.target;
    t.composing && (t.composing = !1, function(e, t) {
        const n = document.createEvent("HTMLEvents");
        n.initEvent(t, !0, !0), e.dispatchEvent(n)
    }(t, "input"))
}
const ts = {
        created(e, {
            modifiers: {
                lazy: t,
                trim: n,
                number: a
            }
        }, l) {
            e._assign = Ql(l);
            const s = a || "number" === e.type;
            Tl(e, t ? "change" : "input", (t => {
                if (t.target.composing) return;
                let a = e.value;
                n ? a = a.trim() : s && (a = Z(a)), e._assign(a)
            })), n && Tl(e, "change", (() => {
                e.value = e.value.trim()
            })), t || (Tl(e, "compositionstart", Zl), Tl(e, "compositionend", es), Tl(e, "change", es))
        },
        mounted(e, {
            value: t
        }) {
            e.value = null == t ? "" : t
        },
        beforeUpdate(e, {
            value: t,
            modifiers: {
                trim: n,
                number: a
            }
        }, l) {
            if (e._assign = Ql(l), e.composing) return;
            if (document.activeElement === e) {
                if (n && e.value.trim() === t) return;
                if ((a || "number" === e.type) && Z(e.value) === t) return
            }
            const s = null == t ? "" : t;
            e.value !== s && (e.value = s)
        }
    },
    ns = {
        created(e, t, n) {
            e._assign = Ql(n), Tl(e, "change", (() => {
                const t = e._modelValue,
                    n = function(e) {
                        return "_value" in e ? e._value : e.value
                    }(e),
                    a = e.checked,
                    l = e._assign;
                if (E(t)) {
                    const e = m(t, n),
                        s = -1 !== e;
                    if (a && !s) l(t.concat(n));
                    else if (!a && s) {
                        const n = [...t];
                        n.splice(e, 1), l(n)
                    }
                } else if (L(t)) {
                    const e = new Set(t);
                    a ? e.add(n) : e.delete(n), l(e)
                } else l(ls(e, a))
            }))
        },
        mounted: as,
        beforeUpdate(e, t, n) {
            e._assign = Ql(n), as(e, t, n)
        }
    };

function as(e, {
    value: t,
    oldValue: n
}, a) {
    e._modelValue = t, E(t) ? e.checked = m(t, a.props.value) > -1 : L(t) ? e.checked = t.has(a.props.value) : t !== n && (e.checked = h(t, ls(e, !0)))
}

function ls(e, t) {
    const n = t ? "_trueValue" : "_falseValue";
    return n in e ? e[n] : t
}
const ss = ["ctrl", "shift", "alt", "meta"],
    os = {
        stop: e => e.stopPropagation(),
        prevent: e => e.preventDefault(),
        self: e => e.target !== e.currentTarget,
        ctrl: e => !e.ctrlKey,
        shift: e => !e.shiftKey,
        alt: e => !e.altKey,
        meta: e => !e.metaKey,
        left: e => "button" in e && 0 !== e.button,
        middle: e => "button" in e && 1 !== e.button,
        right: e => "button" in e && 2 !== e.button,
        exact: (e, t) => ss.some((n => e[`${n}Key`] && !t.includes(n)))
    },
    rs = (e, t) => (n, ...a) => {
        for (let e = 0; e < t.length; e++) {
            const a = os[t[e]];
            if (a && a(n, t)) return
        }
        return e(n, ...a)
    },
    is = {
        esc: "escape",
        space: " ",
        up: "arrow-up",
        left: "arrow-left",
        right: "arrow-right",
        down: "arrow-down",
        delete: "backspace"
    },
    cs = (e, t) => n => {
        if (!("key" in n)) return;
        const a = W(n.key);
        return t.some((e => e === a || is[e] === a)) ? e(n) : void 0
    },
    us = {
        beforeMount(e, {
            value: t
        }, {
            transition: n
        }) {
            e._vod = "none" === e.style.display ? "" : e.style.display, n && t ? n.beforeEnter(e) : ds(e, t)
        },
        mounted(e, {
            value: t
        }, {
            transition: n
        }) {
            n && t && n.enter(e)
        },
        updated(e, {
            value: t,
            oldValue: n
        }, {
            transition: a
        }) {
            !t != !n && (a ? t ? (a.beforeEnter(e), ds(e, !0), a.enter(e)) : a.leave(e, (() => {
                ds(e, !1)
            })) : ds(e, t))
        },
        beforeUnmount(e, {
            value: t
        }) {
            ds(e, t)
        }
    };

function ds(e, t) {
    e.style.display = t ? e._vod : "none"
}
const ps = A({
    patchProp: (e, t, n, a, l = !1, s, o, r, c) => {
        switch (t) {
            case "class":
                ! function(e, t, n) {
                    if (null == t && (t = ""), n) e.setAttribute("class", t);
                    else {
                        const n = e._vtc;
                        n && (t = (t ? [t, ...n] : [...n]).join(" ")), e.className = t
                    }
                }(e, a, l);
                break;
            case "style":
                ! function(e, t, n) {
                    const a = e.style;
                    if (n)
                        if (D(n)) {
                            if (t !== n) {
                                const t = a.display;
                                a.cssText = n, "_vod" in e && (a.display = t)
                            }
                        } else {
                            for (const e in n) yl(a, e, n[e]);
                            if (t && !D(t))
                                for (const e in t) null == n[e] && yl(a, e, "")
                        }
                    else e.removeAttribute("style")
                }(e, n, a);
                break;
            default:
                _(t) ? C(t) || El(e, t, 0, a, o) : function(e, t, n, a) {
                    if (a) return "innerHTML" === t || !!(t in e && Ll.test(t) && O(n));
                    if ("spellcheck" === t || "draggable" === t) return !1;
                    if ("form" === t) return !1;
                    if ("list" === t && "INPUT" === e.tagName) return !1;
                    if ("type" === t && "TEXTAREA" === e.tagName) return !1;
                    if (Ll.test(t) && D(n)) return !1;
                    return t in e
                }(e, t, a, l) ? function(e, t, n, a, l, s, o) {
                    if ("innerHTML" === t || "textContent" === t) return a && o(a, l, s), void(e[t] = null == n ? "" : n);
                    if ("value" !== t || "PROGRESS" === e.tagName) {
                        if ("" === n || null == n) {
                            const a = typeof e[t];
                            if ("" === n && "boolean" === a) return void(e[t] = !0);
                            if (null == n && "string" === a) return e[t] = "", void e.removeAttribute(t);
                            if ("number" === a) return e[t] = 0, void e.removeAttribute(t)
                        }
                        try {
                            e[t] = n
                        } catch (r) {}
                    } else {
                        e._value = n;
                        const t = null == n ? "" : n;
                        e.value !== t && (e.value = t)
                    }
                }(e, t, a, s, o, r, c) : ("true-value" === t ? e._trueValue = a : "false-value" === t && (e._falseValue = a), function(e, t, n, a) {
                    // aqui nao ta undefined

                    if (a && t.startsWith("xlink:")) null == n ? e.removeAttributeNS(_l, t.slice(6, t.length)) : e.setAttributeNS(_l, t, n);
                    else {
                        const a = i(t);
                        null == n || a && !1 === n ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : n)
                    }
                }(e, t, a, l))
        }
    },
    forcePatchProp: (e, t) => "value" === t
}, vl);
let fs;
var hs, ms = "object" == typeof Reflect ? Reflect : null,
    gs = ms && "function" == typeof ms.apply ? ms.apply : function(e, t, n) {
        return Function.prototype.apply.call(e, t, n)
    };
hs = ms && "function" == typeof ms.ownKeys ? ms.ownKeys : Object.getOwnPropertySymbols ? function(e) {
    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
} : function(e) {
    return Object.getOwnPropertyNames(e)
};
var bs = Number.isNaN || function(e) {
    return e != e
};

function vs() {
    vs.init.call(this)
}
var xs = vs,
    ys = function(e, t) {
        return new Promise((function(n, a) {
            function l(n) {
                e.removeListener(t, s), a(n)
            }

            function s() {
                "function" == typeof e.removeListener && e.removeListener("error", l), n([].slice.call(arguments))
            }
            Rs(e, t, s, {
                once: !0
            }), "error" !== t && function(e, t, n) {
                "function" == typeof e.on && Rs(e, "error", t, n)
            }(e, l, {
                once: !0
            })
        }))
    };
vs.EventEmitter = vs, vs.prototype._events = void 0, vs.prototype._eventsCount = 0, vs.prototype._maxListeners = void 0;
var ks = 10;

function ws(e) {
    if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
}

function _s(e) {
    return void 0 === e._maxListeners ? vs.defaultMaxListeners : e._maxListeners
}

function Cs(e, t, n, a) {
    var l, s, o, r;
    if (ws(n), void 0 === (s = e._events) ? (s = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== s.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), s = e._events), o = s[t]), void 0 === o) o = s[t] = n, ++e._eventsCount;
    else if ("function" == typeof o ? o = s[t] = a ? [n, o] : [o, n] : a ? o.unshift(n) : o.push(n), (l = _s(e)) > 0 && o.length > l && !o.warned) {
        o.warned = !0;
        var i = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        i.name = "MaxListenersExceededWarning", i.emitter = e, i.type = t, i.count = o.length, r = i, console && console.warn && console.warn(r)
    }
    return e
}

function As() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
}

function Ss(e, t, n) {
    var a = {
            fired: !1,
            wrapFn: void 0,
            target: e,
            type: t,
            listener: n
        },
        l = As.bind(a);
    return l.listener = n, a.wrapFn = l, l
}

function Ps(e, t, n) {
    var a = e._events;
    if (void 0 === a) return [];
    var l = a[t];
    return void 0 === l ? [] : "function" == typeof l ? n ? [l.listener || l] : [l] : n ? function(e) {
        for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
        return t
    }(l) : Es(l, l.length)
}

function Ts(e) {
    var t = this._events;
    if (void 0 !== t) {
        var n = t[e];
        if ("function" == typeof n) return 1;
        if (void 0 !== n) return n.length
    }
    return 0
}

function Es(e, t) {
    for (var n = new Array(t), a = 0; a < t; ++a) n[a] = e[a];
    return n
}

function Rs(e, t, n, a) {
    if ("function" == typeof e.on) a.once ? e.once(t, n) : e.on(t, n);
    else {
        if ("function" != typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
        e.addEventListener(t, (function l(s) {
            a.once && e.removeEventListener(t, l), n(s)
        }))
    }
}

function Ls(e) {
    return new Date(1e3 * e).toLocaleTimeString("pt-BR").substring(0, 5)
}
Object.defineProperty(vs, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
        return ks
    },
    set: function(e) {
        if ("number" != typeof e || e < 0 || bs(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
        ks = e
    }
}), vs.init = function() {
    void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
}, vs.prototype.setMaxListeners = function(e) {
    if ("number" != typeof e || e < 0 || bs(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
    return this._maxListeners = e, this
}, vs.prototype.getMaxListeners = function() {
    return _s(this)
}, vs.prototype.emit = function(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
    var a = "error" === e,
        l = this._events;
    if (void 0 !== l) a = a && void 0 === l.error;
    else if (!a) return !1;
    if (a) {
        var s;
        if (t.length > 0 && (s = t[0]), s instanceof Error) throw s;
        var o = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
        throw o.context = s, o
    }
    var r = l[e];
    if (void 0 === r) return !1;
    if ("function" == typeof r) gs(r, this, t);
    else {
        var i = r.length,
            c = Es(r, i);
        for (n = 0; n < i; ++n) gs(c[n], this, t)
    }
    return !0
}, vs.prototype.addListener = function(e, t) {
    return Cs(this, e, t, !1)
}, vs.prototype.on = vs.prototype.addListener, vs.prototype.prependListener = function(e, t) {
    return Cs(this, e, t, !0)
}, vs.prototype.once = function(e, t) {
    return ws(t), this.on(e, Ss(this, e, t)), this
}, vs.prototype.prependOnceListener = function(e, t) {
    return ws(t), this.prependListener(e, Ss(this, e, t)), this
}, vs.prototype.removeListener = function(e, t) {
    var n, a, l, s, o;
    if (ws(t), void 0 === (a = this._events)) return this;
    if (void 0 === (n = a[e])) return this;
    if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete a[e], a.removeListener && this.emit("removeListener", e, n.listener || t));
    else if ("function" != typeof n) {
        for (l = -1, s = n.length - 1; s >= 0; s--)
            if (n[s] === t || n[s].listener === t) {
                o = n[s].listener, l = s;
                break
            } if (l < 0) return this;
        0 === l ? n.shift() : function(e, t) {
            for (; t + 1 < e.length; t++) e[t] = e[t + 1];
            e.pop()
        }(n, l), 1 === n.length && (a[e] = n[0]), void 0 !== a.removeListener && this.emit("removeListener", e, o || t)
    }
    return this
}, vs.prototype.off = vs.prototype.removeListener, vs.prototype.removeAllListeners = function(e) {
    var t, n, a;
    if (void 0 === (n = this._events)) return this;
    if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]), this;
    if (0 === arguments.length) {
        var l, s = Object.keys(n);
        for (a = 0; a < s.length; ++a) "removeListener" !== (l = s[a]) && this.removeAllListeners(l);
        return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
    }
    if ("function" == typeof(t = n[e])) this.removeListener(e, t);
    else if (void 0 !== t)
        for (a = t.length - 1; a >= 0; a--) this.removeListener(e, t[a]);
    return this
}, vs.prototype.listeners = function(e) {
    return Ps(this, e, !0)
}, vs.prototype.rawListeners = function(e) {
    return Ps(this, e, !1)
}, vs.listenerCount = function(e, t) {
    return "function" == typeof e.listenerCount ? e.listenerCount(t) : Ts.call(e, t)
}, vs.prototype.listenerCount = Ts, vs.prototype.eventNames = function() {
    return this._eventsCount > 0 ? hs(this._events) : []
}, xs.once = ys;
const Is = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
    Os = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const Ds = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    Ns = Ds.map((e => e.toUpperCase()));

function Ms(e) {
    const t = e instanceof Date ? e : new Date(1e3 * e);
    return [
        [t.getDate(), Ds[t.getMonth()].substr(0, 3), t.getFullYear() - 2e3].join(" "), Ls(e)
    ]
}

function $s(e, t) {
    let n = e.length;
    for (; n--;) t(e[n], n) && e.splice(n, 1)
}

function Vs(e) {
    const t = lo.settings.currency || "R$",
        n = Math.abs(e).toLocaleString("pt-BR");
    return e < 0 ? "-" + t + " " + n : t + " " + n
}

function Us(e) {
    return e && e[0].toUpperCase() + e.substr(1)
}

function js(e) {
    return String(e).replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function Fs(e, t = "Você") {
    var n;
    return e === lo.identity.phone ? t : (null == (n = lo.contacts.value.find((t => t.phone === e))) ? void 0 : n.name) || e
}

function Bs(e, t, n) {
    return n.indexOf(e) == t
}
var Hs = Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    isAudio: function(e) {
        return e.match(/\.(ogg|webm)$/)
    },
    unixToHHMM: Ls,
    unixToDate: function(e) {
        return new Date(1e3 * e).toLocaleString("pt-BR").substring(0, 10)
    },
    unixToLocale: function(e) {
        const t = new Date(1e3 * e);
        return `${Is[t.getDay()]}, ${t.getDate()} de ${Os[t.getMonth()]}, ${Ls(e)}`
    },
    unixToRelative: function(e) {
        const {
            abs: t,
            floor: n
        } = Math, a = t(e - n(Date.now() / 1e3));
        return a < 60 ? "Agora" : a < 3600 ? n(a / 60) + "min" : a < 86400 ? n(a / 3600) + "h" : n(a / 86400) + "d"
    },
    unixToDatetime: function(e) {
        return new Date(1e3 * e).toLocaleString("pt-BR")
    },
    duration: function(e) {
        const t = e >= 3600;
        return new Date(1e3 * e).toISOString().substr(t ? 11 : 14, t ? 8 : 5)
    },
    fancyMonths: Ds,
    upperMonths: Ns,
    unixToDayOfMonth: function(e) {
        const t = e instanceof Date ? e : new Date(1e3 * e);
        return t.getDate() + " DE " + Ns[t.getMonth()]
    },
    unixToTwitter: Ms,
    moneyStringToInt: function(e) {
        return parseInt(e.replace(/\D/g, "") || 0).toLocaleString("pt-BR")
    },
    vdist: function([e, t, n], [a, l, s], o = !1) {
        return Math.round(Math.sqrt((e - a) ** 2 + (t - l) ** 2 + (o ? n - s : 0) ** 2))
    },
    vdist2: function(...e) {
        const t = this.vdist(...e);
        return t > 1e3 ? Math.round(t / 100) / 10 + "km" : t + "m"
    },
    removeIf: $s,
    intToMoney: Vs,
    ucfirst: Us,
    safeHTML: js,
    getNameByPhone: Fs,
    arrayUnique: Bs
});

function Gs(e) {
    var t;
    const n = null == (t = lo.settings.apps) ? void 0 : t[e];
    return "string" == typeof n ? [null, n] : [null == n ? void 0 : n.name, null == n ? void 0 : n.icon]
}

function qs(e, t, n, a, l) {
    var s;
    const [o, r] = Gs(e);
    return null != l || (l = !(null == (s = lo.settings.disabledApps) ? void 0 : s.includes(e))), {
        entry: e,
        name: null != o ? o : n,
        icon: null != r ? r : a,
        to: t,
        enabled: l
    }
}
const zs = {
    picpay: "PicPay",
    hype: "Hype Bank",
    itau: "Itaú",
    nubank: "Nubank",
    fleeca: "Fleeca",
    nxbank: "Nxbank"
};
let Ws = [];

function Ks() {
    var e;
    if (Ws.length) return Ws;
    const t = e => lo.asset("/apps/" + e);
    return lo.settings.channel, Ws = [qs("settings", "/settings", "", t("settings.png"), !0), qs("contacts", "/contacts", "", t("phone.png"), !0), qs("sms", "/sms", "", t("sms.webp"), !0), qs("gallery", "/gallery", "", t("photos.webp"), !0), qs("whatsapp", "/whatsapp", "WhatsApp", t("whatsapp.jpg")), qs("tor", "/tor", "TOR", t("tor.jpg")), qs("instagram", "/instagram/login", "Instagram", t("instagram.jpg")), qs("twitter", "/twitter", "Twitter", t("twitter.png")), qs("bank", "/bank", zs[lo.settings.bankType.replace(/\d/g, "")], t(lo.settings.bankType.toLowerCase() + ".webp")), qs("paypal", "/paypal", "PayPal", t("paypal.webp")), qs("olx", "/olx", "OLX", t("olx.png")), qs("tinder", "/tinder", "Tinder", t("tinder.webp")), qs("yellowpages", "/yellowpages", "Yellow Pages", t("yellowpages.webp")), ...Object.keys(null != (e = lo.settings.customApps) ? e : []).map((e => qs(e, "/custom/" + e, Us(e), t("settings.png")))), qs("calculator", "/calculator", "Calculadora", t("calculator.webp")), qs("notes", "/notes", "Anotações", t("notes.webp")), qs("minesweeper", "/minesweeper", "Campo Minado", t("minesweeper.webp")), qs("truco", "/truco", "Truco", t("truco.webp"))].filter((e => null == e ? void 0 : e.enabled)).map(((e, t) => l(l({}, e), {
        bottom: t < 4
    })))
}

function Js(e) {
    var t;
    return null == (t = Ks().find((t => t.entry == e))) ? void 0 : t.name
}
const Xs = {
    get gps() {
        var e;
        return null != (e = Gs("gps")[1]) ? e : lo.asset("/apps/waze.webp")
    },
    get phone() {
        var e;
        return null != (e = Gs("phone")[1]) ? e : lo.asset("/apps/phone.png")
    },
    get facetime() {
        var e;
        return null != (e = Gs("facetime")[1]) ? e : lo.asset("/apps/facetime.webp")
    }
};

function Ys(e) {
    return new Proxy({}, {
        get: (t, n) => t[n] || (t[n] = function(...t) {
            return new Promise(((a, l) => {
                fetch("http://smartphone/" + e, {
                    method: "POST",
                    body: JSON.stringify({
                        member: n,
                        args: t
                    })
                }).then((e => e.json())).then((e => {
                    e && e.__null__ ? a(null) : a(e)
                })).catch((a => {
                    l(a), console.error("Rejected: " + e, n, JSON.stringify(t), (null == a ? void 0 : a.message) || a)
                }))
            }))
        })
    })
}
const Qs = Ys("client"),
    Zs = e => "https://fivem.jesteriruka.dev" + e,
    eo = new xs;
eo.setMaxListeners(300);
const to = {
    volume: ot(Number(localStorage.getItem("smartphone@notificationVolume") || 50)),
    doNotDisturb: ot("true" == localStorage.getItem("smartphone@doNotDisturb")),
    darkTheme: ot("true" == localStorage.getItem("smartphone@darkTheme")),
    anonymousCall: ot("true" == localStorage.getItem("smartphone@anonymousCall")),
    get(e, t) {
        const n = localStorage.getItem("smartphone@" + e);
        return null != n ? n : t
    },
    set: (e, t) => localStorage.setItem("smartphone@" + e, t)
};

function no(e) {
    to.set("darkTheme", e), document.documentElement.classList.toggle("dark", !!e)
}
Sn(to.volume, (e => to.set("notificationVolume", e))), Sn(to.doNotDisturb, (e => to.set("doNotDisturb", String(!!e)))), Sn(to.darkTheme, (e => no(e))), Sn(to.anonymousCall, (e => to.set("anonymousCall", String(!!e)))), document.documentElement.classList.toggle("dark", to.darkTheme.value);
const ao = [];
eo.on("Route:afterEach", (() => {
    const e = ao.splice(0, ao.length);
    for (let [t, n] of e) eo.removeListener(t, n)
}));
var lo = {
    asset: Zs,
    bankLock: !1,
    lockAndProceed(e) {
        if (this.bankLock) return;
        this.bankLock = !0;
        Promise.resolve(e()).finally((() => this.bankLock = !1))
    },
    clock: ot({
        hours: "00",
        minutes: "00"
    }),
    visible: ot(!1),
    loaded: ot(!1),
    microphone: ot(),
    debug(...e) {
        (this.localhost || globalThis.$smartphoneDebug) && console.log(...e)
    },
    setDark: no,
    darkTheme: to.darkTheme,
    captureMicrophone() {
        navigator.mediaDevices.getUserMedia({
            audio: {
                autoGainControl: !1
            }
        }).then((e => this.microphone.value = e), (() => {}))
    },
    currentCall: ot(),
    localhost: "localhost" === location.hostname,
    identity: Ye({}),
    messages: Ye({}),
    gallery: Ye([]),
    contacts: ot([]),
    sortContacts() {
        this.contacts.value.sort(((e, t) => e.name.localeCompare(t.name)))
    },
    settings: Ye({
        zoom: 100,
        bankType: "lime",
        case: "iphonexs",
        uploadServer: "https://toddyauth.000webhostapp.com/smartphone/index.php",
        ringSound: "https://toddyauth.000webhostapp.com/smartphone/ring.mp3",
        dialSound: "https://toddyauth.000webhostapp.com/smartphone/dial.mp3",
        notificationSound: "https://toddyauth.000webhostapp.com/smartphone/notification.mp3",
        instagramLogo: null != (e = globalThis.instagramLogo) ? e : Zs("/apps/instagram_hand.png"),
        blocks: [],
        currency: "R$"
    }),
    isDisabled(e) {
        var t;
        return null == (t = this.settings.disabledApps) ? void 0 : t.includes(e)
    },
    backend: Ys("backend"),
    backgroundURL: localStorage.getItem("smartphone@background"),
    client: Qs,
    pusher: eo,
    onceRoute(e, t) {
        this.pusher.on(e, t), ao.push([e, t])
    },
    notifications: Ye([]),
    storage: to,
    addNotification(e, t, n) {
        var a;
        const l = this.notifications,
            s = {
                id: (null != (a = l.map((e => e.id)).sort(((e, t) => t - e))[0]) ? a : 0) + 1,
                icon: function(e) {
                    var t, n;
                    return null != (n = Xs[e]) ? n : null == (t = Ks().find((t => t.entry == e))) ? void 0 : t.icon
                }(e),
                title: t,
                subtitle: n
            };
        if (l.push(s), setTimeout((() => {
                const e = l.indexOf(s); - 1 != e && l.splice(e, 1)
            }), 5e3), "phone" != e) {
            const e = new Audio(this.settings.notificationSound);
            e.volume = this.getNotificationVolume() / 100, e.currentTime = 0, e.play()
        }
    },
    getNotificationVolume: () => parseInt(localStorage.getItem("smartphone@notificationVolume") || 50),
    setNotificationVolume(e) {
        localStorage.setItem("smartphone@notificationVolume", e)
    },
    hasNotificationFor: e => "false" != localStorage.getItem(`smartphone@notification_${e.toLowerCase()}`),
    setNotificationFor(e, t) {
        localStorage.setItem(`smartphone@notification_${e.toLowerCase()}`, JSON.stringify(!!t))
    },
    created() {
        this.backend.getSettings().then((e => {
            var {
                identity: t,
                contacts: n
            } = e, a = s(e, ["identity", "contacts"]);
            for (let l in t) this.identity[l] = t[l];
            this.contacts.value = n, this.sortContacts(), Object.assign(this.settings, a), a.isAndroid && (document.documentElement.style.fontFamily = "Roboto"), Ws.length = 0, Ks(), this.backgroundURL || (this.backgroundURL = this.settings.backgroundURL || this.asset("/stock/wallpapers/default.webp"))
        })), this.settings.zoom = parseInt(localStorage.getItem("smartphone@zoom")) || 100, this.updateZoom(), this.localhost && (this.settings.case = "s20", this.settings.isAndroid = !0, document.documentElement.style.fontFamily = "Roboto", this.settings.backgroundURL = this.asset("/stock/wallpaper.jpg"), this.identity = {
            name: "Jester",
            firstname: "Iruka",
            user_id: 1,
            phone: "111-111"
        }, this.currentCall.value = {
            contact: {
                phone: "000-000",
                name: "Bruno"
            }
        }, this.contacts.value.push(...Array(90).fill(0).map(((e, t) => ({
            id: t + 1,
            name: "Fake " + (t + 1),
            phone: "000-0" + String(t + 1).padStart(2, 0)
        })))))
    },
    ready() {
        this.pusher.on("ADD_CONTACT", (() => this.sortContacts())), this.settings.useGameClock ? this.pusher.on("TIME", (e => this.clock.value = e)) : setInterval((() => {
            const e = new Date,
                t = this.clock.value;
            t.hours = String(e.getHours()).padStart(2, 0), t.minutes = String(e.getMinutes()).padStart(2, 0)
        }), 1e3)
    },
    fetchSettings() {
        const e = setInterval((() => {
            this.identity.user_id && this.identity.phone ? clearInterval(e) : this.created()
        }), 2500)
    },
    updateZoom() {
        const e = this.settings.zoom / 100 * 8;
        document.querySelector("html").style.fontSize = e + "px"
    },
    getPlayerCoords: () => Qs.getLocation().then((e => e.map((e => Math.round(100 * e) / 100)))),
    alert: null,
    prompt: null,
    confirm: null
};
const so = {
        props: ["content"],
        setup(e) {
            const t = Ua("alert"),
                n = lo.settings.isAndroid;
            return {
                content: e.content,
                alert: t,
                android: n
            }
        }
    },
    oo = {
        class: "absolute inset-0 flex flex-center h-full bg-black bg-opacity-50 z-20"
    },
    ro = {
        key: 0,
        class: "bg-gray-100 w-3/4 rounded-md"
    },
    io = {
        class: "p-5 text-gray-600 break-words"
    },
    co = {
        class: "block mt-4 text-right py-2"
    },
    uo = {
        key: 1,
        class: "bg-white w-3/4 rounded-2xl"
    },
    po = {
        class: "p-5 break-words"
    },
    fo = {
        class: "block mt-4 text-center border-t py-2"
    };
so.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", oo, [a.android ? (ka(), _a("div", ro, [Ea("div", io, g(a.content), 1), Ea("div", co, [Ea("button", {
        onClick: t[1] || (t[1] = e => a.alert()),
        class: "p-2 px-8 rounded-lg font-bold text-blue-600"
    }, "OK")])])) : (ka(), _a("div", uo, [Ea("div", po, g(a.content), 1), Ea("div", fo, [Ea("button", {
        onClick: t[2] || (t[2] = e => a.alert()),
        class: "p-2 px-6 rounded-lg text-blue-400"
    }, "Fechar")])]))])
};
const ho = {
        props: ["title", "callback"],
        setup: () => ({
            android: lo.settings.isAndroid
        })
    },
    mo = {
        class: "absolute inset-0 flex flex-center h-full bg-black bg-opacity-50 z-20"
    },
    go = {
        key: 0,
        class: "bg-gray-100 w-3/4 rounded-md"
    },
    bo = {
        class: "p-5 break-words text-center text-gray-600"
    },
    vo = {
        class: "mt-4 px-4 flex justify-between"
    },
    xo = {
        key: 1,
        class: "bg-white w-3/4 rounded-2xl"
    },
    yo = {
        class: "p-5 break-words"
    },
    ko = {
        class: "flex justify-between border-t"
    };
ho.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", mo, [a.android ? (ka(), _a("div", go, [Ea("div", bo, g(n.title), 1), Ea("div", vo, [Ea("button", {
        onClick: t[1] || (t[1] = e => n.callback(!1)),
        class: "p-3 text-blue-600"
    }, "CANCELAR"), Ea("button", {
        onClick: t[2] || (t[2] = e => n.callback(!0)),
        class: "p-3 text-blue-600"
    }, "SIM")])])) : (ka(), _a("div", xo, [Ea("div", yo, g(n.title), 1), Ea("div", ko, [Ea("button", {
        onClick: t[3] || (t[3] = e => n.callback(!1)),
        class: "flex-1 p-3 rounded-lg text-red-500"
    }, "Não"), Ea("button", {
        onClick: t[4] || (t[4] = e => n.callback(!0)),
        class: "flex-1 p-3 border-l text-blue-400"
    }, "Sim")])]))])
};
const wo = {
        props: ["title", "max", "callback"],
        setup(e) {
            const t = ot(""),
                n = lo.settings.isAndroid;
            return {
                content: t,
                submit: function(n) {
                    e.callback(n ? null : t.value), t.value = null
                },
                android: n
            }
        }
    },
    _o = {
        class: "absolute inset-0 flex flex-center h-full bg-black bg-opacity-50 z-20"
    },
    Co = {
        key: 0,
        class: "bg-gray-100 w-3/4 rounded-md"
    },
    Ao = {
        class: "p-5 text-center"
    },
    So = {
        class: "block mb-6"
    },
    Po = {
        class: "px-4 flex justify-between text-3xl"
    },
    To = {
        key: 1,
        class: "bg-white w-11/12 rounded-2xl"
    },
    Eo = {
        class: "p-5"
    },
    Ro = {
        class: "block text-center border-t flex justify-between"
    };
wo.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", _o, [a.android ? (ka(), _a("div", Co, [Ea("div", Ao, [Ea("label", So, g(n.title), 1), Yn(Ea("input", {
        "onUpdate:modelValue": t[1] || (t[1] = e => a.content = e),
        onKeydown: t[2] || (t[2] = cs((e => a.submit()), ["enter"])),
        maxlength: n.max,
        placeholder: "Insira um texto",
        class: "bg-transparent p-1 w-full border-b-2 focus:border-blue-500 transition-border duration-300"
    }, null, 40, ["maxlength"]), [
        [ts, a.content]
    ])]), Ea("div", Po, [Ea("button", {
        onClick: t[3] || (t[3] = e => a.submit(!0)),
        class: "p-4 font-bold text-blue-600"
    }, "CANCELAR"), Ea("button", {
        onClick: t[4] || (t[4] = e => a.submit()),
        class: "p-4 font-bold text-blue-600"
    }, "OK")])])) : (ka(), _a("div", To, [Ea("div", Eo, [Ea("label", null, g(n.title), 1), Yn(Ea("input", {
        onKeydown: t[5] || (t[5] = cs((e => a.submit()), ["enter"])),
        maxlength: n.max,
        class: "text-black p-2 rounded-lg w-full",
        "onUpdate:modelValue": t[6] || (t[6] = e => a.content = e)
    }, null, 40, ["maxlength"]), [
        [ts, a.content]
    ])]), Ea("div", Ro, [Ea("button", {
        onClick: t[7] || (t[7] = e => a.submit(!0)),
        class: "p-4 text-red-500 flex-1"
    }, "Fechar"), Ea("button", {
        onClick: t[8] || (t[8] = e => a.submit()),
        class: "p-4 text-blue-400 border-l flex-1"
    }, "Enviar")])]))])
}, window.addEventListener("popstate", (() => Lo.state.request.value = null));
const Lo = {
        clearAndRequest(e, t = 25, n = !1) {
            return this.state.request.value = null, this.request(e, t, n)
        },
        request(e, t = 25, n = !1) {
            return new Promise(((a, l) => {
                this.state.request.value || (Array.isArray(e) ? this.state.request.value = {
                    options: e.filter((e => e)).map(((e, t) => {
                        var n;
                        return Array.isArray(e) ? {
                            key: e.length >= 3 ? e[0] : t,
                            display: e.length >= 3 ? e[1] : e[0],
                            classes: e.length >= 3 ? e[2] : e[1] || []
                        } : {
                            key: null != (n = e.key) ? n : t,
                            html: null == e ? void 0 : e.html,
                            display: e
                        }
                    })),
                    size: t,
                    resolve: a,
                    reject: l,
                    emptyAsError: n
                } : this.state.request.value = {
                    options: Object.entries(e).map((e => ({
                        key: e[0],
                        display: e[1]
                    }))),
                    size: t,
                    resolve: a,
                    reject: l,
                    emptyAsError: n
                })
            }))
        },
        state: {
            request: ot()
        }
    },
    Io = () => Lo;
const Oo = {
        setup() {
            const {
                state: e
            } = Io(), t = ot(0), n = ot(33), a = lo.settings.isAndroid;
            let l;
            return Sn(e.request, (e => {
                e && (n.value = e.size, t.value = 0, clearInterval(l), l = setInterval((() => {
                    t.value < n.value ? t.value += n.value / 33 : clearInterval(l)
                }), 10))
            })), {
                req: e.request,
                res: function(a) {
                    var s, o, r;
                    (null == (s = e.request.value) ? void 0 : s.emptyAsError) && null == a ? null == (o = e.request.value) || o.reject(a) : null == (r = e.request.value) || r.resolve(a), clearInterval(l), l = setInterval((() => {
                        t.value > 0 ? t.value -= n.value / 33 : (clearInterval(l), e.request.value = null)
                    }), 10)
                },
                height: t,
                max: n,
                isAndroid: a
            }
        }
    },
    Do = ln("data-v-a9ba2708");
nn("data-v-a9ba2708");
const No = Ea("svg", {
        class: "mx-auto",
        height: "20",
        width: "35%"
    }, [Ea("line", {
        x1: "0",
        y1: "10",
        x2: "100%",
        y2: "10",
        style: {
            "stroke-width": "0.2rem"
        }
    })], -1),
    Mo = {
        class: "flex flex-col flex-1 overflow-y-auto hide-scroll"
    };
an();
const $o = Do(((e, t, n, a, l, s) => a.req ? (ka(), _a("div", {
    key: 0,
    container: "",
    class: "absolute inset-x-0 bottom-0 px-5 pt-5 z-10 flex flex-col",
    style: {
        height: a.height + "%",
        maxHeight: a.max + "%"
    }
}, [Ea("button", {
    onClick: t[1] || (t[1] = e => a.res()),
    class: "mb-4"
}, [No]), Ea("ul", Mo, [(ka(!0), _a(ma, null, pl(a.req.options, ((t, n) => {
    var l;
    return ka(), _a("li", {
        key: n,
        class: ["mb-8 text-4xl", t.classes],
        onClick: e => {
            var l;
            return a.res(null != (l = t.key) ? l : n)
        },
        innerHTML: null != (l = t.html) ? l : e.$filters.safeHTML(t.display)
    }, null, 10, ["onClick", "innerHTML"])
})), 128))])], 4)) : Oa("", !0)));
Oo.render = $o, Oo.__scopeId = "data-v-a9ba2708";
var Vo = {
    upload(e, t) {
        const n = lo.settings.uploadServer,
            a = new FormData;
        return a.append(n.includes("discord") ? "file" : "webm" == t ? "audio" : "image", e, Date.now() + "." + t), fetch(n, {
            method: "POST",
            body: a
        }).then((e => e.json())).then((e => {
            var t;
            return null != (t = e.url) ? t : e.attachments[0].url
        }))
    },
    async uploadVideo(e) {
        const t = new FormData;
        t.append("video", e, "camera.webm");
        const n = await fetch("http://177.54.156.214/jester/index.php", {       // AQUI é o local onde o
            method: "POST",
            body: t
        });
        return (await n.json()).url
    }
};

function Uo(e, t, n) {
    const a = e.createShader(t);
    e.shaderSource(a, n), e.compileShader(a);
    const l = e.getShaderInfoLog(a);
    return l && console.error(l), a
}
class jo {
    constructor(e) {
        this.canvas = e, this.gl = e.getContext("webgl", {
            antialias: !1,
            depth: !1,
            stencil: !1,
            alpha: !1,
            desynchronized: !0,
            failIfMajorPerformanceCaveat: !1
        }), this.animationFrame = void 0, this.createStuff(), this.render(), this.running = !0
    }
    createStuff() {
        if (!this.gl) {
            for (let e = 0; e < 10; e += 1) console.log("Você está bugado! Não possível criar o contexto WebGL, este problema não tem correção");
            return
        }
        const e = this.gl,
            t = function(e) {
                const t = e.createTexture(),
                    n = new Uint8Array([0, 0, 255, 255]);
                return e.bindTexture(e.TEXTURE_2D, t), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, n), e.texParameterf(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameterf(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameterf(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameterf(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameterf(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.MIRRORED_REPEAT), e.texParameterf(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT), e.texParameterf(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), t
            }(e),
            {
                program: n,
                vloc: a,
                tloc: l
            } = function(e) {
                const t = Uo(e, e.VERTEX_SHADER, "\n  attribute vec2 a_position;\n  attribute vec2 a_texcoord;\n  uniform mat3 u_matrix;\n  varying vec2 textureCoordinate;\n  void main() {\n    gl_Position = vec4(a_position, 0.0, 1.0);\n    textureCoordinate = a_texcoord;\n  }\n"),
                    n = Uo(e, e.FRAGMENT_SHADER, "\nvarying highp vec2 textureCoordinate;\nuniform sampler2D external_texture;\nvoid main()\n{\n  gl_FragColor = texture2D(external_texture, textureCoordinate);\n}\n"),
                    a = e.createProgram();
                return e.attachShader(a, t), e.attachShader(a, n), e.linkProgram(a), e.useProgram(a), {
                    program: a,
                    vloc: e.getAttribLocation(a, "a_position"),
                    tloc: e.getAttribLocation(a, "a_texcoord")
                }
            }(e),
            {
                vertexBuff: s,
                texBuff: o
            } = function(e) {
                const t = e.createBuffer();
                e.bindBuffer(e.ARRAY_BUFFER, t), e.bufferData(e.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), e.STATIC_DRAW);
                const n = e.createBuffer();
                return e.bindBuffer(e.ARRAY_BUFFER, n), e.bufferData(e.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), e.STATIC_DRAW), {
                    vertexBuff: t,
                    texBuff: n
                }
            }(e);
        e.useProgram(n), e.bindTexture(e.TEXTURE_2D, t), e.uniform1i(e.getUniformLocation(n, "external_texture"), 0), e.bindBuffer(e.ARRAY_BUFFER, s), e.vertexAttribPointer(a, 2, e.FLOAT, !1, 0, 0), e.enableVertexAttribArray(a), e.bindBuffer(e.ARRAY_BUFFER, o), e.vertexAttribPointer(l, 2, e.FLOAT, !1, 0, 0), e.enableVertexAttribArray(l), e.viewport(0, 0, e.canvas.width, e.canvas.height)
    }
    resize(e, t) {
        this.gl && (this.gl.viewport(0, 0, e, t), this.gl.canvas.width = e, this.gl.canvas.height = t)
    }
    render() {
        var e;
        !this.kill && this.gl && (this.running ? (this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4), this.gl.finish(), null == (e = this.onrender) || e.call(this, this.canvas), this.animationFrame = requestAnimationFrame(this.render.bind(this))) : this.animationFrame = requestAnimationFrame(this.render.bind(this)))
    }
}
const Fo = document.createElement("canvas");
Fo.width = 1920, Fo.height = 1080;
const Bo = new jo(Fo);
Bo.running = !1;
var Ho = {
    get running() {
        return Bo.running
    },
    canvas: Fo,
    start() {
        Bo.running = !0
    },
    stop() {
        Bo.running = !1
    },
    createBlob: (e = .8, t = "image/jpeg") => new Promise((n => Bo.canvas.toBlob(n, t, e))),
    createDataURL: (e = .8, t = "image/jpeg") => Bo.canvas.toDataURL(t, e),
    createStream: () => Bo.canvas.captureStream(24)
};
const Go = Ye({
    original: null,
    formats: ["landscape", "portrait", "selfie"],
    ondiscard: null,
    onproceed: null,
    request(e = !1, t = "/") {
        return lo.localhost ? Promise.resolve(e ? "https://i.pinimg.com/564x/a6/d4/30/a6d4302b399cc1dc1e682f08f20bf2f4.jpg" : "https://c.wallhere.com/photos/b1/5e/GTA5_GTA_Online_GTA_Landscape_GTA_Photography_trees_sunrise_Grand_Theft_Auto_V_Grand_Theft_Auto_V_Online-1945677.jpg!d") : (Ho.start(), lo.pusher.once("CONFIRM_SCREENSHOT", (async () => {
            this.original = await Ho.createBlob();
            const e = new Audio(lo.asset("/stock/photo.ogg"));
            e.volume = .25, e.play(), fetch("http://smartphone/screenshot", {
                method: "POST"
            })
        })), this.formats = e ? ["selfie"] : ["landscape", "portrait", "selfie"], new Promise(((n, a) => {
            lo.visible.value = !1, lo.client.close(), lo.client.takePhoto(!!e).then((async e => {
                if (Ho.stop(), lo.client.open(), e) {
                    for (; !this.original;) await zo(50);
                    this.ondiscard = () => {
                        this.original = null, a("Photo discarded")
                    }, this.onproceed = e => {
                        Vo.upload(e, "jpg").then((e => {
                            lo.backend.gallery_save(t, e).then((e => {
                                lo.gallery.push(e), lo.gallery.sort(((e, t) => t.id - e.id))
                            })), n(e)
                        }), (e => {
                            a(e), console.error("Falha ao realizar upload de imagem", e.message)
                        })).finally((() => this.original = null))
                    }
                } else a("Camera rejected")
            }))
        })))
    }
});

function qo(...e) {
    return e.length ? Go.request(...e) : Go
}

function zo(e) {
    return new Promise((t => setTimeout(t, e)))
}
const Wo = {
        setup() {
            const e = qo(),
                t = ot(),
                n = ot(),
                a = Ye({
                    top: 0,
                    left: 0,
                    width: 1920,
                    height: 1080,
                    filter: "none"
                });

            function l(e) {
                for (let t in e) a[t] = e[t]
            }
            async function s(e) {
                "landscape" === e ? l({
                    left: 0,
                    top: 0,
                    width: 1920,
                    height: 1080
                }) : "portrait" === e ? l({
                    left: 540,
                    top: 0,
                    width: 640,
                    height: 1080
                }) : "selfie" === e && l({
                    left: 400,
                    top: 240,
                    width: 640,
                    height: 640
                }), o()
            }

            function o() {
                const e = t.value,
                    l = e.getContext("2d"),
                    {
                        left: s,
                        top: o,
                        width: r,
                        height: i,
                        filter: c
                    } = a;
                e.width = r, e.height = i, l.filter = c, l.drawImage(n.value, s, o, r, i, 0, 0, r, i)
            }
            return bn((() => {
                const a = t.value.getContext("2d");
                var l;
                a instanceof CanvasRenderingContext2D && (l = e.original, new Promise((e => {
                    const t = new Image(1920, 1080);
                    t.onload = () => e(t), t.src = URL.createObjectURL(l)
                }))).then((e => {
                    a.drawImage(e, 0, 0, 1920, 1080);
                    const t = new Image;
                    t.onload = () => n.value = t, t.src = a.canvas.toDataURL("image/jpeg", .8)
                }))
            })), Sn(n, (() => {
                s(e.formats[0])
            })), {
                canvasElement: t,
                crop: s,
                formats: e.formats,
                filters: {
                    Nenhum: "none",
                    Clarendon: "sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)",
                    Gingham: "contrast(1.1) brightness(1.1)",
                    Moon: "brightness(1.4) contrast(.95) saturate(0) sepia(.35)",
                    Lark: "sepia(.25) contrast(1.2) brightness(1.3) saturate(1.25)",
                    Reyes: "sepia(.75) contrast(.75) brightness(1.25) saturate(1.4)",
                    Juno: "sepia(.35) contrast(1.15) brightness(1.15) saturate(1.8)",
                    Slumber: "sepia(.35) contrast(1.25) saturate(1.25)",
                    Aden: "sepia(.2) brightness(1.15) saturate(1.4)",
                    Perpetua: "contrast(1.1) brightness(1.25) saturate(1.1)",
                    Mayfair: "contrast(1.1) brightness(1.15) saturate(1.1)",
                    Rise: "sepia(.25) contrast(1.25) brightness(1.2) saturate(.9)",
                    Hudson: "sepia(.25) contrast(1.2) brightness(1.2) saturate(1.05) hue-rotate(-15deg)",
                    Valencia: "sepia(.25) contrast(1.1) brightness(1.1)",
                    "X-Pro II": "sepia(.45) contrast(1.25) brightness(1.75) saturate(1.3) hue-rotate(-5deg)",
                    Willow: "brightness(1.2) contrast(.85) saturate(.05) sepia(.2)",
                    "Lo-Fi": "saturate(1.1) contrast(1.5)",
                    Inkwell: "brightness(1.25) contrast(.85) grayscale(1)",
                    Nashville: "sepia(.25) contrast(1.5) brightness(.9) hue-rotate(-15deg)"
                },
                setFilter: function(e) {
                    a.filter = e, o()
                },
                copyWithFilter: function(e) {
                    if (!n.value) return "null";
                    const {
                        left: t,
                        top: l,
                        width: s,
                        height: o
                    } = a, r = document.createElement("canvas"), i = r.getContext("2d");
                    return r.width = s, r.height = o, i.filter = e, i.drawImage(n.value, t, l, s, o, 0, 0, s, o), r.toDataURL("image/jpeg", .8)
                },
                discard: function() {
                    var t;
                    null == (t = e.ondiscard) || t.call(e), e.original = null
                },
                proceed: function() {
                    t.value.toBlob((t => {
                        var n;
                        null == (n = e.onproceed) || n.call(e, t), e.original = null
                    }), "image/jpeg", .8)
                }
            }
        }
    },
    Ko = {
        class: "h-full bg-black py-16 absolute inset-0 z-10"
    },
    Jo = Ea("h1", {
        class: "text-white text-center font-semibold mb-8"
    }, "Editor de Imagem", -1),
    Xo = {
        ref: "canvasElement",
        width: "1920",
        height: "1080",
        class: "mx-auto max-w-full max-h-80 border"
    },
    Yo = {
        class: "p-4"
    },
    Qo = Ea("label", {
        class: "text-white"
    }, "Formato", -1),
    Zo = {
        class: "flex mt-4"
    },
    er = {
        class: "p-4"
    },
    tr = Ea("label", {
        class: "text-white"
    }, "Filtros", -1),
    nr = {
        class: "flex mt-4 pb-4 overflow-x-auto fancy-scroll"
    },
    ar = {
        class: "text-white text-2xl mt-2"
    },
    lr = {
        class: "absolute bottom-12 left-2 right-2 flex justify-between"
    };
Wo.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", Ko, [Jo, Ea("canvas", Xo, null, 512), Ea("div", Yo, [Qo, Ea("div", Zo, [a.formats.includes("landscape") ? (ka(), _a("button", {
        key: 0,
        onClick: t[1] || (t[1] = e => a.crop("landscape")),
        class: "text-blue-500 border rounded-xl border-blue-500 px-4 py-2 flex-1"
    }, " Paisagem ")) : Oa("", !0), a.formats.includes("portrait") ? (ka(), _a("button", {
        key: 1,
        onClick: t[2] || (t[2] = e => a.crop("portrait")),
        class: "ml-4 text-blue-500 border rounded-xl border-blue-500 px-4 py-2 flex-1"
    }, " Retrato ")) : Oa("", !0), a.formats.includes("selfie") ? (ka(), _a("button", {
        key: 2,
        onClick: t[3] || (t[3] = e => a.crop("selfie")),
        class: "ml-4 text-blue-500 border rounded-xl border-blue-500 px-4 py-2 flex-1"
    }, " Selfie ")) : Oa("", !0)])]), Ea("div", er, [tr, Ea("div", nr, [(ka(!0), _a(ma, null, pl(a.filters, ((e, t) => (ka(), _a("div", {
        class: "w-32 flex-shrink-0 flex flex-col mr-3 last:mr-0 text-center",
        key: t,
        onClick: t => a.setFilter(e)
    }, [Ea("img", {
        class: "h-32",
        src: a.copyWithFilter(e)
    }, null, 8, ["src"]), Ea("span", ar, g(t), 1)], 8, ["onClick"])))), 128))])]), Ea("div", lr, [Ea("button", {
        class: "px-4 py-2 border border-red-500 text-red-500 rounded-xl",
        onClick: t[4] || (t[4] = (...e) => a.discard && a.discard(...e))
    }, "Descartar"), Ea("button", {
        class: "px-4 py-2 border border-blue-400 text-blue-400 rounded-xl",
        onClick: t[5] || (t[5] = (...e) => a.proceed && a.proceed(...e))
    }, "Salvar")])])
};
const sr = {
        props: ["callback"],
        inject: ["setKeepInput"],
        setup(e) {
            Ua("setDark")(), Ua("setKeepInput")(!0);
            const t = ot(),
                n = ot(0),
                a = ot(!1),
                l = document.createElement("canvas");
            l.width = 1280, l.height = 720;
            let s, o, r, i = new jo(l);

            function c() {
                s = setInterval((() => n.value += 1), 1e3), a.value = !0, n.value = 0;
                const e = [t.value.captureStream(24), lo.microphone.value];
                o = new MediaRecorder(new MediaStream(e.map((e => null == e ? void 0 : e.getTracks())).filter((e => e)).flat()), {
                    videoBitsPerSecond: 2e6
                }), o.start(), t.value.toBlob((e => r = e), "image/jpeg", .8)
            }

            function u() {
                clearInterval(s), a.value = !1, o.ondataavailable = t => {
                    r && Vo.uploadVideo(t.data).then((e => [e, r])).then(...e.callback)
                }, o.stop()
            }

            function d(e) {
                "Enter" === e.key && (a.value ? u() : c())
            }
            return bn((() => {
                i.onrender = e => {
                    const n = t.value;
                    n.getContext("2d").drawImage(e, 360, 0, e.width - 720, e.height, 0, 0, n.width, n.height)
                }
            })), lo.client.SetInVideoCall(!0), window.addEventListener("keydown", d), {
                video: t,
                duration: n,
                recording: a,
                view: i,
                start: c,
                stop: u,
                handler: d
            }
        },
        unmounted() {
            this.view.kill = !0, this.setKeepInput(!1), lo.client.SetInVideoCall(!1), window.removeEventListener("keydown", this.handler)
        }
    },
    or = ln("data-v-065406ae");
nn("data-v-065406ae");
const rr = {
        class: "flex flex-col h-full bg-theme"
    },
    ir = Ea("div", {
        class: "h-12"
    }, null, -1),
    cr = {
        class: "h-10 flex justify-center items-center"
    },
    ur = Ea("i", {
        class: "fas fa-circle text-red-600 text-sm"
    }, null, -1),
    dr = {
        class: "ml-2 text-theme"
    },
    pr = {
        width: "720",
        height: "1280",
        ref: "video"
    },
    fr = {
        class: "flex-1 relative flex justify-center items-center"
    },
    hr = Ea("i", {
        class: "fa fa-square text-4xl text-red-500"
    }, null, -1);
an();
const mr = or(((e, t, n, a, l, s) => (ka(), _a("div", rr, [ir, Ea("div", cr, [a.recording ? (ka(), _a(ma, {
    key: 0
}, [ur, Ea("span", dr, g(e.$filters.duration(a.duration)), 1)], 64)) : Oa("", !0)]), Ea("canvas", pr, null, 512), Ea("div", fr, [a.recording ? (ka(), _a("button", {
    key: 1,
    onClick: t[2] || (t[2] = (...e) => a.stop && a.stop(...e)),
    class: "absolute mx-auto w-24 h-24 bg-gray-300 rounded-full flex flex-center"
}, [hr])) : (ka(), _a("button", {
    key: 0,
    onClick: t[1] || (t[1] = (...e) => a.start && a.start(...e)),
    class: "absolute mx-auto w-24 h-24 bg-red-600 border-4 border-gray-300 rounded-full"
}))])]))));
sr.render = mr, sr.__scopeId = "data-v-065406ae";
/*!
 * vue-router v4.0.5
 * (c) 2021 Eduardo San Martin Morote
 * @license MIT
 */
const gr = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
    br = e => gr ? Symbol(e) : "_vr_" + e,
    vr = br("rvlm"),
    xr = br("rvd"),
    yr = br("r"),
    kr = br("rl"),
    wr = br("rvl"),
    _r = "undefined" != typeof window;
const Cr = Object.assign;

function Ar(e, t) {
    const n = {};
    for (const a in t) {
        const l = t[a];
        n[a] = Array.isArray(l) ? l.map(e) : e(l)
    }
    return n
}
let Sr = () => {};
const Pr = /\/$/;

function Tr(e, t, n = "/") {
    let a, l = {},
        s = "",
        o = "";
    const r = t.indexOf("?"),
        i = t.indexOf("#", r > -1 ? r : 0);
    return r > -1 && (a = t.slice(0, r), s = t.slice(r + 1, i > -1 ? i : t.length), l = e(s)), i > -1 && (a = a || t.slice(0, i), o = t.slice(i, t.length)), a = function(e, t) {
        // aqui nao tem undefined

        if (e.startsWith("/")) return e;
        if (!e) return t;
        const n = t.split("/"),
            a = e.split("/");
        let l, s, o = n.length - 1;
        for (l = 0; l < a.length; l++)
            if (s = a[l], 1 !== o && "." !== s) {
                if (".." !== s) break;
                o--
            } return n.slice(0, o).join("/") + "/" + a.slice(l - (l === a.length ? 1 : 0)).join("/")
    }(null != a ? a : t, n), {
        fullPath: a + (s && "?") + s + o,
        path: a,
        query: l,
        hash: o
    }
}

function Er(e, t) {
    return !t || e.toLowerCase().indexOf(t.toLowerCase()) ? e : e.slice(t.length) || "/"
}

function Rr(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t)
}

function Lr(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (let n in e)
        if (!Ir(e[n], t[n])) return !1;
    return !0
}

function Ir(e, t) {
    return Array.isArray(e) ? Or(e, t) : Array.isArray(t) ? Or(t, e) : e === t
}

function Or(e, t) {
    return Array.isArray(t) ? e.length === t.length && e.every(((e, n) => e === t[n])) : 1 === e.length && e[0] === t
}
var Dr, Nr, Mr, $r;

function Vr(e) {
    if (!e)
        if (_r) {
            const t = document.querySelector("base");
            e = (e = t && t.getAttribute("href") || "/").replace(/^\w+:\/\/[^\/]+/, "")
        } else e = "/";
    return "/" !== e[0] && "#" !== e[0] && (e = "/" + e), e.replace(Pr, "")
}(Nr = Dr || (Dr = {})).pop = "pop", Nr.push = "push", ($r = Mr || (Mr = {})).back = "back", $r.forward = "forward", $r.unknown = "";
const Ur = /^[^#]+#/;

function jr(e, t) {
    return e.replace(Ur, "#") + t
}
const Fr = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset
});

function Br(e) {
    let t;
    if ("el" in e) {
        let n = e.el;

        const a = "string" == typeof n && n.startsWith("#"),
            l = "string" == typeof n ? a ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
        if (!l) return;
        t = function(e, t) {
            const n = document.documentElement.getBoundingClientRect(),
                a = e.getBoundingClientRect();
            return {
                behavior: t.behavior,
                left: a.left - n.left - (t.left || 0),
                top: a.top - n.top - (t.top || 0)
            }
        }(l, e)
    } else t = e;
    "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(null != t.left ? t.left : window.pageXOffset, null != t.top ? t.top : window.pageYOffset)
}

function Hr(e, t) {
    return (history.state ? history.state.position - t : -1) + e
}
const Gr = new Map;

function qr(e, t) {
    const {
        pathname: n,
        search: a,
        hash: l
    } = t;
    if (e.indexOf("#") > -1) {
        let e = l.slice(1);
        return "/" !== e[0] && (e = "/" + e), Er(e, "")
    }
    return Er(n, e) + a + l
}

function zr(e, t, n, a = !1, l = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: a,
        position: window.history.length,
        scroll: l ? Fr() : null
    }
}

function Wr(e) {
    const {
        history: t,
        location: n
    } = window;
    let a = {
            value: qr(e, n)
        },
        l = {
            value: t.state
        };

    function s(a, s, o) {
        const r = e.indexOf("#"),
            i = r > -1 ? (n.host && document.querySelector("base") ? e : e.slice(r)) + a : location.protocol + "//" + location.host + e + a;
        try {
            t[o ? "replaceState" : "pushState"](s, "", i), l.value = s
        } catch (c) {
            console.error(c), n[o ? "replace" : "assign"](i)
        }
    }
    return l.value || s(a.value, {
        back: null,
        current: a.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null
    }, !0), {
        location: a,
        state: l,
        push: function(e, n) {
            const o = Cr({}, l.value, t.state, {
                forward: e,
                scroll: Fr()
            });
            s(o.current, o, !0), s(e, Cr({}, zr(a.value, e, null), {
                position: o.position + 1
            }, n), !1), a.value = e
        },
        replace: function(e, n) {
            s(e, Cr({}, t.state, zr(l.value.back, e, l.value.forward, !0), n, {
                position: l.value.position
            }), !0), a.value = e
        }
    }
}

function Kr(e) {
    const t = Wr(e = Vr(e)),
        n = function(e, t, n, a) {
            let l = [],
                s = [],
                o = null;
            const r = ({
                state: s
            }) => {
                const r = qr(e, location),
                    i = n.value,
                    c = t.value;
                let u = 0;
                if (s) {
                    if (n.value = r, t.value = s, o && o === i) return void(o = null);
                    u = c ? s.position - c.position : 0
                } else a(r);
                l.forEach((e => {
                    e(n.value, i, {
                        delta: u,
                        type: Dr.pop,
                        direction: u ? u > 0 ? Mr.forward : Mr.back : Mr.unknown
                    })
                }))
            };

            function i() {
                const {
                    history: e
                } = window;
                e.state && e.replaceState(Cr({}, e.state, {
                    scroll: Fr()
                }), "")
            }
            return window.addEventListener("popstate", r), window.addEventListener("beforeunload", i), {
                pauseListeners: function() {
                    o = n.value
                },
                listen: function(e) {
                    l.push(e);
                    const t = () => {
                        const t = l.indexOf(e);
                        t > -1 && l.splice(t, 1)
                    };
                    return s.push(t), t
                },
                destroy: function() {
                    for (const e of s) e();
                    s = [], window.removeEventListener("popstate", r), window.removeEventListener("beforeunload", i)
                }
            }
        }(e, t.state, t.location, t.replace);
    const a = Cr({
        location: "",
        base: e,
        go: function(e, t = !0) {
            t || n.pauseListeners(), history.go(e)
        },
        createHref: jr.bind(null, e)
    }, t, n);
    return Object.defineProperty(a, "location", {
        get: () => t.location.value
    }), Object.defineProperty(a, "state", {
        get: () => t.state.value
    }), a
}

function Jr(e) {
    return "string" == typeof e || "symbol" == typeof e
}
const Xr = {
        path: "/",
        name: void 0,
        params: {},
        query: {},
        hash: "",
        fullPath: "/",
        matched: [],
        meta: {},
        redirectedFrom: void 0
    },
    Yr = br("nf");
var Qr, Zr;

function ei(e, t) {
    return Cr(new Error, {
        type: e,
        [Yr]: !0
    }, t)
}

function ti(e, t) {
    return e instanceof Error && Yr in e && (null == t || !!(e.type & t))
}(Zr = Qr || (Qr = {}))[Zr.aborted = 4] = "aborted", Zr[Zr.cancelled = 8] = "cancelled", Zr[Zr.duplicated = 16] = "duplicated";
const ni = {
        sensitive: !1,
        strict: !1,
        start: !0,
        end: !0
    },
    ai = /[.+*?^${}()[\]/\\]/g;

function li(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length;) {
        const a = t[n] - e[n];
        if (a) return a;
        n++
    }
    return e.length < t.length ? 1 === e.length && 80 === e[0] ? -1 : 1 : e.length > t.length ? 1 === t.length && 80 === t[0] ? 1 : -1 : 0
}

function si(e, t) {
    let n = 0;
    const a = e.score,
        l = t.score;
    for (; n < a.length && n < l.length;) {
        const e = li(a[n], l[n]);
        if (e) return e;
        n++
    }
    return l.length - a.length
}
const oi = {
        type: 0,
        value: ""
    },
    ri = /[a-zA-Z0-9_]/;

function ii(e, t, n) {
    const a = function(e, t) {
            const n = Cr({}, ni, t);
            let a = [],
                l = n.start ? "^" : "";
            const s = [];
            for (const i of e) {
                const e = i.length ? [] : [90];
                n.strict && !i.length && (l += "/");
                for (let t = 0; t < i.length; t++) {
                    const a = i[t];
                    let o = 40 + (n.sensitive ? .25 : 0);
                    if (0 === a.type) t || (l += "/"), l += a.value.replace(ai, "\\$&"), o += 40;
                    else if (1 === a.type) {
                        const {
                            value: e,
                            repeatable: n,
                            optional: c,
                            regexp: u
                        } = a;
                        s.push({
                            name: e,
                            repeatable: n,
                            optional: c
                        });
                        const d = u || "[^/]+?";
                        if ("[^/]+?" !== d) {
                            o += 10;
                            try {
                                new RegExp(`(${d})`)
                            } catch (r) {
                                throw new Error(`Invalid custom RegExp for param "${e}" (${d}): ` + r.message)
                            }
                        }
                        let p = n ? `((?:${d})(?:/(?:${d}))*)` : `(${d})`;
                        t || (p = c && i.length < 2 ? `(?:/${p})` : "/" + p), c && (p += "?"), l += p, o += 20, c && (o += -8), n && (o += -20), ".*" === d && (o += -50)
                    }
                    e.push(o)
                }
                a.push(e)
            }
            if (n.strict && n.end) {
                const e = a.length - 1;
                a[e][a[e].length - 1] += .7000000000000001
            }
            n.strict || (l += "/?"), n.end ? l += "$" : n.strict && (l += "(?:/|$)");
            const o = new RegExp(l, n.sensitive ? "" : "i");
            return {
                re: o,
                score: a,
                keys: s,
                parse: function(e) {
                    const t = e.match(o),
                        n = {};
                    if (!t) return null;
                    for (let a = 1; a < t.length; a++) {
                        const e = t[a] || "",
                            l = s[a - 1];
                        n[l.name] = e && l.repeatable ? e.split("/") : e
                    }
                    return n
                },
                stringify: function(t) {
                    let n = "",
                        a = !1;
                    for (const l of e) {
                        a && n.endsWith("/") || (n += "/"), a = !1;
                        for (const e of l)
                            if (0 === e.type) n += e.value;
                            else if (1 === e.type) {
                            const {
                                value: s,
                                repeatable: o,
                                optional: r
                            } = e, i = s in t ? t[s] : "";
                            if (Array.isArray(i) && !o) throw new Error(`Provided param "${s}" is an array but it is not repeatable (* or + modifiers)`);
                            const c = Array.isArray(i) ? i.join("/") : i;
                            if (!c) {
                                if (!r) throw new Error(`Missing required param "${s}"`);
                                l.length < 2 && (n.endsWith("/") ? n = n.slice(0, -1) : a = !0)
                            }
                            n += c
                        }
                    }
                    return n
                }
            }
        }(function(e) {
            if (!e) return [
                []
            ];
            if ("/" === e) return [
                [oi]
            ];

            if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);

            function t(e) {
                throw new Error(`ERR (${n})/"${c}": ${e}`)
            }
            let n = 0,
                a = n;
            const l = [];
            let s;

            function o() {
                s && l.push(s), s = []
            }
            let r, i = 0,
                c = "",
                u = "";

            function d() {
                c && (0 === n ? s.push({
                    type: 0,
                    value: c
                }) : 1 === n || 2 === n || 3 === n ? (s.length > 1 && ("*" === r || "+" === r) && t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`), s.push({
                    type: 1,
                    value: c,
                    regexp: u,
                    repeatable: "*" === r || "+" === r,
                    optional: "*" === r || "?" === r
                })) : t("Invalid state to consume buffer"), c = "")
            }

            function p() {
                c += r
            }
            for (; i < e.length;)
                if (r = e[i++], "\\" !== r || 2 === n) switch (n) {
                    case 0:
                        "/" === r ? (c && d(), o()) : ":" === r ? (d(), n = 1) : p();
                        break;
                    case 4:
                        p(), n = a;
                        break;
                    case 1:
                        "(" === r ? n = 2 : ri.test(r) ? p() : (d(), n = 0, "*" !== r && "?" !== r && "+" !== r && i--);
                        break;
                    case 2:
                        ")" === r ? "\\" == u[u.length - 1] ? u = u.slice(0, -1) + r : n = 3 : u += r;
                        break;
                    case 3:
                        d(), n = 0, "*" !== r && "?" !== r && "+" !== r && i--, u = "";
                        break;
                    default:
                        t("Unknown state")
                } else a = n, n = 4;
            return 2 === n && t(`Unfinished custom RegExp for param "${c}"`), d(), o(), l
        }(e.path), n),
        l = Cr(a, {
            record: e,
            parent: t,
            children: [],
            alias: []
        });
    return t && !l.record.aliasOf == !t.record.aliasOf && t.children.push(l), l
}

function ci(e, t) {
    const n = [],
        a = new Map;

    function l(e, n, a) {
        let r = !a,
            i = function(e) {
                return {
                    path: e.path,
                    redirect: e.redirect,
                    name: e.name,
                    meta: e.meta || {},
                    aliasOf: void 0,
                    beforeEnter: e.beforeEnter,
                    props: ui(e),
                    children: e.children || [],
                    instances: {},
                    leaveGuards: new Set,
                    updateGuards: new Set,
                    enterCallbacks: {},
                    components: "components" in e ? e.components || {} : {
                        default: e.component
                    }
                }
            }(e);
        i.aliasOf = a && a.record;
        const c = fi(t, e),
            u = [i];
        if ("alias" in e) {
            const t = "string" == typeof e.alias ? [e.alias] : e.alias;
            for (const e of t) u.push(Cr({}, i, {
                components: a ? a.record.components : i.components,
                path: e,
                aliasOf: a ? a.record : i
            }))
        }
        let d, p;
        for (const t of u) {
            let {
                path: u
            } = t;
            if (n && "/" !== u[0]) {
                let e = n.record.path,
                    a = "/" === e[e.length - 1] ? "" : "/";
                t.path = n.record.path + (u && a + u)
            }
            if (d = ii(t, n, c), a ? a.alias.push(d) : (p = p || d, p !== d && p.alias.push(d), r && e.name && !di(d) && s(e.name)), "children" in i) {
                let e = i.children;
                for (let t = 0; t < e.length; t++) l(e[t], d, a && a.children[t])
            }
            a = a || d, o(d)
        }
        return p ? () => {
            s(p)
        } : Sr
    }

    function s(e) {
        if (Jr(e)) {
            const t = a.get(e);
            t && (a.delete(e), n.splice(n.indexOf(t), 1), t.children.forEach(s), t.alias.forEach(s))
        } else {
            let t = n.indexOf(e);
            t > -1 && (n.splice(t, 1), e.record.name && a.delete(e.record.name), e.children.forEach(s), e.alias.forEach(s))
        }
    }

    function o(e) {
        let t = 0;
        for (; t < n.length && si(e, n[t]) >= 0;) t++;
        n.splice(t, 0, e), e.record.name && !di(e) && a.set(e.record.name, e)
    }
    return t = fi({
        strict: !1,
        end: !0,
        sensitive: !1
    }, t), e.forEach((e => l(e))), {
        addRoute: l,
        resolve: function(e, t) {
            let l, s, o, r = {};
            if ("name" in e && e.name) {
                if (l = a.get(e.name), !l) throw ei(1, {
                    location: e
                });
                o = l.record.name, r = Cr(function(e, t) {
                    let n = {};
                    for (let a of t) a in e && (n[a] = e[a]);
                    return n
                }(t.params, l.keys.filter((e => !e.optional)).map((e => e.name))), e.params), s = l.stringify(r)
            } else if ("path" in e) s = e.path, l = n.find((e => e.re.test(s))), l && (r = l.parse(s), o = l.record.name);
            else {
                if (l = t.name ? a.get(t.name) : n.find((e => e.re.test(t.path))), !l) throw ei(1, {
                    location: e,
                    currentLocation: t
                });
                o = l.record.name, r = Cr({}, t.params, e.params), s = l.stringify(r)
            }
            const i = [];
            let c = l;
            for (; c;) i.unshift(c.record), c = c.parent;
            return {
                name: o,
                path: s,
                params: r,
                matched: i,
                meta: pi(i)
            }
        },
        removeRoute: s,
        getRoutes: function() {
            return n
        },
        getRecordMatcher: function(e) {
            return a.get(e)
        }
    }
}

function ui(e) {
    const t = {},
        n = e.props || !1;
    if ("component" in e) t.default = n;
    else
        for (let a in e.components) t[a] = "boolean" == typeof n ? n : n[a];
    return t
}

function di(e) {
    for (; e;) {
        if (e.record.aliasOf) return !0;
        e = e.parent
    }
    return !1
}

function pi(e) {
    return e.reduce(((e, t) => Cr(e, t.meta)), {})
}

function fi(e, t) {
    let n = {};
    for (let a in e) n[a] = a in t ? t[a] : e[a];
    return n
}
const hi = /#/g,
    mi = /&/g,
    gi = /\//g,
    bi = /=/g,
    vi = /\?/g,
    xi = /\+/g,
    yi = /%5B/g,
    ki = /%5D/g,
    wi = /%5E/g,
    _i = /%60/g,
    Ci = /%7B/g,
    Ai = /%7C/g,
    Si = /%7D/g,
    Pi = /%20/g;

function Ti(e) {
    return encodeURI("" + e).replace(Ai, "|").replace(yi, "[").replace(ki, "]")
}

function Ei(e) {
    return Ti(e).replace(xi, "%2B").replace(Pi, "+").replace(hi, "%23").replace(mi, "%26").replace(_i, "`").replace(Ci, "{").replace(Si, "}").replace(wi, "^")
}

function Ri(e) {
    return function(e) {
        return Ti(e).replace(hi, "%23").replace(vi, "%3F")
    }(e).replace(gi, "%2F")
}

function Li(e) {
    try {
        return decodeURIComponent("" + e)
    } catch (t) {}
    return "" + e
}

function Ii(e) {
    const t = {};
    if ("" === e || "?" === e) return t;
    const n = ("?" === e[0] ? e.slice(1) : e).split("&");
    for (let a = 0; a < n.length; ++a) {
        const e = n[a].replace(xi, " ");
        let l = e.indexOf("="),
            s = Li(l < 0 ? e : e.slice(0, l)),
            o = l < 0 ? null : Li(e.slice(l + 1));
        if (s in t) {
            let e = t[s];
            Array.isArray(e) || (e = t[s] = [e]), e.push(o)
        } else t[s] = o
    }
    return t
}

function Oi(e) {
    let t = "";
    for (let n in e) {
        t.length && (t += "&");
        const a = e[n];
        if (n = Ei(n).replace(bi, "%3D"), null == a) {
            void 0 !== a && (t += n);
            continue
        }
        let l = Array.isArray(a) ? a.map((e => e && Ei(e))) : [a && Ei(a)];
        for (let e = 0; e < l.length; e++) t += (e ? "&" : "") + n, null != l[e] && (t += "=" + l[e])
    }
    return t
}

function Di(e) {
    const t = {};
    for (let n in e) {
        let a = e[n];
        void 0 !== a && (t[n] = Array.isArray(a) ? a.map((e => null == e ? null : "" + e)) : null == a ? a : "" + a)
    }
    return t
}

function Ni() {
    let e = [];
    return {
        add: function(t) {
            return e.push(t), () => {
                const n = e.indexOf(t);
                n > -1 && e.splice(n, 1)
            }
        },
        list: () => e,
        reset: function() {
            e = []
        }
    }
}

function Mi(e, t, n, a, l) {
    const s = a && (a.enterCallbacks[l] = a.enterCallbacks[l] || []);
    return () => new Promise(((o, r) => {
        const i = e => {
                var i;
                !1 === e ? r(ei(4, {
                    from: n,
                    to: t
                })) : e instanceof Error ? r(e) : "string" == typeof(i = e) || i && "object" == typeof i ? r(ei(2, {
                    from: t,
                    to: e
                })) : (s && a.enterCallbacks[l] === s && "function" == typeof e && s.push(e), o())
            },
            c = e.call(a && a.instances[l], t, n, i);
        let u = Promise.resolve(c);
        e.length < 3 && (u = u.then(i)), u.catch((e => r(e)))
    }))
}

function $i(e, t, n, a) {
    const l = [];
    for (const o of e)
        for (const e in o.components) {
            let r = o.components[e];
            if ("beforeRouteEnter" === t || o.instances[e])
                if ("object" == typeof(s = r) || "displayName" in s || "props" in s || "__vccOpts" in s) {
                    const s = (r.__vccOpts || r)[t];
                    s && l.push(Mi(s, n, a, o, e))
                } else {
                    let s = r();
                    s = s.catch(console.error), l.push((() => s.then((l => {
                        if (!l) return Promise.reject(new Error(`Couldn't resolve component "${e}" at "${o.path}"`));
                        const s = (r = l).__esModule || gr && "Module" === r[Symbol.toStringTag] ? l.default : l;
                        var r;
                        o.components[e] = s;
                        const i = (s.__vccOpts || s)[t];
                        return i && Mi(i, n, a, o, e)()
                    }))))
                }
        }
    var s;
    return l
}

function Vi(e) {
    const t = Ua(yr),
        n = Ua(kr),
        a = ul((() => t.resolve(ct(e.to)))),
        l = ul((() => {
            let {
                matched: e
            } = a.value, {
                length: t
            } = e;
            const l = e[t - 1];
            let s = n.matched;
            if (!l || !s.length) return -1;
            let o = s.findIndex(Rr.bind(null, l));
            if (o > -1) return o;
            let r = ji(e[t - 2]);
            return t > 1 && ji(l) === r && s[s.length - 1].path !== r ? s.findIndex(Rr.bind(null, e[t - 2])) : o
        })),
        s = ul((() => l.value > -1 && function(e, t) {
            for (let n in t) {
                let a = t[n],
                    l = e[n];
                if ("string" == typeof a) {
                    if (a !== l) return !1
                } else if (!Array.isArray(l) || l.length !== a.length || a.some(((e, t) => e !== l[t]))) return !1
            }
            return !0
        }(n.params, a.value.params))),
        o = ul((() => l.value > -1 && l.value === n.matched.length - 1 && Lr(n.params, a.value.params)));
    return {
        route: a,
        href: ul((() => a.value.href)),
        isActive: s,
        isExactActive: o,
        navigate: function(n = {}) {
            return function(e) {
                if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
                if (e.defaultPrevented) return;
                if (void 0 !== e.button && 0 !== e.button) return;
                if (e.currentTarget && e.currentTarget.getAttribute) {
                    const t = e.currentTarget.getAttribute("target");
                    if (/\b_blank\b/i.test(t)) return
                }
                e.preventDefault && e.preventDefault();
                return !0
            }(n) ? t[ct(e.replace) ? "replace" : "push"](ct(e.to)) : Promise.resolve()
        }
    }
}
const Ui = na({
    name: "RouterLink",
    props: {
        to: {
            type: [String, Object],
            required: !0
        },
        replace: Boolean,
        activeClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: "page"
        }
    },
    setup(e, {
        slots: t,
        attrs: n
    }) {
        const a = Ye(Vi(e)),
            {
                options: l
            } = Ua(yr),
            s = ul((() => ({
                [Fi(e.activeClass, l.linkActiveClass, "router-link-active")]: a.isActive,
                [Fi(e.exactActiveClass, l.linkExactActiveClass, "router-link-exact-active")]: a.isExactActive
            })));
        return () => {
            const l = t.default && t.default(a);
            return e.custom ? l : dl("a", Cr({
                "aria-current": a.isExactActive ? e.ariaCurrentValue : null,
                onClick: a.navigate,
                href: a.href
            }, n, {
                class: s.value
            }), l)
        }
    }
});

function ji(e) {
    return e ? e.aliasOf ? e.aliasOf.path : e.path : ""
}
const Fi = (e, t, n) => null != e ? e : null != t ? t : n;

function Bi(e, t) {
    if (!e) return null;
    const n = e(t);
    return 1 === n.length ? n[0] : n
}
const Hi = na({
    name: "RouterView",
    inheritAttrs: !1,
    props: {
        name: {
            type: String,
            default: "default"
        },
        route: Object
    },
    setup(e, {
        attrs: t,
        slots: n
    }) {
        const a = Ua(wr),
            l = ul((() => e.route || a.value)),
            s = Ua(xr, 0),
            o = ul((() => l.value.matched[s]));
        Va(xr, s + 1), Va(vr, o), Va(wr, l);
        const r = ot();
        return Sn((() => [r.value, o.value, e.name]), (([e, t, n], [a, l, s]) => {
            t && (t.instances[n] = e, l && l !== t && e && e === a && (t.leaveGuards.size || (t.leaveGuards = l.leaveGuards), t.updateGuards.size || (t.updateGuards = l.updateGuards))), !e || !t || l && Rr(t, l) && a || (t.enterCallbacks[n] || []).forEach((t => t(e)))
        }), {
            flush: "post"
        }), () => {
            const a = l.value,
                s = o.value,
                i = s && s.components[e.name],
                c = e.name;
            if (!i) return Bi(n.default, {
                Component: i,
                route: a
            });
            const u = s.props[e.name],
                d = u ? !0 === u ? a.params : "function" == typeof u ? u(a) : u : null,
                p = dl(i, Cr({}, d, t, {
                    onVnodeUnmounted: e => {
                        e.component.isUnmounted && (s.instances[c] = null)
                    },
                    ref: r
                }));
            return Bi(n.default, {
                Component: p,
                route: a
            }) || p
        }
    }
});

function Gi(e) {
    return e.reduce(((e, t) => e.then((() => t()))), Promise.resolve())
}

function qi() {
    return Ua(yr)
}

function zi() {
    return Ua(kr)
}
const Wi = {
        setup() {
            const e = qi();
            let t = setInterval((() => {
                lo.identity.phone && (clearInterval(t), e.replace("/home"), lo.ready())
            }), 500)
        }
    },
    Ki = ln("data-v-8a17276a");
nn("data-v-8a17276a");
const Ji = {
        class: "h-full bg-black text-white flex flex-col flex-center"
    },
    Xi = Ea("h1", {
        class: "text-6xl"
    }, "JesterOS", -1);
an();
const Yi = Ki(((e, t, n, a, l, s) => {
    const o = ua("app-loading");
    return ka(), _a("div", Ji, [Xi, Ea(o, {
        style: {
            filter: "invert(1)"
        }
    })])
}));
Wi.render = Yi, Wi.__scopeId = "data-v-8a17276a";
const Qi = ot(new Date);
setInterval((() => Qi.value.setTime(Date.now())), 1e3);
const Zi = {
        setup() {
            Ua("setDark")(!0);
            const {
                backgroundURL: e,
                settings: t,
                clock: n
            } = lo, a = ul((() => {
                const e = Qi.value;
                return `${e.getDate()} de ${Ds[e.getMonth()]} de ${e.getFullYear()}`
            })), l = Ks();
            return {
                settings: t,
                clock: n,
                fancyDate: a,
                top: l.filter((e => !e.bottom)),
                bottom: l.filter((e => e.bottom)),
                backgroundURL: e
            }
        }
    },
    ec = ln("data-v-69454f4a");
nn("data-v-69454f4a");
const tc = {
        key: 0,
        class: "mt-10 text-white text-8xl font-semibold text-center clock-text"
    },
    nc = {
        class: "text-2xl"
    },
    ac = {
        class: "text-lg app-name"
    },
    lc = {
        class: "py-6 px-10 grid grid-cols-4 gap-12"
    };
an();
const sc = ec(((e, t, n, a, l, s) => (ka(), _a("div", {
    class: "h-full p-4 pt-16 bg-cover",
    style: {
        backgroundImage: "url(" + a.backgroundURL + ")",
        backgroundPosition: "center",
        backgroundColor: "black"
    }
}, [a.settings.isAndroid ? (ka(), _a("div", tc, [Ea("p", null, g(a.clock.hours), 1), Ea("p", null, g(a.clock.minutes), 1), Ea("p", nc, g(a.fancyDate), 1)])) : Oa("", !0), Ea("div", {
    class: ["p-5 grid grid-cols-4 gap-0 absolute inset-x-4", {
        "bottom-48": a.settings.isAndroid
    }]
}, [(ka(!0), _a(ma, null, pl(a.top, (t => (ka(), _a("div", {
    key: t.name,
    app: "",
    onClick: n => e.$router.push(t.to),
    class: "text-white text-center text-lg pb-4"
}, [Ea("img", {
    class: "rounded-4xl p-2",
    src: t.icon,
    alt: ""
}, null, 8, ["src"]), Ea("span", ac, g(t.name), 1)], 8, ["onClick"])))), 128))], 2), Ea("div", {
    class: ["absolute bottom-4 inset-x-3 h-36", {
        "bottom-apps": !a.settings.isAndroid
    }]
}, [Ea("div", lc, [(ka(!0), _a(ma, null, pl(a.bottom, (t => (ka(), _a("div", {
    key: t.name,
    app: "",
    onClick: n => e.$router.push(t.to),
    class: "text-white text-center text-lg"
}, [Ea("img", {
    class: "rounded-3xl",
    src: t.icon,
    alt: ""
}, null, 8, ["src"])], 8, ["onClick"])))), 128))])], 2)], 4))));
Zi.render = sc, Zi.__scopeId = "data-v-69454f4a";
const oc = {
    default: "Padrão",
    s9: "S9",
    s20: "S20",
    iphonex: "iPhone X",
    mtfuji: "Mt. Fuji",
    taiwan: "Taiwan",
    firewatch: "Firewatch",
    moon: "Lua",
    vaporwave: "Vaporwave",
    custom: "Personalizado"
};
for (let BR in oc) oc[BR] = {
    name: oc[BR],
    url: lo.asset(`/stock/wallpapers/${BR}.webp`)
};
const rc = {};
for (let [BR, HR] of Object.entries(oc)) rc[BR] = HR.name;
const ic = {
        setup() {
            var e;
            const t = Ua("setDark");
            t();
            const {
                microphone: n,
                storage: a,
                identity: l,
                settings: s
            } = lo, o = Object.fromEntries([75, 80, 90, 100, 110, 120, 125, 133, 150, 166, 175, 200, 225, 233, 250].map((e => [e, e + "%"]))), {
                volume: r,
                doNotDisturb: i,
                darkTheme: c,
                anonymousCall: u
            } = a, d = ot(lo.backgroundURL);
            Sn(d, (e => {
                lo.backgroundURL = e, e === s.backgroundURL ? localStorage.removeItem("smartphone@background") : localStorage.setItem("smartphone@background", e)
            }));
            const p = ot(lo.backgroundURL === s.backgroundURL ? "default" : null != (e = function(e) {
                var t;
                return null == (t = Object.entries(oc).find((t => t[1].url === e))) ? void 0 : t[0]
            }(lo.backgroundURL)) ? e : "custom");
            return Sn(p, (e => {
                var t;
                d.value = "default" === e ? s.backgroundURL || lo.backgroundURL : "custom" !== e ? null == (t = oc[e]) ? void 0 : t.url : "Link da imagem"
            })), Sn(c, (e => t(e))), Sn((() => s.zoom), (e => {
                localStorage.setItem("smartphone@zoom", Number(e).toFixed(0)), lo.updateZoom()
            })), {
                settings: s,
                identity: l,
                backgroundType: p,
                backgroundURL: d,
                WallpapersOptions: rc,
                reset: function() {
                    r.value = 50, i.value = !1, localStorage.setItem("smartphone@zoom", "100"), s.zoom = 100, lo.updateZoom()
                },
                zoomOptions: o,
                storage: a,
                volume: r,
                doNotDisturb: i,
                darkTheme: c,
                anonymousCall: u,
                microphone: n,
                askForMicrophone: function() {
                    navigator.mediaDevices.getUserMedia({
                        audio: !0
                    }).then((e => {
                        n.value = e
                    }), (() => {}))
                }
            }
        }
    },
    cc = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    uc = {
        class: "h-32 pt-16 bg-theme-accent border-b border-theme"
    },
    dc = {
        key: 0,
        class: "far fa-arrow-left"
    },
    pc = {
        key: 1,
        class: "fas fa-chevron-left text-blue-500"
    },
    fc = {
        class: "flex-1 overflow-y-auto p-5"
    },
    hc = Ea("div", null, [Ea("i", {
        class: "fas fa-phone fa-3x text-blue-500"
    })], -1),
    mc = {
        class: "flex flex-col ml-5"
    },
    gc = {
        class: "mt-4"
    },
    bc = Ea("label", {
        class: "text-2xl"
    }, "Plano de fundo", -1),
    vc = {
        key: 0
    },
    xc = Ea("label", {
        class: "text-2xl"
    }, "URL", -1),
    yc = {
        class: "mt-3"
    },
    kc = Ea("label", {
        class: "text-2xl"
    }, "Zoom", -1),
    wc = {
        class: "my-6"
    },
    _c = Ea("label", {
        class: "text-2xl"
    }, "Som em notificações", -1),
    Cc = Ea("hr", {
        class: "border-theme"
    }, null, -1),
    Ac = {
        class: "mt-4 flex items-center justify-between"
    },
    Sc = Ea("label", {
        class: "text-3xl"
    }, "Modo escuro", -1),
    Pc = {
        class: "mt-6 flex items-center justify-between"
    },
    Tc = Ea("label", {
        class: "text-3xl"
    }, "Não perturbe", -1),
    Ec = {
        class: "mt-6 flex items-center justify-between"
    },
    Rc = Ea("label", {
        class: "text-3xl"
    }, "Ligação anônima", -1),
    Lc = Ea("i", {
        class: "fas fa-microphone text-4xl"
    }, null, -1);
ic.render = function(e, t, n, a, l, s) {
    const o = ua("app-select"),
        r = ua("app-input"),
        i = ua("app-toggle");
    return ka(), _a("div", cc, [Ea("div", uc, [Ea("button", {
        onClick: t[1] || (t[1] = t => e.$router.back()),
        class: "absolute top-16 left-0 px-4"
    }, [a.settings.isAndroid ? (ka(), _a("i", dc)) : (ka(), _a("i", pc))]), Ea("h1", {
        class: ["font-bold", [a.settings.isAndroid ? "ml-16" : "text-center"]]
    }, "Configurações", 2)]), Ea("div", fc, [Ea("div", {
        class: ["p-5 shadow-lg rounded-2xl flex", [a.darkTheme ? "bg-gray-900" : "bg-gray-200"]]
    }, [hc, Ea("div", mc, [Ea("h1", null, g(a.identity.name + " " + a.identity.firstname), 1), Ea("h1", null, g(a.identity.phone), 1)])], 2), Ea("div", gc, [bc, Ea(o, {
        options: a.WallpapersOptions,
        class: "text-3xl bg-theme border-theme",
        modelValue: a.backgroundType,
        "onUpdate:modelValue": t[2] || (t[2] = e => a.backgroundType = e)
    }, null, 8, ["options", "modelValue"])]), "custom" === a.backgroundType ? (ka(), _a("div", vc, [xc, Ea(r, {
        class: "text-3xl bg-theme border-theme",
        modelValue: a.backgroundURL,
        "onUpdate:modelValue": t[3] || (t[3] = e => a.backgroundURL = e)
    }, null, 8, ["modelValue"])])) : Oa("", !0), Ea("div", yc, [kc, Ea(o, {
        class: "text-3xl bg-theme border-theme",
        modelValue: a.settings.zoom,
        "onUpdate:modelValue": t[4] || (t[4] = e => a.settings.zoom = e),
        options: a.zoomOptions
    }, null, 8, ["modelValue", "options"])]), Ea("div", wc, [_c, Yn(Ea("input", {
        "onUpdate:modelValue": t[5] || (t[5] = e => a.volume = e),
        type: "range",
        min: "0",
        max: "100",
        class: "block w-full"
    }, null, 512), [
        [ts, a.volume]
    ])]), Cc, Ea("div", Ac, [Sc, Ea(i, {
        modelValue: a.darkTheme,
        "onUpdate:modelValue": t[6] || (t[6] = e => a.darkTheme = e)
    }, null, 8, ["modelValue"])]), Ea("div", Pc, [Tc, Ea(i, {
        modelValue: a.doNotDisturb,
        "onUpdate:modelValue": t[7] || (t[7] = e => a.doNotDisturb = e)
    }, null, 8, ["modelValue"])]), Ea("div", Ec, [Rc, Ea(i, {
        modelValue: a.anonymousCall,
        "onUpdate:modelValue": t[8] || (t[8] = e => a.anonymousCall = e)
    }, null, 8, ["modelValue"])]), Ea("button", {
        class: "absolute bottom-8 text-red-500",
        onClick: t[9] || (t[9] = (...e) => a.reset && a.reset(...e))
    }, " Restaurar configurações "), a.microphone ? Oa("", !0) : (ka(), _a("button", {
        key: 1,
        class: "absolute bottom-8 right-8 text-red-500",
        onClick: t[10] || (t[10] = (...e) => a.askForMicrophone && a.askForMicrophone(...e))
    }, [Lc]))])])
};
const Ic = {
        props: {
            name: {
                required: !1,
                default: "Contatos"
            }
        }
    },
    Oc = {
        class: "h-32 pt-16 bg-theme-accent text-theme border-b border-theme text-center"
    },
    Dc = {
        class: "font-bold"
    };
Ic.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", Oc, [Ea("span", Dc, g(n.name), 1), Yt(e.$slots, "default")])
};
const Nc = {
        setup: () => ({
            hasServices: ul((() => {
                var e;
                return null == (e = lo.settings.services) ? void 0 : e.length
            }))
        })
    },
    Mc = {
        class: "flex-shrink-0 h-32 border-t border-theme bg-theme-accent text-theme px-5 flex items-center justify-between"
    },
    $c = Ea("i", {
        class: "fal fa-address-book text-5xl"
    }, null, -1),
    Vc = Ea("span", {
        class: "block text-lg"
    }, "Contatos", -1),
    Uc = Ea("i", {
        class: "fal fa-wrench text-5xl"
    }, null, -1),
    jc = Ea("span", {
        class: "block text-lg"
    }, "Serviços", -1),
    Fc = Ea("i", {
        class: "fas fa-th text-5xl"
    }, null, -1),
    Bc = Ea("span", {
        class: "block text-lg"
    }, "Teclado", -1),
    Hc = Ea("i", {
        class: "fal fa-clock text-5xl"
    }, null, -1),
    Gc = Ea("span", {
        class: "block text-lg"
    }, "Recentes", -1),
    qc = Ea("i", {
        class: "far fa-ban text-5xl"
    }, null, -1),
    zc = Ea("span", {
        class: "block text-lg"
    }, "Bloqueios", -1);
Nc.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", Mc, [Ea("button", {
        class: ["text-center p-5", {
            "text-blue-500": "/contacts" == e.$route.path
        }],
        onClick: t[1] || (t[1] = t => e.$router.replace("/contacts"))
    }, [$c, Vc], 2), a.hasServices ? (ka(), _a("button", {
        key: 0,
        class: ["text-center p-5", {
            "text-blue-500": "/contacts/services" == e.$route.path
        }],
        onClick: t[2] || (t[2] = t => e.$router.replace("/contacts/services"))
    }, [Uc, jc], 2)) : Oa("", !0), Ea("button", {
        class: ["text-center p-5", {
            "text-blue-500": "/contacts/dial" == e.$route.path
        }],
        onClick: t[3] || (t[3] = t => e.$router.replace("/contacts/dial"))
    }, [Fc, Bc], 2), Ea("button", {
        class: ["text-center p-5", {
            "text-blue-500": "/contacts/history" == e.$route.path
        }],
        onClick: t[4] || (t[4] = t => e.$router.replace("/contacts/history"))
    }, [Hc, Gc], 2), Ea("button", {
        class: ["text-center p-5", {
            "text-blue-500": "/contacts/blocks" == e.$route.path
        }],
        onClick: t[5] || (t[5] = t => e.$router.replace("/contacts/blocks"))
    }, [qc, zc], 2)])
};
const Wc = {
        components: {
            Header: Ic,
            Footer: Nc
        },
        setup() {
            Ua("setDark")();
            const e = ot("main"),
                t = ot(""),
                n = lo.identity.phone,
                a = lo.settings.videoServer,
                l = ul((() => lo.contacts.value.filter((e => !t.value || (e.name.toLowerCase().includes(t.value.toLowerCase()) || e.phone.includes(t.value)))).map((e => (e.blocked = lo.settings.blocks.includes(e.phone), e)))));
            return {
                query: t,
                myPhone: n,
                view: e,
                contacts: l,
                createCall: function(e, t) {
                    lo.pusher.emit("CALL_TO", e.phone, t)
                },
                removeContact: function(e) {
                    lo.backend.removeContact(e.id), lo.contacts.value = lo.contacts.value.filter((t => t.id != e.id))
                },
                blockContact: function(e) {
                    lo.backend.block(e.phone).then((() => {
                        lo.settings.blocks.push(e.phone)
                    }))
                },
                supportsVideoCall: a
            }
        }
    },
    Kc = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    Jc = Ea("i", {
        class: "far fa-plus text-blue-400"
    }, null, -1),
    Xc = {
        class: "flex-shrink-0 p-5"
    },
    Yc = {
        class: "flex-1 overflow-y-auto hide-scroll px-5"
    },
    Qc = {
        class: "flex-1 flex justify-between text-xl pb-2"
    },
    Zc = {
        class: "flex-1 flex flex-col justify-between"
    },
    eu = {
        class: "text-3xl"
    },
    tu = {
        class: "text-2xl text-gray-500"
    },
    nu = Ea("i", {
        class: "fab fa-whatsapp text-green-500 text-2xl"
    }, null, -1),
    au = Ea("i", {
        class: "far fa-phone pl-5 text-lightBlue-400 text-2xl"
    }, null, -1),
    lu = Ea("i", {
        class: "far fa-video pl-5 text-blue-700 text-2xl"
    }, null, -1),
    su = Ea("i", {
        class: "far fa-pencil pl-5 text-blue-500 text-2xl"
    }, null, -1),
    ou = Ea("i", {
        class: "far fa-ban pl-5 text-red-500 text-2xl"
    }, null, -1),
    ru = Ea("i", {
        class: "far fa-trash-alt pl-5 text-red-500 text-2xl"
    }, null, -1);
Wc.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("Footer");
    return ka(), _a("div", Kc, [Ea(o, null, {
        default: Zt((() => [Ea("button", {
            onClick: t[1] || (t[1] = t => e.$router.push("/contacts/create")),
            class: "absolute right-6"
        }, [Jc])])),
        _: 1
    }), Ea("div", Xc, [Yn(Ea("input", {
        "onUpdate:modelValue": t[2] || (t[2] = e => a.query = e),
        class: "w-full px-5 py-2 border border-theme rounded-full text-2xl bg-theme",
        placeholder: "Buscar"
    }, null, 512), [
        [ts, a.query]
    ])]), Ea("div", Yc, [Ea("ul", null, [(ka(!0), _a(ma, null, pl(a.contacts, (t => (ka(), _a("li", {
        key: t.id,
        class: "flex mt-3 border-b border-theme last:border-b-0"
    }, [Ea("div", Qc, [Ea("div", Zc, [Ea("h2", eu, g(t.name), 1), Ea("h3", tu, g(t.phone), 1)]), Ea("button", {
        onClick: n => e.$router.push("/whatsapp/" + t.phone)
    }, [nu], 8, ["onClick"]), Ea("button", {
        onClick: e => a.createCall(t)
    }, [au], 8, ["onClick"]), a.supportsVideoCall ? (ka(), _a("button", {
        key: 0,
        onClick: e => a.createCall(t, !0)
    }, [lu], 8, ["onClick"])) : Oa("", !0), Ea("button", {
        onClick: n => e.$router.push("/contacts/" + t.id)
    }, [su], 8, ["onClick"]), t.blocked ? Oa("", !0) : (ka(), _a("button", {
        key: 1,
        onClick: e => a.blockContact(t)
    }, [ou], 8, ["onClick"])), Ea("button", {
        onClick: e => a.removeContact(t)
    }, [ru], 8, ["onClick"])])])))), 128))])]), Ea(r)])
};
const iu = {
        components: {
            Header: Ic
        },
        setup() {
            Ua("setDark")();
            const e = qi(),
                t = Ua("alert"),
                n = Ye({
                    name: null,
                    phone: null
                });
            return {
                contact: n,
                save: function() {
                    return n.phone === lo.identity.phone ? t("Você não pode adicionar a si mesmo") : n.phone ? n.name ? void lo.backend.addContact(n.phone, n.name).then((n => {
                        n instanceof Object ? (lo.contacts.value.push(n), e.back(), lo.pusher.emit("ADD_CONTACT", n)) : t("Este telefone não existe!")
                    })) : t("Preencha o nome do contato") : t("Preencha o número de telefone")
                }
            }
        }
    },
    cu = {
        class: "flex flex-col h-full"
    },
    uu = Ea("i", {
        class: "far fa-user-plus text-blue-400"
    }, null, -1),
    du = {
        class: "flex-1 overflow-y-auto bg-theme text-theme p-5"
    },
    pu = Ea("label", {
        class: "text-xl"
    }, "Nome", -1),
    fu = {
        class: "mt-2"
    },
    hu = Ea("label", {
        class: "text-xl"
    }, "Telefone", -1);
iu.render = function(e, t, n, a, l, s) {
    const o = ua("Header");
    return ka(), _a("div", cu, [Ea(o, null, {
        default: Zt((() => [Ea("button", {
            onClick: t[1] || (t[1] = (...e) => a.save && a.save(...e)),
            class: "absolute top-16 right-4"
        }, [uu])])),
        _: 1
    }), Ea("div", du, [Ea("div", null, [pu, Yn(Ea("input", {
        type: "text",
        "onUpdate:modelValue": t[2] || (t[2] = e => a.contact.name = e),
        maxlength: "128",
        class: "w-full p-3 rounded-lg bg-theme border border-theme focus:border-blue-400"
    }, null, 512), [
        [ts, a.contact.name]
    ])]), Ea("div", fu, [hu, Yn(Ea("input", {
        type: "text",
        "onUpdate:modelValue": t[3] || (t[3] = e => a.contact.phone = e),
        maxlength: "12",
        class: "w-full p-3 rounded-lg bg-theme border border-theme focus:border-blue-400"
    }, null, 512), [
        [ts, a.contact.phone]
    ])])])])
};
const mu = {
        components: {
            Header: Ic
        },
        setup() {
            Ua("setDark")();
            const e = qi(),
                t = e.currentRoute.value,
                n = Ua("alert"),
                a = Ye({}),
                l = lo.contacts.value.find((e => e.id == t.params.id));
            return Object.assign(a, l), !l && e.back(), {
                contact: a,
                save: function() {
                    return a.phone === lo.identity.phone ? n("Você não pode adicionar a si mesmo") : a.phone ? a.name ? a.phone != l.phone && lo.contacts.value.some((e => e.phone == a.phone)) ? n("Você já possui um contato com este número") : void lo.backend.updateContact(a.id, a.phone, a.name).then((t => {
                        if (t.error) return n(t.error);
                        Object.assign(l, t), lo.sortContacts(), e.back()
                    })) : n("Preencha o nome do contato") : n("Preencha o número de telefone")
                }
            }
        }
    },
    gu = {
        class: "flex flex-col h-full"
    },
    bu = Ea("i", {
        class: "far fa-user-edit text-blue-400"
    }, null, -1),
    vu = {
        class: "flex-1 overflow-y-auto bg-theme text-theme p-5"
    },
    xu = Ea("label", {
        class: "text-xl"
    }, "Nome", -1),
    yu = {
        class: "mt-2"
    },
    ku = Ea("label", {
        class: "text-xl"
    }, "Telefone", -1);
mu.render = function(e, t, n, a, l, s) {
    const o = ua("Header");
    return ka(), _a("div", gu, [Ea(o, null, {
        default: Zt((() => [Ea("button", {
            onClick: t[1] || (t[1] = (...e) => a.save && a.save(...e)),
            class: "absolute top-16 right-4"
        }, [bu])])),
        _: 1
    }), Ea("div", vu, [Ea("div", null, [xu, Yn(Ea("input", {
        type: "text",
        "onUpdate:modelValue": t[2] || (t[2] = e => a.contact.name = e),
        maxlength: "128",
        class: "w-full p-3 rounded-lg bg-theme border border-theme focus:border-blue-400"
    }, null, 512), [
        [ts, a.contact.name]
    ])]), Ea("div", yu, [ku, Yn(Ea("input", {
        type: "text",
        "onUpdate:modelValue": t[3] || (t[3] = e => a.contact.phone = e),
        maxlength: "12",
        class: "w-full p-3 rounded-lg bg-theme border border-theme focus:border-blue-400"
    }, null, 512), [
        [ts, a.contact.phone]
    ])])])])
};
const wu = {
        components: {
            Header: Ic,
            Footer: Nc
        },
        setup() {
            Ua("setDark")();
            const e = ot(),
                t = Ua("alert"),
                n = ul((() => {
                    var e;
                    return null != (e = lo.settings.services) ? e : []
                }));
            return {
                serviceOffer: e,
                broadcastService: async function() {
                    const n = e.value;
                    if (!n.content) return t("Informe um motivo");
                    const a = await lo.getPlayerCoords();
                    lo.backend.service_request(n.service.number, n.content, a).then((n => {
                        (null == n ? void 0 : n.error) ? t(n.error): (e.value = null, t("Chamado efetuado."))
                    })), n.content = null
                },
                services: n
            }
        }
    },
    _u = {
        class: "flex flex-col h-full"
    },
    Cu = {
        class: "flex-1 overflow-y-auto hide-scroll bg-theme text-theme"
    },
    Au = {
        key: 0,
        class: "p-5"
    },
    Su = {
        class: "font-semibold"
    },
    Pu = {
        class: "mt-3"
    },
    Tu = Ea("label", {
        class: "text-2xl"
    }, "Motivo do chamado", -1),
    Eu = {
        class: "flex justify-between mt-2"
    },
    Ru = {
        key: 1
    },
    Lu = {
        class: "flex flex-col"
    },
    Iu = {
        class: "font-semibold"
    },
    Ou = {
        class: "text-gray-500 text-xl"
    },
    Du = {
        class: "ml-auto"
    };
wu.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("Footer");
    return ka(), _a("div", _u, [Ea(o, {
        name: "Serviços"
    }), Ea("div", Cu, [a.serviceOffer ? (ka(), _a("div", Au, [Ea("h1", Su, g(a.serviceOffer.service.name), 1), Ea("div", Pu, [Tu, Yn(Ea("textarea", {
        "onUpdate:modelValue": t[1] || (t[1] = e => a.serviceOffer.content = e),
        onKeydown: t[2] || (t[2] = cs(rs((() => {}), ["prevent"]), ["enter"])),
        class: "block w-full h-80 resize-none bg-theme border border-theme rounded-md p-2 fancy-scroll",
        maxlength: "200"
    }, null, 544), [
        [ts, a.serviceOffer.content]
    ])]), Ea("div", Eu, [Ea("button", {
        class: "block px-4 py-2 text-red-500",
        onClick: t[3] || (t[3] = e => a.serviceOffer = null)
    }, " Cancelar "), Ea("button", {
        class: "block px-4 py-2 text-blue-500",
        onClick: t[4] || (t[4] = (...e) => a.broadcastService && a.broadcastService(...e))
    }, " Enviar ")])])) : (ka(), _a("ul", Ru, [(ka(!0), _a(ma, null, pl(a.services, (e => (ka(), _a("li", {
        class: "border-b border-theme p-5 flex items-center",
        key: e.number
    }, [Ea("div", Lu, [Ea("h1", Iu, g(e.name), 1), Ea("h3", Ou, g(e.number), 1)]), Ea("div", Du, [Ea("i", {
        onClick: t => a.serviceOffer = {
            service: e
        },
        class: "fas fa-comment-alt-lines text-blue-500"
    }, null, 8, ["onClick"])])])))), 128))]))]), Ea(r)])
};
const Nu = {
        components: {
            Header: Ic,
            Footer: Nc
        },
        inject: ["setDark"],
        setup() {
            var e;
            Ua("setDark")();
            const t = Ua("prompt"),
                n = Ua("alert"),
                a = ot(null != (e = qi().currentRoute.value.query.phone) ? e : "");
            return {
                number: a,
                add: function(e) {
                    const t = lo.settings.phone_template || "XXX-XXX";
                    a.value.length < t.length && (a.value += e, a.value = function(e, t) {
                        let n = 0;
                        return e.replace(/X/g, (() => t[n++])).replace(/undefined/g, "").replace(/-$/, "")
                    }(t, a.value.match(/\d/g)))
                },
                save: async function() {
                    var e;
                    const l = null == (e = await t("Nome do contato")) ? void 0 : e.trim();
                    if (l) return a.value == lo.identity.phone ? n("Número inválido") : l.length > 128 ? n("Nome inválido") : void lo.backend.addContact(a.value, l).then((e => {
                        e instanceof Object ? (lo.contacts.value.push(e), a.value = "", lo.pusher.emit("ADD_CONTACT", e)) : n("Este número não existe")
                    }))
                },
                backspace: function() {
                    const e = a.value;
                    a.value = e.substr(0, Math.max(0, e.length - 1))
                },
                call: function(e = !1) {
                    if (!a.value || a.value == lo.identity.phone) return n("Número inválido");
                    lo.pusher.emit("CALL_TO", a.value, e)
                }
            }
        },
        activated() {
            this.setDark(!1)
        }
    },
    Mu = ln("data-v-a03b3120");
nn("data-v-a03b3120");
const $u = {
        class: "flex flex-col h-full bg-theme"
    },
    Vu = {
        class: "flex-1"
    },
    Uu = {
        class: "text-center w-3/4 mx-auto p-5 mt-24 mb-12"
    },
    ju = {
        class: "block text-6xl h-16 text-theme"
    },
    Fu = {
        class: "mx-16"
    },
    Bu = {
        class: "flex justify-between w-full"
    },
    Hu = {
        class: "flex justify-between w-full mt-4"
    },
    Gu = {
        class: "flex justify-between w-full mt-4"
    },
    qu = {
        class: "mt-4 flex justify-between w-full text-center"
    },
    zu = Ea("i", {
        class: "fal fa-user-plus"
    }, null, -1),
    Wu = Ea("i", {
        class: "fal fa-backspace"
    }, null, -1),
    Ku = {
        class: "grid grid-cols-3 gap-12 mt-4"
    },
    Ju = Ea("i", {
        class: "fas fa-video text-4xl"
    }, null, -1),
    Xu = Ea("i", {
        class: "fas fa-phone-alt text-4xl"
    }, null, -1);
an();
const Yu = Mu(((e, t, n, a, l, s) => {
    const o = ua("Header"),
        r = ua("Footer");
    return ka(), _a("div", $u, [Ea(o, {
        name: "Teclado"
    }), Ea("div", Vu, [Ea("div", Uu, [Ea("span", ju, g(a.number), 1)]), Ea("div", Fu, [Ea("div", Bu, [Ea("button", {
        number: "",
        onClick: t[1] || (t[1] = e => a.add(1))
    }, "1"), Ea("button", {
        number: "",
        onClick: t[2] || (t[2] = e => a.add(2))
    }, "2"), Ea("button", {
        number: "",
        onClick: t[3] || (t[3] = e => a.add(3))
    }, "3")]), Ea("div", Hu, [Ea("button", {
        number: "",
        onClick: t[4] || (t[4] = e => a.add(4))
    }, "4"), Ea("button", {
        number: "",
        onClick: t[5] || (t[5] = e => a.add(5))
    }, "5"), Ea("button", {
        number: "",
        onClick: t[6] || (t[6] = e => a.add(6))
    }, "6")]), Ea("div", Gu, [Ea("button", {
        number: "",
        onClick: t[7] || (t[7] = e => a.add(7))
    }, "7"), Ea("button", {
        number: "",
        onClick: t[8] || (t[8] = e => a.add(8))
    }, "8"), Ea("button", {
        number: "",
        onClick: t[9] || (t[9] = e => a.add(9))
    }, "9")]), Ea("div", qu, [Ea("button", {
        number: "",
        onClick: t[10] || (t[10] = e => a.save())
    }, [zu]), Ea("button", {
        number: "",
        onClick: t[11] || (t[11] = e => a.add(0))
    }, "0"), Ea("button", {
        number: "",
        onClick: t[12] || (t[12] = e => a.backspace())
    }, [Wu])]), Ea("div", Ku, [Ea("button", {
        number: "",
        class: "blue-gradient rounded-full text-white",
        onClick: t[13] || (t[13] = e => a.call(!0))
    }, [Ju]), Ea("button", {
        number: "",
        class: "green-gradient rounded-full text-white",
        onClick: t[14] || (t[14] = e => a.call())
    }, [Xu])])])]), Ea(r)])
}));
Nu.render = Yu, Nu.__scopeId = "data-v-a03b3120";
const Qu = {
        components: {
            Header: Ic,
            Footer: Nc
        },
        setup() {
            Ua("setDark")();
            const e = ot([]),
                t = lo.identity.phone;

            function n(e) {
                return [e.initiator, e.target].find((e => e != t))
            }
            return lo.backend.getPhoneCalls().then((n => {
                e.value = n.map((e => (e.callback = e.initiator == t || !e.anonymous, e)))
            })), {
                calls: e,
                myPhone: t,
                other: n,
                createCall: function(e) {
                    lo.pusher.emit("CALL_TO", n(e), e.video)
                }
            }
        }
    },
    Zu = {
        class: "flex flex-col h-full"
    },
    ed = {
        class: "flex-1 overflow-y-auto hide-scroll bg-theme text-theme"
    },
    td = {
        key: 0,
        class: "h-full flex flex-center"
    },
    nd = {
        key: 1,
        class: "p-3 font-semibold text-center"
    },
    ad = {
        key: 2
    },
    ld = {
        class: "w-16 text-center"
    },
    sd = {
        key: 0,
        class: "fas fa-ban text-red-500 fa-2x"
    },
    od = {
        key: 2,
        class: "fas fa-question"
    },
    rd = {
        class: "flex flex-col ml-5 text-3xl"
    },
    id = {
        class: "font-semibold"
    },
    cd = {
        class: "text-gray-400"
    },
    ud = {
        class: "ml-auto self-start text-xl text-gray-400"
    };
Qu.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("app-loading"),
        i = ua("Footer");
    return ka(), _a("div", Zu, [Ea(o, {
        name: "Recentes"
    }), Ea("div", ed, [a.calls ? a.calls.length ? (ka(), _a("ul", ad, [(ka(!0), _a(ma, null, pl(a.calls, (t => (ka(), _a("li", {
        key: t.id,
        onClick: e => t.callback && a.createCall(t),
        class: "border-b border-theme p-5 flex items-center"
    }, [Ea("div", ld, ["refused" === t.status && t.target == a.myPhone ? (ka(), _a("i", sd)) : "ok" === t.status ? (ka(), _a("i", {
        key: 1,
        class: ["fas", [t.video ? "fa-video" : "fa-phone transform rotate-90"]]
    }, null, 2)) : (ka(), _a("i", od))]), Ea("div", rd, [Ea("h1", id, g(t.callback ? e.$filters.getNameByPhone(a.other(t)) : "(Anônimo)"), 1), Ea("span", cd, g(e.$filters.duration(t.duration)), 1)]), Ea("span", ud, g(e.$filters.unixToDayOfMonth(t.created_at)), 1)], 8, ["onClick"])))), 128))])) : (ka(), _a("h1", nd, " Você não realizou nenhuma ligação ")) : (ka(), _a("div", td, [Ea(r)]))]), Ea(i)])
};
const dd = {
        components: {
            Header: Ic,
            Footer: Nc
        },
        setup() {
            Ua("setDark")();
            const e = lo.settings.blocks;
            return {
                blocks: e,
                unblock: function(t) {
                    lo.backend.unblock(t).then((() => {
                        const n = e.indexOf(t);
                        n >= 0 && e.splice(n, 1)
                    }))
                }
            }
        }
    },
    pd = {
        class: "flex flex-col h-full"
    },
    fd = {
        class: "flex-1 overflow-y-auto hide-scroll bg-theme text-theme"
    },
    hd = {
        key: 0,
        class: "h-full flex flex-center"
    },
    md = {
        key: 1,
        class: "p-3 font-semibold text-center"
    },
    gd = {
        key: 2
    },
    bd = {
        class: "font-semibold"
    },
    vd = Ea("button", {
        class: "ml-auto px-2"
    }, [Ea("i", {
        class: "fal fa-times text-4xl text-gray-500"
    })], -1);
dd.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("app-loading"),
        i = ua("Footer");
    return ka(), _a("div", pd, [Ea(o, {
        name: "Bloqueios"
    }), Ea("div", fd, [a.blocks ? a.blocks.length ? (ka(), _a("ul", gd, [(ka(!0), _a(ma, null, pl(a.blocks, (t => (ka(), _a("li", {
        key: t,
        onClick: e => a.unblock(t),
        class: "border-b border-theme p-5 flex items-center"
    }, [Ea("h1", bd, g(e.$filters.getNameByPhone(t)), 1), vd], 8, ["onClick"])))), 128))])) : (ka(), _a("h1", md, " Nenhum número bloqueado ")) : (ka(), _a("div", hd, [Ea(r)]))]), Ea(i)])
};
const xd = {
        setup() {
            Ua("setDark")(lo.darkTheme.value);
            const e = ot(lo.hasNotificationFor("sms"));
            Sn(e, (e => lo.setNotificationFor("sms", e)));
            const t = ot(""),
                n = ul((() => {
                    var e;
                    const n = t.value,
                        a = [];
                    for (let [t, l] of Object.entries(lo.messages)) l.length && (t.includes(n) || Fs(t).toLowerCase().includes(n.toLowerCase())) && a.push({
                        phone: t,
                        message: l[l.length - 1]
                    });
                    for (let t of lo.contacts.value) n && !(null == (e = lo.messages[t.phone]) ? void 0 : e.length) && (t.phone.includes(n) || t.name.toLowerCase().includes(n.toLowerCase())) && a.push({
                        phone: t.phone,
                        message: null
                    });
                    return a.sort(((e, t) => {
                        var n, a;
                        return (null == (n = t.message) ? void 0 : n.created_at) - (null == (a = e.message) ? void 0 : a.created_at) || 0
                    })), a
                }));
            return {
                query: t,
                chats: n,
                notifications: e
            }
        }
    },
    yd = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    kd = {
        class: "flex h-32 pt-16 bg-theme-accent border-b border-theme"
    },
    wd = Ea("h1", {
        class: "mx-auto font-bold"
    }, "Mensagens", -1),
    _d = {
        key: 0,
        class: "far fa-bell"
    },
    Cd = {
        key: 1,
        class: "far fa-bell-slash"
    },
    Ad = {
        class: "p-4"
    },
    Sd = {
        class: "relative"
    },
    Pd = Ea("i", {
        class: "absolute top-3 left-4 text-gray-500 fas fa-search text-xl"
    }, null, -1),
    Td = {
        class: "flex-1 overflow-y-auto hide-scroll"
    },
    Ed = {
        class: "flex flex-col"
    },
    Rd = {
        class: "text-3xl"
    },
    Ld = {
        key: 0,
        class: "text-2xl text-gray-500"
    },
    Id = {
        key: 1,
        class: "text-2xl text-gray-500 italic"
    },
    Od = {
        key: 0,
        class: "text-xl text-gray-500"
    };
xd.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", yd, [Ea("div", kd, [wd, Ea("button", {
        class: "absolute top-16 right-0 w-20 px-5",
        onClick: t[1] || (t[1] = e => a.notifications = !a.notifications)
    }, [a.notifications ? (ka(), _a("i", _d)) : (ka(), _a("i", Cd))])]), Ea("div", Ad, [Ea("div", Sd, [Pd, Yn(Ea("input", {
        "onUpdate:modelValue": t[2] || (t[2] = e => a.query = e),
        placeholder: "Pesquise um número ou contato",
        type: "text",
        class: "w-full bg-theme border border-theme rounded-full p-2 pl-12 pr-6 text-2xl"
    }, null, 512), [
        [ts, a.query]
    ])])]), Ea("ul", Td, [(ka(!0), _a(ma, null, pl(a.chats, (t => (ka(), _a("li", {
        key: t.phone,
        class: "flex justify-between items-start border-b border-theme p-4",
        onClick: n => e.$router.push("/sms/" + t.phone)
    }, [Ea("div", Ed, [Ea("h1", Rd, g(e.$filters.getNameByPhone(t.phone)), 1), t.message ? (ka(), _a("p", Ld, g(t.message.content || (t.message.image ? "📷 Foto" : "🌎 Localização")), 1)) : (ka(), _a("p", Id, "Nenhuma mensagem..."))]), t.message ? (ka(), _a("p", Od, g(e.$filters.unixToRelative(t.message.created_at)), 1)) : Oa("", !0)], 8, ["onClick"])))), 128))])])
};
const Dd = {
        setup() {
            Ua("setDark")(lo.darkTheme.value);
            const {
                id: e
            } = zi().params;
            lo.messages[e] || (lo.messages[e] = []);
            const t = lo.messages[e],
                n = ot(),
                {
                    isAndroid: a
                } = lo.settings;
            return Sn(t, (() => {
                Rt((() => !n.value && document.querySelector(".overflow-y-auto").scrollTo(0, 9e6)))
            })), {
                isAndroid: a,
                id: e,
                messages: t,
                updateGPS: function(e) {
                    lo.pusher.emit("GPS", {
                        location: e
                    })
                },
                content: n,
                send: function() {
                    n.value && (lo.backend.sms_send(e, n.value).then((e => {
                        e && t.push(e) > 100 && t.shift()
                    })), n.value = null)
                }
            }
        }
    },
    Nd = ln("data-v-7547566d");
nn("data-v-7547566d");
const Md = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    $d = {
        class: "flex h-32 pt-16 bg-theme-accent border-b border-theme"
    },
    Vd = {
        key: 0,
        class: "far fa-arrow-left"
    },
    Ud = {
        key: 1,
        class: "fas fa-chevron-left text-blue-400"
    },
    jd = {
        class: "flex-1 overflow-y-auto hide-scroll mt-2"
    },
    Fd = {
        key: 0,
        class: "mx-2 fal fa-check-double text-gray-400 text-base"
    },
    Bd = {
        class: "break-words whitespace-pre-line"
    },
    Hd = {
        class: "px-5 py-6"
    },
    Gd = {
        class: "relative"
    },
    qd = Ea("i", {
        class: "fal fa-paper-plane text-gray-600 text-3xl"
    }, null, -1);
an();
const zd = Nd(((e, t, n, a, l, s) => (ka(), _a("div", Md, [Ea("div", $d, [Ea("button", {
    class: "absolute top-16 px-5",
    onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
}, [a.isAndroid ? (ka(), _a("i", Vd)) : (ka(), _a("i", Ud))]), Ea("h1", {
    class: [{
        "ml-16": a.isAndroid,
        "mx-auto": !a.isAndroid
    }, "font-bold"]
}, g(e.$filters.getNameByPhone(a.id).substr(0, 12)), 3)]), Ea("ul", jd, [(ka(!0), _a(ma, null, pl(a.messages, ((t, n) => (ka(), _a("li", {
    key: n,
    class: ["flex items-end mb-2 mx-4", {
        "flex-row-reverse": t.sender != a.id
    }]
}, [t.delivered && t.sender != a.id ? (ka(), _a("i", Fd)) : Oa("", !0), Ea("div", {
    class: "p-3 text-3xl rounded-2xl",
    received: t.sender == a.id,
    style: {
        "max-width": "75%"
    }
}, [t.image ? (ka(), _a("img", {
    key: 0,
    class: "rounded-xl",
    src: t.image
}, null, 8, ["src"])) : t.location ? (ka(), _a("img", {
    key: 1,
    class: "rounded-xl",
    src: e.$asset("/stock/maps.jpg"),
    onClick: e => a.updateGPS(t.location)
}, null, 8, ["src", "onClick"])) : Oa("", !0), Ea("p", Bd, g(t.content), 1)], 8, ["received"])], 2)))), 128))]), Ea("div", Hd, [Ea("div", Gd, [Yn(Ea("input", {
    onKeydown: t[2] || (t[2] = cs(((...e) => a.send && a.send(...e)), ["enter"])),
    "onUpdate:modelValue": t[3] || (t[3] = e => a.content = e),
    maxlength: "255",
    type: "text",
    class: "w-full bg-theme border border-theme rounded-full p-4 pr-16 text-2xl"
}, null, 544), [
    [ts, a.content]
]), Ea("button", {
    class: "absolute top-2 right-6",
    onClick: t[4] || (t[4] = (...e) => a.send && a.send(...e))
}, [qd])])])]))));
Dd.render = zd, Dd.__scopeId = "data-v-7547566d";
const Wd = ot();

function Kd() {
    return new Promise(((e, t) => {
        Wd.value = n => n ? e(n) : t()
    }))
}
const Jd = {
    "/": "Câmera",
    "/whatsapp": "WhatsApp",
    "/tor": "TOR",
    "/instagram": "Instagram",
    "/olx": "OLX",
    "/tinder": "Tinder",
    "/downloads": "Downloads",
    "/videos": "Vídeos"
};
const Xd = {
    callback: Wd
}.callback;
Sn(Xd, (e => {
    e && aR.push("/gallery")
})), lo.pusher.on("Route:afterEach", (e => {
    "/gallery" != e.path && Xd.value && (Xd.value = null)
}));
const Yd = {
        setup() {
            Ua("setDark")();
            const e = lo.gallery,
                t = lo.settings.isAndroid,
                n = ot(),
                a = ul((() => e.map((e => e.folder)).filter(((e, t, n) => n.indexOf(e) == t)).sort())),
                l = ul((() => e.filter((e => e.folder === n.value))));
            return e.checked || lo.backend.gallery().then((t => {
                Object.assign(e, t), e.checked = !0
            })), {
                isAndroid: t,
                callback: Xd,
                takePhoto: function() {
                    qo().request(!1, "/").catch((() => {}))
                },
                path: n,
                folders: a,
                files: l,
                select: function(e) {
                    Xd.value ? (Xd.value(e.url), Xd.value = null, aR.back()) : aR.push("/gallery/carousel/" + e.id)
                },
                Lang: Jd
            }
        }
    },
    Qd = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    Zd = {
        class: "h-32 pt-16 border-b border-theme bg-theme-accent"
    },
    ep = {
        key: 0,
        class: "far fa-arrow-left"
    },
    tp = {
        key: 1,
        class: "far fa-chevron-left text-yellow-500"
    },
    np = Ea("i", {
        class: "fal fa-camera text-yellow-500"
    }, null, -1),
    ap = {
        class: "flex-1 overflow-x-auto hide-scroll"
    },
    lp = {
        key: 0,
        class: "p-5"
    },
    sp = Ea("i", {
        class: "fas fa-folder text-yellow-500 text-6xl"
    }, null, -1),
    op = {
        class: "ml-4"
    },
    rp = {
        key: 1,
        class: "grid grid-cols-4 gap-0.5"
    };
Yd.render = function(e, t, n, a, l, s) {
    var o;
    return ka(), _a("div", Qd, [Ea("div", Zd, [a.path ? (ka(), _a("button", {
        key: 0,
        onClick: t[1] || (t[1] = e => a.path = null),
        class: "absolute top-16 px-4"
    }, [a.isAndroid ? (ka(), _a("i", ep)) : (ka(), _a("i", tp))])) : Oa("", !0), Ea("h1", {
        class: [
            [a.path && a.isAndroid ? "ml-16" : "text-center"], "font-bold text-4xl"
        ]
    }, g(null != (o = a.Lang[a.path]) ? o : "Galeria"), 3), a.callback ? Oa("", !0) : (ka(), _a("button", {
        key: 1,
        onClick: t[2] || (t[2] = (...e) => a.takePhoto && a.takePhoto(...e)),
        class: "absolute top-16 right-4 px-4"
    }, [np]))]), Ea("div", ap, [a.path ? (ka(), _a("ul", rp, [(ka(!0), _a(ma, null, pl(a.files, (e => (ka(), _a("li", {
        key: e.id
    }, [Ea("div", {
        onClick: t => a.select(e),
        class: "w-full h-36",
        style: {
            background: `url(${e.url})`,
            backgroundSize: "100% 100%"
        }
    }, null, 12, ["onClick"])])))), 128))])) : (ka(), _a("ul", lp, [(ka(!0), _a(ma, null, pl(a.folders, (e => (ka(), _a("li", {
        key: e,
        class: "flex items-center mb-4",
        onClick: t => a.path = e
    }, [sp, Ea("h1", op, g(a.Lang[e]), 1)], 8, ["onClick"])))), 128))]))])])
};
const ip = {
        setup() {
            Ua("setDark")();
            const e = zi(),
                t = ot(lo.gallery.find((t => t.id == e.params.file))),
                n = Ye(lo.gallery.filter((e => e.folder === t.value.folder))),
                a = ul((() => n.indexOf(t.value))),
                l = ul((() => n.length));
            return {
                file: t,
                index: a,
                length: l,
                next: function(e = 1) {
                    const a = n.indexOf(t.value) + e;
                    a >= 0 && a < n.length && (t.value = n[a])
                },
                Lang: Jd
            }
        }
    },
    cp = {
        class: "h-full bg-theme text-theme"
    },
    up = {
        class: "h-32 pt-16 text-center bg-theme-accent border-b border-theme"
    },
    dp = {
        class: "mt-64 relative"
    },
    pp = {
        class: "mt-4 text-center font-semibold text-4xl"
    };
ip.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", cp, [Ea("div", up, [Ea("h1", null, g(a.Lang[a.file.folder]), 1)]), Ea("div", dp, [Ea("button", {
        onClick: t[1] || (t[1] = e => a.next(-1)),
        class: "absolute left-0 top-0 h-96 w-1/4"
    }), Ea("img", {
        src: a.file.url,
        class: "h-96 mx-auto"
    }, null, 8, ["src"]), Ea("button", {
        onClick: t[2] || (t[2] = e => a.next(1)),
        class: "absolute right-0 top-0 h-96 w-1/4"
    })]), Ea("div", pp, g(a.index + 1) + " / " + g(a.length), 1)])
};
class fp {
    constructor(e) {
        this.readyState = 0, this.call = e;
        const t = lo.settings.videoServer;
        if (this.isAudioUDP = "rtc" == e.mode, this.isVideoUDP = "rtc" == t, this.channels = {}, "rtc" == e.mode || e.isVideo && "rtc" == t) {
            const e = [];
            if (lo.settings.turnServer) {
                const [t, n, a] = lo.settings.turnServer.split(",");
                e.push({
                    urls: [t],
                    username: n,
                    credential: a
                })
            } else e.push({
                urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
            });
            this.peer = new RTCPeerConnection({
                iceServers: e
            }), this.peer.onicecandidate = ({
                candidate: e
            }) => this.onicecandidate(e), this.peer.ontrack = ({
                streams: e
            }) => this.onstreams(e), this.peer.ondatachannel = ({
                channel: e
            }) => {
                this.channels[e.label] = e, e.onmessage = ({
                    data: e
                }) => this.blobCallback(mp(e))
            }
        }
    }
    addStream(e) {
        e.getTracks().forEach((t => this.peer.addTrack(t, e)))
    }
    onicecandidate(e) {
        throw new Error("onicecandidate should be replaced by a new function")
    }
    onstreams(e) {
        throw new Error("ontrack should be replaced by a new function")
    }
    async createOffer() {
        const e = await this.peer.createOffer({
            offerToReceiveAudio: !0
        });
        return await this.peer.setLocalDescription(e), e
    }
    setAnswer(e) {
        return this.peer.setRemoteDescription(e)
    }
    async createAnswer(e) {
        await this.peer.setRemoteDescription(e);
        const t = this.peer.createAnswer({
            offerToReceiveAudio: !0
        });
        return await this.peer.setLocalDescription(t), t
    }
    addIceCandidate(e) {
        this.peer.addIceCandidate(e)
    }
    addVoice() {
        const {
            mode: e,
            room: t
        } = this.call;
        ["mumble-voip", "voip", "pma-voice"].includes(e) && lo.client.exports(e, "addPlayerToCall", t)
    }
    async _addVideoStream(e) {
        var t;
        Ho.start();
        const n = Ho.canvas,
            a = document.createElement("canvas");
        a.width = 375, a.height = 812;
        const l = a.getContext("2d");
        for (; this.readyState;) {
            const s = Date.now();
            l.drawImage(n, .26 * n.width, 0, .28 * n.width, n.height, 0, 0, 375, 812);
            const o = await new Promise((e => a.toBlob(e, "image/jpeg", .3)));
            this.isVideoUDP ? null == (t = this.channels.video) || t.send(await o.arrayBuffer()) : this.socket.readyState == WebSocket.OPEN && this.socket.send(o), e(o, !0), await hp(42 - (Date.now() - s))
        }
        Ho.stop()
    }
    addVideo(e) {
        if (this.blobCallback = e, this.isVideoUDP) {
            if (this.call.owner) {
                const t = this.peer.createDataChannel("video");
                t.onmessage = ({
                    data: t
                }) => e(mp(t)), t.onopen = () => this.channels.video = t
            }
            this.readyState = 1, this._addVideoStream(e)
        } else {
            let t = lo.settings.videoServer;
            t.lastIndexOf("/") < 10 && (t += "/"), t += this.call.room, this.socket = new WebSocket(t), this.socket.onopen = () => {
                this.readyState = 1, this._addVideoStream(e)
            }, this.socket.onmessage = ({
                data: t
            }) => e(t), this.socket.onclose = () => this.readyState = 0
        }
    }
    close() {
        var e, t;
        this.readyState = 0, null == (e = this.peer) || e.close(), null == (t = this.socket) || t.close();
        const {
            room: n,
            mode: a
        } = this.call;
        ["mumble-voip", "voip", "pma-voice"].includes(a) ? lo.client.exports(a, "removePlayerFromCall", n) : "tokovoip" === a && lo.client.exports("tokovoip_script", "removePlayerFromRadio", n)
    }
}

function hp(e) {
    return new Promise((t => setTimeout(t, e)))
}

function mp(e) {
    return new Blob([new Uint8Array(e, 0, e.byteLength)])
}
const gp = {
        setup() {
            Ua("setDark")(!0);
            const {
                backgroundURL: e,
                settings: t,
                currentCall: n
            } = lo, a = Ua("setKeepInput"), l = n.value, s = ot(0), o = ot(0), r = new fp(l), i = qi(), c = Ye({
                big: null,
                small: null
            }), u = ot(), d = ot(), p = {
                ring: lo.settings.ringSound,
                dial: lo.settings.dialSound
            };
            let f = null;
            async function h() {
                document.querySelectorAll("audio[audioEffect]").forEach((e => e.pause())), lo.client.PhonePlayCall(), l.isVideo && (r.addVideo(((e, t) => {
                    const n = t ? d.value : u.value;
                    if (t ? c.small = !0 : c.big = !0, n instanceof HTMLCanvasElement) {
                        const t = n.getContext("2d"),
                            a = new Image;
                        a.onload = () => t.drawImage(a, 0, 0, n.width, n.height), a.src = URL.createObjectURL(e)
                    }
                })), lo.client.SetInVideoCall(!0)), a(!0), r.addVoice(), (r.isAudioUDP || l.isVideo && r.isVideoUDP) && l.owner && g("setOffer", await r.createOffer()), f = setInterval((() => s.value += 1), 1e3)
            }

            function m(e) {
                lo.currentCall.value = null, i.back(), f && clearInterval(f), r.close(), l.isVideo && lo.client.SetInVideoCall(!1), lo.visible.value ? lo.client.PhonePlayText() : lo.client.PhonePlayOut(), e && lo.backend.endPhoneCall(l.room)
            }
            r.isAudioUDP && (navigator.mediaDevices.getUserMedia({
                audio: {
                    autoGainControl: !1
                }
            }).then((e => r.addStream(e))).catch((() => console.error("No available stream"))), r.onstreams = e => {
                const t = new Audio;
                t.autoplay = !0, t.srcObject = e[0]
            }), r.peer && (r.onicecandidate = e => e && g("addCandidate", e)), lo.onceRoute("CALL_READY", h);
            const g = (e, ...t) => lo.backend.call_p2p(e, t),
                b = {
                    setOffer: async e => g("setAnswer", await r.createAnswer(e)),
                    setAnswer: e => r.setAnswer(e),
                    addCandidate: e => e && r.addIceCandidate(e)
                };
            return lo.onceRoute("CALL_P2P", (({
                event: e,
                args: t
            }) => {
                b[e](...t || [])
            })), lo.onceRoute("FORCE_LEAVE_CALL", (() => {
                lo.currentCall.value && m(!0)
            })), bn((() => {
                const e = document.getElementById(l.owner ? "dial" : "ring");
                e.currentTime = 0, e.play()
            })), lo.onceRoute("CALL_END", (() => m())), {
                backgroundURL: e,
                call: l,
                video: c,
                videoPeer: u,
                videoSource: d,
                settings: t,
                status: o,
                duration: s,
                audios: p,
                accept: function() {
                    l.accepted = !0, lo.currentCall.value.accepted = !0, lo.backend.answerPhoneCall(l.room), h()
                },
                block: function() {
                    lo.currentCall.value = null, i.back(), lo.backend.block(l.contact.phone), lo.settings.blocks.push(l.contact.phone)
                },
                refuse: function() {
                    lo.currentCall.value = null, i.back(), lo.backend.refusePhoneCall(l.room)
                },
                end: m
            }
        }
    },
    bp = ln("data-v-2fdb3502");
nn("data-v-2fdb3502");
const vp = {
        class: "mt-48 text-7xl text-white"
    },
    xp = {
        class: "text-white mt-4"
    },
    yp = {
        key: 0,
        class: "absolute inset-0 bg-black",
        big: ""
    },
    kp = {
        ref: "videoPeer",
        width: "375",
        height: "812",
        class: "w-full h-full"
    },
    wp = {
        key: 1,
        class: "absolute right-4 top-16 w-64 h-96 bg-black rounded-3xl",
        small: ""
    },
    _p = {
        ref: "videoSource",
        width: "160",
        height: "240",
        class: "w-full h-full rounded-3xl"
    },
    Cp = {
        class: "w-full absolute bottom-48"
    },
    Ap = {
        key: 0,
        class: "flex justify-around"
    },
    Sp = Ea("i", {
        class: "fas fa-phone transform rotate-225"
    }, null, -1),
    Pp = Ea("h1", {
        class: "text-white text-xl text-center mt-3"
    }, "Recusar", -1),
    Tp = Ea("i", {
        class: "fas fa-ban"
    }, null, -1),
    Ep = Ea("h1", {
        class: "text-white text-xl text-center mt-3"
    }, "Bloquear", -1),
    Rp = {
        key: 0,
        class: "fas fa-video"
    },
    Lp = {
        key: 1,
        class: "fas fa-phone transform rotate-90"
    },
    Ip = Ea("h1", {
        class: "text-white text-xl text-center mt-3"
    }, "Atender", -1),
    Op = {
        key: 1,
        class: "text-center"
    },
    Dp = Ea("i", {
        class: "fas fa-times"
    }, null, -1),
    Np = Ea("h1", {
        class: "text-white text-xl mt-3"
    }, "Encerrar", -1);
an();
const Mp = bp(((e, t, n, a, l, s) => (ka(), _a("div", {
    class: "flex flex-col items-center h-full bg-cover relative",
    style: {
        backgroundImage: "url(" + a.backgroundURL + ")",
        backgroundPosition: "center",
        backgroundColor: "black"
    }
}, [Ea("h1", vp, g(a.call.isAnonymous && !a.call.owner ? "Anônimo" : a.call.contact.name.substr(0, 16)), 1), Ea("span", xp, g(e.$filters.duration(a.duration)), 1), a.video.big ? (ka(), _a("div", yp, [Ea("canvas", kp, null, 512)])) : Oa("", !0), a.video.small ? (ka(), _a("div", wp, [Ea("canvas", _p, null, 512)])) : Oa("", !0), Ea("div", Cp, [a.call.accepted || a.call.owner ? (ka(), _a("div", Op, [Ea("button", {
    class: "text-white w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full",
    onClick: t[4] || (t[4] = e => a.end(!0))
}, [Dp]), Np])) : (ka(), _a("div", Ap, [Ea("div", null, [Ea("button", {
    class: "text-white w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full",
    onClick: t[1] || (t[1] = (...e) => a.refuse && a.refuse(...e))
}, [Sp]), Pp]), Ea("div", null, [Ea("button", {
    class: "text-white w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full",
    onClick: t[2] || (t[2] = (...e) => a.block && a.block(...e))
}, [Tp]), Ep]), Ea("div", null, [Ea("button", {
    class: "text-white w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full",
    onClick: t[3] || (t[3] = (...e) => a.accept && a.accept(...e))
}, [a.call.isVideo ? (ka(), _a("i", Rp)) : (ka(), _a("i", Lp))]), Ip])]))]), Ea("audio", {
    audioEffect: "",
    id: "ring",
    src: a.audios.ring,
    loop: ""
}, null, 8, ["src"]), Ea("audio", {
    audioEffect: "",
    id: "dial",
    src: a.audios.dial,
    loop: ""
}, null, 8, ["src"])], 4))));
gp.render = Mp, gp.__scopeId = "data-v-2fdb3502";
const $p = {},
    Vp = Ea("div", {
        class: "h-12 bg-whatsapp-dark"
    }, null, -1),
    Up = {
        class: "h-20 pt-4 bg-whatsapp text-white text-left"
    };
$p.render = function(e, t) {
    return ka(), _a(ma, null, [Vp, Ea("div", Up, [Yt(e.$slots, "default")])], 64)
};
const jp = Ye([]),
    Fp = Ye([]),
    Bp = Ye({}),
    Hp = Ye({});

function Gp(e, t = null) {
    const n = jp.find((t => t.id == e));
    return n && t && Object.assign(n, t), n
}

function qp(e) {
    const t = jp.findIndex((t => t.id === e));
    t >= 0 && jp.splice(t, 1)
}

function zp(e, t) {
    var n;
    return t || (t = e.target, e = null != (n = e.sender) ? n : e.initiator), e == lo.identity.phone ? t : e
}
lo.pusher.on("WHATSAPP_GROUP", (e => {
    e.phone = "group" + e.id, jp.push(e)
})), lo.pusher.on("WHATSAPP_GROUP_PHOTO", (({
    id: e,
    avatarURL: t
}) => {
    Gp(e, {
        avatarURL: t
    })
})), lo.pusher.on("WHATSAPP_GROUP_NAME", (({
    id: e,
    name: t
}) => {
    Gp(e, {
        name: t
    })
})), lo.pusher.on("WHATSAPP_LEAVE_GROUP", (e => qp(e))), lo.pusher.on("WHATSAPP_UNGROUP", (e => qp(e))), lo.pusher.on("WHATSAPP_GROUP_KICK", (({
    id: e
}) => qp(e))), lo.pusher.on("WHATSAPP_GROUP_DESTROY", (({
    id: e
}) => qp(e))), lo.pusher.on("WHATSAPP_READED", (e => delete Bp[e])), lo.pusher.on("WHATSAPP_AVATAR", (({
    phone: e,
    avatarURL: t
}) => Hp[e] = t)), lo.pusher.on("ADD_CONTACT", (async ({
    phone: e
}) => {
    const t = await lo.backend.wpp_getAvatar(e);
    Hp[e] = t
})), lo.pusher.on("WHATSAPP_MESSAGE", (e => {
    if ( e && e.group ) Gp(e.group, {
        message: e
    });
    else {
        e.other = zp(e);
        const t = Fp.findIndex((t => zp(t) == e.other)); - 1 != t ? Fp.splice(t, 1, e) : Fp.push(e), e.sender != lo.identity.phone && (Bp[e.other] = (Bp[e.other] || 0) + 1)
    }
})), lo.pusher.on("WHATSAPP_DELETE_MESSAGES", (() => {

    $s(Fp, (e => !e.target.startsWith("group")))
}));
var Wp = {
    loaded: !1,
    groups: jp,
    messages: Fp,
    unread: Bp,
    avatars: Hp,
    async ready() {
        // CONVERSAS
        this.loaded = !0, await lo.backend.wpp_getProfile();
        const e = await lo.backend.wpp_getResume();
        e.groups.forEach((e => e.phone = "group" + e.id)), e.messages.forEach((e => e.other = zp(e)));
        for (let [t, n] of Object.entries(e)) Object.assign(this[t], n);
        lo.pusher.once("REFRESH", (() => {
            this.loaded = !1;
            for (let e of [this.groups, this.messages, this.unread, this.avatars])
                for (let t in e) delete e[t]
        })), this.loaded = !0
    }
};
const Kp = {
        components: {
            Header: $p
        },
        name: "WhatsApp",
        inject: ["setDark"],
        setup() {
            qi();
            const e = ul((() => lo.identity.phone)),
                t = ot("chats"),
                n = ot(""),
                a = ot(!1),
                l = ot(Js("whatsapp")),
                s = ot([]),
                o = ul((() => {
                    const e = n.value.toLowerCase();
                    return s.value.filter((t => e ? Fs(p(t)).toLowerCase().includes(e) || p(t).includes(e) : 1))
                })),
                {
                    groups: r,
                    messages: i,
                    unread: c,
                    avatars: u
                } = Wp;
            lo.localhost && (o.value = [{
                initiator: "000-001",
                target: "000-002",
                status: "ok",
                callback: !0,
                duration: 30,
                created_at: Date.now() / 1e3
            }, {
                initiator: "000-001",
                target: "000-003",
                callback: !0,
                duration: 30,
                created_at: Date.now() / 1e3
            }, {
                initiator: "000-001",
                target: "000-004",
                callback: !0,
                duration: 30,
                created_at: Date.now() / 1e3
            }]);
            let d = 0;
            Sn(t, (t => {
                "calls" === t && d < Date.now() && (lo.backend.getPhoneCalls().then((t => {
                    s.value = t.map((t => (t.callback = t.initiator == e.value || !t.anonymous, t)))
                })), d = Date.now() + 5e3)
            }));
            const p = (e, t) => {
                var n, a;
                return t || (t = null != (n = e.target) ? n : e.target, e = null != (a = e.sender) ? a : e.initiator), e == lo.identity.phone ? t : e
            };

            function f(e) {
                return {
                    id: e,
                    phone: e,
                    name: Fs(e),
                    avatarURL: u[e] || lo.asset("/stock/user.svg"),
                    message: i.find((t => t.other === e)),
                    unread: c[e] || 0
                }
            }
            const h = ul((() => {
                const e = n.value.trim().toLowerCase(),
                    a = [];
                return "chats" === t.value ? (a.push(...i.filter((t => e ? Fs(t.other).toLowerCase().includes(e) || t.other.includes(e) : 1)).map((e => f(e.other)))), e ? (a.push(...r.filter((t => t.name.toLowerCase().includes(e)))), lo.contacts.value.forEach((t => {
                    a.some((e => e.phone == t.phone)) || (t.phone.includes(e) || t.name.toLowerCase().includes(e)) && a.push(f(t.phone))
                }))) : a.push(...r)) : "contacts" === t.value && lo.contacts.value.forEach((t => {
                    (t.phone.includes(e) || t.name.toLowerCase().includes(e)) && a.push(f(t.phone))
                })), a.sort(((e, t) => {
                    var n, a;
                    return (null == (n = t.message) ? void 0 : n.created_at) - (null == (a = e.message) ? void 0 : a.created_at)
                }))
            }));
            return Wp.loaded || Wp.ready(), {
                tab: t,
                appName: l,
                query: n,
                searching: a,
                conversations: h,
                calls: o,
                myPhone: e,
                contentDefaults: {
                    image: "📷 Foto",
                    location: "🌎 Localização",
                    audio: "🔊 Áudio"
                },
                onContext: async function(e) {
                    const t = await Io().request([
                        ["Excluir conversa", "text-red-500 self-center"], "g" != e.phone[0] && ["Efetuar ligação", "text-blue-500 self-center"]
                    ].filter((e => e)), 20);
                    0 === t ? lo.backend.wpp_deleteMessages(e.phone).then((() => {
                        $s(i, (t => t.other == e.phone))
                    })) : 1 === t && lo.pusher.emit("CALL_TO", e.phone)
                },
                other: p,
                createCall: function(e) {
                    lo.pusher.emit("CALL_TO", p(e), e.video)
                },
                getAvatar: function(e) {
                    var t;
                    return null != (t = u[e]) ? t : lo.asset("/stock/user.svg")
                }
            }
        },
        activated() {
            this.setDark(!0)
        }
    },
    Jp = ln("data-v-f395736e");
nn("data-v-f395736e");
const Xp = {
        class: "flex flex-col h-full bg-whatsapp-container"
    },
    Yp = {
        class: "font-bold ml-6"
    },
    Qp = {
        key: 0,
        class: "far fa-search-minus text-3xl"
    },
    Zp = {
        key: 1,
        class: "far fa-search text-3xl"
    },
    ef = Ea("i", {
        class: "fas fa-users"
    }, null, -1),
    tf = Ea("i", {
        class: "fas fa-cog"
    }, null, -1),
    nf = {
        class: "h-16 bg-whatsapp text-white border-b border-theme grid grid-cols-3"
    },
    af = {
        key: 0,
        class: "p-3 pb-0"
    },
    lf = {
        key: 1,
        class: "flex-1 overflow-y-auto hide-scroll p-5"
    },
    sf = {
        class: "flex-1 flex flex-col justify-around text-xl ml-3 border-1 border-b border-theme pb-2"
    },
    of = {
        class: "flex items-center justify-between"
    },
    rf = {
        class: "text-3xl text-theme"
    },
    cf = {
        key: 0,
        class: "text-gray-400"
    },
    uf = {
        class: "flex justify-between"
    },
    df = {
        key: 0,
        class: "text-xl text-gray-400"
    },
    pf = {
        key: 1,
        class: "text-xl text-gray-500 italic"
    },
    ff = {
        key: 2,
        class: "text-xl text-gray-500 italic"
    },
    hf = {
        key: 3,
        class: "bg-blue-500 text-white px-3 py-1 text-base rounded-full flex flex-center"
    },
    mf = {
        key: 2,
        class: "flex-1 overflow-y-auto hide-scroll p-5"
    },
    gf = {
        class: "text-theme"
    },
    bf = {
        class: "flex flex-col ml-5 text-3xl"
    },
    vf = {
        class: "font-semibold"
    },
    xf = {
        class: "text-gray-400 text-xl pt-2"
    },
    yf = {
        key: 0,
        class: "fas fa-video"
    },
    kf = {
        key: 1,
        class: "fas fa-phone transform rotate-90"
    };
an();
const wf = Jp(((e, t, n, a, l, s) => {
    const o = ua("Header"),
        r = ua("app-input");
    return ka(), _a("div", Xp, [Ea(o, null, {
        default: Jp((() => [Ea("h1", Yp, g(a.appName), 1), Ea("button", {
            onClick: t[1] || (t[1] = e => a.searching = !a.searching),
            class: "absolute top-16 right-32"
        }, [a.searching ? (ka(), _a("i", Qp)) : (ka(), _a("i", Zp))]), Ea("button", {
            onClick: t[2] || (t[2] = t => e.$router.push("/whatsapp/create")),
            class: "absolute top-16 right-16"
        }, [ef]), Ea("button", {
            onClick: t[3] || (t[3] = t => e.$router.push("/whatsapp/settings")),
            class: "absolute top-16 right-4"
        }, [tf])])),
        _: 1
    }), Ea("div", nf, [(ka(), _a(ma, null, pl({
        chats: "CHATS",
        contacts: "CONTATOS",
        calls: "LIGAÇÕES"
    }, ((e, t) => Ea("button", {
        key: t,
        tab: "",
        class: ["font-bold text-xl", {
            active: a.tab === t
        }],
        onClick: e => a.tab = t
    }, g(e), 11, ["onClick"]))), 64))]), a.searching ? (ka(), _a("div", af, [Ea(r, {
        modelValue: a.query,
        "onUpdate:modelValue": t[4] || (t[4] = e => a.query = e),
        spellcheck: "false",
        placeholder: "Nome do contato",
        class: "bg-transparent border text-theme text-xl"
    }, null, 8, ["modelValue"])])) : Oa("", !0), "calls" != a.tab ? (ka(), _a("div", lf, [Ea("ul", null, [(ka(!0), _a(ma, null, pl(a.conversations, (t => {
        var n, l;
        return ka(), _a("li", {
            onContextmenu: rs((e => a.onContext(t)), ["prevent", "stop"]),
            key: t.id,
            onClick: n => e.$router.push("/whatsapp/" + t.phone),
            class: "flex mt-3"
        }, [Ea("img", {
            class: "border rounded-full w-24 h-24",
            src: t.avatarURL,
            alt: ""
        }, null, 8, ["src"]), Ea("div", sf, [Ea("div", of , [Ea("h2", rf, g(t.name), 1), t.message ? (ka(), _a("span", cf, g(e.$filters.unixToHHMM(t.message.created_at)), 1)) : Oa("", !0)]), Ea("div", uf, [t.message ? (ka(), _a("span", df, [t.message.sender == a.myPhone ? (ka(), _a("i", {
            key: 0,
            class: ["fal fa-check-double", {
                "text-blue-400": !!t.message.saw_at
            }]
        }, null, 2)) : Oa("", !0), La(" " + g((null == (n = t.message.content) ? void 0 : n.match(/(http)?s?:?(\/\/[^"']*\.(?:webm))/)) ? a.contentDefaults.audio : (null == (l = t.message.content) ? void 0 : l.substr(0, 40)) || a.contentDefaults[t.message.image ? "image" : "location"]), 1)])) : t.phone != t.id ? (ka(), _a("span", pf, " Nenhuma mensagem... ")) : (ka(), _a("span", ff, " Clique para iniciar uma conversa ")), t.unread ? (ka(), _a("span", hf, g(t.unread), 1)) : Oa("", !0)])])], 40, ["onContextmenu", "onClick"])
    })), 128))])])) : (ka(), _a("div", mf, [Ea("ul", gf, [(ka(!0), _a(ma, null, pl(a.calls, (t => (ka(), _a("li", {
        key: t.id,
        class: "border-b border-theme p-5 flex items-center"
    }, [Ea("img", {
        class: "w-20 h-20 rounded-full",
        src: a.getAvatar(t.callback && a.other(t))
    }, null, 8, ["src"]), Ea("div", bf, [Ea("h1", vf, g(t.callback ? e.$filters.getNameByPhone(a.other(t)) : "(Anônimo)"), 1), Ea("span", xf, [Ea("i", {
        class: ["fal fa-long-arrow-left", {
            "text-red-500": "ok" != t.status,
            "text-green-500": "ok" == t.status,
            "transform -rotate-45": t.target == a.myPhone,
            "rotate-135": t.target != a.myPhone
        }]
    }, null, 2), La(" " + g(e.$filters.unixToDayOfMonth(t.created_at)), 1)])]), t.callback ? (ka(), _a("button", {
        key: 0,
        class: "ml-auto text-3xl text-whatsapp",
        onClick: e => t.callback && a.createCall(t)
    }, [t.video ? (ka(), _a("i", yf)) : (ka(), _a("i", kf))], 8, ["onClick"])) : Oa("", !0)])))), 128))])]))])
}));
Kp.render = wf, Kp.__scopeId = "data-v-f395736e";
const _f = {
        components: {
            Header: $p
        },
        setup() {
            Ua("setDark")(!0);
            const e = qo(),
                t = Ua("alert"),
                n = ot(!1),
                a = ot(!0),
                l = ot(lo.hasNotificationFor("whatsapp")),
                s = ot("true" == lo.storage.get("whatsapp-sensitive")),
                o = ot(lo.asset("/stock/user.svg"));
            return Sn(s, (e => lo.storage.set("whatsapp-sensitive", String(e)))), lo.backend.wpp_getProfile().then((e => {
                o.value = e.avatarURL || lo.asset("/stock/user.svg"), a.value = !!e.read_receipts, n.value = !1
            })), Sn(l, (e => lo.setNotificationFor("whatsapp", e))), Sn(a, (e => {
                lo.backend.wpp_updateSettings(e)
            })), {
                loading: n,
                avatarURL: o,
                read_receipts: a,
                notifications: l,
                sensitive: s,
                changeAvatar: function() {
                    const t = e => e && (o.value = e, lo.backend.wpp_updateAvatar(e));
                    Io().request([
                        ["Câmera", "text-center"],
                        ["Galeria", "text-center"]
                    ], 17.5).then((n => {
                        0 == n ? e.request(!0, "/whatsapp").then(t, (() => {})) : 1 == n && Kd().then(t, (() => {}))
                    }))
                },
                deleteMessages: function() {
                    lo.backend.wpp_deleteMessages().then((() => t("Todas as mensagens privadas foram apagadas"))), lo.pusher.emit("WHATSAPP_DELETE_MESSAGES")
                }
            }
        }
    },
    Cf = {
        class: "flex flex-col h-full bg-whatsapp-container text-theme"
    },
    Af = Ea("i", {
        class: "far fa-arrow-left"
    }, null, -1),
    Sf = Ea("h1", {
        class: "absolute left-16 font-bold"
    }, "Configurações", -1),
    Pf = {
        key: 0,
        class: "flex-1 flex flex-center"
    },
    Tf = {
        key: 1,
        class: "flex-1 overflow-y-auto hide-scroll p-8 flex flex-col"
    },
    Ef = {
        class: "relative mb-3"
    },
    Rf = Ea("i", {
        class: "fas fa-camera"
    }, null, -1),
    Lf = {
        class: "border-t border-theme pt-3 flex-1 flex flex-col"
    },
    If = {
        class: "flex justify-between"
    },
    Of = Ea("label", {
        class: "text-3xl"
    }, "Confirmação de Leitura", -1),
    Df = {
        class: "flex justify-between mt-3"
    },
    Nf = Ea("label", {
        class: "text-3xl"
    }, "Notificações", -1),
    Mf = {
        class: "flex justify-between mt-3"
    },
    $f = Ea("label", {
        class: "text-3xl"
    }, "Conteúdo sensível", -1),
    Vf = {
        class: "mt-auto"
    };
_f.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("app-loading"),
        i = ua("app-toggle");
    return ka(), _a("div", Cf, [Ea(o, null, {
        default: Zt((() => [Ea("button", {
            onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t)),
            class: "absolute left-0 px-4"
        }, [Af]), Sf])),
        _: 1
    }), a.loading ? (ka(), _a("div", Pf, [Ea(r)])) : (ka(), _a("div", Tf, [Ea("div", Ef, [Ea("img", {
        src: a.avatarURL,
        class: "w-64 h-64 rounded-full mx-auto"
    }, null, 8, ["src"]), Ea("button", {
        onClick: t[2] || (t[2] = (...e) => a.changeAvatar && a.changeAvatar(...e)),
        class: "absolute bottom-0 right-40 px-4 py-2 rounded-full bg-gray-400 text-black"
    }, [Rf])]), Ea("div", Lf, [Ea("div", If, [Of, Ea(i, {
        modelValue: a.read_receipts,
        "onUpdate:modelValue": t[3] || (t[3] = e => a.read_receipts = e)
    }, null, 8, ["modelValue"])]), Ea("div", Df, [Nf, Ea(i, {
        modelValue: a.notifications,
        "onUpdate:modelValue": t[4] || (t[4] = e => a.notifications = e)
    }, null, 8, ["modelValue"])]), Ea("div", Mf, [$f, Ea(i, {
        modelValue: a.sensitive,
        "onUpdate:modelValue": t[5] || (t[5] = e => a.sensitive = e)
    }, null, 8, ["modelValue"])]), Ea("div", Vf, [Ea("button", {
        class: "text-red-500",
        onClick: t[6] || (t[6] = (...e) => a.deleteMessages && a.deleteMessages(...e))
    }, "Apagar todas as mensagens")])])]))])
};
const Uf = {
        props: ["src"],
        setup(e) {
            const t = Ye({
                    playing: !1,
                    duration: 0,
                    offset: 0
                }),
                n = new Audio;
            n.oncanplay = () => t.offset = 0, fetch(e.src).then((e => e.blob())).then((e => {
                n.src = URL.createObjectURL(e)
            })), n.ontimeupdate = () => {
                t.offset = n.currentTime
            }, n.ondurationchange = e => {
                e.target.duration != 1 / 0 && (t.duration = e.target.duration)
            }, n.addEventListener("ended", (() => {
                t.playing = !1
            }));
            const a = ul((() => t.duration ? t.offset / t.duration * 95 : 0));
            return {
                state: t,
                resume: () => {
                    n.play(), t.playing = !0, t.offset >= t.duration && (n.currentTime = 0)
                },
                pause: () => {
                    n.pause(), t.playing = !1
                },
                percent: a
            }
        }
    },
    jf = {
        class: "relative flex items-center h-20 px-6 rounded-lg w-full"
    },
    Ff = Ea("i", {
        class: "fas fa-play text-gray-400"
    }, null, -1),
    Bf = Ea("i", {
        class: "fas fa-pause text-gray-400"
    }, null, -1),
    Hf = {
        class: "ml-4 flex-1 h-1 bg-gray-200"
    },
    Gf = {
        class: "absolute bottom-0 right-4 text-theme text-lg"
    };
Uf.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", jf, [a.state.playing ? (ka(), _a("button", {
        key: 1,
        onClick: t[2] || (t[2] = e => a.pause())
    }, [Bf])) : (ka(), _a("button", {
        key: 0,
        onClick: t[1] || (t[1] = e => a.resume())
    }, [Ff])), Ea("div", Hf, [Ea("div", {
        style: {
            width: a.percent + "%",
            backgroundColor: a.state.playing ? "#4ade80" : "#60a5fa",
            height: "0.25rem"
        }
    }, null, 4), Ea("div", {
        style: {
            left: a.percent + "%",
            backgroundColor: a.state.playing ? "#4ade80" : "#60a5fa"
        },
        class: "relative bottom-3 rounded-full w-5 h-5 bg-blue-400"
    }, null, 4)]), Ea("span", Gf, g(e.$filters.duration(a.state.duration)), 1)])
};
const qf = {
        components: {
            AudioPlayer: Uf,
            Header: $p
        },
        setup() {
            Ua("setDark")(!0);
            const e = zi(),
                t = lo.identity.phone,
                n = Ua("alert"),
                a = Ua("prompt"),
                l = Ua("useImageFocus"),
                s = ot(""),
                o = ot([]),
                r = ot([0, 0, 0]),
                i = Ye({}),
                c = ot(null),
                u = ot(!!lo.settings.videoServer),
                d = e.params.contact,
                p = ot(lo.contacts.value.find((e => e.phone === d)));

            function f(e) {
                return e.location && (e.location = JSON.parse(e.location)), e
            }
//            console.log(JSON.stringify())
            var sjr = e.params.contact

            p.value || (sjr.startsWith("group") ? p.value = { 
                id: d,
                isGroup: !0
            } : p.value = {
                name: d,
                avatarURL: lo.asset("/stock/user.svg")
            }), lo.getPlayerCoords().then((e => r.value = e)), lo.backend.wpp_getChat(d).then((e => {
                e.name && (p.value.name = e.name), p.value.avatarURL = e.avatarURL || lo.asset("/stock/user.svg"), o.value = e.messages.map(f), Rt((() => m(!0)))
            }));
            let h = 0;

            function m(e, t) {
                var n;
                var jafwe = d

                !0 !== e && s.value || (null == (n = document.querySelector(".overflow-y-auto")) || n.scrollTo(0, 9e6), !jafwe.startsWith("group") && !t && h < Date.now() && (h = Date.now() + 1e3, lo.backend.wpp_markAsRead(d), lo.pusher.emit("WHATSAPP_READED", d)))
            }
            async function g(e = "text", t) {
                const l = [d, (t || s.value).trim(), e];
                if ("location" === e) l.push(await lo.getPlayerCoords());
                else if ("camera" === e) try {
                    l[2] = "image", l.push(await qo().request(!1, "/whatsapp"))
                } catch (o) {
                    return
                } else if ("gallery" === e) try {
                    l[2] = "image", l.push(await Kd())
                } catch (o) {
                    return
                } else if ("image" === e) {
                    const e = await a("Insira o link da imagem");
                    if (!e) return;
                    if (!e.match(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/)) return n("Link inválido");
                    l.push(e)
                } else if (!l[1]) return;
                lo.backend.wpp_sendMessage(...l).then((e => {
                    e.error && n(e.error)
                })), s.value = "", delete i.attachments
            }

            function b(e) {
                (e.sender === t || e.target === t && e.sender === d || e.target == d && d.startsWith("group")) && (o.value.push(f(e)), Rt((() => m(!1, e.sender == t))))
            }
            lo.onceRoute("WHATSAPP_MESSAGE", b), lo.onceRoute("WHATSAPP_READ", (e => {
                e === d && o.value.forEach((e => {
                    e.sender == t && (e.saw_at = Math.floor(Date.now() / 1e3))
                }))
            }));
            const v = ["#ef5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#26C6DA", "#26A69A", "#66BB6A", "#9CCC65", "#FF7043"];
            return {
                prompt: a,
                chat: p,
                myPhone: t,
                messages: o,
                addMessage: g,
                handleMessage: b,
                ajustSize: m,
                updateGPS: function(e) {
                    lo.pusher.emit("GPS", {
                        location: e
                    })
                },
                location: r,
                text: s,
                recording: c,
                startRecording: function() {
                    if (!lo.microphone.value) return lo.captureMicrophone(), n("A autorização do microfone não foi concedida.");
                    const e = new MediaRecorder(lo.microphone.value, {
                            audioBitsPerSecond: 16e3
                        }),
                        t = setInterval((() => {
                            if (!c.value) return clearInterval(t);
                            c.value.duration += 1
                        }), 1e3);
                    e.start(), c.value = {
                        duration: 0,
                        recorder: e,
                        stop(t = !1) {
                            c.value = null, t && (e.ondataavailable = e => Vo.upload(e.data, "webm").then((e => {
                                g("audio", e)
                            }), (() => n("Falha ao salvar áudio")))), e.stop()
                        }
                    }
                },
                getColorForPhone: function(e) {
                    let t = parseInt(e.replace(/-/g, ""));
                    return v[t % v.length]
                },
                saveContact: async function() {
                    var e;
                    const t = null == (e = await a("Nome do contato")) ? void 0 : e.trim();
                    if (t) return t.length > 128 ? n("Nome inválido") : void lo.backend.addContact(d, t).then((e => {
                        e instanceof Object && (p.value.name = t, p.value.id = e.id, lo.contacts.value.push(e), lo.pusher.emit("ADD_CONTACT", e))
                    }))
                },
                misc: i,
                isExternalLink: function(e) {
                    if ("true" != lo.storage.get("whatsapp-sensitive")) return !1;
                    const t = lo.settings.uploadServer;
                    return !e.startsWith(t.substring(0, t.indexOf("/", 10)))
                },
                addAttachment: function() {
                    const e = ["camera", "gallery", "image", "location"];
                    Io().request([
                        ["Câmera", "text-blue-500 self-center"],
                        ["Galeria", "text-blue-500 self-center"],
                        ["Imagem", "text-blue-500 self-center"],
                        ["Localização", "text-blue-500 self-center"]
                    ], 30).then((t => e[t] && g(e[t])))
                },
                onContextImage: async function(e) {
                    const t = await Io().request([
                        ["Ver imagem", "text-blue-500 self-center"],
                        ["Salvar imagem", "text-blue-500 self-center"]
                    ], 20);
                    if (0 === t) l(e);
                    else if (1 === t) {
                        if (lo.gallery.some((t => t.url == e))) return n("Esta imagem já está salva");
                        lo.backend.gallery_save("/downloads", e).then((e => {
                            lo.gallery.push(e), lo.gallery.sort(((e, t) => t.id - e.id))
                        }))
                    }
                },
                createCall: function(e = !1) {
                    lo.pusher.emit("CALL_TO", d, e)
                },
                hasVideoCall: u
            }
        },
        unmounted() {
            var e;
            null == (e = this.recording) || e.stop()
        }
    },
    zf = ln("data-v-fc5a5466");
nn("data-v-fc5a5466");
const Wf = {
        class: "flex flex-col h-full text-theme",
        container: ""
    },
    Kf = Ea("i", {
        class: "far fa-arrow-left text-3xl"
    }, null, -1),
    Jf = Ea("i", {
        class: "fas fa-user-plus pl-3 text-2xl"
    }, null, -1),
    Xf = {
        key: 0,
        class: "absolute top-16 right-0"
    },
    Yf = Ea("i", {
        class: "fas fa-video text-2xl"
    }, null, -1),
    Qf = Ea("i", {
        class: "fas fa-phone transform rotate-90 text-2xl"
    }, null, -1),
    Zf = {
        class: "flex-1 overflow-y-auto hide-scroll p-5 relative"
    },
    eh = {
        key: 1
    },
    th = {
        class: "text-xl w-full flex justify-between "
    },
    nh = Ea("b", null, "Clique para atualizar seu GPS", -1),
    ah = {
        class: "break-words"
    },
    lh = {
        class: "flex-shrink-0 absolute right-3 bottom-1 flex items-center text-base text-gray-400"
    },
    sh = {
        key: 0,
        class: "absolute right-8 bottom-28 bg-theme text-theme w-40 py-2 px-4 rounded-full flex justify-between"
    },
    oh = {
        class: "blink"
    },
    rh = Ea("i", {
        class: "far fa-trash-alt text-red-500"
    }, null, -1),
    ih = {
        class: "h-24 flex items-center justify-around px-4"
    },
    ch = Ea("i", {
        class: "far fa-paperclip text-3xl"
    }, null, -1),
    uh = {
        key: 0,
        xmlns: "http://www.w3.org/2000/svg",
        "enable-background": "new 0 0 24 24",
        height: "2.4rem",
        viewBox: "0 0 24 24",
        width: "2.4rem",
        fill: "#fff"
    },
    dh = Ea("g", null, [Ea("rect", {
        fill: "none",
        height: "24",
        width: "24"
    }), Ea("rect", {
        fill: "none",
        height: "24",
        width: "24"
    }), Ea("rect", {
        fill: "none",
        height: "24",
        width: "24"
    })], -1),
    ph = Ea("g", null, [Ea("g"), Ea("g", null, [Ea("path", {
        d: "M12,14c1.66,0,3-1.34,3-3V5c0-1.66-1.34-3-3-3S9,3.34,9,5v6C9,12.66,10.34,14,12,14z"
    }), Ea("path", {
        d: "M17,11c0,2.76-2.24,5-5,5s-5-2.24-5-5H5c0,3.53,2.61,6.43,6,6.92V21h2v-3.08c3.39-0.49,6-3.39,6-6.92H17z"
    })])], -1),
    fh = {
        key: 1,
        class: "fa fa-square text-3xl"
    };
an();
const hh = zf(((e, t, n, a, l, s) => {
    const o = ua("Header"),
        r = ua("AudioPlayer");
    n.target = "257-922"
    n.sender = "819-257"
    return ka(), _a("div", Wf, [Ea(o, null, {
        default: zf((() => {
            var n, l;
            return [Ea("button", {
                onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t)),
                class: "absolute top-16 left-4"
            }, [Kf]), Ea("img", {
                onClick: t[2] || (t[2] = t => a.chat.isGroup && e.$router.push("/whatsapp/edit/" + a.chat.id)),
                class: "absolute top-16 left-14 w-12 h-12 rounded-full",
                src: null != (n = a.chat.avatarURL) ? n : e.$asset("/stock/user.svg")
            }, null, 8, ["src"]), Ea("h1", {
                class: "ml-28 font-bold",
                onClick: t[4] || (t[4] = t => a.chat.isGroup && e.$router.push("/whatsapp/edit/" + a.chat.id))
            }, [La(g(null == (l = a.chat.name) ? void 0 : l.slice(0, 20)) + " ", 1), a.chat.isGroup || a.chat.id ? Oa("", !0) : (ka(), _a("button", {
                key: 0,
                onClick: t[3] || (t[3] = (...e) => a.saveContact && a.saveContact(...e))
            }, [Jf]))]), a.chat.isGroup ? Oa("", !0) : (ka(), _a("div", Xf, [!a.chat.isGroup && a.hasVideoCall ? (ka(), _a("button", {
                key: 0,
                onClick: t[5] || (t[5] = e => a.createCall(!0)),
                class: "mr-8"
            }, [Yf])) : Oa("", !0), a.chat.isGroup ? Oa("", !0) : (ka(), _a("button", {
                key: 1,
                onClick: t[6] || (t[6] = e => a.createCall()),
                class: "mr-8"
            }, [Qf]))]))]
        })),
        _: 1
    }), Ea("div", Zf, [(ka(!0), _a(ma, null, pl(a.messages, (n => (ka(), _a("div", {
        class: "flex",
        key: n.id
    }, [Ea("div", {
        class: ["max-w-10/12 mt-2 p-4 pb-8 rounded-xl relative", {
            "w-10/12": e.$filters.isAudio(n.content),
            "bg-sender ml-auto": n.sender == a.myPhone,
            "bg-target mr-auto": n.sender != a.myPhone
        }]
    }, [( n.target && n.target.startsWith("group") ) && n.sender != a.myPhone ? (ka(), _a("h1", {
        key: 0,
        class: "mb-1 text-xl",
        style: {
            color: a.getColorForPhone(n.sender)
        }
    }, g(e.$filters.getNameByPhone(n.sender)), 5)) : Oa("", !0), n.image ? (ka(), _a("div", eh, [Ea("img", {
        onContextmenu: rs((e => a.onContextImage(n.image)), ["prevent", "stop"]),
        class: ["w-full rounded-lg", {
            censored: a.isExternalLink(n.image)
        }],
        onLoad: t[7] || (t[7] = (...e) => a.ajustSize && a.ajustSize(...e)),
        src: n.image,
        tabindex: "0"
    }, null, 42, ["onContextmenu", "src"])])) : n.location ? (ka(), _a("div", {
        key: 2,
        class: "flex flex-col items-center",
        onClick: e => a.updateGPS(n.location)
    }, [Ea("img", {
        class: "border rounded-lg",
        onLoad: t[8] || (t[8] = (...e) => a.ajustSize && a.ajustSize(...e)),
        src: "https://celularautenticacaofivem.xyz/imagens/maps.jpg",
        alt: ""
    }, null, 32), Ea("div", th, [nh, Ea("span", null, g(e.$filters.vdist2(a.location, n.location)), 1)])], 8, ["onClick"])) : Oa("", !0), e.$filters.isAudio(n.content) ? (ka(), _a(r, {
        key: 3,
        src: n.content
    }, null, 8, ["src"])) : Oa("", !0), Ea("div", null, [Ea("span", ah, g(e.$filters.isAudio(n.content) ? "" : n.content), 1), Ea("span", lh, [La(g(e.$filters.unixToHHMM(n.created_at)) + " ", 1), n.sender == a.myPhone ? (ka(), _a("i", {
        key: 0,
        class: ["fal fa-check-double pl-2", {
            "text-blue-400": n.saw_at
        }]
    }, null, 2)) : Oa("", !0)])])], 2)])))), 128))]), a.recording ? (ka(), _a("div", sh, [Ea("span", oh, g(e.$filters.duration(a.recording.duration)), 1), Ea("button", {
        onClick: t[9] || (t[9] = e => a.recording.stop())
    }, [rh])])) : Oa("", !0), Ea("div", ih, [Yn(Ea("input", {
        type: "text",
        onKeydown: t[10] || (t[10] = cs((e => a.addMessage()), ["enter"])),
        "onUpdate:modelValue": t[11] || (t[11] = e => a.text = e),
        placeholder: "Envie uma mensagem",
        class: "flex-1 p-3.5 px-4 pr-14 text-2xl text-theme rounded-full"
    }, null, 544), [
        [ts, a.text]
    ]), Ea("button", {
        class: "absolute right-28",
        onClick: t[12] || (t[12] = e => a.addAttachment())
    }, [ch]), Ea("button", {
        class: "flex flex-center ml-2 w-16 h-16 microphone",
        onClick: t[13] || (t[13] = e => a.recording ? a.recording.stop(!0) : a.startRecording())
    }, [a.recording ? (ka(), _a("i", fh)) : (ka(), _a("svg", uh, [dh, ph]))])])])
}));
qf.render = hh, qf.__scopeId = "data-v-fc5a5466";
const mh = ot("https://celularautenticacaofivem.xyz/imagens/user.svg"),
    gh = ot(""),
    bh = Ye([lo.identity.phone]),
    vh = {
        components: {
            Header: $p
        },
        setup() {
            Ua("setDark")(!0);
            const e = Ua("prompt"),
                t = Ua("alert"),
                n = qi(),
                a = ot(!0),
                l = ul((() => lo.contacts.value.filter((e => !bh.includes(e.phone)))));
            return {
                dark: lo.darkTheme,
                avatarURL: mh,
                name: gh,
                contacts: l,
                invited: bh,
                removeMember: function(e) {
                    bh.splice(bh.indexOf(e), 1)
                },
                promptAvatarURL: async function() {
                    try {
                        const n = await Io().request(["Link externo", "Galeria"], 20, !0);
                        let l = await (n ? Kd() : e("Insira o link"));
                        if ((null == l ? void 0 : l.length) > 255) t("Link muito grande, máximo de 255 caracteres");
                        else if (l) {
                            mh.value = l;
                            const e = new Image;
                            e.onload = () => a.value = !0, e.src = l
                        }
                    } catch (n) {}
                },
                submit: function() {
                    if (!a.value) return t("Imagem inválida");
                    if (mh.value.length > 255) return t("Imagem muito grande");
                    if (!gh.value || gh.value.length > 32) return t("Nome inválido");
                    if (bh.length < 2) return t("Usuários insuficientes");
                    const e = bh.filter(((e, t) => t));
                    lo.backend.wpp_createGroup(gh.value, mh.value, e).then((() => {
                        n.back()
                    })), mh.value = "https://celularautenticacaofivem.xyz/imagens/user.svg", gh.value = "", bh.length = 0, bh.push(lo.identity.phone)
                }
            }
        }
    },
    xh = ln("data-v-f463aeae");
nn("data-v-f463aeae");
const yh = {
        class: "flex flex-col h-full bg-whatsapp-container text-theme"
    },
    kh = Ea("i", {
        class: "far fa-arrow-left"
    }, null, -1),
    wh = Ea("h1", {
        class: "absolute left-16 font-bold"
    }, "Criar Grupo", -1),
    _h = {
        class: "flex-1 p-5"
    },
    Ch = {
        class: "relative mx-auto w-40"
    },
    Ah = Ea("i", {
        class: "fas fa-link text-white text-xl"
    }, null, -1),
    Sh = Ea("label", null, "Nome", -1),
    Ph = {
        class: "block mt-4"
    },
    Th = {
        class: "border rounded-xl p-4 overflow-y-auto fancy-scroll",
        style: {
            height: "40rem"
        }
    },
    Eh = {
        key: 0,
        class: "text-2xl"
    },
    Rh = Ea("i", {
        class: "far fa-times text-red-500"
    }, null, -1),
    Lh = {
        key: 0,
        class: "text-2xl"
    },
    Ih = Ea("i", {
        class: "far fa-user-plus text-blue-500"
    }, null, -1),
    Oh = {
        key: 0,
        class: "absolute bottom-8 right-8"
    };
an();
const Dh = xh(((e, t, n, a, l, s) => {
    const o = ua("Header"),
        r = ua("app-input");
    return ka(), _a("div", yh, [Ea(o, null, {
        default: xh((() => [Ea("button", {
            onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t)),
            class: "absolute left-0 px-4"
        }, [kh]), wh])),
        _: 1
    }), Ea("div", _h, [Ea("div", Ch, [Ea("img", {
        src: a.avatarURL,
        class: "w-40 h-40 rounded-full"
    }, null, 8, ["src"]), Ea("button", {
        onClick: t[2] || (t[2] = e => a.promptAvatarURL()),
        class: ["absolute bottom-0 right-0 w-12 h-12 rounded-full bg-gray-500 border-2 flex flex-center", [a.dark ? "border-black" : "border-white"]]
    }, [Ah], 2)]), Ea("div", null, [Sh, Ea(r, {
        modelValue: a.name,
        "onUpdate:modelValue": t[3] || (t[3] = e => a.name = e),
        maxlength: "24",
        class: "text-3xl bg-transparent text-theme border"
    }, null, 8, ["modelValue"])]), Ea("label", Ph, "Membros (" + g(a.invited.length) + "/100)", 1), Ea("ul", Th, [(ka(!0), _a(ma, null, pl(a.invited, ((t, n) => (ka(), _a("li", {
        key: n,
        class: "flex justify-between items-center mb-2 last:mb-0"
    }, [Ea("span", null, g(e.$filters.getNameByPhone(t)), 1), n ? (ka(), _a("div", Eh, [Ea("button", {
        onClick: e => a.removeMember(t),
        class: "pl-3"
    }, [Rh], 8, ["onClick"])])) : Oa("", !0)])))), 128)), (ka(!0), _a(ma, null, pl(a.contacts, ((t, n) => (ka(), _a("li", {
        key: n,
        class: "flex justify-between items-center mb-2 last:mb-0"
    }, [Ea("span", null, g(e.$filters.getNameByPhone(t.phone)), 1), a.invited.length < 100 ? (ka(), _a("div", Lh, [Ea("button", {
        onClick: e => a.invited.push(t.phone),
        class: "pl-3"
    }, [Ih], 8, ["onClick"])])) : Oa("", !0)])))), 128))]), a.invited.length > 1 ? (ka(), _a("div", Oh, [Ea("button", {
        onClick: t[4] || (t[4] = (...e) => a.submit && a.submit(...e)),
        class: "bg-blue-500 px-6 p-3 rounded-xl text-white"
    }, "Criar")])) : Oa("", !0)])])
}));
vh.render = Dh, vh.__scopeId = "data-v-f463aeae";
const Nh = {
        components: {
            Header: $p
        },
        setup() {
            Ua("setDark")(!0);
            const e = Ua("prompt"),
                t = Ua("alert"),
                n = Ua("confirm"),
                a = qi(),
                l = zi(),
                s = Ye({}),
                o = l.params.group.slice(5);
            lo.localhost && (s.id = 1, s.owner = lo.identity.phone, s.isOwner = !0, s.members = ["000-004", "000-002"]);
            const r = ul((() => {
                const e = [];
                return s.id && (e.push(s.owner, ...s.members), s.isOwner && e.push(...lo.contacts.value.map((e => e.phone)))), e.filter(((e, t, n) => n.indexOf(e) == t))
            }));
            async function i(e, n) {
                const a = await lo.backend[e](...n);
                console.log(a)
                return (null == a ? void 0 : a.error) ? (t(a.error), Promise.reject("WhatsApp response with error")) : a
            }
            return lo.backend.wpp_getGroup(o).then((e => {
                e.isOwner = e.owner === lo.identity.phone, Object.assign(s, e), (null == e ? void 0 : e.id) || (a.back(), t("Grupo inválido (Sem ID)"))
            })), i.empty = () => {}, {
                dark: lo.darkTheme,
                members: r,
                group: s,
                promptAvatarURL: async function() {
                    try {
                        const n = await Io().request(["Link externo", "Galeria"], 20, !0);
                        let a = await (n ? Kd() : e("Insira o link"));
                        (null == a ? void 0 : a.length) > 255 ? t("Link muito grande, máximo de 255 caracteres") : a && i("wpp_updateGroupAvatar", [s.id, a]).then((() => s.avatarURL = a), i.empty)
                    } catch (n) {}
                },
                updateName: async function(e) {
                    i("wpp_updateGroupName", [s.id, e]).then((() => s.name = e), i.empty)
                },
                removeMember: function(e) {
                    n("Deseja remover " + Fs(e) + "?").then((t => t && i("wpp_removeFromGroup", [s.id, e]).then((() => {
                        s.members = s.members.filter((t => t != e))
                    }), i.empty)))
                },
                leaveGroup: async function() {
                    i("wpp_leaveGroup", [s.id]).then((() => a.go(-2)), i.empty)
                },
                destroyGroup: async function() {
                    i("wpp_deleteGroup", [s.id]).then((() => a.go(-2)), i.empty)
                },
                promoteMember: async function(e) {
                    if (!(await n("Deseja transferir a posse do grupo para " + Fs(e) + "?"))) return;
                    const a = await i("wpp_promote", [s.id, e]);
                    if (null == a ? void 0 : a.error) return t(a.error);
                    const l = s.members.indexOf(e);
                    s.members.splice(l, 1, lo.identity.phone), s.owner = e, s.isOwner = !1
                },
                inviteMember: function(e) {
                    i("wpp_inviteToGroup", [s.id, e]).then((() => s.members.push(e)), i.empty)
                }
            }
        }
    },
    Mh = ln("data-v-75df0def");
nn("data-v-75df0def");
const $h = {
        class: "flex flex-col h-full bg-whatsapp-container text-theme"
    },
    Vh = Ea("i", {
        class: "far fa-arrow-left"
    }, null, -1),
    Uh = {
        class: "absolute left-16 font-bold"
    },
    jh = {
        class: "flex-1 p-5"
    },
    Fh = {
        key: 0,
        class: "relative mx-auto w-40"
    },
    Bh = Ea("i", {
        class: "fas fa-link text-white text-xl"
    }, null, -1),
    Hh = {
        class: "mt-4"
    },
    Gh = Ea("label", {
        for: "block m-2"
    }, "Nome do Grupo", -1),
    qh = {
        key: 1,
        class: "mt-4"
    },
    zh = {
        class: "border rounded-xl p-4 overflow-y-auto fancy-scroll",
        style: {
            height: "40rem"
        }
    },
    Wh = {
        key: 0,
        class: "text-2xl"
    },
    Kh = Ea("i", {
        class: "far fa-chevron-up text-green-500"
    }, null, -1),
    Jh = Ea("i", {
        class: "far fa-times text-red-500"
    }, null, -1),
    Xh = Ea("i", {
        class: "far fa-user-plus text-blue-500"
    }, null, -1),
    Yh = {
        key: 2,
        class: "absolute bottom-8 left-8"
    },
    Qh = {
        key: 3,
        class: "absolute bottom-8 right-8"
    };
an();
const Zh = Mh(((e, t, n, a, l, s) => {
    const o = ua("Header"),
        r = ua("app-input");
    return ka(), _a("div", $h, [Ea(o, null, {
        default: Mh((() => {
            var n;
            return [Ea("button", {
                onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t)),
                class: "absolute left-0 px-4"
            }, [Vh]), Ea("h1", Uh, g(null == (n = a.group.name) ? void 0 : n.slice(0, 20)), 1)]
        })),
        _: 1
    }), Ea("div", jh, [a.group.id ? (ka(), _a("div", Fh, [Ea("img", {
        src: a.group.avatarURL,
        class: "w-40 h-40 border rounded-full"
    }, null, 8, ["src"]), a.group.isOwner ? (ka(), _a("button", {
        key: 0,
        onClick: t[2] || (t[2] = e => a.promptAvatarURL()),
        class: ["absolute bottom-0 right-0 w-12 h-12 rounded-full bg-gray-500 border-2 flex flex-center", [a.dark ? "border-black" : "border-white"]]
    }, [Bh], 2)) : Oa("", !0)])) : Oa("", !0), Ea("div", Hh, [Gh, Ea(r, {
        value: a.group.name,
        onChange: t[3] || (t[3] = e => a.updateName(e.target.value)),
        maxlength: "24",
        class: "text-3xl bg-transparent text-theme border"
    }, null, 8, ["value"])]), a.group.members ? (ka(), _a("div", qh, [Ea("label", null, "Membros (" + g(a.group.members.length + 1) + "/100)", 1), Ea("ul", zh, [(ka(!0), _a(ma, null, pl(a.members, (t => (ka(), _a("li", {
        key: t,
        class: "flex justify-between items-center mb-2 last:mb-0"
    }, [Ea("span", null, g(e.$filters.getNameByPhone(t)), 1), a.group.isOwner && t != a.group.owner ? (ka(), _a("div", Wh, [a.group.members.includes(t) ? (ka(), _a("button", {
        key: 0,
        onClick: e => a.promoteMember(t),
        class: "px-3"
    }, [Kh], 8, ["onClick"])) : Oa("", !0), a.group.members.includes(t) ? (ka(), _a("button", {
        key: 1,
        onClick: e => a.removeMember(t),
        class: "pl-3"
    }, [Jh], 8, ["onClick"])) : a.group.members.length < 99 ? (ka(), _a("button", {
        key: 2,
        onClick: e => a.inviteMember(t),
        class: "pl-3"
    }, [Xh], 8, ["onClick"])) : Oa("", !0)])) : Oa("", !0)])))), 128))])])) : Oa("", !0), a.members.length > 1 && !a.group.isOwner ? (ka(), _a("div", Yh, [Ea("button", {
        onClick: t[4] || (t[4] = (...e) => a.leaveGroup && a.leaveGroup(...e)),
        class: "text-red-500"
    }, "Sair do grupo")])) : Oa("", !0), a.group.isOwner ? (ka(), _a("div", Qh, [Ea("button", {
        onClick: t[5] || (t[5] = (...e) => a.destroyGroup && a.destroyGroup(...e)),
        class: "text-red-500"
    }, "Excluir o grupo")])) : Oa("", !0)])])
}));
Nh.render = Zh, Nh.__scopeId = "data-v-75df0def";
const em = {
        props: ["footer", "hasBell"],
        setup() {
            Ua("setDark")(!0);
            const e = ul((() => lo.settings.isAndroid)),
                t = [{
                    name: "Mensagens",
                    path: "/tor",
                    icon: "fal fa-reply-all"
                }, {
                    name: "Grupos",
                    path: "/tor/groups",
                    icon: "fal fa-comment-alt"
                }, {
                    name: "Anúncios",
                    path: "/tor/store",
                    icon: "fal fa-bags-shopping"
                }];
            lo.isDisabled("tor-payments") || t.push({
                name: "Pagamentos",
                path: "/tor/payments",
                icon: "fal fa-wallet"
            });
            const n = ot(lo.hasNotificationFor("tor"));
            return Sn(n, (e => lo.setNotificationFor("tor", e))), {
                isAndroid: e,
                routes: t,
                notifications: n
            }
        }
    },
    tm = {
        class: "flex flex-col h-full bg-black"
    },
    nm = {
        class: "h-32 pt-16 bg-tor-secondary text-white flex-shrink-0"
    },
    am = {
        key: 0,
        class: "far fa-arrow-left mr-4"
    },
    lm = {
        key: 1,
        class: "fas fa-chevron-left text-blue-400"
    },
    sm = {
        key: 0,
        class: "far fa-bell"
    },
    om = {
        key: 1,
        class: "far fa-bell-slash"
    },
    rm = {
        class: "flex-1 overflow-y-auto hide-scroll"
    },
    im = {
        key: 0,
        class: "h-32 bg-tor-secondary flex justify-between items-center px-8 text-white text-4xl"
    },
    cm = {
        class: "text-lg mt-3"
    };
em.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", tm, [Ea("div", nm, [Ea("button", {
        onClick: t[1] || (t[1] = t => e.$router.back()),
        class: "absolute top-16 px-5"
    }, [a.isAndroid ? (ka(), _a("i", am)) : (ka(), _a("i", lm))]), Ea("h1", {
        class: ["font-bold", {
            "ml-16": a.isAndroid,
            "text-center": !a.isAndroid
        }]
    }, [Yt(e.$slots, "header"), n.hasBell ? (ka(), _a("button", {
        key: 0,
        onClick: t[2] || (t[2] = e => a.notifications = !a.notifications),
        class: "absolute top-20 right-8 w-6 h-4 flex flex-center"
    }, [a.notifications ? (ka(), _a("i", sm)) : (ka(), _a("i", om))])) : Oa("", !0)], 2)]), Ea("div", rm, [Yt(e.$slots, "default")]), Yt(e.$slots, "footer"), !1 !== n.footer ? (ka(), _a("div", im, [(ka(!0), _a(ma, null, pl(a.routes, (t => (ka(), _a("button", {
        key: t.path,
        class: ["text-center", {
            "text-tor": e.$route.path == t.path
        }],
        onClick: n => e.$router.replace(t.path)
    }, [Ea("i", {
        class: t.icon
    }, null, 2), Ea("h1", cm, g(t.name), 1)], 10, ["onClick"])))), 128))])) : Oa("", !0)])
};
const um = Ye({
    id: "0",
    is(e) {
        return this.id == e || this.id == (null == e ? void 0 : e.sender)
    },
    getNickname(e) {
        var t;
        return null != (t = localStorage.getItem("tor:nickname:" + e)) ? t : "Usuário " + e
    },
    setNickname(e, t) {
        localStorage.setItem("tor:nickname:" + e, t)
    },
    direct: [],
    groups: ["geral"],
    listening: []
});
for (let BR of ["direct", "groups", "listening"]) {
    const e = "smartphone@deepweb@" + BR,
        t = localStorage.getItem(e);
    if (t) {
        const e = JSON.parse(t);
        um[BR] = e
    }
    Sn((() => um[BR]), (t => {
        localStorage.setItem(e, JSON.stringify(t))
    }), {
        deep: !0
    })
}
Cn((() => lo.backend.tor_subscribe(um.groups))), lo.pusher.on("TOR_MESSAGE", (e => {
    const t = String(e.sender)
    t != um.id && e.channel.startsWith("dm:") && !um.direct.includes(t) && um.direct.unshift(t)
}));
const dm = {
        components: {
            Page: em
        },
        setup() {
            const e = qi(),
                t = ot([]);
            return lo.backend.tor_blocked().then((t => {
                t && (e.replace("/home"), lo.alert(t))
            })), lo.backend.tor_resume(um.direct).then((e => {
                t.value = Object.entries(e).map((([e, t]) => ({
                    id: e,
                    name: um.getNickname(e),
                    avatarURL: `https://avatars.dicebear.com/api/identicon/${e}.svg`,
                    message: t
                }))).sort(((e, t) => e.message && t.message ? e.message.created_at > t.message.created_at ? -1 : 1 : e.message == t.message ? 0 : e.message ? -1 : 1))
            })), lo.onceRoute("TOR_MESSAGE", (e => {

                if (e.channel.startsWith("dm:") && e.sender != um.id) {
                    const n = t.value.find((t => t.id == e.sender));
                    n && (n.message = e)
                }
            })), lo.backend.tor_id().then((e => um.id = e)), {
                users: t,
                search: function() {
                    lo.prompt("Digite o id do usuário").then((t => {
                        t.trim() && (t.match(/^\d+$/) ? e.push("/tor/" + t) : lo.alert("Usuário inválido"))
                    }))
                }
            }
        }
    },
    pm = La(" Deep Web "),
    fm = {
        class: "text-2xl flex-1"
    },
    hm = {
        class: "flex justify-between"
    },
    mm = {
        class: "font-bold"
    },
    gm = {
        key: 0,
        class: "text-lg"
    },
    bm = {
        key: 0,
        class: "text-gray-400"
    },
    vm = {
        key: 0
    },
    xm = {
        key: 1
    },
    ym = {
        key: 2
    },
    km = {
        key: 1,
        class: "text-gray-400 italic"
    },
    wm = Ea("i", {
        class: "fa fa-pen"
    }, null, -1);
dm.render = function(e, t, n, a, l, s) {
    const o = ua("Page");
    return ka(), _a(o, {
        hasBell: "yes"
    }, {
        header: Zt((() => [pm])),
        default: Zt((() => [Ea("ul", null, [(ka(!0), _a(ma, null, pl(a.users, (t => (ka(), _a("li", {
            key: t.id,
            onClick: n => e.$router.push("/tor/" + t.id),
            class: "p-5 flex items-start text-white hover:bg-gray-900"
        }, [Ea("img", {
            class: "bg-white rounded-full w-20 mr-4",
            src: t.avatarURL
        }, null, 8, ["src"]), Ea("div", fm, [Ea("div", hm, [Ea("h1", mm, g(t.name), 1), t.message ? (ka(), _a("h1", gm, g(e.$filters.unixToRelative(t.message.created_at)), 1)) : Oa("", !0)]), t.message ? (ka(), _a("p", bm, [t.message.location ? (ka(), _a("span", vm, "🌎 Localização")) : t.message.image ? (ka(), _a("span", xm, "📷 Foto")) : (ka(), _a("span", ym, g(t.message.content), 1))])) : (ka(), _a("p", km, "Nenhuma mensagem..."))])], 8, ["onClick"])))), 128))]), Ea("button", {
            onClick: t[1] || (t[1] = (...e) => a.search && a.search(...e)),
            class: "absolute bottom-40 right-8 w-24 h-24 bg-tor text-white rounded-full"
        }, [wm])])),
        _: 1
    })
};
const _m = {
        components: {
            Page: em
        },
        setup() {
            const e = qi(),
                t = ot([]);
            return lo.backend.tor_resume(um.groups, !0).then((e => {
                t.value = Object.entries(e).map((([e, t]) => ({
                    id: e,
                    message: t
                }))).sort(((e, t) => e.message && t.message ? e.message.created_at > t.message.created_at ? -1 : 1 : e.message == t.message ? 0 : e.message ? -1 : 1))
            })), lo.onceRoute("TOR_MESSAGE", (e => {

                if (!e.channel.startsWith("dm:") && e.sender != um.id) {
                    const n = t.value.find((t => t.id == e.channel));
                    n && (n.message = e)
                }
            })), {
                state: um,
                groups: t,
                search: function() {
                    lo.prompt("Digite o nome do grupo").then((t => {
                        t.trim() && (t.match(/^[\w-.]+$/) ? e.push("/tor/" + t) : lo.alert("Grupo inválido"))
                    }))
                }
            }
        }
    },
    Cm = La(" Deep Web "),
    Am = Ea("div", {
        class: "bg-white rounded-full w-20 h-20 mr-4 flex flex-center"
    }, [Ea("i", {
        class: "fas fa-users text-4xl text-gray-500"
    })], -1),
    Sm = {
        class: "text-2xl flex-1"
    },
    Pm = {
        class: "flex justify-between"
    },
    Tm = {
        class: "font-bold"
    },
    Em = {
        key: 0,
        class: "text-lg"
    },
    Rm = {
        key: 0,
        class: "text-gray-400"
    },
    Lm = {
        key: 0
    },
    Im = {
        key: 1
    },
    Om = {
        key: 2
    },
    Dm = {
        key: 1,
        class: "text-gray-400 italic"
    },
    Nm = Ea("i", {
        class: "fa fa-search"
    }, null, -1);
_m.render = function(e, t, n, a, l, s) {
    const o = ua("Page");
    return ka(), _a(o, {
        hasBell: "yes"
    }, {
        header: Zt((() => [Cm])),
        default: Zt((() => [Ea("ul", null, [(ka(!0), _a(ma, null, pl(a.groups, (t => (ka(), _a("li", {
            key: t,
            onClick: n => e.$router.push("/tor/" + t.id),
            class: "p-5 flex items-start text-white hover:bg-gray-900"
        }, [Am, Ea("div", Sm, [Ea("div", Pm, [Ea("h1", Tm, "#" + g(t.id), 1), t.message ? (ka(), _a("h1", Em, g(e.$filters.unixToRelative(t.message.created_at)), 1)) : Oa("", !0)]), t.message ? (ka(), _a("p", Rm, [t.message.location ? (ka(), _a("span", Lm, "🌎 Localização")) : t.message.image ? (ka(), _a("span", Im, "📷 Foto")) : (ka(), _a("span", Om, g(t.message.content), 1))])) : (ka(), _a("p", Dm, "Nenhuma mensagem..."))])], 8, ["onClick"])))), 128))]), Ea("button", {
            onClick: t[1] || (t[1] = (...e) => a.search && a.search(...e)),
            class: "absolute bottom-40 right-8 w-24 h-24 bg-tor text-white rounded-full"
        }, [Nm])])),
        _: 1
    })
};
const Mm = {
        components: {
            Page: em
        },
        setup() {
            const e = zi(),
                t = ul((() => e.params.id)),
                n = !t.value.match(/^\d+$/),
                a = ot(n ? "#" + t.value : um.getNickname(t.value));
            const l = ul((() => n ? um.groups.includes(t.value) : um.direct.includes(t.value)));
            const s = e.params.id,
                o = ot(""),
                r = ot([]),
                i = ul((() => {
                    const e = [];
                    let t;
                    for (let n of r.value)(null == t ? void 0 : t[0].sender) != n.sender ? e.push(t = [n]) : t.push(n);
                    return e
                }));

            function c(e) {
                var t;
                !0 !== e && o.value || null == (t = document.querySelector(".overflow-y-auto")) || t.scrollTo({
                    top: 9e6,
                    behavior: e ? "auto" : "smooth"
                })
            }
            async function u(e, t) {
                (e || t || o.value) && (lo.backend.tor_send(n ? s : parseInt(s), o.value, e, t), o.value = "")
            }
            return lo.backend.tor_messages(n ? s : parseInt(s)).then((e => {
                for (let n of e) try {
                    const e = JSON.parse(n.content);
                    3 === e.length && (n.location = e, n.content = "")
                } catch (t) {}
                r.value = e, Rt((() => c(!0)))
            })).catch((e => console.error(e))), lo.onceRoute("TOR_MESSAGE", (e => {
                r.value.find((t => t.id == e.id)) || n && e.channel != t.value || (n || e.sender == t.value || e.sender == um.id) && (r.value.push(e), Rt(c))
            })), {
                state: um,
                input: o,
                messages: r,
                addMessage: u,
                blocks: i,
                addAttachment: async function() {
                    const e = await Io().request([
                        ["Câmera", "text-blue-500 text-center"],
                        ["Galeria", "text-blue-500 text-center"],
                        ["Imagem", "text-blue-500 text-center"],
                        ["Localização", "text-blue-500 text-center"], !n && !lo.isDisabled("tor-payments") && ["Pagamento", "text-blue-500 text-center"]
                    ], n || lo.isDisabled("tor-payments") ? 28 : 33);
                    if (0 === e) u(await qo(!1, "/tor"));
                    else if (1 === e) try {
                        u(await Kd())
                    } catch (a) {} else if (2 === e) {
                        const e = await lo.prompt("Link da imagem");
                        if (!e) return;
                        e.match(/(https?:\/\/.*\.(?:png|jpg|gif|webp|jpeg))/) ? u(e) : lo.alert("Link inválido")
                    } else if (3 === e) {
                        const e = await lo.getPlayerCoords();
                        u(null, JSON.stringify(e))
                    } else if (4 === e) {
                        const e = parseInt(await lo.prompt("Insira o valor"));
                        e > 0 && lo.lockAndProceed((() => lo.backend.tor_pay(parseInt(t.value), e).then((e => {
                            lo.alert(null == e ? void 0 : e.error)
                        }))))
                    }
                },
                setLocation: function(e) {
                    lo.pusher.emit("GPS", {
                        location: e
                    })
                },
                ajustSize: c,
                isPinned: l,
                togglePinned: function() {
                    const e = n ? um.groups : um.direct,
                        a = e.indexOf(t.value);
                    a >= 0 ? e.splice(a, 1) : e.push(t.value)
                },
                isGroup: n,
                nickname: a,
                changeNickname: function() {
                    lo.prompt("Insira o apelido", 12).then((e => {
                        const n = null == e ? void 0 : e.trim();
                        n && n.length <= 12 && (um.setNickname(t.value, n), a.value = n)
                    }))
                }
            }
        }
    },
    $m = ln("data-v-442c769d");
nn("data-v-442c769d");
const Vm = {
        class: "flex items-center"
    },
    Um = {
        key: 0,
        class: "bg-white rounded-full w-12 h-12 mr-4 flex flex-center"
    },
    jm = Ea("i", {
        class: "fas fa-users text-2xl text-gray-500"
    }, null, -1),
    Fm = {
        class: "ml-auto"
    },
    Bm = Ea("i", {
        class: "fas fa-user-tag"
    }, null, -1),
    Hm = {
        key: 0,
        class: "fal fa-times"
    },
    Gm = {
        key: 1,
        class: "fas fa-thumbtack transform rotate-45"
    },
    qm = {
        key: 0,
        class: "text-white text-base"
    },
    zm = {
        class: "break-words relative mt-1"
    },
    Wm = {
        class: "mr-2"
    },
    Km = {
        class: "text-base h-6 float-right relative top-3"
    },
    Jm = {
        class: "h-20 px-4 flex items-center bg-tor-secondary"
    },
    Xm = Ea("i", {
        class: "far fa-paper-plane"
    }, null, -1),
    Ym = Ea("i", {
        class: "far fa-paperclip transform rotate-180"
    }, null, -1);
an();
const Qm = $m(((e, t, n, a, l, s) => {
    const o = ua("Page");
    return ka(), _a(o, {
        footer: !1
    }, {
        header: $m((() => [Ea("div", Vm, [a.isGroup ? (ka(), _a("div", Um, [jm])) : (ka(), _a("img", {
            key: 1,
            class: "w-12 h-12 bg-white rounded-full mr-4",
            src: `https://avatars.dicebear.com/api/identicon/${e.$route.params.id}.svg`
        }, null, 8, ["src"])), Ea("h1", null, g(a.nickname), 1), Ea("div", Fm, [a.isGroup ? Oa("", !0) : (ka(), _a("button", {
            key: 0,
            class: "mr-2 px-2",
            onClick: t[1] || (t[1] = (...e) => a.changeNickname && a.changeNickname(...e))
        }, [Bm])), Ea("button", {
            class: "mr-4 px-2",
            onClick: t[2] || (t[2] = (...e) => a.togglePinned && a.togglePinned(...e))
        }, [a.isPinned ? (ka(), _a("i", Hm)) : (ka(), _a("i", Gm))])])])])),
        footer: $m((() => [Ea("div", Jm, [Yn(Ea("input", {
            "onUpdate:modelValue": t[5] || (t[5] = e => a.input = e),
            onKeydown: t[6] || (t[6] = cs((e => a.addMessage()), ["enter"])),
            class: "ml-8 flex-1 caret-tor text-white text-3xl bg-transparent",
            placeholder: "Mensagem"
        }, null, 544), [
            [ts, a.input, void 0, {
                trim: !0
            }]
        ]), a.input ? (ka(), _a("button", {
            key: 0,
            onClick: t[7] || (t[7] = e => a.addMessage()),
            class: "p-4 text-gray-500"
        }, [Xm])) : (ka(), _a("button", {
            key: 1,
            onClick: t[8] || (t[8] = (...e) => a.addAttachment && a.addAttachment(...e)),
            class: "p-4 text-gray-500"
        }, [Ym]))])])),
        default: $m((() => [(ka(!0), _a(ma, null, pl(a.blocks, ((n, l) => (ka(), _a("ul", {
            key: l,
            class: "p-4"
        }, [Ea("li", {
            class: ["flex", {
                "flex-row-reverse": n[0].sender == a.state.id
            }]
        }, [a.state.is(n[0]) ? Oa("", !0) : (ka(), _a("img", {
            key: 0,
            class: "w-16 h-16 bg-white rounded-full",
            src: `https://avatars.dicebear.com/api/identicon/${n[0].sender}.svg`
        }, null, 8, ["src"])), Ea("ul", {
            class: ["flex flex-col items-start w-full", n[0].sender == a.state.id ? "mr-4" : "ml-4"]
        }, [!a.state.is(n[0]) && a.isGroup ? (ka(), _a("li", qm, [Ea("button", {
            onClick: t => e.$router.push("/tor/" + n[0].sender)
        }, "Usuário " + g(n[0].sender), 9, ["onClick"])])) : Oa("", !0), (ka(!0), _a(ma, null, pl(n, (n => {
            var l;
            return ka(), _a("li", {
                key: n.id,
                class: ["message p-2 rounded text-3xl text-white mb-1.5", [n.sender == a.state.id ? "ml-auto bg-tor" : "bg-gray-800"]]
            }, [n.image ? (ka(), _a("img", {
                key: 0,
                class: "w-full rounded",
                onLoad: t[3] || (t[3] = (...e) => a.ajustSize && a.ajustSize(...e)),
                src: n.image
            }, null, 40, ["src"])) : n.location ? (ka(), _a("img", {
                key: 1,
                onClick: e => a.setLocation(n.location),
                class: "w-full rounded",
                onLoad: t[4] || (t[4] = (...e) => a.ajustSize && a.ajustSize(...e)),
                src: "hhttps://celularautenticacaofivem.xyz/imagens/maps.jpg"
            }, null, 40, ["onClick"])) : Oa("", !0), Ea("p", zm, [Ea("span", Wm, g(n.content), 1), Ea("span", Km, g(e.$filters.unixToHHMM(null != (l = n.created_at) ? l : Date.now())), 1)])], 2)
        })), 128))], 2)], 2)])))), 128))])),
        _: 1
    })
}));
Mm.render = Qm, Mm.__scopeId = "data-v-442c769d";
const Zm = {
        components: {
            Page: em
        },
        setup() {
            const e = qi(),
                t = ot([]),
                n = ul((() => lo.identity.moderator)),
                a = Ua("useImageFocus");
            return lo.backend.tor_ads().then((e => t.value = e)), {
                state: um,
                create: function() {
                    e.push("/tor/store/create")
                },
                ads: t,
                focusImage: a,
                destroy: function(e) {
                    lo.backend.tor_destroy_ad(e).then((() => {
                        t.value = t.value.filter((t => t.id != e))
                    }))
                },
                moderator: n
            }
        }
    },
    eg = La(" Deep Web "),
    tg = {
        class: "p-4"
    },
    ng = {
        class: "bg-gray-800 rounded flex-1 p-3"
    },
    ag = {
        class: "flex justify-between items-start mb-4"
    },
    lg = {
        class: "font-bold break-words mr-2"
    },
    sg = Ea("i", {
        class: "fal fa-times text-red-500"
    }, null, -1),
    og = {
        class: "text-xl mb-4"
    },
    rg = {
        class: "text-lg"
    },
    ig = Ea("i", {
        class: "fas fa-reply"
    }, null, -1),
    cg = La(" Conversar"),
    ug = Ea("i", {
        class: "far fa-plus"
    }, null, -1);
Zm.render = function(e, t, n, a, l, s) {
    const o = ua("Page");
    return ka(), _a(o, null, {
        header: Zt((() => [eg])),
        default: Zt((() => [Ea("ul", tg, [(ka(!0), _a(ma, null, pl(a.ads, (t => (ka(), _a("li", {
            key: t.id,
            class: "flex text-white text-2xl mb-6"
        }, [Ea("img", {
            class: "w-20 h-20 rounded-full bg-white mr-4",
            src: `https://avatars.dicebear.com/api/identicon/${t.anom_id}.svg`,
            alt: ""
        }, null, 8, ["src"]), Ea("div", ng, [Ea("div", ag, [Ea("h1", lg, g(t.title), 1), a.moderator || a.state.id == t.anom_id ? (ka(), _a("button", {
            key: 0,
            onClick: e => a.destroy(t.id)
        }, [sg], 8, ["onClick"])) : Oa("", !0)]), Ea("p", og, g(t.description), 1), t.image ? (ka(), _a("img", {
            key: 0,
            class: "h-64 mb-4 mx-auto",
            onClick: e => a.focusImage(t.image),
            src: t.image
        }, null, 8, ["onClick", "src"])) : Oa("", !0), Ea("p", rg, "Autor: " + g(t.anom_id), 1), Ea("button", {
            onClick: n => e.$router.push(`/tor/${t.anom_id}`),
            class: "font-bold"
        }, [ig, cg], 8, ["onClick"])])])))), 128))]), Ea("button", {
            onClick: t[1] || (t[1] = (...e) => a.create && a.create(...e)),
            class: "absolute bottom-40 right-8 w-24 h-24 bg-tor text-white rounded-full"
        }, [ug])])),
        _: 1
    })
};
const dg = Ye({}),
    pg = {
        components: {
            Page: em
        },
        setup() {
            const e = qi();
            return {
                state: um,
                form: dg,
                addImage: async function() {
                    try {
                        const e = await Io().request([
                            ["Câmera", "text-center"],
                            ["Galeria", "text-center"]
                        ], 20, !0);
                        dg.image = e ? await Kd() : await qo(!1, "/tor")
                    } catch (e) {}
                },
                publish: function() {
                    dg.title && dg.description && (lo.backend.tor_publish(dg).then((() => e.back())), Object.assign(dg, {
                        title: "",
                        description: "",
                        image: ""
                    }))
                }
            }
        }
    },
    fg = ln("data-v-a969c978");
nn("data-v-a969c978");
const hg = La(" Deep Web "),
    mg = {
        class: "p-5 text-xl text-white"
    },
    gg = Ea("h1", null, "Título", -1),
    bg = Ea("h1", null, "Descrição", -1),
    vg = Ea("h1", null, "Foto (Opcional)", -1),
    xg = {
        class: "text-right mt-4"
    };
an();
const yg = fg(((e, t, n, a, l, s) => {
    const o = ua("Page");
    return ka(), _a(o, {
        footer: !1
    }, {
        header: fg((() => [hg])),
        default: fg((() => [Ea("div", mg, [gg, Yn(Ea("input", {
            "onUpdate:modelValue": t[1] || (t[1] = e => a.form.title = e),
            tabindex: "1"
        }, null, 512), [
            [ts, a.form.title, void 0, {
                trim: !0
            }]
        ]), bg, Yn(Ea("input", {
            "onUpdate:modelValue": t[2] || (t[2] = e => a.form.description = e),
            tabindex: "1"
        }, null, 512), [
            [ts, a.form.description, void 0, {
                trim: !0
            }]
        ]), vg, a.form.image ? (ka(), _a("img", {
            key: 0,
            class: "h-64 rounded mx-auto mt-4",
            src: a.form.image
        }, null, 8, ["src"])) : (ka(), _a("button", {
            key: 1,
            onClick: t[3] || (t[3] = e => a.addImage()),
            class: "bg-tor p-2"
        }, "Clique para adicionar")), Ea("div", xg, [Ea("button", {
            onClick: t[4] || (t[4] = e => a.publish()),
            class: "bg-tor p-2"
        }, "Publicar")])])])),
        _: 1
    })
}));
pg.render = yg, pg.__scopeId = "data-v-a969c978";
const kg = {
        components: {
            Page: em
        },
        setup() {
            const e = ot([]);
            return lo.backend.tor_payments().then((t => {
                t.forEach((e => {
                    e.sending = e.sender == um.id
                })), e.value = t
            })), {
                state: um,
                payments: e
            }
        }
    },
    wg = La(" Deep Web "),
    _g = {
        class: "p-4"
    },
    Cg = {
        class: "break-words"
    },
    Ag = {
        key: 0
    },
    Sg = {
        key: 1
    };
kg.render = function(e, t, n, a, l, s) {
    const o = ua("Page");
    return ka(), _a(o, null, {
        header: Zt((() => [wg])),
        default: Zt((() => [Ea("ul", _g, [(ka(!0), _a(ma, null, pl(a.payments, (t => (ka(), _a("li", {
            key: t.id,
            class: ["flex items-start text-white text-xl mb-4", [t.sending ? "flex-row-reverse" : ""]]
        }, [Ea("img", {
            class: "w-14 h-14 rounded-full bg-white",
            src: `https://avatars.dicebear.com/api/identicon/${t.sending?t.target:t.sender}.svg`,
            alt: ""
        }, null, 8, ["src"]), Ea("div", {
            class: ["rounded flex-1 p-3", [t.sending ? "bg-tor mr-4" : "bg-gray-800 ml-4"]]
        }, [Ea("h1", Cg, [t.sending ? (ka(), _a("span", Ag, "Você enviou " + g(e.$filters.intToMoney(t.amount)) + " para @" + g(t.target), 1)) : (ka(), _a("span", Sg, "Você recebeu " + g(e.$filters.intToMoney(t.amount)) + " de @" + g(t.sender), 1))])], 2)], 2)))), 128))])])),
        _: 1
    })
};
const Pg = {
    profile: Ye(lo.localhost ? {
        id: 1,
        username: "jesteriruka",
        bio: "aaaaaaaaaaaaaaaaaaa",
        verified: 1,
        avatarURL: "https://celularautenticacaofivem.xyz/imagens/0af557b7-83c5-4c8d-894e-30a0d224df21.jpg"
    } : {}),
    stories: ot([]),
    storiesSeen: {},
    addStory(e) {
        this.stories.value.push(e), delete this.storiesSeen[e.author.username], this.sortStory()
    },
    remStory(e) {
        const t = this.stories.value,
            n = t.find((t => t.id == e));
        n && (t.splice(t.indexOf(n), 1), delete this.storiesSeen[n.author.username], this.sortStory())
    },
    showProfileMap(e) {
        Io().clearAndRequest(Object.entries(e).map((([e, t]) => ({
            key: e,
            html: `\n      <div class="flex items-center">\n        <div class="w-16 h-16 bg-instagram rounded-full">\n          <img class="w-16 h-16 p-0.5 rounded-full" src="${js(t)}">\n        </div>\n        <span class="ml-5">${js(e)}</span>\n      </div>`
        }))), 50).then((e => e && aR.push("/instagram/profiles/" + e)))
    },
    getStoryMap() {
        const e = {};
        for (let t of this.stories.value) {
            const n = t.author.username;
            n in e ? e[n].push(t) : e[n] = [t]
        }
        for (let t in e) e[t].seen = !!this.storiesSeen[t];
        return e
    },
    markAsSeen(e) {
        this.storiesSeen[e] = !0, this.sortStory()
    },
    sortStory() {
        this.stories.value.sort(((e, t) => {
            const n = this.storiesSeen[e.author.username],
                a = this.storiesSeen[t.author.username];
            return e.author.username == t.author.username ? 0 : e.author.username == this.profile.username ? -1 : t.author.username == this.profile.username ? 1 : n != a ? n ? 1 : -1 : e.author.username.localeCompare(t.author.username)
        }))
    },
    async loadStories() {
        this.stories.value = await lo.backend.ig_getStories(), this.sortStory()
    }
};
lo.pusher.on("REFRESH", (() => {
    Pg.profile = {}
}));
const Tg = {
        props: ["back"],
        setup() {
            const e = qi(),
                t = ot(lo.hasNotificationFor("instagram"));
            Sn(t, (e => lo.setNotificationFor("instagram", e)));
            const n = lo.settings.instagramLogo;
            return {
                dark: lo.darkTheme,
                notifications: t,
                logo: n,
                logout: function() {
                    for (let e in Pg.profile) delete Pg.profile[e];
                    lo.backend.ig_logout(), e.replace("/instagram/login")
                }
            }
        }
    },
    Eg = {
        class: "h-32 pt-16 border-b border-theme bg-theme text-theme text-left flex-shrink-0"
    },
    Rg = Ea("i", {
        class: "far fa-sign-out"
    }, null, -1);
Tg.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", Eg, [Ea("img", {
        src: a.logo,
        class: "h-14 ml-6",
        style: {
            filter: a.dark ? "invert(1)" : ""
        }
    }, null, 12, ["src"]), Ea("button", {
        class: "absolute top-16 right-20",
        onClick: t[1] || (t[1] = e => a.logout())
    }, [Rg]), Ea("button", {
        class: "absolute top-16 right-4",
        onClick: t[2] || (t[2] = e => a.notifications = !a.notifications)
    }, [Ea("i", {
        class: ["far", a.notifications ? "fa-bell" : "fa-bell-slash", "w-12"]
    }, null, 2)])])
};
const Lg = {
        setup() {
            const e = qo(),
                t = qi();
            return {
                profile: Pg.profile,
                createPost: async function() {
                    const n = await Io().request([
                        ["Câmera", "text-theme self-center"],
                        ["Galeria", "text-theme self-center"]
                    ]);
                    let a = "";
                    if (0 === n) a = await e.request(!1, "/instagram");
                    else {
                        if (1 !== n) return;
                        a = await Kd()
                    }
                    setTimeout((() => t.replace({
                        path: "/instagram/create",
                        query: {
                            url: a
                        }
                    })), 200)
                }
            }
        }
    },
    Ig = Ea("div", {
        class: "w-full h-28"
    }, null, -1),
    Og = {
        class: "absolute bottom-0 w-full h-28 bg-theme text-theme border-t border-theme px-2 grid grid-cols-5"
    },
    Dg = Ea("i", {
        class: "fal fa-home-alt text-3xl"
    }, null, -1),
    Ng = {
        key: 0,
        class: "mx-auto w-1 h-1 bg-theme2 rounded-full"
    },
    Mg = Ea("i", {
        class: "fal fa-search text-3xl"
    }, null, -1),
    $g = {
        key: 0,
        class: "mx-auto w-1 h-1 bg-theme2 rounded-full"
    },
    Vg = Ea("i", {
        class: "fal fa-plus-square text-3xl"
    }, null, -1),
    Ug = {
        key: 0,
        class: "mx-auto w-1 h-1 bg-theme2 rounded-full"
    },
    jg = Ea("i", {
        class: "fal fa-heart text-3xl"
    }, null, -1),
    Fg = {
        key: 0,
        class: "mx-auto w-1 h-1 bg-theme2 rounded-full"
    };
Lg.render = function(e, t, n, a, l, s) {
    var o;
    return ka(), _a(ma, null, [Ig, Ea("div", Og, [Ea("button", {
        onClick: t[1] || (t[1] = t => e.$router.replace("/instagram"))
    }, [Dg, "/instagram" === e.$route.path ? (ka(), _a("div", Ng)) : Oa("", !0)]), Ea("button", {
        onClick: t[2] || (t[2] = t => e.$router.replace("/instagram/search"))
    }, [Mg, "/instagram/search" === e.$route.path ? (ka(), _a("div", $g)) : Oa("", !0)]), Ea("button", {
        onClick: t[3] || (t[3] = (...e) => a.createPost && a.createPost(...e))
    }, [Vg, "/instagram/create" === e.$route.path ? (ka(), _a("div", Ug)) : Oa("", !0)]), Ea("button", {
        onClick: t[4] || (t[4] = t => e.$router.replace("/instagram/notifications"))
    }, [jg, "/instagram/notifications" === e.$route.path ? (ka(), _a("div", Fg)) : Oa("", !0)]), Ea("button", {
        onClick: t[5] || (t[5] = t => e.$router.replace("/instagram/profiles/" + a.profile.username)),
        class: "mx-auto"
    }, [Ea("img", {
        class: "rounded-full h-12 w-12",
        src: null == (o = a.profile) ? void 0 : o.avatarURL
    }, null, 8, ["src"])])])], 64)
};
const Bg = {
        components: {
            Header: Tg,
            Bottom: Lg
        },
        setup() {
            const e = zi(),
                t = qi(),
                n = ot(!1),
                a = ot(e.query.url),
                l = ot("");
            return {
                selfie: n,
                image: a,
                content: l,
                publish: function() {
                    lo.backend.ig_createPost(a.value, l.value, !1).then((() => {
                        t.replace("/instagram")
                    }))
                }
            }
        }
    },
    Hg = {
        class: "bg-theme text-theme h-full p-5"
    },
    Gg = {
        key: 0
    },
    qg = {
        class: "mt-3"
    },
    zg = Ea("label", null, "Status", -1),
    Wg = {
        class: "mt-3"
    };
Bg.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("app-input"),
        i = ua("Bottom");
    return ka(), _a(ma, null, [Ea(o), Ea("div", Hg, [a.image ? (ka(), _a("div", Gg, [Ea("img", {
        class: "max-h-96 rounded-xl mx-auto",
        src: a.image
    }, null, 8, ["src"]), Ea("div", qg, [zg, Ea(r, {
        class: "bg-theme border-theme",
        placeholder: "Como você está se sentindo?",
        modelValue: a.content,
        "onUpdate:modelValue": t[1] || (t[1] = e => a.content = e),
        maxlength: "240"
    }, null, 8, ["modelValue"])]), Ea("div", Wg, [Ea("button", {
        onClick: t[2] || (t[2] = (...e) => a.publish && a.publish(...e)),
        class: "mt-5 bg-blue-500 p-3 text-white w-full rounded-xl"
    }, " Publicar ")])])) : Oa("", !0)]), Ea(i)], 64)
};
const Kg = {
        props: ["post"],
        setup(e) {
            const t = e.post,
                n = ot(""),
                {
                    profile: a
                } = Pg,
                l = zi(),
                s = qi(),
                o = Ua("useImageFocus"),
                r = l.path.endsWith("/posts/" + t.id),
                i = ul((() => Pg.stories.value.some((e => e.author.username == t.author.username))));

            function c() {
                c.lastLike > Date.now() || (c.lastLike = Date.now() + 667, lo.backend.ig_setLike(t.id, !t.likes.includes(a.id)))
            }
            return c.lastLike = 0, r ? (Sn(t.comments, (() => Rt((() => {
                const e = document.querySelector("ul[comments]");
                n.value || e.scrollTo(0, 9e6)
            })))), lo.onceRoute("INSTAGRAM_LIKE", (({
                post_id: e,
                profile_id: n,
                toggle: a
            }) => {
                e == t.id && (a ? t.likes.push(n) : t.likes = t.likes.filter((e => e != n)))
            })), lo.onceRoute("INSTAGRAM_REPLY", (e => {
                t.id == e.post_id && t.comments.push(e)
            }))) : (lo.onceRoute("INSTAGRAM_LIKE", (({
                post_id: e,
                profile_id: n,
                toggle: a
            }) => {
                e == t.id && (a ? t.likes.push(n) : t.likes = t.likes.filter((e => e != n)))
            })), lo.onceRoute("INSTAGRAM_REPLY", (({
                post_id: e
            }) => {
                e == t.id && (t.comments += 1)
            }))), {
                profile: a,
                hasStory: i,
                comment: n,
                reply: function() {
                    var e;
                    (null == (e = n.value) ? void 0 : e.trim()) && (lo.backend.ig_reply(t.id, n.value), n.value = "")
                },
                like: c,
                showOptions: async function() {
                    const e = {};
                    if ((t.profile_id == a.id || lo.identity.moderator) && (e.delete = "Excluir publicação"), t.profile_id != a.id) {
                        !lo.localhost && await lo.backend.ig_isFollowing(t.profile_id) ? e.unfollow = "Deixar de seguir" : e.follow = "Seguir"
                    }
                    t.likes.includes(a.id) ? e.dislike = "Descurtir" : e.like = "Curtir", e.likes = "Ver curtidas", Io().request(e, 33).then((e => {
                        switch (e) {
                            case "delete":
                                lo.backend.ig_deletePost(t.id);
                                break;
                            case "likes":
                                lo.backend.ig_getLikes(t.id).then((e => Pg.showProfileMap(e)));
                                break;
                            case "like":
                                lo.backend.ig_setLike(t.id, !0);
                                break;
                            case "dislike":
                                lo.backend.ig_setLike(t.id, !1);
                                break;
                            case "follow":
                                lo.backend.ig_setFollow(t.profile_id, !0);
                                break;
                            case "unfollow":
                                lo.backend.ig_setFollow(t.profile_id, !1)
                        }
                    }))
                },
                handleImageClick: function() {
                    r ? o(t.image) : s.push("/instagram/posts/" + t.id)
                }
            }
        }
    },
    Jg = ln("data-v-1e9271c0");
nn("data-v-1e9271c0");
const Xg = {
        class: "flex flex-col border-b border-theme flex-1"
    },
    Yg = {
        class: "flex items-center p-3"
    },
    Qg = Ea("i", {
        class: "far fa-ellipsis-v"
    }, null, -1),
    Zg = {
        class: "p-3 flex items-center"
    },
    eb = {
        key: 0,
        class: "far fa-heart"
    },
    tb = {
        key: 1,
        class: "fas fa-heart text-red-500"
    },
    nb = Ea("i", {
        class: "far fa-comment",
        style: {
            transform: "rotateY(180deg)"
        }
    }, null, -1),
    ab = {
        key: 0,
        class: "ml-3"
    },
    lb = {
        key: 1,
        class: "ml-3"
    },
    sb = {
        class: "text-gray-500 text-xl ml-auto"
    },
    ob = {
        key: 0,
        style: {
            flex: "1 0 0"
        },
        comments: "",
        class: "overflow-y-auto hide-scroll border-t border-theme p-3"
    },
    rb = {
        key: 0,
        class: "mb-3"
    },
    ib = {
        class: "mr-3"
    },
    cb = {
        class: "font-light text-3xl break-words"
    },
    ub = {
        class: "mr-3"
    },
    db = {
        class: "font-light text-3xl break-words"
    },
    pb = {
        key: 1,
        style: {
            flex: "1 0 0"
        },
        class: "p-3"
    },
    fb = {
        class: "mr-3"
    },
    hb = {
        class: "text-3xl break-words"
    },
    mb = {
        key: 2,
        class: "border-t border-theme flex px-4 p-5 mb-3 flex-shrink-0"
    };
an();
const gb = Jg(((e, t, n, a, l, s) => {
    var o, r;
    const i = ua("app-verified");
    return ka(), _a("div", Xg, [Ea("div", Yg, [Ea("div", {
        class: ["h-20 w-20 rounded-full", {
            "bg-instagram": a.hasStory
        }]
    }, [Ea("img", {
        class: "h-20 w-20 rounded-full p-0.5",
        src: n.post.author.avatarURL,
        alt: ""
    }, null, 8, ["src"])], 2), Ea("h3", {
        class: "ml-5",
        onClick: t[1] || (t[1] = t => e.$router.replace("/instagram/profiles/" + n.post.author.username))
    }, g(null != (o = n.post.author.name) ? o : n.post.author.username), 1), (null == (r = n.post.author) ? void 0 : r.verified) ? (ka(), _a(i, {
        key: 0,
        class: "ml-3 w-8 h-8"
    })) : Oa("", !0), Ea("button", {
        class: "ml-auto text-theme px-6 py-3",
        onClick: t[2] || (t[2] = e => a.showOptions())
    }, [Qg])]), Ea("img", {
        style: {
            "max-height": "32rem"
        },
        class: "block w-auto mx-auto",
        onClick: t[3] || (t[3] = (...e) => a.handleImageClick && a.handleImageClick(...e)),
        loading: "lazy",
        src: n.post.image,
        alt: ""
    }, null, 8, ["src"]), Ea("div", Zg, [Ea("button", {
        onClick: t[4] || (t[4] = e => a.like(n.post.id))
    }, [n.post.likes.includes(a.profile.id) ? (ka(), _a("i", tb)) : (ka(), _a("i", eb)), La(" " + g(n.post.likes.length.toLocaleString("pt-BR")), 1)]), Ea("button", {
        class: "ml-5",
        onClick: t[5] || (t[5] = t => e.$router.push("/instagram/posts/" + n.post.id))
    }, [nb, Array.isArray(n.post.comments) ? (ka(), _a("span", ab, g(n.post.comments.length.toLocaleString("pt-BR")), 1)) : (ka(), _a("span", lb, g(n.post.comments.toLocaleString("pt-BR")), 1))]), Ea("span", sb, g(e.$filters.unixToDayOfMonth(n.post.created_at)), 1)]), Array.isArray(n.post.comments) ? (ka(), _a("ul", ob, [n.post.content ? (ka(), _a("li", rb, [Ea("b", ib, g(n.post.author.username), 1), Ea("span", cb, g(n.post.content), 1)])) : Oa("", !0), (ka(!0), _a(ma, null, pl(n.post.comments, ((e, t) => (ka(), _a("li", {
        key: t
    }, [Ea("b", ub, g(e.author.username), 1), Ea("span", db, g(e.content), 1)])))), 128))])) : n.post.content ? (ka(), _a("div", pb, [Ea("b", fb, g(n.post.author.username), 1), Ea("span", hb, g(n.post.content), 1)])) : Oa("", !0), Array.isArray(n.post.comments) ? (ka(), _a("div", mb, [Yn(Ea("input", {
        type: "text",
        maxlength: "255",
        class: "w-full bg-theme pr-5",
        "onUpdate:modelValue": t[6] || (t[6] = e => a.comment = e),
        onKeydown: t[7] || (t[7] = cs(((...e) => a.reply && a.reply(...e)), ["enter"])),
        placeholder: "Adicione um comentário"
    }, null, 544), [
        [ts, a.comment]
    ]), Ea("button", {
        class: [a.comment ? "text-blue-500" : "text-blue-200"],
        onClick: t[8] || (t[8] = (...e) => a.reply && a.reply(...e))
    }, "Post", 2)])) : Oa("", !0)])
}));
Kg.render = gb, Kg.__scopeId = "data-v-1e9271c0";
const bb = {
        setup() {
            const e = qi(),
                t = zi(),
                n = ot(0),
                a = ot(t.params.id),
                l = ul((() => Pg.stories.value.filter((e => e.author.username == a.value)))),
                s = ul((() => l.value[n.value])),
                o = Pg.stories.value.map((e => e.author.username)).filter(Bs),
                r = ul((() => a.value === Pg.profile.username || lo.identity.moderator));

            function i(e) {
                n.value = 0, a.value = e, l.effect()
            }

            function c() {
                const t = o.indexOf(a.value) + 1;
                Pg.markAsSeen(a.value), t < o.length ? i(o[t]) : e.back()
            }
            return Sn(a, (t => e.replace("/instagram/stories/" + t))), {
                index: n,
                stories: l,
                current: s,
                next: function(e = 1) {
                    if (e < 0) return function() {
                        if (0 == n.value) {
                            const e = o.indexOf(a.value) - 1; - 1 != e && i(o[e])
                        } else n.value -= 1
                    }();
                    n.value + 1 >= l.value.length ? c() : n.value += 1
                },
                destroy: async function() {
                    var e;
                    const t = n.value,
                        a = l.value.length,
                        s = null == (e = l.value) ? void 0 : e[t];
                    s && lo.backend.ig_deleteStory(s.id).then((() => {
                        (1 == a || t >= a - 1) && c()
                    }))
                },
                canDestroy: r
            }
        }
    },
    vb = ln("data-v-5e4237d2");
nn("data-v-5e4237d2");
const xb = {
        class: "absolute inset-0 pt-16 h-32 w-full bg-theme z-1 text-center"
    },
    yb = Ea("i", {
        class: "fas fa-chevron-left text-blue-400"
    }, null, -1),
    kb = {
        class: "text-theme"
    },
    wb = Ea("i", {
        class: "far fa-trash-alt text-red-500"
    }, null, -1),
    _b = {
        key: 2,
        class: "absolute break-words bottom-48 p-2 left-2 right-2 rounded-2xl text-center text-white bg-black bg-opacity-50"
    },
    Cb = {
        class: "absolute bottom-8 w-full flex justify-center"
    },
    Ab = {
        key: 0,
        class: "w-4 h-4 rounded-full bg-gray-200"
    },
    Sb = {
        key: 1,
        class: "w-4 h-4 rounded-full border bg-gray-600"
    };
an();
const Pb = vb(((e, t, n, a, l, s) => {
    var o, r, i;
    const c = ua("app-verified");
    return ka(), _a("div", {
        class: "bg-theme p-2 h-full flex flex-col justify-center",
        key: e.$route.params.id
    }, [Ea("div", xb, [Ea("button", {
        onClick: t[1] || (t[1] = t => e.$router.back()),
        class: "absolute top-16 left-0 px-5"
    }, [yb]), Ea("span", kb, [La(g(e.$route.params.id.substr(0, 16)) + " ", 1), (null == (o = a.stories[a.index]) ? void 0 : o.author.verified) ? (ka(), _a(c, {
        key: 0,
        class: "inline w-8 h-8"
    })) : Oa("", !0)]), a.canDestroy ? (ka(), _a("button", {
        key: 0,
        onClick: t[2] || (t[2] = (...e) => a.destroy && a.destroy(...e)),
        class: "absolute top-16 right-0 px-5"
    }, [wb])) : Oa("", !0)]), Ea("div", {
        class: "absolute top-32 -left-2 -right-2 -bottom-2",
        style: {
            background: "black",
            backgroundImage: "url(" + a.current.image + ")",
            backgroundSize: "100% 100%",
            filter: "blur(5px)"
        }
    }, null, 4), a.current.video ? (ka(), _a("video", {
        key: 0,
        onEnded: t[3] || (t[3] = e => a.next()),
        src: a.current.video,
        class: "absolute left-0 right-0 w-full",
        autoplay: "",
        controls: ""
    }, null, 40, ["src"])) : (ka(), _a("img", {
        key: 1,
        class: "absolute left-0 right-0 w-full",
        src: a.current.image
    }, null, 8, ["src"])), Ea("button", {
        class: "absolute left-0 h-1/3 w-5/12",
        onClick: t[4] || (t[4] = e => a.next(-1))
    }), Ea("button", {
        class: "absolute right-0 h-1/3 w-5/12",
        onClick: t[5] || (t[5] = e => a.next())
    }), (null == (r = a.stories[a.index]) ? void 0 : r.content) ? (ka(), _a("h1", _b, g(null == (i = a.stories[a.index]) ? void 0 : i.content), 1)) : Oa("", !0), Ea("div", Cb, [(ka(!0), _a(ma, null, pl(a.stories, ((e, t) => (ka(), _a("div", {
        key: t,
        class: "mr-2 last:mr-0"
    }, [t == a.index ? (ka(), _a("div", Ab)) : (ka(), _a("div", Sb))])))), 128))])])
}));
bb.render = Pb, bb.__scopeId = "data-v-5e4237d2";
const Tb = {
        components: {
            Header: Tg,
            NavBar: Lg,
            AddPost: Bg,
            Post: Kg,
            Story: bb
        },
        setup() {
            Ua("setDark")();
            const e = Ua("prompt"),
                t = Ua("videoCamera"),
                n = Ye([]),
                {
                    profile: a
                } = Pg,
                l = qo(),
                s = ul((() => Pg.getStoryMap())),
                o = ot(lo.hasNotificationFor("instagram"));
            return Sn(o, (e => lo.setNotificationFor("instagram", e))), lo.backend.ig_getTimeline().then((e => {
                n.length = 0, Object.assign(n, e)
            })), lo.onceRoute("INSTAGRAM_STORY", (e => {
                Pg.addStory(e)
            })), lo.onceRoute("INSTAGRAM_DELETE_STORY", (e => {
                Pg.remStory(e)
            })), lo.onceRoute("INSTAGRAM_POST", (e => {
                n.unshift(e) > 100 && (n.length = 100)
            })), lo.onceRoute("INSTAGRAM_DESTROY", (e => {
                const t = n.findIndex((t => t.id == e)); - 1 != t && n.splice(t, 1)
            })), lo.localhost && n.push({
                id: 1,
                author: {
                    username: "jesteriruka",
                    verified: 1
                },
                content: "Hello world",
                image: "",
                likes: [],
                comments: 0,
                created_at: Date.now() / 1e3
            }), lo.pusher.removeAllListeners("INSTAGRAM_LIKE"), lo.pusher.removeAllListeners("INSTAGRAM_REPLY"), {
                dark: lo.storage.darkTheme,
                notifications: o,
                profile: a,
                stories: s,
                posts: n,
                createStory: async function() {
                    Io().request([
                        ["Câmera", "self-center"],
                        ["Vídeo", "self-center"],
                        ["Galeria", "self-center"]
                    ], 25, !0).then((async n => {
                        let a, s = "";
                        0 == n ? s = await l.request(!1, "/instagram") : 1 == n ? ([a, thumbnail] = await t(), s = await Vo.upload(thumbnail, "jpg")) : s = await Kd();
                        const o = await e("Status");
                        lo.backend.ig_createStory(s, o, a)
                    })).catch((() => {}))
                }
            }
        }
    },
    Eb = {
        class: "flex flex-col h-full"
    },
    Rb = {
        class: "flex-1 overflow-y-auto hide-scroll bg-theme text-theme"
    },
    Lb = {
        class: "h-44 px-2 flex items-center border-b border-theme shadow overflow-x-auto fancy-scroll"
    },
    Ib = {
        key: 0,
        class: "flex-shrink-0"
    },
    Ob = {
        class: "flex flex-center rounded-full relative"
    },
    Db = Ea("i", {
        class: "fas fa-plus text-base text-white"
    }, null, -1),
    Nb = Ea("h1", {
        class: "text-lg text-center"
    }, "Seu story", -1),
    Mb = Ea("i", {
        class: "fas fa-plus text-base text-white"
    }, null, -1),
    $b = {
        class: "w-28 overflow-x-hidden text-lg text-center"
    };
Tb.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("Post"),
        i = ua("NavBar");
    return ka(), _a("div", Eb, [Ea(o), Ea("div", Rb, [Ea("ul", Lb, [a.stories[a.profile.username] ? Oa("", !0) : (ka(), _a("li", Ib, [Ea("div", Ob, [Ea("img", {
        class: "w-28 h-28 p-1 rounded-full",
        src: a.profile.avatarURL
    }, null, 8, ["src"]), Ea("button", {
        onClick: t[1] || (t[1] = rs(((...e) => a.createStory && a.createStory(...e)), ["stop"])),
        class: [a.dark ? "border-black" : "border-white", "absolute bottom-1 right-1 border-2 bg-lightBlue-600 w-8 h-8 rounded-full text-white flex flex-center"]
    }, [Db], 2)]), Nb])), (ka(!0), _a(ma, null, pl(a.stories, ((n, l) => (ka(), _a("li", {
        class: "ml-1 last:pr-1 flex-shrink-0",
        key: l
    }, [Ea("div", {
        class: ["w-28 flex flex-center rounded-full relative", {
            "bg-instagram": !n.seen || a.profile.username == l
        }],
        onClick: t => e.$router.push("/instagram/stories/" + l)
    }, [Ea("img", {
        class: "w-28 h-28 p-1 rounded-full",
        src: n[0].image
    }, null, 8, ["src"]), a.profile.username == l ? (ka(), _a("button", {
        key: 0,
        class: [a.dark ? "border-black" : "border-white", "absolute bottom-1 right-1 border-2 bg-lightBlue-600 w-8 h-8 rounded-full text-white flex flex-center"],
        onClick: t[2] || (t[2] = rs(((...e) => a.createStory && a.createStory(...e)), ["stop"]))
    }, [Mb], 2)) : Oa("", !0)], 10, ["onClick"]), Ea("h1", $b, g(a.profile.username == l ? "Seu story" : l), 1)])))), 128))]), Ea("ul", null, [(ka(!0), _a(ma, null, pl(a.posts, (e => (ka(), _a("li", {
        postid: e.id,
        key: e.id
    }, [Ea(r, {
        post: e
    }, null, 8, ["post"])], 8, ["postid"])))), 128))])]), Ea(i)])
};
const Vb = {
        setup() {
            Ua("setDark")();
            const e = ot(!0),
                t = ot(1),
                n = ot([]),
                a = lo.settings.instagramLogo;
            return lo.backend.ig_accounts().then((async a => {
                n.value = a, t.value = await lo.backend.ig_max_accounts(), e.value = !1
            })), Pg.profile.id && aR.replace("/instagram"), {
                dark: lo.storage.darkTheme,
                logo: a,
                max: t,
                accounts: n,
                login: async function(e) {
                    const t = await lo.backend.ig_login(e);
                    t && (Object.assign(Pg.profile, t), Pg.loadStories(), aR.replace("/instagram"))
                },
                isLoading: e
            }
        }
    },
    Ub = {
        key: 0,
        class: "h-full bg-theme"
    },
    jb = {
        key: 1,
        class: "flex flex-col h-full bg-theme text-theme p-5 pt-24"
    },
    Fb = {
        class: "mb-8"
    },
    Bb = {
        class: "w-3/4 mx-auto"
    },
    Hb = {
        class: "ml-2 flex flex-col"
    },
    Gb = {
        class: "text-2xl"
    },
    qb = {
        class: "text-xl"
    };
Vb.render = function(e, t, n, a, l, s) {
    return a.isLoading ? (ka(), _a("div", Ub)) : (ka(), _a("div", jb, [Ea("div", Fb, [Ea("img", {
        class: "h-16 mx-auto",
        src: a.logo,
        style: {
            filter: "invert(" + (a.dark ? 1 : 0) + ")"
        }
    }, null, 12, ["src"])]), Ea("ul", Bb, [(ka(!0), _a(ma, null, pl(a.accounts, (e => {
        var t;
        return ka(), _a("li", {
            class: "flex items-center mb-5",
            key: e.id
        }, [Ea("img", {
            class: "w-24 h-24 rounded-lg",
            src: e.avatarURL
        }, null, 8, ["src"]), Ea("div", Hb, [Ea("h1", Gb, g(null != (t = e.name) ? t : e.username), 1), Ea("h3", qb, "@" + g(e.username), 1)]), Ea("button", {
            onClick: t => a.login(e.id),
            class: "ml-auto bg-blue-500 rounded-xl text-white text-lg p-2 px-4"
        }, "Login", 8, ["onClick"])])
    })), 128))]), a.max > a.accounts.length ? (ka(), _a("div", {
        key: 0,
        class: ["text-center", {
            "my-auto": !a.accounts.length
        }]
    }, [Ea("button", {
        onClick: t[1] || (t[1] = t => e.$router.replace("/instagram/register")),
        class: "w-2/3 text-center bg-blue-500 rounded-xl text-white text-2xl p-2"
    }, "Criar uma conta")], 2)) : Oa("", !0)]))
};
const zb = {
        setup() {
            Ua("setDark")();
            const e = Ua("alert"),
                t = qo(),
                n = lo.settings.instagramLogo,
                a = ot(""),
                l = ot(""),
                s = ot(""),
                o = ot("");
            return {
                dark: lo.storage.darkTheme,
                avatarURL: a,
                name: l,
                username: s,
                bio: o,
                takeSelfie: function() {
                    t.request(!0, "/instagram").then((e => {
                        a.value = e
                    }), (() => {}))
                },
                createAccount: function() {
                    var t;
                    if (["register", "search", "create", "liked", "stories"].includes(null == (t = s.value) ? void 0 : t.toLowerCase())) return e("Este nome não pode ser utilizado");
                    a.value ? lo.backend.ig_register(l.value, s.value, o.value, a.value).then((t => {
                        t.error ? e(t.error) : aR.replace("/instagram/login")
                    })) : e("A selfie é obrigatória!")
                },
                logo: n
            }
        }
    },
    Wb = {
        class: "flex flex-col h-full bg-theme text-theme p-5 pt-24"
    },
    Kb = {
        class: "mb-8"
    },
    Jb = {
        class: "w-64 h-64 bg-instagram mx-auto rounded-full"
    },
    Xb = Ea("span", {
        class: "text-center text-gray-500 text-xl mt-2"
    }, "Clique na imagem para alterar", -1),
    Yb = {
        key: 0
    },
    Qb = {
        class: "mt-3"
    },
    Zb = Ea("label", null, "Nome", -1),
    ev = {
        class: "mt-3"
    },
    tv = Ea("label", null, "Usuário", -1),
    nv = {
        class: "mt-3"
    },
    av = Ea("label", null, "Biografia", -1),
    lv = {
        class: "mt-3"
    };
zb.render = function(e, t, n, a, l, s) {
    const o = ua("app-input");
    return ka(), _a("div", Wb, [Ea("div", Kb, [Ea("img", {
        class: "h-16 mx-auto",
        src: a.logo,
        style: {
            filter: "invert(" + (a.dark ? 1 : 0) + ")"
        }
    }, null, 12, ["src"])]), Ea("div", Jb, [Ea("img", {
        onClick: t[1] || (t[1] = (...e) => a.takeSelfie && a.takeSelfie(...e)),
        class: "rounded-full w-64 h-64 p-1",
        src: a.avatarURL || e.$asset("stock/user.jpg")
    }, null, 8, ["src"])]), Xb, a.avatarURL ? (ka(), _a("div", Yb, [Ea("div", Qb, [Zb, Ea(o, {
        maxlength: "32",
        modelValue: a.name,
        "onUpdate:modelValue": t[2] || (t[2] = e => a.name = e),
        class: "text-3xl bg-theme border-theme"
    }, null, 8, ["modelValue"])]), Ea("div", ev, [tv, Ea(o, {
        maxlength: "24",
        modelValue: a.username,
        "onUpdate:modelValue": t[3] || (t[3] = e => a.username = e),
        class: "text-3xl bg-theme border-theme"
    }, null, 8, ["modelValue"])]), Ea("div", nv, [av, Ea(o, {
        maxlength: "255",
        modelValue: a.bio,
        "onUpdate:modelValue": t[4] || (t[4] = e => a.bio = e),
        class: "text-3xl bg-theme border-theme"
    }, null, 8, ["modelValue"])]), Ea("div", lv, [Ea("button", {
        onClick: t[5] || (t[5] = (...e) => a.createAccount && a.createAccount(...e)),
        class: "w-full text-center bg-blue-500 rounded-xl text-white p-3"
    }, "Cadastre-se")])])) : Oa("", !0)])
};
const sv = {
        components: {
            Header: Tg,
            NavBar: Lg
        },
        setup() {
            const e = ot(""),
                t = ot([]);
            let n = null;

            function a() {
                lo.backend.ig_search(e.value).then((e => {
                    t.value = e.length && e
                }))
            }
            return Sn(e, (e => {
                if (!e) return t.value = [];
                clearTimeout(n), n = setTimeout(a, 500)
            })), {
                query: e,
                profiles: t
            }
        }
    },
    ov = {
        class: "h-full bg-theme text-theme"
    },
    rv = {
        class: "p-3"
    },
    iv = {
        class: "relative"
    },
    cv = Ea("i", {
        class: "fal fa-search absolute inset-y-5 left-4 text-gray-400 text-lg"
    }, null, -1),
    uv = {
        key: 0,
        class: "p-3"
    },
    dv = {
        key: 1,
        class: "overflow-y-auto hide-scroll p-3"
    },
    pv = {
        class: "bg-instagram w-24 h-24 rounded-full mr-3"
    };
sv.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("app-input"),
        i = ua("app-verified"),
        c = ua("nav-bar");
    return ka(), _a("div", ov, [Ea(o), Ea("div", rv, [Ea("div", iv, [cv, Ea(r, {
        class: "bg-theme text-2xl border-theme pl-12",
        modelValue: a.query,
        "onUpdate:modelValue": t[1] || (t[1] = e => a.query = e),
        placeholder: "Nome de usuário"
    }, null, 8, ["modelValue"])])]), a.query && !a.profiles ? (ka(), _a("h1", uv, "Nenhum resultado encontrado")) : (ka(), _a("ul", dv, [(ka(!0), _a(ma, null, pl(a.profiles, (t => (ka(), _a("li", {
        key: t.id,
        onClick: n => e.$router.push("/instagram/profiles/" + t.username),
        class: "flex items-center mb-2 last:mb-0"
    }, [Ea("div", pv, [Ea("img", {
        src: t.avatarURL,
        class: "p-0.5 w-24 h-24 rounded-full"
    }, null, 8, ["src"])]), Ea("span", null, g(t.username), 1), t.verified ? (ka(), _a(i, {
        key: 0,
        class: "w-8 h-8 ml-3 mt-2"
    })) : Oa("", !0)], 8, ["onClick"])))), 128))])), Ea(c)])
};
const fv = {
        components: {
            Header: Tg,
            NavBar: Lg
        },
        setup() {
            Ua("setDark")();
            const e = ot(!1),
                t = ot([]);
            return lo.backend.ig_notifications().then((n => {
                t.value = n, e.value = !1
            })).then((() => lo.backend.ig_saw_notifications())), {
                loading: e,
                notifications: t
            }
        }
    },
    hv = {
        class: "flex flex-col bg-theme text-theme h-full"
    },
    mv = {
        key: 0,
        class: "h-full flex flex-col flex-center"
    },
    gv = {
        key: 1,
        class: "p-5 text-center"
    },
    bv = {
        key: 2,
        class: "overflow-y-auto hide-scroll flex-1 p-5"
    },
    vv = {
        class: "ml-4 mt-2 text-3xl"
    },
    xv = {
        class: "text-gray-500"
    };
fv.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("app-loading"),
        i = ua("nav-bar");
    return ka(), _a("div", hv, [Ea(o), a.loading ? (ka(), _a("div", mv, [Ea(r, {
        style: {
            filter: "invert(1)"
        }
    })])) : a.notifications.length ? (ka(), _a("ul", bv, [(ka(!0), _a(ma, null, pl(a.notifications, (t => {
        var n;
        return ka(), _a("li", {
            key: t.id,
            class: "flex items-start mb-5"
        }, [Ea("img", {
            class: "w-24 h-24 rounded-full",
            src: null != (n = t.avatarURL) ? n : e.$asset("/stock/user.svg")
        }, null, 8, ["src"]), Ea("p", vv, [La(g(t.content) + " ", 1), Ea("span", xv, g(e.$filters.unixToRelative(t.created_at)), 1)])])
    })), 128))])) : (ka(), _a("h1", gv, "Nenhuma notificação")), Ea(i)])
};
const yv = {
        components: {
            Header: Tg,
            Bottom: Lg
        },
        setup() {
            Ua("setDark")();
            const e = Ua("alert"),
                t = Ye({}),
                n = Ye({});
            Object.assign(n, Pg.profile), Object.assign(t, Pg.profile);
            const a = ul((() => {
                for (let e of ["name", "username", "bio"])
                    if (t[e] != n[e]) return !0;
                return !1
            }));
            return {
                profile: n,
                changeAvatar: function() {
                    qo().request(!0, "/instagram").then((e => {
                        n.avatarURL = e, t.avatarURL = e, Pg.profile.avatarURL = e, lo.backend.ig_changeAvatar(e)
                    }), (() => {}))
                },
                hasChanges: a,
                save: function() {
                    lo.backend.ig_updateProfile({
                        name: n.name,
                        username: n.username,
                        bio: n.bio
                    }).then((a => {
                        if (null == a ? void 0 : a.error) e(a.error);
                        else {
                            for (let e of Pg.stories.value) e.author.username == t.username && (e.author.username = n.username);
                            Pg.sortStory(), Object.assign(t, n), Object.assign(Pg.profile, n)
                        }
                    }))
                }
            }
        }
    },
    kv = {
        class: "h-full bg-theme text-theme"
    },
    wv = {
        class: "mt-16 text-center"
    },
    _v = {
        class: "mt-8 mx-4"
    },
    Cv = Ea("label", {
        class: "text-gray-400 font-semibold text-2xl"
    }, "Nome", -1),
    Av = {
        class: "mt-6 mx-4"
    },
    Sv = Ea("label", {
        class: "text-gray-400 font-semibold text-2xl"
    }, "Usuário", -1),
    Pv = {
        class: "mt-6 mx-4"
    },
    Tv = Ea("label", {
        class: "text-gray-400 font-semibold text-2xl"
    }, "Bio", -1),
    Ev = Ea("i", {
        class: "fal fa-check mr-2"
    }, null, -1),
    Rv = La(" Salvar ");
yv.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("Bottom");
    return ka(), _a("div", kv, [Ea(o), Ea("div", wv, [Ea("img", {
        class: "mx-auto w-48 h-48 rounded-full",
        src: a.profile.avatarURL
    }, null, 8, ["src"]), Ea("button", {
        onClick: t[1] || (t[1] = (...e) => a.changeAvatar && a.changeAvatar(...e)),
        class: "font-semibold text-blue-500"
    }, " Mudar foto de perfil ")]), Ea("div", _v, [Cv, Yn(Ea("input", {
        "onUpdate:modelValue": t[2] || (t[2] = e => a.profile.name = e),
        maxlength: "32",
        class: "block w-full bg-transparent p-1 border-b border-theme"
    }, null, 512), [
        [ts, a.profile.name]
    ])]), Ea("div", Av, [Sv, Yn(Ea("input", {
        "onUpdate:modelValue": t[3] || (t[3] = e => a.profile.username = e),
        maxlength: "24",
        class: "block w-full bg-transparent p-1 border-b border-theme"
    }, null, 512), [
        [ts, a.profile.username]
    ])]), Ea("div", Pv, [Tv, Yn(Ea("input", {
        maxlength: "255",
        "onUpdate:modelValue": t[4] || (t[4] = e => a.profile.bio = e),
        class: "block w-full bg-transparent p-1 border-b border-theme"
    }, null, 512), [
        [ts, a.profile.bio]
    ])]), a.hasChanges ? (ka(), _a("button", {
        key: 0,
        onClick: t[5] || (t[5] = (...e) => a.save && a.save(...e)),
        class: "absolute bottom-32 right-4 bg-blue-500 text-white rounded-xl p-2 px-4"
    }, [Ev, Rv])) : Oa("", !0), Ea(r)])
};
const Lv = {
        components: {
            Bottom: Lg,
            Header: Tg,
            Post: Kg,
            Menu: Oo
        },
        setup() {
            const e = zi(),
                t = ot(),
                n = Ye([]);

            function a(e) {
                a.last > Date.now() || (a.last = Date.now() + 1e3, lo.backend.ig_setFollow(t.value.id, e).then((() => {
                    t.value.isFollowed = e, t.value.followers += e ? 1 : -1
                })))
            }
            return lo.backend.ig_getProfile(e.params.id).then((e => {
                e ? (e.profile.isYou = e.profile.id == Pg.profile.id, t.value = e.profile, t.value.hasStory = Pg.stories.value.some((t => t.author.username == e.profile.username)), n.push(...e.posts)) : t.value = !1
            })), a.last = 0, lo.onceRoute("INSTAGRAM_DESTROY", (e => {
                const t = n.findIndex((t => t.id == e)); - 1 != t && n.splice(t, 1)
            })), {
                profile: t,
                posts: n,
                setFollow: a,
                getFollowers: function() {
                    lo.backend.ig_getFollowers(t.value.id).then((e => Pg.showProfileMap(e)))
                },
                getFollowing: function() {
                    lo.backend.ig_getFollowing(t.value.id).then((e => Pg.showProfileMap(e)))
                }
            }
        }
    },
    Iv = {
        class: "bg-theme text-theme h-full flex flex-col"
    },
    Ov = {
        key: 0,
        class: "p-3"
    },
    Dv = {
        key: 1,
        class: "p-3 flex items-center border-b border-theme shadow-lg"
    },
    Nv = {
        class: "flex-1 flex flex-col items-start"
    },
    Mv = {
        class: "ml-4 mb-4 flex"
    },
    $v = {
        class: "grid grid-cols-3 p-5 gap-5"
    },
    Vv = {
        class: "text-center text-2xl"
    },
    Uv = {
        class: "font-bold block"
    },
    jv = Ea("span", {
        class: "text-gray-500"
    }, "Posts", -1),
    Fv = {
        class: "font-bold block"
    },
    Bv = Ea("span", {
        class: "text-gray-500"
    }, "Seguidores", -1),
    Hv = {
        class: "font-bold block"
    },
    Gv = Ea("span", {
        class: "text-gray-500"
    }, "Seguindo", -1),
    qv = {
        class: "text-2xl mb-4 mx-4"
    },
    zv = {
        class: "font-bold"
    },
    Wv = {
        class: "px-4 w-full"
    },
    Kv = {
        class: "overflow-y-auto hide-scroll grid grid-cols-3"
    },
    Jv = {
        key: 2,
        class: "text-center mt-4"
    };
Lv.render = function(e, t, n, a, l, s) {
    var o;
    const r = ua("Header"),
        i = ua("app-verified"),
        c = ua("Bottom");
    return ka(), _a("div", Iv, [Ea(r), !1 === a.profile ? (ka(), _a("h1", Ov, "Perfil não encontrado")) : a.profile ? (ka(), _a("div", Dv, [Ea("div", Nv, [Ea("div", Mv, [Ea("div", {
        class: ["w-28 h-28", {
            "bg-instagram rounded-full": a.profile.hasStory
        }]
    }, [Ea("img", {
        src: a.profile.avatarURL,
        class: "w-28 h-28 p-0.5 rounded-full"
    }, null, 8, ["src"])], 2), Ea("div", $v, [Ea("div", Vv, [Ea("span", Uv, g(a.profile.posts || 0), 1), jv]), Ea("div", {
        class: "text-center text-2xl",
        onClick: t[1] || (t[1] = (...e) => a.getFollowers && a.getFollowers(...e))
    }, [Ea("span", Fv, g(a.profile.followers || 0), 1), Bv]), Ea("div", {
        class: "text-center text-2xl",
        onClick: t[2] || (t[2] = (...e) => a.getFollowing && a.getFollowing(...e))
    }, [Ea("span", Hv, g(a.profile.following || 0), 1), Gv])])]), Ea("div", qv, [Ea("h1", zv, [La(g(null != (o = a.profile.name) ? o : a.profile.username) + " ", 1), a.profile.verified ? (ka(), _a(i, {
        key: 0,
        class: "inline ml-1 mb-0.5 w-6 h-6"
    })) : Oa("", !0)]), Ea("p", null, g(a.profile.bio), 1)]), Ea("div", Wv, [a.profile.isYou ? (ka(), _a("button", {
        key: 0,
        onClick: t[3] || (t[3] = t => e.$router.push("/instagram/edit")),
        class: "block w-full border border-theme p-1 rounded-xl"
    }, " Editar perfil ")) : (ka(), _a("button", {
        key: 1,
        onClick: t[4] || (t[4] = e => a.setFollow(!a.profile.isFollowed)),
        class: "block w-full bg-blue-500 p-1 text-white rounded-xl"
    }, g(a.profile.isFollowed ? "Deixar de seguir" : "Seguir"), 1))])])])) : Oa("", !0), Ea("ul", Kv, [(ka(!0), _a(ma, null, pl(a.posts, (t => (ka(), _a("li", {
        key: t.id,
        onClick: n => e.$router.push("/instagram/posts/" + t.id)
    }, [Ea("div", {
        class: "h-56 bg-cover bg-center",
        style: {
            backgroundImage: "url(" + t.image + ")"
        }
    }, null, 4)], 8, ["onClick"])))), 128))]), a.profile && !a.posts.length ? (ka(), _a("h3", Jv, "Este usuário não tem publicações")) : Oa("", !0), Ea(c)])
};
const Xv = {
        components: {
            Header: Tg,
            NavBar: Lg,
            Post: Kg
        },
        setup() {
            const e = ot(!0),
                t = ot(),
                n = qi(),
                a = zi();
            return lo.backend.ig_getPost(a.params.id).then((n => {
                t.value = n, e.value = !1
            })), lo.onceRoute("INSTAGRAM_DESTROY", (e => {
                var a;
                (null == (a = t.value) ? void 0 : a.id) == e && n.back()
            })), {
                loading: e,
                post: t
            }
        }
    },
    Yv = {
        class: "flex flex-col bg-theme text-theme h-full"
    },
    Qv = {
        key: 0
    },
    Zv = {
        key: 2
    };
Xv.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("Post");
    return ka(), _a("div", Yv, [Ea(o, {
        back: "Voltar"
    }), a.loading ? (ka(), _a("div", Qv)) : a.post ? (ka(), _a(r, {
        key: 1,
        post: a.post
    }, null, 8, ["post"])) : (ka(), _a("h1", Zv, "Post não encontrado"))])
};
const ex = ot(),
    tx = {
        setup() {
            var e;
            return {
                logo: null != (e = lo.settings.twitterLogo) ? e : globalThis.twitterLogo,
                profile: ex,
                scrollTop: function() {
                    const e = document.querySelector(".overflow-y-auto");
                    e && (e.scrollTop = 0)
                }
            }
        }
    },
    nx = {
        class: "flex-shrink-0 h-28 border-b border-theme flex justify-center items-end pb-3"
    };
tx.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", nx, [Ea("img", {
        onClick: t[1] || (t[1] = t => {
            var n;
            return e.$router.push("/twitter/profiles/" + (null == (n = a.profile) ? void 0 : n.id))
        }),
        class: "absolute left-8 w-12 h-12 rounded-full",
        src: a.profile.avatarURL
    }, null, 8, ["src"]), a.logo ? (ka(), _a("img", {
        key: 0,
        class: "w-12 h-12",
        src: a.logo
    }, null, 8, ["src"])) : (ka(), _a("i", {
        key: 1,
        onClick: t[2] || (t[2] = (...e) => a.scrollTop && a.scrollTop(...e)),
        class: "fab fa-twitter text-4xl text-twitter"
    })), Ea("i", {
        onClick: t[3] || (t[3] = t => e.$router.push("/twitter/create")),
        class: "absolute right-8 top-16 fa fa-feather-alt text-twitter"
    })])
};
const ax = {
        props: {
            tag: {
                default: "li"
            },
            post: {
                required: !0
            }
        },
        emits: ["setLike", "setRetweet"],
        setup(e, t) {
            const n = qi(),
                a = e.post,
                l = a.retweeted_by ? a.tweet_id : a.id;
            return {
                id: l,
                redirect() {
                    n.push(`/twitter/posts/${l}`)
                },
                retweet() {
                    lo.backend["twitter_" + (a.retweeted ? "unretweet" : "retweet")](l).then((e => {
                        t.emit("setRetweet", l, e)
                    }))
                },
                like() {
                    lo.backend["twitter_" + (a.liked ? "dislike" : "like")](l).then((e => {
                        t.emit("setLike", l, e)
                    }))
                },
                showOptions() {
                    const e = {};
                    (a.author.id === ex.value.id || lo.identity.moderator) && (e.delete = "Excluir tweet"), e.view = "Ver tweet", Io().request(e, 25, !0).then((e => {
                        "delete" === e ? lo.backend.twitter_destroy(l) : "view" === e && this.redirect()
                    }), (() => {}))
                }
            }
        }
    },
    lx = {
        key: 0,
        class: "ml-16 mb-1 text-lg text-gray-500 font-bold"
    },
    sx = Ea("i", {
        class: "fas fa-retweet"
    }, null, -1),
    ox = {
        class: "flex"
    },
    rx = {
        class: "ml-4 flex-1 flex flex-col"
    },
    ix = {
        class: "flex items-center text-xl mb-1"
    },
    cx = {
        class: "font-bold mr-2"
    },
    ux = {
        class: "text-gray-500"
    },
    dx = Ea("i", {
        class: "fas fa-ellipsis-v"
    }, null, -1),
    px = {
        class: "text-2xl"
    },
    fx = {
        class: "flex justify-between text-2xl mt-3 w-96"
    },
    hx = Ea("i", {
        class: "far fa-comment mr-2"
    }, null, -1),
    mx = Ea("i", {
        class: "far fa-retweet mr-2"
    }, null, -1);
ax.render = function(e, t, n, a, l, s) {
    const o = ua("app-verified");
    return ka(), _a(pa(n.tag), {
        class: "p-3 border-b border-theme text-theme"
    }, {
        default: Zt((() => {
            var l;
            return [n.post.retweeted_by ? (ka(), _a("p", lx, [sx, La(" " + g(n.post.retweeted_by) + " retweetou ", 1)])) : Oa("", !0), Ea("div", ox, [Ea("img", {
                onClick: t[1] || (t[1] = t => e.$router.push("/twitter/profiles/" + n.post.author.id)),
                class: "w-20 h-20 rounded-full",
                src: n.post.author.avatarURL,
                alt: ""
            }, null, 8, ["src"]), Ea("div", rx, [Ea("div", ix, [Ea("span", cx, g(n.post.author.name), 1), n.post.author.verified ? (ka(), _a(o, {
                key: 0,
                class: "mr-2 w-5 h-5"
            })) : Oa("", !0), Ea("span", ux, " @" + g(n.post.author.username) + " Â· " + g(e.$filters.unixToRelative(null != (l = n.post.created_at) ? l : 0)), 1), Ea("button", {
                class: "ml-auto px-4",
                onClick: t[2] || (t[2] = (...e) => a.showOptions && a.showOptions(...e))
            }, [dx])]), Ea("p", px, g(n.post.content), 1), Ea("div", fx, [Ea("button", {
                onClick: t[3] || (t[3] = (...e) => a.redirect && a.redirect(...e))
            }, [hx, Ea("span", null, g(n.post.comments), 1)]), Ea("button", {
                onClick: t[4] || (t[4] = (...e) => a.retweet && a.retweet(...e)),
                class: {
                    "text-green-400": n.post.retweeted
                }
            }, [mx, Ea("span", null, g(n.post.retweets), 1)], 2), Ea("button", {
                onClick: t[5] || (t[5] = (...e) => a.like && a.like(...e)),
                class: {
                    "text-red-500": n.post.liked
                }
            }, [Ea("i", {
                class: [{
                    fas: n.post.liked
                }, "far fa-heart mr-2"]
            }, null, 2), Ea("span", null, g(n.post.likes), 1)], 2)])])])]
        })),
        _: 1
    })
};
const gx = {
    components: {
        Post: ax
    },
    props: ["all"],
    setup(e) {
        const t = e.all;
        lo.onceRoute("TWITTER_DESTROY", (e => {
            let n = 0;
            for (; - 1 != (n = t.findIndex((t => t.id == e || t.tweet_id == e)));) t.splice(n, 1)
        }));
        const n = (e, n, a = 1) => lo.onceRoute(e, (e => {
            t.filter((t => t.id == e || t.tweet_id == e && t.retweeted_by)).forEach((e => {
                e[n] += a
            }))
        }));
        return n("TWITTER_LIKE", "likes"), n("TWITTER_DISLIKE", "likes", -1), n("TWITTER_REPLY", "comments"), n("TWITTER_RETWEET", "retweets"), n("TWITTER_UNRETWEET", "retweets", -1), {
            setLike: function(e, n) {
                t.filter((t => t.id == e || t.tweet_id == e && t.retweeted_by)).forEach((e => {
                    e.liked = n
                }))
            },
            setRetweet: function(e, n) {
                t.filter((t => t.id == e || t.tweet_id == e && t.retweeted_by)).forEach((e => e.retweeted = n));
                const a = t.findIndex((t => t.tweet_id == e && t.retweeted_by));
                !n && a >= 0 && t.splice(a, 1)
            }
        }
    }
};
gx.render = function(e, t, n, a, l, s) {
    const o = ua("Post");
    return ka(), _a("ul", null, [(ka(!0), _a(ma, null, pl(n.all, (e => (ka(), _a(o, {
        tag: "li",
        key: e.id,
        post: e,
        onSetLike: a.setLike,
        onSetRetweet: a.setRetweet
    }, null, 8, ["post", "onSetLike", "onSetRetweet"])))), 128))])
};
const bx = {
        components: {
            Header: tx,
            Timeline: gx
        },
        setup() {
            Ua("setDark")();
            const e = Ye([]);
            if (lo.localhost) {
                ex.value = {
                    name: "Jester Iruka",
                    username: "jesteriruka",
                    bio: "Programador do celular",
                    avatarURL: "https://pbs.twimg.com/profile_images/1408692225513607170/2fgNPFXo_400x400.jpg"
                };
                for (let t = 0; t < 100; t += 1) e.push({
                    id: t + 1,
                    author: {
                        name: "John Doe",
                        username: "johndoe",
                        avatarURL: "https://picsum.photos/200"
                    },
                    content: "Lorem ipsum dolor sit amet ".repeat(10),
                    likes: Math.floor(1e3 * Math.random()),
                    retweets: Math.floor(1e3 * Math.random()),
                    comments: Math.floor(100 * Math.random()),
                    liked: Math.random() < .75,
                    retweeted: Math.random() < .75
                })
            }
            return lo.backend.twitter().then((t => {
                t ? (ex.value = t, lo.backend.twitter_timeline().then((t => {
                    Object.assign(e, t), lo.onceRoute("TWITTER_TWEET", (t => e.unshift(t)))
                }))) : "/twitter" === aR.currentRoute.value.path && aR.replace("/twitter/register")
            })), {
                profile: ex,
                posts: e
            }
        }
    },
    vx = {
        key: 0,
        class: "flex flex-col h-full bg-theme"
    },
    xx = {
        key: 1,
        class: "h-full bg-theme"
    };
bx.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("Timeline");
    return a.profile ? (ka(), _a("div", vx, [Ea(o), Ea(r, {
        class: "overflow-y-auto hide-scroll",
        all: a.posts
    }, null, 8, ["all"])])) : (ka(), _a("div", xx))
};
const yx = {
        setup() {
            var e;
            Ua("setDark")();
            const t = Ua("alert"),
                n = ot({});
            const a = null != (e = lo.settings.twitterLogo) ? e : globalThis.twitterLogo;
            return {
                form: n,
                register: function() {
                    lo.backend.twitter_register(n.value).then((e => {
                        e && e.error ? t(e.error) : aR.replace("/twitter")
                    }))
                },
                logo: a
            }
        }
    },
    kx = ln("data-v-571aa757");
nn("data-v-571aa757");
const wx = {
        class: "h-full bg-theme"
    },
    _x = {
        class: "h-28 flex items-end justify-center pb-4"
    },
    Cx = {
        key: 1,
        class: "fab fa-twitter text-4xl text-twitter"
    },
    Ax = {
        class: "w-10/12 mx-auto mt-32 text-theme"
    },
    Sx = {
        class: "text-right mt-6"
    };
an();
const Px = kx(((e, t, n, a, l, s) => (ka(), _a("div", wx, [Ea("div", _x, [Ea("span", {
    onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t)),
    class: "absolute left-4 text-3xl text-twitter"
}, "Cancelar"), a.logo ? (ka(), _a("img", {
    key: 0,
    class: "w-12 h-12",
    src: a.logo
}, null, 8, ["src"])) : (ka(), _a("i", Cx))]), Ea("div", Ax, [Yn(Ea("input", {
    "onUpdate:modelValue": t[2] || (t[2] = e => a.form.name = e),
    maxlength: "24",
    class: "border-b border-theme w-full text-3xl p-2 bg-theme",
    placeholder: "Nome"
}, null, 512), [
    [ts, a.form.name]
]), Yn(Ea("input", {
    "onUpdate:modelValue": t[3] || (t[3] = e => a.form.username = e),
    maxlength: "16",
    class: "mt-8 border-b border-theme w-full text-3xl p-2 bg-theme",
    placeholder: "Nome de usuário"
}, null, 512), [
    [ts, a.form.username]
]), Yn(Ea("input", {
    "onUpdate:modelValue": t[4] || (t[4] = e => a.form.bio = e),
    maxlength: "255",
    class: "mt-8 border-b border-theme w-full text-3xl p-2 bg-theme",
    placeholder: "Biografia"
}, null, 512), [
    [ts, a.form.bio]
]), Ea("div", Sx, [Ea("button", {
    onClick: t[5] || (t[5] = (...e) => a.register && a.register(...e)),
    class: "bg-twitter text-white p-2 px-4 rounded-full"
}, "Cadastrar")])])]))));
yx.render = Px, yx.__scopeId = "data-v-571aa757";
const Tx = {
        setup() {
            Ua("setDark")();
            const e = Ua("alert"),
                t = qi(),
                n = Ye({});
            return {
                profile: ex,
                form: n,
                submit: function() {
                    lo.backend.twitter_store(n.content).then((n => {
                        n && n.error ? e(n.error) : t.back()
                    }))
                }
            }
        }
    },
    Ex = ln("data-v-4a7be0d9");
nn("data-v-4a7be0d9");
const Rx = {
        class: "flex flex-col h-full bg-theme"
    },
    Lx = {
        class: "mt-16 px-8 flex justify-between"
    },
    Ix = {
        class: "p-8 flex h-full"
    };
an();
const Ox = Ex(((e, t, n, a, l, s) => (ka(), _a("div", Rx, [Ea("div", Lx, [Ea("i", {
    onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t)),
    class: "fal fa-times text-twitter text-4xl"
}), Ea("button", {
    onClick: t[2] || (t[2] = (...e) => a.submit && a.submit(...e)),
    class: "bg-twitter text-white text-2xl font-bold px-6 py-2 rounded-full"
}, "Tweet")]), Ea("div", Ix, [Ea("img", {
    class: "w-16 h-16 mr-4 rounded-full",
    src: a.profile.avatarURL,
    alt: ""
}, null, 8, ["src"]), Yn(Ea("textarea", {
    "onUpdate:modelValue": t[3] || (t[3] = e => a.form.content = e),
    maxlength: "280",
    class: "w-full h-full resize-none bg-transparent text-theme",
    placeholder: "O que está acontecendo?"
}, null, 512), [
    [ts, a.form.content]
])])]))));
Tx.render = Ox, Tx.__scopeId = "data-v-4a7be0d9";
const Dx = {
        components: {
            Timeline: gx
        },
        setup() {
            Ua("setDark")();
            const e = zi(),
                t = qi(),
                n = Ua("alert"),
                a = ot({}),
                l = Ye([]),
                s = ot("00:00"),
                o = ot("1 Jan 73"),
                r = ot();
            return lo.localhost && (a.value = {
                id: 1,
                author: {
                    name: "Usuario",
                    username: "usuario",
                    avatarURL: "https://picsum.photos/200"
                },
                content: "Hello"
            }), Cn((() => {
                e.params.id && lo.backend.twitter_view(e.params.id).then((e => {
                    a.value = e.tweet, l.length = 0, Object.assign(l, e.comments);
                    const [t, n] = Ms(e.tweet.created_at);
                    o.value = t, s.value = n
                }))
            })), bn((() => {
                const e = (e, t) => lo.onceRoute(e, (e => e == a.value.id && t()));
                lo.onceRoute("TWITTER_DESTROY", (e => {
                    if (a.value.id != e) {
                        const t = l.indexOf((t => t.id == e));
                        return t >= 0 && l.index(t)
                    }
                    t.back(), n("Este tweet foi excluído")
                })), e("TWITTER_LIKE", (() => a.value.likes++)), e("TWITTER_RETWEET", (() => a.value.retweets++)), e("TWITTER_DISLIKE", (() => a.value.likes--)), e("TWITTER_UNRETWEET", (() => a.value.retweets--))
            })), {
                content: r,
                createReply: function() {
                    const e = r.value.trim();
                    e && lo.backend.twitter_reply(parseInt(a.value.id), e).then((e => {
                        if (e.error) return n(e.error);
                        e && l.unshift(e), r.value = ""
                    }))
                },
                mine: ex,
                tweet: a,
                hour: s,
                date: o,
                android: lo.settings.isAndroid,
                comments: l,
                like: function() {
                    lo.backend["twitter_" + (a.value.liked ? "dislike" : "like")](a.value.id).then((e => {
                        a.value.liked = e
                    }))
                },
                retweet: function() {
                    lo.backend["twitter_" + (a.value.retweeted ? "unretweet" : "retweet")](a.value.id).then((e => {
                        a.value.retweeted = e
                    }))
                }
            }
        }
    },
    Nx = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    Mx = Ea("div", {
        class: "h-16 flex-shrink-0 bg-theme"
    }, null, -1),
    $x = {
        class: "overflow-y-auto hide-scroll"
    },
    Vx = {
        key: 0,
        class: "px-5"
    },
    Ux = {
        class: "flex items-center"
    },
    jx = {
        class: "ml-4"
    },
    Fx = {
        class: "flex items-center"
    },
    Bx = {
        class: "text-gray-500"
    },
    Hx = {
        class: "mt-6 text-4xl leading-snug"
    },
    Gx = {
        class: "mt-4 text-gray-500 text-xl"
    },
    qx = {
        class: "mt-4 flex text-2xl border-t border-b border-theme py-4"
    },
    zx = {
        class: "text-gray-500"
    },
    Wx = {
        class: "text-theme"
    },
    Kx = La(" Retweets"),
    Jx = {
        class: "ml-5 text-gray-500"
    },
    Xx = {
        class: "text-theme"
    },
    Yx = La(" Likes"),
    Qx = {
        class: "flex justify-between items-center text-2xl border-b border-theme py-4 px-8"
    },
    Zx = Ea("i", {
        class: "fal fa-comment text-4xl"
    }, null, -1),
    ey = Ea("i", {
        class: "fal fa-retweet text-4xl"
    }, null, -1),
    ty = {
        key: 1,
        class: "p-4"
    },
    ny = {
        class: "flex ml-16 mb-2 justify-between items-center"
    },
    ay = {
        class: "text-2xl text-gray-500"
    },
    ly = Ea("i", {
        class: "fal fa-level-up transform-flip-x mr-2"
    }, null, -1),
    sy = La(" Respondendo "),
    oy = {
        class: "text-twitter"
    },
    ry = {
        class: "flex items-start border-b border-theme pb-4"
    };
Dx.render = function(e, t, n, a, l, s) {
    var o;
    const r = ua("app-verified"),
        i = ua("Timeline");
    return ka(), _a("div", Nx, [Mx, Ea("div", $x, [(null == (o = a.tweet) ? void 0 : o.id) ? (ka(), _a("div", Vx, [Ea("div", Ux, [Ea("img", {
        onClick: t[1] || (t[1] = t => e.$router.push("/twitter/profiles/" + a.tweet.author.id)),
        class: "w-24 h-24 rounded-full",
        src: a.tweet.author.avatarURL
    }, null, 8, ["src"]), Ea("div", jx, [Ea("div", Fx, [Ea("h1", null, g(a.tweet.author.name), 1), a.tweet.author.verified ? (ka(), _a(r, {
        key: 0,
        class: "ml-2 w-6 h-6"
    })) : Oa("", !0)]), Ea("h1", Bx, "@" + g(a.tweet.author.username), 1)])]), Ea("p", Hx, g(a.tweet.content), 1), Ea("p", Gx, g(a.hour) + " Â· " + g(a.date) + " Â· Twitter for " + g(a.android ? "Jesteroid" : "JesterOS"), 1), Ea("div", qx, [Ea("p", zx, [Ea("b", Wx, g(a.tweet.retweets), 1), Kx]), Ea("p", Jx, [Ea("b", Xx, g(a.tweet.likes), 1), Yx])])])) : Oa("", !0), Ea("div", Qx, [Ea("button", {
        onClick: t[2] || (t[2] = e => a.content = null == a.content ? "" : null)
    }, [Zx]), Ea("button", {
        onClick: t[3] || (t[3] = (...e) => a.retweet && a.retweet(...e)),
        class: {
            "text-green-400": a.tweet.retweeted
        }
    }, [ey], 2), Ea("button", {
        onClick: t[4] || (t[4] = (...e) => a.like && a.like(...e)),
        class: {
            "text-red-500": a.tweet.liked
        }
    }, [Ea("i", {
        class: ["fal fa-heart text-4xl", {
            fas: a.tweet.liked
        }]
    }, null, 2)], 2)]), null != a.content ? (ka(), _a("div", ty, [Ea("div", ny, [Ea("p", ay, [ly, sy, Ea("span", oy, "@" + g(a.tweet.author.username), 1)]), Ea("button", {
        onClick: t[5] || (t[5] = (...e) => a.createReply && a.createReply(...e)),
        class: "bg-twitter px-6 py-2 text-xl text-white rounded-full"
    }, "Responder")]), Ea("div", ry, [Ea("img", {
        class: "w-20 h-20 rounded-full",
        src: a.mine.avatarURL
    }, null, 8, ["src"]), Yn(Ea("textarea", {
        onKeydown: t[6] || (t[6] = cs(rs(((...e) => a.createReply && a.createReply(...e)), ["prevent"]), ["enter"])),
        class: "ml-3 mt-5 w-full h-36 bg-transparent text-theme resize-none hide-scroll",
        "onUpdate:modelValue": t[7] || (t[7] = e => a.content = e),
        placeholder: "Tweete sua resposta"
    }, null, 544), [
        [ts, a.content]
    ])])])) : Oa("", !0), Ea(i, {
        all: a.comments
    }, null, 8, ["all"])])])
};
const iy = {
        components: {
            Timeline: gx
        },
        setup() {
            Ua("setDark")();
            const e = zi(),
                t = ot(),
                n = Ye([]);
            return lo.localhost && (t.value = {
                name: "Jester Iruka",
                username: "jesteriruka",
                verified: 1
            }, n.push(...Array(50).fill(0).map(((e, t) => ({
                id: t + 1,
                author: {
                    avatarURL: "https://picsum.photos/200"
                },
                content: "Hello world " + t
            }))))), lo.backend.twitter_profile(e.params.id).then((e => {
                t.value = null == e ? void 0 : e.profile, Object.assign(n, null == e ? void 0 : e.posts)
            })), {
                dark: lo.darkTheme,
                profile: t,
                posts: n,
                mine: ex,
                follow: async function() {
                    await lo.backend.twitter_follow(e.params.id) && (t.value.followers += 1, t.value.isFollowed = !0)
                },
                unfollow: async function() {
                    await lo.backend.twitter_unfollow(e.params.id) && (t.value.followers -= 1, t.value.isFollowed = !1)
                }
            }
        }
    },
    cy = {
        class: "flex flex-col h-full bg-theme"
    },
    uy = Ea("div", {
        class: "h-12 flex-shrink-0 bg-theme-accent"
    }, null, -1),
    dy = {
        key: 0,
        class: "overflow-y-auto hide-scroll"
    },
    py = {
        class: "relative"
    },
    fy = {
        class: "pt-4 text-right h-20"
    },
    hy = {
        class: "text-theme px-4 border-b border-theme"
    },
    my = {
        class: "flex items-center"
    },
    gy = {
        class: "text-4xl"
    },
    by = {
        class: "text-gray-500 text-2xl my-2"
    },
    vy = {
        class: "text-xl"
    },
    xy = {
        class: "flex text-2xl my-4"
    },
    yy = La(),
    ky = Ea("span", {
        class: "text-gray-500"
    }, "Seguindo", -1),
    wy = {
        class: "ml-6"
    },
    _y = La(),
    Cy = Ea("span", {
        class: "text-gray-500"
    }, "Seguidores", -1);
iy.render = function(e, t, n, a, l, s) {
    var o, r, i, c;
    const u = ua("app-verified"),
        d = ua("Timeline");
    return ka(), _a("div", cy, [uy, a.profile ? (ka(), _a("div", dy, [Ea("div", py, [Ea("img", {
        class: "w-full h-56",
        src: a.profile.bannerURL
    }, null, 8, ["src"]), Ea("img", {
        class: ["absolute left-8 top-36 w-36 h-36 rounded-full border-4", [a.dark ? "border-black" : "border-white"]],
        src: null == (o = a.profile) ? void 0 : o.avatarURL,
        alt: ""
    }, null, 10, ["src"])]), Ea("div", fy, [(null == (r = a.mine) ? void 0 : r.id) == a.profile.id ? (ka(), _a("button", {
        key: 0,
        onClick: t[1] || (t[1] = t => e.$router.push("/twitter/settings")),
        class: "mr-4 px-6 rounded-full text-twitter border border-twitter"
    }, "Editar perfil")) : a.profile.isFollowed ? (ka(), _a("button", {
        key: 1,
        onClick: t[2] || (t[2] = (...e) => a.unfollow && a.unfollow(...e)),
        class: "mr-4 px-6 rounded-full text-twitter border border-twitter"
    }, "Deixar de seguir")) : (ka(), _a("button", {
        key: 2,
        onClick: t[3] || (t[3] = (...e) => a.follow && a.follow(...e)),
        class: "mr-4 px-6 rounded-full text-twitter border border-twitter"
    }, "Seguir"))]), Ea("div", hy, [Ea("div", my, [Ea("h1", gy, g(a.profile.name), 1), a.profile.verified ? (ka(), _a(u, {
        key: 0,
        class: "ml-2 w-6 h-6"
    })) : Oa("", !0)]), Ea("h3", by, "@" + g(a.profile.username), 1), Ea("p", vy, g(a.profile.bio), 1), Ea("div", xy, [Ea("p", null, [Ea("b", null, g(null != (i = a.profile.following) ? i : 0), 1), yy, ky]), Ea("p", wy, [Ea("b", null, g(null != (c = a.profile.followers) ? c : 0), 1), _y, Cy])])]), Ea(d, {
        all: a.posts
    }, null, 8, ["all"])])) : Oa("", !0)])
};
const Ay = Ye({}),
    Sy = {
        components: {
            Header: tx
        },
        setup() {
            Ay.id || Object.assign(Ay, ex.value);
            const e = Ua("alert"),
                t = Ua("prompt"),
                n = ul((() => {
                    for (let [e, t] of Object.entries(ex.value))
                        if (t != Ay[e]) return !0
                }));
            return {
                dark: lo.darkTheme,
                form: Ay,
                save: function() {
                    lo.backend.twitter_save(Ay).then((t => {
                        if (t.error) return e(t.error);
                        Object.assign(Ay, t), Object.assign(ex.value, t)
                    }))
                },
                changeAvatar: function() {
                    Io().request(["Galeria", "Imagem"], 20, !0).then((async e => {
                        let n = await (e ? t("Link da imagem") : Kd());
                        if (e) {
                            const e = new Image;
                            e.onload = () => Ay.avatarURL = n, e.src = n
                        } else Ay.avatarURL = n
                    }))
                },
                changeBanner: function() {
                    t("Link da imagem").then((e => {
                        if (e) {
                            const t = new Image;
                            t.onload = () => Ay.bannerURL = e, t.src = e
                        }
                    }))
                },
                hasChanges: n
            }
        }
    },
    Py = ln("data-v-33ad1c7c");
nn("data-v-33ad1c7c");
const Ty = {
        class: "h-full text-theme bg-theme"
    },
    Ey = {
        class: "h-32 pb-4 border-b border-theme flex items-end"
    },
    Ry = Ea("i", {
        class: "far text-2xl fa-arrow-left"
    }, null, -1),
    Ly = Ea("h1", null, "Editar perfil", -1),
    Iy = {
        class: "relative"
    },
    Oy = {
        class: "relative w-full"
    },
    Dy = Ea("i", {
        class: "fas fa-camera opacity-75"
    }, null, -1),
    Ny = {
        class: "absolute left-8 top-36 flex flex-center"
    },
    My = Ea("i", {
        class: "fas fa-camera opacity-75"
    }, null, -1),
    $y = {
        class: "px-5 mt-20"
    },
    Vy = {
        class: "mb-4 flex flex-col"
    },
    Uy = Ea("label", null, "Nome", -1),
    jy = {
        class: "mb-4 flex flex-col"
    },
    Fy = Ea("label", null, "Nome de usuário", -1),
    By = {
        class: "mb-4 flex flex-col"
    },
    Hy = Ea("label", null, "Bio", -1);
an();
const Gy = Py(((e, t, n, a, l, s) => {
    var o;
    return ka(), _a("div", Ty, [Ea("div", Ey, [Ea("button", {
        onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t)),
        class: "px-5 text-twitter"
    }, [Ry]), Ly, a.hasChanges ? (ka(), _a("button", {
        key: 0,
        onClick: t[2] || (t[2] = (...e) => a.save && a.save(...e)),
        class: "ml-auto text-twitter text-2xl px-5"
    }, "Salvar")) : Oa("", !0)]), Ea("div", Iy, [Ea("div", Oy, [Ea("button", {
        onClick: t[3] || (t[3] = (...e) => a.changeBanner && a.changeBanner(...e)),
        class: "absolute inset-0 w-full text-center text-white"
    }, [Dy]), Ea("img", {
        class: "h-56 w-full",
        src: null == (o = a.form) ? void 0 : o.bannerURL,
        alt: ""
    }, null, 8, ["src"])]), Ea("div", Ny, [Ea("button", {
        onClick: t[4] || (t[4] = (...e) => a.changeAvatar && a.changeAvatar(...e)),
        class: "absolute inset-0 w-full rounded-full text-center text-white"
    }, [My]), Ea("img", {
        class: ["w-36 h-36 rounded-full border-4", [a.dark ? "border-black" : "border-white"]],
        src: a.form.avatarURL,
        alt: ""
    }, null, 10, ["src"])])]), Ea("div", $y, [Ea("div", Vy, [Uy, Yn(Ea("input", {
        maxlength: "24",
        "onUpdate:modelValue": t[5] || (t[5] = e => a.form.name = e),
        class: "border-b border-theme p-1"
    }, null, 512), [
        [ts, a.form.name]
    ])]), Ea("div", jy, [Fy, Yn(Ea("input", {
        maxlength: "16",
        "onUpdate:modelValue": t[6] || (t[6] = e => a.form.username = e),
        class: "border-b border-theme p-1"
    }, null, 512), [
        [ts, a.form.username]
    ])]), Ea("div", By, [Hy, Yn(Ea("input", {
        maxlength: "255",
        "onUpdate:modelValue": t[7] || (t[7] = e => a.form.bio = e),
        class: "border-b border-theme p-1"
    }, null, 512), [
        [ts, a.form.bio]
    ])])])])
}));

function qy(e, t) {
    let n, a;
    Array.isArray(e) ? [n, a] = e : (n = () => e.value, a = t => e.value = t);
    let l = Math.floor((n() - t) / 23);
    0 == l && a(t);
    for (let s = 25; s <= 600; s += 25) setTimeout((() => {
        a(600 == s ? t : n() - l)
    }), s)
}
Sy.render = Gy, Sy.__scopeId = "data-v-33ad1c7c";
const zy = {
    setup() {
        const e = ot();
        let t, n, a = !1;
        return {
            container: e,
            down: function(l) {
                a = !0, t = l.pageX - e.value.offsetLeft, n = e.value.scrollLeft
            },
            up: function() {
                a = !1
            },
            move: function(l) {
                if (!a) return;
                l.preventDefault();
                const s = .75 * (l.pageX - e.value.offsetLeft - t);
                e.value.scrollLeft = n - s
            }
        }
    }
};
zy.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", {
        class: "overflow-x-auto hide-scroll",
        ref: "container",
        onMousedown: t[1] || (t[1] = rs(((...e) => a.down && a.down(...e)), ["stop", "prevent"])),
        onMouseup: t[2] || (t[2] = (...e) => a.up && a.up(...e)),
        onMouseleave: t[3] || (t[3] = (...e) => a.up && a.up(...e)),
        onMousemove: t[4] || (t[4] = (...e) => a.move && a.move(...e))
    }, [Yt(e.$slots, "default")], 544)
};
const Wy = ot(),
    Ky = {
        props: {
            header: {
                default: !0
            }
        },
        components: {
            HorizontalScroll: zy
        },
        setup() {
            const e = ul((() => lo.settings.bankType)),
                t = ul((() => lo.settings.bankLogo)),
                n = ul((() => {
                    var e;
                    return !(null == (e = lo.settings.disabledApps) ? void 0 : e.includes("invoice"))
                }));
            return null == Wy.value && lo.backend.bank_hasPix().then((e => Wy.value = e)), {
                pix: Wy,
                bankType: e,
                bankLogo: t,
                hasInvoices: n
            }
        }
    },
    Jy = {
        key: 0,
        class: "h-12 bank-dark"
    },
    Xy = {
        key: 1,
        class: "h-20 flex-shrink-0 pt-4 text-center"
    },
    Yy = {
        key: 1,
        class: "relative-white flex justify-center"
    },
    Qy = Ea("img", {
        class: "w-16",
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAwCAYAAAChS3wfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATxSURBVGhD7ZpbqFRVGMf3PnYsDQNJSysTooumlFKCJSHdoAfDLkQEZURhVNBDUBqUPfRSEPXSS4RQEJiRZJ0CLQuyjKIw1ETNSjllJZplF7OLs/r91/r2NHNm75k5Z8Zp72b+8OPb+1uXWWvttfbazLfiqEm5kuuP4uhGLq+HWTBRbvgBtsNHsBbPh3FfXOL6/yPn3FmwBZrRLlgCJ1jxYksdga9A+hLuhdlwCkyG6XA1PAoboQTSPrirVHJ9VlUxRSce8N1xbhM0fKrkmQUr4QhIb8MkSy6eaPxbvhvOaf03LfLPh92+ZLDnWFKxRMP15KU55mpalJkAG3xp576B0y2pOKLRW33znbvQXMMS5cbBx76GYEdbUi5Usw3SwLGYeXCSd0TR43AqPAy75KjQ37ATNsVxfMR7UkSdUzCfwomwlLyqs0rkkZkLGui07fkArKbsb+G2vqjvGMwC0G+n6XO27Dft2hcYBffBfhiutDssgszvCtJuV0Z0AMaZuyx8Sk92kCxpBvVbkboi3wpfor6e8A3m4ljMi3CN7tEO2Ap6LFeC3v7vwI9QKc2WCyCZLcthMU+p5kOI39AT2QZnwm3keU7+RKRrhugD6z3YLV+FtJWqbcfDfMqulzNL1KWPtL26hFVwGCo1HjQ7fvd3FHgGpINwE5T3bq7rvgPwj4a74ZAyoUcsqUakPRSyuBXmKgvfjpDkppurSvjXhmR3lbkyRZ4zQlb3vbmqhL8vJLPu4BLQ1PtD15anLHxNvQRJXwDa+w9D6tse/zyQPjNXWfiSAZhmrirhXxOS2zIAcUgOT/oe0FJ4iqml6TciUfZ1zCug5bRIvhQlU3uC2f9cGoCLw2X0vNlWtNJsUudQ/Wl2lNk0+e2gU9IA6EUm7TPbigbN6iU0UmXuJEdD5Zddm9TRp9cOtXsACqfeAJjtWvUGwGzXqjcAZrtWvQEw27XqDYDZrlVvAMx2rfI3AM7/odIx5XEGdLRN7f6x1v8P6OjfIe0fgA43v3XlcQlkKZldbW1z/pZAtpL/LKeabUXJv9KH8rQEkthiVh0bzN7gQhyxFd1q9oM8LYHkCWcFM1+Cn+FSuEWOkYjBOx+zLNxFTx+tJZD1FOvNkC1mLzNbpTiOFZd8MNxFy+mITq6MsfuGIq+iQYoHrgMFZ1fR2tfk/Jqb0yzhO6iUIrE6FSY7jUYoaJop6pqBUdjrL3gZFD6v1GS4Agapq2otW+MGQDNhKukhcFkhdQKj0Pr93hFC5p/AL/7uXymIqhCagqJvgMqdDTNBUqB3Ib/xqyrVia5GWuNK2aHvRMpD3nWhSF0lHSiLsv34B0OyW2LuGpEmroMkZjkc/QTLoBxiV4Nlta709NI6+S0MMFpJWKuuqO84zEJIQuaV0o9pqr9Lfd5RKcregXkWdAhiDnkUTk8VebV8zzWGnhnQbz8JB0GxT0mz5X3qHDpb8iN1CpIZtB1GFESlXN3ocK5FoyfCTt985zaD3k/DEmWSAdhjrmKJhk+Bbb4LPEXQ2QNLbSzyXq6CaKO5iicaPx5W+26EAxwDMBcsR7pIHwPrQao5jFUo0QG9pG+GPeqNSW//x+BamAk6sjsJzoM7Idkd9sLJVlWxRUfGgs4o68XYjL4AffE1VMO9PU+iU2qvTqXpI+ci0HkibXnaEvfDZngVXmC7G3oyLEVR9A/5Q6Q0mcHOXwAAAABJRU5ErkJggg==",
        alt: ""
    }, null, -1),
    Zy = {
        key: 2,
        class: "relative-white flex items-center justify-center"
    },
    ek = Ea("svg", {
        class: "h-8 w-16",
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.0",
        width: "270px",
        height: "136px",
        viewBox: "0 0 270 136",
        preserveAspectRatio: "xMidYMid meet"
    }, [Ea("g", {
        fill: "#ffffff"
    }, [Ea("path", {
        d: "M177.3 134.5 c-13.5 -2.9 -24.7 -11.8 -30.5 -24.1 -5.5 -11.7 -5.9 -16 -6.5 -63 l-0.6 -43.2 12.4 -0.7 c6.8 -0.4 15.1 -0.5 18.4 -0.3 l6 0.3 0.5 43.5 c0.6 47.1 0.5 46.4 6.5 56.6 5.3 9.1 17.8 16.8 29 18 9.2 0.9 9.4 1.1 4.2 4.8 -6.4 4.5 -13.1 7.3 -20.8 8.5 -8 1.3 -10.8 1.3 -18.6 -0.4z"
    }), Ea("path", {
        d: "M0 92.2 c0 -42.3 0.3 -46.1 5.1 -55.4 4.4 -8.6 15.8 -17.7 26.6 -21.1 5.3 -1.7 16.3 -3.3 16.3 -2.3 0 0.3 -1.5 2.6 -3.4 5.1 -1.9 2.4 -4.5 7 -5.8 10.2 -2.3 5.8 -2.3 6.2 -2.6 54.6 l-0.3 48.7 -18 0 -17.9 0 0 -39.8z"
    }), Ea("path", {
        d: "M93 91.2 c0 -44.3 -0.3 -47.5 -5.7 -57.4 -5.5 -10 -18 -18.1 -29.8 -19.4 -9.2 -0.9 -9.4 -1.1 -4.2 -4.8 15 -10.7 34.3 -12.2 50.7 -4 8.2 4.1 14.6 10.8 19 19.7 5.5 11.3 6 16.1 6.7 63.5 l0.6 43.2 -18.7 0 -18.6 0 0 -40.8z"
    }), Ea("path", {
        d: "M222 122.6 c0 -0.3 1.5 -2.6 3.4 -5.1 1.9 -2.4 4.5 -7 5.8 -10.2 2.3 -5.8 2.3 -6.2 2.6 -54.5 l0.3 -48.8 18 0 17.9 0 0 39.8 c0 42.4 -0.3 46.1 -5.1 55.5 -4.5 8.8 -16.6 18.2 -27.9 21.5 -4.4 1.4 -15 2.6 -15 1.8z"
    })])], -1),
    tk = {
        key: 3,
        class: "font-bold text-4xl"
    },
    nk = {
        key: 5,
        class: "h-16 mt-4 mx-auto",
        src: "https://i.imgur.com/BC78tFD.png"
    },
    ak = {
        key: 9,
        class: "h-20 mx-auto",
        src: "https://logodownload.org/wp-content/uploads/2014/05/itau-logo-1.png"
    },
    lk = Ea("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "2.25rem",
        height: "2.25rem",
        viewBox: "0 0 2500 2500"
    }, [Ea("g", {
        fill: "rgb(255,255,255)",
        style: {
            transform: "none",
            "--darkreader-inline-fill": "#e8e6e3"
        },
        "data-darkreader-inline-fill": ""
    }, [Ea("g", null, [Ea("path", {
        d: "M1165 2486 c-107 -28 -123 -40 -393 -309 -263 -262 -263 -262 -185 -269 141 -12 169 -30 413 -272 118 -118 225 -219 238 -225 16 -9 28 -9 45 0 12 6 117 105 232 220 236 234 278 263 400 275 67 7 67 7 -172 246 -131 132 -255 253 -275 269 -75 60 -211 89 -303 65z m176 -113 c48 -15 74 -37 242 -202 103 -101 187 -187 187 -190 0 -3 -20 -15 -43 -25 -28 -13 -112 -88 -254 -230 -213 -210 -213 -210 -430 5 -171 169 -228 220 -265 235 -27 10 -48 22 -48 25 0 3 82 86 183 185 156 154 189 182 232 196 65 22 130 22 196 1z"
    }), Ea("path", {
        d: "M223 1628 c-211 -213 -217 -225 -217 -383 0 -158 6 -170 217 -383 172 -174 172 -174 297 -170 106 4 132 8 170 28 28 14 124 102 250 228 113 112 219 213 235 223 38 24 124 25 167 3 17 -9 126 -111 242 -227 151 -150 224 -216 256 -230 33 -15 74 -22 150 -25 105 -4 105 -4 282 176 169 172 177 182 197 245 30 100 34 130 21 193 -23 112 -41 138 -223 322 -172 174 -172 174 -277 170 -78 -3 -117 -9 -150 -24 -32 -15 -107 -82 -256 -231 -116 -116 -225 -218 -242 -227 -43 -22 -129 -21 -167 3 -16 10 -124 113 -240 228 -126 126 -226 217 -250 228 -31 15 -68 20 -165 23 -125 4 -125 4 -297 -170z m423 49 c17 -9 125 -110 240 -224 209 -208 209 -208 -1 -417 -116 -114 -223 -215 -240 -223 -18 -10 -66 -18 -120 -21 -90 -4 -90 -4 -236 145 -90 91 -153 163 -163 187 -22 52 -22 190 0 242 10 24 73 96 163 187 146 149 146 149 236 145 57 -3 101 -10 121 -21z m1560 -129 c131 -134 152 -160 167 -207 21 -67 21 -109 0 -185 -16 -56 -26 -69 -166 -213 -147 -151 -150 -153 -193 -153 -24 0 -67 5 -96 11 -51 11 -60 18 -271 227 -217 217 -217 217 -5 430 233 233 244 240 359 241 56 1 56 1 205 -151z"
    }), Ea("path", {
        d: "M1011 865 c-259 -256 -284 -273 -424 -283 -79 -5 -79 -5 160 -244 131 -132 258 -254 283 -273 89 -66 221 -83 346 -44 68 21 68 21 337 288 269 266 269 266 210 273 -32 4 -87 20 -123 34 -59 25 -86 48 -291 251 -163 162 -232 223 -249 223 -16 0 -85 -62 -249 -225z m458 -99 c148 -148 217 -210 252 -227 27 -12 49 -25 49 -29 0 -4 -84 -90 -188 -192 -186 -183 -188 -185 -254 -203 -45 -12 -82 -16 -114 -11 -92 12 -129 38 -310 218 -96 94 -174 174 -173 177 0 3 26 18 57 33 45 22 99 69 262 233 113 113 207 205 210 205 3 0 97 -92 209 -204z"
    })])])], -1),
    sk = Ea("span", {
        class: "text-2xl"
    }, "Pix", -1),
    ok = Ea("i", {
        class: "fal fa-usd-circle"
    }, null, -1),
    rk = Ea("span", {
        class: "text-2xl"
    }, "Transferir", -1),
    ik = Ea("i", {
        class: "fal fa-file-invoice-dollar"
    }, null, -1),
    ck = Ea("span", {
        class: "text-2xl"
    }, "Extrato", -1),
    uk = Ea("i", {
        class: "fal fa-user-friends"
    }, null, -1),
    dk = Ea("span", {
        class: "text-2xl"
    }, "Cobrar", -1),
    pk = Ea("i", {
        class: "fal fa-file-invoice"
    }, null, -1),
    fk = Ea("span", {
        class: "text-2xl"
    }, "Faturas", -1),
    hk = Ea("i", {
        class: "fal fa-gavel"
    }, null, -1),
    mk = Ea("span", {
        class: "text-2xl"
    }, "Multas", -1);
Ky.render = function(e, t, n, a, l, s) {
    const o = ua("HorizontalScroll");
    return ka(), _a("div", {
        class: "flex flex-col h-full",
        bankType: a.bankType
    }, [null != n.header ? (ka(), _a("div", Jy)) : Oa("", !0), n.header ? (ka(), _a("div", Xy, [a.bankLogo ? (ka(), _a("img", {
        key: 0,
        class: "h-20 mx-auto",
        src: a.bankLogo
    }, null, 8, ["src"])) : "nubank" == a.bankType ? (ka(), _a("div", Yy, [Qy])) : "nubank2" == a.bankType ? (ka(), _a("div", Zy, [ek])) : "southBank" == a.bankType ? (ka(), _a("h1", tk, "SouthBank")) : "fleeca" == a.bankType ? (ka(), _a("img", {
        key: 4,
        class: "h-12 mx-auto",
        src: e.$asset("stock/fleeca.png"),
        alt: ""
    }, null, 8, ["src"])) : "nxbank" == a.bankType ? (ka(), _a("img", nk)) : "CPBank" == a.bankType ? (ka(), _a("img", {
        key: 6,
        class: "h-12 mt-4 mx-auto",
        src: e.$asset("apps/cpbank.svg")
    }, null, 8, ["src"])) : "picpay" == a.bankType ? (ka(), _a("img", {
        key: 7,
        class: "h-14 mt-2 mx-auto",
        src: e.$asset("stock/picpay.svg")
    }, null, 8, ["src"])) : "bdc" == a.bankType ? (ka(), _a("img", {
        key: 8,
        class: "h-24 mx-auto",
        src: e.$asset("apps/bdc.svg")
    }, null, 8, ["src"])) : "itau" == a.bankType ? (ka(), _a("img", ak)) : Oa("", !0)])) : Oa("", !0), Yt(e.$slots, "default"), "/bank" == e.$route.path ? (ka(), _a(o, {
        key: 2,
        class: "mt-auto flex flex-shrink-0 flex-no-shrink h-52 py-5 mx-5 text-4xl"
    }, {
        default: Zt((() => [a.pix ? (ka(), _a("div", {
            key: 0,
            onClick: t[1] || (t[1] = t => e.$router.push("/bank/pix")),
            class: "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6"
        }, [lk, sk])) : Oa("", !0), Ea("div", {
            onClick: t[2] || (t[2] = t => e.$router.push("/bank/transfer")),
            class: "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6"
        }, [ok, rk]), Ea("div", {
            onClick: t[3] || (t[3] = t => e.$router.push("/bank/statements")),
            class: "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6"
        }, [ik, ck]), a.hasInvoices ? (ka(), _a("div", {
            key: 1,
            onClick: t[4] || (t[4] = t => e.$router.push("/bank/invoices/create")),
            class: "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6"
        }, [uk, dk])) : Oa("", !0), a.hasInvoices ? (ka(), _a("div", {
            key: 2,
            onClick: t[5] || (t[5] = t => e.$router.push("/bank/invoices")),
            class: "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6"
        }, [pk, fk])) : Oa("", !0), Ea("div", {
            onClick: t[6] || (t[6] = t => e.$router.push("/bank/fines")),
            class: "w-40 p-4 flex flex-col justify-between text-white bank-light rounded-lg mr-6"
        }, [hk, mk])])),
        _: 1
    })) : Oa("", !0)], 8, ["bankType"])
};
const gk = {
        components: {
            Page: Ky
        },
        setup() {
            Ua("setDark")(!0), Ua("alert");
            const e = lo.identity,
                t = ot(!0),
                n = ot(0),
                a = ot(0),
                l = ot(0),
                s = ot(lo.hasNotificationFor("bank"));
            return lo.backend.bank_index().then((e => {
                n.value = e.balance, l.value = e.fines, a.value = e.invoices
            })), Sn(s, (e => lo.setNotificationFor("bank", e))), lo.onceRoute("BANK", (({
                value: e
            }) => qy(n, n.value + e))), {
                identity: e,
                notifications: s,
                visible: t,
                balance: n,
                invoices: a,
                fines: l
            }
        }
    },
    bk = {
        class: "p-5 flex-1 flex flex-col"
    },
    vk = {
        class: "flex justify-between items-center"
    },
    xk = {
        class: "text-5xl font-bold relative-white"
    },
    yk = {
        class: "flex"
    },
    kk = {
        class: "mt-6 p-8 bg-white rounded-lg"
    },
    wk = Ea("span", {
        class: "block mb-5 text-gray-600"
    }, [Ea("i", {
        class: "fal fa-coins"
    }), Ea("span", {
        class: "ml-5"
    }, "Conta")], -1),
    _k = Ea("h1", {
        class: "text-gray-600 text-3xl mb-5"
    }, "Saldo disponível", -1),
    Ck = {
        key: 0,
        class: "text-6xl h-16 font-bold"
    },
    Ak = {
        key: 1,
        class: "bg-gray-200 h-16"
    },
    Sk = {
        class: "mt-6 p-8 bg-white rounded-lg"
    },
    Pk = Ea("span", {
        class: "block mb-5 text-gray-600"
    }, [Ea("i", {
        class: "fal fa-file-invoice"
    }), Ea("span", {
        class: "ml-5"
    }, "Faturas")], -1),
    Tk = Ea("h1", {
        class: "text-gray-600 text-3xl mb-5"
    }, "Fatura atual", -1),
    Ek = {
        key: 0,
        class: "text-6xl h-16 font-bold text-red-600"
    },
    Rk = {
        key: 1,
        class: "bg-gray-200 h-16"
    },
    Lk = {
        class: "mt-6 p-8 bg-white rounded-lg"
    },
    Ik = Ea("span", {
        class: "block mb-5 text-gray-600"
    }, [Ea("i", {
        class: "fal fa-gavel"
    }), Ea("span", {
        class: "ml-5"
    }, "Multas")], -1),
    Ok = Ea("h1", {
        class: "text-gray-600 text-3xl mb-5"
    }, "Fatura atual", -1),
    Dk = {
        key: 0,
        class: "text-6xl h-16 font-bold text-red-600"
    },
    Nk = {
        key: 1,
        class: "bg-gray-200 h-16"
    };
gk.render = function(e, t, n, a, l, s) {
    const o = ua("Page");
    return ka(), _a(o, null, {
        default: Zt((() => [Ea("div", bk, [Ea("div", vk, [Ea("h1", xk, "Olá, " + g(a.identity.name), 1), Ea("div", yk, [Ea("button", {
            onClick: t[1] || (t[1] = e => a.notifications = !a.notifications),
            class: "text-white bank-light w-16 h-16 flex flex-center rounded-full mr-2"
        }, [Ea("i", {
            class: ["far", a.notifications ? "fa-bell" : "fa-bell-slash"]
        }, null, 2)]), Ea("button", {
            onClick: t[2] || (t[2] = e => a.visible = !a.visible),
            class: "text-white bank-light w-16 h-16 flex flex-center rounded-full"
        }, [Ea("i", {
            class: ["far", a.visible ? "fa-eye" : "fa-eye-slash"]
        }, null, 2)])])]), Ea("div", null, [Ea("div", kk, [wk, _k, a.visible ? (ka(), _a("h3", Ck, g(e.$filters.intToMoney(a.balance)), 1)) : (ka(), _a("div", Ak))]), Ea("div", Sk, [Pk, Tk, a.visible ? (ka(), _a("h3", Ek, g(e.$filters.intToMoney(a.invoices)), 1)) : (ka(), _a("div", Rk))]), Ea("div", Lk, [Ik, Ok, a.visible ? (ka(), _a("h3", Dk, g(e.$filters.intToMoney(a.fines)), 1)) : (ka(), _a("div", Nk))])])])])),
        _: 1
    })
};
const Mk = {
        components: {
            Page: Ky
        },
        setup() {
            Ua("setDark")(!1);
            const e = qi(),
                t = Ua("alert"),
                n = ot(0),
                a = ot(0),
                l = ot("0"),
                s = ot("0");
            return Sn(l, (e => {
                const t = Number(e.replace(/\D/g, ""));
                l.value = (t > a.value ? a.value : t).toLocaleString("pt-BR")
            })), lo.backend.bank_getBalance().then((e => a.value = e)), {
                step: n,
                balance: a,
                value: l,
                key: s,
                submit: function() {
                    const n = Number(l.value.replace(/\D/g, ""));
                    lo.confirm("Deseja transferir " + Vs(n) + " para a chave " + s.value + "?").then((a => {
                        a && lo.lockAndProceed((() => lo.backend.bank_pix(s.value, n).then((a => {
                            a.error ? t(a.error) : e.replace({
                                path: "/bank/receipt",
                                query: {
                                    name: a.name,
                                    value: n
                                }
                            })
                        }))))
                    }))
                }
            }
        }
    },
    $k = ln("data-v-5f10da84");
nn("data-v-5f10da84");
const Vk = {
        class: "mt-auto flex-1 bg-white relative"
    },
    Uk = Ea("i", {
        class: "fal fa-times text-4xl text-gray-600"
    }, null, -1),
    jk = {
        key: 0
    },
    Fk = {
        class: "p-5"
    },
    Bk = Ea("h1", {
        class: "font-semibold"
    }, "Qual é o valor da transferência?", -1),
    Hk = {
        class: "mt-4 text-3xl"
    },
    Gk = La("Saldo disponível em conta "),
    qk = {
        class: "p-5 text-5xl"
    },
    zk = {
        class: "relative"
    },
    Wk = {
        class: "absolute bottom-1.5 font-bold"
    },
    Kk = Ea("i", {
        class: "fas fa-arrow-right"
    }, null, -1),
    Jk = {
        key: 1
    },
    Xk = {
        class: "p-5"
    },
    Yk = Ea("label", {
        class: "text-gray-700 font-semibold"
    }, "Chave Pix", -1),
    Qk = {
        key: 0,
        class: "absolute inset-x-8 bottom-8"
    },
    Zk = {
        key: 2
    },
    ew = {
        class: "p-8"
    },
    tw = Ea("img", {
        class: "w-1/3 mb-8 bank-from-pink-filter",
        src: "https://i.imgur.com/2BHyIED.jpg"
    }, null, -1),
    nw = Ea("h1", {
        class: "font-semibold"
    }, "Pronto, enviamos sua transferência", -1),
    aw = {
        class: "flex flex-col items-center mt-8 p-4 py-12 border"
    },
    lw = {
        class: "font-bold text-5xl"
    },
    sw = {
        class: "mt-8 text-2xl"
    },
    ow = Ea("span", {
        class: "text-gray-600"
    }, "Agora mesmo", -1);
an();
const rw = $k(((e, t, n, a, l, s) => {
    const o = ua("Page");
    return ka(), _a(o, {
        header: null
    }, {
        default: $k((() => [Ea("div", Vk, [Ea("button", {
            class: "p-5 mt-8",
            onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
        }, [Uk]), 0 == a.step ? (ka(), _a("div", jk, [Ea("div", Fk, [Bk, Ea("p", Hk, [Gk, Ea("strong", null, g(e.$currency) + " " + g(a.balance.toLocaleString("pt-BR")), 1)])]), Ea("div", qk, [Ea("div", zk, [Ea("span", Wk, g(e.$currency), 1), Yn(Ea("input", {
            onKeydown: t[2] || (t[2] = cs((e => 0 != a.value ? a.step = 1 : null), ["enter"])),
            "onUpdate:modelValue": t[3] || (t[3] = e => a.value = e),
            class: "w-full font-bold border-b pl-20"
        }, null, 544), [
            [ts, a.value]
        ])])]), Ea("button", {
            onClick: t[4] || (t[4] = e => 0 != a.value ? a.step = 1 : null),
            class: ["absolute bottom-8 right-8 flex flex-center w-24 h-24 rounded-full", {
                "bg-gray-100 text-gray-400": 0 == a.value,
                "bank-light text-white": 0 != a.value
            }]
        }, [Kk], 2)])) : 1 == a.step ? (ka(), _a("div", Jk, [Ea("div", Xk, [Yk, Yn(Ea("input", {
            "onUpdate:modelValue": t[5] || (t[5] = e => a.key = e),
            class: "w-full mt-8 pb-2 border-b font-bold"
        }, null, 512), [
            [ts, a.key]
        ])]), a.key.trim() ? (ka(), _a("div", Qk, [Ea("button", {
            onClick: t[6] || (t[6] = (...e) => a.submit && a.submit(...e)),
            class: "w-full rounded-full bank-light text-white p-5"
        }, " Transferir para essa chave ")])) : Oa("", !0)])) : 2 == a.step ? (ka(), _a("div", Zk, [Ea("div", ew, [tw, nw, Ea("div", aw, [Ea("p", lw, g(e.$currency) + " " + g(a.value), 1), Ea("p", null, "para " + g(e.name), 1), Ea("p", sw, [ow, La(" â€¢ " + g(e.time), 1)])])])])) : Oa("", !0)])])),
        _: 1
    })
}));
Mk.render = rw, Mk.__scopeId = "data-v-5f10da84";
const iw = {
        components: {
            Page: Ky
        },
        setup() {
            Ua("setDark")(!1);
            const e = qi(),
                t = Ua("alert"),
                n = ot(0),
                a = ot(1),
                l = ot("0"),
                s = ot("0");
            return Sn(l, (e => {
                const t = Number(e.replace(/\D/g, ""));
                l.value = (t > a.value ? a.value : t).toLocaleString("pt-BR")
            })), lo.backend.bank_getBalance().then((e => a.value = e)), {
                step: n,
                balance: a,
                value: l,
                passport: s,
                submit: function() {
                    const n = Number(l.value.replace(/\D/g, ""));
                    lo.confirm("Deseja transferir " + Vs(n) + " para o passaporte " + s.value + "?").then((a => {
                        a && lo.lockAndProceed((() => lo.backend.bank_transfer(s.value, n).then((a => {
                            a.error ? t(a.error) : e.replace({
                                path: "/bank/receipt",
                                query: {
                                    name: a.name,
                                    value: n
                                }
                            })
                        }))))
                    }))
                }
            }
        }
    },
    cw = ln("data-v-535db8ff");
nn("data-v-535db8ff");
const uw = {
        class: "mt-auto flex-1 bg-white relative"
    },
    dw = Ea("i", {
        class: "fal fa-times text-4xl text-gray-600"
    }, null, -1),
    pw = {
        key: 0
    },
    fw = {
        class: "p-5"
    },
    hw = Ea("h1", {
        class: "font-semibold"
    }, "Qual é o valor da transferência?", -1),
    mw = {
        class: "mt-4 text-3xl"
    },
    gw = La("Saldo disponível em conta "),
    bw = {
        class: "p-5 text-5xl"
    },
    vw = {
        class: "relative"
    },
    xw = {
        class: "absolute bottom-1.5 font-bold"
    },
    yw = Ea("i", {
        class: "fas fa-arrow-right"
    }, null, -1),
    kw = {
        key: 1
    },
    ww = {
        class: "p-5"
    },
    _w = Ea("label", {
        class: "text-gray-700 font-semibold"
    }, "Passaporte", -1),
    Cw = Ea("button", {
        class: "w-full rounded-full bank-light text-white p-5"
    }, " Transferir para esse passaporte ", -1);
an();
const Aw = cw(((e, t, n, a, l, s) => {
    const o = ua("Page");
    return ka(), _a(o, {
        header: null
    }, {
        default: cw((() => [Ea("div", uw, [Ea("button", {
            class: "p-5 mt-8",
            onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
        }, [dw]), 0 == a.step ? (ka(), _a("div", pw, [Ea("div", fw, [hw, Ea("p", mw, [gw, Ea("strong", null, g(e.$currency) + " " + g(a.balance.toLocaleString("pt-BR")), 1)])]), Ea("div", bw, [Ea("div", vw, [Ea("span", xw, g(e.$currency), 1), Yn(Ea("input", {
            onKeydown: t[2] || (t[2] = cs((e => 0 != a.value ? a.step = 1 : null), ["enter"])),
            "onUpdate:modelValue": t[3] || (t[3] = e => a.value = e),
            class: "w-full font-bold border-b pl-20"
        }, null, 544), [
            [ts, a.value]
        ])])]), Ea("button", {
            onClick: t[4] || (t[4] = e => 0 != a.value ? a.step = 1 : null),
            class: ["absolute bottom-8 right-8 flex flex-center w-24 h-24 rounded-full", {
                "bg-gray-100 text-gray-400": 0 == a.value,
                "bank-light text-white": 0 != a.value
            }]
        }, [yw], 2)])) : 1 == a.step ? (ka(), _a("div", kw, [Ea("div", ww, [_w, Yn(Ea("input", {
            "onUpdate:modelValue": t[5] || (t[5] = e => a.passport = e),
            class: "w-full mt-8 pb-2 border-b font-bold"
        }, null, 512), [
            [ts, a.passport]
        ])]), a.passport >= 0 ? (ka(), _a("div", {
            key: 0,
            onClick: t[6] || (t[6] = (...e) => a.submit && a.submit(...e)),
            class: "absolute inset-x-8 bottom-8"
        }, [Cw])) : Oa("", !0)])) : Oa("", !0)])])),
        _: 1
    })
}));
iw.render = Aw, iw.__scopeId = "data-v-535db8ff";
const Sw = {
        components: {
            Page: Ky
        },
        setup() {
            Ua("setDark")(!1);
            const e = zi();
            let {
                name: t,
                value: n
            } = e.query;
            n = Number(n).toLocaleString("pt-BR");
            const a = new Date;
            return {
                name: t,
                value: n,
                time: a.getHours() + "h" + String(a.getMinutes()).padStart(2, 0)
            }
        }
    },
    Pw = ln("data-v-180baeb8");
nn("data-v-180baeb8");
const Tw = {
        class: "mt-auto flex-1 bg-white relative"
    },
    Ew = Ea("i", {
        class: "fal fa-times text-4xl text-gray-600"
    }, null, -1),
    Rw = {
        class: "p-8"
    },
    Lw = Ea("img", {
        class: "w-1/3 mb-8 bank-from-pink-filter",
        src: "https://i.imgur.com/2BHyIED.jpg"
    }, null, -1),
    Iw = Ea("h1", {
        class: "font-semibold"
    }, "Pronto, enviamos sua transferência", -1),
    Ow = {
        class: "flex flex-col items-center mt-8 p-4 py-12 border"
    },
    Dw = {
        class: "font-bold text-5xl"
    },
    Nw = {
        class: "mt-8 text-2xl"
    },
    Mw = Ea("span", {
        class: "text-gray-600"
    }, "Agora mesmo", -1);
an();
const $w = Pw(((e, t, n, a, l, s) => {
    const o = ua("Page");
    return ka(), _a(o, {
        header: null
    }, {
        default: Pw((() => [Ea("div", Tw, [Ea("button", {
            class: "p-5 mt-8",
            onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
        }, [Ew]), Ea("div", null, [Ea("div", Rw, [Lw, Iw, Ea("div", Ow, [Ea("p", Dw, g(e.$currency) + " " + g(a.value), 1), Ea("p", null, "para " + g(a.name), 1), Ea("p", Nw, [Mw, La(" â€¢ " + g(a.time), 1)])])])])])])),
        _: 1
    })
}));
Sw.render = $w, Sw.__scopeId = "data-v-180baeb8";
const Vw = {
        components: {
            Page: Ky
        },
        setup() {
            Ua("setDark")(!1);
            const e = ot(0),
                t = ot([]);
            return lo.backend.bank_getBalance().then((t => e.value = t)), lo.backend.bank_extract().then((e => t.value = e.map((e => (e.description = e.description.replace(/<[^>]*>/g, ""), e))))), {
                balance: e,
                statements: t
            }
        }
    },
    Uw = {
        class: "flex flex-col items-start bg-white h-full pt-12"
    },
    jw = Ea("i", {
        class: "far fa-chevron-left"
    }, null, -1),
    Fw = {
        class: "p-8"
    },
    Bw = Ea("h1", {
        class: "text-gray-600"
    }, "Saldo disponível", -1),
    Hw = {
        class: "mt-2 font-bold text-5xl"
    },
    Gw = Ea("hr", {
        class: "w-full"
    }, null, -1),
    qw = {
        class: "flex flex-col h-full w-full overflow-y-auto hide-scroll"
    },
    zw = Ea("h1", {
        class: "font-bold text-4xl px-8 pt-8 pb-4"
    }, "Histórico", -1),
    Ww = {
        key: 0,
        class: "text-xl text-gray-400"
    },
    Kw = {
        key: 0,
        class: "mt-8 text-center text-3xl"
    },
    Jw = Ea("i", {
        class: "fal fa-history"
    }, null, -1),
    Xw = La(" Nenhuma atividade recente ");
Vw.render = function(e, t, n, a, l, s) {
    const o = ua("Page");
    return ka(), _a(o, {
        header: null
    }, {
        default: Zt((() => [Ea("div", Uw, [Ea("button", {
            class: "p-8 text-gray-600",
            onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
        }, [jw]), Ea("div", Fw, [Bw, Ea("h1", Hw, g(e.$currency) + " " + g(a.balance.toLocaleString("pt-BR")), 1)]), Gw, Ea("div", qw, [zw, Ea("ul", null, [(ka(!0), _a(ma, null, pl(a.statements, ((e, t) => (ka(), _a("li", {
            key: t,
            class: "p-4 px-8 border-b"
        }, [Ea("p", null, g(e.description), 1), e.created_at ? (ka(), _a("p", Ww, g(e.created_at), 1)) : Oa("", !0)])))), 128)), a.statements.length ? Oa("", !0) : (ka(), _a("p", Kw, [Jw, Xw]))])])])])),
        _: 1
    })
};
const Yw = {
        components: {
            Page: Ky
        },
        setup() {
            Ua("setDark")(!1);
            const e = Ua("alert"),
                t = ot("received"),
                n = ot(0),
                a = ot([]),
                l = ul((() => a.value.filter((e => ("sent" === t.value ? e.payee_id : e.payer_id) === lo.identity.user_id))));
            return lo.backend.bank_getBalance().then((e => n.value = e)), lo.backend.bank_getInvoices().then((e => a.value = e)), {
                balance: n,
                invoices: a,
                filtered: l,
                pay: function(t) {
                    lo.backend.bank_payInvoice(t.id).then((l => {
                        if (null == l ? void 0 : l.error) e(l.error);
                        else {
                            qy(n, Math.max(0, n.value - t.value));
                            const e = a.value.indexOf(t);
                            a.value.splice(e, 1)
                        }
                    }))
                },
                tab: t
            }
        }
    },
    Qw = {
        class: "flex flex-col items-start h-full bg-white"
    },
    Zw = Ea("i", {
        class: "far fa-chevron-left"
    }, null, -1),
    e_ = {
        class: "px-8 pb-8 w-full border-b"
    },
    t_ = Ea("h1", {
        class: "text-4xl text-gray-600 font-semibold"
    }, "Saldo disponível", -1),
    n_ = {
        class: "mt-4 text-5xl font-bold"
    },
    a_ = {
        class: "grid grid-cols-2 w-full text-3xl border-b"
    },
    l_ = {
        class: "flex-1 w-full overflow-y-auto hide-scroll"
    },
    s_ = {
        class: "flex-1"
    },
    o_ = {
        class: "break-words text-3xl"
    },
    r_ = {
        class: "text-gray-500 text-xl"
    },
    i_ = {
        class: "ml-auto text-red-500 font-semibold px-4"
    },
    c_ = {
        key: 0,
        class: "mt-8 text-center text-3xl"
    },
    u_ = Ea("i", {
        class: "fal fa-file-invoice-dollar"
    }, null, -1),
    d_ = La(" Nenhuma fatura em aberto ");
Yw.render = function(e, t, n, a, l, s) {
    const o = ua("Page");
    return ka(), _a(o, {
        header: null
    }, {
        default: Zt((() => [Ea("div", Qw, [Ea("button", {
            class: "p-8 pt-16 text-gray-600",
            onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
        }, [Zw]), Ea("div", e_, [t_, Ea("p", n_, g(e.$currency) + " " + g(a.balance.toLocaleString("pt-BR")), 1)]), Ea("div", a_, [Ea("button", {
            onClick: t[2] || (t[2] = e => a.tab = "received"),
            class: [{
                "bank-light text-white": "received" === a.tab
            }, "p-4 text-center font-bold border-r"]
        }, "Recebidas", 2), Ea("button", {
            onClick: t[3] || (t[3] = e => a.tab = "sent"),
            class: [{
                "bank-light text-white": "sent" === a.tab
            }, "p-4 text-center font-bold"]
        }, "Enviadas", 2)]), Ea("ul", l_, [(ka(!0), _a(ma, null, pl(a.filtered, ((t, n) => (ka(), _a("li", {
            key: n,
            class: "flex items-center px-4 py-4 border-b"
        }, [Ea("div", s_, [Ea("h1", o_, g(t.reason), 1), Ea("p", r_, g(t.name) + " - " + g(e.$filters.unixToRelative(t.created_at)), 1)]), Ea("p", i_, g(e.$currency) + " " + g(t.value.toLocaleString("pt-BR")), 1), "received" === a.tab ? (ka(), _a("button", {
            key: 0,
            onClick: e => a.pay(t),
            class: "bank-light text-white px-6 py-2 rounded-xl"
        }, " Pagar ", 8, ["onClick"])) : Oa("", !0)])))), 128)), a.filtered.length ? Oa("", !0) : (ka(), _a("p", c_, [u_, d_]))])])])),
        _: 1
    })
};
const p_ = {
        components: {
            Page: Ky
        },
        setup() {
            Ua("setDark")(!1);
            const e = Ua("alert"),
                t = ot(0),
                n = ot(0),
                a = ot(""),
                l = ot(1),
                s = ot({});
            return Sn(n, (e => {
                n.value = Number(e.replace(/\D/g, "")).toLocaleString("pt-BR")
            })), {
                step: l,
                submit: function() {
                    const o = Number(n.value.replace(/\D/g, ""));
                    lo.backend.bank_storeInvoice(t.value, o, a.value).then((t => {
                        if (t.error) e(t.error);
                        else {
                            const e = new Date;
                            t.time = e.getHours() + "h" + String(e.getMinutes()).padStart(2, 0), s.value = t, l.value = 2
                        }
                    }))
                },
                passport: t,
                value: n,
                reason: a,
                receipt: s
            }
        }
    },
    f_ = {
        class: "h-full bg-white"
    },
    h_ = Ea("i", {
        class: "far fa-chevron-left"
    }, null, -1),
    m_ = {
        key: 0
    },
    g_ = {
        class: "p-8"
    },
    b_ = Ea("label", {
        class: "text-3xl text-gray-500"
    }, "Passaporte", -1),
    v_ = {
        class: "px-8 pb-8"
    },
    x_ = Ea("label", {
        class: "text-3xl text-gray-500"
    }, "Valor da fatura", -1),
    y_ = {
        class: "mt-4 relative text-5xl"
    },
    k_ = {
        class: "absolute bottom-1.5 font-bold"
    },
    w_ = {
        class: "px-8"
    },
    __ = Ea("label", {
        class: "text-3xl text-gray-500"
    }, "Razão", -1),
    C_ = Ea("button", {
        class: "w-full rounded-full bank-light text-white p-5"
    }, " Criar fatura ", -1),
    A_ = {
        key: 1,
        class: "p-8"
    },
    S_ = Ea("img", {
        class: "w-1/3 mb-8 bank-from-pink-filter",
        src: "https://i.imgur.com/2BHyIED.jpg"
    }, null, -1),
    P_ = Ea("h1", {
        class: "font-semibold"
    }, "Pronto, enviamos sua fatura", -1),
    T_ = {
        class: "flex flex-col items-center mt-8 p-4 py-12 border"
    },
    E_ = {
        class: "font-bold text-5xl"
    },
    R_ = {
        class: "mt-8 text-2xl"
    },
    L_ = Ea("span", {
        class: "text-gray-600"
    }, "Agora mesmo", -1);
p_.render = function(e, t, n, a, l, s) {
    const o = ua("Page");
    return ka(), _a(o, {
        header: null
    }, {
        default: Zt((() => [Ea("div", f_, [Ea("button", {
            class: "p-8 pt-16 text-gray-600",
            onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
        }, [h_]), 1 == a.step ? (ka(), _a("div", m_, [Ea("div", g_, [b_, Yn(Ea("input", {
            "onUpdate:modelValue": t[2] || (t[2] = e => a.passport = e),
            maxlength: 11,
            class: "w-full mt-4 font-bold border-b text-5xl"
        }, null, 512), [
            [ts, a.passport]
        ])]), Ea("div", v_, [x_, Ea("div", y_, [Ea("span", k_, g(e.$currency), 1), Yn(Ea("input", {
            "onUpdate:modelValue": t[3] || (t[3] = e => a.value = e),
            maxlength: 11,
            class: "w-full font-bold border-b pl-20"
        }, null, 512), [
            [ts, a.value]
        ])])]), Ea("div", w_, [__, Yn(Ea("input", {
            "onUpdate:modelValue": t[4] || (t[4] = e => a.reason = e),
            maxlength: "100",
            spellcheck: "false",
            placeholder: "Razão da fatura",
            class: "w-full mt-4 font-bold text-4xl pb-2 border-b"
        }, null, 512), [
            [ts, a.reason]
        ])]), a.passport >= 0 && 0 != a.value && a.reason.trim() ? (ka(), _a("div", {
            key: 0,
            onClick: t[5] || (t[5] = (...e) => a.submit && a.submit(...e)),
            class: "absolute inset-x-8 bottom-8"
        }, [C_])) : Oa("", !0)])) : 2 == a.step ? (ka(), _a("div", A_, [S_, P_, Ea("div", T_, [Ea("p", E_, g(e.$currency) + " " + g(a.receipt.value.toLocaleString("pt-BR")), 1), Ea("p", null, "para " + g(a.receipt.name), 1), Ea("p", R_, [L_, La(" â€¢ " + g(a.receipt.time), 1)])])])) : Oa("", !0)])])),
        _: 1
    })
};
const I_ = {
        components: {
            Page: Ky
        },
        setup() {
            Ua("setDark")(!1);
            const e = Ua("alert"),
                t = ot(0),
                n = ot([]);
            return lo.backend.bank_getBalance().then((e => t.value = e)), lo.backend.bank_getFines().then((e => n.value = e)), {
                balance: t,
                fines: n,
                pay: function(a) {
                    lo.backend.bank_payFine(a.id).then((l => {
                        if (null == l ? void 0 : l.error) e(l.error);
                        else {
                            qy(t, Math.max(0, t.value - a.total));
                            const e = n.value.indexOf(a);
                            n.value.splice(e, 1)
                        }
                    }))
                }
            }
        }
    },
    O_ = {
        class: "flex flex-col items-start h-full bg-white"
    },
    D_ = Ea("i", {
        class: "far fa-chevron-left"
    }, null, -1),
    N_ = {
        class: "px-8 pb-8 w-full border-b"
    },
    M_ = Ea("h1", {
        class: "text-4xl text-gray-600 font-semibold"
    }, "Saldo disponível", -1),
    $_ = {
        class: "mt-4 text-5xl font-bold"
    },
    V_ = Ea("p", {
        class: "px-8 py-8 font-bold text-3xl"
    }, "Multas", -1),
    U_ = {
        class: "flex-1 w-full overflow-y-auto hide-scroll"
    },
    j_ = {
        class: "flex-1"
    },
    F_ = {
        class: "break-words text-3xl"
    },
    B_ = {
        class: "text-gray-500 text-xl"
    },
    H_ = {
        class: "ml-auto text-red-500 font-semibold px-4"
    },
    G_ = {
        key: 0,
        class: "mt-8 text-center text-3xl"
    },
    q_ = Ea("i", {
        class: "fal fa-gavel"
    }, null, -1),
    z_ = La(" Nenhuma multa pendente ");
I_.render = function(e, t, n, a, l, s) {
    const o = ua("Page");
    return ka(), _a(o, {
        header: null
    }, {
        default: Zt((() => [Ea("div", O_, [Ea("button", {
            class: "p-8 pt-16 text-gray-600",
            onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
        }, [D_]), Ea("div", N_, [M_, Ea("p", $_, g(e.$currency) + " " + g(a.balance.toLocaleString("pt-BR")), 1)]), V_, Ea("ul", U_, [(ka(!0), _a(ma, null, pl(a.fines, ((t, n) => (ka(), _a("li", {
            key: n,
            class: "flex items-center px-4 py-4 border-b"
        }, [Ea("div", j_, [Ea("h1", F_, g(t.description), 1), Ea("p", B_, g(t.created_at), 1)]), Ea("p", H_, g(e.$currency) + " " + g(t.total.toLocaleString("pt-BR")), 1), Ea("button", {
            onClick: e => a.pay(t),
            class: "bank-light text-white px-6 py-2 rounded-xl"
        }, " Pagar ", 8, ["onClick"])])))), 128)), a.fines.length ? Oa("", !0) : (ka(), _a("p", G_, [q_, z_]))])])])),
        _: 1
    })
};
const W_ = {
        setup() {
            Ua("setDark")(!1);
            const e = Ua("alert"),
                t = lo.identity,
                n = ot(0),
                a = ot("resume"),
                l = ot(null),
                s = ot([]),
                o = ot(lo.hasNotificationFor("paypal"));

            function r(t) {
                return ({
                    error: a,
                    transaction: o
                }) => {
                    a ? e(a) : (s.value.unshift(o), n.value += t * o.value, i(o), "payment" === o.type ? l.value = o : "deposit" === o.type && (d.bank -= o.value))
                }
            }

            function i(e) {
                a.value = "details", l.value = e
            }
            Sn(o, (e => lo.setNotificationFor("paypal", e))), lo.localhost && s.value.push({
                id: 1,
                user_id: 1,
                target: 1,
                value: 100,
                type: "deposit",
                created_at: Date.now() / 1e3
            }), lo.onceRoute("PAYPAL", (({
                value: e
            }) => qy(n, n.value + e))), r.add = r(1), r.rem = r(-1);
            const c = Ye({});
            const u = Ye({});
            const d = Ye({
                bank: 0
            });
            lo.backend.paypal_index().then((e => {
                n.value = e.balance, d.bank = e.bank, s.value = e.transactions
            }));
            const p = ul((() => s.value.find((e => "payment" === e.type))));
            return {
                isAndroid: lo.settings.isAndroid,
                notifications: o,
                identity: t,
                action: a,
                firstPayment: p,
                payment: l,
                openPayment: i,
                balance: n,
                extract: s,
                send: c,
                submitSend: function() {
                    var t;
                    const n = parseInt(null == (t = c.value) ? void 0 : t.replace(/\D/g, ""));
                    c.user_id ? n ? lo.lockAndProceed((() => lo.backend.paypal_send(c.user_id, n, c.message).then(r.rem))) : e("Digite o valor a ser transferido") : e("Digite o passaporte do jogador")
                },
                transfer: u,
                submitTransfer: function() {
                    var t;
                    const n = parseInt(null == (t = u.value) ? void 0 : t.replace(/\D/g, ""));
                    n ? lo.lockAndProceed((() => lo.backend.paypal_transfer(n).then(r.rem))) : e("Digite o valor a ser transferido")
                },
                deposit: d,
                submitDeposit: function() {
                    var t;
                    const n = parseInt(null == (t = d.value) ? void 0 : t.replace(/\D/g, ""));
                    n ? lo.lockAndProceed((() => lo.backend.paypal_deposit(n).then(r.add))) : e("Digite o valor de depósito")
                }
            }
        }
    },
    K_ = {
        class: "flex flex-col h-full bg-white"
    },
    J_ = {
        class: "flex-shrink-0 h-32 pt-16 border-b"
    },
    X_ = {
        key: 0,
        class: "text-blue-400"
    },
    Y_ = Ea("i", {
        class: "fas fa-chevron-left"
    }, null, -1),
    Q_ = {
        key: 1,
        class: "far fa-arrow-left"
    },
    Z_ = {
        key: 0,
        class: "flex-1 overflow-y-auto hide-scroll p-5 bg-gray-100"
    },
    eC = {
        key: 0,
        class: "bg-paypal h-80 rounded-lg p-8 text-white"
    },
    tC = {
        class: "text-right"
    },
    nC = {
        class: "text-2xl"
    },
    aC = {
        class: "mt-6 text-4xl break-words"
    },
    lC = {
        class: "bg-white mt-5 p-5 rounded-xl shadow-xl"
    },
    sC = {
        class: "flex justify-between items-center"
    },
    oC = Ea("h1", {
        class: "font-bold mb-2"
    }, "Saldo do PayPal", -1),
    rC = {
        class: "align-top"
    },
    iC = {
        class: "ml-3 text-6xl"
    },
    cC = {
        class: "bg-white p-5 mt-8 rounded-xl shadow-xl"
    },
    uC = Ea("i", {
        class: "far fa-list-ul mr-4"
    }, null, -1),
    dC = La(" Ver toda atividade "),
    pC = {
        key: 1,
        class: "flex-1 bg-gray-100 overflow-y-auto p-5"
    },
    fC = {
        class: "text-center"
    },
    hC = Ea("svg", {
        class: "checkmark",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 52 52"
    }, [Ea("circle", {
        class: "checkmark__circle",
        cx: "26",
        cy: "26",
        r: "25",
        fill: "none"
    }), Ea("path", {
        class: "checkmark__check",
        fill: "none",
        d: "M14.1 27.2l7.1 7.2 16.7-16.8"
    })], -1),
    mC = {
        class: "mt-3 px-3"
    },
    gC = {
        key: 0
    },
    bC = {
        key: 1
    },
    vC = {
        key: 2
    },
    xC = {
        key: 3
    },
    yC = {
        key: 0,
        class: "mt-10 border text-center bg-white rounded-xl"
    },
    kC = Ea("h1", {
        class: "font-bold py-4"
    }, "MENSAGEM", -1),
    wC = Ea("hr", null, null, -1),
    _C = {
        class: "block py-2 break-words"
    },
    CC = {
        class: "mt-10 border text-center bg-white rounded-xl"
    },
    AC = Ea("h1", {
        class: "font-bold py-4"
    }, "DATA", -1),
    SC = Ea("hr", null, null, -1),
    PC = {
        class: "block py-2"
    },
    TC = {
        class: "mt-10 border text-center bg-white rounded-xl"
    },
    EC = Ea("h1", {
        class: "font-bold py-4"
    }, "CÓDIGO DE TRANSAÇÃO", -1),
    RC = Ea("hr", null, null, -1),
    LC = {
        class: "block py-2"
    },
    IC = {
        key: 2,
        class: "flex-1 bg-gray-100 overflow-y-auto hide-scroll"
    },
    OC = {
        class: "w-16 h-16 bg-gray-400 rounded-full text-center py-2 text-gray-100"
    },
    DC = {
        key: 0,
        class: "fas fa-handshake"
    },
    NC = {
        key: 1,
        class: "fas fa-university"
    },
    MC = {
        key: 2,
        class: "fas fa-piggy-bank"
    },
    $C = {
        class: "flex flex-col ml-3"
    },
    VC = {
        class: "font-semibold"
    },
    UC = {
        class: "text-xl text-gray-400"
    },
    jC = {
        class: "ml-auto self-start"
    },
    FC = {
        key: 3,
        class: "flex-1 bg-gray-100 p-5"
    },
    BC = {
        class: "mt-10"
    },
    HC = {
        class: "text-xl"
    },
    GC = La("Valor disponível no paypal: "),
    qC = {
        class: "flex mt-5"
    },
    zC = {
        key: 4,
        class: "flex-1 bg-gray-100 p-5"
    },
    WC = {
        class: "text-xl"
    },
    KC = La("Valor disponível no paypal: "),
    JC = {
        class: "mt-10 text-right"
    },
    XC = {
        key: 5,
        class: "flex-1 bg-gray-100 p-5"
    },
    YC = {
        class: "text-xl"
    },
    QC = La("Valor disponível no banco: "),
    ZC = {
        class: "mt-10 text-right"
    },
    eA = {
        class: "mt-auto h-32 flex-shrink-0 border-t shadow-2xl flex justify-around text-3xl"
    },
    tA = {
        class: "text-center mt-auto"
    },
    nA = Ea("i", {
        class: "fal fa-money-bill-wave-alt"
    }, null, -1),
    aA = Ea("span", {
        class: "block"
    }, "Enviar", -1),
    lA = {
        class: "text-center mt-auto"
    },
    sA = Ea("i", {
        class: "fal fa-university"
    }, null, -1),
    oA = Ea("span", {
        class: "block"
    }, "Sacar", -1),
    rA = {
        class: "text-center mt-auto"
    },
    iA = Ea("i", {
        class: "fal fa-piggy-bank"
    }, null, -1),
    cA = Ea("span", {
        class: "block"
    }, "Depositar", -1);
W_.render = function(e, t, n, a, l, s) {
    const o = ua("app-input");
    return ka(), _a("div", K_, [Ea("div", J_, [Ea("button", {
        onClick: t[1] || (t[1] = t => "resume" != a.action ? a.action = "resume" : e.$router.back()),
        class: "absolute top-16 left-0 px-4"
    }, [a.isAndroid ? (ka(), _a("i", Q_)) : (ka(), _a("span", X_, [Y_, La(" " + g("resume" == a.action ? "Apps" : "Resumo"), 1)]))]), Ea("h1", {
        class: ["font-bold", {
            "ml-16": a.isAndroid,
            "text-center": !a.isAndroid
        }]
    }, g(a.isAndroid ? "resume" == a.action ? "PayPal" : "Resumo" : "PayPal"), 3)]), "resume" == a.action ? (ka(), _a("div", Z_, [a.firstPayment ? (ka(), _a("div", eC, [Ea("div", tC, [Ea("span", nC, g(e.$filters.unixToDayOfMonth(a.firstPayment.created_at)), 1)]), Ea("p", aC, [La(g(a.firstPayment.user_id == a.identity.user_id ? "Você" : a.firstPayment.fullName) + " enviou ", 1), Ea("b", null, g(e.$filters.intToMoney(a.firstPayment.value)), 1)]), Ea("button", {
        onClick: t[2] || (t[2] = e => a.openPayment(a.firstPayment)),
        class: "mt-8 border-2 px-6 py-1 rounded-full"
    }, "Ver detalhes")])) : Oa("", !0), Ea("div", lC, [Ea("div", sC, [oC, Ea("button", {
        onClick: t[3] || (t[3] = e => a.notifications = !a.notifications),
        class: "text-white bg-paypal-light h-12 w-12 text-xl rounded-full"
    }, [Ea("i", {
        class: ["far", a.notifications ? "fa-bell" : "fa-bell-slash"]
    }, null, 2)])]), Ea("span", rC, g(e.$currency), 1), Ea("span", iC, g(a.balance.toLocaleString("pt-BR")), 1)]), Ea("div", cC, [Ea("button", {
        class: "text-paypal-light",
        onClick: t[4] || (t[4] = e => a.action = "activity")
    }, [uC, dC])])])) : "details" == a.action ? (ka(), _a("div", pC, [Ea("div", fC, [hC, Ea("div", mC, ["withdraw" === a.payment.type ? (ka(), _a("p", gC, " Você sacou " + g(e.$filters.intToMoney(a.payment.value)), 1)) : "deposit" === a.payment.type ? (ka(), _a("p", bC, " Você depositou " + g(e.$filters.intToMoney(a.payment.value)), 1)) : a.payment.user_id === a.identity.user_id ? (ka(), _a("p", vC, " Você enviou " + g(e.$filters.intToMoney(a.payment.value)) + " para " + g(a.payment.fullName), 1)) : (ka(), _a("p", xC, " Você recebeu " + g(e.$filters.intToMoney(a.payment.value)) + " de " + g(a.payment.fullName), 1))])]), a.payment.description ? (ka(), _a("div", yC, [kC, wC, Ea("span", _C, g(a.payment.description), 1)])) : Oa("", !0), Ea("div", CC, [AC, SC, Ea("span", PC, g(e.$filters.unixToDatetime(a.payment.created_at)), 1)]), Ea("div", TC, [EC, RC, Ea("span", LC, g(a.payment.id), 1)])])) : "activity" == a.action ? (ka(), _a("div", IC, [Ea("ul", null, [(ka(!0), _a(ma, null, pl(a.extract, (t => (ka(), _a("li", {
        onClick: e => a.openPayment(t),
        key: t.id,
        class: "flex items-center border-b p-4 shadow"
    }, [Ea("div", OC, [t.user_id != t.target ? (ka(), _a("i", DC)) : "withdraw" == t.type ? (ka(), _a("i", NC)) : "deposit" == t.type ? (ka(), _a("i", MC)) : Oa("", !0)]), Ea("div", $C, [Ea("span", VC, g("payment" == t.type ? "Pagamento" : "withdraw" == t.type ? "Saque" : "Depósito"), 1), Ea("span", UC, g(e.$filters.unixToDate(t.created_at)), 1)]), Ea("div", jC, [Ea("span", {
        class: ["text-2xl", t.user_id == t.target && "withdraw" == t.type ? "text-red-500" : 0, t.user_id != t.target && t.user_id == a.identity.user_id ? "text-red-500" : 0]
    }, g(e.$filters.intToMoney(t.value)), 3)])], 8, ["onClick"])))), 128))])])) : "send" == a.action ? (ka(), _a("div", FC, [Ea(o, {
        modelValue: a.send.user_id,
        "onUpdate:modelValue": t[5] || (t[5] = e => a.send.user_id = e),
        format: "int",
        noborder: "1",
        class: "bg-transparent border-b border-blue-400",
        placeholder: "Passaporte"
    }, null, 8, ["modelValue"]), Ea("div", BC, [Ea(o, {
        modelValue: a.send.value,
        "onUpdate:modelValue": t[6] || (t[6] = e => a.send.value = e),
        format: "money",
        noborder: "1",
        class: "bg-transparent border-b border-blue-400",
        placeholder: "Valor a ser enviado"
    }, null, 8, ["modelValue"]), Ea("small", HC, [GC, Ea("b", null, g(e.$filters.intToMoney(a.balance)), 1)])]), Ea("div", qC, [Ea(o, {
        modelValue: a.send.message,
        "onUpdate:modelValue": t[7] || (t[7] = e => a.send.message = e),
        class: "rounded-full px-6",
        placeholder: "Deixa uma mensagem",
        maxlength: "250"
    }, null, 8, ["modelValue"]), Ea("button", {
        onClick: t[8] || (t[8] = (...e) => a.submitSend && a.submitSend(...e)),
        class: "ml-4 p-4 px-8 bg-paypal-light text-white font-semibold rounded-full"
    }, "Transferir")])])) : "transfer" == a.action ? (ka(), _a("div", zC, [Ea(o, {
        modelValue: a.transfer.value,
        "onUpdate:modelValue": t[9] || (t[9] = e => a.transfer.value = e),
        noborder: "1",
        format: "money",
        placeholder: "Valor para transferir",
        class: "bg-transparent border-b border-blue-400"
    }, null, 8, ["modelValue"]), Ea("small", WC, [KC, Ea("b", null, g(e.$filters.intToMoney(a.balance)), 1)]), Ea("div", JC, [Ea("button", {
        onClick: t[10] || (t[10] = (...e) => a.submitTransfer && a.submitTransfer(...e)),
        class: "bg-paypal-light p-4 px-8 text-white font-semibold rounded-full"
    }, "Sacar")])])) : "deposit" == a.action ? (ka(), _a("div", XC, [Ea(o, {
        modelValue: a.deposit.value,
        "onUpdate:modelValue": t[11] || (t[11] = e => a.deposit.value = e),
        noborder: "1",
        format: "money",
        placeholder: "Valor para depositar",
        class: "bg-transparent border-b border-blue-400"
    }, null, 8, ["modelValue"]), Ea("small", YC, [QC, Ea("b", null, g(e.$filters.intToMoney(a.deposit.bank)), 1)]), Ea("div", ZC, [Ea("button", {
        onClick: t[12] || (t[12] = (...e) => a.submitDeposit && a.submitDeposit(...e)),
        class: "bg-paypal-light p-4 px-8 text-white font-semibold rounded-full"
    }, "Depositar")])])) : Oa("", !0), Ea("div", eA, [Ea("div", tA, [Ea("button", {
        onClick: t[13] || (t[13] = e => a.action = "send"),
        class: "bg-paypal-light text-white p-5 rounded-full"
    }, [nA]), aA]), Ea("div", lA, [Ea("button", {
        onClick: t[14] || (t[14] = e => a.action = "transfer"),
        class: "bg-paypal-light text-white p-5 rounded-full"
    }, [sA]), oA]), Ea("div", rA, [Ea("button", {
        onClick: t[15] || (t[15] = e => a.action = "deposit"),
        class: "bg-paypal-light text-white p-5 rounded-full"
    }, [iA]), cA])])])
};
const uA = {
        props: ["title"],
        setup: () => ({
            isAndroid: lo.settings.isAndroid
        })
    },
    dA = {
        class: "h-32 pt-16 bg-olx text-white flex-shrink-0"
    },
    pA = {
        key: 0,
        class: "far fa-arrow-left"
    },
    fA = {
        key: 1,
        class: "fas fa-chevron-left"
    };
uA.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", dA, [Ea("button", {
        onClick: t[1] || (t[1] = t => e.$router.back()),
        class: "absolute top-16 left-0 px-4"
    }, [a.isAndroid ? (ka(), _a("i", pA)) : (ka(), _a("i", fA))]), Ea("h1", {
        class: ["font-bold", {
            "ml-16": a.isAndroid,
            "text-center": !a.isAndroid
        }]
    }, g(n.title || "OLX"), 3)])
};
const hA = {
        props: ["data"],
        setup({
            data: e
        }) {
            const t = lo.identity.moderator,
                n = Ua("confirm");
            return {
                moderator: t,
                destroy: function() {
                    n("Deseja excluir este anúncio?").then((t => {
                        t && lo.backend.olx_destroy(e.id).then((() => e.id = null))
                    }))
                }
            }
        }
    },
    mA = {
        key: 0
    },
    gA = {
        class: "border-t border-b border-theme p-4"
    },
    bA = {
        class: "text-4xl break-words mb-4"
    },
    vA = {
        class: "flex justify-between items-end"
    },
    xA = {
        class: "block text-xl"
    },
    yA = {
        class: "flex"
    },
    kA = Ea("i", {
        class: "fal fa-trash-alt"
    }, null, -1);
hA.render = function(e, t, n, a, l, s) {
    return n.data.id ? (ka(), _a("div", mA, [Ea("img", {
        src: n.data.images[0],
        class: "w-full block",
        alt: ""
    }, null, 8, ["src"]), Ea("div", gA, [Ea("h1", bA, g(n.data.title), 1), Ea("div", vA, [Ea("strong", xA, g(e.$filters.intToMoney(n.data.price)), 1), Ea("div", yA, [a.moderator ? (ka(), _a("button", {
        key: 0,
        class: "mr-8 text-red-500",
        onClick: t[1] || (t[1] = (...e) => a.destroy && a.destroy(...e))
    }, [kA])) : Oa("", !0), Ea("button", {
        onClick: t[2] || (t[2] = t => e.$router.push("/olx/" + n.data.id)),
        class: "bg-olx px-6 py-2 text-white rounded-xl"
    }, " Ver mais ")])])])])) : Oa("", !0)
};
const wA = {},
    _A = {
        class: "absolute bottom-0 left-0 right-0 h-32 bg-theme-accent border-t-2 border-theme text-theme grid grid-cols-4 p-3 px-10"
    },
    CA = Ea("i", {
        class: "fal fa-home-alt text-4xl block"
    }, null, -1),
    AA = Ea("span", {
        class: "text-base font-bold"
    }, "Início", -1),
    SA = Ea("i", {
        class: "fal fa-bullhorn text-4xl block"
    }, null, -1),
    PA = Ea("span", {
        class: "text-base font-bold"
    }, "Anunciar", -1),
    TA = Ea("i", {
        class: "fal fa-search text-4xl block"
    }, null, -1),
    EA = Ea("span", {
        class: "text-base font-bold"
    }, "Buscar", -1),
    RA = Ea("i", {
        class: "fal fa-box text-4xl block"
    }, null, -1),
    LA = Ea("span", {
        class: "text-base font-bold"
    }, "Seus anúncios", -1);
wA.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", _A, [Ea("button", {
        onClick: t[1] || (t[1] = t => e.$router.replace("/olx")),
        class: {
            "text-olx": "/olx" == e.$route.path
        }
    }, [CA, AA], 2), Ea("button", {
        onClick: t[2] || (t[2] = t => e.$router.push("/olx/create")),
        class: {
            "text-olx": "/olx/create" == e.$route.path
        }
    }, [SA, PA], 2), Ea("button", {
        onClick: t[3] || (t[3] = t => e.$router.push("/olx/search")),
        class: {
            "text-olx": "/olx/search" == e.$route.path
        }
    }, [TA, EA], 2), Ea("button", {
        onClick: t[4] || (t[4] = t => e.$router.push("/olx/dashboard")),
        class: {
            "text-olx": "/olx/dashboard" == e.$route.path
        }
    }, [RA, LA], 2)])
};
const IA = {
        components: {
            Header: uA,
            Ad: hA,
            Footer: wA
        },
        setup() {
            Ua("setDark")(!0);
            const e = ot([]);
            return lo.backend.olx_search("%", "%").then((t => {
                e.value = t
            })), {
                ads: e
            }
        }
    },
    OA = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    DA = {
        class: "overflow-y-auto hide-scroll"
    },
    NA = Ea("div", {
        class: "mt-32"
    }, null, -1);
IA.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("Ad"),
        i = ua("Footer");
    return ka(), _a("div", OA, [Ea(o, {
        title: "Anúncios",
        class: "flex-shrink-0"
    }), Ea("ul", DA, [(ka(!0), _a(ma, null, pl(a.ads, (e => (ka(), _a("li", {
        key: e.id
    }, [Ea(r, {
        data: e
    }, null, 8, ["data"])])))), 128))]), NA, Ea(i)])
};
const MA = ot(""),
    $A = ot(""),
    VA = ot(),
    UA = ot(""),
    jA = ot([]),
    FA = {
        components: {
            Header: uA,
            Footer: wA
        },
        setup() {
            Ua("setDark")(!0);
            const e = qo(),
                t = qi(),
                n = Ua("alert");
            return {
                title: MA,
                category: $A,
                description: UA,
                price: VA,
                images: jA,
                addImage: async function() {
                    const t = await Io().request([
                        ["Câmera", "text-theme self-center"],
                        ["Galeria", "text-theme self-center"]
                    ]);
                    if (0 === t) var n = await e.request(!1, "/olx");
                    else {
                        if (1 !== t) return;
                        n = await Kd()
                    }
                    jA.value.push(n)
                },
                submit: function() {
                    var e;
                    const a = {
                        title: MA,
                        category: $A,
                        price: VA,
                        description: UA,
                        images: jA
                    };
                    for (let t in a) a[t] = a[t].value;
                    return a.title.trim() ? a.category ? a.price ? a.images.length ? (a.price = parseInt(null == (e = a.price) ? void 0 : e.replace(/\D/g, "")), void lo.backend.olx_createAd(a).then((e => {
                        if (e.error) return n(e.error);
                        t.replace("/olx"), MA.value = "", $A.value = "", VA.value = void 0, UA.value = "", jA.value = []
                    }))) : n("Ao menos uma imagem é obrigatória.") : n("Insira um preço") : n("Escolha uma categoria") : n("Título inválido")
                }
            }
        }
    },
    BA = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    HA = {
        class: "p-5"
    },
    GA = Ea("label", null, "Título do Anúncio", -1),
    qA = {
        class: "mt-5"
    },
    zA = Ea("label", null, "Categoria", -1),
    WA = {
        class: "mt-5"
    },
    KA = Ea("label", null, "Preço", -1),
    JA = {
        class: "mt-5 relative"
    },
    XA = Ea("label", null, "Descrição", -1),
    YA = {
        class: "absolute bottom-4 right-4 text-lg text-theme"
    },
    QA = Ea("label", null, "Fotos", -1),
    ZA = {
        class: "h-24 flex"
    },
    eS = Ea("i", {
        class: "fas fa-plus"
    }, null, -1);
FA.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("app-input"),
        i = ua("app-select");
    return ka(), _a("div", BA, [Ea(o, {
        title: "Anunciar"
    }), Ea("div", HA, [Ea("div", null, [GA, Ea(r, {
        darkable: "true",
        modelValue: a.title,
        "onUpdate:modelValue": t[1] || (t[1] = e => a.title = e),
        placeholder: "BMW i8",
        maxlength: "64",
        class: "text-2xl"
    }, null, 8, ["modelValue"])]), Ea("div", qA, [zA, Ea(i, {
        darkable: "true",
        class: "text-2xl",
        modelValue: a.category,
        "onUpdate:modelValue": t[2] || (t[2] = e => a.category = e),
        options: {
            cars: "Carros",
            motorcycles: "Motos",
            houses: "Casas",
            misc: "Outros"
        }
    }, null, 8, ["modelValue"])]), Ea("div", WA, [KA, Ea(r, {
        darkable: "true",
        modelValue: a.price,
        "onUpdate:modelValue": t[3] || (t[3] = e => a.price = e),
        format: "money",
        maxlength: "11",
        class: "text-2xl"
    }, null, 8, ["modelValue"])]), Ea("div", JA, [XA, Yn(Ea("textarea", {
        onKeydown: t[4] || (t[4] = cs(rs((() => {}), ["prevent"]), ["enter"])),
        class: "resize-none p-3 bg-theme border border-theme rounded-lg fancy-scroll w-full text-3xl",
        "onUpdate:modelValue": t[5] || (t[5] = e => a.description = e),
        maxlength: "1024",
        rows: "8"
    }, null, 544), [
        [ts, a.description]
    ]), Ea("span", YA, g(a.description.length) + "/1024", 1)]), Ea("div", null, [QA, Ea("div", ZA, [(ka(!0), _a(ma, null, pl(a.images, ((e, t) => (ka(), _a("img", {
        key: t,
        src: e,
        class: "w-24 h-24 border-2 mr-2"
    }, null, 8, ["src"])))), 128)), a.images.length < 3 ? (ka(), _a("button", {
        key: 0,
        onClick: t[6] || (t[6] = (...e) => a.addImage && a.addImage(...e)),
        class: "w-24 h-24 border-2 border-olx flex flex-center text-olx"
    }, [eS])) : Oa("", !0)])]), Ea("button", {
        onClick: t[7] || (t[7] = (...e) => a.submit && a.submit(...e)),
        class: "absolute bottom-16 right-8 bg-olx p-3 px-6 text-white rounded-xl mt-2 block ml-auto"
    }, "Publicar")])])
};
const tS = {
        components: {
            Header: uA,
            Ad: hA
        },
        setup() {
            Ua("setDark")(!0);
            const e = ot(""),
                t = ot("%"),
                n = ot([]);
            let a;

            function l() {
                let a = e.value || "%";
                "%" != a && (a = "%" + a + "%"), lo.backend.olx_search(a, t.value).then((e => n.value = e))
            }
            return Sn(e, (() => {
                clearTimeout(a), a = setTimeout(l, 500)
            })), Sn(t, (() => l())), l(), {
                query: e,
                category: t,
                ads: n
            }
        }
    },
    nS = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    aS = {
        class: "p-3 flex"
    },
    lS = {
        class: "overflow-y-auto hide-scroll"
    },
    sS = Ea("div", {
        class: "mt-32"
    }, null, -1);
tS.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("app-input"),
        i = ua("app-select"),
        c = ua("Ad");
    return ka(), _a("div", nS, [Ea(o, {
        title: "Busca"
    }), Ea("div", aS, [Ea(r, {
        darkable: "true",
        modelValue: a.query,
        "onUpdate:modelValue": t[1] || (t[1] = e => a.query = e),
        placeholder: "Título do anúncio",
        class: "text-2xl rounded-r-none"
    }, null, 8, ["modelValue"]), Ea(i, {
        darkable: "true",
        modelValue: a.category,
        "onUpdate:modelValue": t[2] || (t[2] = e => a.category = e),
        class: "rounded-l-none border-l-0 text-2xl",
        options: {
            "%": "Todos",
            cars: "Carros",
            motorcycles: "Motos",
            houses: "Casas",
            misc: "Outros"
        }
    }, null, 8, ["modelValue"])]), Ea("ul", lS, [(ka(!0), _a(ma, null, pl(a.ads, (e => (ka(), _a("li", {
        key: e.id
    }, [Ea(c, {
        data: e
    }, null, 8, ["data"])])))), 128))]), sS])
};
const oS = {
        components: {
            Header: uA,
            Ad: hA,
            Footer: wA
        },
        inject: ["setDark"],
        setup() {
            const e = zi(),
                t = ot(),
                n = ot(0),
                a = lo.identity;
            return lo.backend.olx_fetch(e.params.id).then((e => {
                if (t.value = e || !1, e)
                    for (let t of e.images) {
                        (new Image).src = t
                    }
            })), {
                ad: t,
                yourself: a,
                imgIndex: n
            }
        },
        mounted() {
            this.setDark(!0)
        }
    },
    rS = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    iS = {
        key: 0
    },
    cS = {
        class: "relative bg-black"
    },
    uS = Ea("i", {
        class: "fal fa-chevron-left fa-2x"
    }, null, -1),
    dS = Ea("i", {
        class: "fal fa-chevron-right fa-2x"
    }, null, -1),
    pS = {
        class: "p-3 overflow-y-auto-hide-scroll"
    },
    fS = {
        class: "py-3"
    },
    hS = {
        class: "font-bold text-5xl"
    },
    mS = {
        class: "opacity-75 my-8 text-4xl break-words"
    },
    gS = {
        class: "opacity-50 text-2xl"
    },
    bS = Ea("hr", {
        class: "border-theme"
    }, null, -1),
    vS = {
        class: "py-3"
    },
    xS = Ea("h1", {
        class: "font-semibold mb-4 text-4xl"
    }, "Descrição", -1),
    yS = {
        class: "text-2xl opacity-75 break-words"
    },
    kS = Ea("hr", {
        class: "border-theme"
    }, null, -1),
    wS = {
        class: "py-3"
    },
    _S = Ea("h1", {
        class: "font-semibold mb-4 text-4xl"
    }, "Anunciante", -1),
    CS = {
        class: "text-2xl"
    },
    AS = Ea("strong", {
        class: "opacity-75"
    }, "Nome: ", -1),
    SS = {
        class: "opacity-50"
    },
    PS = Ea("strong", {
        class: "opacity-75"
    }, "Passaporte: ", -1),
    TS = {
        class: "opacity-50"
    },
    ES = Ea("strong", {
        class: "opacity-75"
    }, "Telefone: ", -1),
    RS = {
        class: "select-text opacity-50"
    },
    LS = Ea("i", {
        class: "fab fa-whatsapp"
    }, null, -1),
    IS = {
        key: 1
    },
    OS = Ea("h1", {
        class: "p-3 text-center opacity-75 font-semibold"
    }, "Anúncio não encontrado", -1);
oS.render = function(e, t, n, a, l, s) {
    const o = ua("Header");
    return ka(), _a("div", rS, [Ea(o, {
        title: "Detalhes"
    }), a.ad ? (ka(), _a("div", iS, [Ea("div", cS, [0 != a.imgIndex ? (ka(), _a("button", {
        key: 0,
        onClick: t[1] || (t[1] = e => a.imgIndex = Math.max(0, a.imgIndex - 1)),
        class: "absolute text-white h-full w-2/12"
    }, [uS])) : Oa("", !0), Ea("img", {
        class: "mx-auto",
        style: {
            "max-height": "21.5rem"
        },
        src: a.ad.images[a.imgIndex],
        alt: ""
    }, null, 8, ["src"]), a.imgIndex < a.ad.images.length - 1 ? (ka(), _a("button", {
        key: 1,
        onClick: t[2] || (t[2] = e => a.imgIndex = Math.min(a.ad.images.length - 1, a.imgIndex + 1)),
        class: "absolute top-0 right-0 text-white h-full w-2/12"
    }, [dS])) : Oa("", !0)]), Ea("div", pS, [Ea("div", fS, [Ea("h1", hS, g(e.$filters.intToMoney(a.ad.price)), 1), Ea("h3", mS, g(a.ad.title), 1), Ea("span", gS, "Publicado em " + g(e.$filters.unixToDate(a.ad.created_at)), 1)]), bS, Ea("div", vS, [xS, Ea("span", yS, g(a.ad.description), 1)]), kS, Ea("div", wS, [_S, Ea("ul", CS, [Ea("li", null, [AS, Ea("span", SS, g(a.ad.author.name), 1)]), Ea("li", null, [PS, Ea("span", TS, g(a.ad.author.user_id), 1)]), Ea("li", null, [ES, Ea("span", RS, g(a.ad.author.phone), 1), a.yourself.phone != a.ad.author.phone ? (ka(), _a("button", {
        key: 0,
        class: "ml-3 text-green-500",
        onClick: t[3] || (t[3] = t => e.$router.push("/whatsapp/" + a.ad.author.phone))
    }, [LS])) : Oa("", !0)])])])])])) : !1 === a.ad ? (ka(), _a("div", IS, [OS])) : Oa("", !0)])
};
const DS = {
        components: {
            Header: uA,
            Ad: hA
        },
        setup() {
            Ua("setDark")(!0);
            const e = Ua("alert"),
                t = ot();
            return lo.backend.olx_dashboard().then((e => {
                t.value = e
            })), {
                ads: t,
                destroy: function(n) {
                    lo.backend.olx_destroy(n).then((a => {
                        (null == a ? void 0 : a.error) ? e(a.error): t.value = t.value.filter((e => e.id != n))
                    }))
                }
            }
        }
    },
    NS = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    MS = {
        key: 0,
        class: "overflow-y-auto hide-scroll"
    },
    $S = {
        class: "ml-3 flex flex-col flex-1 justify-between"
    },
    VS = {
        class: "text-2xl text-theme opacity-75 break-words"
    },
    US = {
        class: "text-xl text-theme opacity-75"
    },
    jS = Ea("i", {
        class: "fal fa-trash-alt text-red-500"
    }, null, -1),
    FS = {
        key: 1,
        class: "p-3"
    },
    BS = Ea("h1", {
        class: "text-theme font-semibold text-center"
    }, "Você não possui anúncios", -1),
    HS = Ea("div", {
        class: "mt-32"
    }, null, -1);
DS.render = function(e, t, n, a, l, s) {
    var o;
    const r = ua("Header");
    return ka(), _a("div", NS, [Ea(r, {
        title: "Seus anúncios"
    }), (null == (o = a.ads) ? void 0 : o.length) ? (ka(), _a("div", MS, [Ea("ul", null, [(ka(!0), _a(ma, null, pl(a.ads, (t => (ka(), _a("li", {
        key: t.id,
        class: "border-b border-theme last:border-b-0 flex"
    }, [Ea("img", {
        src: t.images[0],
        class: "h-32"
    }, null, 8, ["src"]), Ea("div", $S, [Ea("h1", VS, g(t.title), 1), Ea("h3", US, g(e.$filters.intToMoney(t.price)), 1)]), Ea("button", {
        class: "m-3 p-2",
        onClick: e => a.destroy(t.id)
    }, [jS], 8, ["onClick"])])))), 128))])])) : a.ads ? (ka(), _a("div", FS, [BS])) : Oa("", !0), HS])
};
const GS = {},
    qS = {
        class: "mt-24 mx-4 bg-lightgray px-8 py-6 rounded-lg flex justify-between"
    };
GS.render = function(e, t) {
    return ka(), _a("div", qS, [Ea("button", null, [Ea("img", {
        src: e.$asset("/stock/tinder/flame.png"),
        class: "w-10",
        style: {
            filter: "/tinder" != e.$route.path ? "opacity(0.6) invert(0.5)" : "none"
        },
        onClick: t[1] || (t[1] = t => e.$router.replace("/tinder"))
    }, null, 12, ["src"])]), Ea("button", null, [Ea("img", {
        src: e.$asset("/stock/tinder/heart.png"),
        class: "w-10",
        style: {
            filter: "/tinder/likes" != e.$route.path ? "opacity(0.6) invert(0.5)" : "none"
        },
        onClick: t[2] || (t[2] = t => e.$router.replace("/tinder/likes"))
    }, null, 12, ["src"])]), Ea("button", null, [Ea("img", {
        src: e.$asset("/stock/tinder/chat.png"),
        class: "w-10",
        style: {
            filter: "/tinder/chats" != e.$route.path ? "opacity(0.6) invert(0.5)" : "none"
        },
        onClick: t[3] || (t[3] = t => e.$router.replace("/tinder/chats"))
    }, null, 12, ["src"])]), Ea("button", null, [Ea("img", {
        src: e.$asset("/stock/tinder/user.png"),
        class: "w-10",
        style: {
            filter: "/tinder/profile" != e.$route.path ? "opacity(0.6) invert(0.5)" : "none"
        },
        onClick: t[4] || (t[4] = t => e.$router.replace("/tinder/profile"))
    }, null, 12, ["src"])])])
};
const zS = {
        components: {
            Header: GS
        },
        setup() {
            Ua("setDark")(!1);
            const e = qi(),
                t = ot();
            return lo.backend.tinder().then((async n => {
                n ? t.value = await lo.backend.tinder_next(0) : "/tinder" == e.currentRoute.value.path && e.replace("/tinder/register")
            })), {
                peer: t,
                back: function() {
                    t.value && lo.backend.tinder_next(t.value.id, !1).then((e => {
                        e ? t.value = e : t.value.previous = !1
                    }))
                },
                next: function(e) {
                    t.value && lo.backend.tinder_next(t.value.id, !0, e).then((e => t.value = e))
                }
            }
        }
    },
    WS = {
        class: "h-full bg-white flex flex-col"
    },
    KS = {
        key: 0,
        class: "flex-1 mt-8 mx-4"
    },
    JS = {
        class: "relative mt-4"
    },
    XS = {
        class: "absolute bottom-4 left-4 right-4 text-white text-4xl"
    },
    YS = {
        class: "flex"
    },
    QS = {
        class: "font-bold"
    },
    ZS = {
        class: "ml-3"
    },
    eP = {
        class: "flex items-center"
    },
    tP = {
        class: "text-lg ml-2"
    },
    nP = {
        key: 0,
        class: "grid grid-cols-3 gap-4"
    },
    aP = {
        class: "flex-1 overflow-y-auto text-3xl h-80 fancy-scroll mt-4 whitespace-pre-wrap"
    },
    lP = {
        class: "absolute bottom-8 inset-x-4 px-8 h-28 bg-lightgray flex justify-between rounded-2xl"
    },
    sP = {
        key: 1
    },
    oP = Ea("p", {
        class: "text-gray-500 text-center text-xl mt-4"
    }, "Não encontramos ninguém compatível com você.", -1);
zS.render = function(e, t, n, a, l, s) {
    const o = ua("Header");
    return ka(), _a("div", WS, [Ea(o), a.peer && "object" == typeof a.peer ? (ka(), _a("div", KS, [Ea("div", JS, [Ea("img", {
        src: a.peer.image,
        class: "rounded-2xl w-full"
    }, null, 8, ["src"]), Ea("div", XS, [Ea("div", YS, [Ea("h1", QS, g(a.peer.name), 1), Ea("h3", ZS, g(a.peer.age), 1)]), Ea("div", eP, [Ea("div", {
        class: ["w-2 h-2 rounded-full", [a.peer.online ? "bg-green-400" : "bg-gray-400"]]
    }, null, 2), Ea("span", tP, g(a.peer.online ? "Online" : "Offline"), 1)]), a.peer.show_tags ? (ka(), _a("ul", nP, [(ka(!0), _a(ma, null, pl(a.peer.tags, ((e, t) => (ka(), _a("li", {
        key: t,
        class: "text-xl tinder-chip"
    }, g(e), 1)))), 128))])) : Oa("", !0)])]), Ea("p", aP, g(a.peer.bio), 1), Ea("div", lP, [a.peer.previous ? (ka(), _a("button", {
        key: 0,
        onClick: t[1] || (t[1] = e => a.back())
    }, [Ea("img", {
        src: e.$asset("/stock/tinder/redo.png"),
        class: "h-16"
    }, null, 8, ["src"])])) : Oa("", !0), Ea("button", {
        onClick: t[2] || (t[2] = e => a.next(0))
    }, [Ea("img", {
        src: e.$asset("/stock/tinder/refuse.png"),
        class: "h-16"
    }, null, 8, ["src"])]), Ea("button", {
        onClick: t[3] || (t[3] = e => a.next(2))
    }, [Ea("img", {
        src: e.$asset("/stock/tinder/star.png"),
        class: "h-16"
    }, null, 8, ["src"])]), Ea("button", {
        onClick: t[4] || (t[4] = e => a.next(1))
    }, [Ea("img", {
        src: e.$asset("/stock/tinder/like.png"),
        class: "h-16"
    }, null, 8, ["src"])])])])) : (ka(), _a("div", sP, [Ea("img", {
        src: e.$asset("/stock/tinder/heartbreak.svg"),
        class: "mx-auto mt-56 px-24"
    }, null, 8, ["src"]), oP]))])
};
const rP = {
        components: {},
        setup() {
            const e = Ua("setDark"),
                t = qi(),
                n = qo();
            e(!0);
            const a = Ye({
                    show_gender: !0,
                    show_tags: !0
                }),
                l = Ye({
                    tags: new Set
                }),
                s = ot();
            return {
                payload: a,
                tmp: l,
                error: s,
                takeSelfie: function() {
                    n.request(!0, "/tinder").then((t => {
                        a.image = t, e(!1)
                    }), (() => {}))
                },
                next: function() {
                    var e;
                    if (a.name)
                        if (a.age)
                            if (a.gender)
                                if (a.tags)
                                    if (a.target) {
                                        if (!a.bio) {
                                            const e = l.bio;
                                            if (!e) return s.value = "Preencha a bio";
                                            if (e.length > 1024) return s.value = "Limite de caracteres ultrapassado";
                                            a.bio = e, lo.backend.tinder_register(a).then((() => {
                                                t.replace("/tinder")
                                            }))
                                        }
                                    } else {
                                        const e = l.target;
                                        if (!e) return s.value = "Escolha sua preferência";
                                        a.target = e
                                    }
                    else {
                        const e = [...l.tags];
                        if (!e.length) return s.value = "Escolha pelo menos uma orientação";
                        if (e.length > 3) return s.value = "Escolha no máximo 3";
                        a.tags = e
                    } else {
                        const e = l.gender;
                        if (!e) return s.value = "Escolhe um gênero";
                        a.gender = e
                    } else {
                        const e = parseInt(l.age);
                        if (!e) return s.value = "Insira sua idade";
                        if (e < 18) return s.value = "A idade mínima é 18";
                        a.age = e
                    } else {
                        const t = null == (e = l.name) ? void 0 : e.trim();
                        if (!t) return s.value = "Insira seu nome e sobrenome";
                        if (!t.includes(" ")) return s.value = "Insira seu sobrenome";
                        if (t.match(/[\d!@#$%&*()\-=_+/]/)) return s.value = "Seu nome não pode ter números/símbolos";
                        a.name = t
                    }
                    s.value = null
                }
            }
        }
    },
    iP = ln("data-v-5522b8f7");
nn("data-v-5522b8f7");
const cP = {
        class: "flex flex-col h-full"
    },
    uP = {
        key: 0,
        container: "",
        class: "flex-1"
    },
    dP = Ea("span", {
        class: "text-xl text-white block text-center mt-4"
    }, "Clique na imagem para alterar", -1),
    pP = {
        key: 1,
        class: "flex-1 bg-white"
    },
    fP = {
        key: 0,
        class: "mt-96 px-20"
    },
    hP = Ea("p", {
        class: "text-xl text-gray-400 mt-2"
    }, "É assim que o seu nome vai aparecer no Tinder e você não poderá alterá-lo depois.", -1),
    mP = {
        key: 1,
        class: "mt-96 px-20"
    },
    gP = Ea("p", {
        class: "text-xl text-gray-400 mt-2"
    }, "Sua idade será pública.", -1),
    bP = {
        key: 2,
        class: "mt-80 px-20"
    },
    vP = Ea("span", {
        class: "text-2xl tinder-gray"
    }, "Selecione o seu gênero.", -1),
    xP = {
        class: "flex items-center"
    },
    yP = Ea("label", {
        class: "ml-2 text-2xl tinder-gray"
    }, "Mostrar meu gênero no perfil", -1),
    kP = {
        key: 3,
        class: "mt-60 px-20"
    },
    wP = Ea("span", {
        class: "text-2xl tinder-gray"
    }, "Selecione até 3", -1),
    _P = {
        class: "flex items-center"
    },
    CP = Ea("label", {
        class: "ml-2 text-2xl tinder-gray"
    }, "Mostrar minha orientação no meu perfil", -1),
    AP = {
        key: 4,
        class: "mt-72 px-20"
    },
    SP = Ea("span", {
        class: "text-2xl tinder-gray"
    }, "Sua preferência é por", -1),
    PP = {
        key: 5,
        class: "mt-72 px-20"
    },
    TP = Ea("span", {
        class: "text-xl tinder-gray"
    }, "Escreva a sua biografia", -1),
    EP = Ea("p", {
        class: "text-xl tinder-gray"
    }, "É assim que a sua biografia vai aparecer no Tinder, mas você poderá alterá-la depois.", -1),
    RP = {
        key: 6,
        class: "mt-96 text-center"
    },
    LP = {
        key: 7,
        class: "absolute bottom-32 w-full text-center text-2xl text-red-500"
    },
    IP = {
        key: 8,
        class: "absolute bottom-20 inset-x-0 text-center"
    };
an();
const OP = iP(((e, t, n, a, l, s) => {
    const o = ua("app-loading");
    return ka(), _a("div", cP, [a.payload.image ? (ka(), _a("div", pP, [Ea("img", {
        class: "mx-auto mt-20 h-16",
        src: e.$asset("/stock/tinder/logo.svg"),
        style: {
            filter: "invert(0.4)"
        }
    }, null, 8, ["src"]), a.payload.name ? a.payload.age ? a.payload.gender ? a.payload.tags ? a.payload.target ? a.payload.bio ? (ka(), _a("div", RP, [Ea(o, {
        style: {
            filter: "invert(0.5)"
        }
    })])) : (ka(), _a("div", PP, [TP, Yn(Ea("textarea", {
        "onUpdate:modelValue": t[10] || (t[10] = e => a.tmp.bio = e),
        onKeydown: t[11] || (t[11] = cs(rs((() => {}), ["prevent"]), ["enter"])),
        class: "border h-80 fancy-scroll rounded-xl text-xl w-full resize-none p-4",
        spellcheck: "false"
    }, null, 544), [
        [ts, a.tmp.bio]
    ]), EP])) : (ka(), _a("div", AP, [SP, (ka(), _a(ma, null, pl({
        Male: "Homens",
        Female: "Mulheres",
        All: "Todos"
    }, ((e, t) => Ea("button", {
        key: t,
        onClick: e => a.tmp.target = t,
        class: ["w-full border border-gray-200 rounded-xl py-3 mb-3", {
            "border-gray-500": a.tmp.target == t
        }]
    }, g(e), 11, ["onClick"]))), 64))])) : (ka(), _a("div", kP, [wP, (ka(), _a(ma, null, pl(["Heterossexual", "Gay", "Lésbica", "Bissexual", "Assexual", "Demissexual", "Pansexual", "Outros"], (e => Ea("button", {
        key: e,
        class: ["block mb-3 text-5xl text-gray-400 transition-color duration-300", {
            "text-gray-900": a.tmp.tags.has(e)
        }],
        onClick: t => a.tmp.tags.has(e) ? a.tmp.tags.delete(e) : a.tmp.tags.add(e)
    }, g(e), 11, ["onClick"]))), 64)), Ea("div", _P, [Yn(Ea("input", {
        "onUpdate:modelValue": t[9] || (t[9] = e => a.payload.show_tags = e),
        type: "checkbox",
        style: {
            filter: "grayscale(1)"
        }
    }, null, 512), [
        [ns, a.payload.show_tags]
    ]), CP])])) : (ka(), _a("div", bP, [vP, Ea("button", {
        onClick: t[6] || (t[6] = e => a.tmp.gender = "Male"),
        class: ["w-full border border-gray-200 rounded-xl py-3 mb-3", {
            "border-gray-500": "Male" == a.tmp.gender
        }]
    }, " Homem ", 2), Ea("button", {
        onClick: t[7] || (t[7] = e => a.tmp.gender = "Female"),
        class: ["w-full border border-gray-200 rounded-xl py-3 mb-3", {
            "border-gray-500": "Female" == a.tmp.gender
        }]
    }, " Mulher ", 2), Ea("div", xP, [Yn(Ea("input", {
        "onUpdate:modelValue": t[8] || (t[8] = e => a.payload.show_gender = e),
        type: "checkbox",
        style: {
            filter: "grayscale(1)"
        }
    }, null, 512), [
        [ns, a.payload.show_gender]
    ]), yP])])) : (ka(), _a("div", mP, [Yn(Ea("input", {
        autofocus: "",
        onKeydown: t[4] || (t[4] = cs(((...e) => a.next && a.next(...e)), ["enter"])),
        "onUpdate:modelValue": t[5] || (t[5] = e => a.tmp.age = e),
        type: "text",
        maxlength: "3",
        min: "18",
        placeholder: "21",
        class: "mx-auto block w-full border-b text-gray-800"
    }, null, 544), [
        [ts, a.tmp.age]
    ]), gP])) : (ka(), _a("div", fP, [Yn(Ea("input", {
        autofocus: "",
        onKeydown: t[2] || (t[2] = cs(((...e) => a.next && a.next(...e)), ["enter"])),
        "onUpdate:modelValue": t[3] || (t[3] = e => a.tmp.name = e),
        type: "text",
        maxlength: "255",
        placeholder: "Nome e Sobrenome",
        class: "mx-auto block w-full border-b text-gray-800"
    }, null, 544), [
        [ts, a.tmp.name]
    ]), hP])), a.error ? (ka(), _a("p", LP, g(a.error), 1)) : Oa("", !0), a.payload.bio ? Oa("", !0) : (ka(), _a("div", IP, [Ea("button", {
        onClick: t[12] || (t[12] = (...e) => a.next && a.next(...e)),
        class: "tinder-gray font-semibold text-4xl"
    }, " CONTINUAR ")]))])) : (ka(), _a("div", uP, [Ea("img", {
        src: e.$asset("/stock/tinder/logo.svg"),
        class: "mx-auto mt-32 w-5/12"
    }, null, 8, ["src"]), Ea("div", {
        onClick: t[1] || (t[1] = (...e) => a.takeSelfie && a.takeSelfie(...e)),
        class: "w-80 h-80 bg-white mx-auto mt-56 rounded-30 flex flex-center"
    }, [Ea("img", {
        class: "w-1/2",
        style: {
            filter: "grayscale(1) opacity(0.5)"
        },
        src: e.$asset("/stock/tinder/flame.png")
    }, null, 8, ["src"])]), dP]))])
}));
rP.render = OP, rP.__scopeId = "data-v-5522b8f7";
const DP = {
        components: {
            Header: GS
        },
        setup() {
            Ua("setDark")(!1);
            const e = ot();
            return lo.backend.tinder_liked().then((t => {
                e.value = t
            })), {
                likes: e
            }
        }
    },
    NP = ln("data-v-2d4e420b");
nn("data-v-2d4e420b");
const MP = {
        class: "h-full bg-white flex flex-col"
    },
    $P = {
        key: 0,
        class: "w-2/3 mx-auto mt-80"
    },
    VP = Ea("p", {
        class: "text-gray-500 text-xl mt-2"
    }, "Ainda ninguém te curtiu, mas eu curto você.", -1),
    UP = {
        key: 1,
        class: "overflow-y-auto hide-scroll my-3 mx-6 grid grid-cols-2 gap-6"
    },
    jP = {
        class: "absolute bottom-1 left-1 text-xl text-white"
    };
an();
const FP = NP(((e, t, n, a, l, s) => {
    const o = ua("Header");
    return ka(), _a("div", MP, [Ea(o), a.likes && !a.likes.length ? (ka(), _a("div", $P, [Ea("img", {
        src: e.$asset("/stock/tinder/dislike.svg"),
        class: "w-2/3 mx-auto"
    }, null, 8, ["src"]), VP])) : (ka(), _a("div", UP, [(ka(!0), _a(ma, null, pl(a.likes, (e => (ka(), _a("div", {
        class: "relative",
        key: e.id
    }, [Ea("img", {
        src: e.image,
        class: "rounded-lg"
    }, null, 8, ["src"]), Ea("p", jP, [Ea("b", null, g(e.name), 1), Ea("span", null, ", " + g(e.age), 1)])])))), 128))]))])
}));
DP.render = FP, DP.__scopeId = "data-v-2d4e420b";
const BP = {
        components: {
            Header: GS
        },
        setup() {
            Ua("setDark")(!1);
            const e = ot([]),
                t = ul((() => e.value.filter((e => e.last_message)).sort(((e, t) => t.last_message.created_at - e.last_message.created_at)))),
                n = ul((() => e.value.filter((e => !e.last_message))));
            return lo.backend.tinder_matches().then((t => {
                e.value = null != t ? t : []
            })), lo.onceRoute("TINDER_MESSAGE", (n => {
                const a = e.value.find((e => e.id == n.sender));
                a && (a.last_message = n, t.effect())
            })), {
                fresh: n,
                conversations: t
            }
        }
    },
    HP = {
        class: "h-full bg-white flex flex-col"
    },
    GP = {
        key: 0,
        class: "m-4"
    },
    qP = Ea("span", {
        class: "text-tinder text-2xl"
    }, "Novos Matches", -1),
    zP = {
        class: "bg-lightgray h-36 p-4 rounded-2xl flex overflow-x-auto tinder-scroll"
    },
    WP = {
        class: "overflow-hidden whitespace-nowrap text-base w-20"
    },
    KP = {
        key: 1,
        class: "text-tinder text-2xl m-4"
    },
    JP = {
        key: 2,
        class: "flex-1 overflow-y-auto hide-scroll m-4"
    },
    XP = {
        class: "ml-5 flex-1"
    },
    YP = {
        class: "text-2xl font-bold"
    },
    QP = {
        class: "flex justify-between"
    },
    ZP = {
        class: "text-lg text-gray-800 w-96 overflow-x-hidden"
    },
    eT = {
        class: "text-lg text-gray-400"
    };
BP.render = function(e, t, n, a, l, s) {
    var o, r;
    const i = ua("Header");
    return ka(), _a("div", HP, [Ea(i), a.fresh.length ? (ka(), _a("div", GP, [qP, Ea("div", zP, [(ka(!0), _a(ma, null, pl(a.fresh, (t => (ka(), _a("div", {
        key: t.id,
        onClick: n => e.$router.push("/tinder/chats/" + t.id),
        class: "flex flex-col flex-shrink-0 justify-center pr-3"
    }, [Ea("img", {
        src: t.image,
        class: "w-20 h-20 rounded-full"
    }, null, 8, ["src"]), Ea("h1", WP, g(t.name), 1)], 8, ["onClick"])))), 128))])])) : Oa("", !0), (null == (o = a.conversations) ? void 0 : o.length) ? (ka(), _a("p", KP, "Mensagens")) : Oa("", !0), (null == (r = a.conversations) ? void 0 : r.length) ? (ka(), _a("div", JP, [(ka(!0), _a(ma, null, pl(a.conversations, (t => {
        var n;
        return ka(), _a("div", {
            key: t.id,
            onClick: n => e.$router.push("/tinder/chats/" + t.id),
            class: "mb-5 flex items-center"
        }, [Ea("img", {
            src: t.image,
            class: "w-24 h-24 rounded-full"
        }, null, 8, ["src"]), Ea("div", XP, [Ea("h1", YP, g(t.name), 1), Ea("div", QP, [Ea("p", ZP, g(t.last_message.content.substr(0, 32)), 1), Ea("p", eT, g(e.$filters.unixToHHMM(null != (n = t.last_message.created_at) ? n : Date.now() / 1e3)), 1)])])], 8, ["onClick"])
    })), 128))])) : Oa("", !0)])
};
const tT = {
        setup() {
            Ua("setDark")(!1);
            const e = zi(),
                t = qi(),
                n = Ua("confirm"),
                a = e.params.id,
                l = ot(),
                o = ot({}),
                r = ot({}),
                i = Ye([]);

            function c(e) {
                l.value || Rt((() => {
                    var t;
                    return null == (t = document.querySelector(".overflow-y-auto")) ? void 0 : t.scrollTo({
                        left: 0,
                        top: 9e6,
                        behavior: null != e ? e : "smooth"
                    })
                }))
            }
            return lo.backend.tinder_chat(a).then((e => {
                var {
                    messages: t,
                    avatars: n
                } = e, a = s(e, ["messages", "avatars"]);
                o.value = a, r.value = n, i.push(... function(e) {
                    const t = [];
                    let n = [];
                    for (let a of e) n.length && n[n.length - 1].sender != a.sender ? (t.push(n), n = [a]) : n.push(a);
                    return n.length && t.push(n), t
                }(t)), c("auto")
            })), lo.onceRoute("TINDER_MESSAGE", (e => {
                if (e.sender != a && e.target != a) return;
                const t = i[i.length - 1];
                t && t[0].sender == e.sender ? t.push(e) : i.push([e]), c()
            })), lo.onceRoute("TINDER_DISMATCH", (e => {
                e == a && t.back()
            })), lo.onceRoute("TINDER_LIKE", (e => {
                for (let t of i) {
                    const n = t.find((t => t.id == e));
                    n && (n.liked = 1)
                }
            })), {
                id: a,
                chat: o,
                blocks: i,
                avatars: r,
                content: l,
                sendMessage: function() {
                    l.value && (lo.backend.tinder_sendMessage(a, l.value), l.value = null)
                },
                dismatch: async function() {
                    n("Deseja dar dismatch?").then((e => e && lo.backend.tinder_dismatch(a).then((() => t.back()))))
                },
                like: function(e) {
                    e.liked || lo.backend.tinder_likeMessage(e.id)
                }
            }
        }
    },
    nT = ln("data-v-a4dd8eb2");
nn("data-v-a4dd8eb2");
const aT = {
        class: "h-full bg-white flex flex-col"
    },
    lT = {
        class: "mt-16 h-24 border-b flex-shrink-0"
    },
    sT = Ea("i", {
        class: "far fa-chevron-left text-5xl text-gray-400"
    }, null, -1),
    oT = {
        class: "text-center"
    },
    rT = {
        class: "text-xl font-semibold text-gray-600"
    },
    iT = Ea("i", {
        class: "fas fa-times text-5xl text-tinder"
    }, null, -1),
    cT = {
        class: "flex-1 overflow-y-auto hide-scroll px-4"
    },
    uT = {
        class: "text-center text-xl font-semibold text-gray-600"
    },
    dT = {
        class: "break-words"
    },
    pT = {
        key: 0,
        class: "absolute text-sm w-full -bottom-4.5 left-0 text-gray-500 text-right"
    },
    fT = {
        class: "flex-shrink-0 h-40 pt-4"
    },
    hT = {
        class: "bg-gray-100 h-24 mx-4 px-4 rounded-lg flex justify-between items-center"
    };
an();
const mT = nT(((e, t, n, a, l, s) => {
    var o;
    return ka(), _a("div", aT, [Ea("div", lT, [Ea("button", {
        onClick: t[1] || (t[1] = t => e.$router.back()),
        class: "absolute top-20 px-8"
    }, [sT]), Ea("div", oT, [Ea("img", {
        src: null != (o = a.chat.image) ? o : e.$asset("stock/user.svg"),
        class: "w-16 h-16 rounded-full mx-auto"
    }, null, 8, ["src"]), Ea("p", rT, g(a.chat.name), 1)]), Ea("button", {
        onClick: t[2] || (t[2] = e => a.dismatch()),
        class: "absolute top-20 right-8"
    }, [iT])]), Ea("div", cT, [(ka(!0), _a(ma, null, pl(a.blocks, ((t, n) => (ka(), _a("div", {
        key: n,
        class: "mb-4"
    }, [Ea("h1", uT, g(e.$filters.unixToLocale(t[0].created_at)), 1), Ea("div", {
        class: ["flex items-end", {
            "flex-row-reverse": t[0].sender != a.id
        }]
    }, [Ea("img", {
        src: a.avatars[t[0].sender],
        class: "w-16 h-16 rounded-full"
    }, null, 8, ["src"]), Ea("div", {
        class: ["mx-4 flex flex-col", {
            "items-start": t[0].sender == a.id,
            "items-end": t[0].sender != a.id
        }]
    }, [(ka(!0), _a(ma, null, pl(t, ((e, t) => (ka(), _a("div", {
        key: t,
        sender: e.sender != a.id,
        class: "relative min-8rem mb-4 last:mb-0 px-4 py-2 rounded-2xl"
    }, [Ea("p", dT, g(e.content), 1), e.sender != a.id && e.liked ? (ka(), _a("p", pT, "Curtiu sua mensagem")) : Oa("", !0), e.sender == a.id ? (ka(), _a("button", {
        key: 1,
        class: "absolute -right-12 top-2",
        onClick: t => a.like(e)
    }, [Ea("i", {
        class: ["fas fa-heart", {
            "text-gray-300": !e.liked,
            "text-tinder": e.liked
        }]
    }, null, 2)], 8, ["onClick"])) : Oa("", !0)], 8, ["sender"])))), 128))], 2)], 2)])))), 128))]), Ea("div", fT, [Ea("div", hT, [Yn(Ea("input", {
        "onUpdate:modelValue": t[3] || (t[3] = e => a.content = e),
        onKeydown: t[4] || (t[4] = cs(((...e) => a.sendMessage && a.sendMessage(...e)), ["enter"])),
        maxlength: "255",
        type: "text",
        class: "p-4 bg-transparent text-xl flex-1",
        placeholder: "Digite uma mensagem"
    }, null, 544), [
        [ts, a.content]
    ]), Ea("button", {
        onClick: t[5] || (t[5] = (...e) => a.sendMessage && a.sendMessage(...e)),
        class: "ml-4 text-gray-400 text-2xl"
    }, "Enviar")])])])
}));
tT.render = mT, tT.__scopeId = "data-v-a4dd8eb2";
const gT = {
        components: {
            Header: GS
        },
        setup() {
            Ua("setDark")(!1);
            const e = Ua("alert"),
                t = qo(),
                n = ot({}),
                a = ot(lo.hasNotificationFor("tinder"));
            return Sn(a, (e => lo.setNotificationFor("tinder", e))), Sn((() => n.value.target), ((e, t) => t && lo.backend.tinder_changeTarget(e))), lo.backend.tinder().then((e => n.value = e)), {
                profile: n,
                notifications: a,
                changeAvatar: async function() {
                    try {
                        const e = await t.request(!0, "/tinder");
                        await lo.backend.tinder_changeAvatar(e), n.value.image = e
                    } catch (e) {}
                },
                changeBio: function() {
                    const t = n.value.bio;
                    return t ? t.length > 1024 ? e("A bio não pode ser maior que 1024 caracteres") : void lo.backend.tinder_changeBio(t) : e("A bio não pode ficar vazia")
                }
            }
        }
    },
    bT = ln("data-v-7601d390");
nn("data-v-7601d390");
const vT = {
        class: "h-full bg-white flex flex-col"
    },
    xT = {
        key: 0
    },
    yT = {
        class: "relative"
    },
    kT = {
        class: "flex justify-center"
    },
    wT = {
        class: "font-bold"
    },
    _T = {
        class: "mx-4 mt-4"
    },
    CT = Ea("span", {
        class: "text-gray-500 text-2xl"
    }, "Biografia", -1),
    AT = {
        class: "mx-4 mt-4"
    },
    ST = Ea("label", null, "O que você busca?", -1),
    PT = {
        class: "px-4 mt-4"
    },
    TT = {
        class: "flex justify-between"
    },
    ET = Ea("p", {
        class: "text-3xl"
    }, "Notificações", -1);
an();
const RT = bT(((e, t, n, a, l, s) => {
    const o = ua("Header"),
        r = ua("app-select"),
        i = ua("app-toggle");
    return ka(), _a("div", vT, [Ea(o), a.profile.id ? (ka(), _a("div", xT, [Ea("div", yT, [Ea("img", {
        src: a.profile.image,
        class: "relative mx-auto mt-16 w-64 h-64 rounded-full"
    }, null, 8, ["src"]), Ea("img", {
        onClick: t[1] || (t[1] = e => a.changeAvatar()),
        class: "absolute top-6 left-0 right-0 w-1/3 mx-auto opacity-0 hover:opacity-50 transition-opacity duration-300",
        style: {
            filter: "invert(1)"
        },
        src: "http://simpleicon.com/wp-content/uploads/camera.svg",
        alt: ""
    })]), Ea("div", kT, [Ea("p", wT, g(a.profile.name), 1), Ea("p", null, ", " + g(a.profile.age), 1)]), Ea("div", _T, [CT, Yn(Ea("textarea", {
        "onUpdate:modelValue": t[2] || (t[2] = e => a.profile.bio = e),
        onChange: t[3] || (t[3] = (...e) => a.changeBio && a.changeBio(...e)),
        class: "block w-full h-64 p-3 rounded-xl resize-none text-2xl",
        spellcheck: "false"
    }, null, 544), [
        [ts, a.profile.bio]
    ])]), Ea("div", AT, [ST, Ea(r, {
        modelValue: a.profile.target,
        "onUpdate:modelValue": t[4] || (t[4] = e => a.profile.target = e),
        options: {
            Male: "Homens",
            Female: "Mulheres",
            All: "Todos"
        }
    }, null, 8, ["modelValue"])]), Ea("div", PT, [Ea("div", TT, [ET, Ea(i, {
        modelValue: a.notifications,
        "onUpdate:modelValue": t[5] || (t[5] = e => a.notifications = e)
    }, null, 8, ["modelValue"])])])])) : Oa("", !0)])
}));
gT.render = RT, gT.__scopeId = "data-v-7601d390";
const LT = {
    setup() {
        Ua("setDark")();
        const e = zi().params.id,
            t = {
                dark: lo.darkTheme.value || "",
                fontSize: document.documentElement.style.fontSize,
                android: lo.settings.isAndroid
            },
            n = Object.entries(t).map((e => e.map(encodeURIComponent).join("="))).join("&");
        return {
            src: ul((() => {
                var t;
                return (null == (t = lo.settings.customApps) ? void 0 : t[e]) + "?" + n
            }))
        }
    },
    unmounted() {
        focus()
    }
};
LT.render = function(e, t, n, a, l, s) {
    return ka(), _a("iframe", {
        class: "w-full h-full bg-theme",
        src: a.src,
        frameborder: "0"
    }, null, 8, ["src"])
};
const IT = {
        props: ["title"],
        setup: () => ({
            isAndroid: lo.settings.isAndroid
        })
    },
    OT = {
        class: "h-32 pt-16 bg-theme-accent border-b border-theme"
    },
    DT = {
        key: 0,
        class: "far fa-arrow-left"
    },
    NT = {
        key: 1,
        class: "fas fa-chevron-left text-blue-400"
    };
IT.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", OT, [Ea("button", {
        onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t)),
        class: "absolute top-16 left-0 px-4"
    }, [a.isAndroid ? (ka(), _a("i", DT)) : (ka(), _a("i", NT))]), Ea("h1", {
        class: ["font-bold", {
            "ml-16": a.isAndroid,
            "text-center": !a.isAndroid
        }]
    }, g(n.title), 3), Yt(e.$slots, "default")])
};
const MT = {
        components: {
            Header: IT
        },
        setup() {
            Ua("setDark")(lo.darkTheme.value);
            const e = Ua("confirm"),
                t = (e, t) => e.toLowerCase().includes(t.toLowerCase()),
                n = ot(""),
                a = ot([]),
                l = ul((() => {
                    const e = n.value;
                    return e ? a.value.filter((({
                        title: n,
                        author: a
                    }) => t(n, e) || t(a.name, e) || t(a.phone, e))) : a.value
                })),
                s = ul((() => a.value.some((e => e.author.user_id == lo.identity.user_id))));
            return lo.backend.yellowpages_index().then((e => a.value = e)), {
                dark: lo.darkTheme,
                hasPost: s,
                query: n,
                posts: l,
                call: function(e) {
                    lo.pusher.emit("CALL_TO", e)
                },
                destroy: function() {
                    e("Deseja excluir seu anúncio?").then((e => e && lo.backend.yellowpages_destroy().then((() => {
                        a.value = a.value.filter((e => e.author.user_id != lo.identity.user_id))
                    }))))
                }
            }
        }
    },
    $T = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    VT = Ea("i", {
        class: "far fa-times text-red-500"
    }, null, -1),
    UT = Ea("i", {
        class: "far fa-plus text-blue-500"
    }, null, -1),
    jT = {
        class: "flex-shrink p-5 relative"
    },
    FT = {
        class: "flex-1 overflow-y-auto hide-scroll px-5"
    },
    BT = {
        class: "text-center break-words pb-2"
    },
    HT = {
        class: "grid grid-cols-2 border-t border-yellow-700 pt-2 text-3xl"
    },
    GT = {
        class: "text-center border-r border-yellow-700"
    };
MT.render = function(e, t, n, a, l, s) {
    const o = ua("Header"),
        r = ua("app-input");
    return ka(), _a("div", $T, [Ea(o, {
        title: "Yellow Pages"
    }, {
        default: Zt((() => [a.hasPost ? (ka(), _a("button", {
            key: 0,
            class: "absolute top-16 right-0 px-5",
            onClick: t[1] || (t[1] = (...e) => a.destroy && a.destroy(...e))
        }, [VT])) : (ka(), _a("button", {
            key: 1,
            class: "absolute top-16 right-0 px-5",
            onClick: t[2] || (t[2] = t => e.$router.push("/yellowpages/create"))
        }, [UT]))])),
        _: 1
    }), Ea("div", jT, [Ea("i", {
        class: ["absolute top-9 left-10 fas fa-search text-2xl", [a.dark ? "text-gray-800" : "text-gray-400"]]
    }, null, 2), Ea(r, {
        modelValue: a.query,
        "onUpdate:modelValue": t[3] || (t[3] = e => a.query = e),
        placeholder: "Buscar",
        class: "text-2xl bg-theme border-theme pl-14"
    }, null, 8, ["modelValue"])]), Ea("ul", FT, [(ka(!0), _a(ma, null, pl(a.posts, (e => (ka(), _a("li", {
        key: e.id,
        class: "bg-yellow-400 text-yellow-700 mx-auto p-5 mb-4"
    }, [Ea("p", BT, g(e.title), 1), Ea("div", HT, [Ea("p", GT, g(e.author.name), 1), Ea("button", {
        class: "text-center",
        onClick: t => a.call(e.author.phone)
    }, g(e.author.phone), 9, ["onClick"])])])))), 128))])])
};
const qT = {
        components: {
            Header: IT
        },
        setup() {
            Ua("setDark")(lo.darkTheme.value);
            const e = qi(),
                t = ot("");
            return {
                dark: lo.darkTheme,
                title: t,
                publish: function() {
                    t.value.trim().length && lo.backend.yellowpages_store(t.value).then((() => e.back()))
                }
            }
        }
    },
    zT = {
        class: "h-full bg-theme text-theme"
    },
    WT = {
        class: "p-5"
    },
    KT = Ea("label", null, "Título", -1);
qT.render = function(e, t, n, a, l, s) {
    const o = ua("Header");
    return ka(), _a("div", zT, [Ea(o, {
        title: "Criar um anúncio"
    }), Ea("div", WT, [KT, Yn(Ea("textarea", {
        "onUpdate:modelValue": t[1] || (t[1] = e => a.title = e),
        maxlength: "100",
        class: "block p-4 text-3xl text-theme w-full h-64 bg-theme border border-theme resize-none rounded-xl"
    }, null, 512), [
        [ts, a.title]
    ]), Ea("button", {
        onClick: t[2] || (t[2] = (...e) => a.publish && a.publish(...e)),
        class: "block ml-auto mt-4 px-4 py-3 rounded-xl bg-yellow-400 text-yellow-700"
    }, "Publicar")])])
};
const JT = {
        inject: ["setDark"],
        data: () => ({
            result: 0,
            tmp_value: 0,
            reset: !1,
            operator: void 0,
            lastOperation: void 0
        }),
        created() {
            this.setDark(!0)
        },
        methods: {
            clear() {
                this.result = 0, this.tmp_value = 0, this.operator = void 0, this.lastOperation = void 0
            },
            invert() {
                this.result *= -1
            },
            percent() {
                this.result = this.result / 100 * this.tmp_value
            },
            addNumber(e) {
                0 != this.result && !0 !== this.reset || (this.result = "", this.reset = !1), this.result += e.toString()
            },
            addPoint() {
                this.result.includes(".") || (this.result += ".")
            },
            setOperator(e) {
                0 != this.tmp_value && this.calculate(), this.tmp_value = this.result, this.operator = e, this.reset = !0
            },
            equal() {
                if (!this.operator && this.lastOperation) {
                    const [e, t] = this.lastOperation;
                    this.operator = e, this.tmp_value = this.result, this.result = t
                }
                this.calculate(), this.tmp_value = 0, this.operator = void 0
            },
            calculate() {
                let e = 0,
                    t = parseFloat(this.tmp_value),
                    n = parseFloat(this.result);
                switch (this.operator) {
                    case "+":
                        e = t + n;
                        break;
                    case "-":
                        e = t - n;
                        break;
                    case "*":
                        e = t * n;
                        break;
                    case "/":
                        e = t / n
                }
                this.lastOperation = [this.operator, n], this.result = e.toString()
            }
        }
    },
    XT = {
        class: "flex flex-col h-full bg-black"
    },
    YT = {
        class: "h-full p-5 pt-80 mt-32"
    },
    QT = {
        class: "flex justify-around"
    },
    ZT = Ea("i", {
        class: "fas fa-divide"
    }, null, -1),
    eE = {
        class: "flex justify-around mt-4"
    },
    tE = Ea("i", {
        class: "fas fa-times"
    }, null, -1),
    nE = {
        class: "flex justify-around mt-4"
    },
    aE = Ea("i", {
        class: "fas fa-minus"
    }, null, -1),
    lE = {
        class: "flex justify-around mt-4"
    },
    sE = Ea("i", {
        class: "fas fa-plus"
    }, null, -1),
    oE = {
        class: "flex justify-around mt-4"
    },
    rE = Ea("i", {
        class: "fas fa-equals"
    }, null, -1);
JT.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", XT, [Ea("div", YT, [Yn(Ea("input", {
        class: "block bg-transparent text-white w-full text-right p-4 h-52",
        style: {
            fontSize: Math.min(8, 20 / String(l.result).length * 2.75) + "rem"
        },
        type: "text",
        "onUpdate:modelValue": t[1] || (t[1] = e => l.result = e),
        disabled: ""
    }, null, 4), [
        [ts, l.result]
    ]), Ea("div", QT, [Ea("div", {
        class: "bg-gray-500 w-28 py-8 text-center rounded-full",
        onClick: t[2] || (t[2] = (...e) => s.clear && s.clear(...e))
    }, "AC"), Ea("div", {
        class: "bg-gray-500 w-28 py-8 text-center rounded-full",
        onClick: t[3] || (t[3] = (...e) => s.invert && s.invert(...e))
    }, "+/-"), Ea("div", {
        class: "bg-gray-500 w-28 py-8 text-center rounded-full",
        onClick: t[4] || (t[4] = (...e) => s.percent && s.percent(...e))
    }, "%"), Ea("div", {
        class: "bg-orange-400 text-white w-28 py-8 text-center rounded-full",
        onClick: t[5] || (t[5] = e => s.setOperator("/"))
    }, [ZT])]), Ea("div", eE, [(ka(), _a(ma, null, pl([7, 8, 9], (e => Ea("div", {
        key: e,
        onClick: t => s.addNumber(e),
        class: "bg-gray-800 text-white w-28 py-8 text-center rounded-full"
    }, g(e), 9, ["onClick"]))), 64)), Ea("div", {
        class: "bg-orange-400 text-white w-28 text-center py-8 rounded-full",
        onClick: t[6] || (t[6] = e => s.setOperator("*"))
    }, [tE])]), Ea("div", nE, [(ka(), _a(ma, null, pl([4, 5, 6], (e => Ea("div", {
        key: e,
        onClick: t => s.addNumber(e),
        class: "bg-gray-800 text-white w-28 py-8 text-center rounded-full"
    }, g(e), 9, ["onClick"]))), 64)), Ea("div", {
        class: "bg-orange-400 text-white w-28 text-center py-8 rounded-full",
        onClick: t[7] || (t[7] = e => s.setOperator("-"))
    }, [aE])]), Ea("div", lE, [(ka(), _a(ma, null, pl([1, 2, 3], (e => Ea("div", {
        key: e,
        onClick: t => s.addNumber(e),
        class: "bg-gray-800 text-white w-28 py-8 text-center rounded-full"
    }, g(e), 9, ["onClick"]))), 64)), Ea("div", {
        class: "bg-orange-400 text-white w-28 text-center py-8 rounded-full",
        onClick: t[8] || (t[8] = e => s.setOperator("+"))
    }, [sE])]), Ea("div", oE, [Ea("div", {
        onClick: t[9] || (t[9] = e => s.addNumber(0)),
        class: "bg-gray-800 text-white w-60 py-8 pl-12 rounded-full"
    }, "0"), Ea("div", {
        onClick: t[10] || (t[10] = (...e) => s.addPoint && s.addPoint(...e)),
        class: "bg-gray-800 text-white w-28 py-8 text-center rounded-full"
    }, "."), Ea("div", {
        class: "bg-orange-400 text-white w-28 text-center py-8 rounded-full",
        onClick: t[11] || (t[11] = (...e) => s.equal && s.equal(...e))
    }, [rE])])])])
};
const iE = {
        props: ["title"],
        setup: () => ({
            isAndroid: lo.settings.isAndroid
        })
    },
    cE = {
        class: "flex flex-shrink-0 h-32 pt-16 bg-theme-accent border-b border-theme"
    },
    uE = {
        key: 0,
        class: "far fa-arrow-left"
    },
    dE = {
        key: 1,
        class: "fas fa-chevron-left text-note"
    };
iE.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", cE, [Ea("button", {
        class: "absolute left-0 top-16 px-5",
        onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
    }, [a.isAndroid ? (ka(), _a("i", uE)) : (ka(), _a("i", dE))]), Ea("h1", {
        class: [{
            "ml-16": a.isAndroid,
            "mx-auto": !a.isAndroid
        }, "font-bold"]
    }, g(n.title), 3), Yt(e.$slots, "default")])
};
const pE = {
        components: {
            Header: iE
        },
        setup() {
            Ua("setDark")(lo.darkTheme.value);
            const e = Ua("confirm"),
                t = localStorage.getItem("smartphone@notes"),
                n = ot(t ? JSON.parse(t) : []);
            return {
                notes: n,
                change: function(e, t) {
                    const a = n.value,
                        l = a[t];
                    a[t] = a[e], a[e] = l, localStorage.setItem("smartphone@notes", JSON.stringify(a))
                },
                destroy: function(t) {
                    e("Deseja apagar essa anotação?").then((e => {
                        if (e) {
                            const e = n.value;
                            e.splice(t, 1), localStorage.setItem("smartphone@notes", JSON.stringify(e))
                        }
                    }))
                }
            }
        }
    },
    fE = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    hE = Ea("i", {
        class: "far fa-plus text-note"
    }, null, -1),
    mE = {
        class: "flex-grow overflow-y-auto hide-scroll"
    },
    gE = Ea("i", {
        class: "fas fa-chevron-up text-lg text-note"
    }, null, -1),
    bE = Ea("i", {
        class: "fas fa-chevron-down text-lg text-note"
    }, null, -1),
    vE = {
        class: "ml-4 flex flex-col"
    },
    xE = {
        key: 0,
        class: "text-2xl overflow-x-hidden"
    },
    yE = {
        key: 1,
        class: "text-2xl italic"
    },
    kE = {
        class: "text-gray-500 text-xl"
    },
    wE = Ea("i", {
        class: "far fa-trash-alt text-note text-xl"
    }, null, -1);
pE.render = function(e, t, n, a, l, s) {
    const o = ua("Header");
    return ka(), _a("div", fE, [Ea(o, {
        title: "Notas"
    }, {
        default: Zt((() => [Ea("button", {
            class: "absolute right-0 top-16 px-5",
            onClick: t[1] || (t[1] = t => e.$router.push("/notes/create"))
        }, [hE])])),
        _: 1
    }), Ea("ul", mE, [(ka(!0), _a(ma, null, pl(a.notes, ((n, l) => (ka(), _a("li", {
        key: l,
        class: "flex items-center border-b border-theme p-2",
        onClick: t => e.$router.push("/notes/" + l)
    }, [Ea("div", {
        class: "flex flex-col",
        onClick: t[2] || (t[2] = rs((() => {}), ["stop"]))
    }, [l > 0 ? (ka(), _a("button", {
        key: 0,
        onClick: rs((e => a.change(l, l - 1)), ["stop"])
    }, [gE], 8, ["onClick"])) : Oa("", !0), l < a.notes.length - 1 ? (ka(), _a("button", {
        key: 1,
        onClick: rs((e => a.change(l, l + 1)), ["stop"])
    }, [bE], 8, ["onClick"])) : Oa("", !0)]), Ea("div", vE, [n.text.trim() ? (ka(), _a("p", xE, g(n.text.substr(0, 32)), 1)) : (ka(), _a("p", yE, "(Sem conteúdo)")), Ea("p", kE, g(new Date(n.updated_at).toLocaleString("pt-BR")), 1)]), Ea("button", {
        class: "ml-auto px-5",
        onClick: rs((e => a.destroy(l)), ["stop"])
    }, [wE], 8, ["onClick"])], 8, ["onClick"])))), 128))])])
};
const _E = {
        components: {
            Header: iE
        },
        setup() {
            Ua("setDark")(lo.darkTheme.value);
            const e = qi(),
                t = ot("");
            return Rt((() => document.querySelector("textarea").focus())), {
                text: t,
                save: function() {
                    var n;
                    const a = JSON.parse(null != (n = localStorage.getItem("smartphone@notes")) ? n : "[]"),
                        l = Date.now();
                    a.push({
                        text: t.value,
                        created_at: l,
                        updated_at: l
                    }), localStorage.setItem("smartphone@notes", JSON.stringify(a)), e.back()
                }
            }
        }
    },
    CE = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    AE = Ea("i", {
        class: "far fa-file text-note"
    }, null, -1);
_E.render = function(e, t, n, a, l, s) {
    const o = ua("Header");
    return ka(), _a("div", CE, [Ea(o, {
        title: "Nova anotação"
    }, {
        default: Zt((() => [Ea("button", {
            class: "absolute right-0 top-16 px-5",
            onClick: t[1] || (t[1] = (...e) => a.save && a.save(...e))
        }, [AE])])),
        _: 1
    }), Yn(Ea("textarea", {
        onKeydown: t[2] || (t[2] = cs(rs((() => {}), ["prevent"]), ["enter"])),
        maxlength: "10000",
        class: "flex-1 w-full p-2 fancy-scroll resize-none bg-theme",
        "onUpdate:modelValue": t[3] || (t[3] = e => a.text = e)
    }, null, 544), [
        [ts, a.text]
    ])])
};
const SE = {
        components: {
            Header: iE
        },
        setup() {
            Ua("setDark")(lo.darkTheme.value);
            const e = qi(),
                t = e.currentRoute.value.params.id,
                n = ot(JSON.parse(localStorage.getItem("smartphone@notes"))[t].text);
            return {
                text: n,
                save: function() {
                    const a = JSON.parse(localStorage.getItem("smartphone@notes"));
                    a[t].text = n.value, a[t].updated_at = Date.now(), localStorage.setItem("smartphone@notes", JSON.stringify(a)), e.back()
                }
            }
        }
    },
    PE = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    TE = Ea("i", {
        class: "far fa-pencil text-note"
    }, null, -1);
SE.render = function(e, t, n, a, l, s) {
    const o = ua("Header");
    return ka(), _a("div", PE, [Ea(o, {
        title: "Editar anotação"
    }, {
        default: Zt((() => [Ea("button", {
            class: "absolute right-0 top-16 px-5",
            onClick: t[1] || (t[1] = (...e) => a.save && a.save(...e))
        }, [TE])])),
        _: 1
    }), Yn(Ea("textarea", {
        onKeydown: t[2] || (t[2] = cs(rs((() => {}), ["prevent"]), ["enter"])),
        maxlength: "10000",
        class: "flex-1 w-full p-2 fancy-scroll resize-none bg-theme",
        "onUpdate:modelValue": t[3] || (t[3] = e => a.text = e)
    }, null, 544), [
        [ts, a.text]
    ])])
};
const EE = {
        setup() {
            Ua("setDark")(!0);
            const e = Ye([]),
                t = Ye({
                    state: "",
                    time: 0,
                    bombs: 0,
                    marked: 0
                });

            function n(e) {
                return e[Math.floor(e.length * Math.random())]
            }
            return setInterval((() => {
                "playing" == t.state && (t.time += 1)
            }), 1e3), {
                game: t,
                columns: e,
                newGame: function(a, l) {
                    e.length = 0, t.state = "playing", t.bombs = l, t.marked = 0, t.time = 0;
                    for (let t = 0; t < a; t++) {
                        const n = [];
                        for (let e = 0; e < a; e++) n.push({
                            x: t,
                            y: e,
                            nearby: 0,
                            revealed: !1,
                            marked: !1,
                            mine: !1
                        });
                        e.push(n)
                    }
                    for (; l;) {
                        const t = n(n(e));
                        t.mine || (t.mine = !0, l -= 1)
                    }
                },
                reveal: function n(a) {
                    if (!a.marked && "defeat" != t.state && !a.revealed)
                        if (a.revealed = !0, a.mine) t.state = "defeat";
                        else {
                            const l = e.flat(),
                                s = l.filter((e => e != a && Math.sqrt((e.x - a.x) ** 2 + (e.y - a.y) ** 2) < 1.9)),
                                o = s.reduce(((e, t) => e + t.mine), 0);
                            0 == o ? s.forEach((e => n(e))) : a.nearby = o;
                            l.reduce(((e, t) => e + t.revealed), 0) == l.length - t.bombs && (t.state = "win")
                        }
                },
                mark: function(e) {
                    e.revealed || "playing" != t.state || t.marked >= t.bombs && !e.marked || (e.marked = !e.marked, t.marked += e.marked ? 1 : -1)
                }
            }
        }
    },
    RE = {
        class: "flex flex-col h-full bg-gray-800"
    },
    LE = {
        class: "flex justify-between p-8 pt-48"
    },
    IE = {
        class: "flex"
    },
    OE = {
        class: "flex flex-center"
    },
    DE = {
        key: 0,
        class: "fas fa-flag-alt text-lg text-red-600"
    },
    NE = {
        key: 1,
        class: "fas fa-bomb"
    },
    ME = {
        key: 0,
        class: "flex-1 bg-gray-800"
    },
    $E = {
        class: "flex justify-between p-8"
    },
    VE = {
        class: "bg-gray-600 ring ring-gray-500 text-white text-center p-5 rounded-xl w-32"
    },
    UE = {
        class: "bg-gray-600 ring ring-gray-500 text-white text-center p-5 rounded-xl w-32"
    },
    jE = {
        key: 1,
        class: "text-white text-center text-4xl pt-8"
    },
    FE = {
        key: 0
    },
    BE = {
        key: 1
    },
    HE = {
        key: 2
    };
EE.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", RE, [Ea("div", LE, [(ka(), _a(ma, null, pl([
        [5, 5],
        [9, 10],
        [12, 20]
    ], (([e, t]) => Ea("div", {
        key: e,
        class: "bg-gray-600 ring ring-gray-500 text-white p-5 rounded-xl",
        onClick: n => a.newGame(e, t)
    }, [Ea("h3", null, g(e) + "x" + g(e), 1)], 8, ["onClick"]))), 64))]), Ea("div", IE, [(ka(!0), _a(ma, null, pl(a.columns, ((e, t) => (ka(), _a("div", {
        class: "flex flex-col flex-1",
        key: t
    }, [(ka(!0), _a(ma, null, pl(e, ((e, t) => (ka(), _a("div", {
        key: t,
        class: ["w-full square border border-gray-600 flex flex-center", [e.revealed ? "bg-gray-400" : "bg-gray-500"]],
        onClick: t => a.reveal(e),
        onContextmenu: rs((t => a.mark(e)), ["prevent", "stop"])
    }, [Ea("div", OE, [e.marked ? (ka(), _a("i", DE)) : e.revealed && e.mine ? (ka(), _a("i", NE)) : (ka(), _a("p", {
        key: 2,
        nearby: e.nearby,
        class: "font-bold"
    }, g(e.nearby || ""), 9, ["nearby"]))])], 42, ["onClick", "onContextmenu"])))), 128))])))), 128))]), "playing" == a.game.state ? (ka(), _a("div", ME, [Ea("div", $E, [Ea("div", VE, g(e.$filters.duration(a.game.time)), 1), Ea("div", UE, [Ea("h3", null, "💣 " + g(a.game.bombs - a.game.marked), 1)])])])) : (ka(), _a("div", jE, ["win" == a.game.state ? (ka(), _a("h1", FE, "Você venceu em " + g(e.$filters.duration(a.game.time)), 1)) : "defeat" == a.game.state ? (ka(), _a("h1", BE, "Você perdeu")) : (ka(), _a("h1", HE, "Escolha um modo de jogo"))]))])
};
const GE = {
        setup: () => (Ua("setDark")(lo.darkTheme.value), {
            isAndroid: lo.settings.isAndroid
        })
    },
    qE = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    zE = {
        class: "h-32 pt-16"
    },
    WE = {
        key: 0,
        class: "far fa-arrow-left"
    },
    KE = {
        key: 1,
        class: "fas fa-chevron-left text-blue-500"
    },
    JE = Ea("iframe", {
        class: "flex-1 w-full",
        src: "https://trucoon.com.br/jogo/",
        frameborder: "0"
    }, "\r\n    ", -1);
GE.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", qE, [Ea("div", zE, [Ea("button", {
        class: "absolute top-16 left-0 px-4",
        onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
    }, [a.isAndroid ? (ka(), _a("i", WE)) : (ka(), _a("i", KE))]), Ea("h1", {
        class: ["font-bold", {
            "ml-16": a.isAndroid,
            "text-center": !a.isAndroid
        }]
    }, "Truco", 2)]), JE])
};
const XE = {
        setup: () => (Ua("setDark")(lo.darkTheme.value), {
            isAndroid: lo.settings.isAndroid
        })
    },
    YE = {
        class: "flex flex-col h-full bg-theme text-theme"
    },
    QE = {
        class: "h-32 pt-16"
    },
    ZE = {
        key: 0,
        class: "far fa-arrow-left"
    },
    eR = {
        key: 1,
        class: "fas fa-chevron-left text-blue-500"
    },
    tR = Ea("iframe", {
        class: "flex-1 w-full",
        src: "https://slither.io/",
        frameborder: "0"
    }, "\r\n    ", -1);
XE.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", YE, [Ea("div", QE, [Ea("button", {
        class: "absolute top-16 left-0 px-4",
        onClick: t[1] || (t[1] = (...t) => e.$router.back && e.$router.back(...t))
    }, [a.isAndroid ? (ka(), _a("i", ZE)) : (ka(), _a("i", eR))]), Ea("h1", {
        class: ["font-bold", {
            "ml-16": a.isAndroid,
            "text-center": !a.isAndroid
        }]
    }, "Gulper", 2)]), tR])
};
const nR = [{
        path: "/",
        component: Wi
    }, {
        path: "/home",
        component: Zi
    }, {
        path: "/video",
        component: sr
    }, {
        path: "/settings",
        component: ic
    }, {
        path: "/contacts",
        component: Wc
    }, {
        path: "/contacts/services",
        component: wu
    }, {
        path: "/contacts/dial",
        component: Nu
    }, {
        path: "/contacts/history",
        component: Qu
    }, {
        path: "/contacts/blocks",
        component: dd
    }, {
        path: "/contacts/create",
        component: iu
    }, {
        path: "/contacts/:id",
        component: mu
    }, {
        path: "/call",
        component: gp
    }, {
        path: "/sms",
        component: xd
    }, {
        path: "/sms/:id",
        component: Dd
    }, {
        path: "/gallery",
        component: Yd
    }, {
        path: "/gallery/:folder",
        component: Yd
    }, {
        path: "/gallery/carousel/:file",
        component: ip
    }, {
        path: "/whatsapp",
        component: Kp,
        meta: {
            keepAlive: !0
        }
    }, {
        path: "/whatsapp/settings",
        component: _f
    }, {
        path: "/whatsapp/create",
        component: vh
    }, {
        path: "/whatsapp/edit/:group",
        component: Nh
    }, {
        path: "/whatsapp/:contact",
        component: qf
    }, {
        path: "/tor",
        component: dm
    }, {
        path: "/tor/groups",
        component: _m
    }, {
        path: "/tor/store",
        component: Zm
    }, {
        path: "/tor/store/create",
        component: pg
    }, {
        path: "/tor/payments",
        component: kg
    }, {
        path: "/tor/:id",
        component: Mm
    }, {
        path: "/instagram",
        component: Tb
    }, {
        path: "/instagram/login",
        component: Vb
    }, {
        path: "/instagram/register",
        component: zb
    }, {
        path: "/instagram/search",
        component: sv
    }, {
        path: "/instagram/create",
        component: Bg
    }, {
        path: "/instagram/notifications",
        component: fv
    }, {
        path: "/instagram/edit",
        component: yv
    }, {
        path: "/instagram/profiles/:id",
        component: Lv
    }, {
        path: "/instagram/posts/:id",
        component: Xv
    }, {
        path: "/instagram/stories/:id",
        component: bb
    }, {
        path: "/twitter",
        component: bx
    }, {
        path: "/twitter/register",
        component: yx
    }, {
        path: "/twitter/create",
        component: Tx
    }, {
        path: "/twitter/posts/:id",
        component: Dx
    }, {
        path: "/twitter/profiles/:id",
        component: iy
    }, {
        path: "/twitter/settings",
        component: Sy
    }, {
        path: "/bank",
        component: gk
    }, {
        path: "/bank/pix",
        component: Mk
    }, {
        path: "/bank/transfer",
        component: iw
    }, {
        path: "/bank/receipt",
        component: Sw
    }, {
        path: "/bank/statements",
        component: Vw
    }, {
        path: "/bank/invoices",
        component: Yw
    }, {
        path: "/bank/invoices/create",
        component: p_
    }, {
        path: "/bank/fines",
        component: I_
    }, {
        path: "/paypal",
        component: W_
    }, {
        path: "/olx",
        component: IA
    }, {
        path: "/olx/create",
        component: FA
    }, {
        path: "/olx/search",
        component: tS
    }, {
        path: "/olx/dashboard",
        component: DS
    }, {
        path: "/olx/:id",
        component: oS
    }, {
        path: "/tinder",
        component: zS
    }, {
        path: "/tinder/register",
        component: rP
    }, {
        path: "/tinder/likes",
        component: DP
    }, {
        path: "/tinder/chats",
        component: BP
    }, {
        path: "/tinder/chats/:id",
        component: tT
    }, {
        path: "/tinder/profile",
        component: gT
    }, {
        path: "/yellowpages",
        component: MT
    }, {
        path: "/yellowpages/create",
        component: qT
    }, {
        path: "/custom/:id",
        component: LT
    }, {
        path: "/calculator",
        component: JT
    }, {
        path: "/notes",
        component: pE
    }, {
        path: "/notes/create",
        component: _E
    }, {
        path: "/notes/:id",
        component: SE
    }, {
        path: "/minesweeper",
        component: EE
    }, {
        path: "/truco",
        component: GE
    }, {
        path: "/gulper",
        component: XE
    }],
    aR = function(e) {
        const t = ci(e.routes, e);
        let n = e.parseQuery || Ii,
            a = e.stringifyQuery || Oi,
            l = e.history;
        const s = Ni(),
            o = Ni(),
            r = Ni(),
            i = it(Xr, !0);
        let c = Xr;
        _r && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
        const u = Ar.bind(null, (e => "" + e)),
            d = Ar.bind(null, Ri),
            p = Ar.bind(null, Li);

        function f(e, s) {
            if (s = Cr({}, s || i.value), "string" == typeof e) {
                let a = Tr(n, e, s.path),
                    o = t.resolve({
                        path: a.path
                    }, s),
                    r = l.createHref(a.fullPath);
                return Cr(a, o, {
                    params: p(o.params),
                    hash: Li(a.hash),
                    redirectedFrom: void 0,
                    href: r
                })
            }
            let o;
            "path" in e ? o = Cr({}, e, {
                path: Tr(n, e.path, s.path).path
            }) : (o = Cr({}, e, {
                params: d(e.params)
            }), s.params = d(s.params));
            let r = t.resolve(o, s);
            const c = e.hash || "";
            r.params = u(p(r.params));
            const f = function(e, t) {
                let n = t.query ? e(t.query) : "";
                return t.path + (n && "?") + n + (t.hash || "")
            }(a, Cr({}, e, {
                hash: (h = c, Ti(h).replace(Ci, "{").replace(Si, "}").replace(wi, "^")),
                path: r.path
            }));
            var h;
            let m = l.createHref(f);
            return Cr({
                fullPath: f,
                hash: c,
                query: a === Oi ? Di(e.query) : e.query
            }, r, {
                redirectedFrom: void 0,
                href: m
            })
        }

        function h(e) {
            return "string" == typeof e ? Tr(n, e, i.value.path) : Cr({}, e)
        }

        function m(e, t) {
            if (c !== e) return ei(8, {
                from: t,
                to: e
            })
        }

        function g(e) {
            return v(e)
        }

        function b(e) {
            const t = e.matched[e.matched.length - 1];
            if (t && t.redirect) {
                const {
                    redirect: n
                } = t;
                let a = "function" == typeof n ? n(e) : n;
                return "string" == typeof a && (a = a.indexOf("?") > -1 || a.indexOf("#") > -1 ? a = h(a) : {
                    path: a
                }), Cr({
                    query: e.query,
                    hash: e.hash,
                    params: e.params
                }, a)
            }
        }

        function v(e, t) {
            const n = c = f(e),
                l = i.value,
                s = e.state,
                o = e.force,
                r = !0 === e.replace,
                u = b(n);
            if (u) return v(Cr(h(u), {
                state: s,
                force: o,
                replace: r
            }), t || n);
            const d = n;
            let p;
            return d.redirectedFrom = t, !o && function(e, t, n) {
                let a = t.matched.length - 1,
                    l = n.matched.length - 1;
                return a > -1 && a === l && Rr(t.matched[a], n.matched[l]) && Lr(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash
            }(a, l, n) && (p = ei(16, {
                to: d,
                from: l
            }), R(l, l, !0, !1)), (p ? Promise.resolve(p) : y(d, l)).catch((e => ti(e) ? e : T(e))).then((e => {
                if (e) {
                    if (ti(e, 2)) return v(Cr(h(e.to), {
                        state: s,
                        force: o,
                        replace: r
                    }), t || d)
                } else e = w(d, l, !0, r, s);
                return k(d, l, e), e
            }))
        }

        function x(e, t) {
            const n = m(e, t);
            return n ? Promise.reject(n) : Promise.resolve()
        }

        function y(e, t) {
            let n;
            const [a, l, r] = function(e, t) {
                const n = [],
                    a = [],
                    l = [],
                    s = Math.max(t.matched.length, e.matched.length);
                for (let o = 0; o < s; o++) {
                    const s = t.matched[o];
                    s && (e.matched.find((e => Rr(e, s))) ? a.push(s) : n.push(s));
                    const r = e.matched[o];
                    r && (t.matched.find((e => Rr(e, r))) || l.push(r))
                }
                return [n, a, l]
            }(e, t);
            n = $i(a.reverse(), "beforeRouteLeave", e, t);
            for (const s of a) s.leaveGuards.forEach((a => {
                n.push(Mi(a, e, t))
            }));
            const i = x.bind(null, e, t);
            return n.push(i), Gi(n).then((() => {
                n = [];
                for (const a of s.list()) n.push(Mi(a, e, t));
                return n.push(i), Gi(n)
            })).then((() => {
                n = $i(l, "beforeRouteUpdate", e, t);
                for (const a of l) a.updateGuards.forEach((a => {
                    n.push(Mi(a, e, t))
                }));
                return n.push(i), Gi(n)
            })).then((() => {
                n = [];
                for (const a of e.matched)
                    if (a.beforeEnter && t.matched.indexOf(a) < 0)
                        if (Array.isArray(a.beforeEnter))
                            for (const l of a.beforeEnter) n.push(Mi(l, e, t));
                        else n.push(Mi(a.beforeEnter, e, t));
                return n.push(i), Gi(n)
            })).then((() => (e.matched.forEach((e => e.enterCallbacks = {})), n = $i(r, "beforeRouteEnter", e, t), n.push(i), Gi(n)))).then((() => {
                n = [];
                for (const a of o.list()) n.push(Mi(a, e, t));
                return n.push(i), Gi(n)
            })).catch((e => ti(e, 8) ? e : Promise.reject(e)))
        }

        function k(e, t, n) {
            for (const a of r.list()) a(e, t, n)
        }

        function w(e, t, n, a, s) {
            const o = m(e, t);
            if (o) return o;
            const r = t === Xr,
                c = _r ? history.state : {};
            n && (a || r ? l.replace(e.fullPath, Cr({
                scroll: r && c && c.scroll
            }, s)) : l.push(e.fullPath, s)), i.value = e, R(e, t, n, r), E()
        }
        let _;

        function C() {
            _ = l.listen(((e, t, n) => {
                let a = f(e);
                const s = b(a);
                if (s) return void v(Cr(s, {
                    replace: !0
                }), a).catch(Sr);
                c = a;
                const o = i.value;
                var r, u;
                _r && (r = Hr(o.fullPath, n.delta), u = Fr(), Gr.set(r, u)), y(a, o).catch((e => ti(e, 12) ? e : ti(e, 2) ? (v(e.to, a).catch(Sr), Promise.reject()) : (n.delta && l.go(-n.delta, !1), T(e)))).then((e => {
                    (e = e || w(a, o, !1)) && n.delta && l.go(-n.delta, !1), k(a, o, e)
                })).catch(Sr)
            }))
        }
        let A, S = Ni(),
            P = Ni();

        function T(e) {
            return E(e), P.list().forEach((t => t(e))), Promise.reject(e)
        }

        function E(e) {
            A || (A = !0, C(), S.list().forEach((([t, n]) => e ? n(e) : t())), S.reset())
        }

        function R(t, n, a, l) {
            const {
                scrollBehavior: s
            } = e;
            if (!_r || !s) return Promise.resolve();
            let o = !a && function(e) {
                const t = Gr.get(e);
                return Gr.delete(e), t
            }(Hr(t.fullPath, 0)) || (l || !a) && history.state && history.state.scroll || null;
            return Rt().then((() => s(t, n, o))).then((e => e && Br(e))).catch(T)
        }
        const L = e => l.go(e);
        let I;
        const O = new Set;
        return {
            currentRoute: i,
            addRoute: function(e, n) {
                let a, l;
                return Jr(e) ? (a = t.getRecordMatcher(e), l = n) : l = e, t.addRoute(l, a)
            },
            removeRoute: function(e) {
                let n = t.getRecordMatcher(e);
                n && t.removeRoute(n)
            },
            hasRoute: function(e) {
                return !!t.getRecordMatcher(e)
            },
            getRoutes: function() {
                return t.getRoutes().map((e => e.record))
            },
            resolve: f,
            options: e,
            push: g,
            replace: function(e) {
                return g(Cr(h(e), {
                    replace: !0
                }))
            },
            go: L,
            back: () => L(-1),
            forward: () => L(1),
            beforeEach: s.add,
            beforeResolve: o.add,
            afterEach: r.add,
            onError: P.add,
            isReady: function() {
                return A && i.value !== Xr ? Promise.resolve() : new Promise(((e, t) => {
                    S.add([e, t])
                }))
            },
            install(e) {
                e.component("RouterLink", Ui), e.component("RouterView", Hi), e.config.globalProperties.$router = this, Object.defineProperty(e.config.globalProperties, "$route", {
                    get: () => ct(i)
                }), _r && !I && i.value === Xr && (I = !0, g(l.location).catch((e => {})));
                const t = {};
                for (let a in Xr) t[a] = ul((() => i.value[a]));
                e.provide(yr, this), e.provide(kr, Ye(t)), e.provide(wr, i);
                let n = e.unmount;
                O.add(e), e.unmount = function() {
                    O.delete(e), O.size < 1 && (_(), i.value = Xr, I = !1, A = !1), n()
                }
            }
        }
    }({
        history: ((lR = location.host ? lR || location.pathname + location.search : "").indexOf("#") < 0 && (lR += "#"), Kr(lR)),
        routes: nR
    });
var lR;
aR.afterEach((e => lo.pusher.emit("Route:afterEach", e)));
const sR = () => aR.currentRoute.value.path,
    oR = new Map;
oR.set("GPS", (({
    location: [e, t]
}) => {
    lo.client.SetNewWaypoint(e, t), lo.addNotification("gps", "GPS", "O destino foi marcado em seu GPS")
})), oR.set("WHATSAPP_MESSAGE", (({
    sender: e,
    group: t,
    content: n,
    image: a,
    location: l
}) => {
    if (e != lo.identity.phone) {
        const s = Fs(e);
        let o = a ? "📷 Foto" : l ? "🌎 Localização" : n;
        o.match(/(http)?s?:?(\/\/[^"']*\.(?:webm|ogg))/) ? o = "🔊 Áudio" : o.length > 40 && (o = o.substr(0, 40) + "..."), t && sR() != `/whatsapp/group${t.id}` ? lo.addNotification("whatsapp", t.name, `<b>${s}:</b> ${o}`) : t || sR() == `/whatsapp/${e}` || lo.addNotification("whatsapp", s, o)
    }
})), oR.set("WHATSAPP_GROUP_KICK", (({
    name: e
}) => lo.addNotification("whatsapp", e, "Você foi removido do grupo"))), oR.set("WHATSAPP_GROUP_DESTROY", (({
    name: e
}) => lo.addNotification("whatsapp", e, "O grupo foi excluído"))), oR.set("INSTAGRAM_NOTIFY", (e => lo.addNotification("instagram", Js("instagram"), js(e)))), oR.set("PAYPAL", (({
    sender: e,
    value: t
}) => {
    const n = Fs(e);
    lo.addNotification("paypal", "PayPal", `<b class="text-black">${n}</b> transferiu <b class="text-black">${Vs(t)}</b> para sua conta`)
})), oR.set("BANK", (({
    sender: e,
    value: t
}) => {
    const n = Fs(e);
    lo.addNotification("bank", Js("bank"), `<b class="text-black">${n}</b> transferiu <b class="text-black">${Vs(t)}</b> para sua conta`)
})), oR.set("BANK_NOTIFY", (({
    title: e,
    subtitle: t
}) => lo.addNotification("bank", e, t))), oR.set("BANK_INVOICE", (({
    value: e
}) => lo.addNotification("bank", "Fatura recebida", `Você recebeu uma fatura no valor de ${Vs(e)}`))), oR.set("BANK_INVOICE_RECEIPT", (({
    value: e,
    name: t
}) => lo.addNotification("bank", `${t} pagou uma fatura`, `Foram creditados ${Vs(e)} em sua conta`))), oR.set("TINDER_MESSAGE", (({
    sender: e,
    sender_name: t,
    content: n,
    sender_uid: a
}) => {
    a != lo.identity.user_id && sR() != `/tinder/chats/${e}` && lo.addNotification("tinder", t, n)
})), oR.set("TINDER_MATCH", (({
    profile: {
        name: e
    }
}) => lo.addNotification("tinder", "Match!", `Você agora tem um match com ${e}! <i class="fas fa-heart text-red-500"></i>`))), oR.set("TWITTER_NOTIFY", (e => {
    let [t, n] = Array.isArray(e) ? e : [null, e];
    lo.addNotification("twitter", null != t ? t : Js("twitter"), n)
})), oR.set("TOR_NOTIFY", (e => {
    let [t, n] = Array.isArray(e) ? e : [null, e];
    lo.addNotification("tor", null != t ? t : Js("tor"), n)
})), oR.set("TOR_MESSAGE", (e => {
    const t = e.channel.startsWith("dm:");
    if ("geral" != e.channel && e.sender != um.id && sR() !== "/tor/" + (t ? e.sender : e.channel)) {
        const n = e.location ? "🌎 Localização" : e.image ? "📷 Foto" : e.content;
        lo.addNotification("tor", t ? um.getNickname(e.sender) : "#" + e.channel, n)
    }
})), oR.set("CUSTOM_NOTIFY", (({
    app: e,
    title: t,
    subtitle: n
}) => {
    lo.addNotification(e, t, n)
})), oR.set("SMS", (e => {
    const {
        sender: t,
        content: n,
        image: a,
        location: l
    } = e;
    if (null != e.created_at || (e.created_at = Math.floor(Date.now() / 1e3)), t in lo.messages ? lo.messages[t].push(e) > 100 && lo.messages[t].shift() : lo.messages[t] = [e], lo.hasNotificationFor("sms") && sR() != "/sms/" + t) {
        let e = n.substr(0, 40);
        n.length > 40 && (e += "..."), lo.addNotification("sms", Fs(t), a ? "📷 Foto" : l ? "🌎 Localização" : e)
    }
}));
for (let [BR, HR] of oR.entries()) lo.pusher.on(BR, (e => {
    const t = BR.split("_")[0].toLowerCase();
    (lo.hasNotificationFor(t) || "sms" === t) && HR(e)
}));
lo.localhost || lo.client.eval("\nAddEventHandler('onResourceStop', function (name)\nif name == GetCurrentResourceName() and IsNuiOpen then\n    SetNuiFocus(false)\n  end\nend)\n\nfunction src.exports(script, method, ...)\n  local o = exports[script]\n  o[method](o, ...)\nend\n\nfunction src.takePhoto(onlySelfie)\n  return TakePhotoAndUpload(onlySelfie)\nend\n\nfunction src.getLocation()\n  local c = GetEntityCoords(PlayerPedId())\n  return {c.x,c.y,c.z}\nend\n\nfunction src.setInput(b)\n  SetNuiFocusKeepInput(b)\nend\n\nsrc.SetNewWaypoint = SetNewWaypoint\n\nfunction src.getClock()\n  local hours = GetClockHours()\n  local minutes = GetClockMinutes()\n  if hours < 10 then hours = '0'..hours end\n  if minutes < 10 then minutes = '0'..minutes end\n  \n  return { hours=hours, minutes=minutes }\nend\n\nfunction src.isAlive()\n  return GetEntityHealth(PlayerPedId()) > (MinimumHealth or 101)\nend\n\nfunction src.setState(key, value)\n  LocalPlayer.state[key] = value\nend\n\nCitizen.CreateThread(function()\n  while true do\n    TriggerNuiEvent('pusher', 'TIME', src.getClock())\n    Wait(1000)\n  end\nend)\n\nfunction TriggerNuiEvent(event, ...)\n  local args = {...}\n  SendNUIMessage({ event=event,args=args })\nend\n\nRegisterNetEvent('smartphone:pusher')\nAddEventHandler('smartphone:pusher', function(type, subject)\n  TriggerNuiEvent('pusher', type, subject)\nend)\n\nRegisterCommand('+smartphone-fix', function()\n  SetNuiFocus(IsNuiOpen, IsNuiOpen)\nend)\n\nfunction forceOpen()\n  if not IsNuiOpen then\n    if (GetEntityHealth(PlayerPedId()) > (MinimumHealth or 101) or CanUseDead) and not LocalPlayer.state.disablePhone then\n      requestToBackend('checkPhone', {}, function(res)\n        if res then\n          src.open()\n        else\n          NoPhoneCallback()\n        end\n      end)\n    end\n  else\n    SetNuiFocus(true, true)\n  end\nend\n\nexports('forceOpen', forceOpen)\nexports('closeSmartphone', function()\n  TriggerNuiEvent('close')\nend)\n\nRegisterCommand('bindSmartphone', function()\n  if (not PhoneKey or PhoneKey == 'k') and not IsControlJustPressed(0, 311) then return end\n  if IsControlPressed(0, 176) or IsControlPressed(0, 25) then return end\n\n  forceOpen()\nend)\n\nRegisterKeyMapping('bindSmartphone', 'Open the smartphone', 'keyboard', _G.PhoneKey or 'k')\n\nDisabledKeys = { 24, 25, 140, 199 }\n\nCitizen.CreateThread(function()\n  while true do\n    local idle = 0\n\n    if IsNuiOpen then\n\t\t\tSetCurrentPedWeapon(PlayerPedId(), GetHashKey(\"WEAPON_UNARMED\"), true)\n      for k,v in pairs(DisabledKeys) do\n        DisableControlAction(0, v, true)\n      end\n\n      local ped = PlayerPedId()\n\n      if not CanUseDead and (GetEntityHealth(ped) <= (MinimumHealth or 101) or IsPedRagdoll(ped)) then\n        src.close()\n        TriggerNuiEvent('pusher', 'SET_VISIBLE', false)\n        TriggerNuiEvent('pusher', 'FORCE_LEAVE_CALL', true)\n        deletePhone(true)\n      end\n    else idle = 1000 end\n\n    Wait(idle)\n  end\nend)\n\nif not NoPhoneCallback then\n  _G.NoPhoneCallback = function()\n    TriggerEvent('Notify', 'negado', 'Você não possuí um <b>Celular</b>', 5000)\n  end\nend\n\nRegisterNUICallback('keydown', function(data, cb)\n  TriggerNuiEvent('pusher', 'keydown', data.key or data)\n  cb('ok')\nend)\n\nRegisterNUICallback('setDark', function(data, cb)\n  TriggerNuiEvent('pusher', 'setDark', data)\n  cb('ok')\nend)\n\nRegisterNUICallback('prompt', function(data, cb)\n  TriggerNuiEvent('pusher', 'prompt', data)\n  src.fPrompt = cb\nend)\n\nRegisterNUICallback('confirm', function(data, cb)\n  TriggerNuiEvent('pusher', 'confirm', data)\n  src.fConfirm = cb\nend)\n\nRegisterNUICallback('alert', function(data, cb)\n  TriggerNuiEvent('pusher', 'alert', data)\n  cb('ok')\nend)\n\nfunction createSMS(sender, content, attachments)\n  local atype = type(attachments)\n  TriggerNuiEvent('pusher', 'SMS', {\n    sender = sender,\n    content = content,\n    image = (atype == 'string') and attachments or nil,\n    location = (atype == 'table') and attachments or nil\n  })\nend\n\nexports('createSMS', createSMS)\nRegisterNetEvent('smartphone:createSMS')\nAddEventHandler('smartphone:createSMS', createSMS)\n\nRegisterNetEvent('smartphone:exports')\nAddEventHandler('smartphone:exports', function(script, method, ...)\n  local e = exports[script]\n  e[method](e, ...)\nend)\n"), lo.localhost || lo.client.eval("\nfunction CellFrontCamActivate(activate)\n  return Citizen.InvokeNative(0x2491A93618B7D838, activate)\nend\n\nScreenshotCallback = nil\n\nRegisterNUICallback('screenshot', function(data, cb)\n  if ScreenshotCallback then\n    ScreenshotCallback()\n    ScreenshotCallback = nil\n  end\n  cb({})\nend)\n\nBlockCameraKeys = false\n\nfunction TakePhotoAndUpload(onlySelfie)\n  local selfie = not not onlySelfie\n\n  if _G.Summerz then executeVRP('removeObjects') end\n\n  ClearPedSecondaryTask(PlayerPedId())\n  ClearPedTasks(PlayerPedId())\n\n  CreateMobilePhone(1)\n  CellCamActivate(true, true)\n\n  isUsingCamera = true\n\n  if selfie then\n    CellFrontCamActivate(true)\n  end\n\n  Wait(500)\n\n  local p = promise.new()\n\n  Citizen.CreateThread(function()\n    local click = false\n\n    while true do\n      DisplayRadar(false)\n      if IsControlJustReleased(0, 27) and not onlySelfie then\n        selfie = not selfie\n        CellFrontCamActivate(selfie)\n        Wait(500)\n      elseif IsControlJustReleased(0, 177) then\n        p:resolve(false)\n        break\n      elseif IsControlJustReleased(0, 176) or IsControlJustReleased(0, 38) or IsControlJustReleased(0, 201) then\n        TriggerNuiEvent('pusher', 'CONFIRM_SCREENSHOT')\n        ScreenshotCallback = function()\n          p:resolve(true)\n        end\n        break\n      end\n      Wait(0)\n    end\n  end)\n\n  p:next(function(b)\n    DestroyMobilePhone()\n    CellCamActivate(false, false)\n    isUsingCamera = false\n    if _G.Summerz then PhonePlayText() end\n    return b\n  end)\n\n  return Citizen.Await(p)\nend"), !lo.localhost && lo.client.eval("\n\nInVideoCall = false\nVC_FirstPerson = true\nVC_Camera = false\n\nfunction DESTROY_VC_CAMERA()\n  if VC_Camera then\n    DestroyMobilePhone()\n    CellCamActivate(false, false)\n    VC_Camera = false\n  end\nend\n\nfunction SetInVideoCall(bool)\n  if bool ~= InVideoCall then\n    InVideoCall = bool\n    if not bool then\n      VC_FirstPerson = true\n      SetFollowPedCamViewMode(1)\n    else\n      CreateThread(function()\n        while InVideoCall do\n          DisableControlAction(0, 0, true)\n          if IsControlJustPressed(1, 27) or (IsPedInAnyVehicle(PlayerPedId()) and not VC_FirstPerson) then\n            VC_FirstPerson = not VC_FirstPerson\n      \n            if VC_FirstPerson then\n              DESTROY_VC_CAMERA()\n            elseif not VC_Camera then\n              VC_Camera = true\n              CreateMobilePhone(1)\n              CellCamActivate(true, true)\n              CellFrontCamActivate(true)\n            end\n          elseif VC_FirstPerson then\n            SetFollowPedCamViewMode(4)\n            SetFollowVehicleCamViewMode(4)\n          end\n          Wait(0)\n        end\n        DESTROY_VC_CAMERA()\n      end)\n    end\n  end\nend\n\nsrc.SetInVideoCall = SetInVideoCall\n"), lo.localhost || lo.client.eval("\nfunction executeVRP(name, ...)\n\tTriggerEvent('vRP:proxy', name, {...}, 'smartphone', -1)\nend\n\n_G.MinimumHealth = _G.MinimumHealth or 101\n\nlocal phoneProp = nil\nlocal phoneModel = \"prop_amb_phone\"\nlocal currentStatus = \"out\"\nlocal lastDict = nil\nlocal lastAnim = nil\nlocal lastIsFreeze = false\nlocal animName = nil\nisUsingCamera = false\n\nlocal ANIMS = {\n\t['cellphone@'] = {\n\t\t['out'] = {\n\t\t\t['text'] = 'cellphone_text_in',\n\t\t\t['call'] = 'cellphone_call_listen_base',\n\t\t},\n\t\t['text'] = {\n\t\t\t['out'] = 'cellphone_text_out',\n\t\t\t['text'] = 'cellphone_text_in',\n\t\t\t['call'] = 'cellphone_text_to_call',\n\t\t},\n\t\t['call'] = {\n\t\t\t['out'] = 'cellphone_call_out',\n\t\t\t['text'] = 'cellphone_call_to_text',\n\t\t\t['call'] = 'cellphone_text_to_call',\n\t\t}\n\t},\n\t['anim@cellphone@in_car@ps'] = {\n\t\t['out'] = {\n\t\t\t['text'] = 'cellphone_text_in',\n\t\t\t['call'] = 'cellphone_call_in',\n\t\t},\n\t\t['text'] = {\n\t\t\t['out'] = 'cellphone_text_out',\n\t\t\t['text'] = 'cellphone_text_in',\n\t\t\t['call'] = 'cellphone_text_to_call',\n\t\t},\n\t\t['call'] = {\n\t\t\t['out'] = 'cellphone_horizontal_exit',\n\t\t\t['text'] = 'cellphone_call_to_text',\n\t\t\t['call'] = 'cellphone_text_to_call',\n\t\t}\n\t}\n}\n\nfunction newPhoneProp()\n\tdeletePhone()\n\tif _G.DisableProp then\n\t\tphoneProp = 0\n\t\treturn\n\tend\n\n\tlocal mhash = GetHashKey(phoneModel)\n\n\tRequestModel(mhash)\n\twhile not HasModelLoaded(mhash) do\n\t\tRequestModel(mhash)\n\t\tCitizen.Wait(10)\n\tend\n\n\tlocal coords = GetOffsetFromEntityInWorldCoords(PlayerPedId(),0.0,0.0,-5.0)\n\tphoneProp = CreateObject(mhash,coords.x,coords.y,coords.z,true,true,false)\n\tAttachEntityToEntity(phoneProp,PlayerPedId(),GetPedBoneIndex(PlayerPedId(),28422),0.0,0.0,0.0,0.0,0.0,0.0,false,false,false,false,2,true)\n\t\n\tSetEntityAsMissionEntity(phoneProp,true,true)\n\tSetEntityAsNoLongerNeeded(phoneProp)\n\tSetModelAsNoLongerNeeded(mhash)\nend\n\n\nCitizen.CreateThread(function()\n\tif _G.Summerz then return end\n\twhile true do\n\t\tlocal ped = PlayerPedId()\n\t\tif GetEntityHealth(ped) > (MinimumHealth or 101) and not isUsingCamera and not InVideoCall and not IsEntityPlayingAnim(ped,\"cellphone@\",animName,3) and phoneProp then\n\t\t\tTaskPlayAnim(ped,\"cellphone@\",animName,3.0,3.0,-1,50,0,0,0,0)\n\t\tend\n\t\tCitizen.Wait(500)\n\tend\nend)\n\nfunction deletePhone(reset)\n\tif reset then currentStatus = 'out' end\n\tif _G.DisableProp then\n\t\tphoneProp = nil\n\t\treturn\n\tend\n\tTriggerEvent(\"binoculos\",false)\n\tif DoesEntityExist(phoneProp) then\n\t\tTriggerServerEvent(\"smartphone:delete_prop\", ObjToNet(phoneProp))\n\t\tphoneProp = nil\n\tend\n\tif IsPedInAnyVehicle(PlayerPedId()) then\n\t\tClearPedSecondaryTask(PlayerPedId())\n\t\tClearPedTasks(PlayerPedId())\n\tend\nend\n\nfunction loadAnimDict(dict)\n\tRequestAnimDict(dict)\n\twhile not HasAnimDictLoaded(dict) do\n\t\tCitizen.Wait(10)\n\tend\nend\n\nfunction PhonePlayAnim(status,freeze,force)\n\tif GetEntityHealth(PlayerPedId()) <= MinimumHealth then\n\t\treturn\n\tend\n\tif _G.Summerz then\n\t\tif status == 'out' then\n\t\t\texecuteVRP('removeObjects', 'one')\n\t\telse\n\t\t\tlocal anim = 'cellphone_text_in'\n\t\t\tif status == 'call' then\n\t\t\t\tanim = 'cellphone_text_to_call'\n\t\t\tend\n\t\t\texecuteVRP(\"removeObjects\", \"one\")\n\t\t\texecuteVRP(\"createObjects\", \"cellphone@\", anim, \"prop_npc_phone_02\", 50, 28422)\n\t\t\tSetCurrentPedWeapon(PlayerPedId(), GetHashKey(\"WEAPON_UNARMED\"), true)\n\t\tend\n\t\tcurrentStatus = status\n\t\treturn\n\tend\n\n\tif currentStatus == status and force ~= true then\n\t\treturn\n\tend\n\n\tlocal freeze = freeze or false\n\n\tlocal dict = \"cellphone@\"\n\tif IsPedInAnyVehicle(PlayerPedId(), false) then\n\t\tdict = \"anim@cellphone@in_car@ps\"\n\tend\n\tloadAnimDict(dict)\n\n\tlocal anim = ANIMS[dict][currentStatus][status]\n\tif currentStatus ~= 'out' then\n\t\tStopAnimTask(PlayerPedId(), lastDict, lastAnim, 1.0)\n\tend\n\n\tlocal flag = freeze and 14 or 50\n\tanimName = anim\n\tTaskPlayAnim(PlayerPedId(), dict, anim, 3.0, 3.0, -1, flag, 0, false, false, false)\n\n\tif status ~= 'out' and currentStatus == 'out' then\n\t\tWait(380)\n\t\tnewPhoneProp()\n\t\tSetCurrentPedWeapon(PlayerPedId(), GetHashKey(\"WEAPON_UNARMED\"), true)\n\tend\n\n\tlastDict = dict\n\tlastAnim = anim\n\tlastIsFreeze = freeze\n\tcurrentStatus = status\n\n\tif status == 'out' then\n\t\tTriggerEvent(\"status:celular\",false)\n\t\tWait(400)\n\t\tdeletePhone()\n\t\tClearPedTasks(PlayerPedId())\n\t\tClearPedSecondaryTask(PlayerPedId())\n\telse\n\t\tTriggerEvent(\"status:celular\",true)\n\tend\nend\n\nRegisterNetEvent('smartphone:delete_prop')\nAddEventHandler('smartphone:delete_prop', function (netId)\n\tif NetworkDoesNetworkIdExist(netId) then\n\t\tlocal v = NetToEnt(netId)\n\t\tif DoesEntityExist(v) then\n\t\t\tSetEntityAsMissionEntity(v,false,false)\n\t\t\tDeleteEntity(v)\n\t\tend\n\tend\nend)\n\nfunction PhonePlayOut()\n\tPhonePlayAnim('out')\nend\n\nfunction PhonePlayText()\n\tPhonePlayAnim('text')\nend\nPhonePlayIn = PhonePlayText\n\nfunction PhonePlayCall()\n\tPhonePlayAnim('call')\nend\n\nsrc.PhonePlayOut = PhonePlayOut\nsrc.PhonePlayIn = PhonePlayText\nsrc.PhonePlayText = PhonePlayText\nsrc.PhonePlayCall = PhonePlayCall\n\nAddEventHandler('onResourceStop', function (name)\n  if name == GetCurrentResourceName() then\n\t\tif phoneProp then\n\t\t\tTriggerEvent(\"smartphone:delete_prop\", ObjToNet(phoneProp))\n\t\t\tdeletePhone()\n\t\t\tClearPedTasks(PlayerPedId())\n\t\tend\n  end\nend)\n");
setTimeout((() => {
    lo.client.eval("src.eval = function() end")
}), 1e4);
const rR = {
        components: {
            Alert: so,
            Confirm: ho,
            Prompt: wo,
            Menu: Oo,
            PhotoEditor: Wo,
            VideoRecorder: sr
        },
        setup() {
            const e = qi(),
                t = ot(!0),
                {
                    visible: n,
                    notifications: a,
                    currentCall: l,
                    identity: s
                } = lo,
                o = ot(),
                r = ot(),
                i = ot(),
                c = ot(),
                u = qo(),
                d = ul((() => lo.settings.case || "iphonex")),
                p = ul((() => lo.settings.isAndroid)),
                f = ul((() => lo.clock.value.hours + ":" + lo.clock.value.minutes)),
                h = ul((() => {
                    var e;
                    return null != (e = lo.settings.notificationsBottom) ? e : "18.5vh"
                })),
                m = ot(),
                g = ot();
            let b = 0;
            if (lo.localhost) {
                n.value = !0;
                const e = document.querySelector("body");
                e.style.backgroundColor = "blue", e.style.backgroundSize = "100vw 100vh"
            }
            const v = e => (t, n = 255) => new Promise((a => {
                e.value = {
                    title: t,
                    max: n,
                    callback: function(t) {
                        a(t), e.value = null
                    }
                }
            }));
            Va("videoCamera", (() => new Promise(((e, t) => {
                g.value = [e, t]
            })).finally((() => g.value = null)))), Va("alert", lo.alert = e => o.value = e), Va("prompt", lo.prompt = v(i)), Va("confirm", lo.confirm = v(r)), Va("setDark", (e => t.value = null != e ? e : lo.darkTheme.value)), lo.fetchSettings(), lo.localhost && lo.created();
            const x = ot(!1);
            Sn(x, (e => lo.client.setInput(e)));
            const y = {
                open() {
                    var e;
                    b = Date.now() + 500, n.value = !0, (null == (e = l.value) ? void 0 : e.accepted) || lo.client.PhonePlayIn(), lo.client.setState("usingPhone", !0)
                },
                close() {
                    var t;
                    ["/call", "/"].includes(e.currentRoute.value.path) || e.push("/home"), [o, i, c, r, g].forEach((e => e.value = null)), n.value = !1, lo.client.close(), x.value = !1, !(null == (t = l.value) ? void 0 : t.accepted) && lo.client.PhonePlayOut(), lo.client.setState("usingPhone", !1)
                },
                pusher(e, t) {
                    lo.pusher.emit(e, t)
                }
            };

            function k(t) {
                if (b > Date.now() || "Escape" != t && "Backspace" != t) return;
                if (m.value) return m.value = null;
                let n = "Escape" == t;
                Io().state.request.value = null;
                const a = e.currentRoute.value.path;
                if ("Backspace" === t && !document.querySelector("input:focus,textarea:focus"))
                    if ("/home" == a) n = !0;
                    else if (g.value) g.value = null;
                else if ("/call" != a && "/" != a) return [o, r, i].forEach((e => e.value = null)), e.back();
                n && y.close()
            }
            return lo.pusher.on("REDIRECT", (t => {
                lo.visible.value || lo.client.open(), "/home" != e.currentRoute.value.path && e.replace("/home"), e.push(t)
            })), lo.pusher.on("CALL_REQUEST", (async t => {
                lo.storage.doNotDisturb.value || await lo.client.isAlive() && (t.contact = lo.contacts.value.find((e => e.phone == t.initiator.phone)) || {
                    name: t.initiator.phone,
                    phone: t.initiator.phone
                }, l.value = t, n.value || lo.addNotification(t.isVideo ? "facetime" : "phone", t.isVideo ? "Chamada de Vídeo" : "Chamada de Voz", (t.isAnonymous ? "Anônimo" : t.contact.name) + " está te ligando"), e.push("/call"))
            })), lo.pusher.on("CALL_TO", ((t, n = !1) => {
                if (t == lo.identity.phone) return o.value = "Você não pode ligar para si mesmo";
                const a = lo.storage.anonymousCall.value;
                lo.backend.createPhoneCall(t, n, a).then((n => {
                    n.error ? o.value = n.error : (n.contact = {
                        name: Fs(t),
                        phone: t
                    }, n.owner = !0, l.value = n, e.push("/call"), lo.visible.value || lo.client.open())
                }))
            })), lo.pusher.on("SET_VISIBLE", (e => n.value = e)), lo.pusher.on("REFRESH", (() => {
                e.replace("/"), lo.identity.phone = null, lo.fetchSettings(), lo.backend.ig_logout()
            })), lo.pusher.on("SERVICE_RESPONSE", (() => o.value = "Seu chamado foi atendido")), lo.pusher.on("SERVICE_REJECT", (() => o.value = "Seu chamado foi rejeitado")), lo.pusher.on("PHONE_CHANGE", (({
                from: e,
                to: t
            }) => {
                var n;
                lo.contacts.value.forEach((n => {
                    n.phone == e && (n.phone = t)
                })), (null == (n = lo.identity) ? void 0 : n.phone) == e && (lo.identity.phone = t)
            })), globalThis.pusher = lo.pusher, lo.localhost && (globalThis.store = lo), Va("useImageFocus", (e => m.value = e)), Va("setKeepInput", (e => x.value = e)), lo.captureMicrophone(), window.addEventListener("message", (({
                data: {
                    event: e,
                    args: t
                }
            }) => {
                var n;
                null == (n = y[e]) || n.call(y, ...t)
            })), window.addEventListener("contextmenu", (() => {
                x.value = !x.value
            })), window.addEventListener("keydown", (({
                key: e
            }) => k(e))), lo.pusher.on("keydown", k), lo.pusher.on("setDark", (e => t.value = e)), lo.pusher.on("prompt", (e => v(i)(e).then((e => lo.client.fPrompt(e))))), lo.pusher.on("confirm", (e => v(r)(e).then((e => lo.client.fConfirm(e))))), lo.pusher.on("alert", (e => o.value = e)), {
                visible: n,
                android: p,
                clock: f,
                alert: o,
                confirm: r,
                prompt: i,
                dark: t,
                menu: c,
                paint: u,
                notifications: a,
                call: l,
                identity: s,
                phonecase: d,
                imageFocused: m,
                notificationsBottom: h,
                recording: g
            }
        }
    },
    iR = ln("data-v-e4786f9a");
nn("data-v-e4786f9a");
const cR = {
        key: 0,
        class: "notification select-none"
    },
    uR = {
        class: "flex flex-col ml-3"
    },
    dR = Ea("h1", null, "Chamada em andamento", -1),
    pR = {
        key: 0
    },
    fR = {
        key: 1
    },
    hR = {
        class: "flex flex-col ml-3"
    },
    mR = {
        key: 0,
        class: "fixed z-50 w-screen h-screen flex flex-col flex-center select-none",
        style: {
            background: "rgba(0,0,0,0.8)"
        }
    },
    gR = {
        class: "relative"
    },
    bR = {
        class: "bg-gray-900 h-16 rounded-t-3xl"
    },
    vR = Ea("i", {
        class: "fas fa-times text-white text-3xl"
    }, null, -1),
    xR = {
        class: "marvel-device iphone-x"
    },
    yR = {
        class: "screen"
    },
    kR = {
        class: "absolute left-8 z-10"
    },
    wR = {
        class: "font-bold text-xl"
    },
    _R = {
        key: 0,
        class: "relative left-1.5 bottom-0 far fa-location-arrow text-sm"
    },
    CR = {
        class: "absolute right-8 top-5 z-10 flex items-center text-lg"
    },
    AR = Ea("i", {
        class: "fas fa-signal-alt pr-2"
    }, null, -1),
    SR = Ea("i", {
        class: "fas fa-wifi pr-2"
    }, null, -1),
    PR = {
        key: 0,
        class: "far fa-battery-full pr-2"
    };
an();
const TR = iR(((e, t, n, a, l, s) => {
    const o = ua("Alert"),
        r = ua("Prompt"),
        i = ua("Confirm"),
        c = ua("Menu"),
        u = ua("PhotoEditor"),
        d = ua("VideoRecorder"),
        p = ua("router-view");
    return ka(), _a(ma, null, [Ea(Kl, {
        tag: "ul",
        "enter-from-class": "opacity-0 transform translate-y-16",
        "enter-to-class": "opacity-100",
        "leave-from-class": "opacity-100",
        "leave-to-class": "opacity-0 transform translate-x-96",
        "enter-active-class": "transition duration-1000",
        "leave-active-class": "transition duration-1000",
        class: "notifications",
        style: {
            right: a.visible ? "49rem" : "5rem",
            bottom: a.visible ? "6.5rem" : a.notificationsBottom
        }
    }, {
        default: iR((() => {
            var t, n, l;
            return [a.call && a.call.accepted && !a.visible ? (ka(), _a("li", cR, [Ea("img", {
                src: e.$asset("/apps/phone.png"),
                class: "w-8 rounded-xl"
            }, null, 8, ["src"]), Ea("div", uR, [dR, a.call.isAnonymous ? (ka(), _a("span", pR, "Anônimo")) : (ka(), _a("span", fR, g(e.$filters.getNameByPhone((null == (t = a.call.initiator) ? void 0 : t.phone) == a.identity.phone ? null == (n = a.call.target) ? void 0 : n.phone : null == (l = a.call.initiator) ? void 0 : l.phone)), 1))])])) : Oa("", !0), (ka(!0), _a(ma, null, pl(a.notifications, (e => (ka(), _a("li", {
                class: "notification select-none",
                key: e.id
            }, [Ea("img", {
                src: e.icon,
                class: "w-8 rounded-xl"
            }, null, 8, ["src"]), Ea("div", hR, [Ea("h1", null, g(e.title), 1), Ea("span", {
                innerHTML: e.subtitle
            }, null, 8, ["innerHTML"])])])))), 128))]
        })),
        _: 1
    }, 8, ["style"]), a.imageFocused ? (ka(), _a("div", mR, [Ea("div", gR, [Ea("div", bR, [Ea("button", {
        onClick: t[1] || (t[1] = e => a.imageFocused = null),
        class: "block ml-auto p-3 mr-2"
    }, [vR])]), Ea("img", {
        style: {
            "max-height": "80vh",
            "max-width": "50vw"
        },
        src: a.imageFocused
    }, null, 8, ["src"])])])) : Oa("", !0), Yn(Ea("div", xR, [Ea("img", {
        class: "case",
        type: a.phonecase,
        src: e.$asset(`/stock/cases/${a.phonecase}.png`)
    }, null, 8, ["type", "src"]), Ea("div", yR, ["/boot" != e.$route.path ? (ka(), _a("div", {
        key: 0,
        class: {
            "text-white": a.dark, "text-black": !a.dark
        }
    }, [Ea("div", kR, [Ea("span", wR, g(a.clock), 1), a.android ? Oa("", !0) : (ka(), _a("i", _R))]), Ea("div", CR, [AR, SR, a.android ? Oa("", !0) : (ka(), _a("i", PR))])], 2)) : Oa("", !0), a.alert ? (ka(), _a(o, {
        key: 1,
        content: a.alert
    }, null, 8, ["content"])) : Oa("", !0), a.prompt ? (ka(), _a(r, $a({
        key: 2
    }, a.prompt), null, 16)) : Oa("", !0), a.confirm ? (ka(), _a(i, {
        key: 3,
        title: a.confirm.title,
        callback: a.confirm.callback
    }, null, 8, ["title", "callback"])) : Oa("", !0), Ea(Il, {
        name: "menu"
    }, {
        default: iR((() => [Ea(c)])),
        _: 1
    }), a.paint.original ? (ka(), _a(u, {
        key: 4
    })) : Oa("", !0), a.recording ? (ka(), _a(d, {
        key: 5,
        callback: a.recording
    }, null, 8, ["callback"])) : Oa("", !0), Ea(p, {
        key: e.$route.fullPath
    }, {
        default: iR((({
            Component: e
        }) => [(ka(), _a(jn, {
            include: "WhatsApp"
        }, [Yn((ka(), _a(pa(e), null, null, 512)), [
            [us, !a.paint.original && !a.recording]
        ])], 1024))])),
        _: 1
    })])], 512), [
        [us, a.visible]
    ])], 64)
}));
rR.render = TR, rR.__scopeId = "data-v-e4786f9a";
const ER = {
    props: {
        modelValue: {
            required: !0
        },
        type: {
            default: "text"
        },
        noborder: {
            required: !1,
            default: !1
        },
        format: {
            required: !1
        },
        darkable: {
            required: !1
        }
    },
    methods: {
        changeValue({
            target: e
        }) {
            "money" === this.format ? e.value = this.$filters.moneyStringToInt(e.value) : "int" === this.format && (e.value = Math.floor(e.value.replace(/\D/g, ""))), this.$emit("update:modelValue", e.value)
        }
    }
};
ER.render = function(e, t, n, a, l, s) {
    return ka(), _a("input", {
        type: n.type,
        value: n.modelValue,
        onInput: t[1] || (t[1] = (...e) => s.changeValue && s.changeValue(...e)),
        class: ["w-full p-3 py-4", {
            "rounded-lg border focus:border-blue-400": !n.noborder,
            "bg-theme border-theme": n.darkable
        }]
    }, null, 42, ["type", "value"])
};
const RR = {
    props: {
        modelValue: {
            required: !0
        },
        options: {
            default: {}
        },
        darkable: {
            required: !1
        }
    }
};
RR.render = function(e, t, n, a, l, s) {
    return ka(), _a("select", {
        value: n.modelValue,
        onChange: t[1] || (t[1] = t => e.$emit("update:modelValue", t.target.value)),
        class: ["w-full p-3 rounded-lg border focus:border-blue-400", {
            "bg-theme border-theme": n.darkable
        }]
    }, [Ea("option", {
        disabled: "",
        selected: null == n.modelValue,
        value: null
    }, "Escolha uma opção", 8, ["selected"]), (ka(!0), _a(ma, null, pl(n.options, ((e, t) => (ka(), _a("option", {
        key: t,
        value: t,
        selected: n.modelValue == t
    }, g(e), 9, ["value", "selected"])))), 128))], 42, ["value"])
};
const LR = {
        props: {
            modelValue: {
                required: !0
            }
        },
        setup: () => ({
            android: lo.settings.isAndroid
        })
    },
    IR = ln("data-v-e073d7c8");
nn("data-v-e073d7c8");
const OR = Ea("i", null, null, -1);
an();
const DR = IR(((e, t, n, a, l, s) => (ka(), _a("label", {
    class: "form-switch",
    android: a.android
}, [Ea("input", {
    type: "checkbox",
    checked: n.modelValue,
    onInput: t[1] || (t[1] = t => e.$emit("update:modelValue", t.target.checked))
}, null, 40, ["checked"]), OR], 8, ["android"]))));
LR.render = DR, LR.__scopeId = "data-v-e073d7c8";
const NR = {
        props: ["white"],
        setup(e) {
            var t;
            return {
                white: null != (t = lo.darkTheme.value) ? t : e.white
            }
        }
    },
    MR = Ia('<div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div>', 12);
NR.render = function(e, t, n, a, l, s) {
    return ka(), _a("div", {
        class: "loading-spinner",
        style: {
            filter: a.white && "invert(1)"
        }
    }, [MR], 4)
};
const $R = {},
    VR = {
        xmlns: "http://www.w3.org/2000/svg",
        height: "512pt",
        viewBox: "0 0 512 512",
        width: "512pt"
    },
    UR = Ea("path", {
        d: "m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0",
        fill: "#2196f3"
    }, null, -1),
    jR = Ea("path", {
        d: "m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0",
        fill: "#fafafa"
    }, null, -1);
$R.render = function(e, t) {
    return ka(), _a("svg", VR, [UR, jR])
}, globalThis.GameView = jo;
const FR = ((...e) => {
    const t = (fs || (fs = oa(ps))).createApp(...e),
        {
            mount: n
        } = t;
    return t.mount = e => {
        const a = function(e) {
            if (D(e)) {
                return document.querySelector(e)
            }
            return e
        }(e);
        if (!a) return;
        const l = t._component;
        O(l) || l.render || l.template || (l.template = a.innerHTML), a.innerHTML = "";
        const s = n(a);
        return a instanceof Element && (a.removeAttribute("v-cloak"), a.setAttribute("data-v-app", "")), s
    }, t
})(rR);
FR.component("AppInput", ER), FR.component("AppSelect", RR), FR.component("AppToggle", LR), FR.component("AppLoading", NR), FR.component("AppVerified", $R), FR.use(aR), FR.config.globalProperties.$filters = Hs, FR.config.globalProperties.$asset = e => "https://fivem.jesteriruka.dev/" + e, Object.defineProperty(FR.config.globalProperties, "$currency", {
    get: () => lo.settings.currency
}), FR.mount("#root");