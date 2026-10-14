import {
  _ as w,
  P as y,
  r as m,
  o,
  c as a,
  d as r,
  e as n,
  b as t,
  x as _,
  f as C,
  m as v,
  F as S,
  u as k,
  h as F,
  i as b,
  l as N,
} from "./DoovH5OQ.js";
import { _ as $ } from "./hl_HrYex.js";
import B from "./BzBvBMtQ.js";
import { g as V } from "./BuH03r90.js";
import "./B0EAXGNU.js";
const q = {
    mixins: [V],
    props: { developer: { type: Object, required: !0 } },
    data() {
      return {
        cardSliderSettings: {
          gap: "12px",
          arrows: !1,
          pagination: !1,
          perPage: 1,
          width: "95%",
          keyboard: "focused",
        },
      };
    },
    methods: {
      prepareSlug(s) {
        return y.prepareSlugFromStr(s.name);
      },
    },
    computed: {
      hasProjects() {
        var s, l;
        return (
          ((l = (s = this.developer) == null ? void 0 : s.projects) == null
            ? void 0
            : l.length) > 0
        );
      },
    },
  },
  D = { class: "card" },
  I = { class: "d-flex align-items-start gap-8 mb-4" },
  z = ["src"],
  A = { style: { "min-width": "0" } },
  E = ["title"],
  L = { class: "developer-description" },
  O = { key: 0 },
  T = { class: "project-name no-drag" },
  G = { key: 1, class: "project-card" };
function H(s, l, e, j, g, p) {
  const i = F,
    h = $,
    f = m("splide-slide"),
    x = m("splide"),
    c = B,
    d = b;
  return (
    o(),
    a("div", D, [
      r(
        i,
        { to: `/developers/${e.developer.uuid}/${p.prepareSlug(e.developer)}` },
        {
          default: n(() => [
            t("div", I, [
              t(
                "img",
                {
                  class: "developer-logo",
                  src: e.developer.logo_url,
                  width: "48",
                  height: "48",
                  alt: "",
                },
                null,
                8,
                z,
              ),
              t("div", A, [
                t(
                  "div",
                  { class: "developer-name", title: e.developer.name },
                  _(e.developer.name),
                  9,
                  E,
                ),
                r(
                  i,
                  {
                    to: `/developers/${e.developer.uuid}/${p.prepareSlug(e.developer)}`,
                    class: "developer-link",
                  },
                  {
                    default: n(() => [
                      t("span", null, _(e.developer.project_count), 1),
                      l[0] || (l[0] = C(" Projects")),
                    ]),
                    _: 1,
                  },
                  8,
                  ["to"],
                ),
              ]),
            ]),
            t("p", L, _(e.developer.description), 1),
          ]),
          _: 1,
        },
        8,
        ["to"],
      ),
      r(d, null, {
        default: n(() => [
          p.hasProjects
            ? (o(),
              a("div", O, [
                (o(),
                v(
                  x,
                  {
                    key: e.developer.uuid,
                    options: g.cardSliderSettings,
                    class: "splide-custom slim",
                  },
                  {
                    default: n(() => [
                      (o(!0),
                      a(
                        S,
                        null,
                        k(
                          e.developer.projects,
                          (u, P) => (
                            o(),
                            v(
                              f,
                              { class: "project-card", key: u.uuid ?? P },
                              {
                                default: n(() => [
                                  r(
                                    i,
                                    {
                                      class: "d-block",
                                      to: `/projects/${s.slugForProject(u)}`,
                                    },
                                    {
                                      default: n(() => [
                                        t("div", T, _(u.project_name), 1),
                                        r(
                                          h,
                                          {
                                            sizes: "md:20vw",
                                            class: "project-image no-drag",
                                            width: "300",
                                            src: u.image_url,
                                            loading: "lazy",
                                            alt: "",
                                            format: "webp",
                                          },
                                          null,
                                          8,
                                          ["src"],
                                        ),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ["to"],
                                  ),
                                ]),
                                _: 2,
                              },
                              1024,
                            )
                          ),
                        ),
                        128,
                      )),
                    ]),
                    _: 1,
                  },
                  8,
                  ["options"],
                )),
              ]))
            : (o(),
              a("div", G, [
                r(c, { height: "24px", width: "200px", class: "mb-2" }),
                r(c, { height: "114px", width: "212px" }),
              ])),
        ]),
        _: 1,
      }),
    ])
  );
}
const J = w(q, [
    ["render", H],
    ["__scopeId", "data-v-70cb4440"],
  ]),
  K = {
    props: {
      developers: { type: Array, required: !0 },
      title: {
        type: String,
        required: !1,
        default: "2,000+ developers under one roof",
      },
    },
    data() {
      return {
        cardSliderSettings: {
          gap: "16px",
          drag: !0,
          arrows: !0,
          pagination: !1,
          perPage: 5,
          keyboard: "focused",
          noDrag: ".no-drag",
          classes: {
            prev: "splide__arrow--prev main-prev",
            next: "splide__arrow--next main-next",
          },
          breakpoints: {
            1560: { perPage: 4 },
            1200: { perPage: 3 },
            991: { perPage: 3, arrows: !1, width: "95%" },
            800: { perPage: 2, width: "95%" },
            576: { perPage: 1, width: "85%" },
          },
        },
      };
    },
    methods: {
      prepareSlug(s) {
        return y.prepareSlugFromStr(s.name);
      },
    },
    computed: {
      currentCity() {
        return this.$store.currentCity;
      },
    },
  },
  M = { key: 0, class: "px-lg-0 overflow-hidden" },
  Q = { class: "container-lg" },
  R = { class: "row mb-4 no-gutters" },
  U = { class: "col-12" },
  W = { class: "title-main fw-600 m-0" },
  X = { class: "row" },
  Y = { class: "col-md-12" };
function Z(s, l, e, j, g, p) {
  var c;
  const i = J,
    h = m("splide-slide"),
    f = m("splide"),
    x = b;
  return ((c = e.developers) == null ? void 0 : c.length) > 0
    ? (o(),
      a("section", M, [
        l[0] ||
          (l[0] = t(
            "div",
            { class: "scroll-fix-dev", id: "featured-developers" },
            null,
            -1,
          )),
        t("div", Q, [
          t("div", R, [t("div", U, [t("h2", W, _(e.title), 1)])]),
          t("div", X, [
            t("div", Y, [
              r(x, null, {
                default: n(() => [
                  (o(),
                  v(
                    f,
                    {
                      key: e.developers.map((d) => d.uuid).join(),
                      options: g.cardSliderSettings,
                      class: "slim",
                    },
                    {
                      default: n(() => [
                        (o(!0),
                        a(
                          S,
                          null,
                          k(
                            e.developers,
                            (d) => (
                              o(),
                              v(
                                h,
                                { key: d.uuid },
                                {
                                  default: n(() => [
                                    r(i, { developer: d }, null, 8, [
                                      "developer",
                                    ]),
                                  ]),
                                  _: 2,
                                },
                                1024,
                              )
                            ),
                          ),
                          128,
                        )),
                      ]),
                      _: 1,
                    },
                    8,
                    ["options"],
                  )),
                ]),
                _: 1,
              }),
            ]),
          ]),
        ]),
      ]))
    : N("", !0);
}
const ne = w(K, [
  ["render", Z],
  ["__scopeId", "data-v-1ccb205e"],
]);
export { ne as default };
