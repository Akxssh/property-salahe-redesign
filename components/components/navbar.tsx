"use client";

import { useState, useEffect } from "react";
import {
  Headset,
  UserCircle,
  Menu,
  ChevronDown,
  MapPin,
  Building,
  Home as HomeIcon,
  Key,
  Phone,
  Star,
  LogIn,
  UserPlus,
  Bell,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuItems = {
  forBuyers: [
    { title: "Buy Properties", icon: HomeIcon, badge: null, href: "#" },
    { title: "New Projects", icon: Building, badge: "NEW", href: "#" },
    { title: "Property Services", icon: Key, badge: null, href: "#" },
    { title: "Home Loans", icon: Star, badge: "HOT", href: "#" },
  ],
  forOwners: [
    { title: "Post Property FREE", icon: Key, badge: "FREE", href: "#" },
    { title: "View Reports", icon: Building, badge: null, href: "#" },
    { title: "Pricing Plans", icon: Star, badge: null, href: "#" },
  ],
  insights: [
    { title: "Market Trends", icon: MapPin, badge: null, href: "#" },
    { title: "Locality Reviews", icon: Building, badge: "NEW", href: "#" },
    { title: "Property News", icon: HomeIcon, badge: null, href: "#" },
  ],
  services: [
    { title: "Home Loans", icon: Star, description: "Get best interest rates", href: "#" },
    { title: "Property Management", icon: Building, description: "Rental & maintenance", href: "#" },
    { title: "Legal Title Check", icon: Key, description: "Verify property documents", href: "#" },
    { title: "Packers & Movers", icon: MapPin, description: "Trusted partners", href: "#" },
  ],
};

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
    }`}>
      {/* Top Bar - Thin */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-orange-400 font-bold text-base md:text-lg">PropertySalahe.com</span>
            <span className="hidden md:inline text-gray-500">|</span>
            <a href="#" className="hidden sm:inline text-gray-400 hover:text-white transition-colors">
              Download App
            </a>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-gray-400 hover:text-white h-7 px-2 md:px-3"
              onClick={() => !isLoggedIn && setIsLoggedIn(true)}
            >
              <LogIn className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Login
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-gray-400 hover:text-white h-7 px-2 md:px-3"
              onClick={() => !isLoggedIn && setIsLoggedIn(true)}
            >
              <UserPlus className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              Register
            </Button>
            <span className="hidden sm:inline text-gray-600">|</span>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-7 w-7 md:h-8 md:w-8 p-0">
              <Headset className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {/* Left - Location Dropdown */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 text-gray-700 hover:bg-gray-100 h-9 md:h-10">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="hidden sm:inline">Bangalore</span>
                    <ChevronDown className="w-3 h-4 md:w-4 md:h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>
                    <MapPin className="w-4 h-4 mr-2" /> Bangalore
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MapPin className="w-4 h-4 mr-2" /> Mumbai
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MapPin className="w-4 h-4 mr-2" /> Delhi NCR
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MapPin className="w-4 h-4 mr-2" /> Pune
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MapPin className="w-4 h-4 mr-2" /> Hyderabad
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MapPin className="w-4 h-4 mr-2" /> Chennai
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Center - Navigation Menu */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium text-gray-700 hover:bg-gray-100">
                    For Buyers
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[250px]">
                      {menuItems.forBuyers.map((item, index) => (
                        <NavigationMenuLink
                          key={index}
                          href={item.href}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium">{item.title}</span>
                          </div>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                item.badge === "NEW"
                                  ? "bg-blue-100 text-blue-700"
                                  : item.badge === "HOT"
                                  ? "bg-orange-100 text-orange-700"
                                  : ""
                              }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="#"
                    className="px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    For Tenants
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium text-gray-700 hover:bg-gray-100">
                    For Owners
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[220px]">
                      {menuItems.forOwners.map((item, index) => (
                        <NavigationMenuLink
                          key={index}
                          href={item.href}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium">{item.title}</span>
                          </div>
                          {item.badge && (
                            <Badge className="bg-green-500 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium text-gray-700 hover:bg-gray-100">
                    Property Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[280px] grid-cols-2">
                      {menuItems.services.map((item, index) => (
                        <NavigationMenuLink
                          key={index}
                          href={item.href}
                          className="p-3 rounded-md hover:bg-gray-100 cursor-pointer border border-transparent hover:border-gray-200"
                        >
                          <item.icon className="w-5 h-5 text-blue-600 mb-2" />
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium text-gray-700 hover:bg-gray-100">
                    Insights
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[200px]">
                      {menuItems.insights.map((item, index) => (
                        <NavigationMenuLink
                          key={index}
                          href={item.href}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium">{item.title}</span>
                          </div>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                item.badge === "NEW"
                                  ? "bg-blue-100 text-blue-700"
                                  : ""
                              }`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right - CTA Buttons */}
            <div className="flex items-center gap-1 md:gap-2">
              <Button className="hidden sm:flex bg-orange-500 hover:bg-orange-600 text-white font-medium h-9 md:h-10 px-3 md:px-4">
                <span className="hidden lg:inline">Post Property </span>FREE
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-600 hover:bg-gray-100 h-9 w-9 md:h-10 md:w-10">
                <Bell className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-600 hover:bg-gray-100 h-9 w-9 md:h-10 md:w-10">
                <UserCircle className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
              {/* Mobile Menu Button */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="flex lg:hidden text-gray-600 hover:bg-gray-100 h-9 w-9 md:h-10 md:w-10">
                    <Menu className="w-5 h-5 md:w-6 md:h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                  <SheetHeader className="border-b pb-4 px-6">
                    <SheetTitle className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">PropertySalahe.com</span>
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-80px)] px-6 py-4">
                    <div className="space-y-6">
                      {/* Login/Register */}
                      {!isLoggedIn ? (
                        <div className="space-y-2">
                          <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => setIsLoggedIn(true)}>
                            <LogIn className="w-4 h-4 mr-2" />
                            Login
                          </Button>
                          <Button variant="outline" className="w-full" onClick={() => setIsLoggedIn(true)}>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Register
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                          <UserCircle className="w-10 h-10 text-gray-600" />
                          <div>
                            <p className="font-medium">Welcome Back!</p>
                            <p className="text-xs text-gray-500">Logged in</p>
                          </div>
                        </div>
                      )}

                      {/* Navigation Links */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">For Buyers</p>
                        {menuItems.forBuyers.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="w-5 h-5 text-gray-500" />
                              <span className="font-medium">{item.title}</span>
                            </div>
                            {item.badge && (
                              <Badge className={item.badge === "FREE" ? "bg-green-500" : "bg-blue-500"}>
                                {item.badge}
                              </Badge>
                            )}
                          </a>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">For Owners</p>
                        {menuItems.forOwners.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="w-5 h-5 text-gray-500" />
                              <span className="font-medium">{item.title}</span>
                            </div>
                            {item.badge && (
                              <Badge className="bg-green-500">{item.badge}</Badge>
                            )}
                          </a>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Property Services</p>
                        {menuItems.services.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <item.icon className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                          </a>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">Insights</p>
                        {menuItems.insights.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <item.icon className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">{item.title}</span>
                          </a>
                        ))}
                      </div>

                      {/* Contact */}
                      <div className="pt-4 border-t">
                        <Button variant="outline" className="w-full mb-2">
                          <Headset className="w-4 h-4 mr-2" />
                          Contact Support
                        </Button>
                        <Button variant="ghost" className="w-full text-gray-500">
                          Download App
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
