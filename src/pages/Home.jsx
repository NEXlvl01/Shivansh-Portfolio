import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [workItemsVisible, setWorkItemsVisible] = useState(false);

  // Sample work items - replace these with your actual Cloudinary links
  const workItems = [
    {
      id: 1,
      title: "Diddy Conspiracies v1",
      category: "Podcast Thumbnail",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098150/Diddy_Conspiracies_v1_eagzjq.jpg",
      description: "Bold conspiracy-themed podcast thumbnail design"
    },
    {
      id: 2,
      title: "Callum Sample Design",
      category: "YouTube Thumbnail",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098150/Callum_Sample_1_v1_kn9gkw.jpg",
      description: "Professional YouTube content thumbnail"
    },
    {
      id: 3,
      title: "Diddy: Guilty or Innocent?",
      category: "News Thumbnail",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098149/Diddy_Guilty_or_Innocent_v1_ixhopj.jpg",
      description: "Engaging news discussion thumbnail design"
    },
    {
      id: 4,
      title: "Inner Journey - Ashok",
      category: "Personal Brand",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098148/Ashok_IJ_v1_v3bmez.jpg",
      description: "Professional personal branding thumbnail"
    },
    {
      id: 5,
      title: "Episode 36",
      category: "Podcast Thumbnail",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098147/Ep_36_v1_xtvrqn.jpg",
      description: "Clean podcast episode thumbnail design"
    },
    {
      id: 6,
      title: "PUSHPA: The Rule Trailer",
      category: "Movie Reaction",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098147/PUSHPA_The_Rule_Trailer_-_THUMB_v2_c1jgor.jpg",
      description: "High-energy movie reaction thumbnail"
    },
    {
      id: 7,
      title: "Courses & Coaching - Michael",
      category: "Educational Content",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098147/Courses_Coaching_Michael_v1_vjj9gp.jpg",
      description: "Professional educational content thumbnail"
    },
    {
      id: 8,
      title: "Callum Sample 2",
      category: "YouTube Thumbnail",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098147/Callum_Sample_2_v1_1_wnhnhm.jpg",
      description: "Creative YouTube content design"
    },
    {
      id: 9,
      title: "Callum Sample 3",
      category: "YouTube Thumbnail",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098146/Callum_Sample_3_v1_qhrjja.jpg",
      description: "Dynamic YouTube thumbnail design"
    },
    {
      id: 10,
      title: "Episode 34",
      category: "Podcast Thumbnail",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098145/Ep_34_yawleg.jpg",
      description: "Professional podcast episode design"
    },
    {
      id: 11,
      title: "Scams That Should Be Illegal",
      category: "Educational Content",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098145/Scams_that_should_be_Illegal_THUMB_v1_b9gxcn.jpg",
      description: "Eye-catching educational thumbnail"
    },
    {
      id: 12,
      title: "Episode 37",
      category: "Podcast Thumbnail",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098144/Ep_37_gzopm9.jpg",
      description: "Clean and professional podcast design"
    },
    {
      id: 13,
      title: "Spider-Man Across The Spiderverse",
      category: "Movie Review",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098155/Spider-Man_Across_The_Spiderverse_Achara_THUMB_v1_j0lads.jpg",
      description: "Eye-catching movie review thumbnail design"
    },
    {
      id: 14,
      title: "Salaar Review",
      category: "Movie Review",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098151/Salaar_Review_Thumbnail_hlpone.jpg",
      description: "Bold movie review with strong visual impact"
    },
    {
      id: 15,
      title: "Godzilla Minus One",
      category: "Movie Review",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098150/Godzilla_Minus_One_Thumbnail_shjlvj.jpg",
      description: "Dynamic movie review with dramatic styling"
    },
    {
      id: 16,
      title: "Inner Journey Advertisement",
      category: "Brand Design",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098150/Inner_Journey_s_Ad_oxizkq.jpg",
      description: "Professional brand advertisement design"
    },
    {
      id: 17,
      title: "Episode 35",
      category: "Podcast Thumbnail",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098150/Ep_35_zb0wpp.jpg",
      description: "Creative podcast episode thumbnail"
    },
    {
      id: 18,
      title: "Custom Design Project",
      category: "Creative Design",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1755098152/IMG_1826_srwwwv.jpg",
      description: "Custom creative design project showcase"
    },
    {
      id: 19,
      title: "Latest Design Work",
      category: "Thumbnail Design",
      image: "https://res.cloudinary.com/dnsyohuvh/image/upload/v1756663651/IMG_6197_xi1u6l.jpg",
      description: "Recent creative thumbnail design project"
    }
  ];

  const scrollToWork = () => {
    const workSection = document.getElementById('work-section');
    if (workSection) {
      workSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  useEffect(() => {
    setIsLoaded(true);

    // Animate work items with a delay
    setTimeout(() => {
      setWorkItemsVisible(true);
    }, 500);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Complex Layered Background */}
      <div className="absolute inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-blue-900/10" />

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-transparent animate-pulse" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-500/5 via-transparent to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Dynamic particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400/20 animate-ping"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Sophisticated grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.01)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-500/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute top-40 right-32 w-1 h-8 bg-blue-400/20 animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 border border-blue-500/40 rotate-45 animate-bounce" style={{ animationDuration: '3s' }} />

        {/* Large gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s', animationDelay: '2s' }} />
      </div>

      {/* Interactive mouse trail */}
      <div
        className="fixed w-6 h-6 border border-blue-500/50 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          boxShadow: '0 0 30px rgba(59,130,246,0.2), inset 0 0 10px rgba(59,130,246,0.1)',
        }}
      />
      <div
        className="fixed w-2 h-2 bg-blue-500/60 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      />

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-40">
        <Card className="m-6 bg-black/40 border-blue-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8 border-2 border-blue-500/30">
                  <AvatarFallback className="bg-blue-600/20 text-blue-300 text-xs font-bold">SS</AvatarFallback>
                </Avatar>
                <Badge variant="outline" className="border-blue-500/30 text-blue-300 bg-blue-950/30">
                  Online
                </Badge>
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Container */}
      <div className="relative z-30 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">

          {/* Decorative Elements Above Title */}
          <div className={`flex justify-center items-center gap-4 mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Separator className="w-16 bg-blue-500/30" />
            <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 px-3 py-1">
              Portfolio 2025
            </Badge>
            <Separator className="w-16 bg-blue-500/30" />
          </div>

          {/* Enhanced Title with Multiple Effects */}
          <div className={`relative transition-all duration-1200 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight relative z-10">
              {/* Background text for depth effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-400/20 bg-clip-text text-transparent blur-sm scale-105">
                Shivansh Sood
              </span>
              {/* Main text */}
              <span className="relative bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
                Shivansh Sood
              </span>
              {/* Accent line */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </h1>
          </div>

          {/* Enhanced Description in Card */}
          <Card className={`mt-8 bg-black/30 border-blue-500/20 backdrop-blur-xl transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <CardContent className="p-6">
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                Crafting Thumbnails That Look Good And Load Views.
              </p>

              {/* Decorative dots */}
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                <div className="w-2 h-2 rounded-full bg-blue-500/60" />
                <div className="w-2 h-2 rounded-full bg-blue-500/40" />
              </div>
            </CardContent>
          </Card>

          {/* Button Container with Enhanced Design */}
          <div className={`mt-8 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Button Wrapper Card */}
            <Card className="bg-black/20 border-blue-500/10 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-center gap-4">

                  {/* Primary Button with Advanced Styling */}
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300" />
                    <Button
                      size="lg"
                      onClick={scrollToWork}
                      className="relative bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105 px-8 py-4 font-semibold group-hover:shadow-2xl group-hover:shadow-blue-500/25"
                    >
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        View My Work
                        <div className="w-0 h-0.5 bg-white group-hover:w-4 transition-all duration-300" />
                      </span>
                    </Button>
                  </div>

                  {/* Secondary Button with Glass Effect */}
                  <div className="relative group">
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setIsContactOpen(true)}
                      className="relative border-blue-400/50 text-white hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 hover:scale-105 backdrop-blur-sm px-8 py-4 font-semibold group-hover:shadow-xl group-hover:shadow-blue-400/20"
                    >
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 border border-blue-400 rounded-full group-hover:bg-blue-400 transition-colors duration-300" />
                        Contact Me
                        <div className="w-0 h-0.5 border-t border-blue-400 group-hover:w-4 transition-all duration-300" />
                      </span>
                    </Button>
                  </div>

                </div>

                {/* Additional Info */}
                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                    Available for projects
                  </span>
                  <Separator orientation="vertical" className="h-3 bg-zinc-600" />
                  <span>Response within 24h</span>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>

      {/* Work Portfolio Section */}
      <div id="work-section" className="relative z-30 min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-4 mb-8">
              <Separator className="w-20 bg-blue-500/30" />
              <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30 px-4 py-2">
                My Portfolio
              </Badge>
              <Separator className="w-20 bg-blue-500/30" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              Featured Work
            </h2>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              A showcase of my creative thumbnail designs and visual projects
            </p>
          </div>

          {/* Work Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {workItems.map((item, index) => (
              <Card 
                key={item.id}
                className={`group bg-black/40 border-blue-500/20 backdrop-blur-sm hover:bg-blue-950/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 overflow-hidden ${
                  workItemsVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden cursor-pointer" onClick={() => openImageInNewTab(item.image)}>
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      console.log('Image failed to load:', item.image);
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* View Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-blue-600/80 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-blue-500/80 transition-colors cursor-pointer">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* View Full Size Button - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openImageInNewTab(item.image);
                      }}
                      className="w-full bg-blue-600/90 hover:bg-blue-700 text-white border-none backdrop-blur-sm"
                    >
                      View Full Size
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>


          {/* Attribution Notice */}
          <div className="text-center mt-12">
            <Card className="bg-black/30 border-blue-500/20 backdrop-blur-xl max-w-2xl mx-auto">
              <CardContent className="p-6">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  <span className="text-blue-300">*</span>Some of this work belongs to <span className="text-blue-300 font-semibold">Praper Media</span> as it was made by me while being employed by them
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>

      

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-blue-500/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-blue-500/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-blue-500/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-blue-500/30" />

      {/* Contact Modal */}
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="bg-black/90 border-blue-500/30 backdrop-blur-xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
              Let's Connect
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 p-6">
            {/* WhatsApp */}
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur-sm hover:bg-blue-950/30 transition-colors cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center group-hover:bg-green-600/30 transition-colors">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">WhatsApp</p>
                    <p className="text-lg font-semibold text-white group-hover:text-green-200 transition-colors">
                      +91 88377 22707
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur-sm hover:bg-blue-950/30 transition-colors cursor-pointer group">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Email</p>
                    <p className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
                      shivansh.psd31@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="text-center">
              <Separator className="my-4 bg-blue-500/20" />
              <p className="text-sm text-zinc-400 mb-3">Preferred contact hours</p>
              <Badge className="bg-green-950/30 text-green-300 border-green-500/30">
                9 AM - 8 PM (IST)
              </Badge>
            </div>

            {/* Close Button */}
            <Button
              onClick={() => setIsContactOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Got it, Thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}