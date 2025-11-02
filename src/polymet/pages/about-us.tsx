import { Check } from "lucide-react";

export function AboutUsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-start justify-center pt-32 pb-40">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
            alt="About Us Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 text-white max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Embark on an<br />Unforgettable Escapade
          </h1>
          <p className="text-base md:text-lg lg:text-xl mb-4 max-w-2xl">
            With every journey, TMPL Escapade invites you to discover breathtaking destinations,
            vibrant cultures, and moments that linger long after you return home.
          </p>
          <p className="text-sm md:text-base lg:text-lg max-w-2xl">
            Step beyond the ordinary and immerse yourself in a world of wonder.
          </p>
        </div>
      </section>

      {/* Who We Are - Overlapping Section */}
      <section className="relative -mt-40 mb-8">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[60px] shadow-2xl p-12 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <div>
                <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    At TMPL Escapde, we believe travel should be more than just moving from one place to another, it should be a journey filled with connection, discovery, and unforgettable moments. We specialize in group tours with thoughtfully prepared itineraries, designed for travelers who want the perfect balance between structure and freedom.
                  </p>
                  <p>
                    Our tours are carefully crafted to remove the stress of planning, allowing you to focus on enjoying every step of the journey. Whether you prefer to fly together with the group from the start or meet us directly at the destination airport, we provide the flexibility to suit your lifestyle and travel style.
                  </p>
                </div>
              </div>

              {/* Right: Circular Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-80 h-80 rounded-full overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
                    alt="Group Travel Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="pt-8 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            {/* Left: Background Image */}
            <div className="relative min-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
                alt="Travel Destination"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: All Content Stacked */}
            <div className="space-y-8">
              {/* Services List */}
              <div>
                <h2 className="text-4xl font-bold mb-8">Our Core Services</h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-lg">Curated group travel packages</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-lg">
                      Flexible options: fly with the group or meet at the destination
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-lg">
                      Hassle-free arrangements: flights, transfers, tours, and stays
                    </span>
                  </li>
                </ul>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-3xl font-bold mb-4">Our Core Services</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  We focus on community travel – bringing people together through shared journeys while removing the stress of planning.
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-2xl font-bold mb-4">Mision</h4>
                <p className="text-muted-foreground leading-relaxed">
                  To make travel effortless, enjoyable, and accessible for everyone who values meaningful experiences.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100">
                <h4 className="text-2xl font-bold mb-4">Vision</h4>
                <p className="text-muted-foreground leading-relaxed">
                  To be the preferred choice for group travelers who want structure, flexibility, and unforgettable moments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
