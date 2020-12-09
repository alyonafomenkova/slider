# slider
### Установка:<br/>
Для запуска проекта должны быть установлены [Node.js](https://nodejs.org/en/) (начиная с v12.14.0) и [Git](https://git-scm.com/download)<br/>
1. Клонируйте репозиторий: `git clone git@github.com:alyonafomenkova/slider.git`<br/>
2. Перейдите в папку проекта: `cd slider`<br/>
3. Установите необходимые зависимости проекта: `npm install`<br/>
---
### Основные команды: <br/>
`npm run clear` - удаление папки *dist*<br/>
`npm run dev` - сборка в *development-режиме*, запуск локального сервера, открытие вкладки с адресом локального сервера в браузере<br/>
`npm run prod` - очищение папки *dist*, сборка в *production-режиме*, сохранение результата в папке *dist*<br/>
`npm run lint` - проверка синтаксиса ts и js-файлов с помощью [Eslint](https://eslint.org/)<br/>
`npm run test` - запуск тестов с помощью тест-раннера [Karma](https://karma-runner.github.io/latest/index.html)<br/>
`npm run deploy` - загрузка результата сборки (папка *dist*) в ветку *gh-pages*<br/>

### Демо страница<br/>
[slider-demo](https://alyonafomenkova.github.io/slider/demo.html)
### Тестирование<br/>
Для тестирования использовала [jasmine](https://jasmine.github.io/), [ts-mockito](https://www.npmjs.com/package/ts-mockito) (для моков) и тест-раннер [Karma](https://karma-runner.github.io/latest/index.html).<br/>
Покрытие тестами: [coverage](https://alyonafomenkova.github.io/slider/coverage/index.html)<br/>

### Инициализация слайдера<br/>
`<div id="slider"></div>;`
- `$(sliderId).runForSlider('init')` - инициализация слайдера с настройками по умолчанию;<br/>
- `$(sliderId).runForSlider('init', config)` - инициализация слайдера с настройками пользователя, где:<br/>
```javascript
config = {
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  isVertical: boolean,
  hasInterval: boolean,
  hasValue: boolean,
  hasScale: boolean,
};
```
### Конфигурация
Поле | Тип | Значение по умолчанию | Описание
:------------: | :-------------: | :-------------: | :-------------:
min | number | 0 | Минимальное значение
max | number | 100 | Максимальное значение (должно быть больше min и меньше (max - min))
step | number | 5 | Размер шага (должен быть больше 0)
from | number | 20 | Начальное значение для первого бегунка (должно быть больше min и меньше to)
to | number | 70 | Начальное значение для второго бегунка (должно быть больше from и меньше max)
isVertical | boolean | false | Горизонтальное положение слайдера
hasInterval | boolean | true | Интервальный слайдер с двумя бегунками
hasValue | boolean | true | Показывать текущее значение для бегунка
hasScale | boolean | true | Показывать шкалу

---
### Архитектура
- Класс **Observer** реализует паттерн Observer и содержит:
  - некоторое актуальое состояние, которое можно получить / изменить;
  - список наблюдателей;<br/>
Observer оповещает каждого наблюдателя, если состояние изменилось.  
- **Model** - это набор Observer'ов, необходимых для математических расчётов, а именно:
  - минимальное и максимальное значение
  - размер шага
  - интервальный или одиночный слайдер
  - значения from и to<br/>
Model содержит метод для проверки заданной конфигурации.
- **Views**
  - SliderView - сам слайдер;
  - PointerView - бегунок и его значение;
  - ScaleView - шкала;<br/>
  - ViewModel - хранит данные о представлении<br/>
  - MainView - связывает все вьюхи, содержит логику, связанную с отображением слайдера и реагирует на действия пользователя<br/>
- **Presenter** - связующий компонент, содержащий бизнес-логику
  - создаёт оставшийся набор Observer'ов (которые не вошли в модель: ориентация, шкала, есть или нет значение у бегунка)
  - связывает Model и Views
### UML-диаграмма
![uml](https://alyonafomenkova.github.io/slider/assets/diagram.jpeg)
