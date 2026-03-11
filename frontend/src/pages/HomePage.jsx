import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button, ProductCard, Loading, Error } from '../components/ui';
import { productService } from '../services';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [featured, trending] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getTrendingProducts(),
        ]);
        setFeaturedProducts(featured.data || featured);
        setTrendingProducts(trending.data || trending);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addItem(productId, 1);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const categories = [
    {
      name: "Men's Collection",
      subtitle: 'Refined Minimalism',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqG42G1bSFDCTZ9BlUmuyxeB5Ztwd-CUMNZNcjMJnRLJs8XqDMxwiPir9jIK1iUxFiDW1EN5BqvDllUPQx7AcsIH7rzJs5qH2BbVAX2jUj3rygddF7RBbb1MtFwYmmbgnC6F2M2NRdKqMiXfeEILipchIx2sVwXP_9FAyyEiEhlcg6jnG7A3VT8973proVvS5VTsTR-qOtwFvmHcb-lQ9UySmsO14Fp7yb2F9Yedkse9PVmmV5CWrSzP4FKX1tqjZRJnP7H3s-Cog',
    },
    {
      name: "Women's Collection",
      subtitle: 'Effortless Sophistication',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdospNJZbqWyhVEUWCRaE_1k0MTPtqUUQM_m52wTVm6eLsj0vH3JNBjSGSlAneg0KC72AdCReZ9-AkgcAVYvW_-UO58ZjREe7ZQl8hmjpiQUNOTr8SB3GG5WwcXZjszVcrm-m8LpkFiWZrrGAmmIFEpAM3fB_SRmG08fzXHtv_WbjVzVFVbQ0LDAB1fHurW5fCkFFjrzSEvFH0g6s4FY4t5WOOv7IW_u8ZAfN7xRRKt4aLLnyPIaQ98FkN-8MlKVHUTnQfExCoqm0',
    },
    {
      name: 'Accessories',
      subtitle: 'The Finishing Touch',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC93sXIzTZDYo7n6sTH2aEIB1_5o-15FtXUXHeZPcU-c3T11ZHk6S9znJFBjiLPGDsL-1X0og1qqv_Uz8zTa-nkNUXaLvXKsD0dR6TjdXFdhb64dOiJQep2Xc08rEDeTSlMym2IbzAXlvl4leBZOmns-20TzacqrWLOaJwnfj6BPyjUfCIvHcMlgNXb229IeOEKCb9Uh5IQjxhpd2z3wVjEqU9EuifDRX1kqkdRBw99mtq4i2hwffUSoXQXjglrBgENKGjupFHeX7k',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="px-6 lg:px-20 py-6">
        <div className="relative h-[600px] w-full overflow-hidden rounded-2xl bg-slate-200 group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.1)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAq360IhwZIS3WIiS5As9QuecnzJnYGQ-PSrGf_ZmObcoi75Kf3RPkISVGlVOld3hNOBN6QumtijRTMis32lK7FOmdzwReLR9ybrdCgkkMIk7rwDa9Nj0Riu8Vz_79ejgajrS7XXGEawTZ-y2m8QPVnOlVaJYbH1zUXGVT2Spd1mLFTADivrwq4z8nNahcJyhYLKg1USQfTNn3ZQMmoQUeyHII-tAUkSorcXJeRWfdYgKi7AboiWdAboEtdynaylww9GGkvlxwLYdc')`,
            }}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center p-12 lg:p-24 text-white">
            <span className="bg-primary/90 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              New Season
            </span>
            <h1 className="font-serif text-5xl lg:text-7xl font-light leading-tight mb-6 max-w-2xl">
              Elevate Your <br />
              <span className="font-bold italic">Everyday Style</span>
            </h1>
            <p className="text-lg text-slate-200 mb-10 max-w-lg leading-relaxed font-light">
              Discover our curated collection of minimalist essentials designed for the modern lifestyle. Quality materials meet timeless silhouettes.
            </p>
            <div className="flex gap-4">
              <Link to="/shop">
                <Button size="lg" className="transform hover:-translate-y-1">
                  SHOP NEW ARRIVALS
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="!text-white !border-white hover:!bg-white/20">
                VIEW LOOKBOOK
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Discounts Banner */}
      <section className="px-6 lg:px-20 py-4">
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <span className="material-symbols-outlined text-primary">local_activity</span>
          <p className="text-primary font-bold">
            Limited Offer: Get 20% OFF your first order with code{' '}
            <span className="bg-primary text-white px-2 py-0.5 rounded ml-1">WELCOME20</span>
          </p>
          <Link to="/shop?sale=true" className="text-primary underline font-bold text-sm hover:opacity-80 transition-opacity">
            Shop the sale
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6 lg:px-20 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Collections</h3>
            <h2 className="font-serif text-4xl font-semibold">Featured Categories</h2>
          </div>
          <Link to="/shop" className="text-slate-500 hover:text-primary font-bold text-sm flex items-center gap-2 group transition-colors">
            Explore All <FaArrowRight className="!text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/${category.name.toLowerCase().includes('men') ? 'men' : category.name.toLowerCase().includes('women') ? 'women' : 'accessories'}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${category.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-8 left-8 text-white">
                <h4 className="text-2xl font-bold mb-1">{category.name}</h4>
                <p className="text-sm text-slate-300 font-medium">{category.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="bg-white dark:bg-slate-900 py-20">
        <div className="px-6 lg:px-20 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Top Picks</h3>
            <h2 className="font-serif text-4xl font-semibold">Trending Now</h2>
          </div>
          <div className="flex gap-3">
            <button className="p-3 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-primary hover:text-white transition-all">
              <FaChevronLeft />
            </button>
            <button className="p-3 border border-slate-200 dark:border-slate-700 rounded-full hover:bg-primary hover:text-white transition-all">
              <FaChevronRight />
            </button>
          </div>
        </div>
        <div className="px-6 lg:px-20 overflow-x-auto no-scrollbar flex gap-8 pb-10">
          {trendingProducts.length > 0 ? (
            trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <>
              <ProductCard
                product={{
                  id: 1,
                  name: 'Classic Camel Overcoat',
                  category: 'Outerwear',
                  price: 245,
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgFOMS-PGlfR5Os2pcsD2dOk8xMAw6oBQN8g9fBgSA49ea7AylSoYZqKAOsdohRZuCUIeEHPAv--oWKcl3nUPmaRUkRnXIsT8pjTk78cikzBbZvWPB-Bn7-l9zYbEfmsPfm2u_JsqBfWe-3Wug9sglJMJKsIPD5K7ocEWObTA8-pRTR9dLiPDET_q_AiW1ZoaY5pyrKVDLAegXEuWYimiZIVg_amwEVeRhL9tzrctmhP92qyRlwY_-GF6Ns8aFzQ4bdy_0gQQrpf4',
                }}
                onAddToCart={handleAddToCart}
              />
              <ProductCard
                product={{
                  id: 2,
                  name: 'Oversized Knit Sweater',
                  category: 'Knitwear',
                  price: 120,
                  is_new: true,
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlvW3uqI3S08Tk8fssl_fXSygF-F2cSOATE3kcEndGucEtEXOuIWqJJa9rhLA2touNEAvId4Pvhg59OpXwYzL6yWxlUR45SpT2UUBFpc4krBqs8DLjyw_JlAJ2yxqcEykIl55Uo93YKUNkpeFM4bbolk-_lXP6atgC4RNpm-QgLJUkoS3C7Kld8O9uULGpvGyUl2_R12U6j05cm2_Gliw9TnMlokbhJos2_Y5xLuuUA8nRNgMQHizfbMQtIx1UMy23if0W4qvE3Mk',
                }}
                onAddToCart={handleAddToCart}
              />
              <ProductCard
                product={{
                  id: 3,
                  name: 'Handcrafted Leather Tote',
                  category: 'Accessories',
                  price: 380,
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiUcpkK2XXKEHT0jZf1k8fTMcc_LynOpV55NL-Sfu3UisHFabzwiJbnzSi4UjjAAzWthgv2bt-3SnnalZL2tLORPU81sD1UHc2E1Cr7DR-r80vYZc5iRMA2-87bs7lc3wT_zMrJTnlcbnvttj5JTdyw21vMuVmIweud-3YmPc1yZCWab2nlRizYEvm9lrtjy0NqG-NV4s7HogPUyoRkgts8I8LY3y-oQvg9I4KxMXr1NV7M6tpj9sKI4XMZj4XGeNu_vmniMjkn5g',
                }}
                onAddToCart={handleAddToCart}
              />
              <ProductCard
                product={{
                  id: 4,
                  name: 'Linen Blend Trousers',
                  category: 'Bottoms',
                  price: 155,
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKnE_p2IyVHPJSCI2jE6uN3zB_LzguLoeubR1r6GtA4lpfBEDkbKFLNuLd8NXdTVTgtg4fr_HxF-zTOPN7pQSOSpNSFS-uN1Za7aLQxOUZMKnLAXmbI8C4KEh7QM52RRF071s6HPwiNf-UkVfJDU6maQSi5Xp3MDDIsUn1NmZt_RIALLiGfMq7efTaVV1XWRHSgiOiHnvanhi4Dmg2Ruh6E-Ec-6Cp23X8VaPQvLY-hExzKMN5LBpvZgpqEnysJpFKUZnYVClSga4',
                }}
                onAddToCart={handleAddToCart}
              />
              <ProductCard
                product={{
                  id: 5,
                  name: 'Essential White Shirt',
                  category: 'Shirts',
                  price: 89,
                  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBv1N3XR4CN6s82ro3_aND_urmE-UwXvMNAbHyg8ba3WncSOZXZF0wqyZ4ILIDxYEBZ2uaKEiNJ513oSJpV1tUMoVKmOj_fFsybVZZQz61di5gOInOF_rE9x7V2dVbqC3TfF_p_uv8QwOpYcSnXv8YjTUbBLJN2hZngrSCOIU0n0MrKZt_cbw9LXF99bjjCAlH40mFa-qgH5KF6JvpzIXNei7SoRGsQ5NQjvur6gx2rji5pdTN6FzClAB7nV5wL-5bwRG5tkCgklXc',
                }}
                onAddToCart={handleAddToCart}
              />
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 lg:px-20 py-24 bg-slate-100 dark:bg-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-semibold mb-6">Stay in the Loop</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">
            Join our community to receive early access to new collections, exclusive invitations, and 10% off your next purchase.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 focus:ring-2 focus:ring-primary focus:outline-none text-slate-900 dark:text-white"
            />
            <Button size="lg">SUBSCRIBE</Button>
          </form>
          <p className="mt-4 text-xs text-slate-400 italic">
            By subscribing, you agree to our Terms of Use and Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
