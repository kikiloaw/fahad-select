import { createElementBlock as f, openBlock as c, withKeys as v, normalizeClass as E, withModifiers as u, renderSlot as m, createElementVNode as p, createBlock as X, createVNode as R, createCommentVNode as y, withDirectives as M, Fragment as G, renderList as N, toDisplayString as O, vShow as A, Transition as q, withCtx as $, normalizeStyle as C, createTextVNode as B, Teleport as Y, useCssVars as J, computed as Q, ref as k, watch as H, onMounted as Z, unref as x, nextTick as _ } from "vue";
import ee from "axios";
import { debounce as te } from "lodash";
function F(e) {
  return e === 0 ? !1 : Array.isArray(e) && e.length === 0 ? !0 : !e;
}
function ie(e) {
  return (...t) => !e(...t);
}
function se(e, t) {
  return e === void 0 && (e = "undefined"), e === null && (e = "null"), e === !1 && (e = "false"), e.toString().toLowerCase().indexOf(t.trim()) !== -1;
}
function le(e) {
  return e.filter((t) => !t.$isLabel);
}
function P(e, t) {
  return (i) => i.reduce((n, l) => l[e] && l[e].length ? (n.push({
    $groupLabel: l[t],
    $isLabel: !0
  }), n.concat(l[e])) : n, []);
}
const U = (...e) => (t) => e.reduce((i, n) => n(i), t);
var re = {
  data() {
    return {
      search: "",
      isOpen: !1,
      preferredOpenDirection: "below",
      optimizedHeight: this.maxHeight
    };
  },
  props: {
    /**
     * Decide whether to filter the results based on search query.
     * Useful for async filtering, where we search through more complex data.
     * @type {Boolean}
     */
    internalSearch: {
      type: Boolean,
      default: !0
    },
    /**
     * Array of available options: Objects, Strings or Integers.
     * If array of objects, visible label will default to option.label.
     * If `labal` prop is passed, label will equal option['label']
     * @type {Array}
     */
    options: {
      type: Array,
      required: !0
    },
    /**
     * Equivalent to the `multiple` attribute on a `<select>` input.
     * @default false
     * @type {Boolean}
     */
    multiple: {
      type: Boolean,
      default: !1
    },
    /**
     * Key to compare objects
     * @default 'id'
     * @type {String}
     */
    trackBy: {
      type: String
    },
    /**
     * Label to look for in option Object
     * @default 'label'
     * @type {String}
     */
    label: {
      type: String
    },
    /**
     * Enable/disable search in options
     * @default true
     * @type {Boolean}
     */
    searchable: {
      type: Boolean,
      default: !0
    },
    /**
     * Clear the search input after `)
     * @default true
     * @type {Boolean}
     */
    clearOnSelect: {
      type: Boolean,
      default: !0
    },
    /**
     * Hide already selected options
     * @default false
     * @type {Boolean}
     */
    hideSelected: {
      type: Boolean,
      default: !1
    },
    /**
     * Equivalent to the `placeholder` attribute on a `<select>` input.
     * @default 'Select option'
     * @type {String}
     */
    placeholder: {
      type: String,
      default: "Select option"
    },
    /**
     * Allow to remove all selected values
     * @default true
     * @type {Boolean}
     */
    allowEmpty: {
      type: Boolean,
      default: !0
    },
    /**
     * Reset this.internalValue, this.search after this.internalValue changes.
     * Useful if want to create a stateless dropdown.
     * @default false
     * @type {Boolean}
     */
    resetAfter: {
      type: Boolean,
      default: !1
    },
    /**
     * Enable/disable closing after selecting an option
     * @default true
     * @type {Boolean}
     */
    closeOnSelect: {
      type: Boolean,
      default: !0
    },
    /**
     * Function to interpolate the custom label
     * @default false
     * @type {Function}
     */
    customLabel: {
      type: Function,
      default(e, t) {
        return F(e) ? "" : t ? e[t] : e;
      }
    },
    /**
     * Disable / Enable tagging
     * @default false
     * @type {Boolean}
     */
    taggable: {
      type: Boolean,
      default: !1
    },
    /**
     * String to show when highlighting a potential tag
     * @default 'Press enter to create a tag'
     * @type {String}
    */
    tagPlaceholder: {
      type: String,
      default: "Press enter to create a tag"
    },
    /**
     * By default new tags will appear above the search results.
     * Changing to 'bottom' will revert this behaviour
     * and will proritize the search results
     * @default 'top'
     * @type {String}
    */
    tagPosition: {
      type: String,
      default: "top"
    },
    /**
     * Number of allowed selected options. No limit if 0.
     * @default 0
     * @type {Number}
    */
    max: {
      type: [Number, Boolean],
      default: !1
    },
    /**
     * Will be passed with all events as second param.
     * Useful for identifying events origin.
     * @default null
     * @type {String|Integer}
    */
    id: {
      default: null
    },
    /**
     * Limits the options displayed in the dropdown
     * to the first X options.
     * @default 1000
     * @type {Integer}
    */
    optionsLimit: {
      type: Number,
      default: 1e3
    },
    /**
     * Name of the property containing
     * the group values
     * @default 1000
     * @type {String}
    */
    groupValues: {
      type: String
    },
    /**
     * Name of the property containing
     * the group label
     * @default 1000
     * @type {String}
    */
    groupLabel: {
      type: String
    },
    /**
     * Allow to select all group values
     * by selecting the group label
     * @default false
     * @type {Boolean}
     */
    groupSelect: {
      type: Boolean,
      default: !1
    },
    /**
     * Array of keyboard keys to block
     * when selecting
     * @default 1000
     * @type {String}
    */
    blockKeys: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * Prevent from wiping up the search value
     * @default false
     * @type {Boolean}
    */
    preserveSearch: {
      type: Boolean,
      default: !1
    },
    /**
     * Select 1st options if value is empty
     * @default false
     * @type {Boolean}
    */
    preselectFirst: {
      type: Boolean,
      default: !1
    },
    /**
     * Prevent autofocus
     * @default false
     * @type {Boolean}
     */
    preventAutofocus: {
      type: Boolean,
      default: !1
    },
    /**
     * Allows a custom function for sorting search/filtered results.
     * @default null
     * @type {Function}
     */
    filteringSortFunc: {
      type: Function,
      default: null
    }
  },
  mounted() {
    !this.multiple && this.max && console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false."), this.preselectFirst && !this.internalValue.length && this.options.length && this.select(this.filteredOptions[0]);
  },
  computed: {
    internalValue() {
      return this.modelValue || this.modelValue === 0 ? Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue] : [];
    },
    filteredOptions() {
      const e = this.search || "", t = e.toLowerCase().trim();
      let i = this.options.concat();
      return this.internalSearch ? i = this.groupValues ? this.filterAndFlat(i, t, this.label) : this.filterOptions(i, t, this.label, this.customLabel) : i = this.groupValues ? P(this.groupValues, this.groupLabel)(i) : i, i = this.hideSelected ? i.filter(ie(this.isSelected)) : i, this.taggable && t.length && !this.isExistingOption(t) && (this.tagPosition === "bottom" ? i.push({ isTag: !0, label: e }) : i.unshift({ isTag: !0, label: e })), i.slice(0, this.optionsLimit);
    },
    valueKeys() {
      return this.trackBy ? this.internalValue.map((e) => e[this.trackBy]) : this.internalValue;
    },
    optionKeys() {
      return (this.groupValues ? this.flatAndStrip(this.options) : this.options).map((t) => this.customLabel(t, this.label).toString().toLowerCase());
    },
    currentOptionLabel() {
      return this.multiple ? this.searchable ? "" : this.placeholder : this.internalValue.length ? this.getOptionLabel(this.internalValue[0]) : this.searchable ? "" : this.placeholder;
    }
  },
  watch: {
    internalValue: {
      handler() {
        this.resetAfter && this.internalValue.length && (this.search = "", this.$emit("update:modelValue", this.multiple ? [] : null));
      },
      deep: !0
    },
    search() {
      this.$emit("search-change", this.search);
    }
  },
  emits: ["open", "search-change", "close", "select", "update:modelValue", "remove", "tag"],
  methods: {
    /**
     * Returns the internalValue in a way it can be emited to the parent
     * @returns {Object||Array||String||Integer}
     */
    getValue() {
      return this.multiple ? this.internalValue : this.internalValue.length === 0 ? null : this.internalValue[0];
    },
    /**
     * Filters and then flattens the options list
     * @param  {Array}
     * @return {Array} returns a filtered and flat options list
     */
    filterAndFlat(e, t, i) {
      return U(
        this.filterGroups(t, i, this.groupValues, this.groupLabel, this.customLabel),
        P(this.groupValues, this.groupLabel)
      )(e);
    },
    /**
     * Flattens and then strips the group labels from the options list
     * @param  {Array}
     * @return {Array} returns a flat options list without group labels
     */
    flatAndStrip(e) {
      return U(
        P(this.groupValues, this.groupLabel),
        le
      )(e);
    },
    /**
     * Updates the search value
     * @param  {String}
     */
    updateSearch(e) {
      this.search = e;
    },
    /**
     * Finds out if the given query is already present
     * in the available options
     * @param  {String}
     * @return {Boolean} returns true if element is available
     */
    isExistingOption(e) {
      return this.options ? this.optionKeys.indexOf(e) > -1 : !1;
    },
    /**
     * Finds out if the given element is already present
     * in the result value
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is selected
     */
    isSelected(e) {
      const t = this.trackBy ? e[this.trackBy] : e;
      return this.valueKeys.indexOf(t) > -1;
    },
    /**
     * Finds out if the given option is disabled
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is disabled
     */
    isOptionDisabled(e) {
      return !!e.$isDisabled;
    },
    /**
     * Returns empty string when options is null/undefined
     * Returns tag query if option is tag.
     * Returns the customLabel() results and casts it to string.
     *
     * @param  {Object||String||Integer} Passed option
     * @returns {Object||String}
     */
    getOptionLabel(e) {
      if (F(e)) return "";
      if (e.isTag) return e.label;
      if (e.$isLabel) return e.$groupLabel;
      const t = this.customLabel(e, this.label);
      return F(t) ? "" : t;
    },
    /**
     * Add the given option to the list of selected options
     * or sets the option as the selected option.
     * If option is already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} option to select/deselect
     * @param  {Boolean} block removing
     */
    select(e, t) {
      if (e.$isLabel && this.groupSelect) {
        this.selectGroup(e);
        return;
      }
      if (!(this.blockKeys.indexOf(t) !== -1 || this.disabled || e.$isDisabled || e.$isLabel) && !(this.max && this.multiple && this.internalValue.length === this.max) && !(t === "Tab" && !this.pointerDirty)) {
        if (e.isTag)
          this.$emit("tag", e.label, this.id), this.search = "", this.closeOnSelect && !this.multiple && this.deactivate();
        else {
          if (this.isSelected(e)) {
            t !== "Tab" && this.removeElement(e);
            return;
          }
          this.multiple ? this.$emit("update:modelValue", this.internalValue.concat([e])) : this.$emit("update:modelValue", e), this.$emit("select", e, this.id), this.clearOnSelect && (this.search = "");
        }
        this.closeOnSelect && this.deactivate();
      }
    },
    /**
     * Add the given group options to the list of selected options
     * If all group optiona are already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} group to select/deselect
     */
    selectGroup(e) {
      const t = this.options.find((i) => i[this.groupLabel] === e.$groupLabel);
      if (t) {
        if (this.wholeGroupSelected(t)) {
          this.$emit("remove", t[this.groupValues], this.id);
          const i = this.trackBy ? t[this.groupValues].map((l) => l[this.trackBy]) : t[this.groupValues], n = this.internalValue.filter(
            (l) => i.indexOf(this.trackBy ? l[this.trackBy] : l) === -1
          );
          this.$emit("update:modelValue", n);
        } else {
          const i = t[this.groupValues].filter(
            (n) => !(this.isOptionDisabled(n) || this.isSelected(n))
          );
          this.max && i.splice(this.max - this.internalValue.length), this.$emit("select", i, this.id), this.$emit(
            "update:modelValue",
            this.internalValue.concat(i)
          );
        }
        this.closeOnSelect && this.deactivate();
      }
    },
    /**
     * Helper to identify if all values in a group are selected
     *
     * @param {Object} group to validated selected values against
     */
    wholeGroupSelected(e) {
      return e[this.groupValues].every(
        (t) => this.isSelected(t) || this.isOptionDisabled(t)
      );
    },
    /**
     * Helper to identify if all values in a group are disabled
     *
     * @param {Object} group to check for disabled values
     */
    wholeGroupDisabled(e) {
      return e[this.groupValues].every(this.isOptionDisabled);
    },
    /**
     * Removes the given option from the selected options.
     * Additionally checks this.allowEmpty prop if option can be removed when
     * it is the last selected option.
     *
     * @param  {type} option description
     * @return {type}        description
     */
    removeElement(e, t = !0) {
      if (this.disabled || e.$isDisabled) return;
      if (!this.allowEmpty && this.internalValue.length <= 1) {
        this.deactivate();
        return;
      }
      const i = typeof e == "object" ? this.valueKeys.indexOf(e[this.trackBy]) : this.valueKeys.indexOf(e);
      if (this.multiple) {
        const n = this.internalValue.slice(0, i).concat(this.internalValue.slice(i + 1));
        this.$emit("update:modelValue", n);
      } else
        this.$emit("update:modelValue", null);
      this.$emit("remove", e, this.id), this.closeOnSelect && t && this.deactivate();
    },
    /**
     * Calls this.removeElement() with the last element
     * from this.internalValue (selected element Array)
     *
     * @fires this#removeElement
     */
    removeLastElement() {
      this.blockKeys.indexOf("Delete") === -1 && this.search.length === 0 && Array.isArray(this.internalValue) && this.internalValue.length && this.removeElement(this.internalValue[this.internalValue.length - 1], !1);
    },
    /**
     * Opens the multiselect’s dropdown.
     * Sets this.isOpen to TRUE
     */
    activate() {
      this.isOpen || this.disabled || (this.adjustPosition(), this.groupValues && this.pointer === 0 && this.filteredOptions.length && (this.pointer = 1), this.isOpen = !0, this.searchable ? (this.preserveSearch || (this.search = ""), this.preventAutofocus || this.$nextTick(() => this.$refs.search && this.$refs.search.focus())) : this.preventAutofocus || typeof this.$el < "u" && this.$el.focus(), this.$emit("open", this.id));
    },
    /**
     * Closes the multiselect’s dropdown.
     * Sets this.isOpen to FALSE
     */
    deactivate() {
      this.isOpen && (this.isOpen = !1, this.searchable ? this.$refs.search !== null && typeof this.$refs.search < "u" && this.$refs.search.blur() : typeof this.$el < "u" && this.$el.blur(), this.preserveSearch || (this.search = ""), this.$emit("close", this.getValue(), this.id));
    },
    /**
     * Call this.activate() or this.deactivate()
     * depending on this.isOpen value.
     *
     * @fires this#activate || this#deactivate
     * @property {Boolean} isOpen indicates if dropdown is open
     */
    toggle() {
      this.isOpen ? this.deactivate() : this.activate();
    },
    /**
     * Updates the hasEnoughSpace variable used for
     * detecting where to expand the dropdown
     */
    adjustPosition() {
      if (typeof window > "u") return;
      const e = this.$el.getBoundingClientRect().top, t = window.innerHeight - this.$el.getBoundingClientRect().bottom;
      t > this.maxHeight || t > e || this.openDirection === "below" || this.openDirection === "bottom" ? (this.preferredOpenDirection = "below", this.optimizedHeight = Math.min(t - 40, this.maxHeight)) : (this.preferredOpenDirection = "above", this.optimizedHeight = Math.min(e - 40, this.maxHeight));
    },
    /**
     * Filters and sorts the options ready for selection
     * @param {Array} options
     * @param {String} search
     * @param {String} label
     * @param {Function} customLabel
     * @returns {Array}
     */
    filterOptions(e, t, i, n) {
      return t ? e.filter((l) => se(n(l, i), t)).sort((l, h) => typeof this.filteringSortFunc == "function" ? this.filteringSortFunc(l, h) : n(l, i).length - n(h, i).length) : e;
    },
    /**
     *
     * @param {String} search
     * @param {String} label
     * @param {String} values
     * @param {String} groupLabel
     * @param {function} customLabel
     * @returns {function(*): *}
     */
    filterGroups(e, t, i, n, l) {
      return (h) => h.map((s) => {
        if (!s[i])
          return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."), [];
        const g = this.filterOptions(s[i], e, t, l);
        return g.length ? {
          [n]: s[n],
          [i]: g
        } : [];
      });
    }
  }
}, ne = {
  data() {
    return {
      pointer: 0,
      pointerDirty: !1
    };
  },
  props: {
    /**
     * Enable/disable highlighting of the pointed value.
     * @type {Boolean}
     * @default true
     */
    showPointer: {
      type: Boolean,
      default: !0
    },
    optionHeight: {
      type: Number,
      default: 40
    }
  },
  computed: {
    pointerPosition() {
      return this.pointer * this.optionHeight;
    },
    visibleElements() {
      return this.optimizedHeight / this.optionHeight;
    }
  },
  watch: {
    filteredOptions() {
      this.pointerAdjust();
    },
    isOpen() {
      this.pointerDirty = !1;
    },
    pointer() {
      this.$refs.search && this.$refs.search.setAttribute("aria-activedescendant", this.id + "-" + this.pointer.toString());
    }
  },
  methods: {
    optionHighlight(e, t) {
      return {
        "multiselect__option--highlight": e === this.pointer && this.showPointer,
        "multiselect__option--selected": this.isSelected(t)
      };
    },
    groupHighlight(e, t) {
      if (!this.groupSelect)
        return [
          "multiselect__option--disabled",
          { "multiselect__option--group": t.$isLabel }
        ];
      const i = this.options.find((n) => n[this.groupLabel] === t.$groupLabel);
      return i && !this.wholeGroupDisabled(i) ? [
        "multiselect__option--group",
        { "multiselect__option--highlight": e === this.pointer && this.showPointer },
        { "multiselect__option--group-selected": this.wholeGroupSelected(i) }
      ] : "multiselect__option--disabled";
    },
    addPointerElement({ key: e } = "Enter") {
      this.filteredOptions.length > 0 && this.select(this.filteredOptions[this.pointer], e), this.pointerReset();
    },
    pointerForward() {
      var e;
      this.pointer < this.filteredOptions.length - 1 && (this.pointer++, ((e = this.$refs.list) == null ? void 0 : e.scrollTop) <= this.pointerPosition - (this.visibleElements - 1) * this.optionHeight && (this.$refs.list.scrollTop = this.pointerPosition - (this.visibleElements - 1) * this.optionHeight), this.filteredOptions[this.pointer] && this.filteredOptions[this.pointer].$isLabel && !this.groupSelect && this.pointerForward()), this.pointerDirty = !0;
    },
    pointerBackward() {
      var e;
      this.pointer > 0 ? (this.pointer--, ((e = this.$refs.list) == null ? void 0 : e.scrollTop) >= this.pointerPosition && (this.$refs.list.scrollTop = this.pointerPosition), this.filteredOptions[this.pointer] && this.filteredOptions[this.pointer].$isLabel && !this.groupSelect && this.pointerBackward()) : this.filteredOptions[this.pointer] && this.filteredOptions[0].$isLabel && !this.groupSelect && this.pointerForward(), this.pointerDirty = !0;
    },
    pointerReset() {
      this.closeOnSelect && (this.pointer = 0, this.$refs.list && (this.$refs.list.scrollTop = 0));
    },
    pointerAdjust() {
      this.pointer >= this.filteredOptions.length - 1 && (this.pointer = this.filteredOptions.length ? this.filteredOptions.length - 1 : 0), this.filteredOptions.length > 0 && this.filteredOptions[this.pointer].$isLabel && !this.groupSelect && this.pointerForward();
    },
    pointerSet(e) {
      this.pointer = e, this.pointerDirty = !0;
    }
  }
}, z = {
  name: "vue-multiselect",
  mixins: [re, ne],
  compatConfig: {
    MODE: 3,
    ATTR_ENUMERATED_COERCION: !1
  },
  props: {
    /**
       * name attribute to match optional label element
       * @default ''
       * @type {String}
       */
    name: {
      type: String,
      default: ""
    },
    /**
       * Presets the selected options value.
       * @type {Object||Array||String||Integer}
       */
    modelValue: {
      type: null,
      default() {
        return [];
      }
    },
    /**
       * String to show when pointing to an option
       * @default 'Press enter to select'
       * @type {String}
       */
    selectLabel: {
      type: String,
      default: "Press enter to select"
    },
    /**
       * String to show when pointing to an option
       * @default 'Press enter to select'
       * @type {String}
       */
    selectGroupLabel: {
      type: String,
      default: "Press enter to select group"
    },
    /**
       * String to show next to selected option
       * @default 'Selected'
       * @type {String}
       */
    selectedLabel: {
      type: String,
      default: "Selected"
    },
    /**
       * String to show when pointing to an already selected option
       * @default 'Press enter to remove'
       * @type {String}
       */
    deselectLabel: {
      type: String,
      default: "Press enter to remove"
    },
    /**
       * String to show when pointing to an already selected option
       * @default 'Press enter to remove'
       * @type {String}
       */
    deselectGroupLabel: {
      type: String,
      default: "Press enter to deselect group"
    },
    /**
       * Decide whether to show pointer labels
       * @default true
       * @type {Boolean}
       */
    showLabels: {
      type: Boolean,
      default: !0
    },
    /**
       * Limit the display of selected options. The rest will be hidden within the limitText string.
       * @default 99999
       * @type {Integer}
       */
    limit: {
      type: Number,
      default: 99999
    },
    /**
       * Sets maxHeight style value of the dropdown
       * @default 300
       * @type {Integer}
       */
    maxHeight: {
      type: Number,
      default: 300
    },
    /**
       * Function that process the message shown when selected
       * elements pass the defined limit.
       * @default 'and * more'
       * @param {Int} count Number of elements more than limit
       * @type {Function}
       */
    limitText: {
      type: Function,
      default: (e) => `and ${e} more`
    },
    /**
       * Set true to trigger the loading spinner.
       * @default False
       * @type {Boolean}
       */
    loading: {
      type: Boolean,
      default: !1
    },
    /**
       * Disables the multiselect if true.
       * @default false
       * @type {Boolean}
       */
    disabled: {
      type: Boolean,
      default: !1
    },
    /**
     * Enables search input's spellcheck if true.
     * @default false
     * @type {Boolean}
     */
    spellcheck: {
      type: Boolean,
      default: !1
    },
    /**
       * Fixed opening direction
       * @default ''
       * @type {String}
       */
    openDirection: {
      type: String,
      default: ""
    },
    /**
       * Shows slot with message about empty options
       * @default true
       * @type {Boolean}
       */
    showNoOptions: {
      type: Boolean,
      default: !0
    },
    showNoResults: {
      type: Boolean,
      default: !0
    },
    tabindex: {
      type: Number,
      default: 0
    },
    /**
     * Adds Required attribute to the input element when there is no value selected
     * @default false
     * @type {Boolean}
     */
    required: {
      type: Boolean,
      default: !1
    },
    /**
     * Uses Vue Teleport's feature. Teleports the open dropdown to the bottom of the body element
     * @default false
     * @type {Boolean}
     */
    useTeleport: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      dropdownStyles: {},
      ready: !1
    };
  },
  computed: {
    hasOptionGroup() {
      return this.groupValues && this.groupLabel && this.groupSelect;
    },
    isSingleLabelVisible() {
      return (this.singleValue || this.singleValue === 0) && (!this.isOpen || !this.searchable) && !this.visibleValues.length;
    },
    isPlaceholderVisible() {
      return !this.internalValue.length && (!this.searchable || !this.isOpen);
    },
    visibleValues() {
      return this.multiple ? this.internalValue.slice(0, this.limit) : [];
    },
    singleValue() {
      return this.internalValue[0];
    },
    deselectLabelText() {
      return this.showLabels ? this.deselectLabel : "";
    },
    deselectGroupLabelText() {
      return this.showLabels ? this.deselectGroupLabel : "";
    },
    selectLabelText() {
      return this.showLabels ? this.selectLabel : "";
    },
    selectGroupLabelText() {
      return this.showLabels ? this.selectGroupLabel : "";
    },
    selectedLabelText() {
      return this.showLabels ? this.selectedLabel : "";
    },
    inputStyle() {
      return this.searchable || this.multiple && this.modelValue && this.modelValue.length ? this.isOpen ? { width: "100%" } : { width: "0", position: "absolute", padding: "0" } : "";
    },
    contentStyle() {
      return this.options.length ? { display: "inline-block" } : { display: "block" };
    },
    isAbove() {
      return this.openDirection === "above" || this.openDirection === "top" ? !0 : this.openDirection === "below" || this.openDirection === "bottom" ? !1 : this.preferredOpenDirection === "above";
    },
    showSearchInput() {
      return this.searchable && (this.hasSingleSelectedSlot && (this.visibleSingleValue || this.visibleSingleValue === 0) ? this.isOpen : !0);
    },
    isRequired() {
      return this.required === !1 ? !1 : this.internalValue.length <= 0;
    }
  },
  watch: {
    isOpen(e) {
      e && (this.useTeleport ? (this.ready = !1, this.$nextTick(() => {
        const t = this.$el.getBoundingClientRect();
        this.dropdownStyles = {
          position: "absolute",
          top: `${t.bottom + window.scrollY}px`,
          left: `${t.left + window.scrollX}px`,
          width: `${t.width}px`,
          zIndex: 9999
        }, this.ready = !0;
      })) : this.ready = !0);
    }
  }
};
const ae = ["tabindex", "aria-expanded", "aria-owns", "aria-activedescendant"], oe = {
  ref: "tags",
  class: "multiselect__tags"
}, ue = { class: "multiselect__tags-wrap" }, he = ["textContent"], de = ["onKeypress", "onMousedown"], pe = ["textContent"], ce = { class: "multiselect__spinner" }, fe = ["name", "id", "spellcheck", "placeholder", "required", "value", "disabled", "tabindex", "aria-label", "aria-controls"], ge = ["id", "aria-multiselectable"], me = { key: 0 }, be = { class: "multiselect__option" }, ve = ["aria-selected", "id", "role"], ye = ["onClick", "onMouseenter", "data-select", "data-selected", "data-deselect"], Se = ["data-select", "data-deselect", "onMouseenter", "onMousedown"], Ve = { class: "multiselect__option" }, Oe = { class: "multiselect__option" };
function we(e, t, i, n, l, h) {
  return c(), f("div", {
    tabindex: e.searchable ? -1 : i.tabindex,
    class: E([{ "multiselect--active": e.isOpen, "multiselect--disabled": i.disabled, "multiselect--above": h.isAbove, "multiselect--has-options-group": h.hasOptionGroup }, "multiselect"]),
    onFocus: t[14] || (t[14] = (s) => e.activate()),
    onBlur: t[15] || (t[15] = (s) => e.searchable ? !1 : e.deactivate()),
    onKeydown: [
      t[16] || (t[16] = v(u((s) => e.pointerForward(), ["self", "prevent"]), ["down"])),
      t[17] || (t[17] = v(u((s) => e.pointerBackward(), ["self", "prevent"]), ["up"]))
    ],
    onKeypress: t[18] || (t[18] = v(u((s) => e.addPointerElement(s), ["stop", "self"]), ["enter", "tab"])),
    onKeyup: t[19] || (t[19] = v((s) => e.deactivate(), ["esc"])),
    role: "combobox",
    "aria-expanded": e.isOpen,
    "aria-owns": "listbox-" + e.id,
    "aria-activedescendant": e.isOpen && e.pointer !== null ? e.id + "-" + e.pointer : null
  }, [
    m(e.$slots, "caret", { toggle: e.toggle }, () => [
      p(
        "div",
        {
          onMousedown: t[0] || (t[0] = u((s) => e.toggle(), ["prevent", "stop"])),
          class: "multiselect__select"
        },
        null,
        32
        /* NEED_HYDRATION */
      )
    ]),
    m(e.$slots, "clear", { search: e.search }),
    p(
      "div",
      oe,
      [
        m(e.$slots, "selection", {
          search: e.search,
          remove: e.removeElement,
          values: h.visibleValues,
          isOpen: e.isOpen
        }, () => [
          M(p(
            "div",
            ue,
            [
              (c(!0), f(
                G,
                null,
                N(h.visibleValues, (s, g) => m(e.$slots, "tag", {
                  option: s,
                  search: e.search,
                  remove: e.removeElement
                }, () => [
                  (c(), f(
                    "span",
                    {
                      class: "multiselect__tag",
                      key: g,
                      onMousedown: t[1] || (t[1] = u(() => {
                      }, ["prevent"]))
                    },
                    [
                      p("span", {
                        textContent: O(e.getOptionLabel(s))
                      }, null, 8, he),
                      p("i", {
                        tabindex: "1",
                        onKeypress: v(u((S) => e.removeElement(s), ["prevent"]), ["enter"]),
                        onMousedown: u((S) => e.removeElement(s), ["prevent"]),
                        class: "multiselect__tag-icon"
                      }, null, 40, de)
                    ],
                    32
                    /* NEED_HYDRATION */
                  ))
                ])),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ],
            512
            /* NEED_PATCH */
          ), [
            [A, h.visibleValues.length > 0]
          ]),
          e.internalValue && e.internalValue.length > i.limit ? m(e.$slots, "limit", { key: 0 }, () => [
            p("strong", {
              class: "multiselect__strong",
              textContent: O(i.limitText(e.internalValue.length - i.limit))
            }, null, 8, pe)
          ]) : y("v-if", !0)
        ]),
        R(q, { name: "multiselect__loading" }, {
          default: $(() => [
            m(e.$slots, "loading", {}, () => [
              M(p(
                "div",
                ce,
                null,
                512
                /* NEED_PATCH */
              ), [
                [A, i.loading]
              ])
            ])
          ]),
          _: 3
          /* FORWARDED */
        }),
        e.searchable ? (c(), f("input", {
          key: 0,
          ref: "search",
          name: i.name,
          id: e.id,
          type: "text",
          autocomplete: "off",
          spellcheck: i.spellcheck,
          placeholder: e.placeholder,
          required: h.isRequired,
          style: C(h.inputStyle),
          value: e.search,
          disabled: i.disabled,
          tabindex: i.tabindex,
          "aria-label": i.name + "-searchbox",
          onInput: t[2] || (t[2] = (s) => e.updateSearch(s.target.value)),
          onFocus: t[3] || (t[3] = u((s) => e.activate(), ["prevent"])),
          onBlur: t[4] || (t[4] = u((s) => e.deactivate(), ["prevent"])),
          onKeyup: t[5] || (t[5] = v((s) => e.deactivate(), ["esc"])),
          onKeydown: [
            t[6] || (t[6] = v(u((s) => e.pointerForward(), ["prevent"]), ["down"])),
            t[7] || (t[7] = v(u((s) => e.pointerBackward(), ["prevent"]), ["up"])),
            t[9] || (t[9] = v(u((s) => e.removeLastElement(), ["stop"]), ["delete"]))
          ],
          onKeypress: t[8] || (t[8] = v(u((s) => e.addPointerElement(s), ["prevent", "stop", "self"]), ["enter"])),
          class: "multiselect__input",
          "aria-controls": "listbox-" + e.id
        }, null, 44, fe)) : y("v-if", !0),
        h.isSingleLabelVisible ? (c(), f(
          "span",
          {
            key: 1,
            class: "multiselect__single",
            onMousedown: t[10] || (t[10] = u((...s) => e.toggle && e.toggle(...s), ["prevent"]))
          },
          [
            m(e.$slots, "singleLabel", { option: h.singleValue }, () => [
              B(
                O(e.currentOptionLabel),
                1
                /* TEXT */
              )
            ])
          ],
          32
          /* NEED_HYDRATION */
        )) : y("v-if", !0),
        h.isPlaceholderVisible ? (c(), f(
          "span",
          {
            key: 2,
            class: "multiselect__placeholder",
            onMousedown: t[11] || (t[11] = u((...s) => e.toggle && e.toggle(...s), ["prevent"]))
          },
          [
            m(e.$slots, "placeholder", {}, () => [
              B(
                O(e.placeholder),
                1
                /* TEXT */
              )
            ])
          ],
          32
          /* NEED_HYDRATION */
        )) : y("v-if", !0)
      ],
      512
      /* NEED_PATCH */
    ),
    (c(), X(Y, {
      to: "body",
      disabled: !i.useTeleport
    }, [
      R(q, { name: "multiselect" }, {
        default: $(() => [
          e.isOpen && l.ready ? (c(), f(
            "div",
            {
              key: 0,
              class: "multiselect__content-wrapper",
              onFocus: t[12] || (t[12] = (...s) => e.activate && e.activate(...s)),
              tabindex: "-1",
              onMousedown: t[13] || (t[13] = u(() => {
              }, ["prevent"])),
              style: C([l.dropdownStyles, { maxHeight: e.optimizedHeight + "px" }]),
              ref: "list"
            },
            [
              p("ul", {
                class: "multiselect__content",
                style: C(h.contentStyle),
                role: "listbox",
                id: "listbox-" + e.id,
                "aria-multiselectable": e.multiple
              }, [
                m(e.$slots, "beforeList"),
                e.multiple && e.max === e.internalValue.length ? (c(), f("li", me, [
                  p("span", be, [
                    m(e.$slots, "maxElements", {}, () => [
                      B(
                        "Maximum of " + O(e.max) + " options selected. First remove a selected option to select another.",
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ])) : y("v-if", !0),
                !e.max || e.internalValue.length < e.max ? (c(!0), f(
                  G,
                  { key: 1 },
                  N(e.filteredOptions, (s, g) => (c(), f("li", {
                    class: "multiselect__element",
                    key: g,
                    "aria-selected": e.isSelected(s),
                    id: e.id + "-" + g,
                    role: s && (s.$isLabel || s.$isDisabled) ? null : "option"
                  }, [
                    s && (s.$isLabel || s.$isDisabled) ? y("v-if", !0) : (c(), f("span", {
                      key: 0,
                      class: E([e.optionHighlight(g, s), "multiselect__option"]),
                      onClick: u((S) => e.select(s), ["stop"]),
                      onMouseenter: u((S) => e.pointerSet(g), ["self"]),
                      "data-select": s && s.isTag ? e.tagPlaceholder : h.selectLabelText,
                      "data-selected": h.selectedLabelText,
                      "data-deselect": h.deselectLabelText
                    }, [
                      m(e.$slots, "option", {
                        option: s,
                        search: e.search,
                        index: g
                      }, () => [
                        p(
                          "span",
                          null,
                          O(e.getOptionLabel(s)),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 42, ye)),
                    s && (s.$isLabel || s.$isDisabled) ? (c(), f("span", {
                      key: 1,
                      "data-select": e.groupSelect && h.selectGroupLabelText,
                      "data-deselect": e.groupSelect && h.deselectGroupLabelText,
                      class: E([e.groupHighlight(g, s), "multiselect__option"]),
                      onMouseenter: u((S) => e.groupSelect && e.pointerSet(g), ["self"]),
                      onMousedown: u((S) => e.selectGroup(s), ["prevent"])
                    }, [
                      m(e.$slots, "option", {
                        option: s,
                        search: e.search,
                        index: g
                      }, () => [
                        p(
                          "span",
                          null,
                          O(e.getOptionLabel(s)),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 42, Se)) : y("v-if", !0)
                  ], 8, ve))),
                  128
                  /* KEYED_FRAGMENT */
                )) : y("v-if", !0),
                M(p(
                  "li",
                  null,
                  [
                    p("span", Ve, [
                      m(e.$slots, "noResult", { search: e.search }, () => [
                        t[20] || (t[20] = B("No elements found. Consider changing the search query."))
                      ])
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [A, i.showNoResults && e.filteredOptions.length === 0 && e.search && !i.loading]
                ]),
                M(p(
                  "li",
                  null,
                  [
                    p("span", Oe, [
                      m(e.$slots, "noOptions", {}, () => [
                        t[21] || (t[21] = B("List is empty."))
                      ])
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [A, i.showNoOptions && (e.options.length === 0 || h.hasOptionGroup === !0 && e.filteredOptions.length === 0) && !e.search && !i.loading]
                ]),
                m(e.$slots, "afterList")
              ], 12, ge)
            ],
            36
            /* STYLE, NEED_HYDRATION */
          )) : y("v-if", !0)
        ]),
        _: 3
        /* FORWARDED */
      })
    ], 8, ["disabled"]))
  ], 42, ae);
}
z.render = we;
const Le = ["selectable"], $e = ["innerHTML", "selectable"], Be = ["innerHTML"], ke = {
  key: 0,
  class: "multiselect__selection"
}, Te = ["innerHTML"], Me = { class: "multiselect__tag" }, Ae = ["innerHTML"], Ce = ["onMousedown"], Fe = {
  __name: "FahadSelect",
  props: {
    modelValue: {
      type: [Object, Boolean, String, Array, Number],
      default: !1
    },
    searchRoute: {
      type: String,
      required: !1,
      default: null
    },
    searchUrl: {
      type: String,
      required: !1,
      default: null
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    param: {
      type: [Object, Boolean, String, Array, Number],
      default: !1
    },
    placeholder: {
      type: String,
      default: "Select an option"
    },
    label: {
      type: String,
      default: "label"
    },
    selectionColor: {
      type: String,
      default: "transparent"
    },
    optionHoverColor: {
      type: String,
      default: "#41b883"
    },
    optionSelectedColor: {
      type: String,
      default: "#3ed15e"
    }
  },
  emits: ["update:modelValue", "triggerChange", "reload"],
  setup(e, { expose: t, emit: i }) {
    J((o) => ({
      "28f4aba5": e.optionSelectedColor,
      "0e0ee28a": e.optionHoverColor,
      f84d66c2: s.value,
      f2cdad36: e.selectionColor
    }));
    const n = (o) => o.label || `<span>${o[l.label]}</span>`, l = e, h = (o, r) => "#" + o.replace(/^#/, "").replace(/../g, (d) => ("0" + Math.min(255, Math.max(0, parseInt(d, 16) + r)).toString(16)).substr(-2)), s = Q(() => h(l.optionHoverColor, 40)), g = i, S = k(!1), V = k(!1), w = k([]), T = k(!1), L = k(l.modelValue || []);
    H(L, (o) => {
      g("update:modelValue", o), g("triggerChange", o);
    }), H(() => l.modelValue, (o) => {
      if (o)
        if (l.multiple) {
          if (!Array.isArray(o)) return;
          o.forEach((r) => {
            w.value.some((a) => a.id === r.id) || w.value.push(r);
          }), L.value = o;
        } else
          w.value.some((d) => d.id === o.id) || w.value.push(o), L.value = o;
    }, { immediate: !0 }), Z(() => {
      if (!l.searchRoute && !l.searchUrl) {
        console.error("FahadSelect: searchRoute prop is required (can be route name or URL)");
        return;
      }
      D("");
    });
    const D = async (o) => {
      T.value = !0;
      try {
        let r;
        if (l.searchRoute)
          l.searchRoute.startsWith("http://") || l.searchRoute.startsWith("https://") || l.searchRoute.startsWith("/") ? r = l.searchRoute : r = route(l.searchRoute);
        else if (l.searchUrl)
          r = l.searchUrl;
        else {
          console.error("FahadSelect: Either searchRoute or searchUrl must be provided"), T.value = !1;
          return;
        }
        const d = await ee.get(r, {
          params: {
            query_: o,
            param: l.param
          }
        });
        w.value = d.data.results.flatMap((a) => {
          if (a.group)
            return V.value = !0, Array.isArray(a.data) ? [{ group: a.group, data: a.data }] : a.data ? [{ group: a.group, data: [a.data] }] : [];
          {
            V.value = !1;
            const b = l.label && a[l.label] ? a[l.label] : a.label || "No Label";
            return {
              ...a,
              id: a.id,
              label: b
            };
          }
        }).map((a) => a.group && Array.isArray(a.data) ? {
          group: a.group,
          data: a.data.map((b) => {
            const W = l.label && b[l.label] ? b[l.label] : b.label;
            return {
              ...b,
              // Include ALL properties of the original 'innerItem'
              label: W,
              category: a.group
            };
          })
        } : a);
      } catch (r) {
        console.error("Error fetching data:", r);
      } finally {
        T.value = !1;
      }
    };
    H(w, (o) => {
      V.value = o.some((r) => r.group);
    }, { deep: !0, immediate: !0 });
    const K = async () => {
      await _(), await D(""), L.value = l.multiple ? [] : null;
    };
    t({
      reload: K
    }), g("reload", K);
    const j = te((o) => {
      D(o);
    }, 300), I = (o) => {
      var r;
      ((r = L.value) == null ? void 0 : r.name) !== o && j(o);
    };
    return (o, r) => (c(), f("div", {
      style: C({ position: "relative", zIndex: S.value ? 99999 : "auto" })
    }, [
      R(x(z), {
        onOpen: r[4] || (r[4] = (d) => S.value = !0),
        onClose: r[5] || (r[5] = (d) => S.value = !1),
        modelValue: L.value,
        "onUpdate:modelValue": r[6] || (r[6] = (d) => L.value = d),
        options: w.value,
        "track-by": "id",
        onSearchChange: I,
        label: e.label,
        placeholder: e.placeholder,
        loading: T.value,
        multiple: e.multiple,
        "custom-label": n,
        class: "custom-multiselect",
        "internal-search": !1,
        "group-values": V.value ? "data" : void 0,
        "group-label": V.value ? "group" : void 0,
        "group-select": V.value ? e.multiple : !1
      }, {
        option: $(({ option: d, selectable: a }) => [
          d.$isLabel ? (c(), f("div", {
            key: 0,
            class: "multiselect__option--group",
            selectable: V.value,
            onMousedown: r[0] || (r[0] = u(() => {
            }, ["prevent"])),
            onMouseup: r[1] || (r[1] = u(() => {
            }, ["prevent"])),
            onClick: r[2] || (r[2] = u(() => {
            }, ["prevent"]))
          }, O(d.$groupLabel), 41, Le)) : (c(), f("div", {
            key: 1,
            innerHTML: n(d),
            selectable: V.value
          }, null, 8, $e))
        ]),
        singleLabel: $(({ option: d, remove: a }) => [
          p("span", {
            innerHTML: n(d)
          }, null, 8, Be)
        ]),
        selection: $(({ values: d, isOpen: a }) => [
          d.length && !a ? (c(), f("span", ke, [
            (c(!0), f(G, null, N(d, (b) => (c(), f("span", {
              key: b.id,
              innerHTML: n(b),
              class: "multiselect__tag"
            }, null, 8, Te))), 128))
          ])) : y("", !0)
        ]),
        tag: $(({ option: d, remove: a }) => [
          p("div", Me, [
            p("span", {
              innerHTML: n(d)
            }, null, 8, Ae),
            p("i", {
              class: "multiselect__tag-icon",
              onClick: r[3] || (r[3] = u(() => {
              }, ["prevent"])),
              onMousedown: u((b) => a(d, b), ["prevent", "stop"])
            }, null, 40, Ce)
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "options", "label", "placeholder", "loading", "multiple", "group-values", "group-label", "group-select"])
    ], 4));
  }
};
export {
  Fe as default
};
