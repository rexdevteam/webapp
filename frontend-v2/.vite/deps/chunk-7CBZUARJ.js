import {
  ClassNameGenerator_default,
  DefaultPropsProvider_default,
  GlobalStyles_default,
  capitalize,
  clsx_default,
  composeClasses,
  createChainedFunction,
  debounce,
  defaultTheme_default,
  deprecatedPropType,
  extendSxProp,
  generateUtilityClass,
  generateUtilityClasses,
  identifier_default,
  isMuiElement,
  ownerDocument,
  ownerWindow,
  requirePropFactory,
  require_jsx_runtime,
  require_prop_types,
  setRef,
  styled_default,
  unsupportedProp,
  useControlled,
  useDefaultProps,
  useEnhancedEffect_default,
  useEventCallback_default,
  useForkRef,
  useId
} from "./chunk-ERXGITDL.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/@mui/material/utils/capitalize.js
var capitalize_default = capitalize;

// node_modules/@mui/material/utils/createChainedFunction.js
var createChainedFunction_default = createChainedFunction;

// node_modules/@mui/material/GlobalStyles/GlobalStyles.js
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
function GlobalStyles(props) {
  return (0, import_jsx_runtime.jsx)(GlobalStyles_default, {
    ...props,
    defaultTheme: defaultTheme_default,
    themeId: identifier_default
  });
}
true ? GlobalStyles.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: import_prop_types.default.oneOfType([import_prop_types.default.array, import_prop_types.default.func, import_prop_types.default.number, import_prop_types.default.object, import_prop_types.default.string, import_prop_types.default.bool])
} : void 0;
var GlobalStyles_default2 = GlobalStyles;

// node_modules/@mui/material/utils/memoTheme.js
var arg = {
  theme: void 0
};
function memoTheme(styleFn) {
  let lastValue;
  let lastTheme;
  return (props) => {
    let value = lastValue;
    if (value === void 0 || props.theme !== lastTheme) {
      arg.theme = props.theme;
      value = styleFn(arg);
      lastValue = value;
      lastTheme = props.theme;
    }
    return value;
  };
}

// node_modules/@mui/material/SvgIcon/svgIconClasses.js
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
var svgIconClasses = generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
var svgIconClasses_default = svgIconClasses;

// node_modules/@mui/material/SvgIcon/SvgIcon.js
var React4 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());

// node_modules/@mui/material/zero-styled/index.js
var React2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
function globalCss(styles) {
  return function GlobalStylesWrapper(props) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      (0, import_jsx_runtime2.jsx)(GlobalStyles_default2, {
        styles: typeof styles === "function" ? (theme) => styles({
          theme,
          ...props
        }) : styles
      })
    );
  };
}
function internal_createExtendSxProp() {
  return extendSxProp;
}

// node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js
var React3 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
function DefaultPropsProvider(props) {
  return (0, import_jsx_runtime3.jsx)(DefaultPropsProvider_default, {
    ...props
  });
}
true ? DefaultPropsProvider.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types2.default.node,
  /**
   * @ignore
   */
  value: import_prop_types2.default.object.isRequired
} : void 0;
function useDefaultProps2(params) {
  return useDefaultProps(params);
}

// node_modules/@mui/material/SvgIcon/SvgIcon.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var useUtilityClasses = (ownerState) => {
  const {
    color,
    fontSize,
    classes
  } = ownerState;
  const slots = {
    root: ["root", color !== "inherit" && `color${capitalize_default(color)}`, `fontSize${capitalize_default(fontSize)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};
var SvgIconRoot = styled_default("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.color !== "inherit" && styles[`color${capitalize_default(ownerState.color)}`], styles[`fontSize${capitalize_default(ownerState.fontSize)}`]];
  }
})(memoTheme(({
  theme
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    flexShrink: 0,
    transition: (_d = (_a = theme.transitions) == null ? void 0 : _a.create) == null ? void 0 : _d.call(_a, "fill", {
      duration: (_c = (_b = (theme.vars ?? theme).transitions) == null ? void 0 : _b.duration) == null ? void 0 : _c.shorter
    }),
    variants: [
      {
        props: (props) => !props.hasSvgAsChild,
        style: {
          // the <svg> will define the property that has `currentColor`
          // for example heroicons uses fill="none" and stroke="currentColor"
          fill: "currentColor"
        }
      },
      {
        props: {
          fontSize: "inherit"
        },
        style: {
          fontSize: "inherit"
        }
      },
      {
        props: {
          fontSize: "small"
        },
        style: {
          fontSize: ((_f = (_e = theme.typography) == null ? void 0 : _e.pxToRem) == null ? void 0 : _f.call(_e, 20)) || "1.25rem"
        }
      },
      {
        props: {
          fontSize: "medium"
        },
        style: {
          fontSize: ((_h = (_g = theme.typography) == null ? void 0 : _g.pxToRem) == null ? void 0 : _h.call(_g, 24)) || "1.5rem"
        }
      },
      {
        props: {
          fontSize: "large"
        },
        style: {
          fontSize: ((_j = (_i = theme.typography) == null ? void 0 : _i.pxToRem) == null ? void 0 : _j.call(_i, 35)) || "2.1875rem"
        }
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((theme.vars ?? theme).palette).filter(([, value]) => value && value.main).map(([color]) => {
        var _a2, _b2;
        return {
          props: {
            color
          },
          style: {
            color: (_b2 = (_a2 = (theme.vars ?? theme).palette) == null ? void 0 : _a2[color]) == null ? void 0 : _b2.main
          }
        };
      }),
      {
        props: {
          color: "action"
        },
        style: {
          color: (_l = (_k = (theme.vars ?? theme).palette) == null ? void 0 : _k.action) == null ? void 0 : _l.active
        }
      },
      {
        props: {
          color: "disabled"
        },
        style: {
          color: (_n = (_m = (theme.vars ?? theme).palette) == null ? void 0 : _m.action) == null ? void 0 : _n.disabled
        }
      },
      {
        props: {
          color: "inherit"
        },
        style: {
          color: void 0
        }
      }
    ]
  };
}));
var SvgIcon = React4.forwardRef(function SvgIcon2(inProps, ref) {
  const props = useDefaultProps2({
    props: inProps,
    name: "MuiSvgIcon"
  });
  const {
    children,
    className,
    color = "inherit",
    component = "svg",
    fontSize = "medium",
    htmlColor,
    inheritViewBox = false,
    titleAccess,
    viewBox = "0 0 24 24",
    ...other
  } = props;
  const hasSvgAsChild = React4.isValidElement(children) && children.type === "svg";
  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    instanceFontSize: inProps.fontSize,
    inheritViewBox,
    viewBox,
    hasSvgAsChild
  };
  const more = {};
  if (!inheritViewBox) {
    more.viewBox = viewBox;
  }
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime4.jsxs)(SvgIconRoot, {
    as: component,
    className: clsx_default(classes.root, className),
    focusable: "false",
    color: htmlColor,
    "aria-hidden": titleAccess ? void 0 : true,
    role: titleAccess ? "img" : void 0,
    ref,
    ...more,
    ...other,
    ...hasSvgAsChild && children.props,
    ownerState,
    children: [hasSvgAsChild ? children.props.children : children, titleAccess ? (0, import_jsx_runtime4.jsx)("title", {
      children: titleAccess
    }) : null]
  });
});
true ? SvgIcon.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: import_prop_types3.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types3.default.object,
  /**
   * @ignore
   */
  className: import_prop_types3.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: import_prop_types3.default.oneOfType([import_prop_types3.default.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types3.default.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types3.default.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: import_prop_types3.default.oneOfType([import_prop_types3.default.oneOf(["inherit", "large", "medium", "small"]), import_prop_types3.default.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: import_prop_types3.default.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: import_prop_types3.default.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: import_prop_types3.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: import_prop_types3.default.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: import_prop_types3.default.string
} : void 0;
if (SvgIcon) {
  SvgIcon.muiName = "SvgIcon";
}
var SvgIcon_default = SvgIcon;

// node_modules/@mui/material/utils/createSvgIcon.js
var React5 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return (0, import_jsx_runtime5.jsx)(SvgIcon_default, {
      "data-testid": `${displayName}Icon`,
      ref,
      ...props,
      children: path
    });
  }
  if (true) {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon_default.muiName;
  return React5.memo(React5.forwardRef(Component));
}

// node_modules/@mui/material/utils/debounce.js
var debounce_default = debounce;

// node_modules/@mui/material/utils/deprecatedPropType.js
var deprecatedPropType_default = deprecatedPropType;

// node_modules/@mui/material/utils/isMuiElement.js
var isMuiElement_default = isMuiElement;

// node_modules/@mui/material/utils/ownerDocument.js
var ownerDocument_default = ownerDocument;

// node_modules/@mui/material/utils/ownerWindow.js
var ownerWindow_default = ownerWindow;

// node_modules/@mui/material/utils/requirePropFactory.js
var requirePropFactory_default = requirePropFactory;

// node_modules/@mui/material/utils/setRef.js
var setRef_default = setRef;

// node_modules/@mui/material/utils/useEnhancedEffect.js
var useEnhancedEffect_default2 = useEnhancedEffect_default;

// node_modules/@mui/material/utils/useId.js
var useId_default = useId;

// node_modules/@mui/material/utils/unsupportedProp.js
var unsupportedProp_default = unsupportedProp;

// node_modules/@mui/material/utils/useControlled.js
var useControlled_default = useControlled;

// node_modules/@mui/material/utils/useEventCallback.js
var useEventCallback_default2 = useEventCallback_default;

// node_modules/@mui/material/utils/useForkRef.js
var useForkRef_default = useForkRef;

// node_modules/@mui/material/utils/index.js
var unstable_ClassNameGenerator = {
  configure: (generator) => {
    if (true) {
      console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join("\n"));
    }
    ClassNameGenerator_default.configure(generator);
  }
};

export {
  capitalize_default,
  createChainedFunction_default,
  GlobalStyles_default2 as GlobalStyles_default,
  globalCss,
  internal_createExtendSxProp,
  memoTheme,
  useDefaultProps2 as useDefaultProps,
  getSvgIconUtilityClass,
  svgIconClasses_default,
  SvgIcon_default,
  createSvgIcon,
  debounce_default,
  deprecatedPropType_default,
  isMuiElement_default,
  ownerDocument_default,
  ownerWindow_default,
  requirePropFactory_default,
  setRef_default,
  useEnhancedEffect_default2 as useEnhancedEffect_default,
  useId_default,
  unsupportedProp_default,
  useControlled_default,
  useEventCallback_default2 as useEventCallback_default,
  useForkRef_default,
  unstable_ClassNameGenerator
};
//# sourceMappingURL=chunk-7CBZUARJ.js.map
