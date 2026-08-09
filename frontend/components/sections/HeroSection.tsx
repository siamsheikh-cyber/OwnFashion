"use client";

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-[32px] items-center min-h-[70vh] w-full px-0 md:px-0">
      {/* 9-col Hero Image Banner */}
      <div className="h-[500px] md:h-[700px] relative group overflow-hidden border border-primary/10 bg-surface-container md:col-span-9">
        <div
          className="absolute inset-0 bg-cover bg-center image-zoom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

        {/* Editorial Spotlight Card */}
        <div className="absolute -bottom-12 left-[32px] bg-secondary-container px-8 py-8 max-w-2xl border border-primary/20 z-20">
          <p
            className="text-on-secondary-container uppercase tracking-widest mb-2"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
          >
            Editorial Spotlight
          </p>
          <h1
            className="text-primary italic mb-4"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 4vw, 40px)', lineHeight: '1.2', fontWeight: 400 }}
          >
            The Art of Subtlety: Spring Collection
          </h1>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors uppercase tracking-widest"
            style={{ fontFamily: 'Hanken Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}
          >
            Explore Collection{' '}
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </a>
        </div>
      </div>

      {/* 3-col Promo Video/Inset */}
      <div className="md:col-span-3 hidden md:block">
        <div className="h-full flex items-center justify-center p-4">
          <div className="relative w-full h-[500px] bg-surface-container border border-primary p-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] group overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            >
              <source src="/videos/ownfashion-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
