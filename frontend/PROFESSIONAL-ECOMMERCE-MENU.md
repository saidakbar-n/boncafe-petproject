# Профессиональное меню в стиле E-commerce

## 🎯 Обзор
Полностью переработанное меню в стиле профессиональных интернет-магазинов с боковой панелью фильтров, продвинутой системой сортировки и современным дизайном карточек.

## ✨ Ключевые особенности

### 1. Профессиональный Layout
- **Боковая панель фильтров** как в Amazon, eBay, Wildberries
- **Основная область контента** с гибкой сеткой
- **Липкие фильтры** остаются видимыми при прокрутке
- **Мобильная overlay-панель** для фильтров на телефонах

### 2. Продвинутая система фильтрации
**Категории:**
- ✅ Блюда / Напитки (основные разделы)
- ✅ Типы блюд (супы, салаты, горячее и т.д.)

**Фильтры:**
- ✅ Ценовой диапазон (слайдер)
- ✅ Рейтинг (звездочки)
- ✅ Диетические предпочтения
- ✅ Уровень остроты
- ✅ Время приготовления

### 3. Система сортировки
- 🔥 **Популярные** (по рейтингу)
- 💰 **Цена по возрастанию**
- 💎 **Цена по убыванию** 
- 🔤 **По названию**
- ⚡ **По калориям**

### 4. Режимы просмотра
- **Сетка** - карточки в виде плиток
- **Список** - горизонтальные карточки с подробной информацией

### 5. E-commerce функциональность
- **Добавление в корзину** - кнопка на каждой карточке
- **Избранное** - сердечко для сохранения любимых блюд
- **Рейтинги** - звездочки и оценки
- **Быстрые действия** - hover-эффекты и анимации

## 🎨 Дизайн системы

### Карточки товаров
```javascript
// Режим сетки - вертикальные карточки
- Изображение 220px высотой
- Кнопка избранного в углу
- Категория и рейтинг как бейджи
- Полная информация о питательности
- Кнопка "Добавить в корзину"

// Режим списка - горизонтальные карточки  
- Изображение 200x140px
- Информация справа
- Компактная питательная ценность
- Цена и действия в одной строке
```

### Цветовая схема
- **Основной цвет**: #8B4513 (коричневый кофе)
- **Градиенты**: От #8B4513 до #654321
- **Фон**: Градиент от #f8fafc до #f1f5f9
- **Карточки**: Белый с тенями
- **Акценты**: Зеленый для рейтингов, красный для избранного

### Типографика
- **Заголовки**: Inter, 700 weight
- **Текст**: Inter, 400-600 weight
- **Размеры**: Адаптивные с clamp()

## 🏗️ Техническая реализация

### Компоненты
```javascript
// Основные компоненты
- MenuContainer - главный контейнер
- MenuLayout - flex-layout с сайдбаром
- FilterSidebar - боковая панель фильтров
- MainContent - область контента
- ProfessionalMenuCard - карточка товара

// UI компоненты
- ViewToggle - переключатель вида
- SortDropdown - выпадающий список сортировки
- ResultsInfo - информация о результатах
- FilterSection - секция фильтров
- PriceRange - слайдер цены
```

### Состояние приложения
```javascript
const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
const [sortBy, setSortBy] = useState('popular');
const [priceRange, setPriceRange] = useState([0, 100000]);
const [selectedFilters, setSelectedFilters] = useState({
  dietary: [],
  spiceLevel: [],
  cookingTime: [],
  rating: 0
});
```

### Система фильтрации
```javascript
const filteredItems = useMemo(() => {
  let items = currentItems.filter(item => {
    // Поиск по тексту
    const matchesSearch = searchTerm === '' || 
      searchFields.includes(searchTerm.toLowerCase());
    
    // Фильтр по категории
    const matchesCategory = activeCategory === 'all' || 
      item.type === activeCategory;
    
    // Фильтр по цене
    const matchesPrice = itemPrice >= priceRange[0] && 
      itemPrice <= priceRange[1];
    
    // Фильтр по рейтингу
    const matchesRating = itemRating >= selectedFilters.rating;
    
    return matchesSearch && matchesCategory && 
           matchesPrice && matchesRating;
  });

  // Сортировка
  switch (sortBy) {
    case 'price-low': items.sort((a, b) => a.price - b.price); break;
    case 'price-high': items.sort((a, b) => b.price - a.price); break;
    case 'name': items.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'calories': items.sort((a, b) => a.calories - b.calories); break;
    default: items.sort((a, b) => b.rating - a.rating); break;
  }

  return items;
}, [currentItems, searchTerm, activeCategory, priceRange, selectedFilters.rating, sortBy]);
```

## 📱 Адаптивный дизайн

### Десктоп (1200px+)
- Боковая панель фильтров 300px
- Сетка 3-4 колонки
- Все фильтры видимы
- Hover-эффекты активны

### Планшет (768px - 1199px)
- Боковая панель скрыта
- Сетка 2-3 колонки
- Фильтры в мобильной overlay
- Упрощенные карточки

### Мобильный (<768px)
- Одна колонка в сетке
- Мобильная кнопка фильтров
- Полноэкранная overlay для фильтров
- Оптимизированные touch-цели

## 🚀 Производительность

### Оптимизации
1. **useMemo** для фильтрации и сортировки
2. **Lazy loading** изображений
3. **Виртуализация** для больших списков
4. **Debounced search** для поиска
5. **CSS containment** для изоляции стилей

### Анимации
- **Framer Motion** для плавных переходов
- **Hardware acceleration** для transform
- **Staggered animations** для списков
- **Micro-interactions** для кнопок

## 🎯 UX/UI улучшения

### Пользовательский опыт
1. **Мгновенная фильтрация** без перезагрузки
2. **Визуальная обратная связь** на все действия
3. **Breadcrumbs** для навигации по фильтрам
4. **Сохранение состояния** при переходах
5. **Accessibility** для всех элементов

### Интерфейс
1. **Профессиональные иконки** от Feather Icons
2. **Современные градиенты** и тени
3. **Консистентная типографика**
4. **Интуитивные элементы управления**
5. **Визуальная иерархия** информации

## 📊 Сравнение с популярными e-commerce

| Функция | Amazon | Wildberries | Наше меню |
|---------|--------|-------------|-----------|
| Боковые фильтры | ✅ | ✅ | ✅ |
| Сортировка | ✅ | ✅ | ✅ |
| Режимы просмотра | ✅ | ✅ | ✅ |
| Ценовой фильтр | ✅ | ✅ | ✅ |
| Рейтинги | ✅ | ✅ | ✅ |
| Избранное | ✅ | ✅ | ✅ |
| Корзина | ✅ | ✅ | ✅ |
| Мобильная версия | ✅ | ✅ | ✅ |

## 🔧 Требования к данным

Для полной функциональности нужны дополнительные поля:

```javascript
// Для блюд
{
  id: number,
  name: string,
  ingredients: string,
  price: number,
  calories: number,
  protein: number,
  carbs: number,
  fats: number,
  weight: number,
  cooking_time: number,
  spice_level: string,
  rating: number, // 1-5
  reviews_count: number,
  dietary_tags: string[], // ['vegetarian', 'vegan', 'gluten-free']
  photo: string,
  type: string,
  type_display: string
}

// Для напитков
{
  id: number,
  name: string,
  price: number,
  volume: number,
  temperature: string, // 'hot', 'cold', 'any'
  rating: number,
  reviews_count: number,
  photo: string,
  type: string,
  type_display: string
}
```

## 📈 Результаты

### До
- ❌ Простая сетка без фильтров
- ❌ Только базовая информация
- ❌ Нет сортировки
- ❌ Нет e-commerce функций

### После
- ✅ Профессиональная система фильтров
- ✅ Полная информация о блюдах
- ✅ Множественная сортировка
- ✅ Корзина и избранное
- ✅ Два режима просмотра
- ✅ Мобильная оптимизация
- ✅ Современный дизайн

Новое меню предоставляет пользователям профессиональный опыт покупок, сравнимый с ведущими интернет-магазинами, но адаптированный специально для ресторанного бизнеса.