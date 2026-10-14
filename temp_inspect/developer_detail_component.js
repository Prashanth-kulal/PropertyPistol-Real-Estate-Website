const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "./B1ATD5Uw.js",
      "./BzBvBMtQ.js",
      "./DoovH5OQ.js",
      "./entry.DeMVcraH.css",
      "./SkeletonComponent.p2aKJJ7_.css",
      "./DaGrqm2Y.js",
      "./B0EAXGNU.js",
      "./SearchList.DGVNr4nd.css",
      "./DghQzTiP.js",
      "./DNP4asju.js",
      "./ArticleCard.CT-BfebM.css",
      "./HomeNewsAndArticles.BUYs1yhL.css",
      "./DIVFAPuK.js",
      "./CsCt0LHi.js",
      "./LocalityFaq.CmsZpEhD.css",
      "./x_H_Rvu-.js",
      "./PopularDeveloper.lbUK8bzZ.css",
    ]),
) => i.map((i) => d[i]);
import {
  _ as Ae,
  J as qe,
  K as Te,
  L as Be,
  p as n,
  M as L,
  Q as ie,
  T as ne,
  P as V,
  N as Oe,
  s as ze,
  B as Ve,
  r as le,
  o as p,
  c as g,
  w as Ne,
  G as Me,
  b as s,
  y as re,
  k as Ue,
  x as b,
  d as v,
  f as Fe,
  g as He,
  F as N,
  u as J,
  j as ce,
  l as x,
  e as ue,
  m as M,
  S as de,
  C as S,
  D as I,
  U as Ke,
} from "./DoovH5OQ.js";
import { _ as De } from "./hl_HrYex.js";
import Ge from "./BzBvBMtQ.js";
import { u as Je } from "./BvNXFD2X.js";
import "./B0EAXGNU.js";
const Qe = S(() =>
    I(
      () => import("./B1ATD5Uw.js"),
      __vite__mapDeps([0, 1, 2, 3, 4]),
      import.meta.url,
    ).then((c) => c.default || c),
  ),
  We = S(() =>
    I(
      () => import("./DaGrqm2Y.js"),
      __vite__mapDeps([5, 2, 3, 6, 7]),
      import.meta.url,
    ).then((c) => c.default || c),
  ),
  Xe = S(() =>
    I(
      () => import("./DghQzTiP.js"),
      __vite__mapDeps([8, 2, 3, 9, 10, 11]),
      import.meta.url,
    ).then((c) => c.default || c),
  ),
  Ye = S(() =>
    I(
      () => import("./BzBvBMtQ.js"),
      __vite__mapDeps([1, 2, 3, 4]),
      import.meta.url,
    ).then((c) => c.default || c),
  ),
  Ze = S(() =>
    I(
      () => import("./DIVFAPuK.js"),
      __vite__mapDeps([12, 13, 2, 3, 14]),
      import.meta.url,
    ).then((c) => c.default || c),
  ),
  et = S(() =>
    I(
      () => import("./x_H_Rvu-.js"),
      __vite__mapDeps([15, 2, 3, 16]),
      import.meta.url,
    ).then((c) => c.default || c),
  ),
  tt = { class: "skeletonShine" },
  st = { key: 0, class: "static-pages builderDetailPage" },
  ot = { class: "banner-section banner-developer" },
  at = { class: "container-lg" },
  it = { class: "row" },
  nt = { class: "col-12" },
  lt = { class: "breadcrumb property-page align-items-baseline mb-2" },
  rt = { class: "breadcrumb-item" },
  ct = { "aria-current": "page", class: "breadcrumb-item active pl-0" },
  ut = { class: "col-12 content-wrapper" },
  dt = { class: "builderImgholder" },
  pt = { class: "media-body d-overview" },
  _t = { class: "sub-head" },
  vt = { class: "mt-2" },
  mt = { class: "overflow-hidden" },
  ht = { class: "container-lg" },
  gt = { class: "row" },
  ft = { class: "col-md-12 mt-4 pt-3" },
  bt = { class: "mb-2" },
  yt = { class: "more preserve-whitespace" },
  wt = { class: "row" },
  xt = { class: "col-12" },
  $t = { class: "mt-4" },
  kt = { class: "row" },
  Lt = { class: "col-12 mb-1" },
  Ct = ["onClick"],
  Pt = ["onClick"],
  St = ["onClick"],
  It = { key: 0, class: "row mb-5" },
  Rt = { key: 1, class: "container-lg" },
  jt = { class: "row" },
  Et = { class: "col-4" },
  At = { class: "container-lg" },
  qt = { class: "row justify-content-center" },
  Tt = { class: "col-lg-9" },
  Bt = { key: 1 },
  Ot = { class: "pb-4 border-bottom mb-4" },
  zt = { class: "pb-4 border-bottom mb-4" },
  Vt = { class: "pb-4 border-bottom mb-4" },
  Nt = { class: "pb-4 border-bottom mb-4" },
  Mt = { class: "pb-4 mb-4" },
  Ut = {
    __name: "index",
    async setup(c) {
      var ee, te, se;
      let C, A;
      const _ = qe(),
        pe = Ke(),
        h = Te(),
        Q = Be(),
        W = n(_.$store.getPerPage),
        _e = n({
          sortKey: h.query.sortKey || "",
          sortDir: h.query.sortDir || "",
        });
      let ve = n();
      ve.value = h.query.page || 1;
      const r = n(null);
      n([]);
      const U = n(null),
        X = n(null),
        Y = n(!0),
        F = n([]),
        H = n([]),
        K = n([]),
        R = n(null),
        j = n(null),
        E = n(null),
        D = n([]),
        q = n([]),
        T = n([]),
        B = n(!1),
        O = n(!1),
        Z = n(null),
        me = {
          gap: "10px",
          arrows: !1,
          pagination: !1,
          perPage: 3,
          keyboard: "focused",
          breakpoints: {
            1200: { perPage: 2, arrows: !1 },
            990: { perPage: 2, arrows: !1, width: "85vw" },
            800: { perPage: 1, arrows: !1 },
          },
        };
      (_.hook("page:finish", () => {
        window.scrollTo(0, 0);
      }),
        L(() => Math.ceil(U / W.value)),
        L(() => _.$store.isVancouver));
      const he = L(() => _.$store.getMode),
        ge = L(() => {
          var t;
          return {
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.propertypistol.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: `${(t = r.value) == null ? void 0 : t.name}`,
                item: `https://www.propertypistol.com${h.path}`,
              },
            ],
          };
        }),
        fe = L(() => ({
          "@context": "https://schema.org/",
          "@type": "ItemList",
          itemListElement: X.value,
        })),
        be = L(() => {
          var l, o, u, i;
          let t =
              (l = r.value) != null && l.page_title
                ? r.value.page_title
                : `Residential Properties For Sale by ${(o = r.value) == null ? void 0 : o.name}, Mumbai- PropertyPistol`,
            e =
              (u = r.value) != null && u.page_description
                ? r.value.page_description
                : `Buy, sale & rent flats/apartments/residentail properties for sale by ${(i = r.value) == null ? void 0 : i.name}, Mumbai at PropertyPistol`,
            a = `https://www.propertypistol.com${h.path}`;
          return {
            title: t,
            meta: [
              { hid: "description", name: "description", content: e },
              { hid: "robots", name: "robots", content: "index, follow" },
              { hid: "og-title", property: "og:title", content: t },
              { hid: "og-description", property: "og:description", content: e },
              { hid: "og-url", property: "og:url", content: a },
              { hid: "og-type", property: "og:type", content: "website" },
              {
                hid: "og-image",
                property: "og:image",
                content:
                  "https://cdn.propertypistol.com/images/pp-logo-updated.svg",
              },
            ],
            link: [{ rel: "canonical", href: a }],
            script: [
              {
                type: "application/ld+json",
                hid: "schemaHomeDev",
                children: V.homeSchema,
              },
              {
                type: "application/ld+json",
                hid: "schemaBreadcrumb",
                children: ge.value,
              },
              {
                type: "application/ld+json",
                hid: "schemaListItem",
                children: fe.value,
              },
            ],
          };
        }),
        z = L(() => _.$store.currentCity);
      let { data: k, error: ye } =
        (([C, A] = ie(() =>
          Je("builder", () =>
            $fetch(`${pe.public.apiBase}builders/${h.params.id}`),
          ),
        )),
        (C = await C),
        A(),
        C);
      (ye.value || !((ee = k.value) != null && ee.builder)
        ? (([C, A] = ie(() => ne("/"))), await C, A())
        : ((r.value = k.value.builder),
          (se = (te = r.value) == null ? void 0 : te.featured_city) != null &&
            se.uuid &&
            (V.getCityByUUID(r.value.featured_city.uuid) || ne("/"))),
        Oe(be));
      const we = () => {
        ((B.value = !0),
          _.$api
            .get(`builders/${h.params.id}/news_and_articles`, {})
            .then((t) => {
              var e, a;
              (((a =
                (e = t == null ? void 0 : t.data) == null
                  ? void 0
                  : e.news_and_articles) == null
                ? void 0
                : a.length) > 0 && (F.value = t.data.news_and_articles),
                (B.value = !1));
            })
            .catch((t) => {
              ((B.value = !1), console.log(t));
            }));
      };
      function xe() {
        ((O.value = !0),
          _.$api
            .get(`builders/${h.params.id}/faqs`, {})
            .then((t) => {
              var e, a;
              (((a =
                (e = t == null ? void 0 : t.data) == null ? void 0 : e.faqs) ==
              null
                ? void 0
                : a.length) > 0 && (H.value = t.data.faqs),
                (O.value = !1));
            })
            .catch((t) => {
              ((O.value = !1), console.log(t));
            }));
      }
      function $e() {
        var t;
        _.$api
          .get(
            `builders/${h.params.id}/popular_developers?city_uuid=${(t = z.value) == null ? void 0 : t.uuid}`,
            {},
          )
          .then((e) => {
            var a, l, o, u;
            if (
              (((l =
                (a = e == null ? void 0 : e.data) == null
                  ? void 0
                  : a.builders) == null
                ? void 0
                : l.length) > 0 && (K.value = e.data.builders),
              (o = e == null ? void 0 : e.data) != null &&
                o.featured_city &&
                ((Z.value = e.data.featured_city),
                !((u = z.value) != null && u.uuid)))
            ) {
              const i = V.getCityByUUID(e.data.featured_city.uuid);
              (_.$store.setCurrentCity(i), _.$store.setCurrentCitySettings(i));
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
      const ke = (t, e) => {
          t && D.value.push({ el: t, data: e });
        },
        G = (t, e, a) => {
          const l = k.value.builder.cities.findIndex((o) => o.uuid === t.uuid);
          ((T.value[l] = t.ongoing_project_count == 0 ? "Upcoming" : "Ongoing"),
            (q.value[l] = !0),
            _.$api
              .get(
                `builders/${h.params.id}/${e == "Upcoming" || t.ongoing_project_count == 0 ? "upcoming_projects" : "ongoing_projects"}?city_uuid=${t.uuid}`,
                {},
              )
              .then((o) => {
                if (o != null && o.data) {
                  if (e) {
                    const u = k.value.builder.cities.find(
                      (i) => i.uuid === t.uuid,
                    );
                    u &&
                      ((T.value[a] = e), (u.projectList = []), (u.count = 0));
                  }
                  ((X.value = o.data.schema_tags_data),
                    (U.value = o.data.total_records),
                    Le(o.data.projects, t),
                    (q.value[l] = !1));
                }
              })
              .catch((o) => {
                ((q.value[l] = !1), console.log(o));
              }));
        },
        Le = (t, e) => {
          t.forEach((a) => {
            if (a.city_uuid === e.uuid) {
              const l = k.value.builder.cities.find((o) => o.uuid === e.uuid);
              l &&
                (l.projectList || (l.projectList = []),
                l.projectList.push(a),
                (l.count = U.value));
            }
          });
        },
        Ce = (t) => {
          _.$router.push(
            `/${t == null ? void 0 : t.name.trim().toLowerCase()}/${he.value}/projects-by-${Pe(r.value.name)}`,
          );
        },
        Pe = (t) => V.prepareBuilderSlugFromStr(t),
        Se = async () => {
          $(".skeletonShine").show();
          const t = await de("selected-city");
          t.value = null;
          const e = await de("default-city");
          ((e.value = null),
            _.$store.setCurrentCity(null),
            _.$store.setDefaultCity(!0),
            Q.push("/"));
        },
        Ie = (t) => {
          Q.push({ query: { ...h.query, ...t, page: 1 } });
        },
        Re = n(window.innerWidth <= 768);
      return (
        ze(async () => {
          var t = Re.value ? 100 : 300,
            e = "...",
            a = "Read more",
            l = "Read less";
          ($(".more").each(function () {
            var i = $(this).html();
            if (i.length > t) {
              var f = i.substr(0, t),
                P = i.substr(t, i.length - t),
                m =
                  f +
                  '<span class="moreellipses">' +
                  e +
                  '&nbsp;</span><span class="morecontent"><span>' +
                  P +
                  '</span>&nbsp;&nbsp;<a href="" class="morelink text-link w-500">' +
                  a +
                  "</a></span>";
              $(this).html(m);
            }
          }),
            $(".morelink").click(function () {
              return (
                $(this).hasClass("less")
                  ? ($(this).removeClass("less"), $(this).html(a))
                  : ($(this).addClass("less"), $(this).html(l)),
                $(this).parent().prev().toggle(),
                $(this).prev().toggle(),
                !1
              );
            }),
            setTimeout(() => {
              (window.scrollTo({ top: 0, left: 0 }), (Y.value = !1));
            }, 100),
            await Ve());
          const o = new IntersectionObserver(
            (i) => {
              i.forEach((f) => {
                if (f.isIntersecting) {
                  const P = D.value.find((m) => m.el === f.target);
                  P && (G(P.data), o.unobserve(f.target));
                }
              });
            },
            { threshold: 0 },
          );
          D.value.forEach((i) => {
            i.el && o.observe(i.el);
          });
          const u = new IntersectionObserver((i) => {
            i.forEach((f) => {
              if (f.isIntersecting)
                switch (f.target) {
                  case R.value:
                    (we(), u.unobserve(R.value));
                    break;
                  case j.value:
                    (xe(), u.unobserve(j.value));
                    break;
                  case E.value:
                    ($e(), u.unobserve(E.value));
                    break;
                }
            });
          });
          (R.value && u.observe(R.value),
            j.value && u.observe(j.value),
            E.value && u.observe(E.value));
        }),
        (t, e) => {
          var oe;
          const a = De,
            l = Qe,
            o = le("splide-slide"),
            u = le("splide"),
            i = We,
            f = Xe,
            P = Ge,
            m = Ye,
            je = Ze,
            Ee = et;
          return (
            p(),
            g(
              N,
              null,
              [
                Ne(
                  s(
                    "div",
                    tt,
                    e[0] ||
                      (e[0] = [
                        s("div", { class: "loader" }, "Loading...", -1),
                      ]),
                    512,
                  ),
                  [[Me, Y.value]],
                ),
                re(k)
                  ? (p(),
                    g("section", st, [
                      s("div", ot, [
                        s("div", at, [
                          s("div", it, [
                            s("div", nt, [
                              s("ol", lt, [
                                s("li", rt, [
                                  s(
                                    "a",
                                    { href: "/", onClick: Ue(Se, ["prevent"]) },
                                    "Home",
                                  ),
                                ]),
                                e[1] ||
                                  (e[1] = s(
                                    "li",
                                    { class: "breadcrumb-item divider px-1" },
                                    "/",
                                    -1,
                                  )),
                                e[2] ||
                                  (e[2] = s(
                                    "li",
                                    {
                                      "aria-current": "page",
                                      class: "breadcrumb-item active pl-0",
                                    },
                                    "Developers",
                                    -1,
                                  )),
                                e[3] ||
                                  (e[3] = s(
                                    "li",
                                    { class: "breadcrumb-item divider px-1" },
                                    "/",
                                    -1,
                                  )),
                                s("li", ct, b(r.value.name), 1),
                              ]),
                            ]),
                            s("div", ut, [
                              s("div", dt, [
                                v(
                                  a,
                                  {
                                    src: r.value.logo_url,
                                    alt: "Builder Logo",
                                  },
                                  null,
                                  8,
                                  ["src"],
                                ),
                              ]),
                              s("div", pt, [
                                s("h1", _t, [
                                  e[4] || (e[4] = Fe("Property For Sale by ")),
                                  s("span", vt, b(r.value.name), 1),
                                ]),
                              ]),
                            ]),
                          ]),
                        ]),
                      ]),
                      e[9] ||
                        (e[9] = He(
                          '<nav class="navbar navbar-light p-detailmenu stickyMenu d-ipad mt-0" id="detail-menu" data-v-b38c3e65><div class="container-lg position-relative" data-v-b38c3e65><ul class="navbar-nav flex-row" data-v-b38c3e65><li class="nav-item active" data-v-b38c3e65><a class="nav-link px-0" href="#overview" data-v-b38c3e65>Overview</a></li></ul></div></nav>',
                          1,
                        )),
                      s("div", mt, [
                        s("div", ht, [
                          s("div", gt, [
                            s("div", ft, [
                              s("h2", bt, "About " + b(r.value.name), 1),
                              s("p", null, b(r.value.about_us), 1),
                              e[5] ||
                                (e[5] = s(
                                  "h2",
                                  { class: "mt-4 mb-2" },
                                  "Description",
                                  -1,
                                )),
                              s("p", yt, b(r.value.description), 1),
                            ]),
                          ]),
                          (p(!0),
                          g(
                            N,
                            null,
                            J(
                              re(k).builder.cities.sort((d, y) => {
                                var w, ae;
                                return d.name ===
                                  ((w = z.value) == null ? void 0 : w.name)
                                  ? -1
                                  : y.name ===
                                      ((ae = z.value) == null
                                        ? void 0
                                        : ae.name)
                                    ? 1
                                    : 0;
                              }),
                              (d, y) => (
                                p(),
                                g(
                                  "div",
                                  { key: y, ref_for: !0, ref: (w) => ke(w, d) },
                                  [
                                    s("div", wt, [
                                      s("div", xt, [
                                        s(
                                          "h2",
                                          $t,
                                          "Explore " +
                                            b(r.value.name) +
                                            " Projects in " +
                                            b(d.name),
                                          1,
                                        ),
                                      ]),
                                    ]),
                                    s("div", kt, [
                                      s("div", Lt, [
                                        d.ongoing_project_count
                                          ? (p(),
                                            g(
                                              "button",
                                              {
                                                key: 0,
                                                class: ce([
                                                  "btn-city mb-3",
                                                  {
                                                    active:
                                                      T.value[y] === "Ongoing",
                                                  },
                                                ]),
                                                type: "button",
                                                onClick: (w) =>
                                                  G(d, "Ongoing", y),
                                              },
                                              e[6] ||
                                                (e[6] = [
                                                  s(
                                                    "h3",
                                                    null,
                                                    b("Ongoing"),
                                                    -1,
                                                  ),
                                                ]),
                                              10,
                                              Ct,
                                            ))
                                          : x("", !0),
                                        d.upcoming_project_count
                                          ? (p(),
                                            g(
                                              "button",
                                              {
                                                key: 1,
                                                class: ce([
                                                  "btn-city mb-3",
                                                  {
                                                    active:
                                                      T.value[y] === "Upcoming",
                                                  },
                                                ]),
                                                type: "button",
                                                onClick: (w) =>
                                                  G(d, "Upcoming", y),
                                              },
                                              e[7] ||
                                                (e[7] = [
                                                  s(
                                                    "h3",
                                                    null,
                                                    b("Upcoming"),
                                                    -1,
                                                  ),
                                                ]),
                                              10,
                                              Pt,
                                            ))
                                          : x("", !0),
                                        s(
                                          "button",
                                          {
                                            class: "btn-city mb-3",
                                            type: "button",
                                            onClick: (w) => Ce(d),
                                          },
                                          e[8] ||
                                            (e[8] = [
                                              s(
                                                "h3",
                                                null,
                                                b("View All Projects"),
                                                -1,
                                              ),
                                            ]),
                                          8,
                                          St,
                                        ),
                                      ]),
                                    ]),
                                    q.value[y] == !0
                                      ? (p(),
                                        g("div", It, [
                                          v(
                                            u,
                                            {
                                              options: me,
                                              class:
                                                "splide-custom slim col-12",
                                            },
                                            {
                                              default: ue(() => [
                                                (p(),
                                                g(
                                                  N,
                                                  null,
                                                  J(3, (w) =>
                                                    v(
                                                      o,
                                                      { key: w },
                                                      {
                                                        default: ue(() => [
                                                          s("div", null, [
                                                            v(l),
                                                          ]),
                                                        ]),
                                                        _: 2,
                                                      },
                                                      1024,
                                                    ),
                                                  ),
                                                  64,
                                                )),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                        ]))
                                      : (p(),
                                        M(
                                          i,
                                          {
                                            key: 1,
                                            results:
                                              d != null && d.projectList
                                                ? d.projectList
                                                : [],
                                            totalRecords:
                                              d != null && d.count
                                                ? +d.count
                                                : 0,
                                            perPage: +W.value,
                                            page: 1,
                                            sort: _e.value,
                                            sortHandler: Ie,
                                            showSort: !1,
                                            listIndex: y,
                                          },
                                          null,
                                          8,
                                          [
                                            "results",
                                            "totalRecords",
                                            "perPage",
                                            "sort",
                                            "listIndex",
                                          ],
                                        )),
                                  ],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                      ]),
                      s(
                        "div",
                        {
                          class: "news-section",
                          ref_key: "newsSection",
                          ref: R,
                        },
                        [
                          F.value.length > 0
                            ? (p(),
                              M(
                                f,
                                {
                                  key: 0,
                                  articleList: F.value,
                                  isShowMore: !1,
                                  title: `${(oe = r.value) == null ? void 0 : oe.name} in News`,
                                  containerLarge: !0,
                                },
                                null,
                                8,
                                ["articleList", "title"],
                              ))
                            : x("", !0),
                          B.value
                            ? (p(),
                              g("div", Rt, [
                                v(P, {
                                  class: "mb-4 col-12",
                                  width: "320px",
                                  height: "33px",
                                  borderRadius: "2px",
                                }),
                                s("div", jt, [
                                  (p(),
                                  g(
                                    N,
                                    null,
                                    J(3, (d) =>
                                      s("div", Et, [
                                        v(m, {
                                          class: "mb-3",
                                          height: "140px",
                                          borderRadius: "4px",
                                        }),
                                        v(m, {
                                          class: "mb-2",
                                          width: "140px",
                                          height: "20px",
                                          borderRadius: "2px",
                                        }),
                                        v(m, {
                                          class: "mb-3",
                                          width: "80px",
                                          height: "16px",
                                          borderRadius: "2px",
                                        }),
                                      ]),
                                    ),
                                    64,
                                  )),
                                ]),
                              ]))
                            : x("", !0),
                        ],
                        512,
                      ),
                      s(
                        "section",
                        {
                          class: "pb-0 px-0 faq-section",
                          ref_key: "faqSection",
                          ref: j,
                        },
                        [
                          s("div", At, [
                            s("div", qt, [
                              s("div", Tt, [
                                H.value.length > 0
                                  ? (p(),
                                    M(
                                      je,
                                      { key: 0, faqList: H.value },
                                      null,
                                      8,
                                      ["faqList"],
                                    ))
                                  : x("", !0),
                                O.value
                                  ? (p(),
                                    g("div", Bt, [
                                      s("div", Ot, [
                                        v(m, {
                                          class: "mx-auto",
                                          width: "80%",
                                          height: "33px",
                                          borderRadius: "4px",
                                        }),
                                      ]),
                                      s("div", zt, [
                                        v(m, {
                                          class: "mx-auto",
                                          width: "100%",
                                          height: "18px",
                                          borderRadius: "4px",
                                        }),
                                      ]),
                                      s("div", Vt, [
                                        v(m, {
                                          class: "mx-auto",
                                          width: "100%",
                                          height: "18px",
                                          borderRadius: "4px",
                                        }),
                                      ]),
                                      s("div", Nt, [
                                        v(m, {
                                          class: "mx-auto",
                                          width: "100%",
                                          height: "18px",
                                          borderRadius: "4px",
                                        }),
                                      ]),
                                      s("div", Mt, [
                                        v(m, {
                                          class: "mx-auto",
                                          width: "100%",
                                          height: "18px",
                                          borderRadius: "4px",
                                        }),
                                      ]),
                                    ]))
                                  : x("", !0),
                              ]),
                            ]),
                          ]),
                        ],
                        512,
                      ),
                      s(
                        "div",
                        { ref_key: "popularDevelopersSection", ref: E },
                        [
                          K.value.length > 0
                            ? (p(),
                              M(
                                Ee,
                                {
                                  key: 0,
                                  buildersList: K.value,
                                  featuredCity: Z.value,
                                },
                                null,
                                8,
                                ["buildersList", "featuredCity"],
                              ))
                            : x("", !0),
                        ],
                        512,
                      ),
                    ]))
                  : x("", !0),
              ],
              64,
            )
          );
        }
      );
    },
  },
  Jt = Ae(Ut, [["__scopeId", "data-v-b38c3e65"]]);
export { Jt as default };
