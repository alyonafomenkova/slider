# slider
### Для запуска проекта необходимо выполнить следующие команды:<br/>
`git clone git@github.com:alyonafomenkova/slider.git` - клонирование репозитория<br/>
`npm i` - установка необходимых зависимостей проекта<br/>
`npm run build:dev` - сборка проекта<br/>
`npm run start:dev` - запуск локального сервера<br/>
`npm run test` - запуск тестов<br/>
`npm run deploy` - публикация проекта

### Демо страница<br/>
[slider-demo](https://alyonafomenkova.github.io/slider/demo.html)
### Тестирование<br/>
Для тестирования использовала jasmine, ts-mockito (для моков) и karma.<br/>
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
- Класс **Subject** реализует паттерн Observer и содержит:
  - некоторое актуальое состояние, которое можно получить / изменить;
  - список наблюдателей;<br/>
Subject оповещает каждого наблюдателя, если состояние изменилось.  
- **Model** - это набор Subject'ов, необходимых для математических расчётов, а именно:
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
  - создаёт оставшийся набор Subject'ов (которые не вошли в модель: ориентация, шкала, есть или нет значение у бегунка)
  - связывает Model и Views
### UML-диаграмма
![uml](https://alyonafomenkova.github.io/slider/assets/uml.jpeg)
