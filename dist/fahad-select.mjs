import { createElementBlock as g, openBlock as c, withKeys as v, normalizeClass as M, withModifiers as u, renderSlot as m, createElementVNode as p, createBlock as j, createVNode as C, createCommentVNode as S, withDirectives as $, Fragment as F, renderList as P, toDisplayString as V, vShow as B, Transition as G, withCtx as w, normalizeStyle as D, createTextVNode as L, Teleport as W, ref as k, watch as A, onMounted as I, unref as X, nextTick as Y } from "vue";
import J from "axios";
import { debounce as Q } from "lodash";
function E(e) {
  return e === 0 ? !1 : Array.isArray(e) && e.length === 0 ? !0 : !e;
}
function Z(e) {
  return (...t) => !e(...t);
}
function x(e, t) {
  return e === void 0 && (e = "undefined"), e === null && (e = "null"), e === !1 && (e = "false"), e.toString().toLowerCase().indexOf(t.trim()) !== -1;
}
function _(e) {
  return e.filter((t) => !t.$isLabel);
}
function H(e, t) {
  return (i) => i.reduce((r, l) => l[e] && l[e].length ? (r.push({
    $groupLabel: l[t],
    $isLabel: !0
  }), r.concat(l[e])) : r, []);
}
const N = (...e) => (t) => e.reduce((i, r) => r(i), t);
var ee = {
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
        return E(e) ? "" : t ? e[t] : e;
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
      return this.internalSearch ? i = this.groupValues ? this.filterAndFlat(i, t, this.label) : this.filterOptions(i, t, this.label, this.customLabel) : i = this.groupValues ? H(this.groupValues, this.groupLabel)(i) : i, i = this.hideSelected ? i.filter(Z(this.isSelected)) : i, this.taggable && t.length && !this.isExistingOption(t) && (this.tagPosition === "bottom" ? i.push({ isTag: !0, label: e }) : i.unshift({ isTag: !0, label: e })), i.slice(0, this.optionsLimit);
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
      return N(
        this.filterGroups(t, i, this.groupValues, this.groupLabel, this.customLabel),
        H(this.groupValues, this.groupLabel)
      )(e);
    },
    /**
     * Flattens and then strips the group labels from the options list
     * @param  {Array}
     * @return {Array} returns a flat options list without group labels
     */
    flatAndStrip(e) {
      return N(
        H(this.groupValues, this.groupLabel),
        _
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
      if (E(e)) return "";
      if (e.isTag) return e.label;
      if (e.$isLabel) return e.$groupLabel;
      const t = this.customLabel(e, this.label);
      return E(t) ? "" : t;
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
          const i = this.trackBy ? t[this.groupValues].map((l) => l[this.trackBy]) : t[this.groupValues], r = this.internalValue.filter(
            (l) => i.indexOf(this.trackBy ? l[this.trackBy] : l) === -1
          );
          this.$emit("update:modelValue", r);
        } else {
          const i = t[this.groupValues].filter(
            (r) => !(this.isOptionDisabled(r) || this.isSelected(r))
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
        const r = this.internalValue.slice(0, i).concat(this.internalValue.slice(i + 1));
        this.$emit("update:modelValue", r);
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
    filterOptions(e, t, i, r) {
      return t ? e.filter((l) => x(r(l, i), t)).sort((l, a) => typeof this.filteringSortFunc == "function" ? this.filteringSortFunc(l, a) : r(l, i).length - r(a, i).length) : e;
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
    filterGroups(e, t, i, r, l) {
      return (a) => a.map((s) => {
        if (!s[i])
          return console.warn("Options passed to vue-multiselect do not contain groups, despite the config."), [];
        const d = this.filterOptions(s[i], e, t, l);
        return d.length ? {
          [r]: s[r],
          [i]: d
        } : [];
      });
    }
  }
}, te = {
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
      const i = this.options.find((r) => r[this.groupLabel] === t.$groupLabel);
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
}, K = {
  name: "vue-multiselect",
  mixins: [ee, te],
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
const ie = ["tabindex", "aria-expanded", "aria-owns", "aria-activedescendant"], se = {
  ref: "tags",
  class: "multiselect__tags"
}, le = { class: "multiselect__tags-wrap" }, re = ["textContent"], ne = ["onKeypress", "onMousedown"], ae = ["textContent"], oe = { class: "multiselect__spinner" }, ue = ["name", "id", "spellcheck", "placeholder", "required", "value", "disabled", "tabindex", "aria-label", "aria-controls"], he = ["id", "aria-multiselectable"], de = { key: 0 }, pe = { class: "multiselect__option" }, ce = ["aria-selected", "id", "role"], fe = ["onClick", "onMouseenter", "data-select", "data-selected", "data-deselect"], ge = ["data-select", "data-deselect", "onMouseenter", "onMousedown"], me = { class: "multiselect__option" }, be = { class: "multiselect__option" };
function ye(e, t, i, r, l, a) {
  return c(), g("div", {
    tabindex: e.searchable ? -1 : i.tabindex,
    class: M([{ "multiselect--active": e.isOpen, "multiselect--disabled": i.disabled, "multiselect--above": a.isAbove, "multiselect--has-options-group": a.hasOptionGroup }, "multiselect"]),
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
      se,
      [
        m(e.$slots, "selection", {
          search: e.search,
          remove: e.removeElement,
          values: a.visibleValues,
          isOpen: e.isOpen
        }, () => [
          $(p(
            "div",
            le,
            [
              (c(!0), g(
                F,
                null,
                P(a.visibleValues, (s, d) => m(e.$slots, "tag", {
                  option: s,
                  search: e.search,
                  remove: e.removeElement
                }, () => [
                  (c(), g(
                    "span",
                    {
                      class: "multiselect__tag",
                      key: d,
                      onMousedown: t[1] || (t[1] = u(() => {
                      }, ["prevent"]))
                    },
                    [
                      p("span", {
                        textContent: V(e.getOptionLabel(s))
                      }, null, 8, re),
                      p("i", {
                        tabindex: "1",
                        onKeypress: v(u((y) => e.removeElement(s), ["prevent"]), ["enter"]),
                        onMousedown: u((y) => e.removeElement(s), ["prevent"]),
                        class: "multiselect__tag-icon"
                      }, null, 40, ne)
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
            [B, a.visibleValues.length > 0]
          ]),
          e.internalValue && e.internalValue.length > i.limit ? m(e.$slots, "limit", { key: 0 }, () => [
            p("strong", {
              class: "multiselect__strong",
              textContent: V(i.limitText(e.internalValue.length - i.limit))
            }, null, 8, ae)
          ]) : S("v-if", !0)
        ]),
        C(G, { name: "multiselect__loading" }, {
          default: w(() => [
            m(e.$slots, "loading", {}, () => [
              $(p(
                "div",
                oe,
                null,
                512
                /* NEED_PATCH */
              ), [
                [B, i.loading]
              ])
            ])
          ]),
          _: 3
          /* FORWARDED */
        }),
        e.searchable ? (c(), g("input", {
          key: 0,
          ref: "search",
          name: i.name,
          id: e.id,
          type: "text",
          autocomplete: "off",
          spellcheck: i.spellcheck,
          placeholder: e.placeholder,
          required: a.isRequired,
          style: D(a.inputStyle),
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
        }, null, 44, ue)) : S("v-if", !0),
        a.isSingleLabelVisible ? (c(), g(
          "span",
          {
            key: 1,
            class: "multiselect__single",
            onMousedown: t[10] || (t[10] = u((...s) => e.toggle && e.toggle(...s), ["prevent"]))
          },
          [
            m(e.$slots, "singleLabel", { option: a.singleValue }, () => [
              L(
                V(e.currentOptionLabel),
                1
                /* TEXT */
              )
            ])
          ],
          32
          /* NEED_HYDRATION */
        )) : S("v-if", !0),
        a.isPlaceholderVisible ? (c(), g(
          "span",
          {
            key: 2,
            class: "multiselect__placeholder",
            onMousedown: t[11] || (t[11] = u((...s) => e.toggle && e.toggle(...s), ["prevent"]))
          },
          [
            m(e.$slots, "placeholder", {}, () => [
              L(
                V(e.placeholder),
                1
                /* TEXT */
              )
            ])
          ],
          32
          /* NEED_HYDRATION */
        )) : S("v-if", !0)
      ],
      512
      /* NEED_PATCH */
    ),
    (c(), j(W, {
      to: "body",
      disabled: !i.useTeleport
    }, [
      C(G, { name: "multiselect" }, {
        default: w(() => [
          e.isOpen && l.ready ? (c(), g(
            "div",
            {
              key: 0,
              class: "multiselect__content-wrapper",
              onFocus: t[12] || (t[12] = (...s) => e.activate && e.activate(...s)),
              tabindex: "-1",
              onMousedown: t[13] || (t[13] = u(() => {
              }, ["prevent"])),
              style: D([l.dropdownStyles, { maxHeight: e.optimizedHeight + "px" }]),
              ref: "list"
            },
            [
              p("ul", {
                class: "multiselect__content",
                style: D(a.contentStyle),
                role: "listbox",
                id: "listbox-" + e.id,
                "aria-multiselectable": e.multiple
              }, [
                m(e.$slots, "beforeList"),
                e.multiple && e.max === e.internalValue.length ? (c(), g("li", de, [
                  p("span", pe, [
                    m(e.$slots, "maxElements", {}, () => [
                      L(
                        "Maximum of " + V(e.max) + " options selected. First remove a selected option to select another.",
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ])) : S("v-if", !0),
                !e.max || e.internalValue.length < e.max ? (c(!0), g(
                  F,
                  { key: 1 },
                  P(e.filteredOptions, (s, d) => (c(), g("li", {
                    class: "multiselect__element",
                    key: d,
                    "aria-selected": e.isSelected(s),
                    id: e.id + "-" + d,
                    role: s && (s.$isLabel || s.$isDisabled) ? null : "option"
                  }, [
                    s && (s.$isLabel || s.$isDisabled) ? S("v-if", !0) : (c(), g("span", {
                      key: 0,
                      class: M([e.optionHighlight(d, s), "multiselect__option"]),
                      onClick: u((y) => e.select(s), ["stop"]),
                      onMouseenter: u((y) => e.pointerSet(d), ["self"]),
                      "data-select": s && s.isTag ? e.tagPlaceholder : a.selectLabelText,
                      "data-selected": a.selectedLabelText,
                      "data-deselect": a.deselectLabelText
                    }, [
                      m(e.$slots, "option", {
                        option: s,
                        search: e.search,
                        index: d
                      }, () => [
                        p(
                          "span",
                          null,
                          V(e.getOptionLabel(s)),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 42, fe)),
                    s && (s.$isLabel || s.$isDisabled) ? (c(), g("span", {
                      key: 1,
                      "data-select": e.groupSelect && a.selectGroupLabelText,
                      "data-deselect": e.groupSelect && a.deselectGroupLabelText,
                      class: M([e.groupHighlight(d, s), "multiselect__option"]),
                      onMouseenter: u((y) => e.groupSelect && e.pointerSet(d), ["self"]),
                      onMousedown: u((y) => e.selectGroup(s), ["prevent"])
                    }, [
                      m(e.$slots, "option", {
                        option: s,
                        search: e.search,
                        index: d
                      }, () => [
                        p(
                          "span",
                          null,
                          V(e.getOptionLabel(s)),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 42, ge)) : S("v-if", !0)
                  ], 8, ce))),
                  128
                  /* KEYED_FRAGMENT */
                )) : S("v-if", !0),
                $(p(
                  "li",
                  null,
                  [
                    p("span", me, [
                      m(e.$slots, "noResult", { search: e.search }, () => [
                        t[20] || (t[20] = L("No elements found. Consider changing the search query."))
                      ])
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [B, i.showNoResults && e.filteredOptions.length === 0 && e.search && !i.loading]
                ]),
                $(p(
                  "li",
                  null,
                  [
                    p("span", be, [
                      m(e.$slots, "noOptions", {}, () => [
                        t[21] || (t[21] = L("List is empty."))
                      ])
                    ])
                  ],
                  512
                  /* NEED_PATCH */
                ), [
                  [B, i.showNoOptions && (e.options.length === 0 || a.hasOptionGroup === !0 && e.filteredOptions.length === 0) && !e.search && !i.loading]
                ]),
                m(e.$slots, "afterList")
              ], 12, he)
            ],
            36
            /* STYLE, NEED_HYDRATION */
          )) : S("v-if", !0)
        ]),
        _: 3
        /* FORWARDED */
      })
    ], 8, ["disabled"]))
  ], 42, ie);
}
K.render = ye;
const ve = ["selectable"], Se = ["innerHTML", "selectable"], Ve = ["innerHTML"], Oe = {
  key: 0,
  class: "multiselect__selection"
}, we = ["innerHTML"], Le = { class: "multiselect__tag" }, $e = ["innerHTML"], Be = ["onMousedown"], De = {
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
    }
  },
  emits: ["update:modelValue", "triggerChange", "reload"],
  setup(e, { expose: t, emit: i }) {
    const r = (h) => h.label || `<span>${h[l.label]}</span>`, l = e, a = i, s = k(!1), d = k([]), y = k(!1), O = k(l.modelValue || []);
    A(O, (h) => {
      a("update:modelValue", h), a("triggerChange", h);
    }), A(() => l.modelValue, (h) => {
      if (h)
        if (l.multiple) {
          if (!Array.isArray(h)) return;
          h.forEach((o) => {
            d.value.some((n) => n.id === o.id) || d.value.push(o);
          }), O.value = h;
        } else
          d.value.some((f) => f.id === h.id) || d.value.push(h), O.value = h;
    }, { immediate: !0 }), I(() => {
      if (!l.searchRoute && !l.searchUrl) {
        console.error("FahadSelect: searchRoute prop is required (can be route name or URL)");
        return;
      }
      T("");
    });
    const T = async (h) => {
      y.value = !0;
      try {
        let o;
        if (l.searchRoute)
          l.searchRoute.startsWith("http://") || l.searchRoute.startsWith("https://") || l.searchRoute.startsWith("/") ? o = l.searchRoute : o = route(l.searchRoute);
        else if (l.searchUrl)
          o = l.searchUrl;
        else {
          console.error("FahadSelect: Either searchRoute or searchUrl must be provided"), y.value = !1;
          return;
        }
        const f = await J.get(o, {
          params: {
            query_: h,
            param: l.param
          }
        });
        d.value = f.data.results.flatMap((n) => {
          if (n.group)
            return s.value = !0, Array.isArray(n.data) ? [{ group: n.group, data: n.data }] : n.data ? [{ group: n.group, data: [n.data] }] : [];
          {
            s.value = !1;
            const b = l.label && n[l.label] ? n[l.label] : n.label || "No Label";
            return {
              ...n,
              id: n.id,
              label: b
            };
          }
        }).map((n) => n.group && Array.isArray(n.data) ? {
          group: n.group,
          data: n.data.map((b) => {
            const z = l.label && b[l.label] ? b[l.label] : b.label;
            return {
              ...b,
              // Include ALL properties of the original 'innerItem'
              label: z,
              category: n.group
            };
          })
        } : n);
      } catch (o) {
        console.error("Error fetching data:", o);
      } finally {
        y.value = !1;
      }
    };
    A(d, (h) => {
      s.value = h.some((o) => o.group);
    }, { deep: !0, immediate: !0 });
    const R = async () => {
      await Y(), await T(""), O.value = l.multiple ? [] : null;
    };
    t({
      reload: R
    }), a("reload", R);
    const q = Q((h) => {
      T(h);
    }, 300), U = (h) => {
      var o;
      ((o = O.value) == null ? void 0 : o.name) !== h && q(h);
    };
    return (h, o) => (c(), g("div", null, [
      C(X(K), {
        modelValue: O.value,
        "onUpdate:modelValue": o[4] || (o[4] = (f) => O.value = f),
        options: d.value,
        "track-by": "id",
        onSearchChange: U,
        label: e.label,
        placeholder: e.placeholder,
        loading: y.value,
        multiple: e.multiple,
        "custom-label": r,
        class: "custom-multiselect",
        "internal-search": !1,
        "group-values": s.value ? "data" : void 0,
        "group-label": s.value ? "group" : void 0,
        "group-select": s.value ? e.multiple : !1
      }, {
        option: w(({ option: f, selectable: n }) => [
          f.$isLabel ? (c(), g("div", {
            key: 0,
            class: "multiselect__option--group",
            selectable: s.value,
            onMousedown: o[0] || (o[0] = u(() => {
            }, ["prevent"])),
            onMouseup: o[1] || (o[1] = u(() => {
            }, ["prevent"])),
            onClick: o[2] || (o[2] = u(() => {
            }, ["prevent"]))
          }, V(f.$groupLabel), 41, ve)) : (c(), g("div", {
            key: 1,
            innerHTML: r(f),
            selectable: s.value
          }, null, 8, Se))
        ]),
        singleLabel: w(({ option: f, remove: n }) => [
          p("span", {
            innerHTML: r(f)
          }, null, 8, Ve)
        ]),
        selection: w(({ values: f, isOpen: n }) => [
          f.length && !n ? (c(), g("span", Oe, [
            (c(!0), g(F, null, P(f, (b) => (c(), g("span", {
              key: b.id,
              innerHTML: r(b),
              class: "multiselect__tag"
            }, null, 8, we))), 128))
          ])) : S("", !0)
        ]),
        tag: w(({ option: f, remove: n }) => [
          p("div", Le, [
            p("span", {
              innerHTML: r(f)
            }, null, 8, $e),
            p("i", {
              class: "multiselect__tag-icon",
              onClick: o[3] || (o[3] = u(() => {
              }, ["prevent"])),
              onMousedown: u((b) => n(f, b), ["prevent", "stop"])
            }, null, 40, Be)
          ])
        ]),
        _: 1
      }, 8, ["modelValue", "options", "label", "placeholder", "loading", "multiple", "group-values", "group-label", "group-select"])
    ]));
  }
};
export {
  De as default
};
