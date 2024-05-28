# Colorize

> 0.2.0

Utilities for colors and luminance, published on [JSR](https://jsr.io).

## Installation

First of all, you need to install the package:

```
npx jsr add @dmnchzl/colorize
```

<details>
  <summary>Equivalent with Yarn</summary>
  
  ```
  yarn dlx jsr add @dmnchzl/colorize
  ```

</details>

<details>
  <summary>Equivalent with pNPM</summary>
  
  ```
  pnpm dlx jsr add @dmnchzl/colorize
  ```

</details>

<details>
  <summary>Equivalent with Deno</summary>
  
  ```
  deno add @dmnchzl/colorize
  ```

</details>

<details>
  <summary>Equivalent with Bun</summary>
  
  ```
  bunx jsr add @dmnchzl/colorize
  ```

</details>

## Utilities

Below, the list of all available utilities:

**alphaToHex**

> Convert alpha value into HEX value

```js
import { alphaToHex } from '@dmnchzl/colorize';

console.log(alphaToHex(0)); // 00
console.log(alphaToHex(0.25)); // 40
console.log(alphaToHex(0.5)); // 80
console.log(alphaToHex(0.75)); // bf
console.log(alphaToHex(1)); // ff
```

**hexToRgb**

> Extract RGB(A) values from HEX color

```js
import { hexToRgb } from '@dmnchzl/colorize';

console.log(hexToRgb('#f5f5f5')); // [245, 245, 245]
console.log(hexToRgb('#f5f5f580')); // [245, 245, 245, 0.5]
```

**hexToRgbStr**

> Convert HEX color into RGB color

```js
import { hexToRgbStr } from '@dmnchzl/colorize';

console.log(hexToRgbStr('#f5f5f5')); // rgb(245, 245, 245)
console.log(hexToRgbStr('#f5f5f580')); // rgba(245, 245, 245, 0.5)
```

**rgbToHex**

> Retrieve HEX color from RGB values

```js
import { rgbToHex } from '@dmnchzl/colorize';

console.log(rgbToHex(245, 245, 245)); // #f5f5f5
console.log(rgbToHex(245, 245, 245, 0.5)); // #f5f5f580
```

**rgbStrToHex**

> Convert RGB color into HEX color

```js
import { rgbStrToHex } from '@dmnchzl/colorize';

console.log(rgbStrToHex('rgb(245, 245, 245)')); // #f5f5f5
console.log(rgbStrToHex('rgba(245, 245, 245, 0.5)')); // #f5f5f580
```

**isLightOrDarkColor**

> Check if the color is 'light' or 'dark' based on threshold

```js
import { isLightOrDarkColor } from '@dmnchzl/colorize';

console.log(isLightOrDarkColor('#f5f5f5')); // light
console.log(isLightOrDarkColor('rgba(245, 245, 245, 0.5)')); // light
```

**isLightColor**

> Check if the color is 'light' based on threshold

```js
import { isLightColor } from '@dmnchzl/colorize';

console.log(isLightColor('#f5f5f5')); // true
console.log(isLightColor('rgba(245, 245, 245, 0.5)')); // true
```

**isDarkColor**

> Check if the color is 'dark' based on threshold

```js
import { isDarkColor } from '@dmnchzl/colorize';

console.log(isDarkColor('#f5f5f5')); // false
console.log(isDarkColor('rgba(245, 245, 245, 0.5)')); // false
```

## License

```
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2024 Damien Chazoule <dmnchzl@pm.me>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
```
