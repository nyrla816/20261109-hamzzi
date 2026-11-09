import { useEffect, useState } from "react";

const ASSET_PATH = "/assets";

type Product = {
  name: string;
  price: string;
  image: string;
  fit?: "cover" | "contain";
};

const products: Product[] = [
  { name: "햄찌 삼총사 아크릴 키링 세트", price: "₩ 12,000", image: "d818f.png" },
  { name: "햄찌 데코 스티커팩", price: "₩ 3,500", image: "7db19.png" },
  { name: "햄찌 머그컵", price: "₩ 8,000", image: "1b979.png" },
  { name: "피규어(랜덤 1종)", price: "₩ 4,500", image: "0181a.png", fit: "contain" },
  { name: "햄찌 봉제 인형 (개별)", price: "₩ 15,000", image: "74587.png" },
];

const categories = [
  { icon: "▦", label: "전체보기" },
  { icon: "✎", label: "문구류" },
  { image: "22203.png", label: "리빙 · 생활" },
  { image: "ccb95.png", label: "패션 · 잡화" },
  { icon: "◉", label: "키링 · 액세서리" },
  { icon: "▣", label: "스티커" },
  { icon: "◡", label: "인형 · 피규어" },
];

const navItems = [
  { label: "홈", href: "#home" },
  { label: "신상품", href: "#new-products" },
  { label: "베스트", href: "#best" },
  { label: "전체상품", href: "#products" },
  { label: "이벤트", href: "#event" },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="5.8" />
      <path d="m15.2 15.2 4.2 4.2" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Header({
  menuOpen,
  setMenuOpen,
  openPanel,
  cartCount,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  openPanel: (panel: "search" | "account" | "cart") => void;
  cartCount: number;
}) {
  return (
    <header className="site-header">
      <div className="header-inner">
        {/* 로고는 홈으로 돌아가는 링크입니다. */}
        <a className="brand" href="#home" aria-label="Hamzzi Goods 홈">
          <span className="brand-cloud">☁</span>
          <span>Hamzzi Goods</span>
        </a>

        {/* 데스크톱 내비게이션은 각 페이지 섹션으로 이동합니다. */}
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="주 메뉴">
          {navItems.map((item, index) => (
            <a
              className={index === 0 ? "active" : ""}
              href={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-button search-button"
            onClick={() => openPanel("search")}
            aria-label="검색 열기"
          >
            <SearchIcon />
          </button>
          <button
            className="icon-button account-button"
            onClick={() => openPanel("account")}
            aria-label="계정 메뉴 열기"
          >
            <img src={`${ASSET_PATH}/b77b2.svg`} alt="" />
          </button>
          <button
            className="icon-button cart-button"
            onClick={() => openPanel("cart")}
            aria-label="장바구니 열기"
          >
            <img src={`${ASSET_PATH}/54ef4.png`} alt="" />
            <span>
              <img src={`${ASSET_PATH}/94741.svg`} alt="" />
              <b>{cartCount}</b>
            </span>
          </button>
          <button
            className="icon-button hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={menuOpen}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroSlider() {
  const [slide, setSlide] = useState(0);

  // 슬라이드는 5초마다 자동으로 넘어가며, 화살표와 점으로도 조작할 수 있습니다.
  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % 3), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const moveSlide = (direction: number) => {
    setSlide((current) => (current + direction + 3) % 3);
  };

  return (
    <section className="hero" id="home" aria-label="주요 상품 슬라이드">
      <div className={`hero-art hero-art-${slide}`}>
        <img src={`${ASSET_PATH}/9d7ad.png`} alt="보리, 먼지, 꼬리 햄스터 캐릭터와 굿즈" />
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="new-badge">NEW</span>
          <h1>
            보리 · 먼지 · 꼬리
            <br />
            공식 굿즈 출시!
          </h1>
          <p>
            사랑스러운 햄찌 삼총사 ‘몽글햄즈’의
            <br />
            다양한 굿즈를 만나보세요!
          </p>
          <a className="primary-button" href="#new-products">
            지금 보러가기 <span>›</span>
          </a>
        </div>
      </div>

      <button
        className="slider-arrow previous"
        onClick={() => moveSlide(-1)}
        aria-label="이전 슬라이드"
      >
        <img src={`${ASSET_PATH}/f284c.svg`} alt="" />
      </button>
      <button className="slider-arrow next" onClick={() => moveSlide(1)} aria-label="다음 슬라이드">
        <img src={`${ASSET_PATH}/e5bc7.svg`} alt="" />
      </button>
      <div className="pagination" aria-label="슬라이드 선택">
        {[0, 1, 2].map((page) => (
          <button
            className={slide === page ? "active" : ""}
            onClick={() => setSlide(page)}
            aria-label={`${page + 1}번 슬라이드`}
            aria-current={slide === page}
            key={page}
          >
            <img src={`${ASSET_PATH}/${slide === page ? "c9ef5.svg" : "2cd0b.svg"}`} alt="" />
          </button>
        ))}
      </div>
    </section>
  );
}

function CategoryList() {
  return (
    <section className="category-section" aria-label="상품 카테고리">
      <div className="category-list">
        {categories.map((category) => (
          <a className="category-card" href="#products" key={category.label}>
            {category.image ? (
              <img className="category-image" src={`${ASSET_PATH}/${category.image}`} alt="" />
            ) : (
              <span className="category-icon">{category.icon}</span>
            )}
            <span>{category.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  favorite,
  onFavorite,
  onOpen,
}: {
  product: Product;
  favorite: boolean;
  onFavorite: () => void;
  onOpen: () => void;
}) {
  return (
    <article className="product-card">
      <button
        className="product-image-button"
        onClick={onOpen}
        aria-label={`${product.name} 상세 보기`}
      >
        <img
          className={product.fit === "contain" ? "contain" : ""}
          src={`${ASSET_PATH}/${product.image}`}
          alt={product.name}
        />
      </button>
      <div className="product-info">
        <button className="product-name" onClick={onOpen}>
          {product.name}
        </button>
        <strong>{product.price}</strong>
        <button
          className={`favorite-button ${favorite ? "is-favorite" : ""}`}
          onClick={onFavorite}
          aria-label={favorite ? `${product.name} 찜 해제` : `${product.name} 찜하기`}
          aria-pressed={favorite}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
    </article>
  );
}

function ProductSection({ onOpen }: { onOpen: (product: Product) => void }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  };

  return (
    <section className="products-section" id="new-products">
      <div className="section-heading">
        <h2>✦&nbsp; 신상품</h2>
        <a href="#products">더보기&nbsp; ›</a>
      </div>
      <div className="product-grid" id="products">
        {products.map((product) => (
          <ProductCard
            product={product}
            favorite={favorites.includes(product.name)}
            onFavorite={() => toggleFavorite(product.name)}
            onOpen={() => onOpen(product)}
            key={product.name}
          />
        ))}
      </div>
      {/* 메뉴 링크가 실제 위치로 이동하도록 페이지 하단 대상 섹션을 제공합니다. */}
      <div className="link-targets" aria-hidden="true">
        <span id="best" />
        <span id="event" />
      </div>
    </section>
  );
}

function UtilityPanel({
  panel,
  close,
  cartCount,
}: {
  panel: "search" | "account" | "cart";
  close: () => void;
  cartCount: number;
}) {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const matches = products.filter((product) => product.name.includes(query.trim()));

  return (
    <div className="overlay" role="presentation" onMouseDown={close}>
      <section
        className="utility-panel"
        role="dialog"
        aria-modal="true"
        aria-label="빠른 메뉴"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={close} aria-label="팝업 닫기">
          ×
        </button>
        {panel === "search" && (
          <>
            <h2>상품 검색</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSearched(true);
              }}
            >
              <label htmlFor="search">찾고 싶은 굿즈를 입력해 주세요.</label>
              <div className="search-field">
                <input
                  id="search"
                  autoFocus
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSearched(false);
                  }}
                  placeholder="예: 햄찌 머그컵"
                />
                <button type="submit">검색</button>
              </div>
              {searched && (
                <p className="search-result" role="status">
                  {query.trim() && matches.length > 0
                    ? `${matches.map((item) => item.name).join(", ")} 상품을 찾았어요.`
                    : "검색 결과가 없어요."}
                </p>
              )}
            </form>
          </>
        )}
        {panel === "account" && (
          <>
            <h2>마이페이지</h2>
            <p>로그인하고 주문 내역과 찜한 상품을 확인해 보세요.</p>
            <button className="panel-action" onClick={close}>
              확인
            </button>
          </>
        )}
        {panel === "cart" && (
          <>
            <h2>장바구니</h2>
            <p>
              {cartCount > 0
                ? `장바구니에 상품 ${cartCount}개가 담겨 있어요.`
                : "아직 장바구니에 담긴 상품이 없어요."}
            </p>
            <button className="panel-action" onClick={close}>
              쇼핑 계속하기
            </button>
          </>
        )}
      </section>
    </div>
  );
}

function ProductModal({
  product,
  close,
  addToCart,
}: {
  product: Product;
  close: () => void;
  addToCart: () => void;
}) {
  return (
    <div className="overlay" role="presentation" onMouseDown={close}>
      <section
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={close} aria-label="상품 팝업 닫기">
          ×
        </button>
        <img src={`${ASSET_PATH}/${product.image}`} alt={product.name} />
        <div>
          <span className="modal-badge">NEW</span>
          <h2 id="product-title">{product.name}</h2>
          <strong>{product.price}</strong>
          <p>몽글햄즈의 사랑스러운 모습을 담은 공식 굿즈입니다.</p>
          <button className="panel-action" onClick={addToCart}>
            장바구니 담기
          </button>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"search" | "account" | "cart" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // 팝업이 열렸을 때 배경 페이지가 스크롤되지 않게 합니다.
  useEffect(() => {
    document.body.style.overflow = panel || selectedProduct ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [panel, selectedProduct]);

  return (
    <>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        openPanel={setPanel}
        cartCount={cartCount}
      />
      <main>
        <HeroSlider />
        <div className="content-shell">
          <CategoryList />
          <ProductSection onOpen={setSelectedProduct} />
        </div>
      </main>
      {panel && <UtilityPanel panel={panel} close={() => setPanel(null)} cartCount={cartCount} />}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          close={() => setSelectedProduct(null)}
          addToCart={() => {
            setCartCount((count) => count + 1);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
}
