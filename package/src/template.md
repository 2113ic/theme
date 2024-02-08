```scss: default
@use 'sass:map';
@use 'sass:string';

// Base vars
$prefix: '#{prefix}#' !default;
$white: #{white}# !default;
$black: #{black}# !default;

// Function
@function join($list) {
  $name: $prefix;

  @each $item in $list {
    @if $item != '' {
      $name: $name + '-' + $item;
    }
  }
  @return $name;
}

@function get($list...) {
  @return var(-- + join($list));
}

// Color
$colors: () !default;
$colors: map.deep-merge(
  (
    #{common}#
  ),
  $colors
);

$colors-light: () !default;
$colors-light: map.deep-merge(
  (
    #{lightCarry}#
  ),
  $colors-light
);

$colors-dark: () !default;
$colors-dark: map.deep-merge(
  (
    #{darkCarry}#
  ),
  $colors-dark
);

// Mixin
@mixin genCSSVar($map, $word: '') {
  @each $key, $val in $map {
    $carry: if($key == '' and $word != '', $word, $word $key);

    --#{join($carry)}: #{$val};
  }
}

@mixin genCSSVarDeep($map, $word: '') {
  @each $color, $valMap in $map {
    @each $key, $val in $valMap {
      $carry: if($key == '' and $word != '', $word, $word $color $key);

      --#{join($carry)}: #{$val};
    }
  }
}

// Theme
:root {
  @include genCSSVarDeep($colors);
}

@mixin lightVariables {
  color-scheme: light;
  @include genCSSVar($colors-light);
}

@mixin darkVariables {
  color-scheme: dark;
  @include genCSSVar($colors-dark);
}

[data-theme=light],
:root:not([data-theme=dark]) {
  @include lightVariables;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme=light]) {
    @include darkVariables;
  }
}

[data-theme=dark] {
  @include darkVariables;
}
```
