import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileOptimization } from '../../hooks/useMobileOptimization';
import { 
  FiSearch, 
  FiAlertCircle, 
  FiFilter, 
  FiGrid, 
  FiList,
  FiStar,
  FiTrendingUp,
  FiX,
  FiChevronDown
} from 'react-icons/fi';
import { MenuCardSkeleton } from '../../components/Skeleton/Skeleton';
import { menuAPI, getMediaUrl } from '../../services/api';
import { safeApiCall } from '../../utils/publicApiErrorHandler';
import {
  MenuContainer,
  MenuLayout,
  FilterSidebar,
  MainContent,
  MenuHeader,
  MenuTitle,
  MenuSubtitle,
  MenuControls,
  SearchBar,
  ViewToggle,
  SortDropdown,
  ResultsInfo,
  FilterSection,
  FilterTitle,
  FilterGroup,
  FilterOption,
  PriceRange,
  MenuGrid,
  MenuList,
  NoResults,
  MobileFilterToggle,
  FilterOverlay
} from './Menu.styles';

// Category name mapping function with comprehensive categories
const getCategoryName = (type, t) => {
  const categoryMap = {
    // Food categories
    'new': t('menu.categories.new', 'New Items'),
    'breakfast': t('menu.categories.breakfast', 'Breakfast'),
    'omelette': t('menu.categories.omelette', 'Omelettes'),
    'crepes_quiches': t('menu.categories.crepes_quiches', 'Crepes & Quiches'),
    'sweet_crepes': t('menu.categories.sweet_crepes', 'Sweet Crepes'),
    'soups': t('menu.categories.soups', 'Soups'),
    'salads': t('menu.categories.salads', 'Salads'),
    'sandwiches': t('menu.categories.sandwiches', 'Sandwiches & Toasts'),
    'main_courses': t('menu.categories.main_courses', 'Main Courses'),
    'other': t('menu.categories.other', 'Other Dishes'),
    'appetizers': t('menu.categories.appetizers', 'Appetizers'),
    'desserts': t('menu.categories.desserts', 'Desserts'),
    
    // Beverage categories
    'coffee': t('menu.categories.coffee', 'Coffee'),
    'new_drinks': t('menu.categories.new_drinks', 'New Beverages'),
    'iced_coffee': t('menu.categories.iced_coffee', 'Iced Coffee'),
    'cold_drinks': t('menu.categories.cold_drinks', 'Cold Beverages'),
    'decaf': t('menu.categories.decaf', 'Decaffeinated'),
    'fresh_juices': t('menu.categories.fresh_juices', 'Fresh Juices'),
    'tea': t('menu.categories.tea', 'Tea'),
    'not_coffee': t('menu.categories.not_coffee', 'Non-Coffee Drinks'),
    'hot_drinks': t('menu.categories.hotDrinks', 'Hot Drinks'),
    'cold_drinks': t('menu.categories.coldDrinks', 'Cold Drinks'),
    'juices': t('menu.categories.juices', 'Juices')
  };
  return categoryMap[type] || type;
};

// Mobile-Optimized Menu Card with Performance Enhancements
const MobileOptimizedMenuCard = ({ item, isFood = true, index, viewMode = 'grid' }) => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { 
    isMobile, 
    getAnimationProps, 
    getHoverProps, 
    getMobileStyles,
    getResponsiveFontSize,
    getResponsiveSpacing 
  } = useMobileOptimization();
  
  const imageUrl = getMediaUrl(item.photo);
  
  const formatPrice = (price) => {
    if (!price) return t('menu.priceOnRequest');
    return new Intl.NumberFormat('uz-UZ').format(price);
  };
  


  if (viewMode === 'list') {
    return (
      <motion.div
        {...getAnimationProps(index)}
        {...getHoverProps()}
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          backgroundColor: 'white',
          borderRadius: isMobile ? '12px' : '16px',
          overflow: 'hidden',
          boxShadow: isMobile ? '0 1px 6px rgba(0,0,0,0.05)' : '0 2px 12px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)',
          cursor: 'pointer',
          transition: isMobile ? 'none' : 'all 0.2s ease',
          marginBottom: isMobile ? '12px' : '16px',
          minHeight: isMobile ? 'auto' : '140px',
          transform: 'translateZ(0)', // Force hardware acceleration
          willChange: isMobile ? 'auto' : 'transform'
        }}
      >
        {/* List Image */}
        <div style={{ 
          width: isMobile ? '100%' : '200px', 
          height: isMobile ? '160px' : '140px', 
          position: 'relative',
          flexShrink: 0,
          backgroundColor: '#f8fafc'
        }}>
          <img 
            src={imageUrl || '/images/placeholder-menu.svg'}
            alt={item.name}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imageLoaded ? 1 : 0,
              transition: isMobile ? 'none' : 'opacity 0.2s ease',
              transform: 'translateZ(0)'
            }}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = '/images/placeholder-menu.svg';
              setImageLoaded(true);
            }}
          />
        </div>

        {/* List Content */}
        <div style={{ 
          flex: 1, 
          padding: isMobile ? '16px' : '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          gap: isMobile ? '8px' : '12px'
        }}>
          <div>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'center' : 'flex-start', 
              marginBottom: isMobile ? '6px' : '8px',
              flexWrap: isMobile ? 'wrap' : 'nowrap'
            }}>
              <h3 style={{ 
                fontSize: isMobile ? '1.1rem' : '1.25rem', 
                fontWeight: '700', 
                color: '#1f2937',
                margin: 0,
                lineHeight: '1.3',
                flex: 1,
                marginRight: '12px',
                minWidth: isMobile ? '60%' : 'auto'
              }}>
                {item.name}
              </h3>
              <div style={{
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: '700',
                color: '#8B4513',
                whiteSpace: 'nowrap',
                marginTop: isMobile ? '2px' : '0'
              }}>
                {formatPrice(item.price)} {item.price ? t('menu.currency', 'sum') : ''}
              </div>
            </div>
            
            {isFood && item.ingredients && (
              <p style={{ 
                color: '#6b7280', 
                fontSize: '0.95rem', 
                lineHeight: '1.6',
                margin: '0 0 12px 0',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {item.ingredients}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Simplified Nutrition Info for Mobile */}
            {isFood && (item.calories || item.protein) && (
              <div style={{ 
                display: isMobile ? 'block' : 'flex', 
                gap: isMobile ? '4px' : '16px',
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: '#8B4513',
                fontWeight: '600'
              }}>
                {isMobile ? (
                  // Compact mobile view
                  <span>
                    {item.calories && `${item.calories} cal`}
                    {item.calories && item.protein && ' • '}
                    {item.protein && `${item.protein}g protein`}
                  </span>
                ) : (
                  // Desktop view
                  <>
                    {item.calories && (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#8B4513', fontWeight: '600' }}>
                          {t('menu.nutrition.calories', 'Calories')}
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f2937' }}>{item.calories}</div>
                      </div>
                    )}
                    {item.protein && (
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', color: '#8B4513', fontWeight: '600' }}>
                          {t('menu.nutrition.protein', 'Protein')}
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1f2937' }}>{item.protein}g</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (default) - Mobile Optimized
  return (
    <motion.div
      {...getAnimationProps(index)}
      {...getHoverProps()}
      style={{
        backgroundColor: 'white',
        borderRadius: isMobile ? '12px' : '20px',
        overflow: 'hidden',
        boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.06)' : '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: isMobile ? 'none' : 'all 0.2s ease',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: isMobile ? 'auto' : 'transform'
      }}
    >
      {/* Image Section - Mobile Optimized */}
      <div style={{ 
        position: 'relative', 
        height: isMobile ? '180px' : '220px',
        overflow: 'hidden',
        backgroundColor: '#f8fafc'
      }}>
        <img 
          src={imageUrl || '/images/placeholder-menu.svg'}
          alt={item.name}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: isMobile ? 'none' : 'transform 0.2s ease',
            opacity: imageLoaded ? 1 : 0,
            transform: 'translateZ(0)'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = '/images/placeholder-menu.svg';
            setImageLoaded(true);
          }}
        />
        
        {/* Category Badge */}
        {item.type && (
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(139, 69, 19, 0.9)',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            backdropFilter: 'blur(8px)'
          }}>
            {getCategoryName(item.type, t)}
          </div>
        )}

        {/* Rating Badge */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          background: 'rgba(34, 197, 94, 0.9)',
          color: 'white',
          padding: '6px 10px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(8px)'
        }}>
          <FiStar size={12} fill="currentColor" />
          4.8
        </div>
      </div>
      
      {/* Content Section - Mobile Optimized */}
      <div style={{ 
        padding: isMobile ? '16px' : '24px', 
        display: 'flex', 
        flexDirection: 'column', 
        flexGrow: 1,
        gap: isMobile ? '12px' : '16px'
      }}>
        {/* Title and Price - Mobile Optimized */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'center' : 'flex-start', 
            marginBottom: isMobile ? '6px' : '8px',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}>
            <h3 style={{ 
              fontSize: isMobile ? '1.1rem' : '1.3rem', 
              fontWeight: '700', 
              color: '#1f2937',
              lineHeight: '1.3',
              margin: 0,
              flex: 1,
              marginRight: '12px',
              minWidth: isMobile ? '60%' : 'auto'
            }}>
              {item.name}
            </h3>
            <div style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: '700',
              color: '#8B4513',
              whiteSpace: 'nowrap',
              marginTop: isMobile ? '2px' : '0'
            }}>
              {formatPrice(item.price)} {item.price ? t('menu.currency', 'sum') : ''}
            </div>
          </div>
          
          {/* Description */}
          {isFood && item.ingredients && (
            <p style={{ 
              color: '#6b7280', 
              fontSize: '0.9rem', 
              lineHeight: '1.6',
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {t(`menu.ingredients.${item.id}`, item.ingredients)}
            </p>
          )}
        </div>
        
        {/* Nutrition Info - Mobile Optimized */}
        {isFood && (item.calories || item.protein || item.carbs || item.fats) && (
          <div style={{
            display: isMobile ? 'flex' : 'grid',
            gridTemplateColumns: isMobile ? 'none' : 'repeat(auto-fit, minmax(60px, 1fr))',
            flexDirection: isMobile ? 'row' : 'none',
            flexWrap: isMobile ? 'wrap' : 'none',
            gap: isMobile ? '8px' : '12px',
            padding: isMobile ? '12px' : '16px',
            backgroundColor: 'rgba(139, 69, 19, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(139, 69, 19, 0.1)'
          }}>
            {item.calories && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#8B4513', fontWeight: '600', marginBottom: '4px' }}>
                  {t('menu.nutrition.calories', 'CALORIES').toUpperCase()}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937' }}>
                  {item.calories}
                </div>
              </div>
            )}
            {item.protein && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#8B4513', fontWeight: '600', marginBottom: '4px' }}>
                  {t('menu.nutrition.protein', 'PROTEIN').toUpperCase()}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937' }}>
                  {item.protein}g
                </div>
              </div>
            )}
            {item.carbs && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#8B4513', fontWeight: '600', marginBottom: '4px' }}>
                  {t('menu.nutrition.carbs', 'CARBS').toUpperCase()}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937' }}>
                  {item.carbs}g
                </div>
              </div>
            )}
            {item.fats && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#8B4513', fontWeight: '600', marginBottom: '4px' }}>
                  {t('menu.nutrition.fats', 'FATS').toUpperCase()}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937' }}>
                  {item.fats}g
                </div>
              </div>
            )}
          </div>
        )}

        {/* Beverage Info */}
        {!isFood && (item.volume || item.temperature) && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '16px',
            backgroundColor: 'rgba(139, 69, 19, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(139, 69, 19, 0.1)'
          }}>
            {item.volume && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#8B4513', fontWeight: '600', marginBottom: '4px' }}>
                  {t('menu.beverage.volume', 'VOLUME').toUpperCase()}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937' }}>
                  {item.volume}ml
                </div>
              </div>
            )}
            {item.temperature && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#8B4513', fontWeight: '600', marginBottom: '4px' }}>
                  {t('menu.beverage.temperature', 'TEMPERATURE').toUpperCase()}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937' }}>
                  {item.temperature === 'hot' ? `🔥 ${t('menu.beverage.hot', 'Hot')}` : 
                   item.temperature === 'cold' ? `❄️ ${t('menu.beverage.cold', 'Cold')}` : 
                   `🌡️ ${t('menu.beverage.any', 'Any')}`}
                </div>
              </div>
            )}
          </div>
        )}


      </div>
    </motion.div>
  );
};

// Error display component with enhanced recovery options
const ErrorDisplay = ({ message, onRetry }) => {
  const { t } = useTranslation();
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      textAlign: 'center',
      minHeight: '300px'
    }}>
      <FiAlertCircle size={48} style={{ marginBottom: '1rem', color: '#EF4444' }} />
      <h3 style={{ marginBottom: '0.5rem', color: '#1F2937' }}>
        {t('menu.errorTitle', 'Unable to Load Menu')}
      </h3>
      <p style={{ marginBottom: '1.5rem', color: '#6B7280', maxWidth: '400px', lineHeight: '1.5' }}>
        {message || t('menu.errorMessage', 'We\'re having trouble loading our menu. Please try again or contact us if the problem persists.')}
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              backgroundColor: '#6F4E37',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5D4037'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6F4E37'}
          >
            {t('menu.retryButton', 'Try Again')}
          </button>
        )}
        <button
          onClick={() => window.location.href = '/'}
          style={{
            backgroundColor: 'transparent',
            color: '#6F4E37',
            border: '1px solid #6F4E37',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#6F4E37';
            e.target.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#6F4E37';
          }}
        >
          {t('menu.goHomeButton', 'Go Home')}
        </button>
        <button
          onClick={() => window.location.href = 'mailto:info@boncafe.com'}
          style={{
            backgroundColor: 'transparent',
            color: '#6B7280',
            border: '1px solid #D1D5DB',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#F3F4F6';
            e.target.style.borderColor = '#9CA3AF';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = '#D1D5DB';
          }}
        >
          {t('menu.contactButton', 'Contact Us')}
        </button>
      </div>
    </div>
  );
};

const Menu = () => {
  const { t, i18n } = useTranslation();
  const [menuItems, setMenuItems] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSection, setActiveSection] = useState('food');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'name', 'calories'
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedFilters, setSelectedFilters] = useState({
    dietary: [], // 'vegetarian', 'vegan', 'gluten-free'
    spiceLevel: [], // 'mild', 'medium', 'hot'
    cookingTime: [], // 'quick', 'medium', 'slow'
    rating: 0
  });

  // Mobile optimization hook
  const { isMobile } = useMobileOptimization();

  // Memoize fetchMenuData to prevent unnecessary re-renders with enhanced error handling
  const fetchMenuData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    // Add language parameter for proper Django API integration
    const currentLang = i18n.language || 'ru';
    
    // Fetch menu items with enhanced error handling
    const menuResult = await safeApiCall(
      () => menuAPI.getMenuItems(currentLang),
      { 
        context: 'menu',
        enableRetry: true,
        maxRetries: 2
      }
    );
    
    // Fetch beverages with enhanced error handling
    const beverageResult = await safeApiCall(
      () => menuAPI.getBeverages(currentLang),
      { 
        context: 'menu',
        enableRetry: true,
        maxRetries: 2
      }
    );
    
    // Handle results
    if (menuResult.success) {
      setMenuItems(Array.isArray(menuResult.data) ? menuResult.data : []);
    } else {
      setMenuItems([]);
      console.error('Menu items fetch failed:', menuResult.error);
    }
    
    if (beverageResult.success) {
      setBeverages(Array.isArray(beverageResult.data) ? beverageResult.data : []);
    } else {
      setBeverages([]);
      console.error('Beverages fetch failed:', beverageResult.error);
    }
    
    // Set error if both requests failed
    if (!menuResult.success && !beverageResult.success) {
      setError(menuResult.error.message || t('menu.fetchError', 'Unable to load menu data. Please try again.'));
    } else if (!menuResult.success) {
      setError(t('menu.menuItemsError', 'Unable to load menu items. Beverages are still available.'));
    } else if (!beverageResult.success) {
      setError(t('menu.beveragesError', 'Unable to load beverages. Food items are still available.'));
    }
    
    setLoading(false);
  }, [t, i18n.language]);

  useEffect(() => {
    fetchMenuData();
  }, [fetchMenuData]);



  const currentItems = activeSection === 'food' ? menuItems : beverages;
  
  const filteredItems = useMemo(() => {
    let items = currentItems.filter(item => {
      // Search filter
      const searchFields = [
        item.name,
        item.description,
        item.ingredients,
        item.type_display
      ].filter(Boolean).join(' ').toLowerCase();
      
      const matchesSearch = searchTerm === '' || searchFields.includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
      
      // Price range filter
      const itemPrice = item.price || 0;
      const matchesPrice = itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
      
      // Rating filter
      const itemRating = item.rating || 4.5; // Default rating
      const matchesRating = itemRating >= selectedFilters.rating;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sorting
    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        items.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'calories':
        items.sort((a, b) => (a.calories || 0) - (b.calories || 0));
        break;
      case 'popular':
      default:
        items.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
        break;
    }

    return items;
  }, [currentItems, searchTerm, activeCategory, priceRange, selectedFilters.rating, sortBy]);

  // Get categories from the current items using Django's 'type' field
  const categories = useMemo(() => {
    return activeSection === 'food' 
      ? ['all', ...new Set(menuItems.map(item => item.type).filter(Boolean))]
      : ['all', ...new Set(beverages.map(item => item.type).filter(Boolean))];
  }, [activeSection, menuItems, beverages]);

  // Reset active category when switching sections if current category doesn't exist
  useEffect(() => {
    if (activeCategory !== 'all' && !categories.includes(activeCategory)) {
      setActiveCategory('all');
    }
  }, [activeSection, categories, activeCategory]);

  const handleRetry = () => {
    fetchMenuData();
  };

  return (
    <MenuContainer>
      {/* Header */}
      <MenuHeader>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MenuTitle>{t('menu.title', 'Our Menu')}</MenuTitle>
          <MenuSubtitle>{t('menu.subtitle', 'Discover exquisite dishes and beverages')}</MenuSubtitle>
        </motion.div>
      </MenuHeader>

      {/* Main Layout */}
      <MenuLayout>
        {/* Desktop Filter Sidebar */}
        <FilterSidebar>
          <FilterSection>
            <FilterTitle>
              <FiFilter size={20} />
              {t('menu.filters.title', 'Filters')}
            </FilterTitle>

            {/* Section Filter */}
            <FilterGroup>
              <h4>{t('menu.filters.category', 'Category')}</h4>
              <FilterOption
                $isActive={activeSection === 'food'}
                onClick={() => {
                  setActiveSection('food');
                  setActiveCategory('all');
                }}
              >
                🍽️ {t('menu.sections.food', 'Food')}
              </FilterOption>
              <FilterOption
                $isActive={activeSection === 'beverages'}
                onClick={() => {
                  setActiveSection('beverages');
                  setActiveCategory('all');
                }}
              >
                ☕ {t('menu.sections.beverages', 'Beverages')}
              </FilterOption>
            </FilterGroup>

            {/* Category Filter */}
            <FilterGroup>
              <h4>{t('menu.filters.type', 'Type')}</h4>
              {categories.map((category) => (
                <FilterOption
                  key={category}
                  $isActive={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === 'all' ? `🌟 ${t('menu.filters.all', 'All')}` : 
                   getCategoryName(category, t)}
                </FilterOption>
              ))}
            </FilterGroup>

            {/* Price Range */}
            <FilterGroup>
              <h4>{t('menu.filters.price', 'Price')}</h4>
              <PriceRange>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>{priceRange[0].toLocaleString()} {t('menu.currency', 'sum')}</span>
                  <span>{priceRange[1].toLocaleString()} {t('menu.currency', 'sum')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  style={{ width: '100%' }}
                />
              </PriceRange>
            </FilterGroup>

            {/* Rating Filter */}
            <FilterGroup>
              <h4>{t('menu.filters.rating', 'Rating')}</h4>
              {[4, 3, 2, 1, 0].map((rating) => (
                <FilterOption
                  key={rating}
                  $isActive={selectedFilters.rating === rating}
                  onClick={() => setSelectedFilters(prev => ({ ...prev, rating }))}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={14}
                          fill={i < (rating || 5) ? '#fbbf24' : 'none'}
                          color="#fbbf24"
                        />
                      ))}
                    </div>
                    {rating === 0 ? t('menu.filters.all', 'All') : `${rating}+ ${t('menu.filters.stars', 'stars')}`}
                  </div>
                </FilterOption>
              ))}
            </FilterGroup>
          </FilterSection>
        </FilterSidebar>

        {/* Main Content */}
        <MainContent>
          {/* Controls */}
          <MenuControls>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
              <SearchBar>
                <FiSearch />
                <input
                  type="text"
                  placeholder={t('menu.searchPlaceholder', 'Search dishes and beverages...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchBar>
              
              <MobileFilterToggle
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                $isActive={showMobileFilters}
              >
                <FiFilter />
              </MobileFilterToggle>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* View Toggle */}
              <ViewToggle>
                <button
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <FiGrid />
                </button>
                <button
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <FiList />
                </button>
              </ViewToggle>

              {/* Sort Dropdown */}
              <SortDropdown>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">🔥 {t('menu.sort.popular', 'Popular')}</option>
                  <option value="price-low">💰 {t('menu.sort.priceLow', 'Price: Low to High')}</option>
                  <option value="price-high">💎 {t('menu.sort.priceHigh', 'Price: High to Low')}</option>
                  <option value="name">🔤 {t('menu.sort.name', 'By Name')}</option>
                  <option value="calories">⚡ {t('menu.sort.calories', 'By Calories')}</option>
                </select>
                <FiChevronDown />
              </SortDropdown>
            </div>
          </MenuControls>

          {/* Results Info */}
          <ResultsInfo>
            <span>
              {t('menu.results.found', 'Found')} {filteredItems.length} {
                activeSection === 'food' 
                  ? t('menu.results.dishes', 'dishes') 
                  : t('menu.results.beverages', 'beverages')
              }
            </span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <FiTrendingUp size={16} />
              <span>{t('menu.results.sortedBy', 'Sorted by')}: {
                sortBy === 'popular' ? t('menu.sort.popular', 'Popular') :
                sortBy === 'price-low' ? t('menu.sort.priceLow', 'Price ↑') :
                sortBy === 'price-high' ? t('menu.sort.priceHigh', 'Price ↓') :
                sortBy === 'name' ? t('menu.sort.name', 'Name') :
                t('menu.sort.calories', 'Calories')
              }</span>
            </div>
          </ResultsInfo>

          {/* Content */}
          {loading ? (
            <MenuGrid>
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MenuCardSkeleton />
                </motion.div>
              ))}
            </MenuGrid>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ErrorDisplay message={error} onRetry={handleRetry} />
            </motion.div>
          ) : filteredItems.length > 0 ? (
            viewMode === 'grid' ? (
              <MenuGrid>
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                    <MobileOptimizedMenuCard 
                      key={item.id} 
                      item={item} 
                      isFood={activeSection === 'food'}
                      index={index}
                      viewMode={viewMode}
                    />
                  ))}
                </AnimatePresence>
              </MenuGrid>
            ) : (
              <MenuList>
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                    <MobileOptimizedMenuCard 
                      key={item.id} 
                      item={item} 
                      isFood={activeSection === 'food'}
                      index={index}
                      viewMode={viewMode}
                    />
                  ))}
                </AnimatePresence>
              </MenuList>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NoResults>
                <h3>{t('menu.noResults.title', 'No results found')}</h3>
                <p>{t('menu.noResults.message', 'Try changing your search terms or filters')}</p>
              </NoResults>
            </motion.div>
          )}
        </MainContent>
      </MenuLayout>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <FilterOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileFilters(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '300px',
                height: '100%',
                backgroundColor: 'white',
                padding: '2rem',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3>{t('menu.filters.title', 'Filters')}</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <FiX />
                </button>
              </div>
              
              {/* Mobile filters content - same as desktop */}
              <FilterSection>
                <FilterGroup>
                  <h4>{t('menu.filters.category', 'Category')}</h4>
                  <FilterOption
                    $isActive={activeSection === 'food'}
                    onClick={() => setActiveSection('food')}
                  >
                    🍽️ {t('menu.sections.food', 'Food')}
                  </FilterOption>
                  <FilterOption
                    $isActive={activeSection === 'beverages'}
                    onClick={() => setActiveSection('beverages')}
                  >
                    ☕ {t('menu.sections.beverages', 'Beverages')}
                  </FilterOption>
                </FilterGroup>

                <FilterGroup>
                  <h4>{t('menu.filters.type', 'Type')}</h4>
                  {categories.map((category) => (
                    <FilterOption
                      key={category}
                      $isActive={activeCategory === category}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category === 'all' ? `🌟 ${t('menu.filters.all', 'All')}` : 
                       getCategoryName(category, t)}
                    </FilterOption>
                  ))}
                </FilterGroup>
              </FilterSection>
            </motion.div>
          </FilterOverlay>
        )}
      </AnimatePresence>
    </MenuContainer>
  );
};

export default Menu;