var tinycolor = require("tinycolor2");
var guessTextColor = require("./neuron");

var fs = require("fs");

const buiderConfig = {
  "--brand-color-1": "#f14100",
  "--brand-color-2": "#ffb700",
  "--brand-color-3": "{brand-color-3}",
  "--brand-color-text": "#f9f9f9",
  "--background-color-1": "#1a1a1a",
  "--background-color-2": "#fff",
  "--background-color-3": "#333333",
  "--background-color-4": "#353535",
  "--background-color-5": "#363636",
  "--background-color-6": "#353333",
  "--text-color-1": "#FFFFFF",
  "--text-color-2": "#fcfcfc",
  "--text-color-3": "#ffffff",
  "--text-color-4": "#FFFFFF",
  "--font-family-1": '"Roboto",sans-serif',
  "--btn-radius-top-left": "4px",
  "--btn-radius-top-right": "4px",
  "--btn-radius-bottom-left": "4px",
  "--btn-radius-bottom-right": "4px",
  "--input-radius-top-left": "4px",
  "--input-radius-top-right": "4px",
  "--input-radius-bottom-left": "4px",
  "--input-radius-bottom-right": "4px",
  "--odd-radius-top-left": "4px",
  "--odd-radius-top-right": "4px",
  "--odd-radius-bottom-left": "4px",
  "--odd-radius-bottom-right": "4px",
  "--white-color": "#fff",
  "--black-color": "#000",
  "--error-color": "#F02849",
  "--success-color": "#009900",
  "--info-color": "#FFB700",
};

class Skinner {
  constructor(incomingColors, tc) {
    this.verbalData = this.verbalData.bind(this);
    this.incomingColors = incomingColors;
    this.TC = tc;

    this.configOrder = [
      {
        name: "body",
        inherits: null,
        value: "#1a1a1a",
      },
      {
        name: "accent",
        inherits: null,
        value: "#ffb700",
      },
      {
        name: "dominant",
        inherits: ["body"],
        value: "#1a1a1a",
      },
      {
        name: "button",
        inherits: ["accent"],
        value: "#ffb700",
      },
      {
        name: "buttonSecondary",
        inherits: ["body"],
        variation: 5,
        value: "#333",
      },
      {
        name: "navbar",
        inherits: ["dominant", "body"],
        value: "#333",
      },
      {
        name: "slider",
        inherits: ["body"],
        value: "#1a1a1a",
      },
      {
        name: "header",
        inherits: ["dominant", "body"],
        variation: 5,
        value: "#444",
      },
      {
        name: "subHeader",
        inherits: ["header", "dominant", "body"],
        value: "#191919",
      },
      {
        name: "event",
        inherits: ["dominant", "body"],
        value: "#333",
      },
      {
        name: "eventLive",
        inherits: ["event", "body"],
        variation: 5,
        value: "#333",
      },
      {
        name: "odd",
        inherits: ["body"],
        value: "#1a1a1a",
      },
      {
        name: "oddActive",
        inherits: ["accent"],
        value: "#ffb700",
      },
      {
        name: "showMore",
        inherits: ["body"],
        value: "#444",
      },
      {
        name: "marketHeader",
        inherits: ["body", "header"],
        value: "#444",
      },
      {
        name: "collapse",
        inherits: ["header", "dominant", "body"],
        value: "#444",
      },
      {
        name: "tab",
        inherits: ["dominant", "body"],
        value: "#2b2b2b",
      },
      {
        name: "tabActive",
        inherits: ["tab", "dominant", "body"],
        value: "#333",
      },
      {
        name: "tabSecondaryActive",
        inherits: ["tab", "dominant", "body"],
        value: "#2b2b2b",
      },
      {
        name: "menu_1",
        inherits: ["dominant", "body"],
        value: "#333",
      },
      {
        name: "menu_2",
        inherits: ["menu_1", "dominant", "body"],
        value: "#222",
      },
      {
        name: "menu_3",
        inherits: ["menu_2", "menu_1", "dominant", "body"],
        value: "#111",
      },
      {
        name: "input",
        inherits: ["dominant", "body"],
        value: "#2b2b2b",
      },
      {
        name: "inputSecondary",
        inherits: ["input", "dominant", "body"],
        value: "#2b2b2b",
      },
      {
        name: "filter",
        inherits: ["input", "dominant", "body"],
        value: "#333",
      },
      {
        name: "tooltip",
        inherits: ["dominant", "body"],
        value: "#dedede",
      },
      {
        name: "modal",
        inherits: ["dominant", "body"],
        value: "#dedede",
      },
    ];

    this.defaults = {
      dark: {
        bg2: 6,
        bg3: 12,
        bgHov: 3,
      },
      light: {
        bg2: 10,
        bg3: 15,
        bgHov: 3,
      },
      alpha: {
        bg: 0.7,
        bg2: 0.5,
        bg3: 0.3,
      },
      txt: {
        txt: 0.9,
        txt2: 0.6,
        txt3: 0.4,
      },
    };

    this.builderConfig = {
      body: {
        background: this.incomingColors["--background-color-1"],
        color: this.incomingColors["--text-color-1"],
      },

      accent: {
        background: this.incomingColors["--brand-color-1"],
        color: this.incomingColors["--brand-color-text"],
      },

      dominant: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
      },

      button: {
        background: this.incomingColors["--brand-color-1"],
        color: this.incomingColors["--brand-color-text"],
        borderRadius: `${this.incomingColors["--btn-radius-top-left"]} ${this.incomingColors["--btn-radius-top-right"]} ${this.incomingColors["--btn-radius-bottom-right"]} ${this.incomingColors["--btn-radius-bottom-left"]}`,
      },

      buttonSecondary: {
        background: this.incomingColors["--background-color-3"],
        color: this.incomingColors["--text-color-3"],
        borderRadius: `${this.incomingColors["--btn-radius-top-left"]} ${this.incomingColors["--btn-radius-top-right"]} ${this.incomingColors["--btn-radius-bottom-right"]} ${this.incomingColors["--btn-radius-bottom-left"]}`,
      },

      navbar: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
      },

      slider: {
        background: this.incomingColors["--background-color-1"],
        color: this.incomingColors["--text-color-1"],
      },

      header: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
      },

      subHeader: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
      },

      event: {
        background: this.incomingColors["--background-color-3"],
        color: this.incomingColors["--text-color-3"],
      },
      eventLive: { fallback: "event" },

      odd: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
        borderRadius: `${this.incomingColors["--odd-radius-top-left"]} ${this.incomingColors["--odd-radius-top-right"]} ${this.incomingColors["--odd-radius-bottom-right"]} ${this.incomingColors["--odd-radius-bottom-left"]}`,
      },

      oddActive: {
        background: this.incomingColors["--brand-color-1"],
        color: this.incomingColors["--brand-color-text"],
      },

      showMore: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
      },

      marketHeader: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
      },

      collapse: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
      },

      tab: {
        background: this.incomingColors["--background-color-3"],
        color: this.incomingColors["--text-color-3"],
      },
      tabActive: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
      },
      tabSecondaryActive: { fallback: "tab" },

      menu_1: {
        background: this.incomingColors["--background-color-3"],
        color: this.incomingColors["--text-color-3"],
      },
      menu_2: { fallback: "menu_1" },
      menu_3: { fallback: "menu_2" },
      input: {
        background: this.incomingColors["--background-color-2"],
        color: this.incomingColors["--text-color-2"],
        borderRadius: `${this.incomingColors["--input-radius-top-left"]} ${this.incomingColors["--input-radius-top-right"]} ${this.incomingColors["--input-radius-bottom-right"]} ${this.incomingColors["--input-radius-bottom-left"]}`,
      },
      inputSecondary: {
        fallback: "input",
        borderRadius: `${this.incomingColors["--input-radius-top-left"]} ${this.incomingColors["--input-radius-top-right"]} ${this.incomingColors["--input-radius-bottom-right"]} ${this.incomingColors["--input-radius-bottom-left"]}`,
      },
      filter: { fallback: "input" },
      tooltip: {
        background: this.incomingColors["--background-color-4"],
        color: this.incomingColors["--text-color-3"],
      },
      modal: {
        background: this.incomingColors["--background-color-3"],
        color: this.incomingColors["--text-color-3"],
      },
    };

    this.skin = {};

    this.mergedConfig = this.mergeConfig(this.builderConfig);
  }

  mergeConfig(bcfg) {
    let _mergedConfig = {};
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;

      _mergedConfig[_essence] = {};

      _mergedConfig[_essence]["background"] = undefined;
      if (bcfg[_essence].background) {
        _mergedConfig[_essence]["background"] = bcfg[_essence].background;
      } else {
        if (bcfg[bcfg[_essence].fallback].background) {
          let bg = bcfg[bcfg[_essence].fallback].background;
          bg = this.TC(bg).isDark()
            ? this.TC(bg).lighten(this.defaults.dark.bg2).toString()
            : this.TC(bg).darken(this.defaults.light.bg2).toString();
          _mergedConfig[_essence]["background"] = bg;
        } else {
          let bg = _mergedConfig[bcfg[_essence].fallback]["background"];
          bg = this.TC(bg).isDark()
            ? this.TC(bg).lighten(this.defaults.dark.bg2).toString()
            : this.TC(bg).darken(this.defaults.light.bg2).toString();
          _mergedConfig[_essence]["background"] = bg;
        }
      }

      _mergedConfig[_essence]["color"] = undefined;
      if (bcfg[_essence].background) {
        _mergedConfig[_essence]["color"] = bcfg[_essence].color;
      } else {
        if (bcfg[bcfg[_essence].fallback].color) {
          let txt = bcfg[bcfg[_essence].fallback].color;
          _mergedConfig[_essence]["color"] = txt;
        } else {
          let txt = _mergedConfig[bcfg[_essence].fallback].color;
          _mergedConfig[_essence]["color"] = txt;
        }
      }
    }

    return _mergedConfig;
  }

  generateBackgrounds(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    this.skin[_vb.nameBg] = this.mergedConfig[_essence].background;

    let _isDark = this.TC(this.skin[_vb.nameBg]).isDark();

    this.skin[_vb.nameBg2] = _isDark
      ? this.TC(this.skin[_vb.nameBg])
          .lighten(this.defaults.dark.bg2)
          .toString()
      : this.TC(this.skin[_vb.nameBg])
          .darken(this.defaults.light.bg2)
          .toString();

    this.skin[_vb.nameBg3] = _isDark
      ? this.TC(this.skin[_vb.nameBg])
          .lighten(this.defaults.dark.bg3)
          .toString()
      : this.TC(this.skin[_vb.nameBg])
          .darken(this.defaults.light.bg3)
          .toString();

    this.skin[_vb.nameBgHov] = _isDark
      ? this.TC(this.skin[_vb.nameBg])
          .lighten(this.defaults.dark.bgHov)
          .toString()
      : this.TC(this.skin[_vb.nameBg])
          .darken(this.defaults.light.bgHov)
          .toString();

    this.skin[_vb.nameBg2Hov] = _isDark
      ? this.TC(this.skin[_vb.nameBg2])
          .lighten(this.defaults.dark.bgHov)
          .toString()
      : this.TC(this.skin[_vb.nameBg2])
          .darken(this.defaults.light.bgHov)
          .toString();

    this.skin[_vb.nameBg3Hov] = _isDark
      ? this.TC(this.skin[_vb.nameBg3])
          .lighten(this.defaults.dark.bgHov)
          .toString()
      : this.TC(this.skin[_vb.nameBg3])
          .darken(this.defaults.light.bgHov)
          .toString();

    this.skin[_vb.nameRGBA] = this.TC(this.skin[_vb.nameBg])
      .setAlpha(this.defaults.alpha.bg)
      .toRgbString();
    this.skin[_vb.nameRGBA2] = this.TC(this.skin[_vb.nameBg])
      .setAlpha(this.defaults.alpha.bg2)
      .toRgbString();
    this.skin[_vb.nameRGBA3] = this.TC(this.skin[_vb.nameBg])
      .setAlpha(this.defaults.alpha.bg3)
      .toRgbString();
  }

  generateGradientss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let _isGradient = this.skin[_vb.isGradient];

    if (_isGradient) {
      this.skin[_vb.nameG] = `linear-gradient(${
        this.skin[_vb.gradientAngle]
      }deg, ${this.skin[_vb.nameBg_g]} 0%, ${this.skin[_vb.nameBg]} 100%)`;
    } else {
      this.skin[_vb.nameBg_g] = this.skin[_vb.nameBg2];
      this.skin[_vb.nameG] = this.skin[_vb.nameBg];
    }
  }

  generateTextss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);

    this.skin[_vb.nameTxt] = this.TC(this.mergedConfig[_essence].color)
      .setAlpha(this.defaults.txt.txt)
      .toRgbString();
    this.skin[_vb.nameTxt2] = this.TC(this.skin[_vb.nameTxt])
      .setAlpha(this.defaults.txt.txt2)
      .toRgbString();
    this.skin[_vb.nameTxt3] = this.TC(this.skin[_vb.nameTxt])
      .setAlpha(this.defaults.txt.txt3)
      .toRgbString();
  }

  generateAccentss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);

    this.skin[_vb.nameAccent] = this.mergedConfig.accent.background;
    this.skin[_vb.nameAccentTxt] = this.TC(this.mergedConfig.accent.color)
      .setAlpha(this.defaults.txt.txt)
      .toRgbString();
  }

  generateBorderss(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    this.skin[_vb.nameBorder] = this.skin.bodyBg;
  }

  generateBorderRadius(essence) {
    let _essence = essence;
    let _vb = this.verbalData(_essence);
    let borderRadius =
      this.mergedConfig[_essence].borderRadius || "2px 2px 2px 2px";
    this.skin[_vb.nameRadius] = `${borderRadius}`;
  }

  verbalData(name) {
    let data = {};
    data.name = name;
    data.nameBg = data.name + "Bg";
    data.nameBg_g = data.nameBg + "_g";
    data.nameG = data.name + "G";
    data.nameRGBA = data.name + "RGBA";
    data.nameRGBA2 = data.name + "RGBA2";
    data.nameRGBA3 = data.name + "RGBA3";
    data.nameG2 = data.nameG + "2";
    data.nameBgHov = data.nameBg + "Hover";
    data.nameBg2 = data.nameBg + "2";
    data.nameBg2Hov = data.nameBg2 + "Hover";
    data.nameBg3 = data.nameBg + "3";
    data.nameBg3Hov = data.nameBg3 + "Hover";
    data.upperCaseName = data.name[0].toUpperCase() + data.name.substring(1);
    data.isName = "is" + data.upperCaseName + "Bg";
    data.isGradient = "is" + data.upperCaseName + "Gradient";
    data.isGradientReversed = data.isGradient + "Reversed";
    data.gradientAngle = data.upperCaseName + "GradientAngle";

    data.isDark = "is" + data.upperCaseName + "BgDark";

    data.nameTxt = data.name + "Txt";
    data.nameTxt2 = data.nameTxt + "2";
    data.nameTxt3 = data.nameTxt + "3";
    data.nameTxtInverse = data.nameTxt + "Inverse";

    data.isCustomTxt = "isCustom" + data.upperCaseName + "Txt";

    data.nameBorder = data.name + "Border";
    data.isCustomBorder = "isCustom" + data.upperCaseName + "Border";

    data.nameAccent = data.name + "Accent";
    data.isCustomAccent = "isCustom" + data.upperCaseName + "Accent";
    data.nameAccentTxt = data.name + "AccentTxt";

    data.nameRadius = data.name + "Radius";

    return data;
  }

  generateColorLogick(essence) {
    let _essence = essence;
    let _vd = this.verbalData(_essence);
    this.generateBackgrounds(_essence);
    this.generateGradientss(_essence);
    this.generateTextss(_essence);
    this.generateAccentss(_essence);
    this.generateBorderss(_essence);
    this.generateBorderRadius(_essence);

    this.skin[_vd.nameTxtInverse] = this.TC(this.skin[_vd.nameTxt]).isLight()
      ? "#262626"
      : "#fff";
  }

  generateTheme() {
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      this.generateColorLogick(_essence);
    }
  }

  convertSkinToCss(skin) {
    let resultCss = `
    /*Builder partner*/
    :root{\n`;
    for (let i = 0; i < this.configOrder.length; i++) {
      let _essence = this.configOrder[i].name;
      let _vd = this.verbalData(_essence);
      let e = `
      --${_vd.nameBg}: ${skin[_vd.nameBg]};
      --${_vd.nameBg2}: ${skin[_vd.nameBg2]};
      --${_vd.nameBg3}: ${skin[_vd.nameBg3]};
      --${_vd.nameBgHov}: ${skin[_vd.nameBgHov]};
      --${_vd.nameBg2Hov}: ${skin[_vd.nameBg2Hov]};
      --${_vd.nameBg3Hov}: ${skin[_vd.nameBg3Hov]};
      --${_vd.nameRGBA}: ${skin[_vd.nameRGBA]};
      --${_vd.nameRGBA2}: ${skin[_vd.nameRGBA2]};
      --${_vd.nameRGBA3}: ${skin[_vd.nameRGBA3]};
      --${_vd.nameRGBA3}: ${skin[_vd.nameRGBA3]};
      --${_vd.nameTxt}: ${skin[_vd.nameTxt]};
      --${_vd.nameTxt2}: ${skin[_vd.nameTxt2]};
      --${_vd.nameTxt3}: ${skin[_vd.nameTxt3]};
      --${_vd.nameAccent}: ${skin[_vd.nameAccent]};
      --${_vd.nameAccentTxt}: ${skin[_vd.nameAccentTxt]};
      --${_vd.nameBorder}: ${skin[_vd.nameAccent]};
      --${_vd.nameRadius}: ${skin[_vd.nameRadius]};`;
      resultCss += `${e}\n`;
    }

    resultCss += `}\n`;

    console.log(resultCss);
    return resultCss;
  }

  run() {
    this.generateTheme();
    let generatedCss = this.convertSkinToCss(this.skin);
    return generatedCss;
  }
}

const SkinnerInstance = new Skinner(buiderConfig, tinycolor);

writeTestCssFile(SkinnerInstance.run());

function writeTestCssFile(cssStr) {
  console.log(cssStr);
  let css = cssStr;
  fs.writeFile("testSkin.css", css, (err) => {
    if (err) throw err;
  });
}
