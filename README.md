# Angular.js angular-geopicker directive
This directive supports input of latitude and longitude.
This directive will generate a text box. If this text box to active, a map will pop up. If you click on any point on the map, latitude and longitude are entered in this text box.

## Installation
Install with bower `bower install https://github.com/fudekun/angular-geopicker.git --save`
Inject the dependency `angular.module('testApp', ['angularGeopickerApp'])`

## Dependencies
This module depends by [angular](https://github.com/angular/angular.js), [angular-bootstrap](https://github.com/angular-ui/bootstrap), [angular-leaflet-directive](https://github.com/tombatossals/angular-leaflet-directive).

## Usage
#### defaults
`35.021004,135.755608`
- clat=35.021004
- clng=135.755608
- precision=6
- sep = ","
- rad = false

```html
<input angular-geopicker></input>
```


#### Position
##### change the start position.
`34.985355,135.758357`
```html
<input angular-geopicker clat=34.985355 clng=135.758357></input>
```

#### Format
##### Precision
`35.021,135.756`
```html
<input angular-geopicker precision=3></input>
```

##### Separated string of latitude and longitude.
`35.021004|135.755608`
```html
<input angular-geopicker sep="|"></input>
```

##### Degrees, minutes, seconds
`35°41'22.484"N,139°41'29.882"E`
```html
<input angular-geopicker rad=true></input>
```

##### Examples
`35°41'23.999"N|139°41'23.999"E`
```html
<input angular-geopicker clat=35.689487 clng=139.691706 precision=2 sep="|" rad=true></input>
```


## License
[MIT](https://github.com/fudekun/angular-geopicker/blob/master/LICENSE)
