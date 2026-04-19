/**
 * Navbar Test
 * Проверяет работу навигации
 */
const axios = require('axios');

const testNavbar = async () => {
  console.log('🧭 Тестирование навигации...\n');
  
  try {
    // Тест 1: Загрузка главной страницы
    console.log('🏠 Тестирование главной страницы...');
    const homeResponse = await axios.get('http://localhost:3003', { timeout: 5000 });
    console.log(`   - Статус: ${homeResponse.status === 200 ? '✅' : '❌'} (${homeResponse.status})`);
    
    // Проверяем наличие навигационных элементов
    const hasNavbar = homeResponse.data.includes('Bon Café');
    const hasMenuLink = homeResponse.data.includes('nav.menu') || homeResponse.data.includes('Меню') || homeResponse.data.includes('Menu');
    const hasBranchesLink = homeResponse.data.includes('nav.branches') || homeResponse.data.includes('Филиалы') || homeResponse.data.includes('Branches');
    
    console.log(`   - Navbar присутствует: ${hasNavbar ? '✅' : '❌'}`);
    console.log(`   - Ссылка на меню: ${hasMenuLink ? '✅' : '❌'}`);
    console.log(`   - Ссылка на филиалы: ${hasBranchesLink ? '✅' : '❌'}`);
    
    // Тест 2: Проверка отсутствия кнопки "Заказать сейчас"
    console.log('\n🚫 Проверка удаления кнопки "Заказать сейчас"...');
    const hasOrderNowRu = homeResponse.data.includes('Заказать сейчас');
    const hasOrderNowEn = homeResponse.data.includes('Order Now');
    const hasOrderNowUz = homeResponse.data.includes('Hozir buyurtma bering');
    
    console.log(`   - "Заказать сейчас" (RU): ${hasOrderNowRu ? '❌ НАЙДЕНО' : '✅ УДАЛЕНО'}`);
    console.log(`   - "Order Now" (EN): ${hasOrderNowEn ? '❌ НАЙДЕНО' : '✅ УДАЛЕНО'}`);
    console.log(`   - "Hozir buyurtma bering" (UZ): ${hasOrderNowUz ? '❌ НАЙДЕНО' : '✅ УДАЛЕНО'}`);
    
    // Тест 3: Проверка других страниц
    console.log('\n📄 Тестирование других страниц...');
    const pages = [
      { path: '/menu', name: 'Меню' },
      { path: '/branches', name: 'Филиалы' },
      { path: '/about', name: 'О нас' },
      { path: '/contact', name: 'Контакты' }
    ];
    
    for (const page of pages) {
      try {
        const response = await axios.get(`http://localhost:3003${page.path}`, { timeout: 5000 });
        console.log(`   - ${page.name}: ${response.status === 200 ? '✅' : '❌'} (${response.status})`);
      } catch (error) {
        console.log(`   - ${page.name}: ❌ (${error.message})`);
      }
    }
    
    // Финальная оценка
    console.log('\n📊 ИТОГОВАЯ ОЦЕНКА');
    console.log('=' .repeat(30));
    
    const navbarWorking = hasNavbar && hasMenuLink && hasBranchesLink;
    const orderButtonRemoved = !hasOrderNowRu && !hasOrderNowEn && !hasOrderNowUz;
    
    if (navbarWorking && orderButtonRemoved) {
      console.log('🎉 УСПЕХ! Навигация работает, кнопка "Заказать сейчас" удалена.');
      console.log('✅ Navbar отображается корректно');
      console.log('✅ Навигационные ссылки присутствуют');
      console.log('✅ Кнопка "Заказать сейчас" удалена');
      return true;
    } else {
      console.log('⚠️  Обнаружены проблемы:');
      if (!navbarWorking) console.log('   - Проблемы с навигацией');
      if (!orderButtonRemoved) console.log('   - Кнопка "Заказать сейчас" все еще присутствует');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Тест не удался:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Убедитесь, что сервер разработки запущен:');
      console.log('   cd frontend && npm start');
    }
    
    return false;
  }
};

// Запуск теста
if (require.main === module) {
  testNavbar().then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = testNavbar;