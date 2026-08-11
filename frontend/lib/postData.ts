import { Post } from '@/types';

export const postsData: Post[] = [
  {
    id: 'post-1',
    slug: 'the-return-to-maximalist-outerwear',
    category: 'TRENDY WEAR',
    season: 'Fall',
    title: 'The Return to Maximalist Outerwear in a Minimalist Era',
    subtitle: 'How Paris fashion week ignited a resurgence of dramatic silhouettes, sweeping wool coats, and statement textures.',
    readTime: '8 min read',
    publishedAt: 'August 10, 2026',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    description: 'In a season dominated by quiet luxury, a bold counter-movement emerges on the streets of Paris. We explore how voluminous silhouettes and striking textures are challenging the status quo.',
    author: {
      name: 'Sophia Laurent',
      role: 'Senior Fashion Editor & Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Sophia has spent over a decade covering fashion weeks across Paris, Milan, and New York. Her work focuses on structural tailoring and capsule wardrobe investment pieces.',
    },
    takeaways: [
      'Voluminous wool trench coats and oversized shearling layers are dominating autumn street style.',
      'Neutral color palettes grounds dramatic proportions, allowing texture to take center stage.',
      'Quality hardware and oversized lapels add structural elegance to daily outerwear.'
    ],
    tags: ['Outerwear', 'Paris Fashion Week', 'Autumn Trends', 'Maximalism', 'Affiliate Picks'],
    affiliateProducts: [
      {
        id: 'aff-1',
        name: 'Oversized Double-Breasted Wool Coat',
        brand: 'Totême',
        price: '$890.00',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1001?tag=ownfashion-20',
        description: 'Crafted from heavyweight virgin wool blend featuring dramatic wide lapels and deep welt pockets.',
        badge: 'Editor’s Choice'
      },
      {
        id: 'aff-2',
        name: 'Structured Belted Shearling Jacket',
        brand: 'Acne Studios',
        price: '$1,250.00',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1002?tag=ownfashion-20',
        description: 'Supple lambskin exterior with plush shearling lining and vintage brushed brass buckles.',
        badge: 'Trending'
      },
      {
        id: 'aff-3',
        name: 'Floor-Length Alpaca Blend Trench',
        brand: 'Khaite',
        price: '$1,450.00',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1003?tag=ownfashion-20',
        description: 'An architectural marvel designed to drape gracefully over tailored suiting and knitwear.',
        badge: 'Investment Piece'
      }
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'For the past three seasons, the fashion landscape was governed by an aesthetic of restraint. Quiet luxury reigned supreme: tonal cashmeres, unbranded leather goods, and minimalist tailoring that whispered rather than shouted. Yet as autumn doors swing open across Paris and Milan, a distinct tactical shift is taking place on the boulevards.'
      },
      {
        type: 'heading',
        heading: 'Proportions as a Statement of Confidence'
      },
      {
        type: 'paragraph',
        text: 'Outerwear is no longer serving as a mere cover-up; it has reclaimed its role as the centerpiece of the ensemble. Designers are embracing architectural shoulder lines, floor-sweeping hems, and cocoon-like volumes that command immediate visual authority. When paired with streamlined base layers—a crisp white cotton poplin shirt or a fine merino turtleneck—the effect is undeniably magnetic.'
      },
      {
        type: 'blockquote',
        text: 'Fashion is at its best when it creates a dialogue between structure and motion. A maximalist coat allows the wearer to carry an entire mood into the room before a single word is spoken.',
        quoteAuthor: 'Pierre Vance, Fashion Director'
      },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Street style during Paris Fashion Week showcasing sweeping floor-length coats in camel and chocolate tones.'
      },
      {
        type: 'heading',
        heading: 'Curated Investment Pieces to Shop Now'
      },
      {
        type: 'paragraph',
        text: 'Investing in a statement coat requires attention to weave density, lining craftsmanship, and collar structure. Below, we have selected three standout coats that embody this season’s maximalist vision while maintaining timeless durability.'
      },
      {
        type: 'products'
      },
      {
        type: 'heading',
        heading: 'How to Style Maximalist Layers Without Overwhelming Your Frame'
      },
      {
        type: 'paragraph',
        text: 'The secret to mastering large silhouettes lies in strategic counterbalance. Pair voluminous wool outerwear with sharp, fitted trousers or straight-leg dark denim. Opt for structured leather boots with a substantial block heel to ground the lower half of your frame.'
      }
    ]
  },
  {
    id: 'post-2',
    slug: 'investing-in-timeless-hardware',
    category: 'SEASONAL COMFORT',
    season: 'Winter',
    title: 'Investing in Timeless Hardware: The Details That Elevate',
    subtitle: 'Why brushed gold buckles, custom metal clasps, and architectural jewelry define modern luxury.',
    readTime: '4 min read',
    publishedAt: 'August 8, 2026',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    description: 'From brushed gold buckles to structural metallic clasps, discover how premium hardware elevates essential wardrobe pieces into heirloom assets.',
    author: {
      name: 'Marcus Vance',
      role: 'Accessories & Fine Goods Curator',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Marcus specializes in artisanal leather goods, watchmaking, and hardware metallurgy for luxury houses.',
    },
    takeaways: [
      'Heavy-gauge hardware protects luxury handbags and belts from premature wear.',
      'Brushed palladium and warm champagne gold remain the most versatile hardware finishes.',
      'Hardware craftsmanship is often the key distinguishing factor between entry-tier and investment-grade leather.'
    ],
    tags: ['Accessories', 'Leather Goods', 'Hardware', 'Luxury Craft', 'Affiliate Picks'],
    affiliateProducts: [
      {
        id: 'aff-4',
        name: 'Minimalist Pebble Leather Tote with Brass Hardware',
        brand: 'Cuyana',
        price: '$248.00',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1004?tag=ownfashion-20',
        description: 'Italian full-grain leather trimmed with hand-polished solid brass rivets and internal clasp.',
        badge: 'Best Seller'
      },
      {
        id: 'aff-5',
        name: 'Sculptural Gold-Tone Waist Belt',
        brand: 'Bottega Veneta',
        price: '$420.00',
        image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1005?tag=ownfashion-20',
        description: 'Statement buckle featuring an organic twist motif crafted from electroplated gold hardware.',
        badge: 'Editor Pick'
      }
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'In high-end sartorial craft, true luxury lies in the microscopic details. While silhouette and fabric catch the eye from across a room, hardware is what holds the touch test when examined up close.'
      },
      {
        type: 'heading',
        heading: 'The Alchemy of Fine Metallurgy'
      },
      {
        type: 'paragraph',
        text: 'Mass-produced accessories frequently rely on hollow aluminum or light alloy plating that chips within a single season. By contrast, investment-grade hardware is forged from solid brass, stainless steel, or palladium plating, offering tactile weight and anti-tarnish longevity.'
      },
      {
        type: 'blockquote',
        text: 'When you feel weight in a buckle or hear a solid, resonant click in a bag lock, you are experiencing engineering designed to survive decades.',
        quoteAuthor: 'Marcus Vance'
      },
      {
        type: 'products'
      }
    ]
  },
  {
    id: 'post-3',
    slug: 'the-architecture-of-a-bold-lip',
    category: 'TRENDY WEAR',
    season: 'Fall',
    title: 'The Architecture of a Bold Lip: Masterclass in Precision',
    subtitle: 'From prep to lining and moisture locking: step-by-step editorial techniques for flawless lip statement.',
    readTime: '3 min read',
    publishedAt: 'August 5, 2026',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
    description: 'Precision, lining, and moisture control. Master the editorial technique behind timeless crimson and deep burgundy lip artistry.',
    author: {
      name: 'Elena Rostova',
      role: 'Global Beauty & Skincare Specialist',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      bio: 'Elena is a beauty director and former runway makeup artist based in Paris with a passion for clean formulas.',
    },
    takeaways: [
      'Exfoliation and deep hydration are essential prerequisites before applying high-pigment matte formulas.',
      'Matching lip liner to your natural lip shade creates optical volume without unnatural border lines.',
      'Blotting with fine tissue paper sets pigment for 12-hour transfer-resistant wear.'
    ],
    tags: ['Beauty', 'Makeup', 'Editorial Lip', 'Skincare', 'Affiliate Essentials'],
    affiliateProducts: [
      {
        id: 'aff-6',
        name: 'Velvet Matte Lipstick - Crimson Noir',
        brand: 'Chanel Beauty',
        price: '$45.00',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1006?tag=ownfashion-20',
        description: 'Highly pigmented botanical oil formula delivering intense color pay-off with comfortable 8h moisture.',
        badge: 'Iconic Classic'
      },
      {
        id: 'aff-7',
        name: 'Precision Waterproof Lip Definer',
        brand: 'Charlotte Tilbury',
        price: '$26.00',
        image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1007?tag=ownfashion-20',
        description: 'Smooth gliding gel pencil that outlines and shapes lips with smudge-proof accuracy.',
        badge: 'Must Have'
      }
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'A bold lip remains fashion’s most immediate accessory. In less than two minutes, a single coat of deep crimson or cool burgundy can transform an effortless white tee and denim jeans into a polished runway look.'
      },
      {
        type: 'heading',
        heading: 'Step 1: Prep and Prime'
      },
      {
        type: 'paragraph',
        text: 'Dry patches absorb pigment unevenly, leading to feathering along the lip border. Begin with a gentle sugar scrub followed by a hyaluronic lip serum. Allow five minutes for full absorption before applying pigment.'
      },
      {
        type: 'products'
      }
    ]
  },
  {
    id: 'post-4',
    slug: 'reading-list-april-edition',
    category: 'SEASONAL COMFORT',
    season: 'Spring',
    title: 'Reading List: Essential Volumes on Fashion, Design & Architecture',
    subtitle: 'Four foundational monographs and photo books to inspire your coffee table and aesthetic vision.',
    readTime: '5 min read',
    publishedAt: 'April 28, 2026',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80',
    description: 'Essential books on architecture, mid-century fashion photography, and minimalist philosophy to enrich your coffee table and mind.',
    author: {
      name: 'Claire DeWitt',
      role: 'Culture & Arts Contributor',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      bio: 'Claire curates rare books, photography archives, and architectural studies for independent art journals.',
    },
    takeaways: [
      'Visual books provide tactile inspiration far beyond digital screen fatigue.',
      'Studying mid-century architectural geometry sharpens your understanding of fashion silhouettes.',
      'Curated reading lists make meaningful, timeless gifts for design enthusiasts.'
    ],
    tags: ['Books', 'Architecture', 'Design Curation', 'Culture', 'Affiliate Books'],
    affiliateProducts: [
      {
        id: 'aff-8',
        name: 'The Philosophy of Minimalist Living (Hardcover)',
        brand: 'Taschen Publishing',
        price: '$65.00',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1008?tag=ownfashion-20',
        description: 'A visual archive spanning 300 pages of minimalist home design, fashion, and art curation.',
        badge: 'Recommended'
      }
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'In an era dominated by endless algorithm feeds, setting aside time for tactile, beautifully bound print books is a quiet luxury. This month, we highlight four monographs that delve into the intersections of fashion, geometry, and space.'
      },
      {
        type: 'products'
      }
    ]
  },
  {
    id: 'post-5',
    slug: 'embracing-the-new-pastels',
    category: 'SEASONAL COMFORT',
    season: 'Spring',
    title: 'Embracing the New Pastels: Soft Tones for Modern Wardrobes',
    subtitle: 'Reimagining sage green, pale lavender, and buttery yellow into sharp, structured outfits.',
    readTime: '5 min read',
    publishedAt: 'May 12, 2026',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    description: 'Explore how muted pastel tones are moving away from hyper-feminine stereotypes into tailored blazers, trousers, and trench coats.',
    author: {
      name: 'Sophia Laurent',
      role: 'Senior Fashion Editor & Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      bio: 'Sophia covers runway trends and seasonal palette movements across European fashion houses.',
    },
    takeaways: [
      'Pair muted pastels with rich neutrals like espresso brown or slate grey for contrast.',
      'Structured suiting brings modern edge to soft pastel hues.'
    ],
    tags: ['Pastels', 'Spring Fashion', 'Color Palette', 'Suiting', 'Affiliate Picks'],
    affiliateProducts: [
      {
        id: 'aff-9',
        name: 'Tailored Sage Green Linen Blazer',
        brand: 'Theory',
        price: '$395.00',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1009?tag=ownfashion-20',
        description: 'Single-breasted linen blazer cut with sharp lapels and lightweight interior lining.',
        badge: 'Spring Favorite'
      }
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'Forget sugary sweet cotton candy hues. This season’s pastel palette is grounded in botanical realism: dusty olive, pale pistachio, chalky lilac, and warm buttermilk.'
      },
      {
        type: 'products'
      }
    ]
  },
  {
    id: 'post-6',
    slug: 'deconstructing-the-canadian-tuxedo',
    category: 'TRENDY WEAR',
    season: 'Summer',
    title: 'Deconstructing the Canadian Tuxedo: Double Denim Reimagined',
    subtitle: 'From dark raw indigo washes to tailored denim blazers, elevated denim-on-denim styling.',
    readTime: '6 min read',
    publishedAt: 'June 4, 2026',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80',
    description: 'Double denim is no longer casual streetwear. Discover how luxury houses refine raw indigo denim into red-carpet worthy ensembles.',
    author: {
      name: 'Marcus Vance',
      role: 'Accessories & Fine Goods Curator',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      bio: 'Marcus analyzes textiles, denim weaving, and structural wardrobe elements.',
    },
    takeaways: [
      'Unwashed selvedge indigo provides clean lines suitable for smart-casual dress codes.',
      'Mix denim weights: heavy 14oz jeans with a lightweight denim chambray button-down.'
    ],
    tags: ['Denim', 'Canadian Tuxedo', 'Indigo', 'Casual Chic', 'Affiliate Staples'],
    affiliateProducts: [
      {
        id: 'aff-10',
        name: 'Japanese Selvedge High-Rise Straight Jeans',
        brand: 'AGOLDE',
        price: '$228.00',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1010?tag=ownfashion-20',
        description: 'Authentic 100% organic cotton selvedge denim woven on traditional vintage looms.',
        badge: 'Top Rated'
      }
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'Once considered a controversial fashion choice, the double denim look—affectionately termed the Canadian Tuxedo—has earned permanent residence in high fashion archives.'
      },
      {
        type: 'products'
      }
    ]
  },
  {
    id: 'post-7',
    slug: 'textures-of-the-night',
    category: 'TRENDY WEAR',
    season: 'Winter',
    title: 'Textures of the Night: Velvet, Silk & Metallic Weaves',
    subtitle: 'Crafting dramatic evening wear ensembles with rich tactile contrast.',
    readTime: '4 min read',
    publishedAt: 'July 18, 2026',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=900&q=80',
    description: 'Delve into the sumptuous tactile textures defining nocturnal glamor: silk satin, crushed velvet, and shimmering metallic lamé.',
    author: {
      name: 'Claire DeWitt',
      role: 'Culture & Arts Contributor',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      bio: 'Claire explores night culture, evening fashion, and haute couture archives.',
    },
    takeaways: [
      'Layer matte velvet with high-shine silk satin to create visual depth in dark outfits.',
      'Minimalist gold jewelry balances rich metallic textures.'
    ],
    tags: ['Eveningwear', 'Silk', 'Velvet', 'Night Outfits', 'Affiliate Glam'],
    affiliateProducts: [
      {
        id: 'aff-11',
        name: 'Silk Bias-Cut Slip Dress in Onyx',
        brand: 'Nili Lotan',
        price: '$595.00',
        image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=600&q=80',
        affiliateUrl: 'https://www.amazon.com/dp/B08XYZ1011?tag=ownfashion-20',
        description: '100% heavy silk crepe back satin tailored with delicate adjustable spaghetti straps.',
        badge: 'Evening Essential'
      }
    ],
    contentBlocks: [
      {
        type: 'paragraph',
        text: 'When evening falls, lighting shifts from natural warmth to ambient candle glow and moody city lights. Clothing must respond in kind through tactile depth and light-reflecting surfaces.'
      },
      {
        type: 'products'
      }
    ]
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return postsData.find((p) => p.slug === slug || p.id === slug);
}

export function getAllPosts(): Post[] {
  return postsData;
}

export function getRelatedPosts(currentSlug: string, count: number = 3): Post[] {
  return postsData.filter((p) => p.slug !== currentSlug).slice(0, count);
}
