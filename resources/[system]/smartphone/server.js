function pusher(b, c, d) {
    if (!b) {
        return;
    }
    if (config.fluent_debug) {
        console.log('Pushing...', c, 'TO', JSON.stringify(b), d);
    }
    emitNet('smartphone:pusher', b, c, d);
}
const unix = () => Math.floor(Date.now() / 1000);

function trimObject(f) {
    for (let h in f) {
        const k = f[h];
        f[h] = typeof k === 'string' ? k.trim() : k;
    }
    return f;
}

function extract(l, ...q) {
    let s = {};
    for (let u of q)
        u in l && (s[u] = l[u]);
    return s;
}

function except(v, ...x) {
    let y = Object.assign({}, v);
    for (let z of x)
        delete y[z];
    return y;
}

function compact(aa) {
    if (Array.isArray(aa)) {
        return aa.map(compact);
    }
    const ab = {};
    for (let [ac, ad] of Object.entries(aa)) {
        if (ad == null) {
            continue;
        }
        if (ac.includes('.')) {
            const [ae, af] = ac.split('.', 2);
            if (typeof ab[ae] !== 'object') {
                ab[ae] = {};
            }
            ab[ae][af] = ad;
        } else {
            ab[ac] = ad;
        }
    }
    return ab;
}

function DatePTBR(ag = Date.now()) {
    const ah = new Date(ag);
    return ah.toLocaleString('pt-BR');
}

function spamBlocker(ai, aj = 'default', ak = 3) {
    const al = spamBlocker.map;
    const am = al.get(aj + ai) || 0;
    al.set(aj + ai, am + 1);
    return am >= ak;
}
spamBlocker.map = new Map();

function hashCode(ap) {
    let aq = 0;
    if (ap.length === 0) {
        return aq;
    }
    for (let ar = 0; ar < ap.length; ar++) {
        aq = (aq << 5) - aq + ap.charCodeAt(ar);
        aq |= 0;
    }
    return aq;
}

function sleep(at) {
    return new Promise(au => setTimeout(au, at));
}

function memoized(av, aw) {
    const ax = {},
        ay = {},
        az = async (...ba) => {
            const bb = hashCode(JSON.stringify(ba));
            if (!ax.hasOwnProperty(bb)) {
                ax[bb] = await av.apply(null, ba);
                ay[bb] = setTimeout(() => delete ax[bb], aw);
            }
            return ax[bb];
        };
    az.modify = (bc, bd) => {
        const bf = hashCode(JSON.stringify(bc));
        if (!ax.hasOwnProperty(bf)) {
            return;
        }
        ax[bf] = bd(ax[bf]);
        if (ay[bf]) {
            clearTimeout(ay[bf]);
        }
        ay[bf] = setTimeout(() => delete ax[bf], aw);
    };
    az.clearKey = bg => {
        delete ax[bg];
        if (ay[bg]) {
            clearTimeout(ay[bg]);
        }
        delete ay[bg];
    };
    az.clear = (...bh) => az.clearKey(hashCode(JSON.stringify(bh)));
    return az;
}

function optional(bi, ...bj) {
    let bk = bi;
    for (let bl of bj) {
        bk = bk && bk[bl];
    }
    return bk;
}
optional.func = (bm, bn, ...bo) => {
    const bp = bm && bm[bn];
    if (typeof bp === 'function') {
        bp.apply(bm, bo);
    }
};
const requestBlocker = new Map();
Array.prototype.unique = function () {
    return this.filter((bq, bs, bt) => bt.indexOf(bq) === bs);
};
Array.prototype.pluck = function (bu) {
    return this.map(bv => bv[bu]);
};
Array.prototype.pluckBy = function (bw, bx) {
    const bz = {};
    for (let ca of this) {
        bz[ca[bx]] = ca[bw];
    }
    return bz;
};
Array.prototype.last = function () {
    return this.length > 0 ? this[this.length - 1] : undefined;
};
Array.prototype.first = function (...cb) {
    return this.find(cc => cb.includes(cc));
};
String.prototype.format = function (cd) {
    return this.replace(/{(\w+)}/g, (ce, cf) => cd[cf]);
};
const config$2 = require('./config.json');

function firstDriver() {
    for (let cg of [
        'oxmysql',
        'ghmattimysql',
        'GHMattiMySQL',
        'haze_mysql',
        'mysql-async'
    ]) {
        if (GetResourceState(cg) === 'started') {
            return cg;
        }
    }
    console.log('Smartphone:: DRIVER DE BANCO DE DADOS INCOMPATÍVEL');
    console.log('Smartphone:: O SCRIPT IRA ASSUMIR QUE VOCE UTILIZA GHMattiMySQL');
    return 'GHMattiMySQL';
}
const QueryInterface = {
    driver: config$2.db_driver || firstDriver(),
    query(ci, cj) {
        let ck = 0;
        const cl = {};
        if (this.driver !== 'haze_mysql') {
            ci = ci.replace(/\?/g, () => {
                ck += 1;
                cl['@' + ck] = cj[ck - 1];
                return '@' + ck;
            });
        }
        if (fluent.debug) {
            console.log(ci, JSON.stringify(cj));
        }
        return new Promise((cm, cn) => {
            switch (this.driver) {
                case 'ghmattimysql':
                    return global.exports.ghmattimysql.execute(ci, cl, cm);
                case 'hydra':
                    return cm(global.exports.vrp.query(ci, cl));
                case 'oxmysql':
                    const co = GetResourceMetadata('oxmysql', 'version', 0);
                    if (co && !co.startsWith('1.')) {
                        return global.exports.oxmysql.query(ci, cl, cm);
                    }
                    return global.exports.oxmysql.execute(ci, cl, cm);
                case 'haze_mysql':
                    return global.exports.haze_mysql.query(ci, cj, cm, cn);
                case 'GHMattiMySQL':
                    return global.exports.GHMattiMySQL.QueryResultAsync(ci, cl, cm);
                case 'mysql-async':
                    const cp = ci.match(/INSERT|REPLACE/i) ? 'mysql_insert' : 'mysql_fetch_all';
                    return global.exports['mysql-async'][cp](ci, cl, cm);
            }
        });
    }
};

function fluent(cq) {
    return new QueryBuilder(cq);
}
fluent.raw = cr => ({
    $raw: true,
    value: cr
});
fluent.getColumns = cs => {
    return QueryInterface.query('SHOW COLUMNS FROM ' + cs, []).then(ct => ct.map(cu => cu.Field));
};
fluent.query = (cv, cw = []) => {
    return QueryInterface.query(cv, cw);
};

function questionMarks(cx) {
    if (Array.isArray(cx)) {
        cx = cx.length;
    }
    return Array(cx).fill('?').join(',');
}
class WhereBuilder {
    constructor() {
        this.wheres = [];
    }
    ['where']() {
        const [cy, cz, dd, df] = arguments;
        if (cy instanceof Function) {
            const dg = new WhereBuilder();
            dg.or = df;
            cy(dg);
            this.wheres.push(dg);
        } else {
            if (cy instanceof Object && !cy.$raw) {
                for (let dh in cy) {
                    this.wheres.push({
                        column: dh,
                        operator: '=',
                        value: cy[dh],
                        or: df
                    });
                }
            } else {
                this.wheres.push({
                    column: cy,
                    operator: dd === undefined ? '=' : cz,
                    value: dd === undefined ? cz : dd,
                    or: !!df
                });
            }
        }
        return this;
    }
    ['whereOr'](...dj) {
        return this.where(dk => dk.orWhere(...dj));
    }
    ['whereIn'](dl, dn, dp = false) {
        if (!dn || dn.length === 0) {
            return this.where(fluent.raw(0), 1);
        }
        return this.where(dl, 'IN', dn, dp);
    }
    ['orWhereIn'](dq, dr) {
        return this.whereIn(dq, dr, true);
    }
    ['whereNotIn'](ds, dt, du = false) {
        if (!dt || dt.length === 0) {
            return this.where(fluent.raw(1), 1);
        }
        return this.where(ds, 'NOT IN', dt, du);
    }
    ['orWhereNotIn'](dv, dw) {
        return this.whereNotIn(dv, dw, true);
    }
    ['whereBetween'](dx, dy, dz) {
        return this.where(dx, '>=', dy).where(dx, '<=', dz);
    }
    ['whereNull'](ea, eb = false) {
        this.wheres.push({
            column: ea,
            operator: 'IS NULL',
            or: eb
        });
        return this;
    }
    ['orWhereNull'](ec) {
        return this.whereNull(ec, true);
    }
    ['whereNotNull'](ed, ee = false) {
        this.wheres.push({
            column: ed,
            operator: 'IS NOT NULL',
            or: ee
        });
        return this;
    }
    ['orWhereNotNull'](ef) {
        return this.whereNotNull(ef, true);
    }
    ['orWhere']() {
        const [eg, eh, ei] = arguments;
        return this.where(eg, ei ? eh : '=', ei || eh, true);
    }
    ['toSql']() {
        let ej = '',
            ek = [];
        for (let el of this.wheres) {
            if (ej) {
                ej += el.or ? 'OR ' : 'AND ';
            }
            if (el instanceof WhereBuilder) {
                const {
                    sql: en,
                    values: eo
                } = el.toSql();
                ej += '(' + en + ') ';
                ek.push(...eo);
            } else {
                ej += escapeColumn(el.column) + ' ' + el.operator + ' ';
                if (el.value != null) {
                    if (Array.isArray(el.value)) {
                        ej += '(' + questionMarks(el.value) + ') ';
                        ek.push(...el.value);
                    } else {
                        ej += '? ';
                        ek.push(el.value);
                    }
                }
            }
        }
        ej = ej.trim();
        return {
            sql: ej,
            values: ek
        };
    }
}

function escapeColumn(ep) {
    if (ep.$raw) {
        return ep.value;
    }
    if (ep !== '*') {
        return '`' + ep + '`';
    }
    return ep;
}
class DeleteBuilder extends WhereBuilder {
    constructor(eq) {
        super();
        this.table = eq;
    }
    ['then'](er) {
        const {
            sql: es,
            values: et
        } = super.toSql();
        let eu = 'DELETE FROM ' + this.table;
        if (es) {
            eu += ' WHERE ' + es;
        }
        QueryInterface.query(eu, et).then(() => er && er());
    }
}
class InsertBuilder {
    constructor(ev) {
        this.table = ev;
    }
    ['insert'](ew) {
        this.data = ew;
        this.name = 'INSERT';
        return this;
    }
    ['returnKeys']() {
        this.$returnKeys = true;
        return this;
    }
    ['replace'](ex) {
        this.data = ex;
        this.name = 'REPLACE';
        return this;
    }
    ['then'](ey) {
        const ez = Object.keys(this.data).map(escapeColumn),
            fa = Object.values(this.data);
        let fb = this.name + ' INTO ' + this.table + ' (' + ez.join(',') + ') VALUES (' + ',?'.repeat(fa.length).substr(1) + ')';
        if (this.$returnKeys && QueryInterface.driver === 'GHMattiMySQL') {
            fb += ';SELECT LAST_INSERT_ID() AS id';
        }
        QueryInterface.query(fb, fa).then(fc => {
            if (ey) {
                ey(fc.insertId || (fc[0] ? fc[0].id : fc));
            }
        });
    }
}
class UpdateBuilder extends WhereBuilder {
    constructor(fd) {
        super();
        this.table = fd;
    }
    ['update'](fe, ff) {
        if (fe) {
            if (ff) {
                this.data[fe] = ff;
            } else {
                this.data = fe;
            }
        }
        return this;
    }
    ['then'](fg) {
        let fh = [];
        const {
            sql: fi,
            values: fj
        } = super.toSql(), fk = Object.entries(this.data).map(([fl, fm]) => {
            if (fm && fm.$raw) {
                return escapeColumn(fl) + ' = ' + fm.value;
            } else {
                fh.push(fm);
            }
            return escapeColumn(fl) + ' = ?';
        });
        let fn = 'UPDATE ' + this.table + ' SET ' + fk.join(',');
        if (fi) {
            fn += ' WHERE ' + fi;
        }
        fh.push(...fj);
        QueryInterface.query(fn, fh).then(fg);
    }
}
class TableColumn {
    constructor(fo) {
        this.type = fo;
        this._default = null;
    }
    ['unique']() {
        this.isUnique = true;
        return this;
    }
    ['increment']() {
        this.isIncrement = true;
        return this;
    }
    ['primary']() {
        this.isPrimary = true;
        return this;
    }
    ['default'](fp) {
        this._default = fp;
        return this;
    }
    ['unsigned']() {
        this.isUnsigned = true;
        return this;
    }
    ['nullable']() {
        this.isNullable = true;
        return this;
    }
    ['toSql'](fq) {
        let fr = '`' + fq + '` ' + this.type + ' ';
        if (this.isUnsigned) {
            fr += 'UNSIGNED ';
        }
        if (this.isUnique) {
            fr += 'UNIQUE ';
        }
        if (this.isIncrement) {
            fr += 'AUTO_INCREMENT ';
        }
        if (this._default != null) {
            fr += 'DEFAULT ' + JSON.stringify(this._default) + ' ';
        }
        if (!this.isNullable) {
            fr += 'NOT NULL ';
        } else {
            if (this._default == null) {
                fr += 'DEFAULT NULL ';
            }
        }
        return fr.trim();
    }
}
class TableBuilder {
    constructor(fs) {
        this.table = fs;
        this.columns = {};
    }
    ['id']() {
        return this.columns.id = new TableColumn('BIGINT').primary().increment();
    }
    ['varchar'](ft, fu = 255) {
        return this.columns[ft] = new TableColumn('VARCHAR(' + fu + ')');
    }
    ['tinyint'](fv) {
        return this.columns[fv] = new TableColumn('TINYINT');
    }
    ['int'](fw) {
        return this.columns[fw] = new TableColumn('INT');
    }
    ['bigint'](fx) {
        return this.columns[fx] = new TableColumn('BIGINT');
    }
    ['toSql']() {
        const fy = Object.entries(this.columns).filter(fz => fz[1].isPrimary).map(ga => escapeColumn(ga[0]));
        const gb = Object.entries(this.columns).map(([gc, gd]) => gd.toSql(gc));
        return 'CREATE TABLE IF NOT EXISTS ' + this.table + '(' + gb.join(', ') + (fy.length ? ', PRIMARY KEY(' + fy.join(',') + ')' : '') + ') DEFAULT CHARSET=utf8mb4';
    }
}
class QueryBuilder extends WhereBuilder {
    constructor(ge) {
        super();
        this.table = ge;
        this.columns = ['*'];
        this.$groupBy = [];
        this.$order = [];
    }
    ['create'](gf) {
        const gg = new TableBuilder(this.table);
        gf(gg);
        return QueryInterface.query(gg.toSql(), []);
    }
    ['createIndex'](...gh) {
        const gi = gh.flat(),
            gj = gi.join('_'),
            gk = 'CREATE INDEX ' + gj + '_index ON ' + this.table + '(' + gi.map(escapeColumn).join(',') + ')';
        return QueryInterface.query(gk, []);
    }
    ['find'](gl) {
        return this.where('id', gl).first();
    }
    ['insert'](gm) {
        const gn = new InsertBuilder(this.table);
        gn.insert(gm);
        return gn;
    }
    ['replace'](go) {
        const gp = new InsertBuilder(this.table);
        gp.replace(go);
        return gp;
    }
    ['update'](gq = {}) {
        const gr = new UpdateBuilder(this.table);
        gr.data = gq;
        gr.wheres = this.wheres;
        return gr;
    }
    ['delete']() {
        const gs = new DeleteBuilder(this.table);
        gs.wheres = this.wheres;
        return gs;
    }
    ['destroy'](gt) {
        return new DeleteBuilder(this.table).where('id', gt);
    }
    ['select']() {
        this.columns = Array.from(arguments).flat().map(escapeColumn);
        return this;
    }
    ['selectAs'](gu) {
        const gv = Object.entries(gu);
        this.columns = gv.map(([gw, gx]) => escapeColumn(gw) + ' AS ' + escapeColumn(gx));
        return this;
    }
    ['selectRaw']() {
        this.columns = Array.from(arguments).flat();
        return this;
    }
    ['groupBy']() {
        this.$groupBy = Array.from(arguments).flat().map(escapeColumn);
        return this;
    }
    ['orderBy'](gy, gz = 'ASC') {
        this.$order.push({
            column: gy,
            order: gz
        });
        return this;
    }
    ['limit'](ha) {
        this.$limit = ha;
        return this;
    }
    ['first']() {
        this.$limit = 1;
        this.$first = true;
        return this;
    }
    ['exists']() {
        this.columns = ['COUNT(*) as qtd'];
        return new Promise(hb => {
            this.then(hc => hb(optional(hc, '0', 'qtd') > 0));
        });
    }
    ['sum'](hd) {
        this.columns = ['SUM(' + escapeColumn(hd) + ') as total'];
        return new Promise(he => {
            this.then(hf => he(hf && hf[0].total || 0));
        });
    }
    ['count'](hg = '*') {
        this.columns = ['COUNT(' + escapeColumn(hg) + ') as total'];
        return new Promise(hh => {
            this.then(hi => hh(hi && hi[0].total || 0));
        });
    }
    ['pluck'](hj, hk) {
        if (hk) {
            return this.pluckBy(hj, hk);
        }
        if (this.columns[0] == '*') {
            this.select(hj);
        }
        return new Promise(hl => {
            this.then(hm => {
                if (Array.isArray(hm)) {
                    hl(hm.map(hn => hn[hj]));
                } else {
                    hl(hm ? hm[hj] : null);
                }
            });
        });
    }
    ['pluckBy'](ho, hp) {
        if (this.columns[0] == '*') {
            this.select([
                ho,
                hp
            ]);
        }
        return new Promise(hq => {
            this.then(hr => {
                const hs = {};
                for (let ht of [hr].flat()) {
                    hs[ht[hp]] = ht[ho];
                }
                hq(hs);
            });
        });
    }
    ['then'](hu) {
        const {
            sql: hv,
            values: hw
        } = super.toSql();
        let hx = 'SELECT ' + this.columns.join(',') + ' FROM ' + this.table;
        if (hv) {
            hx += ' WHERE ' + hv;
        }
        if (this.$groupBy.length) {
            hx += ' GROUP BY ' + this.$groupBy.join(',');
        }
        if (this.$order.length) {
            const hy = this.$order.map(({
                column: hz,
                order: ia
            }) => escapeColumn(hz) + ' ' + ia);
            hx += ' ORDER BY ' + hy.join(',');
        }
        if (this.$limit) {
            hx += ' LIMIT ' + this.$limit;
        }
        QueryInterface.query(hx, hw).then(ib => {
            if (hu) {
                hu(this.$first ? ib && ib[0] : ib);
            }
        });
    }
}
class Spread {
    constructor(...ic) {
        this.args = ic;
    }
}

function getReturnValueAsArray(ie) {
    if (ie instanceof Spread) {
        return ie.args;
    } else {
        if (ie == null) {
            return [];
        } else {
            return [ie];
        }
    }
}
const VProxy = {
    getInterface(ig) {
        const ih = {};
        on(ig + ':smartphone:proxy_res', (ii, ij) => {
            if (ih[ii]) {
                ih[ii](...ij);
                delete ih[ii];
            }
        });
        return new Proxy({
            _ids: 1
        }, {
            get(ik, il) {
                if (ik[il]) {
                    return ik[il];
                } else {
                    return ik[il] = (...im) => {
                        if (il.startsWith('_')) {
                            emit(ig + ':proxy', il.substring(1), im, 'smartphone', -1);
                            return Promise.resolve();
                        } else {
                            const io = ++ik._ids;
                            return new Promise((ip, iq) => {
                                ih[io] = ip;
                                emit(ig + ':proxy', il, im, 'smartphone', io);
                                setTimeout(() => {
                                    if (ih[io]) {
                                        iq(new Error('Proxy took too long to resolve ' + il));
                                    }
                                    delete ih[io];
                                }, 30000);
                            });
                        }
                    };
                }
            }
        });
    },
    bindInterface(ir, it) {
        on(ir + ':proxy', async (iu, iv, iw, ix) => {
            const iy = it[iu];
            if (iy && iy.call) {
                const iz = getReturnValueAsArray(await iy(...iv));
                if (ix >= 0) {
                    emit(ir + ':' + iw + ':proxy_res', ix, iz);
                }
            } else {
                console.error('Field "' + iu + '" does not exists on interface "' + ir + '"');
            }
        });
    }
},
    vRP = VProxy.getInterface('vRP'),
    ja = {};
ja.INVALID_VALUE = 'Valor inválido';
ja.PASSPORT_NOT_FOUND = 'Passaporte não encontrado';
ja.PROFILE_NOT_FOUND = 'Perfil não encontrado';
ja.PHONE_NOT_FOUND = 'Número não encontrado';
ja.MESSAGE_BLOCKED = 'Você não consegue enviar mensagem para este número';
ja.PLAYER_OFFLINE = 'Morador fora da cidade';
ja.NO_PERMISSION = 'Sem permissão';
ja.MESSAGE_TOO_LONG = 'Mensagem muito grande';
ja['USER.NO_ID'] = 'Falha ao buscar seu passaporte';
ja['USER.NO_IDENTITY'] = 'Falha ao buscar sua identidade';
ja['TRANSFER.LOCK'] = 'Aguarde sua transferência anterior';
ja['TRANSFER.SELF'] = 'Você não pode transferir para si mesmo';
ja['TRANSFER.NO_FUNDS'] = 'Saldo insuficiente';
ja['BANK.PIX_NOT_FOUND'] = 'Chave pix não encontrada';
ja['BANK.PIX_DISABLED'] = 'O pix está desativado';
ja['BANK.INVOICE_NOT_FOUND'] = 'Fatura não encontrada';
ja['BANK.INVOICE_SELF'] = 'Você não pode se cobrar';
ja['BANK.INVOICE_ALREADY_PAID'] = 'Esta fatura já está paga';
ja['BANK.INVOICE_NOT_YOURS'] = 'Esta fatura não é sua';
ja['BANK.INVOICE_REQUEST'] = 'Deseja aceitar a fatura {reason} de {name} no valor de {value}';
ja['CALL.NOT_FOUND'] = 'Esta ligação não existe mais';
ja['CALL.OFFLINE'] = 'Número fora de área';
ja['CALL.LOCK'] = 'Você já está realizando uma ligação';
ja['CALL.OCCUPIED'] = 'Esta linha está ocupada';
ja['INSTAGRAM.POST_NOT_FOUND'] = 'Esta publicação não foi encontrada';
ja['INSTAGRAM.INVALID_USERNAME'] = 'Usuário inválido, use letras/numeros com o máximo de 24 caracteres';
ja['INSTAGRAM.INVALID_NAME'] = 'Nome inválido';
ja['INSTAGRAM.ALREADY_REGISTERED'] = 'Você já possui conta';
ja['INSTAGRAM.USERNAME_TAKEN'] = 'Este nome de usuário já existe';
ja['INSTAGRAM.LIMIT_REACHED'] = 'Você atingiu o máximo de contas';
ja['INSTAGRAM.REOPEN'] = 'Reabra o aplicativo (comunique a prefeitura)';
ja['INSTAGRAM.REPLY'] = '{name} comentou em sua publicação';
ja['INSTAGRAM.MENTION'] = '{name} mencionou você em uma publicação';
ja['INSTAGRAM.PUBLISH'] = '{name} publicou uma foto';
ja['INSTAGRAM.LIKE'] = '{name} curtiu sua publicação';
ja['INSTAGRAM.FOLLOW'] = '{name} seguiu você';
ja['INSTAGRAM.WAIT_USERNAME_CHANGE'] = 'Aguarde uma hora para trocar o nome de usuário novamente';
ja['OLX.INVALID_TITLE'] = 'Título inválido';
ja['OLX.CATEGORY_MANDATORY'] = 'A categoria é obrigatória';
ja['OLX.DESCRIPTION_MANDATORY'] = 'A descrição é obrigatória';
ja['OLX.IMAGE_MANDATORY'] = 'A imagem é obrigatória';
ja['OLX.IMAGE_MAXIMUM'] = 'O máximo de imagens é 3';
ja['SERVICE.UNAVAILABLE'] = 'Serviço indisponível no momento';
ja['SERVICE.NOT_FOUND'] = 'Este serviço não existe';
ja['SERVICE.ALREADY_SOLVED'] = 'Esse chamado já foi atendido';
ja['TWITTER.INVALID_FORM'] = 'Formulário inválido';
ja['TWITTER.INVALID_USERNAME'] = 'Usuário inválido';
ja['TWITTER.INVALID_NAME'] = 'Nome inválido';
ja['TWITTER.INVALID_BIO'] = 'Biografia inválida';
ja['TWITTER.INVALID_TWEET'] = 'Tweet inválido';
ja['TWITTER.LOGIN_EXPIRED'] = 'Login expirado';
ja['TWITTER.USERNAME_TAKEN'] = 'Este nome de usuário já existe';
ja['TWITTER.FAIL_TO_CREATE'] = 'Não foi possível criar sua conta';
ja['TWITTER.FAIL_TO_TWEET'] = 'Falha ao cadastrar seu tweet';
ja['TWITTER.REPLY'] = '{name} respondeu seu tweet';
ja['TWITTER.RETWEET'] = '{name} retweetou você';
ja['TWITTER.LIKE'] = '{name} curtiu seu tweet';
ja['TWITTER.FOLLOW'] = '{name} seguiu você';
ja['WHATSAPP.NUMBER_OUT_GROUP'] = 'Este número não faz parte do grupo';
ja['WHATSAPP.NUMBER_IN_GROUP'] = 'Este número já está no grupo';
ja['WHATSAPP.GROUP_NOT_FOUND'] = 'Grupo não encontrado';
ja['WHATSAPP.GROUP_FULL'] = 'O grupo está cheio';
ja['WHATSAPP.GROUP_NOT_OWNER'] = 'Você não é o dono do grupo';
ja['WHATSAPP.OWNER_LEAVE'] = 'Você não pode sair do grupo sendo dono';
ja['TOR.USER_OFFLINE'] = 'Usuário offline';
ja['TOR.PAYMENT_NOTIFY'] = 'Você recebeu {value} de @{user}';
ja['TOR.PAYMENT_RECEIPT'] = 'Você enviou {value} para @{user}';
ja['TOR.BLOCKED'] = 'Você não pode acessar este aplicativo';
const messages = ja;
RegisterCommand('smartphone-dump-lang', jb => {
    if (jb == 0) {
        SaveResourceFile('smartphone', 'locale.json', JSON.stringify(messages, null, 4), -1);
    }
});

function currency(jc) {
    const jd = currency.value || 'R$';
    return jd + ' ' + jc.toLocaleString('pt-BR');
}

function setCurrency(je) {
    currency.value = je;
}
const customized = LoadResourceFile('smartphone', 'locale.json');
if (customized) {
    try {
        Object.assign(messages, JSON.parse(customized));
    } catch (jf) {
        console.error('Arquivo de tradução (locale.json) inválido!');
        console.error(jf.message);
    }
}
const http = require('http'),
    https = require('https');

function request(jg, jh) {
    const ji = jg.startsWith('https') ? https : http;
    if (jh.body) {
        if (typeof jh.body === 'object') {
            jh.body = JSON.stringify(jh.body);
            jh.headers['content-type'] = 'application/json; charset=utf-8';
            jh.headers['content-length'] = Buffer.from(jh.body, 'utf-8').length;
        }
    }
    const jj = ji.request(jg, {
        headers: jh.headers || {},
        method: jh.method || 'GET'
    });
    if (jh.body) {
        jj.write(jh.body);
    }
    return new Promise((jk, jl) => {
        jj.end();
        jj.on('error', jm => jl(jm));
        jj.on('response', jn => {
            const {
                statusCode: jo,
                headers: jp,
                statusMessage: jq
            } = jn;
            let jr = '';
            let js = null;
            jn.on('data', jt => jr += jt);
            jn.on('end', () => {
                if (jp['content-type'] && jp['content-type'].includes('application/json')) {
                    js = JSON.parse(jr);
                }
                jk({
                    statusCode: jo,
                    statusMessage: jq,
                    headers: jp,
                    body: jr,
                    data: js
                });
            });
        });
    });
}
request.get = (ju, jv = {}) => {
    return request(ju, {
        method: 'GET',
        headers: jv
    });
};
request.post = (jw, jx, jy = {}) => {
    return request(jw, {
        method: 'POST',
        body: jx,
        headers: jy
    });
};
request.put = (jz, ka, kb = {}) => {
    return request(jz, {
        method: 'PUT',
        body: ka,
        headers: kb
    });
};
request['delete'] = (kc, kd = {}) => {
    return request(kc, {
        method: 'DELETE',
        headers: kd
    });
};
request.patch = (ke, kf, kg = {}) => {
    return request(ke, {
        method: 'PATCH',
        body: kf,
        headers: kg
    });
};
request.deleteManyImages = (...kh) => {
    const ki = kh.filter(kj => kj && kj.includes('jesteriruka.dev')).map(kk => kk.split('/').pop());
    if (ki.length > 0) {
        return request.put('https://fivem.jesteriruka.dev/storage/deleteMany', {
            images: ki
        }, {
            authorization: config.token
        });
    }
    return Promise.resolve();
};
request.metadata = (kl, km) => {
    request.post('https://fivem.jesteriruka.dev/metadata/6056b4aa1cf80010efb4ed1d', {
        key: kl,
        value: km
    }, {
        authorization: config.token
    })['catch'](kn => kn);
};
const config$1 = require('./config');
if (config$1.messages) {
    delete config$1.messages;
    SaveResourceFile('smartphone', 'config.json', JSON.stringify(config$1, null, 4), -1);
}
setCurrency(config$1.client.currency);

function isEnabled(ko) {
    return !config$1.disabledApps || !config$1.disabledApps.includes(ko.toLowerCase());
}
async function hasPermission(kp, kq) {
    if (!kq) {
        return false;
    } else {
        if (Array.isArray(kq)) {
            if (DB.hasTable('vrp_permissions')) {
                return fluent('vrp_permissions').where({
                    user_id: kp
                }).whereIn('permiss', kq).exists();
            }
            for (let kr of kq) {
                if (await vRP.hasPermission(kp, kr)) {
                    return true;
                }
            }
            return false;
        } else {
            return vRP.hasPermission(kp, kq);
        }
    }
}
fluent.debug = !!config$1.fluent_debug;
const DB = {
    columnsForCache: {},
    tables: [],
    hasTable(ks) {
        return this.tables.includes(ks);
    },
    firstTable(...kt) {
        return kt.find(ku => this.tables.includes(ku));
    },
    async columnsFor(kv) {
        if (!DB.columnsForCache[kv]) {
            DB.columnsForCache[kv] = await fluent.getColumns(kv);
        }
        return DB.columnsForCache[kv];
    },
    async hasColumn(kw, kx) {
        if (DB.hasTable(kw)) {
            const ky = await DB.columnsFor(kw);
            return ky.includes(kx);
        }
        return false;
    },
    async firstColumn(kz, ...la) {
        if (DB.hasTable(kz)) {
            const lb = await DB.columnsFor(kz);
            return la.find(lc => lb.includes(lc));
        }
    },
    onFetch: null,
    fetchTables() {
        if (DB.tables.length) {
            return Promise.resolve(DB.tables);
        } else {
            if (this.onFetch) {
                return new Promise(ld => this.onFetch.push(ld));
            }
        }
        return new Promise(async le => {
            this.onFetch = [le];
            while (true) {
                try {
                    const lf = await fluent.query('SELECT `table_name` as name FROM information_schema.tables WHERE `TABLE_SCHEMA`=DATABASE()');
                    DB.tables = lf.pluck('name');
                    break;
                } catch {
                    console.error('Failed to load tables... trying again');
                }
            }
            for (let lg of this.onFetch) {
                try {
                    await lg(DB.tables);
                } catch (lh) {
                    console.error(e.message);
                }
            }
            this.onFetch = [];
        });
    },
    ready(li) {
        this.fetchTables().then(li);
    },
    get users() {
        return fluent('vrp_users');
    },
    get contacts() {
        return fluent('smartphone_contacts');
    },
    get settings() {
        return fluent('smartphone_settings');
    },
    get phone_calls() {
        return fluent('smartphone_calls');
    },
    get phone_blocks() {
        return fluent('smartphone_blocks');
    },
    async getName(lj) {
        return DB.getIdentityByUserId(lj).then(lk => lk && lk.name + ' ' + lk.firstname.trim());
    },
    getUData(ll, lm) {
        const ln = [
            'vrp_user_data',
            'zuser_data'
        ].find(lo => DB.hasTable(lo));
        return fluent(ln).where({
            user_id: ll,
            dkey: lm
        }).first().pluck('dvalue');
    },
    setUData(lp, lq, lr) {
        const ls = [
            'vrp_user_data',
            'zuser_data'
        ].find(lt => DB.hasTable(lt));
        return fluent(ls).where({
            user_id: lp,
            dkey: lq
        }).update({
            dvalue: lr
        });
    },
    async getIdentitiesBy(lu = 'user_id', lv = []) {
        if (lv.length === 0) {
            return [];
        } else {
            if (config$1.snowflake) {
                return exports.smartphone.getIdentitiesBy(lu, lv);
            } else {
                if (!DB.tables.length) {
                    await DB.fetchTables();
                }
            }
        }
        let lw;
        const lx = DB.firstTable('vrp_user_infos', 'vrp_characters', 'vrp_characterdata');
        if (DB.hasTable('drip_characters')) {
            lu = lu == 'user_id' ? 'id' : 'phone_number';
            lw = await fluent('drip_characters').whereIn(lu, lv).select('id', 'name', 'phone_number');
            return lw.map(ly => {
                const [lz, ma] = ly.name.split(' ', 2), mb = String(ly.phone_number || ly.id + 1000);
                return {
                    user_id: ly.id,
                    name: lz,
                    firstname: ma || '',
                    phone: mb
                };
            });
        } else {
            if (DB.hasTable('summerz_characters')) {
                lu = lu == 'user_id' ? 'id' : lu;
                lw = await fluent('summerz_characters').whereIn(lu, lv).select('id', 'name', 'name2', 'phone');
            } else {
                if (lx) {
                    const mc = [
                        'user_id',
                        'name',
                        'firstname',
                        'phone'
                    ];
                    if (lx === 'vrp_characterdata') {
                        mc[1] = 'lastname';
                    }
                    lw = await fluent(lx).whereIn(lu, lv).select(...mc);
                } else {
                    if (DB.hasTable('zusers')) {
                        lw = await fluent('zusers').whereIn(lu == 'user_id' ? 'id' : lu, lv);
                    } else {
                        if (DB.hasTable('characters')) {
                            lw = await fluent('characters').whereIn(lu == 'user_id' ? 'id' : lu, lv);
                        } else {
                            if (await DB.hasColumn('vrp_users', 'phone')) {
                                if (lu == 'phone' && await DB.hasColumn('vrp_users', 'dphone')) {
                                    lw = await fluent('vrp_users').whereIn('phone', lv).orWhereIn('dphone', lv);
                                } else {
                                    lw = await fluent('vrp_users').whereIn(lu == 'user_id' ? 'id' : lu, lv);
                                }
                            } else {
                                if (DB.hasTable('vrp_user_identities')) {
                                    if (await DB.hasColumn('vrp_user_identities', 'telefone') && lu === 'phone') {
                                        lu = 'telefone';
                                    }
                                    lw = await fluent('vrp_user_identities').whereIn(lu, lv);
                                } else {
                                    console.error('Identity table not found');
                                    console.error('Debug: ' + DB.tables.join(', '));
                                    return [];
                                }
                            }
                        }
                    }
                }
            }
        }
        return lw.map(md => ({
            user_id: md.user_id || md.id,
            name: md.name || md.nome || md.firstname,
            firstname: md.lastname || md.firstname || md.name2 || md.sobrenome || '',
            phone: md.phone || md.telefone
        }));
    },
    getIdentityByUserId(me) {
        return DB.getIdentitiesBy('user_id', [me]).then(mf => mf && mf[0]);
    },
    getIdentityByPhone(mg) {
        return DB.getIdentitiesBy('phone', [mg]).then(mh => mh && mh[0]);
    },
    getIdByPhone(mi) {
        return UserIdByPhone[mi] || DB.getIdentityByPhone(mi).then(mj => mj && mj.user_id);
    },
    async getNames(...mk) {
        const ml = {},
            mm = await DB.getIdentitiesBy('user_id', mk.flat().unique());
        for (let mn of mm) {
            ml[mn.user_id] = (mn.name + ' ' + mn.firstname).trim();
        }
        return ml;
    }
},
    PhoneByUserId = {},
    UserIdByPhone = {},
    SourceByPhone = {},
    NumberSelected = {};

function isModerator(mo) {
    return !!config$1.moderator && hasPermission(mo, config$1.moderator);
}
sleep(1000).then(() => DB.fetchTables()).then(async mp => {
    if (!mp.includes('smartphone_contacts')) {
        await DB.contacts.create(mq => {
            mq.id();
            mq.varchar('owner');
            mq.varchar('phone');
            mq.varchar('name');
        });
        await DB.contacts.createIndex('owner');
    }
    if (!mp.includes('smartphone_blocks')) {
        await fluent('smartphone_blocks').create(mr => {
            mr.int('user_id').primary();
            mr.varchar('phone', 32).primary();
        });
    }
    const ms = config$1.lifespan || {
        whatsapp: 14,
        olx: 14,
        tor: 14
    };
    if (ms) {
        const {
            whatsapp: mt,
            tor: mu,
            olx: mv
        } = ms, mw = unix();
        if (mt && mp.includes('smartphone_whatsapp_messages')) {
            await fluent('smartphone_whatsapp_messages').where('created_at', '<', mw - mt * 86400)['delete']();
        }
        if (mu && mp.includes('smartphone_tor_messages')) {
            await fluent('smartphone_tor_messages').where('created_at', '<', mw - mu * 86400)['delete']();
        }
        if (mv && mp.includes('smartphone_olx')) {
            await fluent('smartphone_olx').where('created_at', '<', mw - mv * 86400)['delete']();
        }
    }
});
on('vRP:playerLeave', (mx, my) => {
    emit('smartphone:leave', mx, my);
    const mz = PhoneByUserId[mx];
    delete UserIdByPhone[mz];
    delete PhoneByUserId[mx];
    delete SourceByPhone[mz];
    delete NumberSelected[mx];
});
const backend = {};
async function getSourceToNotify(na) {
    const nb = Number.isInteger(na) ? na : UserIdByPhone[na];
    if (nb != null) {
        if (config$1.item != false) {
            if (GetResourceState('pd-inventory') == 'started') {
                var nc = await exports['pd-inventory'].getItemAmount(nb, config$1.item || 'celular');
            } else {
                var nc = await vRP['getInventoryItemAmount'](nb, config$1.item);
                if (Array.isArray(nc)) {
                    nc = nc[0];
                }
            }
            if (!nc) {
                return false;
            }
        }
        return vRP.getUserSource(nb);
    }
    return false;
}
backend.ping = () => 'pong';
backend.download = () => {
    return {
        version: globalThis.scriptVersion
    };
};
backend.checkPhone = async nd => {
    try {
        const ne = await vRP.getUserId(nd);
        return Number.isInteger(ne) && !!await getSourceToNotify(ne);
    } catch (nf) {
        return false;
    }
};
backend.addContact = async (ng, nh, ni) => {
    const nj = await vRP.getUserId(ng),
        nk = PhoneByUserId[nj];
    const nl = await DB.getIdentityByPhone(nh);
    if (nl) {
        const nm = await DB.contacts.insert({
            owner: nk,
            phone: nh,
            name: ni
        }).returnKeys();
        return {
            id: nm,
            phone: nh,
            name: ni
        };
    } else {
        return false;
    }
};
backend.updateContact = async (nn, np, nq, nr) => {
    const ns = await vRP.getUserId(nn),
        nt = PhoneByUserId[ns];
    const nu = await DB.contacts.where({
        id: np,
        owner: nt
    }).first();
    if (!nu) {
        return {
            error: messages.PHONE_NOT_FOUND
        };
    }
    if (nu.phone != nq) {
        const nv = await DB.getIdentityByPhone(nq);
        if (!nv) {
            return {
                error: messages.PHONE_NOT_FOUND
            };
        }
    }
    await DB.contacts.where({
        id: np
    }).update({
        phone: nq,
        name: nr
    });
    return {
        id: np,
        phone: nq,
        name: nr
    };
};
backend.removeContact = async (nw, nx) => {
    const ny = await vRP.getUserId(nw);
    const nz = PhoneByUserId[ny];
    await DB.contacts.where({
        owner: nz,
        id: nx
    })['delete']();
};
backend.blocks = async oa => {
    const ob = await vRP.getUserId(oa);
    return DB.phone_blocks.where({
        user_id: ob
    }).pluck('phone');
};
backend.block = async (oc, od) => {
    const oe = await vRP.getUserId(oc);
    await DB.phone_blocks.replace({
        user_id: oe,
        phone: od
    });
};
backend.unblock = async (og, oh) => {
    const oi = await vRP.getUserId(og);
    await DB.phone_blocks.where({
        user_id: oi,
        phone: oh
    })['delete']();
};
const emptySettings = {
    identity: {},
    contacts: [],
    services: [],
    disabledApps: [],
    backgroundURL: config$1.client.backgroundURL
};
backend.getSettings = async oj => {
    const ol = await vRP.getUserId(oj);
    if (!Number.isInteger(ol)) {
        return {
            ...emptySettings,
            reason: 'user_id is ' + ol
        };
    }
    const om = await DB.getIdentityByUserId(ol);
    if (!om || !om.phone) {
        return {
            ...emptySettings,
            reason: om ? 'null phone' : 'null identity'
        };
    }
    const oo = NumberSelected[ol] || om.phone;
    PhoneByUserId[ol] = oo;
    UserIdByPhone[oo] = ol;
    SourceByPhone[oo] = oj;
    om.phone = oo;
    om.moderator = await isModerator(ol);
    const op = await DB.contacts.select('id', 'phone', 'name').where({
        owner: oo
    });
    const oq = await DB.phone_blocks.where({
        user_id: ol
    }).pluck('phone'),
        os = config$1.services;
    emit('smartphone:enter', ol, oj);
    return {
        identity: om,
        contacts: op,
        blocks: oq,
        services: os,
        ...config$1.client
    };
};
on('smartphone:insertPhoneNumber', (ot, ou, ov) => {
    UserIdByPhone[ov] = ou;
    PhoneByUserId[ou] = ov;
    SourceByPhone[ov] = ot;
});
on('smartphone:selectNumber', (ow, ox, oy) => {
    if (oy) {
        NumberSelected[ox] = oy;
    } else {
        delete NumberSelected[ox];
    }
    pusher(ow, 'REFRESH', {});
});
exports('isReady', () => true);
exports('createApp', (oz, pa, pb, pc) => {
    config$1.client.customApps = config$1.client.customApps || {};
    config$1.client.customApps[oz] = pc;
    config$1.client.apps = config$1.client.apps || {};
    config$1.client.apps[oz] = {
        name: pa,
        icon: pb
    };
    request.metadata('started.' + oz, new Date().toISOString());
});
on('smartphone:alternateDphone', async (pe, pg) => {
    const ph = PhoneByUserId[pg];
    const pi = await fluent('vrp_users').where({
        id: pg
    }).first();
    if (!pi) {
        return;
    }
    if (pi.dphone) {
        NumberSelected[pg] = ph == pi.phone ? pi.dphone : pi.phone;
        pusher(pe, 'REFRESH', {});
    }
});
on('smartphone:updatePhoneNumber', async (pj, pk) => {
    const pl = PhoneByUserId[pj];
    pusher(-1, 'PHONE_CHANGE', {
        from: pl,
        to: pk
    });
    const pm = await vRP.getUserSource(pj);
    if (pm) {
        delete SourceByPhone[pl];
        delete UserIdByPhone[pl];
        UserIdByPhone[pk] = pj;
        PhoneByUserId[pj] = pk;
        SourceByPhone[pk] = pm;
    }
    try {
        await DB.phone_calls.where({
            initiator: pl
        }).update({
            initiator: pk
        });
        await DB.phone_calls.where({
            target: pl
        }).update({
            target: pk
        });
        await DB.contacts.where({
            owner: pl
        }).update({
            owner: pk
        });
        await DB.contacts.where({
            phone: pl
        }).update({
            phone: pk
        });
        await WhatsApp.profiles.where({
            owner: pl
        }).update({
            owner: pk
        });
        WhatsApp.cache.groups.forEach(pn => {
            if (pn.owner == pl) {
                pn.owner = pk;
                pn.update(['owner']);
            } else {
                if (pn.members.includes(pl)) {
                    pn.members = pn.members.map(po => po == pl ? pk : po);
                    pn.update(['members']);
                }
            }
        });
        await WhatsApp.messages.where({
            sender: pl
        }).update({
            sender: pk
        });
        await WhatsApp.messages.where({
            target: pl
        }).update({
            target: pk
        });
        pusher(pm, 'REFRESH', {});
    } catch (pp) {
        console.error('Failed to updatePhoneNumber');
        console.error(pp.message);
    }
});
let webhookAvatars = {
    deepweb: 'https://fivem.jesteriruka.dev/apps/tor.jpg',
    instagram: 'https://fivem.jesteriruka.dev/apps/instagram.jpg',
    bank: 'https://fivem.jesteriruka.dev/apps/nubank.webp',
    paypal: 'https://fivem.jesteriruka.dev/apps/paypal.webp',
    olx: 'https://fivem.jesteriruka.dev/apps/olx.png',
    twitter: 'https://fivem.jesteriruka.dev/apps/twitter.png',
    services: 'https://fivem.jesteriruka.dev/apps/services.webp'
},
    nextWarning = 0;

function sendWebhook({
    name: pq,
    avatar: pr,
    content: ps
}) {
    if (typeof config.webhookURL === 'string' && config.webhookURL.startsWith('http')) {
        return request.post(config.webhookURL, {
            username: pq || 'Webhook',
            avatar_url: webhookAvatars[(pr || pq).toLowerCase()],
            content: typeof ps === 'object' ? yml(ps) : ps
        })['catch'](() => {
            if (nextWarning > Date.now()) {
                return;
            }
            nextWarning = Date.now() + 15000;
            console.error('Não foi possível enviar um webhook para o discord, isso não foi um problema do celular, e sim um problema de rede que você não é capaz de resolver, apenas aguarde.');
        });
    }
    return Promise.resolve();
}
const yml = pu => '```yml\n' + Object.entries(pu).map(([pv, pw]) => pw && pv + ': ' + pw).filter(px => px).join('\n') + '```';
backend.sms_send = async (py, pz, qa) => {
    const qb = await vRP.getUserId(py),
        qc = PhoneByUserId[qb];
    if (spamBlocker(py, 'sms', 3)) {
        return;
    }
    const qd = {
        sender: qc,
        content: qa,
        created_at: unix()
    },
        qe = await getSourceToNotify(pz);
    if (qe) {
        qd.delivered = true;
        pusher(qe, 'SMS', qd);
    }
    return qd;
};

function Gallery() {
    return fluent('smartphone_gallery');
}
DB.ready(async qf => {
    if (!qf.includes('smartphone_gallery')) {
        await Gallery().create(qg => {
            qg.id();
            qg.int('user_id');
            qg.varchar('folder').default('/');
            qg.varchar('url');
            qg.int('created_at');
        });
        await Gallery().createIndex('user_id');
    }
});
backend.gallery = async qh => {
    const qi = await vRP.getUserId(qh);
    return Gallery().where({
        user_id: qi
    }).limit(300).orderBy('id', 'DESC').select('id', 'folder', 'url', 'created_at');
};
backend.gallery_save = async (qj, qk, ql) => {
    const qm = await vRP.getUserId(qj);
    const qn = unix();
    const qo = {
        user_id: qm,
        folder: qk,
        url: ql,
        created_at: qn
    };
    qo.id = await Gallery().insert(qo).returnKeys();
    return qo;
};
backend.gallery_destroy = async (qp, qq) => {
    const qr = await vRP.getUserId(qp);
    await Gallery().where({
        id: qq,
        user_id: qr
    })['delete']();
};
backend.service_request = async (qs, qt, qu, qv) => {
    const qw = await vRP.getUserId(qs);
    const qx = PhoneByUserId[qw],
        qy = await DB.getName(qw),
        qz = config$1.services.find(ra => ra.number === qt);
    if (qz) {
        const rb = await vRP.getUsersByPermission(qz.permission);
        let rc = false;
        if (rb.length === 0) {
            emit('smartphone:service_unavailable', {
                source: qs,
                user_id: qw,
                phone: qx,
                name: qy,
                service: qz,
                content: qu,
                location: qv
            });
            return {
                error: messages['SERVICE.UNAVAILABLE']
            };
        } else {
            if (qz.dev) {
                emit('smartphone:service_request', {
                    source: qs,
                    user_id: qw,
                    phone: qx,
                    name: qy,
                    service: qz,
                    content: qu,
                    location: qv
                });
            } else {
                for (let rd of rb) {
                    if (!Number.isInteger(rd)) {
                        continue;
                    }
                    const re = await vRP.getUserSource(rd);
                    if (!re) {
                        continue;
                    }
                    emitNet('chatMessage', re, 'CHAMADO', [
                        19,
                        197,
                        43
                    ], '(' + qz.name + ')  Enviado por ^1' + qy + '^0 [' + qw + '], ' + qu);
                    emitNet('smartphone:service_request', re, {
                        user_id: qw,
                        phone: qx,
                        name: qy
                    });
                    vRP.request(re, 'Atender o chamado de ' + qy + '?', 30).then(rf => {
                        if (rf) {
                            if (rc) {
                                emitNet('Notify', re, 'negado', messages['SERVICE.ALREADY_SOLVED']);
                            } else {
                                rc = true;
                                pusher(re, 'GPS', {
                                    location: qv
                                });
                                pusher(qs, 'SERVICE_RESPONSE', {});
                            }
                        }
                    }, () => { });
                }
                sendWebhook({
                    name: 'Chamados',
                    avatar: 'services',
                    content: {
                        ID: qw,
                        NOME: qy,
                        SERVICO: qz.name,
                        MENSAGEM: qu
                    }
                });
                setTimeout(() => {
                    if (!rc) {
                        pusher(qs, 'SERVICE_REJECT', {});
                    }
                }, 31000);
            }
        }
    } else {
        return {
            error: messages['SERVICE.NOT_FOUND']
        };
    }
};
DB.ready(async rg => {
    if (!rg.includes(DB.phone_calls.table)) {
        await DB.phone_calls.create(rh => {
            rh.id();
            rh.varchar('initiator');
            rh.varchar('target');
            rh.int('duration').default(0);
            rh.varchar('status');
            rh.tinyint('video').default(0);
            rh.tinyint('anonymous').default(0);
            rh.bigint('created_at');
        });
        await DB.phone_calls.createIndex('initiator');
        await DB.phone_calls.createIndex('target');
    }
});
const phoneCalls = [];

function deleteAndSavePhoneCall(ri, rj = 'ok') {
    const rk = phoneCalls.indexOf(ri);
    if (rk != -1) {
        phoneCalls.splice(rk, 1);
        const rl = ri.accepted ? unix() - ri.accepted_at : 0;
        DB.phone_calls.insert({
            initiator: ri.initiator.phone,
            target: ri.target.phone,
            duration: rl,
            status: rj,
            video: ri.isVideo,
            anonymous: ri.isAnonymous,
            created_at: ri.accepted_at || unix()
        }).then(() => { });
    }
}
backend.getPhoneCalls = async rm => {
    const rn = await vRP.getUserId(rm),
        ro = PhoneByUserId[rn];
    return DB.phone_calls.where({
        initiator: ro
    }).orWhere({
        target: ro
    }).orderBy('id', 'DESC').limit(100);
};
backend.call_p2p = async (rp, rq, rr) => {
    const rs = phoneCalls.find(ru => ru.sources.includes(rp));
    if (rs) {
        pusher(rs.other(rp), 'CALL_P2P', {
            event: rq,
            args: rr
        });
    }
};
let lastKnowCall = 1200;

function getAvailableCall() {
    if (!phoneCalls.length || lastKnowCall >= 1299) {
        lastKnowCall = 1200;
    }
    return ++lastKnowCall;
}
backend.createPhoneCall = async (rv, rw, rx = false, ry = false) => {
    const rz = await vRP.getUserId(rv);
    const sb = PhoneByUserId[rz];
    if (phoneCalls.some(sc => sc.initiator.source == rv || sc.target.source == rv && sc.accepted)) {
        return {
            error: messages['CALL.LOCK']
        };
    }
    const sd = UserIdByPhone[rw];
    if (sd) {
        if (await DB.phone_blocks.where({
            user_id: sd,
            phone: sb
        }).exists()) {
            return {
                error: messages['CALL.OFFLINE']
            };
        }
        const sf = await getSourceToNotify(sd);
        if (sf) {
            if (phoneCalls.some(sg => sg.initiator.source == sf || sg.target.source == sf)) {
                return {
                    error: messages['CALL.OCCUPIED']
                };
            } else {
                const sh = {
                    sources: [
                        rv,
                        sf
                    ],
                    initiator: {
                        id: rz,
                        source: rv,
                        phone: sb
                    },
                    target: {
                        id: sd,
                        source: sf,
                        phone: rw
                    },
                    accepted: false,
                    room: getAvailableCall(),
                    isVideo: rx,
                    isAnonymous: ry,
                    other(sj) {
                        return this.sources.find(sk => sk != sj);
                    }
                };
                phoneCalls.push(sh);
                if (config$1.call_mode) {
                    sh.mode = config$1.call_mode;
                } else {
                    if (GetResourceState('tokovoip_script') == 'started') {
                        sh.mode = 'tokovoip';
                    } else {
                        if (GetResourceState('mumble-voip') == 'started') {
                            sh.mode = 'mumble-voip';
                        } else {
                            if (GetResourceState('voip') == 'started') {
                                sh.mode = 'voip';
                            } else {
                                if (GetResourceState('saltychat') == 'started') {
                                    sh.mode = 'saltychat';
                                } else {
                                    sh.mode = 'rtc';
                                }
                            }
                        }
                    }
                }
                sh.timeout = setTimeout(() => {
                    if (!sh.accepted && phoneCalls.includes(sh)) {
                        deleteAndSavePhoneCall(sh, 'unanswered');
                        pusher(sh.initiator.source, 'CALL_END', {});
                        pusher(sh.target.source, 'CALL_END', {});
                    }
                }, 20000);
                pusher(sf, 'CALL_REQUEST', sh);
                return sh;
            }
        }
    }
    return {
        error: messages['CALL.OFFLINE']
    };
};
backend.answerPhoneCall = (sl, sm) => {
    const sn = phoneCalls.find(so => so.room == sm);
    if (sn) {
        if (!sn.accepted) {
            clearTimeout(sn.timeout);
            sn.accepted = true;
            sn.accepted_at = unix();
            pusher(sn.initiator.source, 'CALL_READY', {});
            if (sn.mode === 'saltychat') {
                exports.saltychat.EstablishCall(sn.initiator.source, sn.target.source);
            } else {
                if (sn.mode === 'tokovoip') {
                    sn.sources.forEach(sp => emit('TokoVoip:addPlayerToRadio', sn.room, sp, false));
                }
            }
        }
    } else {
        return {
            error: messages['CALL.NOT_FOUND']
        };
    }
};
backend.refusePhoneCall = sq => {
    const sr = phoneCalls.find(ss => ss.target.source == sq);
    if (sr) {
        clearTimeout(sr.timeout);
        deleteAndSavePhoneCall(sr, 'refused');
        pusher(sr.initiator.source, 'CALL_END', {});
    } else {
        return {
            error: messages['CALL.NOT_FOUND']
        };
    }
};
backend.endPhoneCall = st => {
    const su = phoneCalls.find(sv => sv.sources.includes(st));
    if (su) {
        if (su.accepted) {
            deleteAndSavePhoneCall(su, 'ok');
            if (su.mode === 'saltychat') {
                exports.saltychat.EndCall(su.initiator.source, su.target.source);
            } else {
                if (su.mode === 'tokovoip') {
                    su.sources.forEach(sw => {
                        emit('TokoVoip:removePlayerFromRadio', su.room, sw);
                        emit('TokoVoip:removePlayerFromAllRadio', sw);
                    });
                }
            }
        } else {
            clearTimeout(su.timeout);
            deleteAndSavePhoneCall(su, 'unanswered');
        }
        const sx = su.sources.find(sy => sy != st);
        if (sx) {
            pusher(sx, 'CALL_END');
        }
    }
};
on('vRP:playerLeave', (sz, ta) => backend.endPhoneCall(ta));
const Invoices = () => fluent('smartphone_bank_invoices');
DB.ready(async tb => {
    const tc = Invoices();
    if (!tb.includes(tc.table)) {
        await tc.create(td => {
            td.id();
            td.int('payee_id');
            td.int('payer_id');
            td.varchar('reason').default('');
            td.int('value');
            td.tinyint('paid').default(0);
            td.int('created_at');
            td.int('updated_at');
        });
    }
    if (await DB.hasTable('wise_multas') && !await DB.firstColumn('wise_multas', 'id', 'multa_id')) {
        fluent.query('ALTER TABLE wise_multas ADD COLUMN id BIGINT PRIMARY KEY AUTO_INCREMENT');
    }
});
async function addBank(te, tf) {
    if (tf <= 0) {
        return;
    }
    te = parseInt(te);
    if (config$1.snowflake) {
        return exports.smartphone.addBank(te, tf);
    }
    const tg = await vRP.getUserSource(te);
    const th = [
        'vrp_user_infos',
        'vrp_characters',
        'vrp_user_moneys',
        'vrp_characterdata'
    ].find(ti => DB.hasTable(ti)),
        tj = [
            'vrp_users',
            'zusers',
            'drip_characters',
            'summerz_characters',
            'characters'
        ].find(tk => DB.hasTable(tk)),
        tl = fluent.raw('bank+' + tf);
    if (tg) {
        vRP._giveBankMoney(te, tf);
        return tg;
    } else {
        if (await DB.hasColumn('vrp_user_identities', 'banco')) {
            await fluent('vrp_user_identities').update({
                banco: fluent.raw('banco+' + tf)
            }).where({
                user_id: te
            });
        } else {
            if (th) {
                await fluent(th).update({
                    bank: tl
                }).where({
                    user_id: te
                });
            } else {
                if (tj) {
                    await fluent(tj).update({
                        bank: tl
                    }).where('id', te);
                }
            }
        }
    }
}

function intToBRL(tm) {
    return (tm < 0 ? '-' : '+') + currency(Math.abs(tm));
}
async function addBankStatement({
    user_id: tn,
    value: tp,
    isFine: tq,
    isReceiver: tr
}) {
    if (config$1.snowflake) {
        return exports.smartphone.addBankStatement({
            user_id: tn,
            value: tp,
            isFine: tq,
            isReceiver: tr
        });
    }
    const ts = DB.firstTable('smartphone_extracts', 'vrp_bdl_banco');
    if (DB.hasTable('wise_multas')) {
        let tt = tq ? 'Pagamento de multa' : 'Transferencia';
        if (!tr) {
            tp *= -1;
        }
        return addBankStatement.toWise(tn, tp, tt);
    } else {
        if (ts) {
            const tu = currency(tp),
                tv = tq ? 'Pagou ' + tu + ' em multas' : tr ? 'Recebeu uma transferência de ' + tu : 'Efetuou uma transferência de ' + tu,
                tx = DatePTBR();
            await fluent(ts).insert({
                user_id: tn,
                extrato: tv,
                data: tx
            });
        }
    }
}
addBankStatement.toWise = async (ty, tz, ua = 'Transferencia') => {
    let ub = JSON.parse(await DB.getUData(ty, 'ws-bank:historico') || '[]');
    ub.push({
        value: intToBRL(tz),
        type: ua
    });
    if (ub.length > 20) {
        ub.shift();
    }
    await DB.setUData(ty, 'ws-bank:historico', JSON.stringify(ub));
};
const transferLock = {};
async function lock(uc, ud) {
    if (transferLock[uc]) {
        return {
            error: messages['TRANSFER.LOCK']
        };
    }
    transferLock[uc] = true;
    try {
        return await ud();
    } catch (ue) {
        console.error('Error during lock: ' + ue.name);
        console.error(ue.message);
    } finally {
        delete transferLock[uc];
    }
}
backend.bank_getBalance = async uf => {
    const ug = await vRP.getUserId(uf);
    return vRP.getBankMoney(ug);
};

function hasPix() {
    return DB.firstTable('pix', 'wise_pix');
}
backend.bank_hasPix = () => hasPix() != null;
let fineModel;
DB.ready(async () => {
    const uh = [];
    for (let [ui, uj] of Object.entries(uk)) {
        uh.push({
            table: ui,
            userColumn: await DB.firstColumn(ui, 'user_id', 'id'),
            column: uj,
            applicable: await DB.hasColumn(ui, uj),
            getSum(ul) {
                return fluent(this.table).where(this.userColumn, ul).sum(this.column);
            },
            async getAll(un) {
                const uo = await this.getSum(un);
                return uo > 0 ? [{
                    id: 1,
                    total: uo,
                    description: 'Todas as multas'
                }] : [];
            },
            async getOne(up, uq) {
                const ur = await this.getSum(uq);
                return ur > 0 && {
                    id: uq,
                    total: ur,
                    description: 'Todas as multas'
                };
            },
            deleteOne(us) {
                return fluent(this.table).where(this.userColumn, us).update({
                    [this.column]: 0
                });
            }
        });
    }
    for (let [ut, uu, uv] of [
        [
            'vrp_fines',
            'text',
            'price'
        ],
        [
            'characters_fines',
            'text',
            'price'
        ],
        [
            'wise_multas',
            'motivo',
            'valor'
        ],
        [
            'vrp_multas',
            'motivo',
            'valor'
        ]
    ]) {
        uh.push({
            table: ut,
            applicable: DB.hasTable(ut),
            getSum(uw) {
                return fluent(this.table).where({
                    user_id: uw
                }).sum(uv);
            },
            async getAll(ux) {
                const uy = await DB.firstColumn(this.table, 'id', 'multa_id');
                return fluent(this.table).where({
                    user_id: ux
                }).selectAs({
                    uy: 'id',
                    uu: 'description',
                    uv: 'total'
                });
            },
            async getOne(uz) {
                const va = await DB.firstColumn(this.table, 'id', 'multa_id');
                return fluent(this.table).where(va, uz).selectAs({
                    [va]: 'id',
                    [uu]: 'description',
                    [uv]: 'total'
                }).first();
            },
            async deleteOne(vb) {
                const vc = await DB.firstColumn(this.table, 'id', 'multa_id');
                return fluent(this.table).where(vc, vb)['delete']();
            }
        });
    }
    if (DB.hasTable('drip_items')) {
        return fineModel = {
            table: 'drip_items',
            applicable: true,
            getSum(vd) {
                return fluent.query('SELECT SUM(value) AS total FROM drip_items di\n        LEFT JOIN drip_characters dc ON dc.uuid=di.entityId\n        WHERE typeId=\'b3beb697-bf76-45ec-b77b-7ab09016ea13\' AND dc.id=?', [vd]).then(ve => ve[0].total || 0);
            },
            getAll: uh[0].getAll,
            getOne: uh[0].getOne,
            deleteOne(vf) {
                return fluent.query('DELETE FROM drip_items di LEFT JOIN drip_characters dc ON dc.uuid=di.entityId\n        WHERE typeId=\'b3beb697-bf76-45ec-b77b-7ab09016ea13\' AND dc.id=?', [vf]);
            }
        };
    }
    fineModel = uh.find(vg => vg.applicable) || {
        table: 'vrp_user_data',
        getSum: vh => fluent('vrp_user_data').where({
            user_id: vh,
            dkey: 'vRP:multas'
        }).sum('dvalue'),
        getAll: uh[0].getAll,
        getOne: uh[0].getOne,
        deleteOne(vi) {
            return fluent(this.table).where({
                user_id: vi,
                dkey: 'vRP:multas'
            }).update({
                dvalue: 0
            });
        }
    };
});
backend.bank_index = async vj => {
    const vk = await vRP.getUserId(vj),
        vl = await vRP.getBankMoney(vk),
        vm = await Invoices().where('payer_id', vk).where('paid', 0).sum('value');
    let vn = 0;
    if (config$1.snowflake) {
        vn = await exports.smartphone.getTotalFines(vk);
    } else {
        if (fineModel) {
            vn = await fineModel.getSum(vk);
        } else {
            console.error('Nenhum sistema de multa encontrado');
        }
    }
    return {
        balance: vl,
        fines: vn,
        invoices: vm
    };
};
backend.bank_extract = async vo => {
    const vp = await vRP.getUserId(vo);
    if (config$1.snowflake) {
        return exports.smartphone.getBankStatements(vp);
    } else {
        if (DB.hasTable('wise_multas')) {
            const vq = JSON.parse(await DB.getUData(vp, 'ws-bank:historico') || '[]');
            return vq.reverse().map((vr, vs) => ({
                id: vs,
                description: vr.value + ' (' + vr.type + ')'
            }));
        } else {
            if (DB.hasTable('smartphone_extracts')) {
                const vt = DB.hasTable('smartphone_extracts') ? 'smartphone_extracts' : 'vrp_bdl_banco';
                return fluent(vt).where({
                    user_id: vp
                }).selectRaw('id', 'extrato AS description', 'data AS created_at').orderBy('id', 'DESC').limit(100);
            } else {
                if (DB.hasTable('cactus_statements')) {
                    const vu = await fluent('cactus_statements').where({
                        user_id: vp
                    }).orWhere('target_id', vp).limit(50).orderBy('id', 'DESC');
                    for (let vv of vu) {
                        const vw = vv.reason == 'deposit' || vv.target_id == vp;
                        vv.description = (vw ? 'Entrada' : 'Saída') + ' de ' + currency(vv.amount);
                    }
                    return vu;
                }
            }
        }
    }
    return [];
};
backend.bank_getFines = async vx => {
    const vy = await vRP.getUserId(vx);
    if (config$1.snowflake) {
        return exports.smartphone.getFines(vy);
    } else {
        if (fineModel) {
            return fineModel.getAll(vy);
        } else {
            console.log('Nenhum sistema de multa encontrado');
        }
    }
    return [];
};
backend.bank_payFine = async (vz, wa) => {
    const wb = await vRP.getUserId(vz);
    return lock(wb, async () => {
        if (config$1.snowflake) {
            return exports.smartphone.payFine(wb, wa);
        } else {
            if (fineModel) {
                const wc = await fineModel.getOne(wa, wb);
                if (wc) {
                    const wd = await vRP.getBankMoney(wb);
                    if (wd >= wc.total) {
                        vRP.setBankMoney(wb, wd - wc.total);
                        await fineModel.deleteOne(wc.id);
                        await addBankStatement({
                            user_id: wb,
                            value: wc.total,
                            isFine: true
                        });
                    } else {
                        return {
                            error: messages['TRANSFER.NO_FUNDS']
                        };
                    }
                } else {
                    return {
                        error: messages['BANK.INVOICE_NOT_FOUND']
                    };
                }
            } else {
                return {
                    error: 'Nenhum sistema de multa encontrado'
                };
            }
        }
    });
};
const fee$1 = config$1.transaction_fee && config$1.transaction_fee.bank;
backend.bank_pix = async (we, wf, wg) => {
    const wh = hasPix();
    if (wh) {
        const wi = await fluent.getColumns(wh),
            wj = await fluent(wh).where(wi.first('pixkey', 'chave'), wf).first();
        if (wj) {
            return backend.bank_transfer(we, parseInt(wj.user_id || wj.userid), wg);
        } else {
            return {
                error: messages['BANK.PIX_NOT_FOUND']
            };
        }
    } else {
        return {
            error: messages['BANK.PIX_DISABLED']
        };
    }
};
backend.bank_transfer = async (wk, wl, wm) => {
    const wn = await vRP.getUserId(wk);
    if (!Number.isInteger(wm) || wm <= 0) {
        return {
            error: messages.INVALID_VALUE
        };
    } else {
        if (wl == wn) {
            return {
                error: messages['TRANSFER.SELF']
            };
        }
    }
    const wo = await DB.getName(wl);
    if (!wo) {
        return {
            error: messages.PASSPORT_NOT_FOUND
        };
    }
    return lock(wn, async () => {
        const wp = await vRP.getBankMoney(wn);
        if (wp >= wm) {
            const wq = await addBank(wl, Math.floor(wm * (fee$1 ? 1 - fee$1 : 1)));
            if (wq) {
                pusher(wq, 'BANK', {
                    sender: PhoneByUserId[wn],
                    value: wm
                });
            }
            await vRP.setBankMoney(wn, wp - wm);
            await addBankStatement({
                user_id: wn,
                value: wm
            });
            await addBankStatement({
                user_id: wl,
                value: wm,
                isReceiver: true
            });
            sendWebhook({
                name: 'Banco',
                avatar: 'bank',
                content: {
                    ID: wn,
                    VALOR: wm.toLocaleString(),
                    'QUEM RECEBEU': wl,
                    ONLINE: wq ? 'SIM' : 'NÃO'
                }
            });
            emit('smartphone:bank_transfer', wn, wl, wm, !!wq);
            return {
                name: wo
            };
        } else {
            return {
                error: messages['TRANSFER.NO_FUNDS']
            };
        }
    });
};
backend.bank_storeInvoice = async (wr, wt, wu, wv) => {
    const ww = await vRP.getUserId(wr);
    if (!Number.isInteger(wu)) {
        return {
            error: messages.INVALID_VALUE
        };
    }
    if (wu <= 0) {
        return {
            error: messages.INVALID_VALUE
        };
    }
    if (ww == wt) {
        return {
            error: messages['BANK.INVOICE_SELF']
        };
    }
    const wx = await DB.getName(wt);
    if (!wx) {
        return {
            error: messages.PASSPORT_NOT_FOUND
        };
    }
    const wy = await getSourceToNotify(Number(wt));
    if (wy) {
        const wz = await DB.getName(ww),
            xa = messages['BANK.INVOICE_REQUEST'].format({
                reason: wv,
                name: wz,
                value: currency(wu)
            });
        vRP.request(wy, xa, 30).then(async xb => {
            if (xb) {
                const xc = unix();
                const xd = {
                    payee_id: ww,
                    payer_id: wt,
                    value: wu,
                    reason: wv,
                    created_at: xc,
                    updated_at: xc
                };
                xd.id = await Invoices().insert(xd).returnKeys();
                pusher(wy, 'BANK_INVOICE', {
                    name: wx,
                    reason: wv,
                    value: wu
                });
                emit('smartphone:invoice', xd);
            }
        })['catch'](() => { });
    } else {
        return {
            error: messages.PLAYER_OFFLINE
        };
    }
    return {
        name: wx,
        value: wu
    };
};
backend.bank_payInvoice = async (xe, xf) => {
    const xg = await vRP.getUserId(xe),
        xh = await Invoices().where('id', xf).first();
    if (!xh) {
        return {
            error: messages['BANK.INVOICE_NOT_FOUND']
        };
    }
    if (xh.payer_id != xg) {
        return {
            error: messages['BANK.INVOICE_NOT_YOURS']
        };
    }
    if (xh.paid) {
        return {
            error: messages['BANK.INVOICE_ALREADY_PAID']
        };
    }
    return lock(xg, async () => {
        const xi = await vRP.getBankMoney(xg);
        if (xi < xh.value) {
            return {
                error: messages['TRANSFER.NO_FUNDS']
            };
        } else {
            await vRP.setBankMoney(xg, xi - xh.value);
            const xj = await addBank(xh.payee_id, xh.value);
            if (xj) {
                const xk = await DB.getName(xg);
                pusher(xj, 'BANK_INVOICE_RECEIPT', {
                    name: xk,
                    reason: xh.reason,
                    value: xh.value
                });
            }
            await Invoices().where('id', xf).update({
                paid: 1,
                updated_at: unix()
            });
        }
    });
};
backend.bank_getInvoices = async xl => {
    const xm = await vRP.getUserId(xl),
        xn = await Invoices().where('paid', 0).where(xo => {
            xo.where('payer_id', xm).orWhere('payee_id', xm);
        }).orderBy('id', 'DESC').limit(100),
        xp = [
            xn.pluck('payer_id'),
            xn.pluck('payee_id')
        ].flat().unique(),
        xq = await DB.getNames(xp);
    xn.forEach(xr => {
        xr.name = xr.payer_id == xm ? xq[xr.payee_id] : xq[xr.payer_id];
    });
    return xn;
};
const Instagram = {
    get profiles() {
        return fluent('smartphone_instagram');
    },
    get posts() {
        return fluent('smartphone_instagram_posts');
    },
    get likes() {
        return fluent('smartphone_instagram_likes');
    },
    get followers() {
        return fluent('smartphone_instagram_followers');
    },
    get notifications() {
        return fluent('smartphone_instagram_notifications');
    },
    regex: /^[A-z0-9_\.]{1,24}$/,
    cache: null,
    forEachPost(xs) {
        return this.cache && this.cache.forEach(xs);
    },
    notifyAll(xt, xu, xv) {
        xt = xt.filter(xw => xw != xu);
        for (let xx of xt) {
            if (this.loggedIn.has(xx)) {
                for (let xy of Object.values(InstagramById)) {
                    if (xy.id === xx) {
                        pusher(xy.source, 'INSTAGRAM_NOTIFY', xv);
                    }
                }
            }
        }
        if (xt.length > 0) {
            fluent.query('INSERT INTO ' + Instagram.notifications.table + '\n      (profile_id, author_id, content, created_at) VALUES\n      ' + Array(xt.length).fill('(?,?,?,?)').join(','), xt.map(xz => [
                xz,
                xu,
                xv,
                unix()
            ]).flat());
        }
    },
    notify(ya, yb, yc) {
        this.notifyAll([ya], yb, yc);
    },
    loggedIn: new Set()
};

function getPost(yd) {
    for (let ye of Instagram.cache || []) {
        if (ye.id == yd) {
            return ye;
        }
    }
    return Instagram.posts.find(yd);
}
DB.ready(async yf => {
    const {
        profiles: yg,
        posts: yh,
        followers: yi,
        likes: yj,
        notifications: yk
    } = Instagram;
    if (!yf.includes(yg.table)) {
        await yg.create(yl => {
            yl.id();
            yl.int('user_id').nullable();
            yl.varchar('username');
            yl.varchar('name');
            yl.varchar('bio');
            yl.varchar('avatarURL').nullable();
            yl.tinyint('verified').default(0);
        });
        await yg.createIndex('user_id');
    }
    if (!yf.includes(yh.table)) {
        await yh.create(ym => {
            ym.id();
            ym.bigint('profile_id');
            ym.bigint('post_id').nullable();
            ym.varchar('image').nullable();
            ym.varchar('content').nullable();
            ym.bigint('created_at');
        });
        await yh.createIndex('profile_id');
        await yh.createIndex('post_id');
    }
    if (!yf.includes(yi.table)) {
        await yi.create(yn => {
            yn.bigint('follower_id').primary();
            yn.bigint('profile_id').primary();
        });
    }
    if (!yf.includes(yj.table)) {
        await yj.create(yo => {
            yo.bigint('post_id').primary();
            yo.bigint('profile_id').primary();
        });
    }
    if (!yf.includes(yk.table)) {
        await yk.create(yp => {
            yp.id();
            yp.int('profile_id');
            yp.int('author_id');
            yp.varchar('content', 512);
            yp.tinyint('saw').default(0);
            yp.int('created_at');
        });
        await yk.createIndex('profile_id');
    } else {
        await yk['delete']().where('created_at', '<=', unix() - 604800);
    }
});
const InstagramById = {},
    Stories = [];

function Story(yq, yr, ys, yt) {
    this.id = Story.lastId++;
    this.author = {
        username: yq.username,
        avatarURL: yq.avatarURL,
        verified: !!yq.verified
    };
    this.image = yr;
    this.content = ys;
    this.video = yt;
    this.created_at = unix();
}
Story.lastId = 1;
async function loadNestedPosts(yu) {
    const yv = yu.pluck('id'),
        yw = await Instagram.profiles.whereIn('id', yu.pluck('profile_id').unique()),
        yx = await Instagram.likes.whereIn('post_id', yv),
        yy = await Instagram.posts.whereIn('post_id', yv).select('id', 'post_id');
    for (let yz of yu) {
        yz.author = yw.find(za => za.id == yz.profile_id);
        yz.likes = yx.filter(zb => zb.post_id == yz.id).pluck('profile_id');
        yz.comments = yy.reduce((zc, zd) => zc + (zd.post_id == yz.id ? 1 : 0), 0);
    }
    return yu;
}
backend.ig_accounts = async ze => {
    const zf = await vRP.getUserId(ze);
    return Instagram.profiles.where({
        user_id: zf
    });
};
backend.ig_max_accounts = async zg => {
    const zh = await vRP.getUserId(zg);
    let zi = 1;
    for (let [zj, zk] of Object.entries(config$1.instagram_accounts || {})) {
        if (zj == '*' || await hasPermission(zh, zj)) {
            zi = Math.max(zk, zi);
        }
    }
    return zi;
};
backend.ig_login = async (zl, zm) => {
    const zn = await vRP.getUserId(zl),
        zo = await Instagram.profiles.find(zm);
    if (zo && zo.user_id == zn) {
        if (config$1.instagram_verify && zo.verified != 2) {
            const zp = await hasPermission(zn, config$1.instagram_verify);
            zo.verified = Number(zp);
            await Instagram.profiles.where({
                id: zm
            }).update({
                verified: zp
            });
            Instagram.forEachPost(zq => {
                if (zq.author.user_id == zn) {
                    zq.author.verified = zp;
                }
            });
        }
        zo.source = zl;
        InstagramById[zn] = zo;
        Instagram.loggedIn.add(zo.id);
        return zo;
    }
    return false;
};
backend.ig_logout = async zr => {
    const zs = await vRP.getUserId(zr),
        zt = InstagramById[zs];
    if (zt) {
        delete InstagramById[zs];
        Instagram.loggedIn['delete'](zt.id);
    }
};
backend.ig_register = async (zu, zv, zw, zx, zy) => {
    const zz = await vRP.getUserId(zu),
        aaa = await backend.ig_max_accounts(zu);
    const aab = await Instagram.profiles.where({
        user_id: zz
    }).count();
    if (aab >= aaa) {
        return {
            error: messages['INSTAGRAM.LIMIT_REACHED']
        };
    } else {
        if (!Number.isInteger(zz)) {
            return {
                error: messages['USER.NO_ID']
            };
        } else {
            if (!zw.match(Instagram.regex)) {
                return {
                    error: messages['INSTAGRAM.INVALID_USERNAME']
                };
            } else {
                if (!zv || zv.length > 32) {
                    return {
                        error: messages['INSTAGRAM.INVALID_NAME']
                    };
                }
            }
        }
    }
    const aac = await Instagram.profiles.where({
        username: zw
    }).first();
    if (aac) {
        return {
            error: messages['INSTAGRAM.USERNAME_TAKEN']
        };
    } else {
        const aad = config$1.instagram_verify && await hasPermission(zz, config$1.instagram_verify) || false;
        const aae = {
            user_id: zz,
            name: zv,
            username: zw,
            bio: zx,
            avatarURL: zy,
            verified: aad
        };
        aae.id = await Instagram.profiles.insert(aae).returnKeys();
        emit('smartphone:INSTAGRAM_REGISTER', {
            user_id: zz,
            id: aae.id
        });
        return aae;
    }
};
backend.ig_search = async (aaf, aag) => {
    return Instagram.profiles.where('username', 'LIKE', '%' + aag + '%').limit(20);
};
backend.ig_notifications = async aah => {
    const aai = await vRP.getUserId(aah);
    const aaj = InstagramById[aai];
    if (aaj) {
        return fluent.query('SELECT n.id,n.content,n.created_at,p.avatarURL FROM ' + Instagram.notifications.table + ' n LEFT JOIN ' + Instagram.profiles.table + ' p ON p.id=n.author_id WHERE profile_id=? ORDER BY id DESC LIMIT 50', [aaj.id]);
    }
};
backend.ig_saw_notifications = async aak => {
    const aal = await vRP.getUserId(aak);
    const aam = InstagramById[aal];
    if (aam) {
        await Instagram.notifications.where('profile_id', aam.id).update({
            saw: 1
        });
    }
};
backend.ig_getProfile = async (aan, aao) => {
    const aap = await vRP.getUserId(aan),
        aaq = InstagramById[aap] || {},
        aar = await Instagram.profiles.where('username', aao).first();
    if (!aar) {
        return;
    }
    aao = aar.id;
    const aas = await Instagram.followers.where('follower_id', aao).orWhere('profile_id', aao);
    aar.followers = aar.followers || 0;
    aar.followers += aas.reduce((aat, aau) => aat + (aau.profile_id == aao ? 1 : 0), 0);
    aar.following = aas.reduce((aav, aaw) => aav + (aaw.follower_id == aao ? 1 : 0), 0);
    aar.isFollowing = aas.some(aax => aax.follower_id == aao && aax.profile_id == aaq.id);
    aar.isFollowed = aas.some(aay => aay.follower_id == aaq.id);
    aar.posts = await Instagram.posts.where('profile_id', aao).whereNull('post_id').count();
    const aaz = await Instagram.posts.where('profile_id', aao).whereNull('post_id').select('id', 'image').limit(90).orderBy('id', 'DESC');
    return {
        profile: aar,
        posts: aaz
    };
};
backend.ig_isFollowing = async (aba, abb) => {
    const abc = await vRP.getUserId(aba),
        abd = InstagramById[abc];
    return Instagram.followers.where({
        follower_id: abd.id,
        profile_id: abb
    }).exists();
};
const follow_cache = {};
backend.ig_setFollow = async (abe, abf, abg) => {
    const abh = await vRP.getUserId(abe);
    const abi = InstagramById[abh];
    if (abg) {
        if (!follow_cache[abh + '-' + abf]) {
            follow_cache[abh + '-' + abf] = true;
            const abj = await getAuthor({
                profileId: abf
            });
            Instagram.notify(abj.id, abi.id, messages['INSTAGRAM.FOLLOW'].format({
                name: abi.name || abi.username
            }));
        }
        await Instagram.followers.insert({
            follower_id: abi.id,
            profile_id: abf
        });
    } else {
        await Instagram.followers.where({
            follower_id: abi.id,
            profile_id: abf
        })['delete']();
    }
    emit('smartphone:INSTAGRAM_FOLLOW', abi.id, abf, abg);
};
backend.ig_reply = async (abk, abl, abm) => {
    const abn = await vRP.getUserId(abk),
        abo = InstagramById[abn];
    if (spamBlocker(abk, 'igreply', 1)) {
        return;
    }
    if (!abo) {
        return {
            error: messages['INSTAGRAM.REOPEN']
        };
    }
    const abp = await getPost(abl);
    if (!abp) {
        return {
            error: messages['INSTAGRAM.POST_NOT_FOUND']
        };
    }
    const abq = {
        profile_id: abo.id,
        post_id: abl,
        content: abm,
        created_at: unix(),
        id: await Instagram.posts.insert(abq).returnKeys()
    };
    if (!abq.id) {
        return;
    }
    abq.author = {
        username: abo.username,
        avatarURL: abo.avatarURL
    };
    for (let abr of Instagram.cache) {
        if (abr.id == abl) {
            abr.comments += 1;
        }
    }
    sendWebhook({
        name: 'Instagram',
        content: {
            TIPO: 'Comentário',
            ID: abn,
            MENSAGEM: abm,
            USUARIO: abo.username
        }
    });
    const abt = await getAuthor({
        profileId: abp.profile_id
    });
    Instagram.notify(abt.id, abo.id, messages['INSTAGRAM.REPLY'].format({
        name: abo.name || abo.username
    }));
    pusher(-1, 'INSTAGRAM_REPLY', abq);
};
backend.ig_getPost = async (abu, abv) => {
    const abw = await Instagram.posts.where({
        id: abv
    }).orWhere({
        post_id: abv
    }),
        abx = await Instagram.profiles.whereIn('id', abw.pluck('profile_id').unique()).select('id', 'username', 'avatarURL', 'verified'),
        aby = await Instagram.likes.whereIn('post_id', abw.pluck('id'));
    for (let abz of abw) {
        abz.likes = aby.filter(aca => aca.post_id == abz.id).pluck('profile_id');
        abz.author = abx.find(acb => acb.id == abz.profile_id);
    }
    const acc = abw.find(acd => acd.id == abv);
    if (acc) {
        acc.comments = abw.filter(ace => ace.id != abv);
    }
    return acc;
};
backend.ig_getLikes = async (acf, acg) => {
    const ach = await Instagram.likes.where('post_id', acg).pluck('profile_id');
    return Instagram.profiles.whereIn('id', ach).pluckBy('avatarURL', 'username');
};
backend.ig_getFollowers = async (aci, acj) => {
    const ack = await Instagram.followers.where('profile_id', acj).limit(100).pluck('follower_id');
    return Instagram.profiles.whereIn('id', ack).pluckBy('avatarURL', 'username');
};
backend.ig_getFollowing = async (acl, acm) => {
    const acn = await Instagram.followers.where('follower_id', acm).limit(100).pluck('profile_id');
    return Instagram.profiles.whereIn('id', acn).pluckBy('avatarURL', 'username');
};
backend.ig_getLiked = async aco => {
    const acp = await vRP.getUserId(aco);
    const acq = InstagramById[acp];
    const acr = await Instagram.likes.where({
        profile_id: acq.id
    }).limit(100).pluck('post_id'),
        acs = await Instagram.posts.whereIn('id', acr).orderBy('id', 'DESC').limit(100);
    await loadNestedPosts(acs);
    return acs;
};
backend.ig_createStory = async (act, acu, acv, acw) => {
    const acx = await vRP.getUserId(act),
        acy = InstagramById[acx];
    if (spamBlocker(act, 'story', 1)) {
        return;
    }
    const acz = new Story(acy, acu, acv, acw);
    Stories.push(acz);
    sendWebhook({
        name: 'Instagram',
        content: {
            TIPO: 'Story',
            ID: acx,
            STORY: acv,
            FOTO: acu,
            VIDEO: acw,
            USUARIO: acy.username
        }
    });
    pusher(-1, 'INSTAGRAM_STORY', acz);
};
backend.ig_deleteStory = async (ada, adb) => {
    const adc = await vRP.getUserId(ada);
    const ade = Stories.find(adf => adf.id == adb);
    if (ade) {
        const adg = InstagramById[adc];
        if (adg && adg.username == ade.author.username || await isModerator(adc)) {
            Stories.splice(Stories.indexOf(ade), 1);
            pusher(-1, 'INSTAGRAM_DELETE_STORY', ade.id);
        }
    }
};
backend.ig_getStories = () => {
    return Stories.sort((adh, adi) => adh.author.username.localeCompare(adi.author.username));
};
backend.ig_createPost = async (adj, adk, adl) => {
    const adm = await vRP.getUserId(adj),
        adn = InstagramById[adm];
    if (!adn || spamBlocker(adj, 'post', 1)) {
        return;
    }
    const ado = {
        profile_id: adn.id,
        image: adk,
        content: adl,
        created_at: unix(),
        id: await Instagram.posts.insert(ado).returnKeys()
    };
    if (!ado.id) {
        return;
    }
    ado.author = {
        user_id: adm,
        name: adn.name,
        username: adn.username,
        avatarURL: adn.avatarURL,
        verified: !!adn.verified
    };
    ado.comments = 0;
    ado.likes = [];
    if (Instagram.cache.unshift(ado) > 100) {
        Instagram.cache.length = 100;
    }
    const adp = adl.match(/@\w+/g);
    if (adp && adp.length) {
        const adq = await Instagram.profiles.whereIn('username', adp.map(adr => adr.substr(1))).pluck('id');
        Instagram.notifyAll(adq, adn.id, messages['INSTAGRAM.MENTION'].format({
            name: adn.name || adn.username
        }));
    }
    const adt = await Instagram.followers.where('profile_id', adn.id).pluck('follower_id');
    Instagram.notifyAll(adt, adn.id, messages['INSTAGRAM.PUBLISH'].format({
        name: adn.name || adn.username
    }));
    sendWebhook({
        name: 'Instagram',
        content: {
            TIPO: 'Publicação',
            ID: adm,
            POST: adl,
            FOTO: adk,
            USUARIO: adn.username
        }
    });
    pusher(-1, 'INSTAGRAM_POST', ado);
};
backend.ig_deletePost = async (adu, adv) => {
    const adw = await vRP.getUserId(adu),
        adx = InstagramById[adw];
    if (!adv || !adx) {
        return;
    }
    const ady = await Instagram.posts.where({
        id: adv
    }).first();
    if (ady) {
        const adz = ady.profile_id == adx.id;
        if (adz || await isModerator(adw)) {
            await Instagram.likes.where({
                post_id: adv
            })['delete']();
            await Instagram.posts.where({
                id: adv
            }).orWhere({
                post_id: adv
            })['delete']();
            request.deleteManyImages(ady.image);
            pusher(-1, 'INSTAGRAM_DESTROY', adv);
            sendWebhook({
                name: 'Instagram',
                content: {
                    TIPO: 'Publicação apagada',
                    ID: adw,
                    'ID DA POSTAGEM': ady.id,
                    POSTAGEM: ady.content,
                    'POSTAGEM PROPRIA': adz ? 'SIM' : 'NÃO'
                }
            });
            Instagram.cache = Instagram.cache.filter(aea => aea.id != adv);
        }
    }
};
async function getAuthor({
    postId: aeb,
    profileId: aec
}) {
    let aed = aec || optional(await getPost(aeb), 'profile_id');
    if (!aed) {
        return;
    }
    const aee = Object.values(InstagramById);
    return aee.find(aef => aef && aef.id == aed) || await Instagram.profiles.find(aed);
}
const like_cache = {};
backend.ig_setLike = async (aeg, aeh, aei) => {
    const aej = await vRP.getUserId(aeg),
        {
            id: aek,
            name: ael,
            username: aem
        } = InstagramById[aej] || {};
    if (!aek) {
        return false;
    } else {
        if (aei) {
            if (!like_cache[aej + '-' + aeh]) {
                like_cache[aej + '-' + aeh] = true;
                const aen = await getAuthor({
                    postId: aeh
                });
                Instagram.notify(aen.id, aek, messages['INSTAGRAM.LIKE'].format({
                    name: ael || aem
                }));
            }
            await Instagram.likes.replace({
                post_id: aeh,
                profile_id: aek
            });
            Instagram.cache.filter(aeo => aeo.id === aeh).forEach(aep => {
                aep.likes.push(aek);
            });
        } else {
            await Instagram.likes.where({
                post_id: aeh,
                profile_id: aek
            })['delete']();
            Instagram.cache.filter(aeq => aeq.id === aeh).forEach(aer => {
                aer.likes = aer.likes.filter(aes => aes !== aek);
            });
        }
    }
    pusher(-1, 'INSTAGRAM_LIKE', {
        post_id: aeh,
        profile_id: aek,
        toggle: aei
    });
};
backend.ig_getTimeline = async () => {
    if (!Instagram.cache) {
        const aet = await Instagram.posts.whereNull('post_id').orderBy('id', 'DESC').limit(100),
            aeu = await Instagram.posts.whereIn('post_id', aet.pluck('id')),
            aev = await Instagram.profiles.whereIn('id', aet.pluck('profile_id').unique()).select('id', 'name', 'username', 'avatarURL', 'verified'),
            aew = await Instagram.likes.whereIn('post_id', aet.pluck('id')),
            aex = [];
        for (let aey of aet) {
            const aez = aev.find(afa => afa.id == aey.profile_id);
            if (!aez) {
                console.error('O usuário do instagram ' + aey.profile_id + ' não foi encontrado (foi excluído manualmente pelo banco de dados)');
                continue;
            }
            const {
                name: afb,
                username: afc,
                avatarURL: afd,
                verified: afe
            } = aez;
            aey.author = {
                name: afb || afc,
                username: afc,
                avatarURL: afd,
                verified: !!afe
            };
            aey.likes = aew.filter(aff => aff.post_id == aey.id).pluck('profile_id');
            aey.comments = aeu.filter(afg => afg.post_id == aey.id).length;
            aex.push(aey);
        }
        Instagram.cache = aex;
    }
    return Instagram.cache;
};
const cooldown = new Map();
backend.ig_updateProfile = async (afh, afi) => {
    const afj = await vRP.getUserId(afh),
        afk = InstagramById[afj];
    if (afk && afi) {
        const {
            name: afl,
            username: afm,
            bio: afn
        } = afi;
        if (afm != afk.username) {
            if (cooldown.get(afj) > unix()) {
                return {
                    error: messages['INSTAGRAM.WAIT_USERNAME_CHANGE']
                };
            }
            if (!afm.match(Instagram.regex)) {
                return {
                    error: messages['INSTAGRAM.INVALID_USERNAME']
                };
            }
            cooldown.set(afj, unix() + 3600);
            const afo = await Instagram.profiles.where({
                username: afm
            }).exists();
            if (afo) {
                return {
                    error: messages['INSTAGRAM.USERNAME_TAKEN']
                };
            }
            Stories.forEach(afp => {
                if (afp.author.username == afk.username) {
                    afp.author.username = afm;
                }
            });
            afk.username = afm;
        }
        await Instagram.profiles.where('id', afk.id).update({
            name: afl,
            username: afm,
            bio: afn
        });
        Instagram.forEachPost(afq => {
            if (afq.profile_id == afk.id) {
                afq.author.name = afl || afm;
                afq.author.username = afm;
            }
        });
    } else {
        return {
            error: messages.PROFILE_NOT_FOUND
        };
    }
};
backend.ig_changeAvatar = async (afr, afs) => {
    const aft = await vRP.getUserId(afr),
        afu = InstagramById[aft];
    if (afu && afs) {
        await Instagram.profiles.where('id', afu.id).update({
            avatarURL: afs
        });
        Instagram.forEachPost(afv => {
            if (afv.author.username == afu.username) {
                afv.author.avatarURL = afs;
            }
        });
    } else {
        return {
            error: messages.PROFILE_NOT_FOUND
        };
    }
};
on('vRP:playerLeave', afw => {
    const afx = InstagramById[afw];
    if (afx) {
        delete InstagramById[afw];
        Instagram.loggedIn['delete'](afx.id);
    }
});
const Twitter = {
    get profiles() {
        return fluent('smartphone_twitter_profiles');
    },
    get tweets() {
        return fluent('smartphone_twitter_tweets');
    },
    get likes() {
        return fluent('smartphone_twitter_likes');
    },
    get followers() {
        return fluent('smartphone_twitter_followers');
    },
    search(afy, afz) {
        if (afz) {
            afz = 'WHERE ' + afz;
        }
        return fluent.query('SELECT tweets.*,COUNT(likes.tweet_id) AS likes, \n    (SELECT COUNT(*) FROM smartphone_twitter_tweets WHERE tweet_id=tweets.id AND content IS NULL) AS retweets,\n    (SELECT COUNT(*) FROM smartphone_twitter_tweets WHERE tweet_id=tweets.id AND content IS NOT NULL) AS comments,\n    EXISTS(SELECT * FROM smartphone_twitter_likes WHERE tweet_id=tweets.id AND profile_id=?) AS liked,\n    EXISTS(SELECT id FROM smartphone_twitter_tweets WHERE tweet_id=tweets.id AND profile_id=? AND content IS NULL) AS retweeted,\n    users.id AS \'author.id\', users.name AS \'author.name\', users.username AS \'author.username\', users.avatarURL AS \'author.avatarURL\', users.verified AS \'author.verified\'\n    FROM smartphone_twitter_tweets tweets\n    LEFT JOIN smartphone_twitter_likes likes ON likes.tweet_id=tweets.id\n    LEFT JOIN smartphone_twitter_profiles users ON users.id=tweets.profile_id ' + (afz || '') + '\n    GROUP BY tweets.id ORDER BY tweets.id DESC LIMIT 100', [
            afy,
            afy
        ]);
    },
    findAll(aga) {
        return this.search(aga, 'tweets.tweet_id IS NULL OR tweets.content IS NULL');
    },
    findMany(agb, agc) {
        agc = agc.map(agd => parseInt(agd)).filter(agf => agf);
        if (!agc.length) {
            return [];
        }
        return this.search(agb, 'tweets.id IN (' + agc.join(',') + ')');
    },
    findAllFrom(agg, agh) {
        agh = parseInt(agh);
        return this.search(agg, 'tweets.profile_id=' + agh + ' AND (tweets.tweet_id IS NULL OR tweets.content IS NULL)').then(compact);
    },
    async findOne(agi, agj) {
        agj = parseInt(agj);
        const agk = compact(await this.search(agi, 'tweets.id=' + agj + ' OR (tweets.tweet_id=' + agj + ' AND tweets.content IS NOT NULL)')),
            agl = agk.find(agm => agm.id == agj);
        const agn = agk.filter(ago => ago != agl);
        return {
            tweet: agl,
            comments: agn
        };
    },
    async findSourceByTweet(agp) {
        const [agq] = await fluent.query('SELECT user_id FROM smartphone_twitter_tweets tw\n    LEFT JOIN smartphone_twitter_profiles pf ON tw.profile_id=pf.id\n    WHERE tw.id=?', [agp]);
        return agq && agq.user_id && await getSourceToNotify(agq.user_id);
    },
    __notify: {},
    async notify(agr, ags, agt, agu) {
        if (agu) {
            if (Array.isArray(agu)) {
                agu = agu.join('-');
            }
            if (this.__notify[agu]) {
                return;
            }
            this.__notify[agu] = true;
        }
        const agv = await this.findSourceByTweet(agr);
        if (agv != ags) {
            pusher(agv, 'TWITTER_NOTIFY', agt);
        }
    },
    async notifyProfile(agw, agx, agy, agz) {
        if (agz) {
            if (Array.isArray(agz)) {
                agz = agz.join('-');
            }
            if (this.__notify[agz]) {
                return;
            }
            this.__notify[agz] = true;
        }
        const aha = await Twitter.profiles.find(agw).pluck('user_id'),
            ahb = aha && await vRP.getUserSource(aha);
        if (ahb != agx) {
            pusher(ahb, 'TWITTER_NOTIFY', agy);
        }
    },
    users: {},
    timeline: []
};
DB.ready(async ahc => {
    const {
        profiles: ahd,
        tweets: ahe,
        likes: ahf,
        followers: ahg
    } = Twitter;
    if (!ahc.includes(ahd.table)) {
        await ahd.create(ahh => {
            ahh.id();
            ahh.int('user_id');
            ahh.varchar('name');
            ahh.varchar('username');
            ahh.varchar('avatarURL');
            ahh.varchar('bannerURL');
            ahh.varchar('bio').nullable();
            ahh.tinyint('verified').default(0);
            ahh.varchar('avatarURL');
        });
        await ahd.createIndex('user_id');
    }
    if (!ahc.includes(ahe.table)) {
        await ahe.create(ahi => {
            ahi.id();
            ahi.int('profile_id');
            ahi.bigint('tweet_id').nullable();
            ahi.varchar('content', 280).nullable();
            ahi.varchar('image').nullable();
            ahi.int('created_at');
        });
        await ahe.createIndex('profile_id');
        await ahe.createIndex('tweet_id');
    }
    if (!ahc.includes(ahf.table)) {
        await ahf.create(ahj => {
            ahj.bigint('tweet_id');
            ahj.bigint('profile_id');
        });
        await ahf.createIndex('tweet_id');
    }
    if (!ahc.includes(ahg.table)) {
        await ahg.create(ahk => {
            ahk.bigint('follower_id');
            ahk.bigint('profile_id');
        });
        await ahg.createIndex('profile_id');
    }
});
backend.twitter = async ahl => {
    const ahm = await vRP.getUserId(ahl);
    const ahn = await Twitter.profiles.where({
        user_id: ahm
    }).first();
    if (ahn) {
        Twitter.users[ahm] = ahn;
        if (ahn.verified != 2) {
            const aho = config$1.twitter_verify || config$1.instagram_verify;
            if (aho) {
                const ahp = await hasPermission(ahm, aho);
                if (ahn.verified != ahp) {
                    await Twitter.profiles.where('id', ahn.id).update({
                        verified: ahp
                    });
                }
            }
        }
    }
    return ahn;
};
backend.twitter_register = async (ahq, ahr) => {
    const ahs = await vRP.getUserId(ahq);
    ahr = trimObject(ahr);
    ahr.user_id = ahs;
    if (!ahr) {
        return {
            error: messages['TWITTER.INVALID_FORM']
        };
    }
    let {
        name: aht,
        username: ahu,
        bio: ahv
    } = ahr;
    if (!aht || aht.length > 24) {
        return {
            error: messages['TWITTER.INVALID_NAME']
        };
    } else {
        if (!ahu || ahu.length > 16) {
            return {
                error: messages['TWITTER.INVALID_USERNAME']
            };
        } else {
            if (ahv && ahv.length > 255) {
                return {
                    error: messages['TWITTER.INVALID_BIO']
                };
            }
        }
    }
    const ahw = await Twitter.profiles.where({
        username: ahu
    }).exists();
    if (ahw) {
        return {
            error: messages['TWITTER.USERNAME_TAKEN']
        };
    } else {
        ahr.avatarURL = 'https://fivem.jesteriruka.dev/stock/twitter_egg.png';
        ahr.bannerURL = 'https://www.colorhexa.com/cccccc.png';
        const ahx = await Twitter.profiles.insert(ahr).returnKeys();
        return !ahx && {
            error: messages['TWITTER.FAIL_TO_CREATE']
        };
    }
};
backend.twitter_save = async (ahy, ahz) => {
    const aia = await vRP.getUserId(ahy),
        aib = Twitter.users[aia];
    ahz = trimObject(ahz);
    if (aib) {
        if (!ahz.name) {
            return {
                error: messages['TWITTER.INVALID_NAME']
            };
        }
        if (!ahz.username) {
            return {
                error: messages['TWITTER.INVALID_USERNAME']
            };
        }
        if (aib.username != ahz.username && await Twitter.profiles.where('username', ahz.username).exists()) {
            return {
                error: messages['TWITTER.USERNAME_TAKEN']
            };
        }
        const aic = extract(ahz, 'name', 'username', 'bio', 'avatarURL', 'bannerURL');
        Object.assign(aib, aic);
        await Twitter.profiles.where('id', aib.id).update(aic);
        return aib;
    }
};
async function loadRetweets(aid, aie) {
    const aif = compact(await Twitter.findMany(aid, aie.pluck('tweet_id')));
    for (let aig of aie) {
        if (aig.tweet_id && aig.content == null) {
            const aih = aif.find(aii => aii.id == aig.tweet_id);
            if (aih) {
                aig.retweeted_by = aig.author.name;
                Object.assign(aig, except(aih, 'id', 'profile_id', 'tweet_id'));
            }
        }
    }
}
backend.twitter_timeline = async aij => {
    const aik = await vRP.getUserId(aij),
        ail = Twitter.users[aik];
    if (ail) {
        const aim = compact(await Twitter.findAll(ail.id));
        await loadRetweets(ail.id, aim);
        return aim;
    } else {
        return [];
    }
};
backend.twitter_view = async (ain, aio) => {
    const aip = await vRP.getUserId(ain),
        aiq = Twitter.users[aip];
    if (aiq) {
        return Twitter.findOne(aiq.id, aio);
    }
};
const getProfile$1 = memoized(air => {
    for (let ais of Object.values(Twitter.users))
        if (ais && ais.id == air) {
            return ais;
        }
    return Twitter.profiles.find(air);
}, 30000);
async function loadFollowers(ait, aiu) {
    const [aiv] = await fluent.query('SELECT COALESCE(SUM(if(follower_id=?, 1, 0)),0) AS following,\n  COALESCE(SUM(if(profile_id=?, 1, 0)),0) AS followers, if(follower_id=' + ait + ', 1, 0) AS isFollowed \n  FROM smartphone_twitter_followers fol WHERE follower_id=? OR profile_id = ?', Array(4).fill(aiu.id));
    Object.assign(aiu, aiv);
}
backend.twitter_profile = async (aiw, aix) => {
    const aiy = await vRP.getUserId(aiw);
    const aiz = Twitter.users[aiy];
    if (aiz) {
        const aja = await getProfile$1(aix);
        await loadFollowers(aiz.id, aja);
        const ajb = await Twitter.findAllFrom(aiz.id, aix);
        await loadRetweets(aiz.id, ajb);
        return {
            profile: aja,
            posts: ajb
        };
    }
};
backend.twitter_store = async (ajc, ajd, aje) => {
    const ajf = await vRP.getUserId(ajc),
        ajg = Twitter.users[ajf];
    if (!ajg) {
        return {
            error: messages['TWITTER.LOGIN_EXPIRED']
        };
    }
    if (!ajd || !(ajd = ajd.trim())) {
        return {
            error: messages['TWITTER.INVALID_TWEET']
        };
    }
    const ajh = {
        profile_id: ajg.id,
        content: ajd,
        image: aje,
        created_at: unix(),
        id: await Twitter.tweets.insert(ajh).returnKeys()
    };
    if (!ajh.id) {
        return {
            error: messages['TWITTER.FAIL_TO_TWEET']
        };
    }
    pusher(-1, 'TWITTER_TWEET', {
        ...ajh,
        author: ajg,
        likes: 0,
        comments: 0,
        retweets: 0
    });
    sendWebhook({
        name: 'Twitter',
        content: {
            TIPO: 'Tweet',
            ID: ajf,
            USUARIO: ajg.username,
            TEXTO: ajd
        }
    });
    return ajh;
};
backend.twitter_reply = async (aji, ajj, ajk) => {
    const ajl = await vRP.getUserId(aji),
        ajm = Twitter.users[ajl];
    if (spamBlocker(aji, 'ttreply', 1)) {
        return;
    }
    if (!ajm) {
        return {
            error: 'Login expirado'
        };
    }
    if (!ajj || !Number.isInteger(ajj)) {
        return {
            error: 'Tweet inválido'
        };
    }
    if (!ajk || ajk.length > 280) {
        return {
            error: 'Conteúdo inválido'
        };
    }
    const ajn = {
        profile_id: ajm.id,
        tweet_id: ajj,
        content: ajk,
        created_at: unix()
    },
        ajo = await Twitter.tweets.insert(ajn).returnKeys(),
        ajp = {};
    ajp.error = messages['TWITTER.INVALID_TWEET'];
    if (!ajo) {
        return ajp;
    }
    ajn.id = ajo;
    ajn.author = ajm;
    for (let ajq of [
        'likes',
        'retweets',
        'comments'
    ])
        ajn[ajq] = 0;
    pusher(-1, 'TWITTER_REPLY', parseInt(ajj));
    sendWebhook({
        name: 'Twitter',
        content: {
            TIPO: 'Comentário',
            ID: ajl,
            USUARIO: ajm.username,
            TEXTO: ajk
        }
    });
    Twitter.notify(ajj, aji, messages['TWITTER.REPLY'].format({
        name: ajm.name
    }));
    return ajn;
};
backend.twitter_retweet = async (ajr, ajs) => {
    const ajt = await vRP.getUserId(ajr);
    const aju = Twitter.users[ajt];
    if (aju && !spamBlocker(ajr, 'retweet-' + ajs, 1)) {
        await Twitter.tweets.insert({
            profile_id: aju.id,
            tweet_id: ajs,
            created_at: unix()
        });
        pusher(-1, 'TWITTER_RETWEET', parseInt(ajs));
        Twitter.notify(ajs, ajr, messages['TWITTER.RETWEET'].format({
            name: aju.name
        }), [
            aju.id,
            'rt',
            ajs
        ]);
        return true;
    }
};
backend.twitter_unretweet = async (ajv, ajw) => {
    const ajx = await vRP.getUserId(ajv),
        ajy = Twitter.users[ajx];
    if (ajy && !spamBlocker(ajv, 'unretweet-' + ajw, 1)) {
        await Twitter.tweets.where({
            profile_id: ajy.id,
            tweet_id: ajw
        }).whereNull('content')['delete']();
        pusher(-1, 'TWITTER_UNRETWEET', parseInt(ajw));
        return false;
    }
};
backend.twitter_like = async (ajz, aka) => {
    const akb = await vRP.getUserId(ajz);
    const akc = Twitter.users[akb];
    if (akc && !spamBlocker(ajz, 'like-' + aka, 1)) {
        await Twitter.likes.insert({
            profile_id: akc.id,
            tweet_id: aka
        });
        pusher(-1, 'TWITTER_LIKE', parseInt(aka));
        Twitter.notify(aka, ajz, messages['TWITTER.LIKE'].format({
            name: akc.name
        }), [
            akc.id,
            'like',
            aka
        ]);
        return true;
    }
};
backend.twitter_dislike = async (akd, ake) => {
    const akf = await vRP.getUserId(akd);
    const akg = Twitter.users[akf];
    if (akg && !spamBlocker(akd, 'dislike-' + ake, 1)) {
        await Twitter.likes.where({
            profile_id: akg.id,
            tweet_id: ake
        })['delete']();
        pusher(-1, 'TWITTER_DISLIKE', parseInt(ake));
        return false;
    }
};
backend.twitter_follow = async (akh, aki) => {
    const akj = await vRP.getUserId(akh),
        akk = Twitter.users[akj];
    if (akk && !spamBlocker(akh, 'follow-' + aki, 1)) {
        await Twitter.followers.insert({
            follower_id: akk.id,
            profile_id: aki
        });
        Twitter.notifyProfile(aki, akh, messages['TWITTER.FOLLOW'].format({
            name: akk.name
        }), [
            akk.id,
            'follow',
            aki
        ]);
        return true;
    }
};
backend.twitter_unfollow = async (akl, akm) => {
    const akn = await vRP.getUserId(akl);
    const ako = Twitter.users[akn];
    if (ako && !spamBlocker(akl, 'follow-' + akm, 1)) {
        await Twitter.followers.where({
            follower_id: ako.id,
            profile_id: akm
        })['delete']();
        return true;
    }
};
backend.twitter_destroy = async (akp, akq) => {
    const akr = await vRP.getUserId(akp),
        aks = Twitter.users[akr];
    if (aks) {
        const akt = await Twitter.tweets.find(akq),
            aku = akt.profile_id == aks.id;
        if (aku || await isModerator(akr)) {
            const akv = await Twitter.tweets.where({
                id: akq
            }).orWhere(akw => akw.where('tweet_id', akq).whereNull('content')).pluck('id');
            await Twitter.tweets.whereIn('id', akv)['delete']();
            await Twitter.likes.whereIn('tweet_id', akv)['delete']();
            pusher(-1, 'TWITTER_DESTROY', akq);
            sendWebhook({
                name: 'Twitter',
                content: {
                    TIPO: 'Tweet apagado',
                    ID: akr,
                    'ID DA POSTAGEM': akq,
                    POSTAGEM: akt.content,
                    'POSTAGEM PROPRIA': aku ? 'SIM' : 'NÃO'
                }
            });
        }
    }
};
on('vRP:playerLeave', akx => delete Twitter.users[akx]);
Object.defineProperty(globalThis, 'PayPal', {
    get: () => fluent('smartphone_paypal_transactions')
});
const PayPalTable = {
    table: 'vrp_user_moneys',
    key: 'user_id'
};
DB.ready(async aky => {
    if (!aky.includes(PayPal.table) && isEnabled('paypal')) {
        await PayPal.create(akz => {
            akz.id();
            akz.bigint('user_id');
            akz.bigint('target');
            akz.varchar('type').default('payment');
            akz.varchar('description').nullable();
            akz.bigint('value');
            akz.bigint('created_at');
        });
        await PayPal.createIndex('user_id');
        await PayPal.createIndex('target');
        if (aky.includes('vrp_user_moneys')) {
            if (!await DB.hasColumn('vrp_user_moneys', 'paypal')) {
                await fluent.query('ALTER TABLE vrp_user_moneys ADD COLUMN paypal INT DEFAULT 0');
            }
        } else {
            if (aky.includes('vrp_users')) {
                if (!await DB.hasColumn('vrp_users', 'paypal')) {
                    await fluent.query('ALTER TABLE vrp_users ADD COLUMN paypal INT DEFAULT 0');
                }
            } else {
                if (aky.includes('summerz_characters')) {
                    if (!await DB.hasColumn('summerz_characters', 'paypal')) {
                        await fluent.query('ALTER TABLE summerz_characters ADD COLUMN paypal INT DEFAULT 0');
                    }
                }
            }
        }
    }
    if (config$1.snowflake) {
        Object.assign(PayPalTable, await exports.smartphone.getPaypalTable());
    } else {
        if (await DB.hasColumn('vrp_users', 'paypal')) {
            PayPalTable.table = 'vrp_users';
            PayPalTable.key = 'id';
        } else {
            if (await DB.hasColumn('vrp_characters', 'paypal')) {
                PayPalTable.table = 'vrp_characters';
                PayPalTable.key = 'user_id';
            } else {
                if (await DB.hasColumn('zusers', 'paypal')) {
                    PayPalTable.table = 'zusers';
                    PayPalTable.key = 'id';
                } else {
                    if (await DB.hasColumn('summerz_characters', 'paypal')) {
                        PayPalTable.table = 'summerz_characters';
                        PayPalTable.key = 'id';
                    }
                }
            }
        }
    }
});
async function getPaypalBalance({
    source: ala,
    user_id: alb
}) {
    if (!Number.isInteger(alb)) {
        alb = await vRP.getUserId(ala);
    }
    return parseInt(await fluent(PayPalTable.table).where(PayPalTable.key, alb).first().pluck('paypal')) || 0;
}
async function setPaypalBalance(alc, ald) {
    await fluent(PayPalTable.table).update({
        paypal: ald
    }).where(PayPalTable.key, alc);
}
async function addPaypalBalance(ale, alf) {
    await fluent(PayPalTable.table).update({
        paypal: fluent.raw('paypal + ' + Number(alf))
    }).where(PayPalTable.key, ale);
}
async function removePaypalBalance(alg, alh) {
    await fluent(PayPalTable.table).update({
        paypal: fluent.raw('paypal - ' + Number(alh))
    }).where(PayPalTable.key, alg);
}
exports('getPaypalBalance', ali => getPaypalBalance({
    user_id: ali
}));
exports('setPaypalBalance', setPaypalBalance);
exports('addPaypalBalance', addPaypalBalance);
exports('delPaypalBalance', removePaypalBalance);
backend.paypal_index = async alj => {
    const alk = await vRP.getUserId(alj),
        alm = await vRP.getBankMoney(alk);
    const aln = await getPaypalBalance({
        user_id: alk
    });
    const alo = await PayPal.where({
        user_id: alk
    }).orWhere({
        target: alk
    }).orderBy('id', 'DESC').limit(100),
        alp = await DB.getNames(alo.pluck('user_id'), alo.pluck('target'));
    alo.forEach(alq => {
        alq.fullName = alp[alq.user_id == alk ? alq.target : alq.user_id];
    });
    return {
        bank: alm,
        balance: aln,
        transactions: alo
    };
};
const fee = config$1.transaction_fee && config$1.transaction_fee.paypal;
backend.paypal_send = async (alr, als, alt, alu) => {
    const alv = await vRP.getUserId(alr);
    als = parseInt(als);
    if (alt <= 0) {
        return {
            error: messages.INVALID_VALUE
        };
    } else {
        if (als == alv) {
            return {
                error: messages['TRANSFER.SELF']
            };
        } else {
            if (!await DB.getIdentityByUserId(als)) {
                return {
                    error: messages.PASSPORT_NOT_FOUND
                };
            }
        }
    }
    return lock(alv, async () => {
        let alw = await getPaypalBalance({
            user_id: alv
        });
        if (alw < alt) {
            return {
                error: messages['TRANSFER.NO_FUNDS']
            };
        } else {
            alw -= alt;
            await setPaypalBalance(alv, alw);
            await addPaypalBalance(als, Math.floor(alt * (fee ? 1 - fee : 1)));
            const alx = {
                user_id: alv,
                target: als,
                description: alu,
                value: alt,
                created_at: unix(),
                id: await PayPal.insert(alx).returnKeys(),
                fullName: await DB.getName(als),
                type: 'payment'
            };
            getSourceToNotify(als).then(aly => {
                if (aly) {
                    pusher(aly, 'PAYPAL', {
                        sender: PhoneByUserId[alv],
                        value: alt
                    });
                }
            });
            sendWebhook({
                name: 'PayPal',
                content: {
                    ID: alv,
                    VALOR: alt.toLocaleString(),
                    'QUEM RECEBEU': als
                }
            });
            emit('smartphone:paypal_send', alv, als, alt);
            return {
                transaction: alx,
                balance: alw
            };
        }
    });
};
backend.paypal_transfer = async (alz, ama) => {
    const amb = await vRP.getUserId(alz);
    ama = Number(ama);
    if (ama <= 0) {
        return {
            error: messages.INVALID_VALUE
        };
    }
    return lock(amb, async () => {
        let amc = await getPaypalBalance({
            user_id: amb
        });
        if (amc < ama) {
            return {
                error: messages['TRANSFER.NO_FUNDS']
            };
        } else {
            await setPaypalBalance(amb, amc - ama);
            const amd = await vRP.getBankMoney(amb);
            await vRP.giveBankMoney(amb, ama);
            const ame = {
                user_id: amb,
                target: amb,
                type: 'withdraw',
                value: ama,
                created_at: unix(),
                id: await PayPal.insert(ame).returnKeys()
            };
            sendWebhook({
                name: 'PayPal',
                content: {
                    ID: amb,
                    SACOU: ama.toLocaleString(),
                    'BANCO ANTIGO': amd,
                    'BANCO NOVO': await vRP.getBankMoney(amb)
                }
            });
            emit('smartphone:paypal_withdraw', amb, ama);
            return {
                transaction: ame
            };
        }
    });
};
backend.paypal_deposit = async (amf, amg) => {
    const amh = await vRP.getUserId(amf);
    if (amg <= 0) {
        return {
            error: messages.INVALID_VALUE
        };
    }
    return lock(amh, async () => {
        const ami = await vRP.getBankMoney(amh);
        if (ami < amg) {
            return {
                error: messages['TRANSFER.NO_FUNDS']
            };
        } else {
            vRP._setBankMoney(amh, ami - amg);
            await addPaypalBalance(amh, amg);
            const amj = {
                user_id: amh,
                target: amh,
                type: 'deposit',
                value: amg,
                created_at: unix(),
                id: await PayPal.insert(amj).returnKeys()
            };
            sendWebhook({
                name: 'PayPal',
                content: {
                    ID: amh,
                    DEPOSITOU: amg.toLocaleString(),
                    'SALDO NOVO': await getPaypalBalance({
                        user_id: amh
                    })
                }
            });
            emit('smartphone:paypal_deposit', amh, amg);
            return {
                transaction: amj
            };
        }
    });
};
const Tor = {
    get messages() {
        return fluent('smartphone_tor_messages');
    },
    get payments() {
        return fluent('smartphone_tor_payments');
    },
    users: {},
    pubsub: {},
    lastId: {},
    ads: [],
    getId(amk) {
        return GetHashKey(config$1.token + amk) + 2147483648;
    }
};
RegisterCommand('tor_find', async (aml, [amm, amn = 100000]) => {
    if (aml != 0) {
        return;
    }
    if (!amm) {
        console.log('Insira o id do tor: tor_find 123456789');
    } else {
        for (let amo = 1; amo <= amn; amo += 1) {
            if (Tor.getId(amo) == amm) {
                return console.log('ID do jogador: ' + amo);
            }
        }
        console.log('Jogador não encontrado');
    }
});
on('smartphone:enter', (amp, amq) => Tor.users[Tor.getId(amp)] = amq);
on('smartphone:leave', (amr, ams) => {
    delete Tor.users[Tor.getId(amr)];
    backend.tor_subscribe(ams, []);
});
backend.tor_subscribe = (amt, amu) => {
    for (let amv of Object.values(Tor.pubsub)) {
        amv['delete'](amt);
    }
    if (Array.isArray(amu)) {
        for (let amw of amu) {
            if (amw in Tor.pubsub) {
                Tor.pubsub[amw].add(amt);
            } else {
                Tor.pubsub[amw] = new Set([amt]);
            }
        }
    }
};
backend.tor_resume = async (amx, amy, amz = false) => {
    const ana = await vRP.getUserId(amx),
        anb = Tor.getId(ana),
        anc = Object.fromEntries(amy.map(ane => [
            ane,
            amz ? ane : createDM(anb, ane)
        ]));
    const anf = await Tor.messages.whereIn('id', Object.values(anc).map(ang => Tor.lastId[ang] || 0));
    for (let [anh, ani] of Object.entries(anc)) {
        anc[anh] = anf.find(anj => anj.channel == ani) || false;
    }
    return anc;
};
DB.ready(async ank => {
    const {
        messages: anl,
        payments: anm
    } = Tor;
    if (!ank.includes(anl.table)) {
        await anl.create(ann => {
            ann.id();
            ann.varchar('channel', 24).default('geral');
            ann.varchar('sender');
            ann.varchar('image', 512).nullable();
            ann.varchar('location').nullable();
            ann.varchar('content', 500).nullable();
            ann.bigint('created_at');
        });
        await anl.createIndex('channel');
        await anl.createIndex('sender');
    } else {
        if (!await DB.hasColumn(anl.table, 'location')) {
            await fluent.query('ALTER TABLE ' + anl.table + ' ADD COLUMN location VARCHAR(255) DEFAULT NULL AFTER image');
        }
        fluent.query('SELECT `channel`,MAX(id) AS id FROM smartphone_tor_messages GROUP BY `channel`').then(ano => {
            Tor.lastId = Object.fromEntries(ano.map(anp => [
                anp.channel,
                anp.id
            ]));
        });
    }
    if (!ank.includes(anm.table)) {
        await anm.create(anq => {
            anq.id();
            anq.bigint('sender');
            anq.bigint('target');
            anq.int('amount');
            anq.bigint('created_at');
        });
        await anm.createIndex('sender');
        await anm.createIndex('target');
    }
});

function createDM(anr, ans) {
    const ant = Math.min(anr, ans).toString(16);
    const anu = Math.max(anr, ans).toString(16);
    return 'dm:' + ant + '-' + anu;
}
backend.tor_id = async anv => {
    return Tor.getId(await vRP.getUserId(anv));
};
backend.tor_messages = async (anw, anx) => {
    const any = Tor.getId(await vRP.getUserId(anw));
    if (Number.isInteger(anx)) {
        anx = createDM(any, anx);
    } else {
        if (anx.includes('dm:')) {
            return [];
        }
    }
    const anz = await Tor.messages.where('channel', anx).orderBy('id', 'DESC').limit(100);
    for (let aoa of anz) {
        aoa.location = aoa.location && JSON.parse(aoa.location);
    }
    return anz.sort((aob, aoc) => aob.id - aoc.id);
};
backend.tor_send = async (aod, aoe, aof, aog = null, aoh = null) => {
    const aoi = await vRP.getUserId(aod),
        aoj = Tor.getId(aoi),
        aok = Number.isInteger(aoe);
    if (!aoe || aof.length > 255 || spamBlocker(aod) || optional.func(aoe, 'includes', 'dm:')) {
        return;
    }
    const aol = aok ? [
        aod,
        Tor.users[aoe]
    ] : Tor.pubsub[aoe] || new Set(),
        aom = aok ? createDM(aoj, aoe) : aoe;
    if (!aok) {
        aol.add(aod);
    }
    const aon = {
        channel: aom,
        sender: aoj,
        content: aof,
        image: aog,
        location: aoh,
        created_at: unix(),
        id: await Tor.messages.insert(aon).returnKeys()
    };
    if (!aon.id) {
        return {
            message: 'Message without id'
        };
    }
    Tor.lastId[aom] = aon.id;
    sendWebhook({
        name: 'DeepWeb',
        content: {
            ID: aoi,
            CANAL: !aok && aoe,
            DESTINATARIO: aok && aoe,
            MENSAGEM: aof,
            LOCAL: aoh,
            FOTO: aog
        }
    });
    if (aoh) {
        aon.location = JSON.parse(aoh);
    }
    aol.forEach(aoo => pusher(aoo, 'TOR_MESSAGE', aon));
};
global.exports('createTorMessage', async (aop, aoq, aor, aos = null, aot = null) => {
    const aou = Tor.getId(aoq),
        aov = createDM(aop, aou);
    if (Array.isArray(aot)) {
        aot = JSON.stringify(aot);
    } else {
        if (aot != null) {
            throw new Error('sendTorMessage: location must be an array');
        }
    }
    const aow = {
        channel: aov,
        sender: aop,
        content: aor,
        image: aos,
        location: aot,
        created_at: unix(),
        id: await Tor.messages.insert(aow).returnKeys()
    };
    Tor.lastId[aov] = aow.id;
    const aox = await getSourceToNotify(aoq);
    pusher(aox, 'TOR_MESSAGE', aow);
    return aow;
});
backend.tor_ads = () => Tor.ads;
backend.tor_publish = async (aoy, aoz) => {
    const apa = await vRP.getUserId(aoy),
        apb = Tor.getId(apa);
    Tor.ads.push({
        id: GetHashKey(Date.now() + apb),
        anom_id: apb,
        ...aoz
    });
    sendWebhook({
        name: 'DeepWeb',
        content: {
            ID: apa,
            TIPO: 'Publicação de anúncio',
            ANUNCIO: aoz.title,
            DESCRICAO: aoz.description,
            FOTO: aoz.image
        }
    });
};
backend.tor_destroy_ad = async (apc, apd) => {
    const ape = await vRP.getUserId(apc);
    const apf = Tor.getId(ape),
        apg = Tor.ads.find(aph => aph.id == apd);
    if (apg.anom_id == apf || await isModerator(ape)) {
        Tor.ads.splice(Tor.ads.indexOf(apg), 1);
        sendWebhook({
            name: 'DeepWeb',
            content: {
                ID: ape,
                TIPO: 'Remoção de anúncio',
                ANUNCIO: apg.title,
                DESCRICAO: apg.description,
                FOTO: apg.image,
                PROPRIO: apg.anom_id == apf ? 'Sim' : 'Não'
            }
        });
    }
};
backend.tor_payments = async api => {
    const apj = await vRP.getUserId(api);
    const apk = Tor.getId(apj);
    return Tor.payments.where('sender', apk).orWhere('target', apk).orderBy('id', 'DESC').limit(50);
};
backend.tor_blocked = async apl => {
    const apm = await vRP.getUserId(apl);
    if (await hasPermission(apm, config$1.tor_blocked)) {
        return messages['TOR.BLOCKED'];
    }
    return false;
};
backend.tor_pay = async (apn, apo, app) => {
    const apq = await vRP.getUserId(apn),
        apr = Tor.getId(apq),
        aps = Tor.users[apo];
    if (!aps) {
        return {
            error: messages['TOR.USER_OFFLINE']
        };
    } else {
        if (aps == apn) {
            return {
                error: messages['TRANSFER.SELF']
            };
        } else {
            if (!Number.isInteger(app) || app <= 0) {
                return {
                    error: messages.INVALID_VALUE
                };
            }
        }
    }
    return lock(apq, async () => {
        const apt = await vRP.getBankMoney(apq);
        if (apt >= app) {
            await vRP.setBankMoney(apq, apt - app);
            const apu = await vRP.getUserId(aps);
            await addBank(apu, app);
            await Tor.payments.insert({
                sender: apr,
                target: apo,
                amount: app,
                created_at: unix()
            });
            const apv = currency(app);
            pusher(aps, 'TOR_NOTIFY', messages['TOR.PAYMENT_NOTIFY'].format({
                value: apv,
                user: apr
            }));
            pusher(apn, 'TOR_NOTIFY', messages['TOR.PAYMENT_RECEIPT'].format({
                value: apv,
                user: apr
            }));
            sendWebhook({
                name: 'DeepWeb',
                content: {
                    ID: apq + ' (' + apr + ')',
                    TIPO: 'Pagamento',
                    DESTINATARIO: apu + ' (' + apo + ')',
                    VALOR: app
                }
            });
        }
    });
};
globalThis.WhatsApp = {
    get profiles() {
        return fluent('smartphone_whatsapp');
    },
    get channels() {
        return fluent('smartphone_whatsapp_channels');
    },
    get messages() {
        return fluent('smartphone_whatsapp_messages');
    },
    get groups() {
        return fluent('smartphone_whatsapp_groups');
    },
    cache: {
        groups: []
    },
    channelCache: {},
    channelHash(...apw) {
        return GetHashKey(apw.join(';'));
    },
    async getChannel(apx, apy) {
        const apz = this.channelHash(apx, apy);
        if (this.channelCache[apz]) {
            return this.channelCache[apz];
        }
        const aqa = await this.channels.whereIn('sender', [
            apx,
            apy
        ]).whereIn('target', [
            apx,
            apy
        ]).first();
        if (aqa) {
            return this.channelCache[apz] = aqa.id;
        }
        const aqb = await this.channels.insert({
            sender: apx,
            target: apy
        }).returnKeys();
        return this.channelCache[apz] = aqb;
    }
};
class Group {
    constructor({
        id: aqc,
        name: aqd,
        avatarURL: aqe,
        owner: aqf,
        members: aqg,
        created_at: aqh,
        message: aqi
    }) {
        this.id = aqc;
        this.name = aqd;
        this.avatarURL = aqe;
        this.owner = aqf;
        this.members = aqg;
        this.created_at = aqh;
        this.message = aqi;
    }
    get ['channelId']() {
        return 1000000000 + this.id;
    }
    ['getOnline']() {
        return [
            this.owner,
            ...this.members
        ].map(aqj => SourceByPhone[aqj]).filter(Number.isInteger);
    }
    ['pusher'](aqk, aql) {
        this.getOnline().forEach(aqm => pusher(aqm, aqk, aql));
    }
    ['update'](aqn = []) {
        const aqo = {};
        for (let aqp of aqn) {
            aqo[aqp] = aqp === 'members' ? JSON.stringify(this.members) : this[aqp];
        }
        return WhatsApp.groups.update(aqo).where({
            id: this.id
        }).then(() => true);
    }
}
Group.MAX_MEMBERS = 100;
DB.ready(async aqq => {
    const {
        profiles: aqr,
        channels: aqs,
        messages: aqt,
        groups: aqu
    } = WhatsApp;
    if (!aqq.includes(aqr.table)) {
        await aqr.create(aqv => {
            aqv.varchar('owner', 32).primary();
            aqv.varchar('avatarURL').nullable();
            aqv.tinyint('read_receipts').default(1);
        });
    }
    if (!aqq.includes(aqs.table)) {
        await aqs.create(aqw => {
            aqw.id();
            aqw.varchar('sender', 50);
            aqw.varchar('target', 50);
        });
        await aqs.createIndex('sender');
        await aqs.createIndex('target');
    }
    if (!aqq.includes(aqt.table)) {
        await aqt.create(aqx => {
            aqx.id();
            aqx.bigint('channel_id').unsigned();
            aqx.varchar('sender', 50);
            aqx.varchar('image', 512).nullable();
            aqx.varchar('location').nullable();
            aqx.varchar('content', 500).nullable();
            aqx.varchar('deleted_by').nullable();
            aqx.tinyint('readed').default(0);
            aqx.bigint('saw_at').default(0);
            aqx.bigint('created_at');
        });
        await aqt.createIndex('sender');
        await aqt.createIndex('channel_id');
    } else {
        if (await DB.hasColumn(aqt.table, 'target')) {
            console.time('whatsapp_migration');
            await fluent.query('TRUNCATE ' + aqt.table);
            await fluent.query('ALTER TABLE ' + aqt.table + ' DROP COLUMN target');
            await fluent.query('ALTER TABLE ' + aqt.table + ' ADD COLUMN channel_id BIGINT UNSIGNED NOT NULL AFTER id');
            await aqt.createIndex('channel_id');
            console.timeEnd('whatsapp_migration');
            console.log('WhatsApp migration finished, restart the script if this took too long');
        }
    }
    if (!aqq.includes(aqu.table)) {
        await aqu.create(aqy => {
            aqy.id();
            aqy.varchar('name');
            aqy.varchar('avatarURL');
            aqy.varchar('owner');
            aqy.varchar('members', 2048);
            aqy.bigint('created_at');
        });
    } else {
        await fluent.query('ALTER TABLE smartphone_whatsapp_groups MODIFY members VARCHAR(2048) NOT NULL');
        const aqz = [];
        for (let ara of await WhatsApp.groups) {
            try {
                ara.members = JSON.parse(ara.members);
                aqz.push(ara);
            } catch {
                console.log('O grupo ' + ara.id + ' foi ignorado por erros de formatação');
            }
        }
        const arb = await fluent.query('select m1.* from smartphone_whatsapp_messages m1 \n      left outer join smartphone_whatsapp_messages m2 \n      on (m1.id<m2.id and m1.channel_id=m2.channel_id)\n      where m2.id is null AND m1.channel_id > 1000000000;');
        for (let arc of aqz) {
            arc.message = arb.find(ard => ard.channel_id == arc.id + 1000000000);
        }
        WhatsApp.cache.groups = aqz.map(are => new Group(are));
    }
});
const isBlocked = memoized(async (arf, arg) => {
    const arh = await DB.getIdByPhone(arf);
    const ari = await DB.getIdByPhone(arg);
    if (arh && ari) {
        return DB.phone_blocks.where(arj => arj.where({
            user_id: arh,
            phone: arg
        })).orWhere(ark => ark.where({
            user_id: ari,
            phone: arf
        })).exists();
    } else {
        return false;
    }
}, 10000);
backend.wpp_sendMessage = async (arl, arm, arn, aro = 'text', arp = null) => {
    const arq = await vRP.getUserId(arl),
        arr = PhoneByUserId[arq],
        ars = arm.startsWith('group') && WhatsApp.cache.groups.find(art => art.id == arm.substr(5));
    if (spamBlocker(arl)) {
        return {};
    } else {
        if (arn.length > 255) {
            return {
                error: messages.MESSAGE_TOO_LONG
            };
        } else {
            if (await isBlocked(arr, arm)) {
                return {
                    error: messages.MESSAGE_BLOCKED
                };
            }
        }
    }
    let aru = ars ? ars.channelId : await WhatsApp.getChannel(arr, arm),
        arv = {
            sender: arr,
            channel_id: aru,
            content: arn,
            created_at: unix()
        };
    if (aro === 'image') {
        arv.image = arp;
    } else {
        if (aro === 'location' && Array.isArray(arp) && arp.length === 3) {
            arv.location = JSON.stringify(arp);
        }
    }
    arv.id = await WhatsApp.messages.insert(arv).returnKeys();
    if (!arv.id) {
        return;
    }
    emit('smartphone:whatsapp_message', arv);
    if (ars) {
        arv.group = {
            id: ars.id,
            name: ars.name
        };
        ars.pusher('WHATSAPP_MESSAGE', arv);
    } else {
        arv.target = arm;
        pusher(arl, 'WHATSAPP_MESSAGE', arv);
        getSourceToNotify(arm).then(arw => {
            if (arl != arw) {
                pusher(arw, 'WHATSAPP_MESSAGE', arv);
            }
        });
    }
    return {};
};
const hasPsychoInIt = memoized((...arx) => WhatsApp.profiles.whereIn('owner', arx).where('read_receipts', 0).exists(), 10000);
backend.wpp_markAsRead = async (ary, arz) => {
    const asa = await vRP.getUserId(ary),
        asb = PhoneByUserId[asa],
        asd = await hasPsychoInIt(arz, asb),
        ase = await WhatsApp.getChannel(arz, asb);
    if (asd) {
        return void await WhatsApp.messages.where({
            sender: arz,
            channel_id: ase,
            readed: 0
        }).update({
            readed: 1
        });
    }
    await WhatsApp.messages.where({
        sender: arz,
        channel_id: ase,
        saw_at: 0
    }).update({
        saw_at: unix(),
        readed: 1
    });
    const asf = UserIdByPhone[arz];
    if (asf) {
        const asg = await vRP.getUserSource(asf);
        if (asg) {
            pusher(asg, 'WHATSAPP_READ', asb);
        }
    }
};
backend.wpp_getProfile = async ash => {
    const asi = await vRP.getUserId(ash),
        asj = PhoneByUserId[asi];
    let ask = await WhatsApp.profiles.where({
        owner: asj
    }).first();
    if (!ask) {
        await WhatsApp.profiles.insert(ask = {
            owner: asj
        });
    }
    return ask;
};
backend.wpp_updateAvatar = async (asl, asm) => {
    const asn = await vRP.getUserId(asl),
        aso = PhoneByUserId[asn];
    await WhatsApp.profiles.where({
        owner: aso
    }).update({
        avatarURL: asm
    });
    pusher(-1, 'WHATSAPP_AVATAR', {
        phone: aso,
        avatarURL: asm
    });
};
exports('getWhatsappAvatar', asp => {
    return WhatsApp.profiles.where({
        owner: asp
    }).first().pluck('avatarURL');
});
backend.wpp_updateSettings = async (asq, asr) => {
    const ass = await vRP.getUserId(asq);
    const ast = PhoneByUserId[ass];
    await WhatsApp.profiles.where({
        owner: ast
    }).update({
        read_receipts: asr
    });
};
backend.wpp_getResume = async asu => {
    const asv = await vRP.getUserId(asu),
        asw = PhoneByUserId[asv],
        asx = WhatsApp.cache.groups.filter(asy => {
            return asy.owner == asw || asy.members.includes(asw);
        }),
        asz = await DB.contacts.where('owner', asw).pluck('phone'),
        ata = await WhatsApp.profiles.whereIn('owner', asz).pluck('avatarURL', 'owner');
    const atb = await WhatsApp.channels.where({
        sender: asw
    }).orWhere({
        target: asw
    }),
        atc = await fluent.query('select m1.* from smartphone_whatsapp_messages m1 \n  left outer join smartphone_whatsapp_messages m2 \n  on (m1.id<m2.id and m1.channel_id=m2.channel_id)\n  left join smartphone_whatsapp_channels ch on ch.id=m1.channel_id\n  where m2.id is null AND (ch.sender=? or ch.target=?)\n  and (m1.deleted_by is null or m1.deleted_by!=?)', [
            asw,
            asw,
            asw
        ]);
    for (let atd of atc) {
        if (atd.sender != asw) {
            atd.target = asw;
        } else {
            const ate = atb.find(atf => atf.id == atd.channel_id);
            atd.target = ate.sender == asw ? ate.target : ate.sender;
        }
    }
    const atg = (await fluent.query('select channel_id,COUNT(*) as qtd from smartphone_whatsapp_messages msg\n  left join smartphone_whatsapp_channels ch on msg.channel_id=ch.id\n  where (ch.sender=? or ch.target=?) and msg.readed=0 and msg.sender!=?', [
        asw,
        asw,
        asw
    ])).pluckBy('qtd', 'channel_id');
    return {
        groups: asx,
        messages: atc,
        unread: atg,
        avatars: ata
    };
};
backend.wpp_getChat = async (ath, ati) => {
    const atj = await vRP.getUserId(ath);
    const atk = PhoneByUserId[atj];
    if (ati.startsWith('group')) {
        const atl = WhatsApp.cache.groups.find(atm => atm.id == ati.slice(5));
        if (!atl || atl.owner != atk && !atl.members.includes(atk)) {
            return {
                error: messages['WHATSAPP.GROUP_NOT_FOUND']
            };
        }
        const atn = await WhatsApp.messages.where({
            channel_id: atl.channelId
        }).limit(125).orderBy('id', 'DESC');
        atn.sort((ato, atp) => ato.id - atp.id);
        return {
            name: atl.name,
            id: atl.channelId,
            avatarURL: atl.avatarURL,
            messages: atn
        };
    } else {
        const atq = await WhatsApp.getChannel(atk, ati);
        const atr = {
            id: atq
        };
        atr.messages = await WhatsApp.messages.where(ats => {
            ats.whereNull('deleted_by').orWhere('deleted_by', '!=', atk);
        }).where({
            channel_id: atq
        }).limit(125).orderBy('id', 'DESC') || [];
        atr.messages.sort((att, atu) => att.id - atu.id);
        atr.avatarURL = await WhatsApp.profiles.where({
            owner: ati
        }).first().pluck('avatarURL');
        return atr;
    }
};
backend.wpp_getAvatar = async (atv, atw) => {
    return WhatsApp.profiles.where({
        owner: atw
    }).first().pluck('avatarURL');
};
backend.wpp_deleteMessages = async (atx, aty) => {
    const atz = await vRP.getUserId(atx),
        aua = PhoneByUserId[atz],
        aub = 'smartphone_whatsapp_messages';
    if (aty && !aty.startsWith('group')) {
        const auc = await WhatsApp.getChannel(aua, aty);
        await fluent.query('DELETE FROM ' + aub + ' WHERE channel_id=?\n    AND deleted_by IS NOT NULL AND deleted_by != ?', [
            auc,
            aua
        ]);
        await fluent.query('UPDATE ' + aub + ' SET deleted_by=? WHERE channel_id=?', [
            aua,
            auc
        ]);
    } else {
        await fluent.query('DELETE msg FROM ' + aub + ' msg\n    LEFT JOIN smartphone_whatsapp_channels ch ON msg.channel_id=ch.id\n    WHERE (ch.sender = ? OR ch.target = ?)\n    AND deleted_by IS NOT NULL AND deleted_by != ?', [
            aua,
            aua,
            aua
        ]);
        await fluent.query('UPDATE ' + aub + ' msg\n    LEFT JOIN smartphone_whatsapp_channels ch ON msg.channel_id=ch.id\n    SET deleted_by=? WHERE (ch.sender = ? OR ch.target = ?)\n    AND deleted_by IS NULL', [
            aua,
            aua,
            aua
        ]);
    }
    return true;
};
backend.wpp_getGroup = async (aud, aue) => {
    const auf = await vRP.getUserId(aud);
    const aug = PhoneByUserId[auf],
        auh = WhatsApp.cache.groups.find(aui => aui.id == aue);
    if (!auh) {
        return {
            error: messages['WHATSAPP.GROUP_NOT_FOUND']
        };
    } else {
        if (auh.owner === aug || auh.members.includes(aug)) {
            return {
                ...auh,
                isOwner: auh.owner === aug
            };
        } else {
            return {
                error: messages['WHATSAPP.GROUP_NOT_OWNER']
            };
        }
    }
};
backend.wpp_promote = async (auj, auk, aul) => {
    const aum = await vRP.getUserId(auj);
    const aun = PhoneByUserId[aum];
    const auo = WhatsApp.cache.groups.find(aup => aup.id == auk);
    if (auo.owner === aun) {
        const auq = auo.members.indexOf(aul);
        if (auq >= 0) {
            auo.members.splice(auq, 1, aun);
            auo.owner = aul;
            auo.update([
                'owner',
                'members'
            ]);
        } else {
            return {
                error: messages['WHATSAPP.NUMBER_OUT_GROUP']
            };
        }
    } else {
        return {
            error: messages.NO_PERMISSION
        };
    }
};
backend.wpp_inviteToGroup = async (aur, aus, aut) => {
    const auu = await vRP.getUserId(aur),
        auv = PhoneByUserId[auu],
        auw = WhatsApp.cache.groups.find(aux => aux.id == aus);
    if (!auw) {
        return {
            error: messages['WHATSAPP.GROUP_NOT_FOUND']
        };
    } else {
        if (auw.owner === auv) {
            if (auw.members.includes(aut)) {
                return {
                    error: messages['WHATSAPP.NUMBER_IN_GROUP']
                };
            } else {
                if (auw.members.length >= Group.MAX_MEMBERS - 1) {
                    return {
                        error: messages['WHATSAPP.GROUP_FULL']
                    };
                } else {
                    if (!await DB.getIdentityByPhone(aut)) {
                        return {
                            error: messages.PHONE_NOT_FOUND
                        };
                    } else {
                        auw.members.push(aut);
                        auw.update(['members']);
                        const auy = SourceByPhone[aut];
                        if (auy) {
                            pusher(auy, 'WHATSAPP_GROUP', auw);
                        }
                    }
                }
            }
        } else {
            return {
                error: messages['WHATSAPP.GROUP_NOT_OWNER']
            };
        }
    }
};
backend.wpp_removeFromGroup = async (auz, ava, avb) => {
    const avc = await vRP.getUserId(auz),
        avd = PhoneByUserId[avc];
    const ave = WhatsApp.cache.groups.find(avf => avf.id == ava);
    if (!ave) {
        return {
            error: messages['WHATSAPP.GROUP_NOT_FOUND']
        };
    } else {
        if (ave.owner === avd) {
            let avg = ave.members.indexOf(avb);
            if (avg === -1) {
                return {
                    error: messages['WHATSAPP.NUMBER_OUT_GROUP']
                };
            } else {
                ave.members.splice(avg, 1);
                ave.update(['members']);
                const avh = SourceByPhone[avb];
                if (avh) {
                    pusher(avh, 'WHATSAPP_GROUP_KICK', {
                        id: ave.id,
                        name: ave.name
                    });
                }
            }
        } else {
            return {
                error: messages['WHATSAPP.GROUP_NOT_OWNER']
            };
        }
    }
};
backend.wpp_leaveGroup = async (avi, avj) => {
    const avk = await vRP.getUserId(avi),
        avl = PhoneByUserId[avk],
        avm = WhatsApp.cache.groups.find(avn => avn.id == avj);
    if (!avm) {
        return {
            error: messages['WHATSAPP.GROUP_NOT_FOUND']
        };
    } else {
        if (avm.owner === avl) {
            return {
                error: messages['WHATSAPP.OWNER_LEAVE']
            };
        } else {
            if (avm.members.includes(avl)) {
                const avo = avm.members.indexOf(avl);
                avm.members.splice(avo, 1);
                avm.update(['members']);
                pusher(avi, 'WHATSAPP_LEAVE_GROUP', avm.id);
            } else {
                return {
                    error: messages['WHATSAPP.GROUP_NOT_OWNER']
                };
            }
        }
    }
};
backend.wpp_createGroup = async (avp, avq, avr, avs) => {
    const avt = await vRP.getUserId(avp),
        avu = PhoneByUserId[avt],
        avv = {
            name: avq,
            owner: avu,
            avatarURL: avr,
            members: JSON.stringify(avs),
            created_at: unix(),
            id: await WhatsApp.groups.insert(avv).returnKeys()
        };
    if (!avv.id) {
        return;
    }
    avv.members = avs;
    const avw = new Group(avv);
    WhatsApp.cache.groups.push(avw);
    avw.pusher('WHATSAPP_GROUP', avw);
};
backend['wpp_updateGroupAvatar'] = async (avx, avy, avz) => {
    const awa = await vRP.getUserId(avx);
    const awb = PhoneByUserId[awa];
    const awc = WhatsApp.cache.groups.find(awd => awd.id === avy);
    if (!awc) {
        return {
            error: messages['WHATSAPP.GROUP_NOT_FOUND']
        };
    } else {
        if (awc.owner != awb) {
            return {
                error: messages['WHATSAPP.GROUP_NOT_OWNER']
            };
        } else {
            awc.avatarURL = avz;
            awc.update(['avatarURL']);
            awc.pusher('WHATSAPP_GROUP_PHOTO', {
                id: avy,
                avatarURL: avz
            });
        }
    }
};
backend.wpp_updateGroupName = async (awe, awf, awg) => {
    const awh = await vRP.getUserId(awe),
        awi = PhoneByUserId[awh];
    const awj = WhatsApp.cache.groups.find(awk => awk.id === awf);
    if (!awj) {
        return {
            error: messages['WHATSAPP.GROUP_NOT_FOUND']
        };
    } else {
        if (awj.owner != awi) {
            return {
                error: messages['WHATSAPP.GROUP_NOT_OWNER']
            };
        } else {
            awj.name = awg;
            awj.update(['name']);
            awj.pusher('WHATSAPP_GROUP_NAME', {
                id: awf,
                name: awg
            });
        }
    }
};
backend.wpp_deleteGroup = async (awl, awm) => {
    const awn = await vRP.getUserId(awl),
        awo = PhoneByUserId[awn];
    const awp = WhatsApp.cache.groups.find(awq => awq.id == awm);
    if (!awp) {
        return {
            error: messages['WHATSAPP.GROUP_NOT_FOUND']
        };
    } else {
        if (awp.owner != awo) {
            return {
                error: messages['WHATSAPP.GROUP_NOT_OWNER']
            };
        } else {
            await WhatsApp.groups.where({
                id: awm
            })['delete']();
            await WhatsApp.messages.where({
                channel_id: awp.channelId
            })['delete']();
            awp.pusher('WHATSAPP_GROUP_DESTROY', {
                id: awp.id,
                name: awp.name
            });
            const awr = WhatsApp.cache.groups.indexOf(awp);
            WhatsApp.cache.groups.splice(awr, 1);
        }
    }
};
const OLX = {
    get ads() {
        return fluent('smartphone_olx');
    }
};
DB.ready(async aws => {
    if (!aws.includes(OLX.ads.table)) {
        await OLX.ads.create(awt => {
            awt.id();
            awt.int('user_id');
            awt.varchar('title');
            awt.varchar('category');
            awt.int('price');
            awt.varchar('description', 1024);
            awt.varchar('images', 1024);
            awt.bigint('created_at');
        });
        await OLX.ads.createIndex('user_id');
    }
});
backend.olx_search = async (awu, awv, aww) => {
    const awx = await OLX.ads.where('title', 'LIKE', awv).where('category', 'LIKE', aww).orderBy('id', 'DESC').limit(50),
        awy = await DB.getIdentitiesBy('user_id', awx.pluck('user_id').unique());
    for (let awz of awx) {
        awz.images = JSON.parse(awz.images);
        awz.author = awy.find(axa => axa.user_id == awz.user_id);
    }
    return awx;
};
backend.olx_fetch = async (axb, axc) => {
    const axd = await OLX.ads.where({
        id: axc
    }).first();
    if (axd) {
        axd.images = JSON.parse(axd.images);
    }
    if (axd) {
        axd.author = await DB.getIdentityByUserId(axd.user_id);
    }
    return axd;
};
backend.olx_createAd = async (axe, axf) => {
    const axg = await vRP.getUserId(axe);
    if (spamBlocker(axe, 'olx', 1)) {
        return;
    }
    if (!axf.title || axf.title.length > 1024) {
        return {
            error: messages['OLX.INVALID_TITLE']
        };
    }
    if (!axf.category) {
        return {
            error: messages['OLX.CATEGORY_MANDATORY']
        };
    }
    if (!axf.description) {
        return {
            error: messages['OLX.DESCRIPTION_MANDATORY']
        };
    }
    if (!Number.isInteger(axf.price) || axf.price <= 0) {
        return {
            error: messages.INVALID_VALUE
        };
    }
    if (!Array.isArray(axf.images) || axf.images.length == 0) {
        return {
            error: messages['OLX.IMAGE_MANDATORY']
        };
    }
    if (axf.images.length > 3) {
        return {
            error: messages['OLX.IMAGE_MAXIMUM']
        };
    }
    delete axf.id;
    axf.user_id = axg;
    axf.images = JSON.stringify(axf.images);
    axf.created_at = unix();
    axf.id = await OLX.ads.insert(axf);
    return axf;
};
backend.olx_dashboard = async axh => {
    const axi = await vRP.getUserId(axh);
    const axj = await OLX.ads.where({
        user_id: axi
    }).limit(50);
    axj.forEach(axk => axk.images = JSON.parse(axk.images));
    return axj;
};
backend.olx_destroy = async (axl, axm) => {
    const axn = await vRP.getUserId(axl);
    if (!axm) {
        return {
            error: '?'
        };
    }
    const axo = await OLX.ads.where('id', axm).first();
    if (axo && (axo.user_id == axn || await isModerator(axn))) {
        request.deleteManyImages(...JSON.parse(axo.images));
        await OLX.ads.where({
            id: axm
        })['delete']();
        sendWebhook({
            name: 'OLX',
            content: {
                ID: axn,
                ANUNCIO: axo.title,
                'ID DO ANUNCIO': axo.id,
                'DONO DO ANUNCIO': axo.user_id
            }
        });
    }
};
const Tinder = {
    get profiles() {
        return fluent('smartphone_tinder');
    },
    get rating() {
        return fluent('smartphone_tinder_rating');
    },
    get messages() {
        return fluent('smartphone_tinder_messages');
    },
    users: {}
};
DB.ready(async axp => {
    const {
        profiles: axq,
        rating: axr,
        messages: axs
    } = Tinder;
    if (!axp.includes(axq.table)) {
        await axq.create(axt => {
            axt.id();
            axt.int('user_id');
            axt.varchar('name');
            axt.varchar('image');
            axt.varchar('bio', 1024);
            axt.tinyint('age');
            axt.varchar('gender');
            axt.tinyint('show_gender');
            axt.varchar('tags');
            axt.tinyint('show_tags');
            axt.varchar('target');
        });
        await axq.createIndex('user_id');
        await axq.createIndex('gender');
        await axq.createIndex('target');
    }
    if (!axp.includes(axr.table)) {
        await axr.create(axu => {
            axu.int('profile_id').primary();
            axu.int('rated_id').primary();
            axu.tinyint('rating').default(0);
        });
    }
    if (!axp.includes(axs.table)) {
        await axs.create(axv => {
            axv.id();
            axv.int('sender');
            axv.int('target');
            axv.varchar('content');
            axv.tinyint('liked').default(0);
            axv.bigint('created_at');
        });
        await axs.createIndex('sender');
        await axs.createIndex('target');
    }
});

function getSourceByProfile(axw) {
    for (let axx in Tinder.users) {
        if (Tinder.users[axx] && Tinder.users[axx].id == axw) {
            return vRP.getUserSource(parseInt(axx));
        }
    }
    return Promise.resolve();
}

function createPeerQuery(axy) {
    const axz = axy.target == 'All' ? [
        'Male',
        'Female'
    ] : [axy.target];
    return Tinder.profiles.whereIn('gender', axz).whereIn('target', [
        'All',
        axy.gender
    ]).where('id', '!=', axy.id);
}
backend.tinder = async aya => {
    const ayb = await vRP.getUserId(aya);
    const ayc = await Tinder.profiles.where({
        user_id: ayb
    }).first();
    Tinder.users[ayb] = ayc;
    if (ayc) {
        getProfile.modify([ayc.id], () => ayc);
    }
    return ayc;
};
backend.tinder_register = async (ayd, aye) => {
    const ayf = await vRP.getUserId(ayd);
    delete aye.id;
    aye.user_id = ayf;
    aye.tags = JSON.stringify(aye.tags);
    await Tinder.profiles.insert(aye);
};
backend.tinder_changeAvatar = async (ayg, ayh) => {
    const ayi = await vRP.getUserId(ayg);
    await Tinder.profiles.where('user_id', ayi).update({
        image: ayh
    });
};
backend.tinder_changeBio = async (ayj, ayk) => {
    if (!ayk || ayk.length > 1024) {
        return;
    }
    const ayl = await vRP.getUserId(ayj);
    await Tinder.profiles.where('user_id', ayl).update({
        bio: ayk
    });
};
backend.tinder_changeTarget = async (aym, ayn) => {
    const ayo = await vRP.getUserId(aym);
    await Tinder.profiles.where('user_id', ayo).update({
        target: ayn
    });
};
backend.tinder_next = async (ayp, ayq, ayr, ays) => {
    const ayt = await vRP.getUserId(ayp),
        ayu = Tinder.users[ayt];
    if (!ayu) {
        return;
    }
    const ayv = await Tinder.rating.where('profile_id', ayu.id).select('rated_id', 'rating'),
        ayw = ayv.filter(ayx => ayx.rating != 0).pluck('rated_id'),
        ayy = createPeerQuery(ayu);
    let ayz;
    if (ayq === 0) {
        ayz = await ayy.whereNotIn('id', ayv.pluck('rated_id')).first();
    } else {
        if (ayr) {
            await Tinder.rating.replace({
                profile_id: ayu.id,
                rated_id: ayq,
                rating: ays
            });
            if (ays != 0 && await Tinder.rating.where({
                profile_id: ayq,
                rated_id: ayu.id
            }).where('rating', '>', 0).exists()) {
                const aza = await getProfile(ayq);
                if (aza) {
                    pusher(ayp, 'TINDER_MATCH', {
                        profile: {
                            name: aza.name
                        }
                    });
                    getMatches.modify([aza.id], azb => azb && azb.push(ayu) && azb);
                    const azc = await getSourceToNotify(aza.user_id);
                    if (azc) {
                        pusher(azc, 'TINDER_MATCH', {
                            profile: {
                                name: ayu.name
                            }
                        });
                    }
                }
            }
            ayz = await ayy.where('id', '>', ayq).whereNotIn('id', ayw).first();
        } else {
            ayz = await ayy.where('id', '<', ayq).whereNotIn('id', ayw).orderBy('id', 'DESC').first();
        }
    }
    if (ayz) {
        ayz.tags = JSON.parse(ayz.tags);
        ayz.online = Number.isInteger(await vRP.getUserSource(ayz.user_id));
        ayz.previous = await createPeerQuery(ayu).where('id', '<', ayz.id).whereNotIn('id', ayw).exists();
    }
    return ayz;
};
backend.tinder_liked = memoized(async azd => {
    const aze = await vRP.getUserId(azd),
        azf = Tinder.users[aze],
        azg = await Tinder.rating.where('rated_id', azf.id).where('rating', '>', 0).pluck('profile_id');
    const azh = await Tinder.profiles.whereIn('id', azg);
    return azh;
}, 15000);
const getMatches = memoized(async azi => {
    const azj = await Tinder.rating.where('profile_id', azi).where('rating', '>', 0).pluck('rated_id'),
        azk = await Tinder.rating.where('rated_id', azi).where('rating', '>', 0).pluck('profile_id'),
        azl = azj.filter(azm => azk.includes(azm)),
        azn = await Tinder.profiles.whereIn('id', azl);
    const azo = await Tinder.messages.select(fluent.raw('MAX(id) as id')).where(azp => azp.orWhere({
        sender: azi,
        target: azi
    })).groupBy('sender', 'target').pluck('id');
    const azq = (await Tinder.messages.whereIn('id', azo)).filter((azr, azs, azt) => {
        const azu = azt.find(azv => azv.sender == azr.target && azv.target == azr.sender);
        return !azu || azu.id < azr.id;
    });
    for (let azw of azn) {
        azw.last_message = azq.find(azx => azx.sender == azi && azx.target == azw.id || azx.sender == azw.id && azx.target == azi);
    }
    return azn;
}, 60000);
backend.tinder_matches = async azy => {
    const azz = await vRP.getUserId(azy),
        baa = Tinder.users[azz];
    return baa && getMatches(baa.id);
};
const getProfile = memoized(bab => {
    for (let bac of Object.values(Tinder.users)) {
        if (bac && bac.id == bab) {
            return bac;
        }
    }
    return Tinder.profiles.where('id', bab).first();
}, 30000);
backend.tinder_chat = async (bad, bae) => {
    const baf = await vRP.getUserId(bad),
        bag = Tinder.users[baf];
    const bah = bag.id,
        bai = await getProfile(bae);
    bai.avatars = {
        [bag.id]: bag.image,
        [bai.id]: bai.image
    };
    bai.messages = await Tinder.messages.where(baj => baj.where({
        sender: bah,
        target: bae
    })).orWhere(bak => bak.where({
        sender: bae,
        target: bah
    })).orderBy('id', 'DESC').limit(100);
    bai.messages.sort((bal, bam) => bal.id - bam.id);
    return bai;
};
backend.tinder_dismatch = async (ban, bao) => {
    const bap = await vRP.getUserId(ban),
        baq = Tinder.users[bap];
    await Tinder.rating.replace({
        profile_id: baq.id,
        rated_id: bao,
        rating: 0
    });
    await Tinder.messages.where(bar => bar.where({
        sender: baq.id,
        target: bao
    })).orWhere(bas => bas.where({
        sender: bao,
        target: baq.id
    }))['delete']();
    const bat = await getSourceByProfile(bao);
    if (bat) {
        pusher(bat, 'TINDER_DISMATCH', baq.id);
    }
};
backend.tinder_delete = async bau => {
    const bav = await vRP.getUserId(bau);
    const baw = Tinder.users[bav];
    if (baw) {
        await Tinder.messages.where('sender', baw.id).orWhere('target', baw.id)['delete']();
        await Tinder.rating.where('profile_id', baw.id).orWhere('rated_id', baw.id)['delete']();
        await Tinder.profiles.destroy(baw.id);
        delete Tinder.users[bav];
    }
};
backend.tinder_sendMessage = async (bax, bay, baz) => {
    const bba = await vRP.getUserId(bax),
        bbb = Tinder.users[bba];
    if (spamBlocker(bax)) {
        return;
    }
    const bbc = await getProfile(bay);
    if (!bbc) {
        return;
    }
    const bbd = {
        sender: bbb.id,
        target: bay,
        content: baz,
        created_at: unix(),
        id: await Tinder.messages.insert(bbd).returnKeys()
    };
    if (!bbd.id) {
        return;
    }
    bbd.sender_name = bbb.name;
    bbd.sender_uid = bba;
    pusher(bax, 'TINDER_MESSAGE', bbd);
    const bbe = [
        bbb.id,
        bbc.id
    ];
    bbe.forEach(bbf => getMatches.modify([bbf], bbg => {
        if (bbg) {
            bbg.forEach(bbh => {
                if (bbe.includes(bbh.id)) {
                    bbh.last_message = bbd;
                    bbh.image = bbh.id == bbc.id ? bbc.image : bbb.image;
                }
            });
        }
        return bbg;
    }));
    const bbi = await getSourceToNotify(bbc.user_id);
    if (bbi) {
        pusher(bbi, 'TINDER_MESSAGE', bbd);
    }
};
backend.tinder_likeMessage = async (bbj, bbk) => {
    const bbl = await vRP.getUserId(bbj),
        bbm = Tinder.users[bbl],
        bbn = await Tinder.messages.where('id', bbk).where('target', bbm.id).first();
    if (!bbn) {
        return;
    }
    await Tinder.messages.where('id', bbk).update({
        liked: 1
    });
    pusher(bbj, 'TINDER_LIKE', bbk);
    const bbo = await getSourceByProfile(bbn.sender);
    if (bbo) {
        pusher(bbo, 'TINDER_LIKE', bbk);
    }
};
on('vRP:playerLeave', bbp => delete Tinder.users[bbp]);
const yellowPages = [];
backend.yellowpages_index = () => yellowPages;
backend.yellowpages_store = async (bbq, bbr) => {
    const bbs = await vRP.getUserId(bbq),
        bbt = PhoneByUserId[bbs];
    if (bbr && bbr.length <= 100) {
        const bbu = yellowPages.find(bbv => bbv.author.user_id == bbs);
        if (bbu) {
            bbu.title = bbr;
        } else {
            const bbw = await DB.getName(bbs);
            yellowPages.unshift({
                author: {
                    user_id: bbs,
                    name: bbw,
                    phone: bbt
                },
                title: bbr
            });
        }
    }
};
backend.yellowpages_destroy = async bbx => {
    const bby = await vRP.getUserId(bbx);
    const bbz = yellowPages.findIndex(bca => bca.author.user_id == bby);
    if (bbz >= 0) {
        yellowPages.splice(bbz, 1);
    }
};
on('vRP:playerLeave', bcb => {
    const bcc = yellowPages.findIndex(bcd => bcd.author.user_id == bcb);
    if (bcc >= 0) {
        yellowPages.splice(bcc, 1);
    }
});
globalThis.config = require('./config.json');
setInterval(() => {
    requestBlocker.clear();
    spamBlocker.map.clear();
}, 1000);
const requesting = {},
    dropped = {};
onNet('backend:req', async (bce, bcf, bcg) => {
    const bch = global.source;
    if (!Array.isArray(bcg)) {
        if (typeof bcg != 'object') {
            return emitNet('backend:res', bch, bce, {
                __null__: true
            });
        }
        const bci = [];
        for (let [bcj, bck] of Object.entries(bcg)) {
            bci[parseInt(bcj) - 1] = bck;
        }
        bcg = bci;
    }
    if (requestBlocker.get(bch) > 15) {
        dropped[bch] = true;
        return DropPlayer(bch, 'Smartphone Anti flood');
    } else {
        if (config.antiflood != false) {
            requestBlocker.set(bch, (requestBlocker.get(bch) || 0) + 1);
        }
    }
    if (!backend[bcf]) {
        return console.error(bcf + ' does not exists in backend');
    }
    if (bcf.match(/^(bank|paypal)/)) {
        await sleep(100);
    }
    while (requesting[bch]) {
        await sleep(100);
    }
    if (dropped[bch]) {
        return;
    }
    try {
        requesting[bch] = true;
        const bcl = await backend[bcf](bch, ...bcg);
        emitNet('backend:res', bch, bce, bcl == null ? {
            __null__: true
        } : bcl);
    } catch (bcm) {
        console.error('Smartphone::Error', bcm.message);
        console.error(bcm.stack);
        console.error('Method ' + bcf + ' with ' + JSON.stringify(bcg));
    } finally {
        delete requesting[bch];
    }
});
on('playerDropped', () => {
    const bcn = global.source;
    dropped[bcn] = true;
    delete requesting[bcn];
    setTimeout(() => delete dropped[bcn], 5000);
});
onNet('smartphone:delete_prop', bco => {
    emitNet('smartphone:delete_prop', -1, bco);
});
emit('smartphone:isReady');
on('onResourceStart', e => {
    if (GetCurrentResourceName() == e) {
        setTimeout(() => {
            console.log('[SMARTPHONE] Authorized!');
        }, 100);
    }
});