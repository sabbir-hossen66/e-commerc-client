"use client"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import Image from "next/image"
import { Star, Heart, Shield, Truck } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">Est. 2020</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-balance">Crafting Elegance, One Dress at a Time</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At NijerBazar, we believe every woman deserves to feel confident and beautiful. Our carefully curated
              collection of dresses combines timeless elegance with contemporary style, ensuring you look stunning for
              every occasion.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Shop Our Collection
            </Button>
          </div>
          <div className="relative">
            <Image
              src="/about-img/pexels-alexander-mass-748453803-33647896.jpg"
              alt="alexander"
              width={600}
              height={700}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose NijerBazar?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are committed to providing exceptional quality, style, and service that exceeds your expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Hand-selected fabrics and meticulous craftsmanship in every piece
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Trusted Brand</h3>
                <p className="text-sm text-muted-foreground">
                  Over 10,000 satisfied customers trust us for their fashion needs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and secure shipping to your doorstep within 2-3 days
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Customer First</h3>
                <p className="text-sm text-muted-foreground">
                  24/7 support and hassle-free returns for your peace of mind
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/about-img/pexels-emma-bauso-1183828-2253869.jpg"
              alt="Fashion designer sketching dress designs"
              width={600}
              height={500}
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2020 with a simple mission: to make high-quality, stylish dresses accessible to every woman.
              What started as a small boutique has grown into a trusted online destination for fashion-forward
              individuals.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team of experienced designers and fashion experts work tirelessly to curate collections that celebrate
              femininity, confidence, and individual style. From casual day dresses to elegant evening wear, we have
              something special for every moment in your life.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Dress Styles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground">Do not just take our word for it - hear from our satisfied customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  `Absolutely love my dress from NijerBazar! The quality is amazing and it fits perfectly. Will
                  definitely order again!`
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/about-img/pexels-ogproductionz-17243579.jpg"
                    alt="Sarah Johnson"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm">Sarah Johnson</div>
                    <div className="text-xs text-muted-foreground">Verified Buyer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  `Fast shipping and excellent customer service. The dress was exactly as described and looked stunning
                  at my event!`
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/about-img/pexels-ogproductionz-17243579.jpg"
                    alt="chen"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm">Emily Chen</div>
                    <div className="text-xs text-muted-foreground">Verified Buyer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  &quot;Great variety of styles and sizes. I have ordered multiple dresses and each one has exceeded my
                  expectations. Highly recommend!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/about-img/pexels-emma-bauso-1183828-2253869.jpg"
                    alt="Maria Rodriguez"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-sm">Maria Rodriguez</div>
                    <div className="text-xs text-muted-foreground">Verified Buyer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Find Your Perfect Dress?</h2>
          <p className="text-muted-foreground text-lg">
            Browse our latest collection and discover dresses that make you feel confident and beautiful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Shop All Dresses
            </Button>
            <Button size="lg" variant="outline">
              View New Arrivals
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
